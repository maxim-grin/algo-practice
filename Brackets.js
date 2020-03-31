'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the isBalanced function below.
function isBalanced(s) {
    if (parenthesesAreBalanced(s)) {
        return "YES";
    } else {
        return "NO";
    }
}

function parenthesesAreBalanced(s)
{
  var parentheses = "[]{}()",
    stack = [], //Parentheses stack
    i, //Index in the string
    c; //Character in the string

  for (i = 0; c = s[i++];)
  {
    var bracePosition = parentheses.indexOf(c),
      braceType;
    //~ is truthy for any number but -1
    if (!~bracePosition)
      continue;

    braceType = bracePosition % 2 ? 'closed' : 'open';

    if (braceType === 'closed')
    {
      //If there is no open parenthese at all, return false OR
      //if the opening parenthese does not match ( they should be neighbours )
      if (!stack.length || parentheses.indexOf(stack.pop()) != bracePosition - 1)
        return false;
    }
    else
    {
      stack.push(c);
    }
  }
  //If anything is left on the stack <- not balanced
  return !stack.length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        let result = isBalanced(s);

        ws.write(result + "\n");
    }

    ws.end();
}
