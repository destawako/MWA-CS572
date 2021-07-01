
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

// 

module.exports.addOneStudent = function(req, res){
    console.log("POST to add a game");

    // var newGame;
    console.log(req.body);
    
        Student.create({
            name: req.body.name,
            age: req.body.age,
            
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
       
        console.log(req.body);
     {
        console.log("Data missing from POSt body");
    }
}

module.exports.deleteOneStudent = function(req, res){
    var gameId = req.params.gameId;
    Student.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response = {
            status: 204,
            message: deletedGame
          };

          if(err){
              response.status = 500,
              response.message = err
        //   } else if (!deletedGame){
        //       response.status = 404,
        //       response.message = err;
             }

          //something went wrong
          res.status(response.status).json(response.message);

      
    })
}
