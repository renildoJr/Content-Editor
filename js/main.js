'use strict';

const btnToolbar = document.querySelectorAll(".btn-toolbar");
const content = document.querySelector('.content');
const counter = document.getElementById("count");

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
        element.textContent = selection.toString();
        range.deleteContents();
        range.insertNode(element);
        content.focus();
    }
}