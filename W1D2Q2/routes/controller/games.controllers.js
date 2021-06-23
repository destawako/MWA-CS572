const gameData=require("../data/games.json");

module.exports.gamesGetAll=function(req,res){

    console.log("JSON resquesy revecied");
    res.status(200).json(gameData);

}