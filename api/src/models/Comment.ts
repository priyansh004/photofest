import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId; // Reference to the User model
  post: mongoose.Types.ObjectId; // Reference to the Post model
  parentComment?: mongoose.Types.ObjectId; // Reference to the parent comment, if any
  replies?: mongoose.Types.ObjectId[]; // Array of comment IDs for replies

}

// Create a Schema corresponding to the interface.
const CommentSchema: Schema<IComment> = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // Link to parent comment
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Array of replies
   
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt fields
  }
);

// Create and export the model.
const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
