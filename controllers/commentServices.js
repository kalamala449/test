import { BaseError } from "../utils/BaseError.js";
import client from "../utils/redis_client.js";
import commentRepository from './commentRepository.js'

class commentService {
  constructor() {
    this.commentRepository = new commentRepository();
  }

  async getCommentService(id) {
    const cachedData = await client.get(id);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const element = await this.commentRepository.findComment(id);
    if (!element) {
      throw new BaseError("No Comment with that id in database");
    }

    const cachedDataStatus = await client.setEx(id, 5000, JSON.stringify(element));
    if (!cachedDataStatus) throw new BaseError("Error while caching data");
    return element;
  }

  async addCommentService(data) {
    const newComment = await this.commentRepository.createComment(data);
    if (!newComment) throw new BaseError("Error while adding new comment");
    return newComment;
  }

  async deleteCommentService(id) {
    await client.del(id);
    const response = await this.commentRepository.deleteCommentById(id);
    if (!response) {
      throw new BaseError("Error while deleting data with id- " + id);
    }
    return response;
  }

  async updateCommentService(id, update) {
    const response = await this.commentRepository.updateCommentById(id, update);
    if (!response) {
      throw new BaseError("Error while updating data with id- " + id);
    }
    return response;
  }

  async getAllCommentsService() {
    return await this.commentRepository.getAllComments();
  }

}


export default commentService;