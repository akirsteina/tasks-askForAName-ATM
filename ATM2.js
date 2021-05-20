// 2. ATM
// Asks for action "Please tell me wat to do": + | -
// Asks for amount "How much? "
// Print out current ballance "Current ballance is: 100"

import { accessSync, readFileSync, writeFileSync } from 'fs';
import readline from 'readline';

const filePath = `${process.cwd()}/numbers.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const changeBalance = (number, operator) => {
    try {
        accessSync(filePath);
        const jsonObject = readFileSync(filePath, 'utf8');
        const transactions = JSON.parse(jsonObject);
        const answer1 = operator;
        const answer2 = number;
        const newLogEntry = {
            action: answer1,
            amount: answer2
        }
        transactions.push(newLogEntry);
        writeFileSync(filePath, JSON.stringify(transactions));
        let balance = 0;
        for (let transaction of transactions) {
            if (transaction.action === "+") {
                balance += transaction.amount;
            } else {
                balance -= transaction.amount;
            }
        }
        console.log(`The current balance is: ${balance}`);
        rl.close();
    } catch (err) {
        console.error('Something went wrong, ', err);
    }
}

rl.question('What do you want to do? To substract money, press "-", to add money press "+": ', (operator) => {
    if (operator !== '+' && operator !== '-') {
        console.log('Invalid operator, please start from beginning');
        rl.close();
        return;
    }
    rl.question('What amount? ', (answer) => {
        if (isNaN(answer)) {
            console.log('This is not a number, please start from beginning');
            rl.close();
            return;
        }
        const number = parseInt(answer);
        changeBalance(number, operator);
        rl.close();
    })
});