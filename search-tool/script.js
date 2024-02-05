const companyName = document.querySelector("#company-name");
const buttons = document.querySelectorAll("button");
const exactMatch = document.querySelector("#quotation-marks")
const isinNum = document.querySelector(".isin-number");

buttons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        const targetParent = e.target.parentElement;
        const targetInput = targetParent.firstElementChild

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
            else if (button.id === 'other-company'){
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
        }
        else {
            alert('Please input Company Name.');
        }
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

