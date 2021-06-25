const express = require("express");
require("./api/data/dbconnection").openConnection();
const routes = require("./api/routes");
require("./api/data/db")
const app = express();
app.set("port", 3000);
//-----------------------------MiddleWare start ----------

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.use("/api",routes);


//-----------------------------MiddleWare end ----------

  const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port " + port);
});
