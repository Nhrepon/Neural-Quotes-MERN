const mongoose=require('mongoose');

const databaseSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, require:true},
    userName:{type:String, require:true, unique:true},
    firstName:{type:String, default: '' },
    lastName:{type:String, default: '' },
    age:{type:String, default: '' },
    gender:{type:String, default: '' },
    userMobile:{type:String, default: '' },
    userAddress:{type:String, default: '' },
    userPostalCode:{type:String, default: '' },
    userDistrict:{type:String, default: '' },
    userCity:{type:String, default: '' },
    userState:{type:String, default: '' },
    userCountry:{type:String, default: 'Bangladesh' },

    shippingAddress:{type:String, default: '' },
    shippingPostalCode:{type:String, default: '' },
    shippingDistrict:{type:String, default: '' },
    shippingCity:{type:String, default: '' },
    shippingState:{type:String, default: '' },
    shippingCountry:{type:String, default: 'Bangladesh' },


}, {timestamps:true, versionKey:false});


const ProfileModel=mongoose.model('profiles', databaseSchema);
module.exports = ProfileModel;