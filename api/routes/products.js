const express=require('express')
const router=express.Router()
const multer=require("multer")
const checkAuth=require("../middleware/chechAuth")

const ProductsController=require("../controllers/products")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },

    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString()+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else
    cb(null,false)
};

const upload=multer(
    {   storage:storage,
        limits:{
        fileSize:1024*1024*5
            },
        fileFilter:fileFilter
})

router.get("/", ProductsController.products_get_all);

router.post("/", upload.single('productImage'),ProductsController.products_post)

router.get("/:productId",ProductsController.products_getBy_id)

router.patch("/:productId",ProductsController.products_getBy_id);

router.delete('/:productId',ProductsController.products_delete);

module.exports=router;