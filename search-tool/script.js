const companyName = document.querySelector("#company-name");
const inputButtons = document.querySelector(".input-container");
const inputContBtns = inputButtons.querySelectorAll("button");
const exactMatch = document.querySelector("#quotation-marks");
const isinNum = document.querySelector(".isin-number");
const notesButtons = document.querySelector(".notes-container");

const copyButtons = document.querySelectorAll(".copy");
const pasteButtons = document.querySelectorAll(".paste");
const deleteButtons = document.querySelectorAll(".delete");

const inputCopy = document.querySelectorAll('#copy');
const inputPaste = document.querySelectorAll('#paste');
const inputDelete = document.querySelectorAll('#delete');

const allInputElements = inputButtons.querySelectorAll("input");
const allTextArea = notesButtons.querySelectorAll("textarea");
const clearInputBtn = document.querySelector("#clear");
const clearNotesBtn = document.querySelector("#clear-notes");
const clipboards = document.querySelectorAll(".fa-clipboard");
const darkModeBtn = document.querySelector(".dark-mode-btn");

const addbtn = document.querySelector('#add-notes');

const body = document.querySelector('body');

const allIcons = body.querySelectorAll('i');

console.log(allIcons);

const allIconText = notesButtons.querySelectorAll('span');


console.log(clipboards);

let inputValues = [];
let noteValues = [];

let darkmode = false;

let quotationsChecked = exactMatch.checked;

exactMatch.addEventListener('change', (e)=>{
    quotationsChecked = e.target.checked;
    console.log(quotationsChecked);

    localStorage.setItem('exactMatch', quotationsChecked);
})


// addbtn.addEventListener('click', ()=>{
//     const newNotes = `
//     <textarea class="links" placeholder="Paste notes/links here"></textarea>
//     <button class="textarea-links-btn copy">
//         <i class="fa-solid fa-copy"></i>
//         <span class="button-label">Copy</span>
//     </button>
//     <button class="textarea-links-btn paste">
//         <i class="fa-solid fa-paste"></i>
//         <span class="button-label">Paste</span>
//     </button>
//     <button class="textarea-links-btn delete">
//         <i class="fa-solid fa-trash-can"></i>
//         <span class="button-label">Delete</span>
//     </button>`


//     const newDiv = document.createElement('div');

//     notesButtons.appendChild(newDiv);

//     newDiv.classList.add('links-container');

//     newDiv.innerHTML = newNotes;


// })



function toggleDarkMode() {

    const label = document.querySelector('.check-cont');
    const labelName = label.querySelector('label');
    const html = document.querySelector("html");


    //toggle darkmode
    if(!darkmode) {
        labelName.style.color = 'var(--cream)';
        document.body.classList.toggle('dark-mode');
        html.classList.toggle('dark-mode');
       
        allInputElements.forEach(input =>{
        input.style.backgroundColor = 'var(--navy-blue)'
        input.style.color = 'var(--cream)'
        input.style.boxShadow = 'none';
    })
        allTextArea.forEach(text =>{
        text.style.backgroundColor = 'var(--navy-blue)'
        text.style.color = 'var(--cream)'
        text.style.boxShadow = 'none';
    })


    darkmode = !darkmode;
    darkModeBtn.innerHTML =`<i class="fa-regular fa-sun"></i>`;

    localStorage.setItem('darkModeOn', true);



    //toggle lightmode
    } else {
        labelName.style.color = 'var(--navy-blue)'
        document.body.classList.toggle('dark-mode');
        html.classList.toggle('dark-mode');

        // allIcons.forEach(icon => {
        //     icon.style.color = 'var(--navy-blue)'
        // })

        // allIconText.forEach(text=>{
        //     text.style.color ='var(--navy-blue)'
        // })

        allInputElements.forEach(input =>{
        input.style.backgroundColor = 'white'
        input.style.color = 'var(--navy-blue)'
        // input.style.boxShadow = '1px 1px 2px grey';
        })
   
        allTextArea.forEach(text =>{
        text.style.backgroundColor = 'white'
        text.style.color = 'var(--navy-blue)' 
        // text.style.boxShadow = '1px 1px 2px grey';
        
        }) 

    darkmode = !darkmode;
    darkModeBtn.innerHTML =`<i class="fa-regular fa-moon"></i>`;

    localStorage.removeItem('darkModeOn');

    }
  
}

//toggle search engine



const googleIcon = document.querySelector(".google-icon");
const bingIcon = document.querySelector(".bing-icon");
const slideBar = document.querySelector(".selection-bar");
let searchEngine = 'google';

googleIcon.addEventListener('click', () => {
    toggleSearchEngine('google')
});

bingIcon.addEventListener('click', ()=> {
    toggleSearchEngine('bing')
});



