document.addEventListener('DOMContentLoaded', function() {

console.log("Budget tracker is running");
// Get elements from the HTML file
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
let balance = 0;
let totalIncome = 0;
let totalExpenses = 0;

//Create array for transactions
let transactions = [];
let currentEdittingIndex = -1; 

// Create an event listener for form submition
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the page from reloading 
    
    // Get input from fields
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Create transaction object
    const transaction = {description, amount};

    if (currentEdittingIndex >= 0){
        transactions[currentEdittingIndex] = transaction;
        currentEdittingIndex = -1;
    } else {
        transactions.push(transaction); // Add the transaction to the array
    }
   
    console.log(transactions);

    // Save to localStorage
    saveTransactionsToLocalStorage()

    // Clear the form
    form.reset();

    totalIncome = 0; // Reinitialize totals
    totalExpenses = 0;
    transactions.forEach(transaction => calcBalance(transaction.amount)); // Calculate after every submition

    // Update the transaction list
    displayTransactions();
});

// Function to edit transaction
function editTransaction(index) {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    const transaction = transactions[index];

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;

    currentEdittingIndex = index;   
}

// Function to delete transaction
function deleteTransaction(index){
    // Remove transaction from array
    transactions.splice(index, 1);
    console.log(transactions);

    // Save changes to localStorage and update UI
    saveTransactionsToLocalStorage();
   
    // Reinitialize totals 
    totalIncome = 0;
    totalExpenses = 0;
    console.log(totalExpenses, totalIncome);
    
    if (transactions.length === 0) {
        calcBalance(0);
    } else {
        transactions.forEach(transaction => {
            calcBalance(transaction.amount); // Call the function to update totals
        });
    }

    displayTransactions()
}

// Function to put the transactions to the list
function displayTransactions() {

    // Clear the current list 
    transactionList.innerHTML= '';

    // Loop through transactions and create list items
    transactions.forEach((transaction, index) => {
            const listItem = document.createElement('li');
            const editBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');

            listItem.textContent = `${transaction.description}: £${transaction.amount.toFixed(2)}`;
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'X';

            transactionList.appendChild(listItem);
            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);
            console.log("list item created");

            editBtn.addEventListener('click', ()=> editTransaction(index));
            deleteBtn.addEventListener('click', ()=> deleteTransaction(index));

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

    // Calculate balance 
    balance = totalIncome + totalExpenses;
    console.log("total expsenses: "+ totalExpenses);
    console.log("total income: "+ totalIncome);
    console.log("your balance is " + balance);

    // Make changes to HTML
    document.getElementById('balance').innerHTML ='£' + balance.toFixed(2);
    document.getElementById('income').innerHTML ='£' + totalIncome.toFixed(2);
    document.getElementById('expenses').innerHTML ='£' + (totalExpenses * -1).toFixed(2);
    
}

// Create a function that saves the transactions to localStorage
function saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Create a function that loads the transactions from localStorage
function loadTransactionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

// Get the transactions from the local Storage
transactions = loadTransactionsFromLocalStorage();

// Reset totals before recalculating totals
totalIncome = 0;
totalExpenses = 0;

// Display the transactions
displayTransactions(transactions);

// Iterate through the transactions and calculate the balance
transactions.forEach(transaction => {
    calcBalance(transaction.amount);
})

});
