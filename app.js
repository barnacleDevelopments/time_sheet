/*
==========================================
Assignment_3: Program 1
Author: Devin Davis
Date: October 26th, 2020
File: app.js
===========================================
*/

const readlineSync = require("readline-sync");
const chalk = require("chalk");
const questions = require("./data/questions");
const WorkWeek = require("./classes/WorkWeek")

// log an input error to console
const logInputErr =(err) => {
  console.log(`\n\n${chalk.red(err)}`);
}


// function - validate anwser type
const validateType = (anwser, expectType) => {
  if (expectType === "number") {
    return isNaN(anwser);
  }

  if (expectType === "string") {
    return !isNaN(anwser);
  }
};

/**
 *   @param {array} numsArr array of strings with numbers
 */

const strArrToNums = (numsArr) => {
  return numsArr.map(str => parseInt(str))
}

/**
 *   @param {array} numsObject object with strs for properties
 */
const strObjToNums = (numsObj) => {
  let newObj = {}
 for(const key in numsObj) {
    newObj[key] = parseInt(numsObj[key])
 }
 return newObj
}

/**
 *   @param {object} object object to convert to array
 */

// function convert object to array
const convertToArr = (object) => {
  let arr = []

for(const key in object) {
    arr.push(object[key])
  }
  return arr
}

/**
 *   @param {array} question a signle question class
 */
// function - ask question
const askQuestion = (question) => {
  let anwser = readlineSync.question(question.name);
  return anwser;
};

/**
 *   @param {array} questions Array of question classes
 */

// function ask a set of questions
const askQuestions = (questions) => {
  let anwsers = {}
  questions.forEach((q) => {
    let anwser = askQuestion(q);
   
    // check if nothing was provided
   while(anwser === "") {
    logInputErr("0 is not an anwser!")
    anwser = askQuestion(q)
   }
  // check if number is provided
   while(validateType(anwser, "number")) {
     logInputErr("That is not an number!")
    anwser = askQuestion(q)
   }
 
   anwsers[q.propName] = anwser
  });

  return anwsers;
};

/**
 *   @param {array} anwsers Array of question anwsers
 */

const buildWorkWeek = (anwsers) => {
  let week = new WorkWeek()
  // convert anwsers object to array of numbers
  let anwserArray = strArrToNums(convertToArr(anwsers))
  // convert anwsers object properties to numbers 
  let anwserObject = strObjToNums(anwsers)
  // set week gours
  week.setAverageHours(anwserArray)
  week.setTotalHours(anwserArray)
  week.setSlackedOffDays(anwserObject)
  week.setMostHours(anwserObject)

  return week
}

// build work week object
const week = buildWorkWeek(askQuestions(questions))

// log report to console
console.clear()
console.log(week.getReport())





