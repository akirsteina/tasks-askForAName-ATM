import { accessSync, readFileSync, writeFileSync } from 'fs';
import readline from 'readline';

const filePath = `${process.cwd()}/savedNames.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const storeData = (newName) => {
    try {
        accessSync(filePath);
        const jsonObject = readFileSync(filePath, 'utf8');
        const decodedObject = JSON.parse(jsonObject);
        console.log(`The previous name was: ${decodedObject.savedName}`);
        decodedObject.savedName = newName;
        console.log(`The new name is ${newName}`);
        writeFileSync(filePath, JSON.stringify(decodedObject));
    } catch (err) {
        console.error('Something went wrong, ', err);
    }
}

rl.question('Please enter a new Name: ', (answer) => {
    storeData(answer);
    rl.close();
})