
const fib=function(num){

  
    //   if(num<0)
    //    {
    //        num=num*-1;
    //    }
    if  (num<0)
       {
       return (Math.pow(-1,num+1) * fib(Math.abs(num)));
       }
        if(num==0|| num==1||num==2)
        return 1;
    else {
            return fib(num-1)+fib(num-2);
        }
    
    
    }
    console.log("fibonnaci of number is 8",fib((5)));
