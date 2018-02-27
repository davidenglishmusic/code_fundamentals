const letterShowTime = 50;
const scriptPath = 'script.json'
const prefaceDiv = document.getElementById("preface");
const codepad = document.querySelector("#code-side .codepad");
const promptWrapper = document.querySelector("#prompt-side .wrapper");
const nextButton = document.querySelector("#nav #next");
const previousButton = document.querySelector("#nav #previous");
const runButtons = document.querySelectorAll(".run");
const noOutputInstruction = '(No output for this - click/tap the ">" button to proceed)'
let currentScene;
let scenes;

document.addEventListener("DOMContentLoaded", () => {
  loadJSON(response => {
    const json = JSON.parse(response);
    scenes = json.scenes;
    currentScene = scenes[0];
    runScene(currentScene);
  });

  nextButton.addEventListener("click", () => {
    if (scenes !== undefined) {
      const currentIndex = scenes.findIndex(scene => scene === currentScene);
      if (currentIndex + 1 < (scenes.length)) {
        currentScene = scenes[currentIndex + 1]
        runScene(currentScene);
      }
    }
  });

  previousButton.addEventListener("click", () => {
    if (scenes !== undefined) {
      const currentIndex = scenes.findIndex(scene => scene === currentScene);
      if (currentIndex - 1 >= 0) {
        currentScene = scenes[currentIndex - 1];
        runScene(scenes[currentIndex - 1]);
      }
    }
  });

  for(const runButton of runButtons) {
    runButton.addEventListener("click", () => {
      if (currentScene !== undefined) {
        promptWrapper.innerHTML = "";
        revealPromptOutput(currentScene);
      }
    });
  }
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

function runScene(scene) {
  codepad.innerHTML = "";
  prefaceDiv.innerHTML = "";
  promptWrapper.innerHTML = "";

  prefaceDiv.innerHTML = scene.preface;

  let codeInitialDelay = 0;

  for (const codeLine of scene.code.split(/\n/)) {
    let codeSpan = document.createElement('span');
    codeSpan.textContent = codeLine;
    codeSpan.className = 'line hide';
    codepad.appendChild(codeSpan);
    convertToHiddenLetters(codeSpan);
    setTimeout(() => {
      codeSpan.classList.remove('hide');
      typeCode(codeSpan);
    }, codeInitialDelay)
    codeInitialDelay += letterShowTime * codeSpan.childElementCount;
  }
}

function convertToHiddenLetters(line) {
  const text = line.textContent;
  let letters = '';
  for (let i = 0; i < text.length; i++) {
    letters += `<span class="letter hide">${text[i]}</span>`;
  }
  line.innerHTML = letters;
}

function typeCode(line) {
  for (let i = 0; i < line.children.length; i++) {
    ((i => {
      setTimeout(() => {
        line.children[i].classList.remove("hide");
      }, letterShowTime * i);
    }))(i);
  };
}

function revealPromptOutput(scene) {
  if (scene.prompt.length === 0) {
    let promptSpan = document.createElement('span');
    promptSpan.textContent = noOutputInstruction;
    promptSpan.className = 'line';
    promptWrapper.appendChild(promptSpan);
  }
  else {
    for (const promptLine of scene.prompt.split(/\n/)) {
      let promptSpan = document.createElement('span');
      promptSpan.textContent = promptLine;
      promptSpan.className = 'line';
      promptWrapper.appendChild(promptSpan);
    }
  }
}
