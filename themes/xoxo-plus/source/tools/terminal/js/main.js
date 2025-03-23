let usrName = 'root'
let nowPosition = '~'
let commandList = 'wget logout hey hi hello help clear exit'.split(' ')
let hisCommand = []
let cour = 0
let isInHis = 0
let directory = []
let files = []
let inputBuffer = ''

let host = ''

let e_main = $('#main')
let e_input = $('.input-text')
let e_input_display = $('.input-text-display')
let e_input_display_by_id = $('#input-text-display')
let e_html = $('body,html')
let e_pos = $('#pos')

let mainFunc = (input, position) => {
  if (input === '') {
    addNewTerminalLine(input, position);
    e_html.animate({ scrollTop: $(document).height() }, 0)
  } else {
    command = input.split(' ')[0]
    if (commandList.indexOf(command) === -1) {
      addNewTerminalLine(input, position);
      addNewLine('caijish: command not found: ' + command);
      e_html.animate({ scrollTop: $(document).height() }, 0)
    } else {
      e_input_display_by_id.style.display = 'none';
      switch (command) {
        case 'help':
          addNewTerminalLine(input, position);
          helpMsg = '[sudo ]command[ Options...]<br/>You can use following commands:<br/><br/>wget<br/>clear<br/>help<br/>exit<br/><br/>Besides, there are some hidden commands, try to find them!';
          addNewLine(helpMsg);
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'exit':
          addNewTerminalLine(input, position);
          exitMsg = '(๑˘̴͈́꒵˘̴͈̀)۶ˮ вyё вyё~';
          addNewLine(exitMsg);
          e_html.animate({ scrollTop: $(document).height() }, 0)
          // window.open("https://www.caijisec.com")
          window.location.href="/"
          break
        case 'hi':
        case 'hey':
        case 'hello':
          addNewTerminalLine(input, position);
          helloMsg = 'Nice to Meet U : )';
          addNewLine(helloMsg);
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'clear':
          e_main.html('')
          e_html.animate({ scrollTop: $(document).height() }, 0)
          break
        case 'wget':
          addNewTerminalLine(input, position);
          url = input.split(' ')[1]
          downloadFile(url, 'test', downProgressUpdate)
          break
        case 'cat':
          file = input.split(' ')[1]
          break
      }
      e_input_display_by_id.style.display = 'block';
    }
  }
}

window.onresize = function () {
  e_input_display.width($(document).width() - $('.input-text-display').width() - 160)
};

let historyCmd = (k) => {
  $('body,html').animate({ scrollTop: $(document).height() }, 0)

  if (k !== 'up' || isInHis) {
    if (k === 'up' && isInHis) {
      if (cour >= 1) {
        cour--
        e_input.val(hisCommand[cour])
      }
    }
    if (k === 'down' && isInHis) {
      if (cour + 1 <= hisCommand.length - 1) {
        cour++
        $(".input-text").val(hisCommand[cour])
      } else if (cour + 1 === hisCommand.length) {
        $(".input-text").val(inputCache)
      }
    }
  } else {
    inputCache = e_input.val()
    e_input.val(hisCommand[hisCommand.length - 1])
    cour = hisCommand.length - 1
    isInHis = 1
  }
}

e_input.change(function() {
  console.log('input内容已改变！');
  console.log('光标位置：', e_input[0].selectionStart);
  displayInputLine(mark_cursor(e_input.val() + ' ', e_input[0].selectionStart), nowPosition);
  // displayInputLine(e_input.val(),nowPosition);
})

$(document).bind('keyup', function(b) {
  console.log('按键抬起');
  console.log('光标位置：', e_input[0].selectionStart);
  displayInputLine(mark_cursor(e_input.val() + ' ', e_input[0].selectionStart), nowPosition);
  // displayInputLine(e_input.val(),nowPosition);
})

$(document).bind('keydown', function (b) {
  console.log('按键：', b.keyCode)
  e_input.focus()
  if (b.keyCode === 13) {
    e_main.html($('#main').html())
    e_html.animate({ scrollTop: $(document).height() }, 0)
    console.log('输入内容：', e_input.val())
    mainFunc(e_input.val(), nowPosition)
    hisCommand.push(e_input.val())
    isInHis = 0
    e_input.val('')
  }
  if (b.keyCode === 9) {
    pressTab(e_input.val())
    b.preventDefault()
    e_html.animate({ scrollTop: $(document).height() }, 0)
    e_input.focus()
  }
  // 左键 或 右键
  if (b.keyCode === 37 || b.keyCode === 39) {
    console.log('光标位置：', e_input[0].selectionStart);
  }

  if (b.keyCode === 38) historyCmd('up')
  if (b.keyCode === 40) historyCmd('down')

  // Ctrl + U 清空输入快捷键
  if (b.keyCode === 85 && b.ctrlKey === true) {
    e_input.val('')
    e_input.focus()
  }
})

$(document).ready(() => {
  // 初始化页面
  displayInputLine('', nowPosition);
  // e_input.width($(document).width() - $('.input-text-display').width() - 160)
})

async function downloadFile(fileUrl,fileName,progressFunc) {
  let blob = await getBlob(fileUrl,progressFunc);
  updateTheLastLine('下载进度：100%');
  e_html.animate({ scrollTop: $(document).height() }, 0)
  e_input.val('')
  saveFile(blob, fileName);
}

function downProgressUpdate(percentage){
  e_input.val('下载进度：'+percentage+'%')
}

function getBlob(fileUrl,progressFunc) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    //监听进度事件
    xhr.addEventListener(
      'progress',
      function (evt) {
        console.log("下载进度事件");
        if (evt.lengthComputable) {
          let percentComplete = evt.loaded / evt.total;
          // percentage是当前下载进度，可自行处理
          let percentage = percentComplete * 100;
          console.log(percentage);
          updateTheLastLine('下载进度：' + parseInt(percentage).toString() + '%');
          progressFunc(percentage);
        }
      },
      false
    );
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}

function saveFile(blob, fileName) {
  // ie的下载
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    // 非ie的下载
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}