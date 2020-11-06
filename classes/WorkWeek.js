/*
==========================================
Assignment_3: Program 1
Author: Devin Davis
Date: October 26th, 2020
File: WorkWeek.js
===========================================
*/
const chalk = require("chalk")
// object - stores pertenant information regaring work week hours
module.exports = class WorkWeek {
    constructor() {
      this.averageHours = Number()
      this.totalHours = Number()
      this.mostHours = Number()
      this.mostDays = Number()
      this.slackDays = []
      this.slackMessage = "\nNot bad, not bad."
      this.mostDays
    }
    
    /**
     *   @param {array} arr Array of numbers
     */
      setAverageHours(arr) {
      let totalHours = 0
      arr.forEach(hour => {
        totalHours += hour
      })
      this.averageHours = (totalHours / 5).toFixed(1)
      }
  
      /**
       *   @param {array} arr Array of numbers
       */
      setTotalHours(arr) {
      let totalHours = 0
      arr.forEach(hour => {
        totalHours += hour
      })
      this.totalHours = totalHours.toFixed(1)
      }
  
      /**
       *   @param {object} object the question anwsers
       */
      setMostHours(object) {
        let mostHourDay = {
          hour: 0,
          day: ""
        }
        let mostHourDays = []
        for(const key in object) {
          if(object[key] > mostHourDay.hour) {
              mostHourDay.day = key
              mostHourDay.hour = object[key]
          }
        }
        for(const key in object) {
          if(object[key] === mostHourDay.hour) {
            mostHourDays.push({hour: object[key],day: key})
          
          }
        }
        mostHourDays.concat(mostHourDay)

        this.mostDays = mostHourDays
      }


      /**
       *   @param {object} object the question anwsers
       */
      setSlackedOffDays(object) {
        let slackCount = 0
        for(const key in object) {
          if(object[key] < 7) {
            this.slackDays.push({hour: object[key], day: key})
            slackCount++
          }
        }
        if(slackCount > 2) {
          this.slackMessage = chalk.redBright("\nPick up the slack dude!")
        } 
        if(slackCount === 0) {
          this.slackMessage = chalk.greenBright("\nNow that was a slackless week!")
        }
      }


      /**
       *   @param {string} report string value of current report
       */ 
      concatMostDaysStr(report) {
        let newReport = report
        let i

        console.log(this.mostDaysLength)
        if(this.mostDaysLength === 1) {
          newReport = newReport.concat(`${chalk.bold.cyan(this.mostDays[0].day)} `)
        }

        if(this.mostDaysLength === 2) {
          newReport = newReport.concat(`${chalk.bold.cyan(this.mostDays[0].day)} and ${chalk.bold.cyan(this.mostDays[1].day)} `)
        }

        if(this.mostDaysLength > 3) {
          console.log("gee")
          for(i = 0; i < this.mostDaysLength - 1; i++ ) {
          newReport = newReport.concat(`${chalk.bold.cyan(this.mostDays[i].day)}, `)
          }
          newReport = newReport.concat(`and ${chalk.bold.cyan(this.lastDay.day)} `)
        }
        return newReport
      }
  
      getReport() {
        let report = `\n`
        let lineRule = chalk.blueBright("\n=========================================================\n")
        this.mostDaysLength = this.mostDays.length
        this.lastDay = this.mostDays[this.mostDaysLength - 1]

        report = report.concat(`The most hours worked was on: `)

        report = this.concatMostDaysStr(report)

        report = report.concat(`when you worked ${chalk.bold.yellow(this.mostDays[0].hour)} hours.`)

        report = report.concat(lineRule)

        report = report.concat( `The total number of hours worked was: ${chalk.bold.yellow(this.totalHours)}. \nThe average number of hours worked a day was: ${chalk.bold.yellow(this.averageHours)}.`)

        report = report.concat(lineRule)

        report = report.concat(`Days you slacked off (i.e. worked less than 7 hours): `)

        this.slackDays.forEach(day => {
         report = report.concat(`\n${chalk.bold.cyan(day.day)}: ${chalk.bold.yellow(day.hour)}`)
        })

        report = report.concat(this.slackMessage)

        return report
      }
    }