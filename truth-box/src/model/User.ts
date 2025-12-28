import mongoose , {Schema , Document, Model} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    vefifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username : {
        type: String,   
        required: true,
        trim: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        match:[/.+@.+\..+/, 'Please fill a valid email address'],
        unique: true
    },
    password : {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    vefifyCode : {
        type: String,
        required: false
    },
    verifyCodeExpiry : {        
        type: Date,
        required: false
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    isAcceptingMessages : {
        type: Boolean,
        default: true
    },
    messages : [MessageSchema]
})  



const UserModel: Model<User> = 
    mongoose.models.User || mongoose.model<User>("User", UserSchema);export default UserModel;