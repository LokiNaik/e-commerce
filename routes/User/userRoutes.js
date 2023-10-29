const express = require('express')
const { listProduct } = require('../../controller/Admin/admin')
const app = express

const userProducts = express.Router()
userProducts.get('/listProducts' , listProduct)

module.exports = userProducts