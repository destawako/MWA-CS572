const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressesGetAll = function(req, res){
    var studentId = req.params.studentId;
    if(Student.findById(studentId) == null){
        res.status = 404,
        res.status(404).json({"message" : "Student Id not found"});
    }

    Student.findById(studentId).select("address").exec(function(err, addresses){

        var address = addresses.address;
        console.log(address)
        const response = {
            status :200,
            message : address
        }
        if(err){
            response.status = 400,
            response.message = err
            console.log(err)
        }else{
            response.status = 200,
            response.message = address
            console.log(err)
        }
        
        res.status(response.status).json(response.message);
    })
}

module.exports.addressGetOne = function(req, res){

    var studentId = req.params.studentId;
    var addressId = req.params.addressId;

    Student.findById(studentId).select("address").exec(function(err, addresses){
     
        var addr = addresses.address.id(addressId);
        console.log(addresses.address.id(addressId))
        const response = {
            status : 200,
            message : addr
        };

        if(err){
            response.status = 500,
            response.message ={"message" : "Data base error"}
        }else if(!addresses){
            response.status = 404,
            response.message ={"message" : "Address ID not found"}
        }
        res.status(response.status).json(response.message);
    })


}
//////

var _addAddressOne = function(req,res,student){


    student.address.street = req.body.street;
    student.address.zip = parseInt(req.body.zip);
    student.address.location = req.body.location;
    student.address.city=req.body.city;
    
    student.save(function (err, updatedGame) {
      var response = {
          status: 200,
          message: updatedGame
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 201;
        response.message = updatedGame;
      }
      res.status(response.status).json(response.message);
    });
  
}

module.exports.addressAddOne = function(req, res){
    

    console.log("Post to add a review");
  var studentId = req.params.studentId;
  Student.findById(studentId)
    .exec(function (err, student) {

      var response = { status: 200, message: [] };
      if (err) {
        console.log("Error finding game");
        response.status = 500;
        response.message = err;
      } else if (!student) {
        console.log("Game id not found in database", studentId);
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }
      if (student) {
        _addAddressOne(req, res, student);
      } else {
        res.status(response.status).json(response.message);
      }
    });

} 


///
var _updateAddress = function(req, res, student){
    
    student.address.street = req.body.street;
    student.address.zip = parseInt(req.body.zip);
    student.address.location = req.body.location;
    student.address.city=req.body.city;

    student.save(function(err, updatedAddress){
        const response = {
            status: 204,
            message : updatedAddress
            
        };

        console.log(updatedAddress + "Address here ---------")
        if(err){
            console.log("Error finding address");
            response.status = 500,
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.updateOneAddress = function(req, res){

    var studentId = req.params.studentId;
    console.log("PUT studentId", studentId);
    Student.findById(studentId).exec(function(err, student){
        var response = {
            status : 204,
            message : student
        };
        console.log(student)
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!student){
            response.status = 404;
            response.message = {"message":"Game id not found"};

        }
        if(response.status !==204){
            res.status(response.status).json(response.message);
        } else {
            _updateAddress(req,res,student);
        }
    })
};

var _deleteAddress = function(req,res,address){
    address.address.remove();
    address.save(function(err, addresses){
        var response = {
            status: 204,
            message : addresses
        };

        if(err){
            console.log("error finding address");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);

    });

}

module.exports.addressDeleteOne = function(req, res){
    var studentId = req.params.studentId;
    console.log("delete gameId", studentId);
    Student.findById(studentId).exec(function(err, address){
        var response = {
            status : 204
        }

        console.log(address + "+++++")
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!address){
            response.status = 404;
            response.message = {"message" : "Game Id not found"};
        
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);

        }else{
            _deleteAddress(req,res,address);
        }
    })
}
