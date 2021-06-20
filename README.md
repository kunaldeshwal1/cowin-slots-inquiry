This CLI will show you all available centers in your area by providing your location, If slots are available at your location then it will notify you by a message.

Prerequisite: You must have installed nodejs ,npm, and installed some tools by running 

"npm install axios chalk commander inquirer node-notifier tty-table"

command in CLI.


-->/cowin/src --Locate to this path in your system.

--> Commands:

node index states -- List of all states

node index district -- Get all districts for state using state id

node index slot -- Get all slots for district id

node index help [command] --display help for command
