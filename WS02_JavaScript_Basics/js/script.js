// Exercise 1 - Developer Tools and Console

console.log("Hello, World!");
alert("Welcome to my JavaScript page!");


// Exercise 2 - Variables

const userName = "Amir";
let age = 22;
const favouriteAnimal = "Panda";

console.log(userName);
console.log(age);
console.log(favouriteAnimal);

console.log("Hello! My name is " + userName + " and my favourite animal is " + favouriteAnimal + ".");


// Exercise 3 - User Input

const visitorName = prompt("What is your name?");

console.log("Hello " + visitorName + "! Welcome to JavaScript.");


// Exercise 4 - Conditionals

const visitorAge = prompt("How old are you?");

if (visitorAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}


// Exercise 5 - Functions

function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Amir");
greetUser("Juho");
greetUser("John");


// Exercise 6 - Button

function showMessage() {
    alert("JavaScript works!");
}
