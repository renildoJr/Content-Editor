'use strict';

const btnToolbar = document.querySelectorAll(".btn-toolbar");
const content = document.querySelector('.content');
const counter = document.getElementById("count");
let selectedElement = null;

content.addEventListener("input", function () {
    const text = this.innerText;
    const currentLength = text.length;
    counter.textContent = currentLength;
});

btnToolbar.forEach(button => button.addEventListener("click", ()=>{
    formatText(button.value);
}))

function formatText(tag) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Verificar se o texto selecionado pertence à div .content
    if (content.contains(range.commonAncestorContainer)) {
        const element = document.createElement(tag);
        // element.setAttribute("class", 'editable');
        element.textContent = selection.toString();
        range.deleteContents();
        range.insertNode(element);
        content.focus();
    }
}


content.addEventListener("input", initTextInsideDiv)

function initTextInsideDiv() {
    const allContent = content.querySelectorAll("*");

    if(allContent.length === 0) {
        if(content.textContent.length !== 0) {
            const contentIntialText = content.textContent;
            const newDiv = document.createElement("div");
            newDiv.textContent = contentIntialText;
            content.textContent = "";
            content.appendChild(newDiv);
            selectedElement = newDiv;
            newDiv.focus();

            // Coloque o foco no final da nova div para que o cursor de texto inicie após o último caractere
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(newDiv, 1); // Começa após o último caractere
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    // else {
    //     Contém tags html
    // }
}


// Position (Experimental)
content.addEventListener('click', function(event) {
    const element = event.target;

    // if(element.classList.value == "editable") {
    //     element.style.textAlign = "center"
    //     console.log(element)
    // } 

    selectedElement = element;
});

function changeElementPosition(pos) {
    selectedElement.style.textAlign = pos;
}