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
// rl.question('Enter your first name: ', (firstName) => {
//     rl.question('Enter your last name: ', (lastName) => {
//         rl.question('Enter your email: ', (email) => {
//             console.log(`Your data is: ${firstName} ${lastName} ${email}`);
//             rl.close();
//         });
//     });
// });

// promises
new Promise((fulfill, reject) => {
    rl.question('Enter your first name: ', (firstName) => {
        if (firstName === '') {
            reject('First name was empty');
            return;
        }
        fulfill(firstName);
    });
}).then((output) => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your last name: ', (lastName) => {
            if (lastName === '') {
                reject('Last name was empty');
                return;
            }
            fulfill(`${output} ${lastName}`);
        });
    });
}).then((output) => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your email: ', (email) => {
            if (email === '') {
                reject('Email was empty');
                return;
            }
            fulfill(`${output} ${email}`);
        });
    });
}).then((output) => {
    console.log(`Your data is: ${output}`);
}).catch((errorMessage) => {
    console.log(errorMessage);
}).finally(() => {
    rl.close();
})

// advanced - with objects
// new Promise((fulfill) => {
//     rl.question('Enter your first name: ', (firstName) => {
//         fulfill({ firstName });
//         // {firstName: firstName}
//     });
// }).then((output) => {
//     return new Promise((fulfill) => {
//         rl.question('Enter your last name: ', (lastName) => {
//             fulfill({...output, lastName });
//         });
//     });
// }).then((output) => {
//     return new Promise((fulfill) => {
//         rl.question('Enter your email: ', (email) => {
//             fulfill({...output, email });
//         });
//     });
// }).then(({ firstName, lastName, email }) => {
//     console.log(`Your data is: ${firstName}, ${lastName}, ${email}`);
//     rl.close();
// });