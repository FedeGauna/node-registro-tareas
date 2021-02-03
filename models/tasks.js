const Task = require("./task");

class Tasks {
    _list = {};

    get arrayList() {

        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        })

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '') {

        if( this._list[id] ) {
            delete this._list[id];
        }
    }

    loadTasksFromArray( tasks = [] ) {

        tasks.forEach( task => {

            this._list[task.id] = task;
        })

    }

    createTask( desc = '' ) {

        const task = new Task( desc );
        this._list[task.id] = task;
    }

    readAllTasks() {
        console.log();
        this.arrayList.forEach((task, index) => {

            const idx = `${index + 1}`.green;
            const { desc, completionDate } = task;
            const status = (completionDate)
                                ? 'Completed'.green
                                : 'Pending'.red;
            console.log(`${ idx }. ${ desc } :: ${ status }`);

        });
    }

    readByStatus( completed = true ) {

        if(completed) {
            console.log();
            this.arrayList.filter(task => task.completionDate).forEach((task, index) => {
    
                const idx = `${index + 1}`.green;
                const { desc, completionDate } = task;
                console.log(`${ idx }. ${ desc } :: ${ 'Completed on: '.green } ${completionDate.yellow}`);
    
            });
        } else {
            console.log();
            this.arrayList.filter(task => task.completionDate === null).forEach((task, index) => {
    
                const idx = `${index + 1}`.green;
                const { desc } = task;
                console.log(`${ idx }. ${ desc } :: ${ 'Pending'.red }`);
    
            });
        }
    }

    toggleStatus( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[id];
            if ( !task.completionDate ) {
                task.completionDate = new Date().toISOString()
            }

        });

        this.arrayList.forEach( task => {

            if ( !ids.includes( task.id ) ) {
                this._list[task.id].completionDate = null;
            }
        })
    }

}

module.exports = Tasks;