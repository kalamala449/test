import responseHandler from '../utils/responseHandler.js'
import CommentService from '../controllers/commentServices.js'

const CommentServiceInstance = new CommentService();

export const getComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await CommentServiceInstance.getCommentService(id)
    responseHandler(res, response)
  } catch (error) {
    next(error)
  }
}

export const addComment = async (req, res, next) => {
  try {
    const {name, comment} = req.body;
    const response = await CommentServiceInstance.addCommentService({name, comment});
    return responseHandler(res, response);
  } catch (error) {
    next(error);
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await CommentServiceInstance.deleteCommentService(id)
    return responseHandler(res, response);
  } catch (error) {
    next(error);
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {comment, name} = req.body;
    const response = await CommentServiceInstance.updateCommentService(id, {comment, name})
    return responseHandler(res, response);
  } catch (error) {
    next(error);
  }
}


export const getAllComments = async (req, res, next) => {
  try {
    const response = await CommentServiceInstance.getAllCommentsService()
    return responseHandler(res, response);
  } catch (error) {
    next(error);
  }
}

