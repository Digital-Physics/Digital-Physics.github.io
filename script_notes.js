// there are two ways to do functions
function oldschool_double (arg1) {
    return arg1 * 2
}

// arrow functions seem a little like lambda functions; no return or brackets needed. is ; not needed?
let newschool_double = (arg1) => arg1 * 2

console.log(oldschool_double(4))
console.log(newschool_double(5))

// "objects" seem to be similar to dictionaries class objects written in @datatype notation
let my_obj = {
    key1: "something text",
    key2: 23
}

// you can get values through . notation or 
console.log(my_obj.key1)
console.log(my_obj.key2)
console.log(my_obj['key1'])
console.log(my_obj["key2"])

// you can add new values either way
my_obj.key3 = "something new";
console.log(my_obj.key3)
my_obj['key4'] = "another value";
console.log(my_obj.key4)

// back ticks can allow you to make "template literals" which are like f strings in Python
let varname = "khatchig";
let my_dynamic_string = `the person saved is ${varname}`;

console.log(my_dynamic_string)

// here is an arrow function with an object that also uses template literals?
const combined_function = (name, arg2) => {
    const my_obj = {
        key1: name,
        key2: arg2,
    }

    const my_string = `the two values are the name ${name} and the second argument ${arg2}`

    return my_string
}

console.log(combined_function("alice", 7))

// let's put a method in our object
// we use another function to initialize and create the object with properties and methods?
const _init_obj_function = (assets, liabilities) => {
    const person_obj = {
        assets: assets,
        liabilities: liabilities,
        net_worth: function () {return this.assets - this.liabilities},
    }

    // const intro = `my assets are ${person_obj.assets} and my net worth is ${person_obj.net_worth()}`

    return person_obj
}

my_person = _init_obj_function(100, 80);
console.log("my class object was initialized by another function and then a method was called on the instance", my_person.net_worth())

// loops
const my_arr = ["apple", "pear", "tomato", "pea"];
const my_arr_nums = [1, 2, 3, 4]

// for loops and math stuff
// a slice of an array needs a method .slice(0,n), not [:n]
for (let i = 0; i <= my_arr.length; i++) {
    console.log()
    console.log(i)
    const rand_val = Math.random() * 3
    console.log(rand_val, Math.floor(rand_val), Math.ceil(rand_val))
    console.log(my_arr.slice(0,i))
}

// use "of" and not "in" in Python. "of" gets the elements, "in" gets indices. "in" can also be uesd to look for key values in objects, like a python dictionary
// let, var, const, and (nothing) before 'ele' all gave same results
console.log();
console.log("if vs of")
for (let ele of my_arr) {
    console.log(ele)
}

for (const ele in my_arr) {
    console.log(ele)
}

// conditionals
if (my_arr.length < 2) {
    console.log("if conditional, it was less")
} else {
    console.log("else part of the if conditional, it was more")
}

// I mutate this array but I was still able to call it a const?
const empty_arr = []
for (_ of my_arr) {
    empty_arr.push(_+_)
}

console.log(empty_arr)

// does javascript have list comprehensions?
const double_elements_f = (arr_of_nums) => {
    output = [];

    for (num of arr_of_nums) {
        output.push(2*num)
    }

    return output
}

console.log(double_elements_f(my_arr_nums))

// Number() vs int()
const numb_string = "7"
const numb_num = Number(numb_string)

console.log(numb_num+numb_num, numb_string+numb_string)
console.log(numb_num*2, numb_string*2)

// Count number of occurences
// counter_obj[letter] += 1
// counter_obj[letter]++
// ++, --, 
const letter_occurences_f = (word_string) => {
    const counter_obj = {}

    for (letter of word_string) {
        if (letter in counter_obj) {
            counter_obj[letter] += 1
        } else {
            counter_obj[letter] = 1
        }
    }
    
    return counter_obj
} 

const word_occurences_f = (word_string) => {
    const counter_obj = {}
    const words = word_string.split(' ')

    for (word of words) {
        if (word in counter_obj) {
            counter_obj[word]++
        } else {
            counter_obj[word] = 1
        }
    }
    
    return counter_obj
} 

const word_occurences_f2 = (word_string) => {
    const words = word_string.split(' ')    
    return letter_occurences_f(words)
} 

console.log(letter_occurences_f('haha, haha, digital physics is awesome!'))
console.log(word_occurences_f('haha, haha, digital physics is awesome!'))
console.log(word_occurences_f2('haha, haha, digital physics is awesome!'))

// higher order functions (take in functions as arguments)
// map filter reduce
// map and filter are like list comprehension in Python (with if/else clauses)

const map_output = my_arr.map(x => letter_occurences_f(x));
const filter_output = my_arr_nums.filter(x => x < 3)
const filter_output2 = my_arr.filter(x => x.length <=5 && x.length >= 4)
const filter_output3 = my_arr.filter(x => x.length <=3 || x.length >= 5)

console.log(map_output)
console.log(filter_output, filter_output2, filter_output3)

// reduce is like summing over many things, like sum(arr) in Python but more general
// it takes in a function and gives you back the accumulator
// it is probably memory efficient because it is accumulating values one at a time and only needs to hold a total and one value at a time in memory
const reduce_output = my_arr_nums.reduce((prev_accum, curr) => prev_accum + curr);
console.log("reduced to", reduce_output) 

const my_sum = (x, y) => x + y;
const my_product = (x, y) => x * y;
function my_product2(x, y) {
    return x * y
}
const reduce_output2 = my_arr_nums.reduce(my_sum);
const reduce_output3 = my_arr_nums.reduce(my_product);
const reduce_output4 = my_arr_nums.reduce(my_product2);
// it must initialize the prev_accum or first value to 0? and 1 for product?
// you can specify the starting accumulator
const reduce_output5 = my_arr_nums.reduce(my_product, 100);
const reduce_output6 = my_arr_nums.reduce(my_sum, 100);
console.log("other reduced values", reduce_output2, reduce_output3, reduce_output4, reduce_output5, reduce_output6) 

// .join() in Python is a method run on a separator string w/ its method arguments being an array you want to concatenate
// .join() in Javascript is run on array with its method argument being the separator
const joined_arr_to_string = my_arr.join(", ")
console.log(joined_arr_to_string)
