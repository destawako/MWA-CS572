
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.getAllStudents = function(req, res){
    var offset = 0;
    var count = 3;
    const maxCount = 10;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
        if(count > 7){
            count = 7;
        }
    };

    console.log(count);
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "QueryString offset and count should be numbers"})
        return;
    }

    if(count>maxCount){
        res.status(400).json({"message": "Count exceded the max number of 7"})
         return;
    }

    //using mongooose
    Student.find().skip(offset).limit(count).exec(function(err, students){
        const response = {
            status: 200,
            message: students
        }
        if(err){
            console.log("Error finding students ");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        }
    )
    
}


module.exports.getOneStudent = function(req, res){
    var studentId = req.params.studentId;

    console.log("student ID is" , studentId)

    Student.findById(studentId).exec(function(err, students){
        console.log(students);
        const response = {
            status: 200,
            message: students
        }
        if(err){
            console.log("Found Errors ", err);
            response.status = 500;
            response.message = err;
        }else if(!students){
            response.status = 404;
            response.message = {"message" :"Student ID not found"};
        }
            res.status(response.status).json(response.message);  
     });
};


module.exports.deleteOneStudent = function(req, res){
    var gameId = req.params.gameId;
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response = {
            status: 204,
            message: deletedGame
          };

          if(err){
              response.status = 500,
              response.message = err
          } else if (!deletedGame){
              response.status = 404,
              response.message = err;
          }

          //something went wrong
          res.status(response.status).json(response.message);

        //   if(response.status !== 204){

        //   }else{
        //       //we got a game but we need to update it
        //       deletedGame.title = req.body.title;
        //       deletedGame.year = parseInt(req.body.year);
        //       deletedGame.price = parseFloat(req.body.prie);
        //       deletedGame.rate = parseInt(req.body.rate);
        //       deletedGame.minPlayers = parseInt(req.body.minPlayers);
        //       deletedGame.maxPlayers = parseInt(req.body.maxPlayers);
        //       deletedGame.minAge = parseInt(req.body.minAge);
        //       deletedGame.designers = req.body.designers;
        //       deletedGame.save(function(err, updatedGame){
        //           response.message = updatedGame;
        //           if(err){
        //               response.status =  500,
        //               response.message = err;
        //           }

        //           res.status(response.status).json(response.message);
        //       })
            
        //   }
    })
}

module.exports.addOneStudent = function(req, res){

        console.log("POST to add a game");
    
        // var newGame;
        console.log(req.body);
        // if(req.body && req.body.title && req.body.rate 
        //     && req.body.price && req.body.minPlayers &&
        //     req.body.maxPlayers && req.body.minAge){
            
            // console.log(newGame);
            Student.create({
                name: req.body.name,
                gpa: req.body.gpa,
                
    
    
            }, function(err, student){
                const response = {
                    status: 201,
                    message: student
                }
                if(err){
                  response.status = 400,
                  response.message = err
                }
    
                res.status(response.status).json(response.message);
            });
            // collection.insertOne(newGame, function(err, response){
            //     console.log("--------------------" + response.ops);
            //     res.status(201).json(req.body);
            // });
            console.log(req.body);
         {
            console.log("Data missing from POSt body");
            // res.status(400).json({error: "Required data missing from POST"});
        }
    
}

module.exports.updateOneStudent = function(req, res){
    console.log("==========")
    var studentId = req.params.studentId;
    Student.findById(studentId).select("-reviews -publisher").exec(function(err, student){
        const response = {
            status: 204,
            message: student,
          };
 console.log("++++++")
          if(err){
              response.status = 500,
              response.message = err
          } else if (!student){
              response.status = 404,
              response.message = err;
          }

          //something went wrong
          if(response.status !== 204){
            res.status(response.status).json(response.message);

          }else{
            console.log("++++++")

              //we got a game but we need to update it
            //   console.log(req.body + "=====body")
              student.name = req.body.name;
              student.gpa = req.body.gpa;
              console.log(student)


              student.save(function(err, updatedGame){
                  if(err){
                      response.status =  500,
                      response.message = err;
                  }
                      response.message = updatedGame;
                      console.log(updatedGame + " ========= yes")
                      res.status(response.status).json(response.message);
                  }
                  )
                   
            
          }
    })
}
