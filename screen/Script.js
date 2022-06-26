const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionaireBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
//async function to fetch data from the api
/**Fetch random user and add money  */
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000),
    };
    addData(newUser);
}
//double money function
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2 }
    })

    updateDOM(); //Upadte dom is called here because we need to update this inside the dom.
}

//filter method for only millionaires
function showMillionaires() {
    data = data.filter((user) => user.money > 100000);
    updateDOM();
}
//Sort by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}


//Adding new object to data array

function addData(obj) {
    data.push(obj);

    updateDOM();
}

//calculating the total wealth
/**
 * We need to give the callback two arguments to provide a mechanism of reduction for the array elements. 
 * We call these accumulator (acc) and element (elem).
 */
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h4>Total Wealth: <strong>${formatMoney(wealth)}</strong></h4>`
    main.appendChild(wealthEl);
}

//update dom

function updateDOM(providedData = data) {
    //clear division
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong> ${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//formating the number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67

}

//Event listener button for adding new user while clicking add new user button.
addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);

showMillionaireBtn.addEventListener('click', showMillionaires);

sortBtn.addEventListener('click', sortByRichest);

calculateWealthBtn.addEventListener('click', calculateWealth);