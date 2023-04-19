var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { getModelForClass, index, modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import paginationPlugin from 'typegoose-cursor-pagination';
import { Client } from './client.model';
var statuses;
(function (statuses) {
    statuses["accepted"] = "accepted";
    statuses["rejected"] = "rejected";
    statuses["pending"] = "pending";
})(statuses || (statuses = {}));
let Request = 
// Export the User class to b e used as TypeScript type
class Request {
};
__decorate([
    prop({ enum: statuses, default: 'pending' }),
    __metadata("design:type", String)
], Request.prototype, "status", void 0);
__decorate([
    prop({ ref: () => Client }),
    __metadata("design:type", typeof (_a = typeof Ref !== "undefined" && Ref) === "function" ? _a : Object)
], Request.prototype, "client", void 0);
__decorate([
    prop({ require: true }),
    __metadata("design:type", Array)
], Request.prototype, "files", void 0);
__decorate([
    prop({ require: true }),
    __metadata("design:type", String)
], Request.prototype, "address", void 0);
__decorate([
    prop({ require: true }),
    __metadata("design:type", Number)
], Request.prototype, "lat", void 0);
__decorate([
    prop({ require: true }),
    __metadata("design:type", Number)
], Request.prototype, "long", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Request.prototype, "description", void 0);
Request = __decorate([
    plugin(paginationPlugin),
    index({ client: 1 }),
    index({ user: 1 }),
    modelOptions({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
            versionKey: false
        }
    })
    // Export the User class to b e used as TypeScript type
], Request);
export { Request };
// Create the user model from the User class
const requestModel = getModelForClass(Request);
export default requestModel;
