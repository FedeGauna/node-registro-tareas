const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {

        if( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {

            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {

            const idx = `${index + 1}`.green;
            const { desc, completadaEn } = tarea;
            const estado = (completadaEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${ idx }. ${ desc } :: ${ estado }`);

        });
    }

    listadoPorEstado( completa = true ) {

        if(completa) {
            console.log();
            this.listadoArr.filter(tarea => tarea.completadaEn).forEach((tarea, index) => {
    
                const idx = `${index + 1}`.green;
                const { desc, completadaEn } = tarea;
                console.log(`${ idx }. ${ desc } :: ${ 'Completada el: '.green } ${completadaEn.yellow}`);
    
            });
        } else {
            console.log();
            this.listadoArr.filter(tarea => tarea.completadaEn === null).forEach((tarea, index) => {
    
                const idx = `${index + 1}`.green;
                const { desc } = tarea;
                console.log(`${ idx }. ${ desc } :: ${ 'Pendiente'.red }`);
    
            });
        }
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadaEn ) {
                tarea.completadaEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadaEn = null;
            }
        })
    }

}

module.exports = Tareas;