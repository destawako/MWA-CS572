var fib = function(number){
    if(number < 2){
        return 1;
    }else{
        return fib(number-1) + fib(number - 2);
    }
};

var fiboncacci = 44;

console.log("Fibonacci of " + fiboncacci +  " is " + fib(fiboncacci));