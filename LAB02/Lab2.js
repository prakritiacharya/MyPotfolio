var prompt =  require('prompt');

// start the prompt
prompt.start();

    //prompt the user for a value , prompt callback
    console.log("Please choose one of the following: ROCK, PAPER, or SCISSORS");

    // first parameter is an array of values we want

    //second parameter is a callback function that will be called when the user finishes entering values
    prompt.get(['choice'], function (error,result) {
        //take the value from the result object by name 

        //name must match the one given in the array
        let userChoice = result.choice.toUpperCase(); // to avoid case issues

        ////do sth with the value
        console.log('You entered:' +userChoice);
        
        //for RPS here you will generate computer selection, compare choices and output the result
 
        // generate computer selection using Math.random()
        let computerChoice;
        let randomNumber = Math.random();

         if (randomNumber <= 0.34) {
            computerChoice = 'PAPER';
         } else if (randomNumber <= 0.67) {
            computerChoice = 'SCISSORS';
        } else {
            computerChoice = 'ROCK';
        }

        console.log('Computer chose: ' + computerChoice);
        // compare userChoice and computerChoice
        if (userChoice === computerChoice) {
        console.log("It's a tie");
        } else if (
            (userChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
            (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
            (userChoice === 'SCISSORS' && computerChoice === 'PAPER')
        ) {
            console.log("User Wins");
        } else {
            console.log("Computer Wins");
        }
});


