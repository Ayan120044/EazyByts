import { Types, Document } from "mongoose";
export interface UserDocument extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    portfolios: Types.ObjectId[];
}
export declare const UserModel: import("mongoose").Model<UserDocument, {}, {}, {}, Document<unknown, {}, UserDocument, {}, {}> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map