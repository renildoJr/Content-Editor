'use strict';

const btnToolbar = document.querySelectorAll(".btn-text");
const content = document.querySelector('.content');
const counter = document.getElementById("count");
const uploadButton = document.getElementById("uploadButton");
let selectedElement = null;

content.addEventListener("input", function () {
    const text = this.innerText;
    const currentLength = text.length;
    counter.textContent = currentLength;
});

btnToolbar.forEach(button => button.addEventListener("click", ()=>{
    formatText(button.value);
}))

content.addEventListener("input", initTextInsideDiv);

content.addEventListener('click', function(event) {
    const element = event.target;
    selectedElement = element;
});

uploadButton.addEventListener("click", ()=> {
    const image_upload = document.getElementById("image_upload");
    image_upload.click()

    image_upload.onchange = function() {
        const newImage = document.createElement("img");
        newImage.src = URL.createObjectURL(image_upload.files[0]);
    
        if(selectedElement == null) {
            content.appendChild(newImage);
        }else {
            selectedElement.appendChild(newImage);
        }
    }
})

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

            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(newDiv, 1);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}

function changeElementPosition(pos) {
    selectedElement.style.textAlign = pos;
}