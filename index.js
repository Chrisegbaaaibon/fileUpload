const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const fs = require('fs');
const upload = require('./controller/multer')
const cloudinary = require('./controller/cloudinary');
const folder = require('./database/schema');
const { db } = require('./database/connection');


const app =express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use('/api', upload.array('image'), async (req, res) => {

   const uploader = async (path) => await cloudinary.uploads(path, 'Images');
 
   if (req.method === 'POST') {
     const  urls  = [ new folder({ load }) ]
     const files = req.files.load;
     
     for (const file of Object.keys({ files })) {
       const { path } = file;
       const newPath = await uploader(path)
       const imageSaved =  urls.push(newPath);
       await imageSaved.save()
     }
 
     res.status(200).json({
       message: 'images uploaded successfully',
       data: urls
     })
 
   } else {
     res.status(405).json({
       err: `${req.method} method not allowed`
     })
   }
 })
 

app.listen(process.env.PORT || 8000,  ()=>{
  db()
   console.log('8000')
})