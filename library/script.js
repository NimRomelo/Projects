const addBookBtn = document.querySelector(".add-book-btn");
const myDialog = document.querySelector("#myDialog");
const clearBtn = document.querySelector(".clear-btn");
const form = document.querySelector(".dialog-form");

    addBookBtn.addEventListener("click", ()=>{
        myDialog.showModal();
    });

    myDialog.addEventListener("click", e=> {
        const dialogDimensions = myDialog.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            myDialog.close()
        }
    })

    clearBtn.addEventListener("click", e=>{
        e.preventDefault();
        form.reset();
    })


class Books {
    constructor(title, author, pages, date, image, readStatus) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.date = date,
        this.image = image
        this.readStatus = readStatus
    }
}

const dialog = document.querySelector('.dialog-form');

dialog.addEventListener('submit', e => {

    e.preventDefault();

    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#book-pages').value;
    const date = document.querySelector('#date-added').value;
    const image = document.querySelector('#image-file').value;
    const readRadioButtons = document.getElementsByName('read-status');
    let readStatus;

    for(const radioButton of readRadioButtons) {
        if(radioButton.checked) {
            readStatus = radioButton.id === 'read-yes'? true: false;
            break;
        }
    }

    if(!isDuplicate(title)) {
        createNewBook(title, author, pages, date, image, readStatus);
    }

    myDialog.close();
    form.reset();
})


function createNewBook(title, author, pages, date, image, readStatus) {

    const newBook = new Books(title, author, pages, date, image, readStatus);

    console.log(newBook);

    const createElementWithClass = (tagName, className) => {
        const element = document.createElement(tagName);
        element.classList.add(className);
        return element;
    };

    const bookContainer = createElementWithClass('div', 'book-container');
    const imgContainer = createElementWithClass('div', 'book-image');
    const bookImg = createElementWithClass('img', 'image');
    const bookInfo = createElementWithClass('div', 'book-info');
    const bookTitle = createElementWithClass('span', 'book-title');
    const bookAuthor = createElementWithClass('span', 'book-author');
    const bookPages = createElementWithClass('span', 'pages');
    const dateRead = createElementWithClass('span', 'date-read');
    const deleteBtn = createElementWithClass('div', 'delete-btn');
    const deleteImg = createElementWithClass('img', 'delete');
    const readStatusContainer = createElementWithClass('div', 'read-btn');
    const readSlider = createElementWithClass('div', 'slider');
    const readBtn = createElementWithClass('button', 'read');
    const notReadBtn = createElementWithClass('button', 'not-read');
    const bookLibrary = document.querySelector('.book-library');
   
    

    bookContainer.appendChild(imgContainer);
    imgContainer.appendChild(bookImg);
    bookContainer.appendChild(deleteBtn);
    bookContainer.appendChild(readStatusContainer);
    readStatusContainer.appendChild(readSlider);
    readStatusContainer.appendChild(readBtn);
    readStatusContainer.appendChild(notReadBtn);
    bookContainer.appendChild(bookInfo);
    deleteBtn.appendChild(deleteImg);
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);
    bookInfo.appendChild(dateRead);
    bookLibrary.appendChild(bookContainer);

    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPages.textContent = `${pages}` + ` pages`;
    dateRead.textContent = `Date added: ` + `${date}`;
    readBtn.textContent = 'Read';
    notReadBtn.textContent = 'To Read';
    
    if(newBook.readStatus === false) {
        toggleNotRead(readSlider, readBtn, notReadBtn);
    }

    
    if (image) {
        bookImg.src = image;
    } else {
        bookImg.src = './images/book-default.jpg';
    }
    
    
    
    deleteImg.src = './images/delete.png'

    console.log(bookImg.src);
    
    saveToLocalStorage(newBook);

    readBtn.addEventListener('click', (e) => {
        changeReadStatus(e);
        toggleRead(readSlider, readBtn, notReadBtn);
    });
    notReadBtn.addEventListener('click', (e) => {
        changeReadStatus(e);
        toggleNotRead(readSlider, readBtn, notReadBtn)
    });
    
    deleteBtn.addEventListener('click', function(e) {
        deleteBook(e);
        removeFromStorage(e);
    })

    updateBookCounter();

}


