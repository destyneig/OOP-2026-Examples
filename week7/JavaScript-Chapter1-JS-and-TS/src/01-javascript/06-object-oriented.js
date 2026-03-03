// ES2015 Class Syntax
class Book {
  constructor(title, pages, isbn) {
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
  }
  printIsbn() {
    console.log(this.isbn);
  }
}

let book = new Book('Title', '300', '12345');
book.printIsbn();