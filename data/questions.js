/*
==========================================
Assignment_3: Program 1
Author: Devin Davis
Date: October 26th, 2020
File: questions.js
===========================================
*/

const Question = require("../classes/Question")

let i
let questions = []

for(i = 0; i < 5; i++) {
   questions.push(new Question("number", `Enter hours worked on Day #${i + 1}`, `day #${i + 1}`))
}

module.exports = questions