
const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            //next();
        }
        try{
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;
          //  next();
        }catch(error){
    }
    next();
    };
}

module.exports={checkForAuthCookie,};