# Password-Generator

There are so many websites with logins these days it is hard for users to keep coming up with new passwords to ensure the best security. That's why I have created a random password generator! The results are entirely random but they do allow the user to choose how long they want their password to be, as well as what kinds of characters it will contain. By prompting the user for their password criteria the program is able to generate a completely new random password at a click of a button. 

Each generated password is checked before being passed to the user as having all of the elements the user specified. Since it is random, it is possible (although unlikely) the first generated password will be missing one or two or even three types of characters.In this case the program will generate a new password that meets the criteria. Since the minimum length is 8 charcters it is a rare event, much like flipping a coin 8 times and each time it lands on heads. 

In order to ensure true randomness the program utilizes JavaScripts built in Math.random method a great deal in order to ensure there is no correlation between the passwords generated. 

The process was a great learning opportunity for debugging and practicing techniques to help figure out what was going wrong in my program. In the screenshot below I was struggling to figure out why my password generator was returning 'undefined' specifically when an initial generated password was faulty and the method had to be recalled from within itself. I eventually discovered an unexpected rule of calling a function from a statement and how that effects the code flow. It wasn't long before I got it working and learned not only useful information on functions, but how to traverse my code through utilizing the console in order to understand what is going on. 

![Bug Screenshot](./assets/images/bugScreenShot.png)

## Installation

No installation necessary just click the link below to view!

[Click here to go to live link](https://dmanaglia.github.io/Password-Generator/)

## Usage

The password generated is easy to use and intuitive. Any information provided here can also be found on the page if you input anything that is considered invalid. By clicking the button on the bottom of the page labeled "Generate Password" the webpage will initialize a series of prompts:

Prompt #1: 'How many characters would you like your password to have?'

- Your password length cannot be less than 8 characters and it cannot exceed 128 characters.

- You may select cancel here to stop the code from generating a new password in case you are perticularly fond of the previous password generated.

Prompt # 2, 3, 4, 5: 'Do you want your passowrd to contain lower case letters?'

- From here on the webpage asks what kind of characters you would like your password to have.

- Shown in the screenshot below, you have 2 choices for each of the four choices: the "Ok" button implies "Yes" and the "Cancel" button implies "No"

![Prompt Screenshot](./assets/images/promptScreenshot.png)

- At this point you cannot stop the generation of a new password, by pressing cancel you are telling the webpage "No, I would not like that character in my password." You are not actually canceling the process. 

- There are four character types to choose from: lower case letters, upper case letters, numbers, and special characters (i.e. $@^_-> etc.) each has their own prompt that follows the same guidelines. 

- You may select "Ok" for as many character types as you would like, however you need to choose AT LEAST one character type. If you click "Cancel" for all four, the webpage will alert you with this built-in criteria and will automatically restart all four character selection prompts.

Exemplified in the screenshot below, once the 5th prompt is complete you will be given your new random password! You may click the button again and generate as many passwords as you would like! Just be sure to copy any passwords you like becuase once you generate a new password the old one is gone forever!

![Working Screenshot](./assets/images/workingScreenshot.png)


## License

Please refer to the LICENSE in the repo.

