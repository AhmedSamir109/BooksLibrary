import { Author } from "./author.js";

export class Book{
    constructor(name , price , authorName , authorMail){
        this.name = name;
        this.price = price;
        this.author = new Author(authorName , authorMail) 
    }
}
