import { accessSync, readFileSync, writeFileSync } from 'fs';
import readline from 'readline';

const filePath = `${process.cwd()}/savedNames.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

try {
    accessSync(filePath);
    const jsonObject = readFileSync(filePath, 'utf8');
    const decodedObject = JSON.parse(jsonObject);
    console.log(`The current name is: ${decodedObject.savedName}`);
    rl.question('Please enter a new Name: ', (answer) => {
        decodedObject.savedName = answer;
        writeFileSync(filePath, JSON.stringify(decodedObject));
        console.log(`The new name is ${answer}`);
        rl.close();
    })
} catch (err) {
    console.error('Something went wrong, ', err);
}