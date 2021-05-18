// 2. ATM
// Asks for action "Please tell me wat to do": + | -
// Asks for amount "How much? "
// Print out current ballance "Current ballance is: 100"

import { accessSync, readFileSync, writeFileSync } from 'fs';
import readline from 'readline';

const filePath = `${process.cwd()}/balance.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const storeData = (number, operator) => {
    try {
        accessSync(filePath);
        const jsonObject = readFileSync(filePath, 'utf8');
        const decodedObject = JSON.parse(jsonObject);
        console.log(`Your previous balance was: ${decodedObject.balance} eur`);
        if (operator === '+') {
            decodedObject.balance += number;
        } else {
            decodedObject.balance -= number;
        }
        console.log(`Your new balance is ${decodedObject.balance} eur`);
        writeFileSync(filePath, JSON.stringify(decodedObject));
    } catch (err) {
        console.error('Something went wrong, ', err);
    }
}

rl.question('What do you want to do? To substract money, press "-", to add money press "+": ', (operator) => {
    if (operator != '+' && operator != '-') {
        console.log('Invalid operator, please start from beginning');
        rl.close();
        return;
    } else {
        rl.question('What amount? ', (answer) => {
            if (isNaN(answer)) {
                console.log('This is not a number, please start from beginning');
                rl.close();
                return;
            } else {
                const number = parseInt(answer);
                storeData(number, operator);
                rl.close();
            }
        })
    }
});