const inquirer = require('inquirer')


const svgArray = inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter up to 3 characters:',
        validate: data => {
            if (data.length > 3) {
                return 'Input must be 3 characters or less.';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'color',
        message: 'Type your color or hexadecimal number:'
    }
]).then(answers => {
    console.log('Received answers:', answers);
});

console.log(svgArray)



