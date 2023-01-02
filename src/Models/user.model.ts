import {Schema , model} from 'mongoose'
const UserSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique :  true,
        trim   :  true,
        required : true
    },
    password : {
        type: String,
        required : true
    }
}, {timestamps : true});

const User = model('users', UserSchema)
export default User 