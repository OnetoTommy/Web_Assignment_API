const signUpForm = document.getElementById("signup");
const signInForm = document.getElementById("signin");
const signInButton = document.getElementById("signInButton");  // 确保ID正确
const signUpButton = document.getElementById("signUpButton");  // 确保ID正确

signUpButton.addEventListener('click', () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

signInButton.addEventListener('click', () => {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});
