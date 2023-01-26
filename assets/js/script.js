var lowerSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialSet = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}", "|", ":", ";", "'", ",", "<", ">", ".", "/", "?"];


var usrPassword = {
  length : null,
  customCharSet: [],

  generateCriteria: function () {
    var validLength = false;
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
    // this should never happen since the validation in usrPassword.generateCriteria already checks for null
    // only way this could occur is if the code is changed and the code generates the password before the criteria
    if(this.length === null) {
      alert("Password criteria has not been generated");
      // this.generateCriteria();
    }
    var newPassword = "";
    for(var i = 0; i < this.length; i++) {
      newPassword = newPassword + getRandomChar(this.customCharSet);
    }
    return newPassword;
  }
}


function getRandomChar(customArray) {
  var charSetSelector = customArray[Math.floor(Math.random() * customArray.length)];
  if(charSetSelector === "lowerCase"){
    return lowerSet[Math.floor(Math.random() * lowerSet.length)];
  } else if(charSetSelector === "upperCase"){
    return upperSet[Math.floor(Math.random() * upperSet.length)];
  } else if(charSetSelector === "numbers"){
    return numSet[Math.floor(Math.random() * numSet.length)];
  } else {
    return specialSet[Math.floor(Math.random() * specialSet.length)];
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
