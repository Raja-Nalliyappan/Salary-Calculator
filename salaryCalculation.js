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


earnedBasic.addEventListener("input", calculateGrossPay);
earnedHRA.addEventListener("input", calculateGrossPay);
earnedConveyance.addEventListener("input", calculateGrossPay);
earnedMedicalReimbu.addEventListener("input", calculateGrossPay);
earnedSpecialAllowance.addEventListener("input", calculateGrossPay);
earnedBonus.addEventListener("input", calculateGrossPay);

pfAmount.addEventListener("input", calculateDeductionTotal);
esiAmount.addEventListener("input", calculateDeductionTotal);
professionalTax.addEventListener("input", calculateDeductionTotal);
otherDeduction.addEventListener("input", calculateDeductionTotal);

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

eveningShiftCount.addEventListener("input", function () {
    eveningShiftAmount.value = Number(eveningShiftCount.value) * 120;
});

nightShiftCount.addEventListener("input", function () {
    nightShiftAmount.value = Number(nightShiftCount.value) * 160;
});

function hoursAmountCal() {

    let hoursCal = Number(grossTotal.value) / 31;
    let finalAmount = hoursCal / 8
    let finalAmountOne = finalAmount * 1.5
    let finalAmountTwo = finalAmountOne * Number(hoursCount.value);

    hoursAmount.value = finalAmountTwo.toFixed(2);
}

hoursCount.addEventListener("input", hoursAmountCal);


function extraStaffingAmountCal() {

    let hoursCal = Number(grossTotal.value) / 31;
    let finalAmount = hoursCal * 1.5
    let finalAmountTwo = finalAmount * Number(extraStaffingCount.value);

    extraStaffingAmount.value = finalAmountTwo.toFixed(2);
}

extraStaffingCount.addEventListener("input", extraStaffingAmountCal);

function splTotoalAmountCal() {
    let allowanceTotal = Number(eveningShiftAmount.value) + Number(nightShiftAmount.value) + Number(hoursAmount.value) + Number(extraStaffingAmount.value)

    totalAllowance.value = allowanceTotal.toFixed(2)
}

eveningShiftCount.addEventListener("input", splTotoalAmountCal)
nightShiftCount.addEventListener("input", splTotoalAmountCal)
hoursCount.addEventListener("input", splTotoalAmountCal);
extraStaffingCount.addEventListener("input", splTotoalAmountCal);

function submitNetPay() {

    let deductionTotalVal = Number(deductionTotal.value)
    let netPay = Number(grossTotal.value) - Number(deductionTotal.value) + Number(totalAllowance.value)

    if (netPay <= 0) {
        alert("Please enter your salary amount");
        return;
    } else if (deductionTotalVal <= 0) {
        alert("Please enter your deduction amount");
        return;
    }
    else {
        document.getElementById("nps").innerText = netPay;
    }
}