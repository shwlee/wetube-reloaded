import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 40 },
    description: { type: String, trim: true, minlength: 20 },
    createdAt: { type: Date, required: true, default: () => Date.now() }, // default: Date.now 같다.
    hashtags: [{ type: String, trim: true }],
    file: { type: String, required: true },
    meta: {
        views: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
});

// videoSchema.pre("save", function() {
//     console.log(this);
//     this.hashtags = this.hashtags[0].split(",").map(hashtag => hashtag.startsWith("#") ? hashtag : `#${hashtag}`);
// })

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(" ").map(hashtag => hashtag.startsWith("#") ? hashtag : `#${hashtag}`);
})

const Video = mongoose.model("Video", videoSchema);

export default Video;