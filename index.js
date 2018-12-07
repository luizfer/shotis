#!/usr/bin/env node

const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const s  = require('./lib/screen');
const program = require('commander');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('shotis', { horizontalLayout: 'full' })
  )
);

if (!program.url) {
  console.log(chalk.red('Add --url parameter.\n' + 'Like this: shotis --url http://www.google.com'));
  process.exit();
}

const run = async () => {
  try {
     
    await s.generateScreenshot();

  } catch(err) {

    console.log(chalk.red(err));    

  }

}

run();