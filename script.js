
const bookData = {
  id1: {
    item1: {
      name: 'The Great Adventure',
      author: 'Alice Johnson',
      editorial: 'Penguin Random House',
      edition: '1st Edition',
      number_of_pages: 200,
      topics: 'Fantasy, Business'
    }
  },
  id2: {
    item2: {
      name: 'Journey to the Unknown',
      author: 'Bob Smith',
      editorial: 'HarperCollins',
      edition: '2nd Edition',
      number_of_pages: 300,
      topics: 'Adventure, Mystery'
    }
  },
  id3: {
    item3: {
      name: 'Code Breakers',
      author: 'Charlie Davis',
      editorial: 'Macmillan',
      edition: 'Revised Edition',
      number_of_pages: 450,
      topics: 'Technology, Programming'
    }
  },
  id4: {
    item4: {
      name: 'The Silent Ocean',
      author: 'David Harris',
      editorial: 'Simon & Schuster',
      edition: '1st Edition',
      number_of_pages: 350,
      topics: 'Non-fiction, Science'
    }
  },
  id5: {
    item5: {
      name: 'Mastering Algorithms',
      author: 'Eve Walker',
      editorial: 'Wiley',
      edition: '3rd Edition',
      number_of_pages: 400,
      topics: 'Science, Engineering'
    }
  },
  id6: {
    item6: {
      name: 'The Last Empire',
      author: 'Frank Green',
      editorial: 'Oxford University Press',
      edition: '2nd Edition',
      number_of_pages: 520,
      topics: 'History, Empire'
    }
  },
  id7: {
    item7: {
      name: 'The Secret Lab',
      author: 'Grace Adams',
      editorial: 'Pearson',
      edition: 'Special Edition',
      number_of_pages: 240,
      topics: 'Science Fiction, Mystery'
    }
  },
  id8: {
    item8: {
      name: 'Algorithm Design',
      author: 'Hank Nelson',
      editorial: 'Prentice Hall',
      edition: '4th Edition',
      number_of_pages: 650,
      topics: 'Computer Science, Algorithms'
    }
  },
  id9: {
    item9: {
      name: 'Fictional Worlds',
      author: 'Ivy Moore',
      editorial: 'Cambridge University Press',
      edition: 'Revised Edition',
      number_of_pages: 300,
      topics: 'Fantasy, Fiction'
    }
  },
  id10: {
    item10: {
      name: 'Learning Python',
      author: 'Jackie Lee',
      editorial: 'O\'Reilly Media',
      edition: '1st Edition',
      number_of_pages: 550,
      topics: 'Programming, Python'
    }
  }
};


function sendData(data) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from server:', data);
      return bookData; 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
  const booksList = document.getElementById('book_list');
  if (!booksList) return;

  let books = JSON.parse(localStorage.getItem('books'));
  if (!books || books.length === 0) {
    books = Object.values(bookData).map(obj => Object.values(obj)[0]);
    localStorage.setItem('books', JSON.stringify(books));
  }

  booksList.innerHTML = ''; 
  books.forEach((book, index) => {
    const listItem = document.createElement('li');

    const bookLink = document.createElement('a');
    bookLink.href = `book-details.html?id=${index}`;
    bookLink.textContent = book.name;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      window.location.href = `edit-book.html?id=${index}`;
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = () => deleteBook(index);

    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    listItem.appendChild(bookLink);
    listItem.appendChild(actionDiv);
    booksList.appendChild(listItem);
  });
});


function deleteBook(index) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
  location.reload(); 
}


if (document.getElementById('book-detail')) {
  const bookId = getQueryParam('id');
  sendData(bookData)
    .then(data => {
      const book = data[`id${bookId.slice(-1)}`]?.[`item${bookId.slice(-1)}`];
      const bookDetailDiv = document.getElementById('book-detail');

      if (book) {
        bookDetailDiv.innerHTML = `
          <h2>${book.name}</h2>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Editorial:</strong> ${book.editorial}</p>
          <p><strong>Edition:</strong> ${book.edition}</p>
          <p><strong>Number of Pages:</strong> ${book.number_of_pages}</p>
          <p><strong>Topics:</strong> ${book.topics}</p>
        `;
      } else {
        bookDetailDiv.innerHTML = "<p>Book not found.</p>";
      }
    })
    .catch(err => {
      document.getElementById('book-detail').innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

if (document.getElementById('create-book-form')) {
  document.getElementById('create-book-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const editorial = document.getElementById('editorial').value.trim();
    const edition = document.getElementById('edition').value.trim();
    const number_of_pages = parseInt(document.getElementById('number_of_pages').value.trim());
    const topics = document.getElementById('topics').value.trim();

    if (name.length < 3 || isNaN(number_of_pages) || number_of_pages <= 0) {
      alert("Please enter valid name and number of pages.");
      return;
    }

    const newBook = {
      name,
      author,
      editorial,
      edition,
      number_of_pages,
      topics
    };

    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
    existingBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(existingBooks));

    window.location.href = "index.html";
  });
}


if (document.getElementById('edit-book-form')) {
  const id = getQueryParam('id');
  const book = bookData[`id${id.slice(-1)}`]?.[`item${id.slice(-1)}`];

  if (book) {
    document.getElementById('name').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('editorial').value = book.editorial;
    document.getElementById('edition').value = book.edition;
    document.getElementById('number_of_pages').value = book.number_of_pages;
    document.getElementById('topics').value = book.topics;
  }

  document.getElementById('edit-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Book with id ${id} updated! (mock)`);
    window.location.href = 'index.html';
  });
}
