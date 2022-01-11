var bookList = document.getElementById('books');
let books = [
    {
        name:'The Alchemist',
        author: 'Paulo Coelho'
    },
    {
        name:'Learning to silences the mind',
        author:'Osho'
    },
    {
        name:'Their eyes were watching God',
        author:'Zora Neale Hurston'
    },
    {   name:'Adultery',
        author:'Paolo Coelho'
    },
    {   name:'BlackAss',
        author:'Igoni Barrett'
    },
    {   name:'The Rule of Four',
        author:'Ian Caldwell & Dustin Thomason'
    },
    {   name:'The Five Love Languages',
        author:'Gary Chapman'
    }, 
    {   name:'To my childrens children',
        author:'Sindiwe Magona'
    },
];
  
countBooks = data => {
  var count = document.getElementById('counter');

  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' books';
  } else {
    count.innerHTML = 'No book';
    document.getElementById('name').style.display = 'none';
  }
};
// Read: GET
getBooks = () => {
  var data = '';
  if (books.length > 0) {
    for (i = 0; i < books.length; i++) {
      data += '<tr>';
      data += '<td>' + books[i].name + '</td>';
      data += '<td>' + books[i].author + '</td>';
      data += '<td><button onclick="editBook(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteBook(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
  }

  countBooks(books.length);
  return bookList.innerHTML = data;
};
// Create: POST
addBook = () => {
  var bookAdded = document.getElementById('add-name');
  var authorAdded = document.getElementById('add-author');
  // Get the vbookalue
  var bookDetails = {
      name: bookAdded.value.trim(),
      author: authorAdded.value.trim()
    }

  if (bookDetails) {
    // addCountry the new value
    books.push(bookDetails);
    // Reset input value
    bookAdded.value = '';
    // Dislay the new list
    getBooks();
  }
};
// Update: PUT
editBook= item => {
  var editBook = document.getElementById('edit-name');
  var editAuthor = document.getElementById('edit-author');
  // Display value in the field
  editBook.value = books[item].name;
  editAuthor.value = books[item].author;
  // Display fields
  document.getElementById('editForm').style.display = 'block';

  document.getElementById('saveEdit').onsubmit = () => {
    // Get value
    var bookDetails = {
        name: editBook.value,
        author: editAuthor.value
    };

    if (bookDetails) {
      // editCountry value
      books.splice(item, 1, bookDetails);
      // Display the new list
      getBooks();
      // Hide fields
      closeInput();
    }
  }
};
// Delete: Delete
deleteBook = item => {
  // deleteCountry the current row
  books.splice(item, 1);
  // Display the new list
  getBooks();
};

// Search: Country Search
searchbar = () => {
    var searchedBook = document.getElementById('seek').value.trim();
    try {
      if (!searchedBook) {
        throw new Error('Nothing was entered in the search bar');
      }
      // Filter all the books in the array with value typed into the input field
      let booksFound = books.filter(book => book.name.toLowerCase().includes(searchedBook.toLowerCase()));
      if(booksFound.length === 0) {
        throw new Error('No books were found');
      }
      books = booksFound;
      getBooks();
    } catch (err) {
      alert(err.message);
    }
  };

getBooks();

closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}