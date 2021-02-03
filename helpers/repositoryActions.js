const fs = require('fs');

const fileName = './repository/data.json'

const saveData = ( data ) => {

    fs.writeFileSync( fileName, JSON.stringify( data, null, 4 ) );

}

const getData = () => {

    if( !fs.existsSync(fileName) ){
        return null;
    }

    const info = fs.readFileSync(fileName, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;

} 

module.exports = {
    saveData,
    getData
}