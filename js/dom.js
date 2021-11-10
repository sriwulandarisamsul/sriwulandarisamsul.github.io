const UNCOMPLETED_LIST_BOOKSHELF_ID = "book_list";

function addBook() {
    const uncompletedBOOKSHELFList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID );

    const textBook = document.getElementById("Title").value;
    const textAuthor = "Penulis: " + document.getElementById("Author").value;
    const textYear = "Tahun: " + document.getElementById("Year").value;
    console.log("book" + textBook);
    console.log("author" + textAuthor);
    console.log("year" + textYear);

    const book = makeBook(textBook, textAuthor, textYear, false);
    const bookObject = composeBookObject(textBook, textAuthor, textYear, false);

    book[BOOKSHELF_ITEMID] = bookObject.id;
    book_list.push(bookObject);

    uncompletedBOOKSHELFList.append(book);
    updateDataToStorage();

    let isSelesai   = document.getElementById('IsComplete').checked;
    let labelButton = '';
    let rakBuku     = '';

    if (isSelesai) {
        labelButton = 'Selesai dibaca';
        rakBuku = document.getElementById('completed-book');
    }
    else {
        labelButton = 'Belum selesai dibaca';
        rakBuku = document.getElementById('book_list');
    }

    rakBuku.append(book);
}

function makeBook(title, author, year, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;

    const textBookshelf = document.createElement("article");
    textBookshelf.classList.add("book_item")
    textBookshelf.append(textTitle, textAuthor, textYear);

    const book_shelf = document.createElement("div");
    book_shelf.classList.add("item", "shadow")
    book_shelf.append(textBookshelf);

    if(isCompleted){
      book_shelf.append(
        createUndoButton(),
        createTrashButton()
        );
    } else {
      book_shelf.append(
        createCheckButton(),
        createTrashButton()
      );
    }

    return book_shelf;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

const COMPLETED_LIST_BOOKSHELF_ID = "completed-book";

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    const taskTitle = taskElement.querySelector(".book_item > h2").innerText;
    const taskAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const taskYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOKSHELF_ITEMID]);
    book.isCompleted = true;
    newBook[BOOKSHELF_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOKSHELF_ITEMID]);
    book_list.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
    const taskTitle = taskElement.querySelector(".book_item > h2").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > p").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);

    const book = findBook(taskElement[BOOKSHELF_ITEMID]);
    book.isCompleted = false;
    newBook[BOOKSHELF_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

const BOOKSHELF_ITEMID = "itemId";
const checkbox = document.getElementById("IsComplete");
let check = false;

checkbox.addEventListener("change", function(){
    if(checkbox.checked){
        check = true
        document.querySelector("span").innerText = "Selesai dibaca"
    }else {
        check = false
        document.querySelector("span").innerText = "Belum selesai dibaca"
    }
});

const searchBook = document.getElementById("searchBook");
searchBook.addEventListener("submit", function(e){
    e.preventDefault()
    let html = ''
    let searchKey = document.getElementById("searchBookTitle").value
    let list_item = document.getElementsByClassName("list_item")
    for (let i = 0; i < list_item.length; i++) {
        let book_item = list_item[i].getElementsByClassName("book_item")
        for (let j = 0; j < book_item.length; j++) {
            let title = book_item[j].getElementsByTagName("h2")[0].innerText
            if(title.trim() == searchKey.trim()) {
                html += book_item[i].outerHTML
            }
        }
    }
    document.getElementById("resultSearch").innerHTML = html
});