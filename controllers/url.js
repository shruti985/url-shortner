const shortid=require("shortid")
const URL=require("../models/url.js")
async function generateShortId(req,res){
    const body=req.body;
     if(!body.url) return res.status(400).json({error:"url is required"})
        const existingurl=await URL.findOne({redirectURL:body.url})
    if(existingurl){
         return res.render("home",{
        id:existingurl.shortId
    })
    }
    const shortId=shortid()
    const result= await URL.create({
        redirectURL:body.url,
        shortId:shortId,
        visitHistory:[],
        createdBy:req.user._id
    })
    // return res.send(`Your short url is: ${shortId}`)
    return res.render("home",{
        id:shortId
    })
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId

   const result= await URL.findOne({shortId})
   return res.json({TotalClicks:result.visitHistory.length, 
    analytics:result.visitHistory
})
}
module.exports={generateShortId,handleGetAnalytics}