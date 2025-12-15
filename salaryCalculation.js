let earnedBasic = document.getElementById("ea");
let earnedHRA = document.getElementById("ehra");
let earnedConveyance = document.getElementById("ec");
let earnedMedicalReimbu = document.getElementById("emr");
let earnedSpecialAllowance = document.getElementById("spa");
let earnedBonus = document.getElementById("eb");
let grossTotal = document.getElementById("gt");
let pfAmount = document.getElementById("pfa");
let esiAmount = document.getElementById("esi");
let professionalTax = document.getElementById("pt");
let otherDeduction = document.getElementById("od");
let deductionTotal = document.getElementById("dt")

let eveningShiftCount = document.getElementById("esc");
let eveningShiftAmount = document.getElementById("esa");
let nightShiftCount = document.getElementById("nsc");
let nightShiftAmount = document.getElementById("nsa");
let hoursCount = document.getElementById("hc");
let hoursAmount = document.getElementById("ha");
let extraStaffingCount = document.getElementById("estaffingc");
let extraStaffingAmount = document.getElementById("estaffinga");
let totalAllowance = document.getElementById("totalallowance");

let rs = document.getElementById("rs");
let differenceAmount = document.getElementById("dfamount");

let netPay = 0;
earnedConveyance.value = 1600;
earnedMedicalReimbu.value = 1250;

[earnedBasic, earnedHRA, earnedConveyance,earnedMedicalReimbu, earnedSpecialAllowance, earnedBonus].forEach(ea => ea.addEventListener("input", calculateGrossPay));
[pfAmount, esiAmount, professionalTax, otherDeduction].forEach(ea => ea.addEventListener("input", calculateDeductionTotal));
// [eveningShiftCount, nightShiftCount, hoursCount, extraStaffingCount].forEach(ea=>ea.addEventListener("input",splTotoalAmountCal));

function calculateGrossPay() {
    let totalGross = Number(earnedBasic.value) + Number(earnedHRA.value) + Number(earnedConveyance.value) + Number(earnedMedicalReimbu.value) + Number(earnedSpecialAllowance.value) + Number(earnedBonus.value)
    grossTotal.value = totalGross
    hoursAmountCal()
    extraStaffingAmountCal()
}

function calculateDeductionTotal() {
    let totaldeduction = Number(pfAmount.value) + Number(esiAmount.value) + Number(professionalTax.value) + Number(otherDeduction.value)
    deductionTotal.value = totaldeduction
}

function hoursAmountCal() {
    let hoursCal = Number(grossTotal.value) / 30;
    let finalAmount = hoursCal / 8
    let finalAmountOne = finalAmount * 2
    let finalAmountTwo = finalAmountOne * Number(hoursCount.value);
    hoursAmount.value = finalAmountTwo.toFixed(2);
    splTotoalAmountCal();
}

function extraStaffingAmountCal() {
    let hoursCal = Number(grossTotal.value) / 31;
    let finalAmount = hoursCal * 2
    let finalAmountTwo = finalAmount * Number(extraStaffingCount.value);
    extraStaffingAmount.value = finalAmountTwo.toFixed(2);
    splTotoalAmountCal();
}

function splTotoalAmountCal() {
    let allowanceTotal = Number(eveningShiftAmount.value) + Number(nightShiftAmount.value) + Number(hoursAmount.value) + Number(extraStaffingAmount.value)
    totalAllowance.value = allowanceTotal
}

function submitNetPay() {
    calculateGrossPay()
    calculateDeductionTotal()
    splTotoalAmountCal()
    netPay = Number(grossTotal.value) - Number(deductionTotal.value) + Number(totalAllowance.value)

    if (netPay <= 0) {
        alert("Please enter your salary amount");
        return;
    } else if (deductionTotal.value <= 0) {
        alert("Please enter your deduction amount");
        return;
    }
    else {
        document.getElementById("nps").innerText = netPay.toFixed(2);
    }
}

//splTotoalAmountCal() inlude immidiate run for when i apply the amount
eveningShiftCount.addEventListener("input", function () {
    eveningShiftAmount.value = Number(eveningShiftCount.value) * 120;
    splTotoalAmountCal();
});

nightShiftCount.addEventListener("input", function () {
    nightShiftAmount.value = Number(nightShiftCount.value) * 160;
    splTotoalAmountCal()
});

hoursCount.addEventListener("input", hoursAmountCal);

extraStaffingCount.addEventListener("input", extraStaffingAmountCal);

rs.addEventListener("input", function () {
    let difference = Number(rs.value) - netPay;
    differenceAmount.innerText = difference.toFixed(2);
});


// Elements to store
let salaryFields = [
    earnedBasic, earnedHRA, earnedConveyance, earnedMedicalReimbu, earnedSpecialAllowance, earnedBonus,
    pfAmount, esiAmount, professionalTax, otherDeduction
];

// Add event listener to store in localStorage
salaryFields.forEach(field => {
    field.addEventListener("input", function() {
        localStorage.setItem(field.id, field.value);
    });
});


window.addEventListener("load", function() {
    salaryFields.forEach(field => {
        let storedValue = localStorage.getItem(field.id);
        if (storedValue) {
            field.value = storedValue;
        }
    });

    // Recalculate totals after restoring values
    calculateGrossPay();
    calculateDeductionTotal();
    splTotoalAmountCal();
    resetSpecialAllowances();
});


function resetSpecialAllowances() {
    eveningShiftAmount.value = "";
    nightShiftAmount.value = "";
    hoursAmount.value = "";
    extraStaffingAmount.value = "";
    totalAllowance.value = "";
}
