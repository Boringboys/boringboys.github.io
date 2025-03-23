function addNewLine(newContent){
    e_main.html(e_main.html() + newContent + '<br/>');
}

function addNewTerminalLine(input, position){
    let newLine = '[<span id="usr">' + usrName + '</span>@<span class="host">caijisec.com</span> ' + position + ']# ' + input;
    addNewLine(newLine);
}

function displayInputLine(input, position){
    let inputLine = '[<span id="usr">' + usrName + '</span>@<span class="host">caijisec.com</span> ' + position + ']# ' + input;
    e_input_display.html(inputLine);
}

function mark_cursor(input, cursorPos){
    const inputAry = input.split('');
    inputAry.splice(cursorPos, 1, '<span class="cursorChar">' + inputAry[cursorPos] + '</span>')
    return inputAry.join('');
}

const replaceStr1 = (str, index, char) => {
    const strAry = str.split('');
    strAry[index] = char;
    return strAry.join('');
  }