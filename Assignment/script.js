// fetch("https://dog.ceo/api/breeds/image/random")
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// fetchData();

async function fetchData() {
  try {
    const zipcode = document.getElementById('zipcode').value.toLowerCase();

    // Check if the zipcode is valid before making the request
    if (zipcode.length !== 5) {
      throw new Error("Invalid Zipcode");
    }

    // Construct the correct URL using the user input
    const response = await fetch(`http://api.zippopotam.us/us/${zipcode}`);

    if (!response.ok) {
      throw new Error("Could not fetch resources");
    }

    const data = await response.json();
    
    // Extract place name and state
    const placeName = data.places[0]["place name"];
    const state = data.places[0]["state"];

    // Fill the form fields with the data
    document.getElementsByClassName('place_name')[0].value = placeName;
    document.getElementsByClassName('state')[0].value = state;
  }
  catch (error) {
    console.error(error);
    // If there's an error, clear the fields
    document.getElementsByClassName('place_name')[0].value = '';
    document.getElementsByClassName('state')[0].value = '';
  }
}

async function fetchDate() {
  try{  
    const response = await fetch('http://worldtimeapi.org/api/ip')
    console.log(response);
    if(!response.ok){
      throw new Error("Could not fetch resources");
    }
    const data = await response.json();
    // console.log('Current date and time:', data)
    const date = data.datetime.split('T')[0];  // Get the date in YYYY-MM-DD format
    // console.log(date);
    // Set the date to the input field with ID "date"
    document.getElementById("date").value = date;

  }catch(error){
    console.error(error)
    document.getElementById('date')[0].value = '';
  }
}
fetchDate();

function handleclicker(){
  // Prevents form submission if validation fails
  let is_Date = true;
  let is_Name = true;
  let is_Zip = true;
  let is_Password = true;
  let isValid = true;
  // Year of Birth
  // const cur_Year = new Date().getFullYear();
  // const date_Input = document.getElementById('birth');
  // date_Input.setAttribute("min", `${min_Date}`);
  // date_Input.setAttribute("max",`${max_Date}`);
  // // Validate Selected
  // date_Input.addEventListener("change", () =>{
  //   const select_Date =  new Date(date_Input.value);
  //   const error_Span = document.getElementById("birthError");
  //   if (select_Date < min_Date || select_Date > max_Date){
  //     error_Span.innerHTML = `Date must be between 1990 and ${cur_Year-1}.`;
  //     isValid = false;  
  //   }else{
  //     error_Span.innerHTML = "";
  //   }
  // }
  // )

    // Year of Birth Validation
    const cur_Year = new Date().getFullYear();
    const min_Date = new Date("1900-01-01");
    const max_Date = new Date(`${cur_Year - 1}-12-31`);
    const date_Input = document.getElementById('birth');

    // Ensure min/max attributes are correctly set
    date_Input.setAttribute("min", min_Date.toISOString().split("T")[0]);
    date_Input.setAttribute("max", max_Date.toISOString().split("T")[0]);

    // Validate Selected Date
    const select_Date = new Date(date_Input.value);
    const error_Span = document.getElementById("birthError");

    if (select_Date < min_Date || select_Date > max_Date || isNaN(select_Date.getTime())) {
        error_Span.innerHTML = `Date must be between 1900 and ${cur_Year - 1}.`;
        is_Date = false;  
    } else {
        error_Span.innerHTML = "";
    }

  // Section_Name
  const name_Type = document.getElementById('name').value.trim();
  const error_Name = document.getElementById("nameError");
  if (name_Type.length < 3){
    error_Name.innerHTML = "Name must be at least 3 characters."
    is_Name = false;
  }else{
    error_Name.innerHTML = "";
  }

  // Section_Zipcode
  const is_live = document.getElementById("live");
  const zip_digits = document.getElementById('zipcode').value.trim();
  const zipError = document.getElementById("zipError");
  if(is_live.checked){
    if (!/^\d{5}$/.test(zip_digits)) {
      zipError.innerText = "Zipcode must be exactly 5 digits.";
      isValid = false;
    } else if(zip_digits === "00000"){
      zipError.innerText = "No Exist";
      isValid = false;
    }else {
      zipError.innerText = ""; 
      is_Zip = true
    }
  }else{
    isValid = true
  }
  
// Section_Password
  const password = get_Element("password").value.trim();
  const passwordError = get_Element("passwordError");
  if(password.length < 8){
    passwordError.innerHTML = "Password must be at least 8 characters."
    is_Password = false;
  }
  if(is_Date & is_Name & is_Zip & is_Password){
    alert("Accecpted!")
  }
}

function is_live(){
  const is_live = document.getElementById("live");
  
  // Select all elements with class 'zip_code1', 'zip_code2', 'zip_code3'
  const zipFields = document.querySelectorAll('.zip_code1, .zip_code2, .zip_code3');

  // Loop through each field and toggle display
  zipFields.forEach((field) => {
    if (is_live.checked) {
      field.style.display = "block";  // Correct case for "block"
    } else {
      field.style.display = "none";  // Correct case for "none"
    }
  });
}

// Common Function
const get_Element = (temp) => document.getElementById(temp);