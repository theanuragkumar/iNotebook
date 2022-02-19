const connectToMango= require('./db');
const express = require('express');
var cors = require('cors');



// To connect to DataBAse
connectToMango();
const app = express()
const port = 5000

app.use(cors())
// to send data in request body
app.use(express.json())


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})
