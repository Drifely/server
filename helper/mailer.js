const nodeMailer = require('nodemailer')

class Mail {
  constructor (emailTujuan, username) {
    this.emailTujuan = emailTujuan
    this.username = username
  }
  send () {
    let transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'drifely.emergency@gmail.com',
        pass: 'emergencypassword'
      }
    })
    const mailOption = {
      from    : 'drifely.emergency@gmail.com',
      to      : this.emailTujuan,
      subject : 'Warning for reckless driving',
      html: `Hello ${this.username}, This is an email reminding you to drive safely`
    }
    transporter.sendMail(mailOption, function (err, info) {
      if (!err) {
        console.log(info);
      } else {
        console.log(err);
      }
    })
  }  
}

module.exports = Mail;