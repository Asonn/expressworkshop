const fs = require('fs');

module.exports = {
    get() {
        let prom = new Promise((resolve, reject) => {
            fs.readFile('./data/parks.json', 'utf8', (err, content) => {
                if(err) {
                    reject(err);
                }

                let parks = JSON.parse(content);
                resolve(parks);
            });
        });

        return prom;
    },
    save(newPark) {
        let prom = new Promise((resolve, reject) => {
            this.get().then(parks => {
                parks.push(newPark);
                fs.writeFile('./data/parks.json', JSON.stringify(parks), (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                });
            });
        });
        return prom;
    }
}