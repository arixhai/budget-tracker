console.log("Budget tracker is running");
// Get elements from the HTML file
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
let balance = 0;
let totalIncome = 0;
let totalExpenses = 0;

//Create array for transactions
let transactions = [];

// Create an event listener for form submition
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the page from reloading 

    // Get input from fields
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Create transaction object
    const transaction = {description, amount};
    transactions.push(transaction); // Add the transaction to the array

    console.log(transactions);

    // Clear the form
    form.reset();

    // Update the transaction list
    displayTransactions();

    // Calculate balance
    calcBalance(amount);
});

// Function to put the transactions to the list
function displayTransactions() {

    // Clear the current list 
    transactionList.innerHTML= '';

    // Loop through transactions and create list items
    transactions.forEach((transaction, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
            transactionList.appendChild(listItem);
    })
};

// Function that calculates total balance
function calcBalance(amount) {

    // Check if the amount is negative or positive
    if (amount >= 0) {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    balance = totalIncome + totalExpenses;

    document.getElementById('balance').innerHTML = balance;
    document.getElementById('income').innerHTML = totalIncome;
    document.getElementById('expenses').innerHTML = totalExpenses;
    console.log("your balance is " + balance);
}