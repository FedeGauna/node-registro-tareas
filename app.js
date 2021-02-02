require('colors');

const { 
    guardarEnRepo,
    leerDeRepo
} = require('./helpers/guardarArchivo');

const { 
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

// Reemplazado por inquirer
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasRepo = leerDeRepo();

    if ( tareasRepo ) {
        tareas.cargarTareasFromArray( tareasRepo );
    }

    // await pausa();

    do {

        //Reemplazado por inquirer
        //opt = await mostrarMenu();

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:  ');
                tareas.crearTarea( desc );
            break;

            case '2':
                //console.log( tareas.listadoArr );
                tareas.listadoCompleto();
            break;

            
            case '3':
                tareas.listadoPorEstado(completa = true);
            break;

            case '4':
                tareas.listadoPorEstado(completa = false);
            break;

            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    const ok = await confirmar('¿Esta seguro que desea borrarla? '); 
                    if (ok) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada!'.yellow);
                    }
                }

            break;

        }

        //console.log({ opt });
        guardarEnRepo( tareas.listadoArr );

        await pausa();
        
        // if( opt !== '0' ) await pausa();

    } while( opt !== '0' );
    
    //pausa();
}


main();