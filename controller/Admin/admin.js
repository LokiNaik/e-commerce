const express = require('express')
const app = express()
const mongo = require('mongodb')
const connectToMongoDB = require('../../dbConfig')

exports.addProduct = async (req, res) => {
    let productDetails = {
        pName: req.body.pName,
        pPrice: req.body.pPrice,
        pDescription: req.body.pDescription,
        pQuantity: req.body.pQuantity
    }
    const client = await connectToMongoDB()
    let db = client.db()
    const product = await db.collection('products').insertOne(productDetails)
    if (!product) {
        return res.status(401).send({ message: "Error in adding the Product" })
    }
    res.status(200).json({ message: "Product added successfully!" })
}

exports.listProduct = async (req, res) => {
    const client = connectToMongoDB()
    let db = (await client).db()
    try {
        const productList = await db.collection('products').find().toArray()
        if (!productList) {
            return res.status(400).json({ message: 'no products found' })
        }
        res.status(200).send(JSON.stringify(productList))
    } catch (error) {
        console.log('error', error)
        res.status(500).json('Internal error occured!')
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const client = await connectToMongoDB();
    let db = client.db();
    const deleteResult = await db.collection("products").deleteOne({ _id: new mongo.ObjectId(id) });
    if (!deleteResult || !deleteResult.deletedCount) {
        return res.status(404).send({ message: "No such product exists." });
    }
    res.status(200).send({ message: `Deleted ${deleteResult.deletedCount} documents.` });
}