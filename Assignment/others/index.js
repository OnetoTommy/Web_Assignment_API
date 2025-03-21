const a = 'Northeastern University'

fetch(`http://universities.hipolabs.com/search?name=${a}`)
  .then((response) => response.json())
  .then(data => {
    console.log(data);
  })

  .catch(error => console.error(error))