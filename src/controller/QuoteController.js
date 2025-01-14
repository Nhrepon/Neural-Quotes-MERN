const QuoteModel = require("../model/QuoteModel");
const QuoteMeta = require("../model/QuoteMeta");

exports.createQuote = async (req, res) => {
    try{
        const reqBody = req.body;
        reqBody.userId = req.headers.userId;
        const data = await QuoteModel.create(reqBody);
        const meta = {
            quoteId:data['_id'],
            likes:reqBody.likes,
            views:reqBody.views,
            sharedCount:0
        }
        const quoteMeta = await QuoteMeta.create(meta);
        res.json({status:"success", data:data, meta:quoteMeta});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}