const STORAGE_KEY = "BOOKSHELF_APPS";
 
let book_list = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false;
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(book_list);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       book_list = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(task, Author, Year, isCompleted) {
   return {
       id: +new Date(),
       task,
       Author,
       Year,
       isCompleted
   };
}
 
function findBook(bookId) {
   for(book of book_list){
       if(book.id === bookId)
           return book;
   }
   return null;
}

function findBookIndex(bookId) {
   let index = 0
   for (book of book_list) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromBookshelf() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
  
  
    for(book of book_list){
        const newBook = makeBook(book.task, book.Author, book.Year, book.isCompleted);
        newBook[BOOKSHELF_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}