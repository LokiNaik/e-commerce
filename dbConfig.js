const { MongoClient } = require('mongodb')

const path = 'mongodb://localhost:64000/e-commerce'



async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(path)
        console.log('Connected to MongoDB')
        return client
    } catch (error) {
        console.error('Error in connecting to MongoDB')
        throw error
    }
}
module.exports = connectToMongoDB