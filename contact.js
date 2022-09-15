// This JS file will replace the preset text in each 
// inputtable area on the contact form 

// set a inputs constant for all user inputs 
const inputs = document.querySelectorAll(".input");


// if a user enters a value into any of the 
// elements of the contact form, 
// replace the preset text with the input
function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

// if there is no value or the user deletes 
// their input, reset the text box to the preset text
function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

// for each input the user gives, 
// add a focus and blur event for each function 
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});