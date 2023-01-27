var lowerSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialSet = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

var usrPassword = {
  length : null,
  customCharSet : [],
  password : "",

  generateCriteria: function () {
    var validLength = false;
    this.length = null;
    while(!validLength) {
      var charCount = prompt("How many characters would you like your password to have?");
        if(charCount === null) {
          return;
        } else if (charCount < 8) {
          alert("Your password must be at least 8 characters long.");
        } else if (charCount > 128) {
          alert("Your password cannot be more than 128 characters long");
        } else {
          this.length = charCount;
          validLength = true;
        }
    }

    this.customCharSet = [];
    var validCharSet = false;
    while(!validCharSet) {  
      var containLowerCase = confirm("Do you want your passowrd to contain lower case letters?");
      var containUpperCase = confirm("Do you want your passowrd to contain upper case letters?");
      var containNums = confirm("Do you want your password to contain Numbers?");
      var containSpecial = confirm("Do you want your password to contain special characters?");

      if(containLowerCase || containUpperCase || containNums || containSpecial) {
        validCharSet = true;
        if (containLowerCase) {
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
      } else {
        alert("Password must contain at least one criteria");
      }
    }
  },

  generatePassword: function() {
    //if the user presses cancel when prompted how long they want their new password to be. exits the method before a new password is generated
    if(this.length === null) {
      alert("Password criteria has not been generated");
      //returns last generated password if the user initially presses cancel in case they decide they want to view it more
      //will return an empty string if they havent already generated a password
      return this.password;
    }

    this.password = "";
    var usedLowerCase = false;
    var usedUpperCase = false;
    var usedNumber = false;
    var usedSpecial = false;
    for(var i = 0; i < this.length; i++) {
      var charSetSelector = this.customCharSet[Math.floor(Math.random() * this.customCharSet.length)];
      if(charSetSelector === "lowerCase"){
        this.password = this.password + lowerSet[Math.floor(Math.random() * lowerSet.length)];
        usedLowerCase = true;
      } else if(charSetSelector === "upperCase"){
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
    console.log("Different chars used: " + (usedLowerCase + usedUpperCase + usedNumber + usedSpecial));
    console.log("Different chars needed: " + (this.customCharSet.length));

    if(usedLowerCase + usedUpperCase + usedNumber + usedSpecial < this.customCharSet.length) {
      console.log("Faulty Password: " + this.password);
      this.generatePassword();
      return this.password;
    } else {
      console.log("Returning Password....     " + this.password);
      return this.password;
    }
  }
}

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  usrPassword.generateCriteria();
  var password = usrPassword.generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);