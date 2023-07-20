const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/feedback', async (req, res) => {

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `${req.body.title}` || 'Empty title',
        html: `<div style="border: 1px solid black; border-radius: 6px; font-size: 21px;padding: 10px 20px; min-height: 500px; background-color: rgb(255,218,221);">
<h1>${req.body.name}</h1>
${req.body.message} 
        <div><b>Contacts</b>: phone: ${req.body.phone}; email: ${req.body.email}</div>
</div>`,
    })

    res.send({message: 'Ваше сообщение доставлено. Я свяжусь с вами в ближайшее время'})
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port 3010`)
})