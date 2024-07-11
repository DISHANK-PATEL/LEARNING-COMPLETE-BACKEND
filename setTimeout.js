console.log("Solve the folowing equation:");
console.log("x+y=5 and x-y=1 Find x and y");
setTimeout(()=>{console.log("Time over the ans: x=3 and y=1")},5000);
let ans = (a, b) => {
    console.log(`The answer: ${a + b}`);
    return a + b;
};
ans(5, 3); 
function hello()
{
    setTimeout(console.log("Wait for 4 seconds"),4000);
    console.log("Hello How are you?");
    response();
}
function response()
{
    console.log("I am fine!");
    leave();
}
function leave()
{
    console.log("Okay then Bye!");
}
hello();

