

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 10000) +'-'+ file.originalname)
    }
})
const upload = multer({ storage: storage }).array('file', 12);

exports.fileUpload = async (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            res.json({status: "failed", message:err});
        }else {
            res.json({status:"success", files:req.files});
        }
    })
}