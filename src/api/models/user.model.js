import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const roles = ['admin', 'user'];

const UserSchema = new Schema(
    {
        name: String,
        family: String,
        username: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 32,
            select: false,
        },
        mobile: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
            enum: roles,
            default: 'user',
            index: true,
        },
        approve: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.pre('save', async function () {
    // Hash password if the password is new or was updated
    if (!this.isModified('password')) return;

    // Hash password with costFactor of 12
    this.password = await bcrypt.hash(this.password, 12);
});

// Instance method to check if passwords match
UserSchema.methods.comparePasswords = async function (
    hashedPassword,
    candidatePassword
) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};

// Create the user model from the User class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
