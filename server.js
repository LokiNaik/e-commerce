const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const user = require('./controller/user')
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')   
})

app.post('/createUser', (req, res) => {
    console.log(req.body)
    res.json({message: 'user created'})
})

app.use('/api', user)


app.listen(8000, () => {
    console.log('server is running on port 8000!')
})