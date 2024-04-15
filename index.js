const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

function generateSvgContent({ name, textColor, shape, bgColor }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dynamic SVG Generator</title>
        <link rel="stylesheet" href="./Assets/css/style.css">
    </head>
    <body>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape === 'Circle' ? `<circle cx="100" cy="100" r="40" stroke="black" stroke-width="3" fill="${bgColor}" />` : ''}
            ${shape === 'Square' ? `<rect x="80" y="80" width="40" height="40" stroke="black" stroke-width="3" fill="${bgColor}" />` : ''}
            ${shape === 'Triangle' ? `<polygon points="100,40 60,140 140,140" stroke="black" stroke-width="3" fill="${bgColor}" />` : ''}
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="Arial" font-size="20">${name}</text>
        </svg>
    </body>
    </html>
    `;
}


inquirer.prompt([
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
        name: 'textColor',
        message: 'Type your color or hexadecimal number for your text: '
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose your shape: ',
        choices: ['Triangle', 'Circle', 'Square']
    },
    {
        type: 'input',
        name: 'bgColor',
        message: 'Type your color or hexadecimal number for the background: '
    }
]).then(answers => {
    console.log('Received answers:', answers);
    const svgContent = generateSvgContent(answers);
    renderSvg(svgContent);
});

function renderSvg(svgContent) {
    const filePath = path.join(__dirname, 'Assets', 'index.html');
    fs.writeFile(filePath, svgContent, err => {
        if (err) {
            console.error('Error writing SVG file:', err);
        } else {
            console.log('SVG file has been created');
        }
    });
}



