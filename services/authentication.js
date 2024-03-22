const JWT=require('jsonwebtoken');
const secret="butterfly@1234";


function createTokenForUSer(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageurl:user.profileImageurl,
        role:user.role
    };
    const token=JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={createTokenForUSer,validateToken}