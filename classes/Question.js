/*
==========================================
Assignment_3: Program 1
Author: Devin Davis
Date: October 26th, 2020
File: Question.js
===========================================
*/

module.exports = class Question {
  constructor(type, question, propName) {
    (this.type = type),
      (this.name = `\n${question}: `),
      (this.propName = propName);
  }
};
