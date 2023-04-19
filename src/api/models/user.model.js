var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { getModelForClass, index, modelOptions, plugin, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import paginationPlugin from 'typegoose-cursor-pagination';
var roles;
(function (roles) {
    roles["admin"] = "admin";
    roles["user"] = "user";
})(roles || (roles = {}));
let User = 
// Export the User class to be used as TypeScript type
class User {
    // Instance method to check if passwords match
    async comparePasswords(hashedPassword, candidatePassword) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
};
__decorate([
    prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], User.prototype, "family", void 0);
__decorate([
    prop({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    prop({ required: true, minlength: 8, maxlength: 32, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    prop({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    prop({ enum: roles, default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    prop({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "approve", void 0);
User = __decorate([
    plugin(paginationPlugin),
    index({ username: 1 }, { unique: true }),
    index({ role: 1 }),
    index({ approve: 1 }),
    pre('save', async function () {
        // Hash password if the password is new or was updated
        if (!this.isModified('password'))
            return;
        // Hash password with costFactor of 12
        this.password = await bcrypt.hash(this.password, 12);
    }),
    modelOptions({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
            versionKey: false
        }
    })
    // Export the User class to be used as TypeScript type
], User);
export { User };
// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
