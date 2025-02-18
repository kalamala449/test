import Comments from "../model/comments.js";

class CommentRepository {

    findComment(id) {
        return Comments.findOne({ _id: id });
    }

    createComment(data) {
        const { name, comment } = data;
        return Comments.create({ name, comment });
    }

    deleteCommentById(id) {
        return Comments.deleteOne({ _id: id });
    }

    updateCommentById(id, update) {
        const { comment, name } = update;
        return Comments.findOneAndUpdate({ _id: id }, { comment, name }, { new: true });
    }

    getAllComments() {
        return Comments.find();
    }

}


export default CommentRepository