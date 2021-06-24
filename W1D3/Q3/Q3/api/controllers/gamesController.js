const e = require("express");
const dbConnection = require("../data/dbconnection");

module.exports.getGames = function (req, res) {
  var offset = 0; 
  var count = 0;

  var number = parseInt(req.params.number);
  
  
  if (number > 8) {
    offset =+ count;
    count =8;
  }else if(number<=0){
    if(number<=-8){
      offset =+ count;
      count =8;
    }else{
      number = number *-1;
      offset =+ count;
      count=number;
    }    
  }else{
    offset=+count;
    count=number;
  }
  var db = dbConnection.getMyConnection();
  var collection = db.collection("games");
  console.log("offset is ", offset);
  console.log("count is ", count);
  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function (err, docs) {
      console.log("Found games", docs);
      res.status(200).json(docs);
    });
};
