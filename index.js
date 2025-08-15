const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

// Funktion um Branches aufzulisten
function listBranches() {
  exec('git branch', (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`Fehler: ${stderr}`));
      return;
    }
    console.log(chalk.green('Verfügbare Branches:'));
    console.log(stdout);
    // Weitere Logik hier wie Mergen oder Löschen kann hinzugefügt werden.
  });
}

// Hauptmenü
function mainMenu() {
  const questions = [{
    type: 'list',
    name: 'action',
    message: 'Wähle eine Aktion aus:',
    choices: ['Branches auflisten', 'Beenden']
  }];

  inquirer.prompt(questions).then((answers) => {
    switch (answers.action) {
      case 'Branches auflisten':
        listBranches();
        break;
      case 'Beenden':
        console.log(chalk.blue('Programm beendet.'));
        process.exit();
    }
    // Zeige das Hauptmenü erneut
    mainMenu();
  });
}

// Starte das Programm
mainMenu();