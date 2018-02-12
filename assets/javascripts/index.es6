const letterShowTime = 100;

document.addEventListener("DOMContentLoaded", () => {
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
});

function showLetters(line) {
  for (let i = 0; i < line.children.length; i++) {
    ((i => {
      setTimeout(() => {
        line.children[i].classList.remove("hide");
      }, letterShowTime * i);
    }))(i);
  };
}
