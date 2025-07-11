const User=require("../models/user.js")
const {v4:uuid}=require("uuid")
const {setUser}=require("../service/auth.js")
async function handleUserSignUp(req,res){
    const {name,email,password}=req.body
    await User.create({
        name,email,password
    })
   return res.redirect("/")
}
async function handleUserLogin(req,res){
    const {email,password}=req.body
    const user=await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            error:"Invalid password or email"
        })
    }
const sessionId=uuid()
setUser(sessionId,user)
res.cookie('uuid',sessionId)
    return res.redirect("/")
}
module.exports={handleUserSignUp,handleUserLogin}