import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarFile: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    socialOnly: { type: Boolean, default: false },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    isModifed: { type: Boolean, default: false },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]
});

userSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 5);
});

// userSchema.static("encryptPassword", function(password) {
//     return bcrypt.hash(password, 5);
// });

const User = mongoose.model("User", userSchema);

export default User;