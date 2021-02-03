const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Add task` 
            },
            {
                value: '2',
                name: `${'2.'.blue} View all tasks` 
            },
            {
                value: '3',
                name: `${'3.'.blue} View completed tasks` 
            },
            {
                value: '4',
                name: `${'4.'.blue} View pending tasks` 
            },
            {
                value: '5',
                name: `${'5.'.blue} Update tasks status` 
            },
            {
                value: '6',
                name: `${'6.'.blue} Remove task` 
            },
            {
                value: '0',
                name: `${'0.'.blue} Exit` 
            }
        ]
    }
]

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'ENTER'.red } to continue` 
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}


const inquirerMenu = async() => {

    console.clear();
    console.log('============================='.green);
    console.log('       Choose an option       '.white);
    console.log('=============================\n'.green);

    const { option }  = await inquirer.prompt(menuOptions);
    return option;
}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const tasksToDelete = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {

        const idx = `${i + 1}.`.green;
        
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Remove',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;

}

const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message 
        }
    ];
    
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showChecklist = async( tasks = [] ) => {

    const choices = tasks.map( (task, i) => {

        const idx = `${i + 1}.`.green;
        
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.completionDate ) ? true : false
        }
    });

    const item = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selected items \n',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(item);
    return ids;

}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    tasksToDelete,
    confirm,
    showChecklist
}

