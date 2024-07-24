import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IPost extends Document {
    title: string;
    desc: string;
    url: string;
    comments?: mongoose.Types.ObjectId[]; // Array of Comment references
    author: mongoose.Types.ObjectId; // Reference to the User model
}

// Create a Schema corresponding to the interface.
const PostSchema: Schema<IPost> = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        url: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Optional reference to Comment documents
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true // Automatically manages createdAt and updatedAt fields
    }
);

// Create and export the model.
const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
