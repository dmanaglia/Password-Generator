//global variables of type array containing every character for a given criteria
var lowerSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialSet = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

var usrPassword = {
  //user defined length of password, memory space is initialized as empty or null
  length : null,
  //an object that holds information on what kinds of characters the usr wants
  //could have just been an array but I wanted to practice objects and their properties
  customCharSet : {hasLowerCase : false, hasUpperCase : false, hasNums : false, hasSpecial : false},
  //property of the object that holds the generated password until a new one is generated
  password : "",

  //a method that generates the criteria needed to creat a new password
  generateCriteria: function () {
    //first criteria is how long the user wants the password to be
    var validLength = false;
    //resets the password in case the user generates new criteria and new password
    this.length = null;
    //while loop continues until the length is valid
    while(!validLength) {
      var charCount = prompt("How many characters would you like your password to have?");
      //first checks to see if the usr input is even an whole number 
      //skips other checks if the input is a decimal or not a number at all
      //needs to be multiplied by 1 to actucally convert the input string into a int for isInteger check
      if (Number.isInteger(charCount * 1)){
        //if the length is null it means the user selected cancel so the method is stopped
        if(charCount === null) {
          return;
        } else if (charCount < 8) {
          alert("Your password must be at least 8 characters long.");
        } else if (charCount > 128) {
          alert("Your password cannot be more than 128 characters long");
        } else { //only way to get out of the loop is to have length greater than 7 and less than 127
          this.length = charCount;
          validLength = true;
        } 
      } else {
        alert("You should probably enter a whole number 😠");
      }
    }

    //loops until the user has selected a valid set of criteria
    var validCharSet = false;
    while(!validCharSet) {  
      //setting each boolean variable within the customCharSet object to what the user specifies
      this.customCharSet.hasLowerCase = confirm("Do you want your password to contain lower case letters?");
      this.customCharSet.hasUpperCase = confirm("Do you want your password to contain upper case letters?");
      this.customCharSet.hasNums = confirm("Do you want your password to contain numbers?");
      this.customCharSet.hasSpecial = confirm("Do you want your password to contain special characters?");
      //checks to ensure the user has chosen at least one kind of character
      if(this.customCharSet.hasLowerCase || this.customCharSet.hasUpperCase || this.customCharSet.hasNums || this.customCharSet.hasSpecial) {
        //sets valid to true so it will exit the loop after the if statement
        validCharSet = true;
      } else {
        alert("Password must contain at least one criteria");
      }
    }
  },

  //method that will set the password parameter in the usrPassword object
  generatePassword: function() {
    //if the user presses cancel when prompted how long they want their new password to be the code will jump here
    //since no criteria has been defined it exits the method before a new password is generated
    if(this.length === null) {
      //alerts user and exits the method
      alert("Password criteria has not been generated");
      //this keeps the last password generated up on the screen (or the initial empty password) in case the user decides not to make a new one
      return;
    }

    //this local array is only important for generating the password
    //in the for loop below it will generate a random number based on how many character types the user has selected
    //if they only select one Math.random shouldn't keep generating number 1-4 until it lands on the right one
    //this way the password generator is more efficient
    customArray = []
    if(this.customCharSet.hasLowerCase){
      customArray.push("lowerCase");
    }
    if(this.customCharSet.hasUpperCase){
      customArray.push("upperCase");
    }
    if(this.customCharSet.hasNums){
      customArray.push("numbers");
    }
    if(this.customCharSet.hasSpecial){
      customArray.push("special");
    }

    //resets password in case usr is generating a new one, or if the password is faulty and the method restarts
    this.password = "";
    //need to make sure that each password contains at least one character from each of the selected character lists
    var usedLowerCase = false;
    var usedUpperCase = false;
    var usedNumber = false;
    var usedSpecial = false;
    //a loop that has exactly the amound of iterations as the user has specified their desired length of password (will loop 10x for a password length 10 etc.)
    for(var i = 0; i < this.length; i++) {
      //at the start of each iteration a random element from the customArray is selected using the built in js Math methods
      //customArray is the array of strings previously defined that specifies what kind(s) of character the usr wants
      //the charSetSelector can only return values that the user has already specified, will not return "numbers" if user did not want numbers in the password
      var charSetSelector = customArray[Math.floor(Math.random() * customArray.length)];
      if(charSetSelector === "lowerCase"){
        //if the random selection is "lowerCase" than a random element from the lowerSet global variable is selected and added to the end pre-existing password string
        this.password = this.password + lowerSet[Math.floor(Math.random() * lowerSet.length)];
        //if lower case is selected boolean usedLowerCase is changed to true
        usedLowerCase = true;
      } else if(charSetSelector === "upperCase"){
        //does the same process for upperCase, numbers or special IF they are the random selection of that iteration
        this.password = this.password + upperSet[Math.floor(Math.random() * upperSet.length)];
        usedUpperCase = true;
      } else if(charSetSelector === "numbers"){
        this.password = this.password + numSet[Math.floor(Math.random() * numSet.length)];
        usedNumber = true;
      } else {
        this.password = this.password + specialSet[Math.floor(Math.random() * specialSet.length)];
        usedSpecial = true;
      }
    }
    //need to ensure that each type of character the user specified is used at least once
    //since it is totally random it is always possible for one character type to be left out, especially with shorter passwords and if the user selected all 4 options
    //the if statement converts the boolean values of used characters to 0's and 1's and compares the sum to the length of the customArray
    //if the custom array is length 4 the password needs to have used all four character types to pass this check
    if(usedLowerCase + usedUpperCase + usedNumber + usedSpecial < customArray.length) {
      //if there are less character types used in the password than character types specified by user the whole method starts again since it is a fairly unlikely occurance
      this.generatePassword();
    }
  }
}

