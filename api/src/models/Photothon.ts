import mongoose, {Document,Schema} from "mongoose";

interface IPhotothon extends Document {
    title: string;
    desc: string;
    logourl: string;
    coverurl?: string;
    posts?: mongoose.Types.ObjectId[]; // Array of Post references
    admin: mongoose.Types.ObjectId;
    participants?: mongoose.Types.ObjectId[];
    rules?: string;
    prizes?: string;
}

const PhotothonSchema: Schema<IPhotothon> = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        logourl: { type: String, required: true },
        coverurl: { type: String },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Optional reference to Post documents
        admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        rules: { type: String },
        prizes: { type: String }
    },
    {
        timestamps: true // Automatically manages createdAt and updatedAt fields
    }
);