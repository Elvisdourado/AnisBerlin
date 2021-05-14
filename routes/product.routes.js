const router = require('express').Router()
const ProductModel = require('../models/Product.model')
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAdmin = require("../middlewares/isAdmin");
const uploadCloud = require("../config/cloudinary.config");

//UPLOAD IMAGE FROM CLOUDINARY  
router.post(
    '/image-upload',
    isAuthenticated,
    attachCurrentUser,
    uploadCloud.single('image'),
    (req, res) => {
        if(!req.file) {
            return res.status(500).json({ msg: 'No file uploaded' })
        }
        return res.status(201).json({ fileUrl: req.file.path })
    }
)

//CREATE PRODUCT FOR ADMIN
router.post(
    "/products",
    isAuthenticated,
    attachCurrentUser,
    isAdmin,
    async (req, res) => {
        console.log(req.body)
        try{
            if (!req.body.image_url){
                delete req.body.image_url
            }

            const result = await ProductModel.create(req.body)
            return res.status(201).json(result)
        } catch(err) {
            console.error(err)
            return res.status(500).json({ msg: JSON.stringify(err) })
        }
    }
)

//READ ALL PRODUCTS
router.get('/products', async (req, res) => {
    try{
        const result = await ProductModel.find()
        console.log(result)

        if(result){
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ msg: 'Product not found' })
        } 
    } catch(err) {
        console.error(err)
        return res.status(500).json({ msg: JSON.stringify(err) })
    }
})

//READ ONE PRODUCT
router.get('/products/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const result = await (await ProductModel.findOne({ _id: id }))
        // .populated({
        //     path: 'transactions',
        //     model: "Transaction",
        // })
        console.log(result)

        if (result){
            return res.status(200).json({ ...result.toObject()})
        } else {
            return res.status(404).json({ msg: 'Product not found' })
        }
    } catch(err) {
        console.error(err)
        return res.status(500).json({ msg: JSON.stringify(err) })
    }
})

//UPDATE PRODUCT FOR ADMIN
router.put('/products/:id', isAuthenticated, attachCurrentUser, isAdmin,
    async (req, res) => {
        try{    
            const { id } = req.params
            const result = await ProductModel.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            )
            console.log(result)

            if (!result) {
                return res.status(404).json({ msg: 'Product not found' })
            }

            return res.status(200).json(result)
        } catch(err) {
            console.error(err)
            return res.status(500).json({ msg: JSON.stringify(err) })
        }
    })

//DELETE PRODUCT FOR ADMIN
router.delete('/products/:id', isAuthenticated, attachCurrentUser, isAdmin,
    async (req, res) => {
        try{
            const { id } = req.params
            const result = await ProductModel.deleteOne({ _id: id })
            console.log(result)

            if (result.n === 0){
                return res.status(404).json({ msg: 'Product not found' })
            }

            return res.status(200).json({})
        } catch(err) {
            console.log(err)
            return res.status(500).json({ msg: JSON.stringify(err) })
        }
    })

module.exports = router