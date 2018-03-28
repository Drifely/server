const chaiHTTP = require('chai-http')
const chai = require('chai')
const expect = chai.expect
const should = chai.should
const assert = chai.assert
const axios = require('axios')
const app = require('../app')
const fs = require('fs')
const decode = require('../helper/decode')
const vision = require('../helper/vision')
const GCShelper = require('../helper/multer')
const mailer = require('../helper/mailer')

chai.use(chaiHTTP)

// const file  = fs.readFileSync('./test/simyakuza.jpg')
// console.log('ini file', file)
describe('user find all end point', function () {
	it('return array of object data', done => {
		this.timeout(4000)
		chai.request(app)
			.get('/users')
			.end((err,res)=>{
				expect(err).null
				expect(res).to.be.an('object')
				done()
			})
	})
})

describe('user /reg', function (){
	it('should pass if', function(done) {
		const objectadd = {
			simNum: '12345',
			address: 'jalan haji nawi',
			name: 'danur',
			gender: 'male',
			dop: '02 januari 99',
			pob: 'jakarta'
		}
		chai.request(app)
		 .post('/users/reg')
		 .set('content-type', 'application/x-www-form-urlencoded')
		 .send(objectadd)
		 .end((err,data)=> {
			 expect(data.request._data).to.be.an('object')
			 expect(data.request._data).to.haveOwnProperty('simNum')
			 done()
		 })

	})
})

describe('error /simBio test', function () {
	it('should pass if', function (done) {
		// const file  = fs.readFileSync('../assets/simyakuza','utf-8')
		chai.request(app)
		 .post('/users/simBio')
			// .attach('image',fs.readFileSync(__dirname,'utf-8','./simyakuza.jpg'))
			.end((err,response)=> {
				expect(response).status(500)
				done()
			})
	})
})


describe('/dummy post all database',function () {
	it('create new dummy', function (done) {
		const objectadd = {
			simNum: '12345',
			address: 'jalan haji nawi',
			name: 'danur',
			gender: 'male',
			dop: '02 januari 99',
			pob: 'jakarta'
		}
		chai.request(app)
			.post('/users/dummy')
			.send(objectadd)
			.end((err, resp) => {
				// console.log(resp.res)
				expect(JSON.parse(resp.res.text)).to.be.an('object')
				expect(resp.status).equal(200)
				done()
			})
	})
})

describe('/dummy post all database(error)', function () {
	it('create new dummy', function (done) {
		chai.request(app)
			.post('/users/dummy')
			.end((err, resp) => {
				// console.log(resp.data.error)
				expect(JSON.parse(resp.res.text).error).to.eq(true)
				done()
			})
	})
})


describe('/dummy delete all database', function () {
	it('should drop db', function (done) {
		chai.request(app)
			.del('/users/dummy')
			.end((err, resp) => {
				expect(JSON.parse(resp.res.text).msg).to.equal('deleted all dummies')
				expect(resp.status).equal(200)
				done()
			})
	})
})

describe('/index ', function (){
	it('should res 200', function(done) {
		// console.log('ini decoded', decode)
		chai.request(app)
		 .get('/')
		 .end((err, resp)=> {
			 expect(resp).status(200)
			 done()
		 })

	})
})

describe('function helper: decode', function () {
	it('expect pass', function (done) {
		const req = {
			headers:{
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI3YTgwM2M2ZTRiMTdhN2M2ZmVkMjYiLCJfX3YiOjAsImlhdCI6MTUyMTk4NTUzOX0.JtyvrD_BpTW6RldGrX-AX0jLpJRot-TsisHs2kdVxsw'
			},
			body: {
				decoded: ''
			}
		}
		const res = {
			send : (object) => {
				console.log(object)
			}
		}
		const next = () => {
			console.log('succes')
		}
		expect(decode).to.be.a('function')
		expect(decode(req,res,next))
		// should(decode)
		done()
	})
})

