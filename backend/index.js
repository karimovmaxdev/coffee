const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors());

app.get('/', (req, res) => {
    const newObject = {
        id: 3,
        size: 'custom',
        cups: [ 10, 20, 30],
    }
  res.send(newObject)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})