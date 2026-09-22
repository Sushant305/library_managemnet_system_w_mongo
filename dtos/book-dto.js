// data transfer object

class issuedBook{
    _id;
    name;
    author;
    gener;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.issuedBook.id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.gener = user.issuedBook.gener;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.publisher;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}