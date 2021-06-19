
const states = require("../util/states");
const districts = require("../util/districts");
const slots = require("../util/slots");
const program = require("commander");

//states(34);
//districts(9);
//slots(141);


program
  .command('states')
  .description('List of all states')
  .action(states);


program
  .command('district <stateid>')
  .description('Get all districts for state using state id')
  .action(districts);
program
  .command('slot <districtid>')
  .description('Get all slots for district id')
  .action(slots);

program.parse();