import {Book} from "./book.js";

const booksNumInputSec = document.getElementById("booksNumInputSec");
const booksNumInp = document.getElementById("numberOfBooks");
const booksNumBtn = document.getElementById("booksNumBtn");
// console.log(booksNumInputSec , booksNum , booksNumBtn);

const booksInputDetails = document.getElementById("booksInputDetails");
const bookCount = document.getElementById("book-count");
const bookName = document.getElementById("bookName");
const bookPrice = document.getElementById("bookPrice");
const AuthName = document.getElementById("AuthName");
const AuthMail = document.getElementById("AuthMail");
const bookDetailsBtn = document.getElementById("bookDetailsBtn");
// console.log(booksInputDetails,bookCount,bookName,bookPrice,AuthName,AuthMail,bookDetailsBtn);

const booksTable = document.getElementById("booksTable");
const tBody = document.getElementById("tbody");
// console.log(booksTable , tBody);

const bookNameError = document.querySelector(".bookNameError");
const priceError = document.querySelector(".priceError");
const authNameError = document.querySelector(".authNameError");
const authMailError = document.querySelector(".authMailError");
// console.log(booksNumError,bookNameError,priceError,authNameError,authMailError);



let NumOfBooks = 0 ;                 //store the books num input value
let counter = 1 ;
let booksList = []                   // store books
const booknameRegex = /^[^\d]+$/;
const priceRegex = /^\d+(\.\d{1,5})?$/;
const AuthNameRegex = /^[A-Za-zà-ÿ]+([ '-][A-Za-zà-ÿ]+)*$/;
const AuthMailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

booksNumBtn.addEventListener("click" , function(){

    NumOfBooks = booksNumInp.value;
    booksNumInputSec.classList.add("hide");
    booksInputDetails.classList.remove("hide");
    bookCount.innerText = `Add Book [ ${counter} of ${NumOfBooks} ] `    
})

function ValidateBookName(){
    if(bookName.value == ""){
        bookNameError.classList.remove("hide")
        bookNameError.innerText = 'this field is required';
        return false;
    }else if(!booknameRegex.test(bookName.value)){
        bookNameError.classList.remove("hide")
        bookNameError.innerText="Enter a valid book name (not numbers)";
        return false;
    }else{
        bookNameError.classList.add("hide")
        return true
    }
}
function ValidateBookPrice(){
    if(bookPrice.value == ""){
        priceError.classList.remove("hide");
        priceError.innerText = 'this field is required';
        return false;
    }else if(!priceRegex.test(bookPrice.value)){
        priceError.classList.remove("hide");
        priceError.innerText="Enter a valid price (numbers only)";
        return false;
    }else{
        priceError.classList.add("hide");
        return true
    }
}
function ValidateAuthorName(){
    if(AuthName.value == ""){
        authNameError.classList.remove("hide");
        authNameError.innerText = 'this field is required';
        return false;
    }else if(!AuthNameRegex.test(AuthName.value)){
        authNameError.classList.remove("hide");
        authNameError.innerText="Enter a valid Author name";
        return false;
    }else{
        authNameError.classList.add("hide");
        return true
    }
}
function ValidateAuthorMail(){
    if(AuthMail.value == ""){
        authMailError.classList.remove("hide");
        authMailError.innerText = 'this field is required';
        return false;
    }else if(!AuthMailRegex.test(AuthMail.value)){
        authMailError.classList.remove("hide");
        authMailError.innerText="Enter a valid email format ex@mail.com";
        return false;
    }else{
        authMailError.classList.add("hide");
        return true
    }
}

bookDetailsBtn.addEventListener("click" , function(e){
   
    e.preventDefault();
   const isbookNameValid = ValidateBookName();
   const isbookPriceValid = ValidateBookPrice();
   const isAuthNameValid = ValidateAuthorName();
   const isAuthMailValid = ValidateAuthorMail();

   if(isbookNameValid && isbookPriceValid && isAuthNameValid && isAuthMailValid){

        if (counter <= NumOfBooks) {
            let book = new Book(bookName.value, bookPrice.value, AuthName.value, AuthMail.value);
            booksList.push(book);
            ResetInputs();

            if (counter < NumOfBooks) {  
                counter++; 
                bookCount.innerText = `Add Book [ ${counter} of ${NumOfBooks} ] `;
            } else {
                booksInputDetails.classList.add("hide");
                booksTable.classList.remove("hide");
                DisplayBooksTable();
            }
        }
    }

})


function ResetInputs(){
    bookName.value = "";
    bookPrice.value ="";
    AuthName.value="";
    AuthMail.value=""
}

function DisplayBooksTable(){
    tBody.innerHTML="";

    booksList.forEach((book , i) =>{
        
        const tr = document.createElement("tr");
        tr.setAttribute('data-index' , i);
        tr.innerHTML= ` <td>
                            <span class="bookDesc">${book.name}</span>
                            <input type="text" class="hide table-input" id="tBNameInp"  value="${book.name}">
                            <span class="table-error hide" id="tBNameError"></span>
                        </td>
                        <td>
                            <span class="bookDesc">$${book.price}</span> 
                            <input type="text" class="hide table-input" id="tBPriceInp" value="${book.price}">
                            <span class="table-error hide" id="tBPriceError"></span>
                        </td>
                        <td> 
                            <span class="bookDesc">${book.author.authorName}</span> 
                            <input type="text" class="hide table-input" id="tBAuthNameInp" value="${book.author.authorName}">
                            <span class="table-error hide" id="tBAuthNameError"></span>
                        </td>
                        <td> 
                            <span class="bookDesc">${book.author.authorMail}</span> 
                            <input type="text" class="hide table-input" id="tBAuthMailInp" value="${book.author.authorMail}"> 
                            <span class="table-error hide" id="tBAuthMailError"></span>
                        </td>
                        <td> <i class="fa-solid fa-pen-to-square edit"  data-index="${i}"></i>   
                             <i class="fa-solid fa-circle-check done hide"  data-index="${i}"></i>
                        </td>
                        <td>
                            <i class="fa-solid fa-trash delete"  data-index="${i}"></i>
                            <i class="fa-solid fa-circle-xmark cancel hide"  data-index="${i}"></i>
                        </td>`;

        tBody.append(tr);
    })
}

tBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        DeleteBook(e);
    }
    if (e.target.classList.contains("edit")) {
        EditBook(e);
    }
    if (e.target.classList.contains("done")) {
        DoneEditing(e);
    }
    if (e.target.classList.contains("cancel")) {
        CancelEdit(e);
    }
});

