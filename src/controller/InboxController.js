const InboxModel = require("../model/InboxModel");

exports.createInbox = async (req, res) => {
    try {
        const reqBody = req.body;
        const data = await InboxModel.create(reqBody);
        return res.json({status:"success", message:"Message sent successfully", data: data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}

exports.getInbox = async (req, res) => {
    try {
        const perPage = Number(req.params.perPage) || 10;
        const pageNo = Number(req.params.pageNo) || 1;
        const skip = (pageNo-1)*perPage;

        const data = await InboxModel.aggregate([
            {
                $facet: {
                    "data": [
                        {$match: {}},
                        {$sort:{createdAt:-1}},
                        {$skip: skip},
                        {$limit: perPage},
                    ],
                    "total": [
                        {$count: "count"}
                    ]
                }
            }
        ]);
        return res.json({status:"success", total: data[0].total[0].count, data: data[0].data});
    }catch (e) {
        res.json({status:"error", message:e.message});
    }
}