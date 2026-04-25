const { randomUUID } = require('crypto');

class Task {
    id = '';
    desc = '';
    completionDate = null;

    constructor( desc ) {
        this.id = randomUUID();
        this.desc = desc;
        this.completionDate = null;
    }
}

module.exports = Task;