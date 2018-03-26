const nodeMailer = require('nodemailer')

class Mail {
  constructor (emailTujuan, username) {
    this.emailTujuan = emailTujuan
    this.username = username
  }
  send () {
    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'drifely.emergency@gmail.com',
        pass: 'emergencypassword'
      }
    })
    const mailOption = {
      from    : 'drifely.emergency@gmail.com',
      to      : this.emailTujuan,
      subject : 'Warning for reckless driving',
    }
    transporter.sendEmail(mailOption, (err, info) => {
      if (!err) console.log(info);
    })
  }  
}

module.exports = Mail;