//global variables of type array containing every character for a given criteria
var lowerSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialSet = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

var usrPassword = {
  //user defined length of password, memory space is initialized as empty or null
  length : null,
  //user defined list of what types of character to include in the password
  customCharSet : [],
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
    }

    //resets customCharSet in case the user generates new criteria and new password
    this.customCharSet = [];
    //loops until the user has selected a valid set of criteria
    var validCharSet = false;
    while(!validCharSet) {  
      var containLowerCase = confirm("Do you want your passowrd to contain lower case letters?");
      var containUpperCase = confirm("Do you want your passowrd to contain upper case letters?");
      var containNums = confirm("Do you want your password to contain Numbers?");
      var containSpecial = confirm("Do you want your password to contain special characters?");
      //checks to ensure the user has chosen at least one kind of character
      if(containLowerCase || containUpperCase || containNums || containSpecial) {
        //sets valid to true so it will exit the loop after the if statement
        validCharSet = true;
        //need to know which characters user wants to use
        //best stored in an array because of how its used later
        if (containLowerCase) {
          //array will just contain strings since we need to know exactly which characters the user wants
          //if we just put the booleans above there would be no way to differentiate what the user wants
          this.customCharSet.push("lowerCase");
        }
        if (containUpperCase) {
          this.customCharSet.push("upperCase");
        }
        if (containNums){
          this.customCharSet.push("numbers");
        }
        if (containSpecial) {
          this.customCharSet.push("special");
        }
      } else { //prints error message and restarts the loop for user to input at least one criteria
        alert("Password must contain at least one criteria");
      }
    }
  },

  generatePassword: function() {
    //if the user presses cancel when prompted how long they want their new password to be the code will jump here
    //since no criteria has been defined we exit the method before a new password is generated
    if(this.length === null) {
      //alerts user and exits the method
      alert("Password criteria has not been generated");
      //this keeps the last password generated up on the screen (or the initial empty password) in case the user decides not to make a new one
      return;
    }

    //resets password in case usr is generating a new one, or if the password is faulty and the method restarts
    this.password = "";
    //we want to make sure that each password contains at least one character from each of the selected character lists
    var usedLowerCase = false;
    var usedUpperCase = false;
    var usedNumber = false;
    var usedSpecial = false;
    //a loop that has exactly the amound of iterations as the user has specified their desired length of password (will loop 10x for a password length 10 etc.)
    for(var i = 0; i < this.length; i++) {
      //at the start of each iteration a random element from the customCharSet is selected using built in js Math methods
      //customCharSet is the array of strings previously defined that specifies what kind(s) of character the usr wants
      //the charSetSelector can only return values that the user has already specified, will not return "numbers" if user did not want numbers in the password
      var charSetSelector = this.customCharSet[Math.floor(Math.random() * this.customCharSet.length)];
      if(charSetSelector === "lowerCase"){
        //if the random selection is "lowerCase" than a random element from the lowerSet global variable is selected and added to the end pre-existing password
        this.password = this.password + lowerSet[Math.floor(Math.random() * lowerSet.length)];
        //if lower case is selected we change the boolean usedLowerCase to true
        usedLowerCase = true;
      } else if(charSetSelector === "upperCase"){
        //does the same process for upperCase, numbers and special IF they are the random selection of that iteration
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
    //we need to ensure that each type of character the user specified is used at least once
    //since it is totally random it is always possible for one character type to be left out, especially with shorter passwords and if the user selected all 4 options
    //the if statement converts the boolean values of used characters to 0's and 1's and compares them to the length of the customCharSet
    //if the custom array is length 4 we need to use all four character types. If it is length 3 we only need 3 different chacter types and so on.
    if(usedLowerCase + usedUpperCase + usedNumber + usedSpecial < this.customCharSet.length) {
      //if there are less character types used in the password than character types specified by user we can just restart the whole method again since it is a fairly unlikely occurance
      this.generatePassword();
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
  //changes the smaller header on the page to read Generated Password: once the password is generated
  document.getElementById("dynamic-h2").innerHTML = "Generated Password:";
  // sets the value of the html element <textarea> to the usrPassword object's value of password
  passwordText.value = usrPassword.password;
}

//creates variable holding the html <button> element
var generateBtn = document.querySelector("#generate");

// Adds event listener to generate a dynamic button
generateBtn.addEventListener("click", writePassword);