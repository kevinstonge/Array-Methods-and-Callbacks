import { fifaData } from './fifa.js';
// console.log(fifaData);

// console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
function getMatch(dataArray,matchObject) {
    let matchKeys = Object.keys(matchObject);
    let matchedObjects = [];
    dataArray.forEach(dataObject=>{
        let matchCount = matchKeys.length;
        matchKeys.forEach(matchKey=>{
            if (dataObject[matchKey] !== undefined && dataObject[matchKey] == matchObject[matchKey]) {
                matchCount--;
            };
        })
        if (matchCount == 0) {
            matchedObjects.push(dataObject);
        }
    });
    return matchedObjects;
}
console.log(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]["Home Team Name"]);
console.log(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]["Away Team Name"]);
console.log(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]["Home Team Goals"]);
console.log(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]["Away Team Goals"]);
console.log(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]);

function getWinner(gameObject) {
    if (gameObject["Home Team Goals"] > gameObject["Away Team Goals"]) {
        return gameObject["Home Team Initials"];
    }
    else { return gameObject["Away Team Initials"]}
}
//winner of 2014 final:
console.log(getWinner(getMatch(fifaData,{"Year":2014,"Stage":"Final"})[0]));

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    return data.filter(e=>e["Stage"] == "Final");

};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data,callback) {

    return callback(data).map(e=>e["Year"]);

};

console.log(getYears(fifaData,getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(data,callback) {

    return callback(data).map(e=>getWinner(e));

};

console.log(getWinners(fifaData,getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data) {
    let winnersArray = [];
    getFinals(data).forEach(e=>{
        winnersArray.push(`In ${e["Year"]}, ${getWinners([e],getFinals)} won the world cup!`);
    });
    return winnersArray;
};

console.log(getWinnersByYear(fifaData,getWinners,getYears));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    return(
        { 
            "average home team goals": 
            (data.map(e=>e["Home Team Goals"]).reduce((acc,cur)=>acc+=cur,0)/data.length),

            "average away team goals":
            (data.map(e=>e["Away Team Goals"]).reduce((acc,cur)=>acc+=cur,0)/data.length)
        }

    );

};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data,teamInitials) {

    let winCount = getFinals(data).reduce((acc,cur)=>{
        if (getWinner(cur)==teamInitials) { 
            acc++;
        }
        return acc;
    },0);

    return `${teamInitials} has won ${winCount} final game(s)`;
};

console.log(getCountryWins(fifaData,"FRA"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
    //highest average goals per appearance in finals
    //map? initials:goals -> ??
    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
