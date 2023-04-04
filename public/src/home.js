function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
 return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksCheckedOut = books.filter(book => book.borrows.filter(record => record.returned === false).length > 0);
  return booksCheckedOut.length;
}

//returns the most common occurring genres, ordered from most common to least
function getMostCommonGenres(books) {
  let map = {};
  books.forEach(num => {
    if (map[num.genre]) {
    map[num.genre]++;
    }else {
      map[num.genre] = 1;
    }
    });
//each object in the returned array has two keys:
    return Object.entries(map).map(([name,count]) => {
      return{
        name, 
        count
      }
//slice to make sure only 5 items are logged even if there is a tie
    }).sort((a,b)=> b.count - a.count). slice(0,5)
  }

//returns an array containing five objects or fewer that represents the most popular books in the library.  
  function getMostPopularBooks(books) {
   let popularBooks = [];
//loops through 'books'; creates new objects with 'name' and 'count' keys, and pushes them onto 'popularBooks' array.
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);
  return topFive(popularBooks);
}
// function that sorts popularBooks array & returns the top 5 using slice
function topFive(array) {
  let popularBooks = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);
  return popularBooks;
}

/*returns an array containing five objects or fewer that represents the most 
popular authors whose books have been checked out the most*/
function getMostPopularAuthors(books, authors) {
  let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  //loops through books to return borrow counts
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 //return array of top five authors 
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
} 


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
