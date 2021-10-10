import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 40 },
    description: { type: String, trim: true, minlength: 20 },
    createdAt: { type: Date, required: true, default: () => Date.now() }, // default: Date.now 같다.
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 }
    }
});

const Video = mongoose.model("Video", videoSchema);

export default Video;