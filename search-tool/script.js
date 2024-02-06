const companyName = document.querySelector("#company-name");
const inputButtons = document.querySelector(".input-container");
const inputContBtns = inputButtons.querySelectorAll("button");
const exactMatch = document.querySelector("#quotation-marks");
const isinNum = document.querySelector(".isin-number");
const copyButtons = document.querySelectorAll(".textarea-links-btn");
const allInputElements = inputButtons.querySelectorAll("input");

console.log(allInputElements);

const allTextArea = document.querySelectorAll("textarea");
const clearInputBtn = document.querySelector("#clear");
const clearNotesBtn = document.querySelector("#clear-notes");
const clipboards = document.querySelectorAll(".fa-clipboard");

let inputValues = [];
let noteValues = [];


document.addEventListener("DOMContentLoaded", ()=>{
    const storedInput = localStorage.getItem('inputValues');
    const storedNotes = localStorage.getItem('noteValues');

    if (storedInput) {

        const parsedInputValues = JSON.parse(storedInput);

        allInputElements.forEach((input, index) => {
            input.value = parsedInputValues[index];
        });
    }

    if (storedNotes) {

        const parsedNoteValues = JSON.parse(storedNotes);

        allTextArea.forEach((text, index) => {
            text.value = parsedNoteValues[index];
        })
    }
})


allInputElements.forEach(input=>{
    input.addEventListener('input', saveInputValues);
});


function saveInputValues () {
    inputValues = [];

        allInputElements.forEach(input => {
            inputValues.push(input.value);
        });
        localStorage.setItem('inputValues', JSON.stringify(inputValues));
}

allTextArea.forEach(text=>{
    text.addEventListener('input', saveNoteValues);
});

function saveNoteValues () {
    noteValues = [];

        allTextArea.forEach(text => {
            noteValues.push(text.value);
        });
        localStorage.setItem('noteValues', JSON.stringify(noteValues));
}


clipboards.forEach(clipboard => {
    clipboard.addEventListener('click', (e)=>{
        const targetparent = e.target.parentElement;
        const inputTarget = targetparent.querySelector("input");

        if (inputTarget.id === 'owner') {
            inputTarget.value = '("parent company" OR owner OR shareholder OR control OR majority)';
        } else if (inputTarget.id === 'name-change') {
            inputTarget.value = '("previous name" OR "former name" OR former* OR "new name" OR "name change" OR "aka" OR "dba" OR "doing business as" OR "also known as" OR "fka" OR "formerly known as")';
        } else if (inputTarget.id ==='subsidiary') {
            inputTarget.value = '(subsidiary OR member OR affiliate)';
        } else if (inputTarget.id === 'acquire') {
            inputTarget.value = '(acquired OR merger OR "joint-venture" OR JV OR integrate)';
        } else if (inputTarget.id === 'divest') {
            inputTarget.value = '(divest OR sold OR spin-off)';
        }
        
        else {
            return;
        }

        saveInputValues();
    })
})


clearInputBtn.addEventListener('click', ()=>{
    allInputElements.forEach(input=>{
        input.value = '';
        saveInputValues();
    })
})


clearNotesBtn.addEventListener('click', ()=>{
    allTextArea.forEach(text=>{
        text.value = '';
        saveNoteValues();

        console.log('clicked');
    })
})


inputContBtns.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        const targetParent = e.target.parentElement;
        const targetInput = targetParent.querySelector("input");

        if (companyName.value !== '') {
            if (button.id === 'company-name') {
                searchCompanyOnly(targetInput.value);
            }
            else if (button.id === 'stock') {
                searchCompanyWithOtherQuery(companyName.value, 'stock')
            } 
            else if (button.id === 'isin') {
                searchCompanyWithOtherQuery(companyName.value, '"ISIN"')
            }
            else if (button.id === 'openfigi') {
                if (isinNum.value !== '') {
                    searchFinanceInfo(isinNum.value);
                } else {
                    alert('Please input ISIN number');
                }
            }
            else if (button.id === 'other-company' || button.id === 'custom'){
                    searchRelationship(companyName.value, targetInput.value);
            }
            else {
                searchCompanyWithOtherQuery(companyName.value, targetInput.value)
            }
        } else if (button.id === 'openfigi') {
            if (isinNum.value !== '') {
                searchFinanceInfo(isinNum.value);
            } else {
                alert('Please input ISIN number');
            }
        } else if (button.id === "clear") {
            return;
        } 
        else {
            alert('Please input Company Name.');
        }
    })
})

copyButtons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetParent = e.target.parentElement;
        const targetInput = targetParent.firstElementChild;

        if (targetInput.value !== '') {
            
            targetInput.select(); 
            navigator.clipboard.writeText(targetInput.value);   
        }
            button.textContent = 'Copied';

        setTimeout(()=>{
            button.textContent = 'Copy';
        }, 500);
    })
})



function searchCompanyOnly(name) {
    
        if(exactMatch.checked === true) {
            const googleSearchUrl = `https://www.google.com/search?q="${encodeURIComponent(name)}"`;    
            window.open(googleSearchUrl, '_blank');
        } else {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(name)}`;    
            window.open(googleSearchUrl, '_blank');
        }

    }


function searchFinanceInfo(isin) {
    const openfigisearchURL = `https://www.openfigi.com/search#!?simpleSearchString=${isin}`
    window.open(openfigisearchURL, '_blank');
}

function searchCompanyWithOtherQuery(company, query) {
    
    if(exactMatch.checked === true && query !== '') {
        company = `"${company}"`
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
        window.open(googleSearchUrl, '_blank');
    } else if(query !== '') {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
        window.open(googleSearchUrl, '_blank');
    } else {
        alert ('Please enter necessary information.')
    }
       
}

function searchRelationship(company, query) {
    if(exactMatch.checked === true && query !== '') {
        company = `"${company}"`
        query = `"${query}"`
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
        window.open(googleSearchUrl, '_blank');
    } else if(query !== '') {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
        window.open(googleSearchUrl, '_blank');
    } else {
        alert ('Please enter necessary information.')
    }
}
