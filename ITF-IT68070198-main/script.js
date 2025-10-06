function logToOutputBox(message) {
  let box = document.getElementById("outputBox");
  box.innerHTML += message + "\n";
  box.scrollTop = box.scrollHeight;
}

function handleCurrencyConversion() {
  const rateUSDToTHB = 36;
  const rateTHBToUSD = 1 / 36;

  let inputAmount = parseFloat(document.getElementById("inputBalance").value);
  let selectedCurrency = document.getElementById("inputCurrency").value;
  let convertedAmount = 0;

  if (isNaN(inputAmount)) {
    logToOutputBox("Please enter a valid number for conversion");
    return;
  }

  if (selectedCurrency === "USD") {
    convertedAmount = inputAmount * rateUSDToTHB;
    document.getElementById("outputBalance").value = convertedAmount.toFixed(2) + " THB";
    logToOutputBox("Converted " + inputAmount + " USD → " + convertedAmount.toFixed(2) + " THB");
  } else if (selectedCurrency === "THB") {
    convertedAmount = inputAmount * rateTHBToUSD;
    document.getElementById("outputBalance").value = convertedAmount.toFixed(2) + " USD";
    logToOutputBox("Converted " + inputAmount + " THB → " + convertedAmount.toFixed(2) + " USD");
  }
}

function refreshBalances() {
  let accountBalance = parseFloat(document.getElementById("accountBalance").value);
  let cashBalance = parseFloat(document.getElementById("cashBalance").value);

  if (isNaN(accountBalance) || isNaN(cashBalance)) {
    logToOutputBox("Please enter valid balances");
    return;
  }

  logToOutputBox("Balances updated → Account: " + accountBalance + " | Cash: " + cashBalance);
}

function performDeposit() {
  let depositAmount = parseFloat(document.getElementById("operationAmount").value);
  let accountBalance = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    logToOutputBox("Invalid deposit amount");
    return;
  }

  accountBalance += depositAmount;
  document.getElementById("accountBalance").value = accountBalance;
  logToOutputBox("Deposited " + depositAmount + " → New account balance: " + accountBalance);
}

function performWithdrawal() {
  let withdrawalAmount = parseFloat(document.getElementById("operationAmount").value);
  let accountBalance = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
    logToOutputBox("Invalid withdraw amount");
    return;
  }

  if (withdrawalAmount > accountBalance) {
    logToOutputBox("Not enough balance for withdrawal");
    return;
  }

  accountBalance -= withdrawalAmount;
  document.getElementById("accountBalance").value = accountBalance;
  logToOutputBox("Withdraw " + withdrawalAmount + " → New account balance: " + accountBalance);
}

function executeSelectedOperation() {
  let operationType = document.getElementById("operationType").value;

  if (operationType === "deposit") {
    performDeposit();
  } else if (operationType === "withdraw") {
    performWithdrawal();
  } else {
    logToOutputBox("Invalid operation type");
  }
}