function saveToLocalStorage(book) {
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];

    if(!existingBooks.some(existingBook => existingBook.title ===
        book.title)) {
        existingBooks.push(book);
    }

    localStorage.setItem('books', JSON.stringify(existingBooks));

    console.log(existingBooks);
}

function loadBooksFromLocalStorage() {
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];

    if(existingBooks){
    existingBooks.forEach(book => {
        createNewBook(book.title, book.author, book.pages, book.date, book.image, book.readStatus);
    })}
}

loadBooksFromLocalStorage();
showLibraryIsEmpty();

function isDuplicate(title) {
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];

    if(existingBooks){
        if(existingBooks.some(existingBook => existingBook.title ===
            title)) {
            alert("Book is already in your library.")
            return true;
            }
        }
        
}

const deleteBtn = document.querySelector('.delete-btn');


function deleteBook(e) {
    const targetParent = e.target.parentElement.parentElement;
    const isConfirmed = confirm('Are you sure you want to remove book from library?')
    
    if (isConfirmed) {
        targetParent.remove();
    }
}

function removeFromStorage(e) {
    const targetParent = e.target.parentElement.parentElement;
    const title = targetParent.querySelector('.book-title').innerText;
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    const indexToRemove = existingBooks.findIndex(book => book.title === title);

    if(indexToRemove !== -1) {
        existingBooks.splice(indexToRemove, 1);

        localStorage.setItem('books', JSON.stringify(existingBooks));
    }
    
    console.log("removed from storage");
    console.log(existingBooks)


    updateBookCounter();
}


function updateBookCounter() {
    let booksRead = document.querySelector('.book-count-read');
    let booksToRead = document.querySelector('.book-count-to-read');

    const existingBooks = JSON.parse(localStorage.getItem('books'));

    const readCount = existingBooks.filter(book => book.readStatus === true).length;
    const toReadCount = existingBooks.filter(book => book.readStatus === false).length;

    booksRead.innerText = String(readCount);
    booksToRead.innerText = String(toReadCount);

    showLibraryIsEmpty();
}


function showLibraryIsEmpty() {
    const status = document.querySelector('.library-status');
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];

    if (existingBooks.length === 0) {
        status.style.display = 'inline';
        
    } else if(existingBooks.length > 0){
        status.style.display = 'none';
    }

}


function toggleRead(slider, readBtn, notReadBtn) {
    slider.style.left = '0px';
    slider.style.backgroundColor = 'var(--light-green)';
    readBtn.style.color = 'var(--teal)';
    notReadBtn.style.color = 'var(--light-grey)';
    console.log('Read clicked')
    updateBookCounter();
}

function toggleNotRead(slider, readBtn, notReadBtn) {
    slider.style.left = '90px';
    slider.style.backgroundColor = 'var(--red)';
    notReadBtn.style.color = 'var(--teal)';
    readBtn.style.color = 'var(--light-grey)';
    console.log('To Read clicked')
    updateBookCounter();
}

function changeReadStatus(e) {
    const existingBooks = JSON.parse(localStorage.getItem('books')) ?? [];
    const targetParent = e.target.parentElement.parentElement
    const bookTitle = targetParent.querySelector('.book-title').textContent;

    const bookIndex = existingBooks.findIndex(book => book.title === bookTitle);

    if(bookIndex !== -1) {

        existingBooks[bookIndex].readStatus = !existingBooks[bookIndex].readStatus;

        localStorage.setItem('books', JSON.stringify(existingBooks));
    }

    console.log('status changed');
    console.log(existingBooks);

}