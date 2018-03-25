const chaiHTTP = require('chai-http')
const chai = require('chai')
const expect = chai.expect
const should = chai.should
const app = require('../app')
const fs = require('fs')
const decode = require('../helper/decode')

chai.use(chaiHTTP)

describe('user find all end point', function () {
	it('return array of object data', done => {
		chai.request(app)
			.get('/users')
			.end((err,res)=>{
				expect(err).null
				// console.log(err)
				// console.log(res)
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
		chai.request(app)
			.post('/users/dummy')
			.end((err, resp) => {
				// console.log(resp.res)
				expect(JSON.parse(resp.res.text)).to.be.an('object')
				expect(resp.status).equal(200)
				done()
			})
	} )
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