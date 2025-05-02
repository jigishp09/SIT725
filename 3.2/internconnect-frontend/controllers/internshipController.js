const express = require('express');
const Internship = require("../models/Internship");

module.exports = function(io){
  const router = express.Router();

  router.post('/', async (req, res) =>{
    try{
      const internship = new Internship(req.body);
      await internship.save();

      io.emit('newInternship',internship);

      res.status(201).json(internship);
      console.log("📩 Received Internship:", req.body);

    }catch (err){
      res.status(500).json({error:'Error posting internship'})
    }
  });

  return router;
}