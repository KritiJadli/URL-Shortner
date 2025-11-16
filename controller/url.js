const{}=require("shortid");
const url=require('../models/url');
const shortid = require("shortid");
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body) res.status(400).json({error:'url is required'});
    const shortId=shortid();
    await url.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
    });
    return res.json({id:shortId})

}
module.exports={
    handleGenerateNewShortURL,
}