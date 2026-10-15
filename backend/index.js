import express from 'express'

const app = express()

app.get('/', (req, resp) => {
    resp.send({
        message : "api done true",
        success : true
    })
})

app.listen(3000)