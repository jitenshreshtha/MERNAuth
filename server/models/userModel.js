import mongoose from 'mongoose';
import bcrypt from 'brcypt';


const userSchema = new Mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        minLength: [8, "password must have at least 8 characters"],
        maxLength: [32, "password cannot have more than 32 characters"],
    },
    phone: String,
    accountVerified: { type: Boolean, deafult: false },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date, default: Date.now
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);