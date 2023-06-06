var express = require('express');
var router = express.Router();
const {urlModel} = require('../schemas/urlSchema');
const mongoose = require('mongoose');
const {dbUrl} = require('../common/dbConfig');
mongoose.connect(dbUrl);


/* GET ALL USER DATA */
router.get('/url', async function(req, res, next) {
    try{
      let urls = await urlModel.find();
      res.status(200).send({
        urls,
          message:"Urls fetched successfully"
      }
      )
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });

  router.post('/addurl',async(req, res)=>{
    try{
      let url = await urlModel.findOne({fullUrl:req.body.fullUrl});
  
      if(!url){
      let url = await urlModel.create(req.body);
      res.status(200).send({
        message:"URL added successfully",
      })
    }else{
        res.status(400).send({
            message:"URL already exist!"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });

  router.put('/url/:shortUrl',async(req, res)=>{
    try{
      let urlRedirect = await urlModel.findOne({shortUrl:req.params.shortUrl});
      
      if(urlRedirect){
        urlRedirect.clicks = urlRedirect.clicks+1;

        await urlRedirect.save();

        res.redirect(urlRedirect.fullUrl)

      res.status(200).send({
        urlRedirect,
        message:`Redirecting`
      })
    }else{
        res.status(400).send({
            message:"Something went wrong"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });


  module.exports = router;