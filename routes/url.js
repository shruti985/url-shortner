const express=require("express")
const router=express.Router()
const {generateShortId,handleGetAnalytics}=require("../controllers/url.js")
const URL=require("../models/url.js")
router.post("/",generateShortId)
router.get("/analytics/:shortId",handleGetAnalytics)
router.get("/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},   //shorthand for {shortId:shortId}
        {$push:{
            visitHistory:{
               timestamp:Date.now()
            }
        }}
    )
    if (!entry) {
  return res.status(404).send("Short URL not found");
}
     res.redirect(entry.redirectURL)
})
module.exports=router
