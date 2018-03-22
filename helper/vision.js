const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
 projectId: process.env.PROJECT_ID,
 keyFilename: process.env.KEYFILE_PATH
});

module.exports = function (req,res,next) {
  client
   .textDetection(`gs://${process.env.BUCKET_NAME}/images/${req.file.cloudStorageObject}`)
     .then(result => {
        req.body.rawvision = result[0].fullTextAnnotation.text.split('\n')
        req.body.vision = {}
        req.body.rawvision.map(each => {
          console.log(each.slice(0,7))
          if (each === 'SURAT IZIN MENGEMUDI') req.body.vision.sim = true;
          else if (each.slice(0,4) === 'Nama') {
            let temp = each.split(' ').filter(char => char !== ':')
            req.body.vision.name = temp.slice(1).join(' ')
          }
          else if (each === 'PRIA' || each === 'WANITA') req.body.vision.gender = each;
          else if (each.slice(0,7) === 'No. SÍM' || each.slice(0,7) === 'No. SIM') req.body.simNum = each.slice(-12)
        })
        next() 
     })
     .catch(err => {
        res.send({msg: 'vision error', err})
     })
}