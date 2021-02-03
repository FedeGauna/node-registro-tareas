require('colors');

const displayMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('============================='.green);
        console.log('       Choose an option      '.green);
        console.log('=============================\n'.green);
    
        console.log(`${ '1.'.yellow } Add task`);
        console.log(`${ '2.'.yellow } View all tasks`);
        console.log(`${ '3.'.yellow } View completed tasks`);
        console.log(`${ '4.'.yellow } View pending tasks`);
        console.log(`${ '5.'.yellow } Update tasks status`);
        console.log(`${ '6.'.yellow } Remove task`);
        console.log(`${ '0.'.yellow } Exit \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Choose an option: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

}

const pause = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${ 'ENTER'.red } to continue.\n`, () => {

            readline.close();
            resolve();
        });

    });
}

module.exports = {
    displayMenu,
    pause
}