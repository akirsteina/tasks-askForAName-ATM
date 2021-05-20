import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Enter your first name:
// Enter your last name:
// Enter your email:
// Your data is: ${name} ${lastName} ${email}

// nested questions = callback hell
rl.question('Enter your first name: ', (firstName) => {
    rl.question('Enter your last name: ', (lastName) => {
        rl.question('Enter your email: ', (email) => {
            console.log(`Your data is: ${firstName} ${lastName} ${email}`);
            rl.close();
        });
    });
});