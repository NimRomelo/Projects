
const inputItemArea = document.querySelector(".input-item");
const inputButton = document.querySelector(".input-button");
const listOfItems = document.getElementsByClassName("shopping-list")[0]



function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector))
        callback(e)
    })
}

addGlobalEventListener("click", ".input-button", e=> {
    addItem();
})

inputItemArea.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        addItem();
    }
})

function addItem() {
    const newItem = document.createElement("li")
    const inputItem = inputItemArea.value.trim()
    if (inputItem) {
        if(checkDuplicate (inputItem)) {
            alert("Item already added");
        } else {
            newItem.innerHTML = `<button class="remove-button">Delete</button>
            <span class="item-name">${inputItem}</span>`
        listOfItems.appendChild(newItem)
        newItem.classList.add("list-format")
        inputItemArea.value = "";
        }}
}

function checkDuplicate (inputItem) {
    const itemList = listOfItems.querySelectorAll("li")
    
    for (let i=0; i<itemList.length; i++) {
            const itemText = itemList[i].textContent.replace("Delete", "").trim();
            if (inputItem === itemText) {
                return true;
            }
        }
    return false;
}

addGlobalEventListener("click", ".remove-button", e=> {
    removeItem();
})

function removeItem () {
    const deleteRow = document.getElementsByClassName("remove-button")[0]
    let rowParent = deleteRow.parentElement
    rowParent.remove()
}

addGlobalEventListener("click", ".clear-button", e=> {
    alert("Delete all items?")
    removeAll();
})

function removeAll () {
    const itemList = document.querySelectorAll("li")
    for (let i=0; i<itemList.length; i++) {
        itemList[i].remove();
    }
}

