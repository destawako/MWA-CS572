angular.module("myProperApp").filter("order", NumberOrder);

function NumberOrder(){
    return function(number){
        //
        if(number && !isNaN(number)){
            var digit = number%10;
            var siffix = "";
            switch(digit){
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix= "th";
                    break;
            }
            return number+suffix;

        }
    }
}