#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));

let playerLife: number;

async function welcome() {
  const rainbow = chalkAnimation.rainbow("Welcome to the game");
  await sleep();
  rainbow.stop();
}

async function question() {
  let randomNumber: number = Math.floor(Math.random() * 10);
  do {
    playerLife--;
    var myQuestion = await inquirer.prompt([
      {
        type: "input",
        name: "inputNum",
        message: "Enter a number between 1-10",
        validate: (answers: number) => {
          if (isNaN(answers)) {
            return chalk.red("Please enter a valid number");
          } else return true;
        },
      },
    ]);

    if (myQuestion.inputNum == randomNumber) {
      console.log(chalk.green("Congratulation!!! You have won the game"));
    } else if (myQuestion.inputNum > randomNumber) {
      console.log(
        chalk.red("Your guess is higher then the actual number, try again")
      );
      console.log("Turns left: " + playerLife);
    } else {
      console.log(
        chalk.red("Your guess is lower then the actual number, try again")
      );
      console.log("Turns left: " + playerLife);
    }
  } while (playerLife > 0 && randomNumber != myQuestion.inputNum);

  if (playerLife == 0 && randomNumber != myQuestion.inputNum) {
    console.log(chalk.redBright("GAME OVER"));
  }
}
async function try_again() {
  do {
    console.clear();
    playerLife = 3;
    await question();
    var ans = await inquirer.prompt([
      {
        type: "list",
        name: "inputcChar",
        message: "Do you want to play agian?",
        choices: ["Yes", "No"],
      },
    ]);
  } while (ans.inputcChar === "Yes");
}

await welcome();
try_again();
