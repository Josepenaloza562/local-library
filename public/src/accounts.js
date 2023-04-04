function findAccountById(accounts, id) {
//returns the account object that has the matching ID
  let found = accounts.find((accounts) => accounts.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
accounts.sort((accountsA, accountsB) => (accountsA.name.last > accountsB.name.last ? 1 : -1));
return accounts;
}

function getTotalNumberOfBorrows(account, books) {
//which account is borrowing
  const accId = account.id;
//log a total amount of borrows per account id
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => accId === borrow.id && total++));
  return total;
}


function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
    let borrowMatch = [];
  //used forEach method instead of for loop
  //"item" is the element in the forEach
  books.forEach((item) => {
const borrowed = item.borrows;
  const book = {
   id: item.id,
   title: item.title,
   genre: item.genre,
   authorId: item.authorId,
   author: {},
   borrows: {}
  };
  borrowed.forEach((borrow) => {
   if (borrow.id === account.id && borrow.returned === false) {
    result.push(book);
    borrowMatch.push(borrow);
    book.borrows = borrowMatch;
    book.author = authors.filter((auth) => auth.id === book.authorId)[0];
   }
  });
 });
 return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