//function adds the password criteria to the DOM
function writeCriteria () {
  //retrievs the element where the criteria will be listed which is in the HTML file just under the dynamic-h2
  var criteriaElement = document.getElementById("criteria-section");
  //checks to make sure that the element is empty
  //if it isn't that means the user has already generated a password so all the old criteria listed should be deleted
  while (criteriaElement.firstChild) {
    criteriaElement.removeChild(criteriaElement.firstChild);
  }

  //creates a new element <p> 
  var lengthElement = document.createElement("p");
  //creates a Node with the desired text to be displayed on the screen
  var lengthNode = document.createTextNode("Password Length: " + usrPassword.length);
  //adds the Node to the <p> tag element created
  lengthElement.appendChild(lengthNode);
  //adds the new child element to the criteria-section element
  //also adds in a styling to make the text bolder
  criteriaElement.appendChild(lengthElement).style.fontWeight = "Bolder";

  //loops though the customCharSet object in the usrPassword object
  for (var property in usrPassword.customCharSet) {
    //same process as the length above but done for each property of the customCharSet object
    var para = document.createElement("p");
    //initializes variable node so it can be used after the if statement
    var node = null;
    //adds the proper text discription based one which property in the customCharSet object the loop is on
    //when looping through an object this is the syntax for the name of the property, in my case hasLowerCase, hasUpperCase etc. 
    if (`${property}` === "hasLowerCase") {
      //at the end of these lines is the syntax for the value stored in a given property when looping through an object
      node = document.createTextNode("Password Contains Lower Case Letters: " + `${usrPassword.customCharSet[property]}`);
    } else if (`${property}` === "hasUpperCase") {
      node = document.createTextNode("Password Contains Upper Case Letters: " + `${usrPassword.customCharSet[property]}`);
    } else if (`${property}` === "hasNums") {
      node = document.createTextNode("Password Contains Numeric Characters: " + `${usrPassword.customCharSet[property]}`);
    } else {
      node = document.createTextNode("Password Contains Special Characters: " + `${usrPassword.customCharSet[property]}`);
    }
    //adds the proper text node to the paragraph element created beforehand
    para.appendChild(node);
    //lastly it checks if the value of the the objects property is true or false, changing the text color of the entire <p> tag element to green if true and red if false
    //in this syntax the value is converted to a string so it checks if it is equal to true as a string
    if (`${usrPassword.customCharSet[property]}` === "true") {
      criteriaElement.appendChild(para).style.color = "Green";
    } else {
      criteriaElement.appendChild(para).style.color = "Red";
    }
  }
}

// function calls upon the object usrPassword to generate password criteria and password string to then input in the html password id <textarea>
function writePassword() {
  //calls usrPassword methods
  usrPassword.generateCriteria();
  //password is stored in the object
  usrPassword.generatePassword();
  //creates an variable holding the html element <textarea> so the text can be changed to the generated password
  var passwordText = document.querySelector("#password");
  //checks if a password has actually been generated
  //if the user clicks cancel before they input a number for the length this entire function will run
  //html wont be changed if there isn't valid information to pass to it
  if (usrPassword.length !== null){
    //changes the smaller header on the page to read "Generated Password:"" once the password is generated
    document.getElementById("dynamic-h2").innerHTML = "Generated Password:";
    //calls the function defined above
    writeCriteria();
  }
  // sets the value of the html element <textarea> to the usrPassword object's value of password
  passwordText.value = usrPassword.password;
}

//creates variable holding the html <button> element
var generateBtn = document.querySelector("#generate");

// Adds event listener to generate a dynamic button
generateBtn.addEventListener("click", writePassword);

