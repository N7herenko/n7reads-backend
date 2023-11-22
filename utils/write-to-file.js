import * as fs from 'fs';

// function write data in file
export const write = (filename, data) => {   
  fs.writeFileSync(filename, JSON.stringify(data), 'utf8', (err) => {
    if(err) {
      console.log('There was an error - '+err);
    } else {
      console.log('File successfully written.')
    }
  })
};