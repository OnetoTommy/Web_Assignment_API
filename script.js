// Function to send data via POST
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
      return data; // Return the data received from the server
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Original JSON (bookData)
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

// Get the books list once the data is fetched
sendData(bookData)
  .then((data) => {
    const booksList = document.getElementById('book_list');

    // Iterate through each book and create a clickable link
    Object.keys(data).forEach((id) => {
      const book = data[id];
      const listItem = document.createElement('li');

      // Create a clickable link for the book
      const bookLink = document.createElement('a');
      bookLink.href = `book-details.html?id=${id}`; // Passing book id as query parameter
      bookLink.textContent = book[`item${id.slice(-1)}`].name;

      listItem.appendChild(bookLink);
      booksList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });


  // Function to get the query parameter by name (e.g., 'id')
 function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the 'id' parameter from the URL
const bookId = getQueryParam('id');

// Fetch the book data (This could be from a local source or API)
sendData(bookData)
.then(data => {
  // Get the book details using the id passed in the URL
  const book = data[`id${bookId.slice(-1)}`]?.[`item${bookId.slice(-1)}`];

  if (book) {
      // If book is found, display details
      const bookDetailDiv = document.getElementById('book-detail');
      bookDetailDiv.innerHTML = `
          <h2>${book.name}</h2>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Editorial:</strong> ${book.editorial}</p>
          <p><strong>Edition:</strong> ${book.edition}</p>
          <p><strong>Number of Pages:</strong> ${book.number_of_pages}</p>
          <p><strong>Topics:</strong> ${book.topics}</p>
      `;
  } else {
      document.getElementById('book-detail').innerHTML = "<p>Book not found.</p>";
  }
})
.catch(err => {
  document.getElementById('book-detail').innerHTML = `<p>Error: ${err.message}</p>`;
});


function handleclicker(event){
  const name = document.getElementById('name').value.trim();
  let isValid = true; 
  
  // Check name length
  if (name.length < 3){
    alert("Name must be at least 3 characters.");
    isValid = false;
  }

  // Prevent form submission if validation fails
  if (!isValid) {
    event.preventDefault(); // Prevent form from submitting
  }
}
// Add event listener to form
document.getElementById('create-book-form').addEventListener('submit', handleclicker);