describe('function helper: decode (fail)', function () {
	it('expect pass', function (done) {
		const req = {
			headers: {
				token: 'eOjAsImlhdCI6MTUyMTk4NTUzOX0.JtyvrD_BpTW6RldGrX-AX0jLpJRot-TsisHs2kdVxsw'
			},
			body: {
				decoded: ''
			}
		}
		const res = {
			send: (object) => {
				console.log(object)
			}
		}
		const next = () => {
			console.log('succes')
		}
		expect(decode).to.be.a('function')
		expect(decode(req, res, next))
		// should(decode)
		done()
	})
})

describe('testing get public url multer', function () {
	it('pass if', function(done) {
		// console.log(GCShelper.multer.single('image')())
		const filename = 'test'
		expect(GCShelper.getPublicUrl(filename)).equal(`https://storage.googleapis.com/${process.env.BUCKET_NAME}/images/${filename}`)
		done()
	})
})

describe('testing sending file to gcs', function () {
	it('should pass ', function (done) {
		const req = {
			file: {
				originalname: 'haha'
			},
			body: {
				decoded: ''
			}
		}
		const res = {
			send: (object) => {
				console.log(object)
			}
		}
		const next = () => {
			console.log('next')
		}
		// console.log(GCShelper.sendUploadToGCS(req, res, next))
		expect(GCShelper.sendUploadToGCS(req, res, next))
		done()
	})
})


describe('testing sending file to gcs', function () {
	it('should pass ', function (done) {
		const req = {
			file: {
				originalname: 'haha'
			},
			body: {
				decoded: ''
			}
		}
		const res = {
			send: (object) => {
				console.log(object)
			}
		}
		const next = () => {
			console.log('next')
		}
		// console.log(GCShelper.sendUploadToGCS(req, res, next))
		expect(GCShelper.sendUploadToGCS(req, res, next))
		done()
	})
})


describe('testing helper: vision', function () {
	it('give pass pls ', function(done) {
		const file = fs.readFileSync('./test/simyakuza.jpg')
		const req = {
			file : {
				cloudStorageObject: file
			}
		}
		const res = {}
		const next = () => {
			console.log('next')
		}
		expect(vision(req,res,next))
		done()
	})
})

describe('upload endpoint', function () {
	const fileImg = fs.readFileSync('./test/simyakuza.jpg')
	// console.log('AHAHAAAA', fileImg)
	it('succes pls', function (done) {
		this.timeout(12000)
		chai.request(app)
		 .post('/users/simbio')
		 .type('form')
		//  .field('image',fileImg)
		 .attach('image', './test/simyakuza.jpg')
		 .end((err, resp) => {
			//  console.log('ini resp ============> ', resp.body.vision.sim)
			 expect(resp.body.vision.sim).to.eql(true)
			 expect(resp.body.vision).to.be.an('object')
			 done()
		 })
		
	})
})


describe('testing /emergency ', function () {
	it('return object equal true', function (done) {
		chai.request(app)
		 .get('/users/emergency')
			.set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI5Mzc2ZDcxNDM4NDE5ZDg0NTRlOTQiLCJfX3YiOjAsImlhdCI6MTUyMjA4Nzc4OX0.lbMC25nmX-d_zplGbQVBRaI0uUpD0y1Xq_N3NBKYHj0')
			.end((err,response)=> {
				expect(response).to.be.an('object')
				done()
			})
	})
})

describe('testing helper : mailer',function () {
	it('expect mailer function', function(done) {
		this.timeout(10000)
		// console.log(mailer)
		expect(mailer).to.be.a('Function')
		done()
	})

	it('testing the function ',function (done) {
		this.timeout(5000)
		let nexmoPayload = {
			api_key: '1ba88109',
			api_secret: '6gxuZl4lPvowscIZ',
			to: '0817182738',
			from: 'drifely',
			text: `This is a text message sent from dorman's phone. dorman is driving recklessly, please advise.`
		};
		let mail = new mailer('hafizh.abdillahh@gmail.com', 'dorman')
		expect(mail.send())
		done()
	})
})