function toggleSearchEngine (searchEng) {

    if (searchEng === 'bing') {
        slideBar.style.transform = 'translate(31px, 13px)';
        searchEngine = 'bing';
        localStorage.setItem('searchEngine', 'bing')
    }
    else if (searchEng === 'google') {
        slideBar.style.transform = 'translate(-2px, 13px)';
        searchEngine = 'google';
        localStorage.setItem('searchEngine', 'google')
    }
}


//load saved data
document.addEventListener("DOMContentLoaded", ()=>{
    const storedInput = localStorage.getItem('inputValues');
    const storedNotes = localStorage.getItem('noteValues');
    const dark = localStorage.getItem('darkModeOn');
    let searchEngine = localStorage.getItem('searchEngine');
    let quotations = localStorage.getItem('exactMatch');
    console.log(`search engine: ${searchEngine}`);

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

    if (dark) {
        toggleDarkMode();
    }

    if(searchEngine) {
        toggleSearchEngine (searchEngine);
    }


    if(quotations === 'true') {
        exactMatch.checked = true;
    } else if (quotations === 'false') {
        exactMatch.checked = false;
    }
})

//save changes in input fields
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


//save changes in note fields
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

//buttons for pasting default search strings
clipboards.forEach(clipboard => {
    clipboard.addEventListener('click', (e)=>{
        const targetparent = e.target.parentElement;
        const inputTarget = targetparent.querySelector("input");

        if (inputTarget.id === 'owner') {
            inputTarget.value = '("parent company" OR owner OR shareholder OR control OR majority)';
        } else if (inputTarget.id === 'name-change') {
            inputTarget.value = '("previous name" OR "former name" OR former* OR "new name" OR "name change" OR "aka" OR "dba" OR "doing business as" OR "also known as" OR "fka" OR "formerly known as")';
        } else if (inputTarget.id ==='subsidiary') {
            inputTarget.value = 'subsidiaries';
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

//clear input fields
clearInputBtn.addEventListener('click', ()=>{
    const deleteConfirmed = confirm('Delete all queries?');
    if (deleteConfirmed) {
        allInputElements.forEach(input=>{
            input.value = '';
            saveInputValues();
    })
}
})

//clear note fields
clearNotesBtn.addEventListener('click', ()=>{

    const deleteConfirmed = confirm('Delete all notes?');

    if (deleteConfirmed) {
        allTextArea.forEach(text=>{
            text.value = '';
            saveNoteValues();
        })
    }

})


//delete individual note fields
deleteButtons.forEach(button=>{
    button.addEventListener('click', e => {
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement;
        const targetInput = targetParent.querySelector(".links");

        if(targetInput) {

            targetInput.value = ''; 
            targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

            setTimeout(()=>{
                targetBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>
                <span class="button-label">Delete</span>`;
            }, 500);
        }

        saveNoteValues();

    })
})

inputDelete.forEach((button) => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement.parentElement;
        const targetInput = targetParent.querySelector(".input-style");
        
        if(targetInput) {

            targetInput.value = ''; 
            targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

            setTimeout(()=>{
                targetBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            }, 500);
        }

        saveNoteValues();

       
    })
})

//copy individual note fields
copyButtons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement;
        const targetInput = targetParent.querySelector(".links");
        

        if(targetInput) {
            targetInput.select();
            navigator.clipboard.writeText(targetInput.value);  
            targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

            setTimeout(()=>{
                targetBtn.innerHTML = `<i class="fa-solid fa-copy"></i>
                <span class="button-label">Copy</span>`;
            }, 500);
        }
        
    })
})


inputCopy.forEach((button) => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement.parentElement;
        const targetInput = targetParent.querySelector(".input-style");
        

        if(targetInput) {
            targetInput.select();
            navigator.clipboard.writeText(targetInput.value);  
            targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

            setTimeout(()=>{
                targetBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
            }, 500);
        }
        
    })
})

//paste from clipboard

pasteButtons.forEach( (button)=>{
    button.addEventListener('click', e => {
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement;
        const targetInput = targetParent.querySelector(".links");

        navigator.clipboard.readText().then((clipText) => { 
            targetInput.value = clipText
            saveNoteValues();       
        });
        
        targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

        setTimeout(()=>{
            targetBtn.innerHTML = `<i class="fa-solid fa-paste"></i>
            <span class="button-label">Paste</span>`;
        }, 500); 
        console.log('notesSaved')
    })
})

inputPaste.forEach((button) => {
    button.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetBtn = e.currentTarget;
        const targetParent = targetBtn.parentElement.parentElement;
        const targetInput = targetParent.querySelector(".input-style");
        
        navigator.clipboard.readText().then((clipText) => { 
            targetInput.value = clipText
            saveNoteValues();       
        });
        
        targetBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        setTimeout(()=>{
            targetBtn.innerHTML = `<i class="fa-solid fa-paste"></i>`;
        }, 500); 
        console.log('notesSaved')
    })
})


//execute searches
inputContBtns.forEach( (button) => {

    if (!(button.id === "clear" || button.id === 'copy' || button.id === 'paste' || button.id === 'delete')){

        button.addEventListener('click', (e)=>{
            const targetParent = e.target.parentElement;
            const targetInput = targetParent.querySelector("input");
    
            if (companyName.value !== '') {
                if (button.id === 'company-name-btn') {
                    const target = targetParent.parentElement;
                    const targetElement = target.querySelector("input");
                    searchCompanyOnly(targetElement.value);
                }
                else if (button.id === 'headquarters') {
                    searchCompanyWithOtherQuery(companyName.value, 'headquarters');
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
                else if (button.id === 'address') {
                    searchRelationship(companyName.value, targetInput.value)
                }
                else if (button.id === 'search-all') {
                    const owner = document.querySelector('#owner').value;
                    const nameChange = document.querySelector('#name-change').value;
                    const subsidiary = document.querySelector('#subsidiary').value;
                    const acquire = document.querySelector('#acquire').value;
                    const divest = document.querySelector('#divest').value;
    
                    const allSearch = [owner, nameChange, subsidiary, acquire, divest];
    
    
                    console.log(allSearch)
                    
                    searchAll(companyName.value, allSearch);
    
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
            } 
            else {
                alert('Please input Company Name.');
            }
        })
    }
})


function searchAll (company, stringArray) {

    if(exactMatch.checked === true && stringArray.length !== 0) {
        
        company = `"${company}"`

        stringArray.forEach(string=>{

                if (string !== '') {

                    if (searchEngine ==='google') {
                        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + string)}`;
                        window.open(googleSearchUrl, '_blank');
                    }
                    else if (searchEngine === 'bing') {
                        const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + string)}`; 
                        window.open(bingSearchUrl, '_blank');
                    }
                    
                }
                
        })

        console.log('success');
        
    } else if(stringArray.length !== 0) {

        stringArray.forEach(string=>{

            if (string !== '') {

                if (searchEngine ==='google') {
                    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + string)}`;
                    window.open(googleSearchUrl, '_blank');
                }
                else if (searchEngine === 'bing') {
                    const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + string)}`; 
                    window.open(bingSearchUrl, '_blank');
                }
                
            }
      
        })
    } else {
        alert ('Please enter necessary information.')
    }
}


function searchCompanyOnly(name) {
    
        if(exactMatch.checked === true) {

            if (searchEngine ==='google') {
                const googleSearchUrl = `https://www.google.com/search?q="${encodeURIComponent(name)}"`;    
                window.open(googleSearchUrl, '_blank');
            }
            else if (searchEngine === 'bing') {
                const bingSearchUrl = `https://www.bing.com/search?q="${encodeURIComponent(name)}"`; 
                window.open(bingSearchUrl, '_blank');
            }

        } else {

            if (searchEngine ==='google') {
                const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(name)}`;   
                window.open(googleSearchUrl, '_blank');
            }
            else if (searchEngine === 'bing') {
                const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(name)}`;    
                window.open(bingSearchUrl, '_blank');
            }
        }

    }


function searchFinanceInfo(isin) {
        const openfigisearchURL = `https://www.openfigi.com/search#!?simpleSearchString=${isin}`
        window.open(openfigisearchURL, '_blank');
}

function searchCompanyWithOtherQuery(company, query) {
    
    if(exactMatch.checked === true && query !== '') {

        company = `"${company}"`

        if (searchEngine ==='google') {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
            window.open(googleSearchUrl, '_blank');
        }
        else if (searchEngine === 'bing') {
            const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
            window.open(bingSearchUrl, '_blank');
        }

        
    } else if(exactMatch.checked === false && query !== '') {

        if (searchEngine ==='google') {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
            window.open(googleSearchUrl, '_blank');
        }
        else if (searchEngine === 'bing') {
            const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
            window.open(bingSearchUrl, '_blank');
        }
    } else {
        alert ('Please enter necessary information.')
    }
       
}

function searchRelationship(company, query) {
    if(exactMatch.checked === true && query !== '') {
        company = `"${company}"`
        query = `"${query}"`

        if (searchEngine ==='google') {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
            window.open(googleSearchUrl, '_blank');
        }
        else if (searchEngine === 'bing') {
            const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
            window.open(bingSearchUrl, '_blank');
        }
    } else if(query !== '') {

        if (searchEngine ==='google') {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;
            window.open(googleSearchUrl, '_blank');
        }
        else if (searchEngine === 'bing') {
            const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(company + ' + ' + query)}`;    
            window.open(bingSearchUrl, '_blank');
        }
    } else {
        alert ('Please enter necessary information.')
    }
}
