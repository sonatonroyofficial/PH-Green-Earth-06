1) What is the difference between var, let, and const?

Answer :   Difference between var, let, and const

            var - old way, function-scoped, can be re-declared, often causes scope/hoisting issues.

            let - block-scoped, can be re-assigned but not re-declared.

            const - block-scoped, can’t be re-assigned (used for constants).


2) What is the difference between map(), forEach(), and filter()?

Answer : Difference between map(), forEach(), and filter()


          map() - returns a new array after modifying elements.

          forEach() - just loops through elements, returns nothing.

          filter() - returns a new array based on a condition


3) What are arrow functions in ES6?

Answer : Arrow functions in ES6

     Shorter syntax for functions  () => {} instead of function() {}.

     They don’t have their own this, they inherit it from the parent scope.


4) How does destructuring assignment work in ES6?

Answer : Destructuring assignment in ES6

Lets you pull values out of objects/arrays easily.

const person = {name: "Sonaton", age: 22};
const {name, age} = person;  


Now you can use name and age directly without person.name.


5) Explain template literals in ES6. How are they different from string concatenation?

Answer : Template literals in ES6

 Written with backticks `.

 Allows variables inside strings using ${variable}.

 Supports multi-line strings.

 Cleaner and easier than using + for concatenation.

Example:

let name = "Sonaton";
console.log(`Hello, my name is ${name}`);