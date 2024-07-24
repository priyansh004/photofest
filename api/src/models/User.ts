// src/models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    posts?: mongoose.Types.ObjectId[]; // Array of Post references
    isAdmin: boolean;
    googleId?: string;
    profilePic?: string;
    displayName?: string;
}

// Create a Schema corresponding to the interface.
const UserSchema: Schema<IUser> = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Optional reference to Post documents
        isAdmin: { type: Boolean, required: true, default: false },
        googleId: { type: String },
        profilePic: { type: String, default: "https://res.cloudinary.com/db9wcsulz/image/upload/v1721811936/profile_sfwuor.jpg" },
        displayName: { type: String }
    },

    {
        timestamps: true // Automatically manages createdAt and updatedAt fields
    }
);

// Create and export the model.
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
