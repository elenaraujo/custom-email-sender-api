const express = require('express')
const sendEmails = require('./mailer')

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/send', async (req, res) => {
  try {

    const data = req.body
    const { emails } = req.body.content

    if (!emails) {
      return res.status(400).send('Lista de emails não informada')
    }

    sendEmails(data)

    res.status(200).send('Emails enviados com sucesso!')
    
  } catch (err) {
    res.status(400).send({ error: 'Erro ao tentar enviar emails' })
  }
})

app.listen(PORT, () => {
  console.log(` \n ✨ API executing in http://localhost:${PORT} ✨
  
  `)
})
