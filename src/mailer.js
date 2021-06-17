const nodemailer = require('nodemailer')

function sendEmails({ sender, content }) {
  const { emails, codes } = content
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: sender.email,
        pass: sender.pass,
    },
    tls: {
        rejectUnauthorized: false,
    }
  })

  emails.forEach((email, i) => {
    const data = {
      ...content,
      email,
      code: codes[i],
      transporter,
      sender: sender.email,
    }

    sendEmail(data)
  })
}
    
async function sendEmail(data) {
  const { email, code, value, transporter, sender, from } = data

  try {
    await transporter.sendMail({
        text: `Olá! Segue seu código do iFood no valor de R$${value},00! Código: ${code}`,
        subject: 'HackDay | Ifood Card',
        from: `${from}<${sender}>`,
        to: email
    })
  } catch (error) {
    return error
  }
}

module.exports = sendEmails