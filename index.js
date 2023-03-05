const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
const student_router = require('./routers/students')
app.use('/',student_router);
const router = express.Router();

app.listen(port, () => {
  console.log(`CRUD Student listening on port ${port}`)
})

module.exports=router