function DeleteBook(e) {
    let index = e.target.getAttribute("data-index");
    booksList.splice(index, 1);
    DisplayBooksTable();
}

function EditBook(e) {
    let index = e.target.getAttribute("data-index");
    let row = tBody.querySelector(`tr[data-index="${index}"]`);

    let booksDesc = row.querySelectorAll(".bookDesc");
    let inputs = row.querySelectorAll("input");
    let editBtn = row.querySelector(".edit");
    let doneBtn = row.querySelector(".done");
    let cancelBtn = row.querySelector(".cancel");
    let deleteBtn = row.querySelector(".delete")

    booksDesc.forEach(b => b.classList.add("hide"));
    inputs.forEach(input => input.classList.remove("hide"));

    editBtn.classList.add("hide");
    deleteBtn.classList.add("hide");
    doneBtn.classList.remove("hide");
    cancelBtn.classList.remove("hide");
}

function DoneEditing(e) {
    let index = e.target.getAttribute("data-index");
    let row = tBody.querySelector(`tr[data-index="${index}"]`);

    let inputs = row.querySelectorAll("input");
    let booksDesc = row.querySelectorAll(".bookDesc");
    let editBtn = row.querySelector(".edit");
    let doneBtn = row.querySelector(".done");
    let cancelBtn = row.querySelector(".cancel");
    let deleteBtn = row.querySelector(".delete");

    const isbookNameValid = ValidateTBookName(row);
    const isbookPriceValid = ValidateTBookPrice(row);
    const isAuthNameValid = ValidateTAuthorName(row);
    const isAuthMailValid = ValidateTAuthorMail(row);

    if(isbookNameValid && isbookPriceValid && isAuthNameValid && isAuthMailValid){
   
    booksList[index].name = inputs[0].value;
    booksList[index].price = inputs[1].value;
    booksList[index].authorName = inputs[2].value;
    booksList[index].authorMail = inputs[3].value;

    booksDesc.forEach(b => b.classList.remove("hide"));
    inputs.forEach(input => input.classList.add("hide"));

    editBtn.classList.remove("hide");
    deleteBtn.classList.remove("hide");
    doneBtn.classList.add("hide");
    cancelBtn.classList.add("hide");

    DisplayBooksTable();
   
    }


    
}

