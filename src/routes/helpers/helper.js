const { writeFileSync }= require('fs');

const getNewId = (array) => {
    if(array.length > 0)
        return array[array.length - 1].id + 1;
    else 
        return 1;
};

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id);
        if(!row) {
            reject({
                message: 'ID invalid',
                status: 404
            });
        }
        resolve(row);
    });
}

function writeJSONFile(filename, content) {
    writeFileSync(filename, JSON.stringify(content), 'utf8', (error) => {
        if(error)
            console.warn(error);
    });
}

module.exports = { getNewId, mustBeInArray, writeJSONFile };