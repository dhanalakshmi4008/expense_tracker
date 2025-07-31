// script.js
// script.js
let budget = 0;
let expenses = [];
let expenseId = 0;

function setBudget() {
  const budgetInput = document.getElementById('budget-input');
  budget = parseFloat(budgetInput.value) || 0;
  updateSummary();
}

function addExpense() {
  const desc = document.getElementById('expense-desc').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const date = document.getElementById('expense-date').value;

  if (!desc || isNaN(amount) || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  const newExpense = {
    id: expenseId++,
    desc,
    amount,
    date,
    image: "https://cdn-icons-png.flaticon.com/512/2976/2976215.png" // Default image
  };
  expenses.push(newExpense);
  updateSummary();
  renderExpenses();
  clearInputs();
}

function updateSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('budget').textContent = `$${budget}`;
  document.getElementById('expenses').textContent = `$${total}`;
  document.getElementById('balance').textContent = `$${budget - total}`;
}

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';

  expenses.forEach(e => {
    const div = document.createElement('div');
    div.className = 'expense-item';

    div.innerHTML = `
      <div class="expense-info">
        <img src="${e.image}" alt="receipt">
        <div class="expense-meta">
          <p><strong>${e.desc}</strong></p>
          <p>$${e.amount} | ${e.date}</p>
        </div>
      </div>
      <div class="expense-actions">
        <button class="edit" onclick="editExpense(${e.id})">Edit</button>
        <button class="delete" onclick="deleteExpense(${e.id})">Delete</button>
      </div>
    `;

    list.appendChild(div);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  updateSummary();
  renderExpenses();
}

function editExpense(id) {
  const exp = expenses.find(e => e.id === id);
  document.getElementById('expense-desc').value = exp.desc;
  document.getElementById('expense-amount').value = exp.amount;
  document.getElementById('expense-date').value = exp.date;
  deleteExpense(id);
}

function clearInputs() {
  document.getElementById('expense-desc').value = '';
  document.getElementById('expense-amount').value = '';
  document.getElementById('expense-date').value = '';
}
