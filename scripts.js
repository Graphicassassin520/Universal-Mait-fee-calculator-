document.getElementById('feeCalculatorForm').addEventListener('input', calculateFees);

function calculateFees() {
    const maintenanceFee = parseFloat(document.getElementById('maintenanceFee').value);
    const propertyTax = parseFloat(document.getElementById('propertyTax').value);
    const membershipFee = parseFloat(document.getElementById('membershipFee').value);
    const exchangeFee = parseFloat(document.getElementById('exchangeFee').value);
    const priceIncrease = parseFloat(document.getElementById('priceIncrease').value) / 100;

    let isValid = true;

    if (isNaN(maintenanceFee) || maintenanceFee <= 0) {
        showError('maintenanceFeeError', 'Please enter a valid maintenance fee.');
        isValid = false;
    } else {
        hideError('maintenanceFeeError');
    }

    if (isNaN(propertyTax) || propertyTax < 0) {
        showError('propertyTaxError', 'Please enter a valid property tax.');
        isValid = false;
    } else {
        hideError('propertyTaxError');
    }

    if (isNaN(membershipFee) || membershipFee < 0) {
        showError('membershipFeeError', 'Please enter a valid membership fee.');
        isValid = false;
    } else {
        hideError('membershipFeeError');
    }

    if (isNaN(exchangeFee) || exchangeFee < 0) {
        showError('exchangeFeeError', 'Please enter a valid exchange fee.');
        isValid = false;
    } else {
        hideError('exchangeFeeError');
    }

    if (isNaN(priceIncrease) || priceIncrease < 0) {
        showError('priceIncreaseError', 'Please enter a valid price increase percentage.');
        isValid = false;
    } else {
        hideError('priceIncreaseError');
    }

    if (!isValid) {
        return;
    }

    let totalAnnualCost = maintenanceFee + propertyTax + membershipFee + exchangeFee;
    document.getElementById('totalAnnualCost').innerText = totalAnnualCost.toFixed(2);
    document.getElementById('results').classList.remove('hidden');

    let resultTableBody = document.querySelector('#resultTable tbody');
    resultTableBody.innerHTML = '';

    let cumulativeCost = 0;
    for (let i = 1; i <= 20; i++) {
        let year = 2024 + (i - 1);
        let monthlyCost = totalAnnualCost / 12;
        cumulativeCost += totalAnnualCost;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${year}</td>
            <td>$${monthlyCost.toFixed(2)}</td>
            <td>$${totalAnnualCost.toFixed(2)}</td>
            <td>$${cumulativeCost.toFixed(2)}</td>
        `;
        resultTableBody.appendChild(row);

        totalAnnualCost *= (1 + priceIncrease);
    }
}

function printResults() {
    const location = document.getElementById('location').value;
    const totalAnnualCost = document.getElementById('totalAnnualCost').innerText;

    const printHeader = document.createElement('div');
    printHeader.id = 'print-header';
    printHeader.innerHTML = `<h2>Location: ${location}</h2><h2>Total Annual Cost: $${totalAnnualCost}</h2>`;
    document.body.insertBefore(printHeader, document.body.firstChild);

    window.print();

    document.body.removeChild(printHeader);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}