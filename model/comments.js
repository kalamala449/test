import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    id: {
        type: Number, 
        unique: true
    }, 
    name: {
        type: String,
    },
    comment: {
        type: String,
    }
})

const comment = mongoose.model('comment', commentSchema);

export default comment;