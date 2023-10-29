const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const user = require('./controller/user')
const productRoute = require('./routes/Admin/adminRoutes')
const userProducts = require('./routes/User/userRoutes')
app.use(bodyParser.json())
app.use(cors())


app.use('/api', user)
app.use('/api/user', userProducts)
app.use('/api/admin', productRoute)


app.listen(8000, () => {
    console.log('server is running on port 8000!')
})