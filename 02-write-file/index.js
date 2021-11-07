const readline = require('readline');
const fs = require('fs');
const { stdin, stdout } = process;
stdout.write('Write your text here\n');
const output = fs.createWriteStream('text.txt');



readline.createInterface({
  input: stdin, output: stdout 
}).on('line', (text) => { 
  if (text === 'exit') {
    process.exit();
  }
  output.write(`${text}\n`);
});

process.on('exit', () => {
  stdout.write('See you!');
});



