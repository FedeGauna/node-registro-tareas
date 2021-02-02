const fs = require('fs');

const archivo = './repo/data.json'

const guardarEnRepo = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data, null, 4 ) );

}

const leerDeRepo = () => {

    if( !fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;

} 

module.exports = {
    guardarEnRepo,
    leerDeRepo
}