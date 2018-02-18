const letterShowTime = 100;
const sceneLength = 10000;
const scriptPath = 'script.json'
const prefaceDiv = document.getElementById("preface");
const codeWrapper = document.querySelector("#code-side .wrapper");
const promptWrapper = document.querySelector("#prompt-side .wrapper");

document.addEventListener("DOMContentLoaded", () => {
  loadJSON(response => {
    runScript(JSON.parse(response));
  });
});

function loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', scriptPath, true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == 200) {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

function runScript(json) {
  let initialDelay = 0;

  for (const scene of json.scenes) {
    setTimeout(() => {
      nextScene(scene);
    }, initialDelay)
    initialDelay += sceneLength;
  }
}

function nextScene(scene) {
  codeWrapper.innerHTML = "";
  prefaceDiv.innerHTML = "";
  promptWrapper.innerHTML = "";

  prefaceDiv.innerHTML = scene.preface;

  for (const codeLine of scene.code.split(/\n/)) {
    let codeSpan = document.createElement('span');
    codeSpan.textContent = codeLine;
    codeSpan.setAttribute('class', 'line');
    codeWrapper.appendChild(codeSpan);
  }

  for (const promptLine of scene.prompt.split(/\n/)) {
    let promptSpan = document.createElement('span');
    promptSpan.textContent = promptLine;
    promptSpan.setAttribute('class', 'line');
    promptWrapper.appendChild(promptSpan);
  }
}

function typeCode() {
  const codeLines = document.getElementsByClassName("code-line");
  for (const line of codeLines) {
    const text = line.textContent;
    let letters = '';
    for (let i = 0; i < text.length; i++) {
      letters += `<span class="letter hide">${text[i]}</span>`;
    }
    line.innerHTML = letters;
  }

  let initialDelay = 0

  for (const line of codeLines) {
    setTimeout(() => {
      showLetters(line);
    }, initialDelay)
    initialDelay += line.children.length * letterShowTime;
  }
}

function showLetters(line) {
  for (let i = 0; i < line.children.length; i++) {
    ((i => {
      setTimeout(() => {
        line.children[i].classList.remove("hide");
      }, letterShowTime * i);
    }))(i);
  };
}
