const express = require('express')
const { addProduct, listProduct, deleteProduct } = require('../../controller/Admin/admin')

const productRoute = express.Router()
productRoute.post('/addProduct', addProduct) 
productRoute.get('/getProducts', listProduct)
productRoute.delete(`/delete/:id`, deleteProduct)

module.exports = productRoute