var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { getModelForClass, index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import paginationPlugin from 'typegoose-cursor-pagination';
var roles;
(function (roles) {
    roles["admin"] = "admin";
    roles["user"] = "client";
})(roles || (roles = {}));
let Client =
    // Export the User class to be used as TypeScript type
    class Client {
    };
__decorate([
    prop({ default: 'نام' }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    prop({ default: 'کاربر' }),
    __metadata("design:type", String)
], Client.prototype, "family", void 0);
__decorate([
    prop({ unique: true, required: true }),
    __metadata("design:type", String)
], Client.prototype, "mobile", void 0);
__decorate([
    prop({ enum: roles, default: 'client' }),
    __metadata("design:type", String)
], Client.prototype, "role", void 0);
__decorate([
    prop({ default: true }),
    __metadata("design:type", Boolean)
], Client.prototype, "approve", void 0);
Client = __decorate([
    plugin(paginationPlugin),
    index({ mobile: 1 }, { unique: true }),
    index({ role: 1 }),
    index({ approve: 1 }),
    modelOptions({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
            versionKey: false
        }
    })
    // Export the User class to be used as TypeScript type
], Client);
export { Client };
// Create the user model from the User class
const clientModel = getModelForClass(Client);
export default clientModel;
