import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    socialOnly: { type: Boolean, default: false },
    location: String
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

userSchema.static("encryptPassword", function(password) {
    return bcrypt.hash(password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;