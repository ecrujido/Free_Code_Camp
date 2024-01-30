const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let price = 3.26; // Example price, replace with your dynamic value

const displayChangeDue = document.getElementById('change-due');
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`));
};

const checkCashRegister = () => {
  const cashPaid = parseFloat(cashInput.value);

  if (isNaN(cashPaid) || cashPaid < price) {
    alert('Customer does not have enough money to purchase the item');
    cashInput.value = '';
    return;
  }

  if (cashPaid === price) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cashInput.value = '';
    return;
  }

  const changeDue = cashPaid - price;
  const result = { status: 'OPEN', change: [] };

  if (calculateChange(cid, changeDue, result)) {
    formatResults(result.status, result.change);
    updateUI(result.change);
  } else {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
  }
};

const calculateChange = (drawer, changeDue, result) => {
  const reversedCid = [...drawer].reverse();
  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  for (let i = 0; i <= reversedCid.length; i++) {
    const [currency, value] = reversedCid[i];
    
    while (value > 0 && changeDue >= denominations[i]) {
      value -= denominations[i];
      changeDue = parseFloat((changeDue - denominations[i]).toFixed(2));
      result.change.push([currency, denominations[i]]);
    }
  }

  return changeDue === 0;
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  if (change) {
    change.forEach(([currency, changeAmount]) => {
      const targetArr = cid.find(cidArr => cidArr[0] === currency);
      targetArr[1] = parseFloat((targetArr[1] - changeAmount).toFixed(2));
    });
  }

  cashInput.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid.map(([currency, value]) => `<p>${currencyNameMap[currency]}: $${value}</p>`).join('')}  
  `;
};

purchaseBtn.addEventListener('click', checkCashRegister);

cashInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkCashRegister();
  }
});

updateUI();