function CancelEdit(e) {
    let index = e.target.getAttribute("data-index");
    let row = tBody.querySelector(`tr[data-index="${index}"]`);

    let inputs = row.querySelectorAll("input");
    let booksDesc = row.querySelectorAll(".bookDesc");
    let errors = row.querySelectorAll(".table-error")
    let editBtn = row.querySelector(".edit");
    let doneBtn = row.querySelector(".done");
    let cancelBtn = row.querySelector(".cancel");
    let deleteBtn = row.querySelector(".delete");

    booksDesc.forEach(b => b.classList.remove('hide'));
    errors.forEach(e=> e.classList.add("hide"))
    inputs.forEach(input => input.classList.add("hide"));

    editBtn.classList.remove("hide");
    deleteBtn.classList.remove("hide");
    doneBtn.classList.add("hide");
    cancelBtn.classList.add("hide");
}


function ValidateTBookName(row){
    const tBNameInp = row.querySelector("#tBNameInp");
    const tBNameError = row.querySelector("#tBNameError");


    if(tBNameInp.value == ""){
        tBNameError.classList.remove("hide")
        tBNameError.innerText = 'this field is required';
        return false;
    }else if(!booknameRegex.test(tBNameInp.value)){
        tBNameError.classList.remove("hide")
        tBNameError.innerText="Enter a valid book name (not numbers)";
        return false;
    }else{
        tBNameError.classList.add("hide")
        return true
    }
}

function ValidateTBookPrice(row){
    const tBPriceInp = document.querySelector("#tBPriceInp");
    const tBPriceError= document.querySelector("#tBPriceError");


    if(tBPriceInp.value == ""){
        tBPriceError.classList.remove("hide");
        tBPriceError.innerText = 'this field is required';
        return false;
    }else if(!priceRegex.test(tBPriceInp.value)){
        tBPriceError.classList.remove("hide");
        tBPriceError.innerText="Enter a valid price (numbers only)";
        return false;
    }else{
        tBPriceError.classList.add("hide");
        return true
    }
}
function ValidateTAuthorName(row){
    const tBAuthNameInp = document.querySelector("#tBAuthNameInp");
    const tBAuthNameError = document.querySelector("#tBAuthNameError");


    if(tBAuthNameInp.value == ""){
        tBAuthNameError.classList.remove("hide");
        tBAuthNameError.innerText = 'this field is required';
        return false;
    }else if(!AuthNameRegex.test(tBAuthNameInp.value)){
        tBAuthNameError.classList.remove("hide");
        tBAuthNameError.innerText="Enter a valid Author name";
        return false;
    }else{
        tBAuthNameError.classList.add("hide");
        return true
    }
}
function ValidateTAuthorMail(row){
    const tBAuthMailInp = document.querySelector("#tBAuthMailInp");
    const tBAuthMailError = document.querySelector("#tBAuthMailError");

    if(tBAuthMailInp.value == ""){
        tBAuthMailError.classList.remove("hide");
        tBAuthMailError.innerText = 'this field is required';
        return false;
    }else if(!AuthMailRegex.test(tBAuthMailInp.value)){
        tBAuthMailError.classList.remove("hide");
        tBAuthMailError.innerText="Enter a valid email format ex@mail.com";
        return false;
    }else{
        tBAuthMailError.classList.add("hide");
        return true
    }
}


