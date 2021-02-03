require('colors');

const { 
    saveData,
    getData
} = require('./helpers/repositoryActions');

const { 
    inquirerMenu, 
    pause,
    readInput,
    tasksToDelete,
    confirm,
    showChecklist
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();
    const savedTasks = getData();

    if ( savedTasks ) {
        tasks.loadTasksFromArray( savedTasks );
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Description:  ');
                tasks.createTask( desc );
            break;

            case '2':
                tasks.readAllTasks();
            break;
            
            case '3':
                tasks.readByStatus(completed = true);
            break;

            case '4':
                tasks.readByStatus(completed = false);
            break;

            case '5':
                const ids = await showChecklist( tasks.arrayList );
                tasks.toggleStatus( ids );
            break;

            case '6':
                const id = await tasksToDelete( tasks.arrayList );
                if( id !== '0' ) {
                    const ok = await confirm('¿ Are you sure you want to delete it ? '); 
                    if (ok) {
                        tasks.deleteTask( id );
                        console.log('The task has been deleted!'.yellow);
                    }
                }

            break;

        }

        saveData( tasks.arrayList );

        await pause();

    } while( opt !== '0' );
    
}


main();