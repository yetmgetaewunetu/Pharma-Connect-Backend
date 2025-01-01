const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
 
const UserSchema = new mongoose.Schema({
    
    firstName :{ 
        type: String, 
        required: [true, 'First name is required'], 
        trim: true,
    },
    lastName :{ 
        type: String, 
        required: [true, 'Last name is required'], 
        trim: true, 
    },
    email :{ 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password :{ 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [8, "Password must be at least 8 characters long"],
        // select:false,
    },
    phoneNumber :{ 
        type: String, 
        // required: [true, 'Phone number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
    },
    role :{ 
        type: String, 
        enum: ['user', 'admin','pharmacy'], 
        default: 'user' 
    },
    createdAt :{ 
        type: Date, 
        default :  Date.now
    },
    passwordChangedAt : Date,
    resetPasswordToken : String,
    resetPasswordExpires : Date,
    active: {
        type:Boolean,
        default: true,
        select: false
    }
})


UserSchema.pre('save', async function (next) {
 
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);  
    }
});


// password reset token generator

UserSchema.methods.passwordResetTokenGenerator = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordToken = hashed;
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
};


const User = mongoose.model('User', UserSchema)

module.exports = User;