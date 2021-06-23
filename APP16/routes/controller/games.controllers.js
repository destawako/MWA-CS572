const gamesData=require("../data/games.json");
module.exports.gamesGetAll=function(req, res) 
{
console.log("Json request received");
console.log( req.query);
let offset= 0;
let count= 10;
if ( req.query && req.query.offset ){
offset= parseInt (req.query.offset);
}
if ( req.query && req.query.count ){
count= parseInt (req.query.count)
}
console.log("offset", offset,"count",count)
const pageGames = gamesData.slice(offset, offset*count);

res.status(200).json(pageGames);
}
