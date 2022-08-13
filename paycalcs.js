const period = document.getElementById('period');
period.addEventListener('click', () => {
    unhideInputSingle();
    unhideInputOther();
});

const buttonCalc = document.getElementsByClassName('buttonCalc');
buttonCalc[0].addEventListener('click', () => {
    grossMonthly();
    taxable();
    NIApplied();
    SLApplied();
    TakeHome();
    PensionContribution();
});


function unhideInputSingle() {
    for (var i = 0; i < 1; i++){
    if(document.getElementById("period").value == "Annually") {
        document.getElementsByClassName("gross-monthly")[i].style.display = "none";
        document.getElementsByClassName("gross-annually")[i].style.display = "block";
    }
    else if (document.getElementById("period").value == "Monthly") {
        document.getElementsByClassName("gross-annually")[i].style.display = "none"
        document.getElementsByClassName("gross-monthly")[i].style.display = "block"
    }
    }
}

function unhideInputOther() {
    for (var i = 0; i < 1; i++){
    if(document.getElementById("period").value == "Annually") {
        document.getElementsByClassName("gross-monthly")[i].style.display = "block";
        document.getElementById("gross-monthly").disabled = true;
        document.getElementById("gross-annually").disabled = false;
    }
    else if (document.getElementById("period").value == "Monthly") {
        document.getElementsByClassName("gross-annually")[i].style.display = "block"
        document.getElementById("gross-annually").disabled = true;
        document.getElementById("gross-monthly").disabled = false;
    }
    }
}

function grossMonthly() {
    var grossMonth;
    if(document.getElementById("period").value == "Annually"){
        grossMonth = document.getElementById("gross-annually").value / 12;
        document.getElementById("gross-monthly").value = grossMonth.toFixed(2);
    } 
    else if (document.getElementById("period").value == "Monthly"){
        grossMonth = document.getElementById("gross-monthly").value;
        let grossAnnually = grossMonth * 12;
        document.getElementById("gross-annually").value = grossAnnually.toFixed(2);
    }
}

function taxable(){
    var taxFreeAmount, taxableAmountLower, taxableAmountHigher, taxLower, taxHigher;
    let gross = document.getElementById("gross-monthly").value - PensionContribution();
    if(document.getElementById("tax-code").value == "1257L"){
        taxFreeAmount = 1048.59;
    } 
    else if (document.getElementById("tax-code").value == "1170L"){
        taxFreeAmount = 975;
    }
    if(gross >= 1048.59)
    {
        taxableAmountLower = gross - taxFreeAmount;
        if(gross >= 4189)
        {
            taxableAmountHigher = gross - 4189;
        }
        else {
            taxableAmountHigher = 0;
        }
    }
    else {
        taxableAmountLower = 0;
        taxableAmountHigher = 0;
    }
    taxLower = 0.2 * taxableAmountLower;
    taxHigher = 0.4 * taxableAmountHigher;
    let taxTotal = taxLower + taxHigher;
    for(var i = 0; i < 3; i++) {
        if (i==0){
            let taxableYearlyLower = taxableAmountLower * 12;
            let taxableYearlyHigher = taxableAmountHigher * 12;
            let taxedYearlyLower = taxLower * 12;
            let taxedYearlyHigher = taxHigher * 12;
            let taxTotalYearly = taxTotal * 12;
            document.getElementsByClassName("taxable20")[i].innerHTML = "£" + taxableYearlyLower.toFixed(2);
            document.getElementsByClassName("taxable40")[i].innerHTML = "£" + taxableYearlyHigher.toFixed(2);
            document.getElementsByClassName("taxed20")[i].innerHTML = "£" + taxedYearlyLower.toFixed(2);
            document.getElementsByClassName("taxed40")[i].innerHTML = "£" + taxedYearlyHigher.toFixed(2);
            document.getElementsByClassName("taxTotals")[i].innerHTML = "£" + taxTotalYearly.toFixed(2);
        }
        else if (i==1){
            document.getElementsByClassName("taxable20")[i].innerHTML = "£" + taxableAmountLower.toFixed(2);
            document.getElementsByClassName("taxable40")[i].innerHTML = "£" + taxableAmountHigher.toFixed(2);
            document.getElementsByClassName("taxed20")[i].innerHTML = "£" + taxLower.toFixed(2);
            document.getElementsByClassName("taxed40")[i].innerHTML = "£" + taxHigher.toFixed(2);
            document.getElementsByClassName("taxTotals")[i].innerHTML = "£" + taxTotal.toFixed(2);
        } else if (i==2){
            let taxableWeeklyLower = taxableAmountLower * (12/52);
            let taxableWeeklyHigher = taxableAmountHigher * (12/52);
            let taxedWeeklyLower = taxLower * (12/52);
            let taxedWeeklyHigher = taxHigher * (12/52);
            let taxTotalWeekly = taxTotal * (12/52);
            document.getElementsByClassName("taxable20")[i].innerHTML = "£" + taxableWeeklyLower.toFixed(2);
            document.getElementsByClassName("taxable40")[i].innerHTML = "£" + taxableWeeklyHigher.toFixed(2);
            document.getElementsByClassName("taxed20")[i].innerHTML = "£" + taxedWeeklyLower.toFixed(2);
            document.getElementsByClassName("taxed40")[i].innerHTML = "£" + taxedWeeklyHigher.toFixed(2);
            document.getElementsByClassName("taxTotals")[i].innerHTML = "£" + taxTotalWeekly.toFixed(2);
        }
    }
    return taxTotal;
}

function NIApplied(){
    var NIFreeAmount, NIAmount, NIAmountYearly, NIAmountWeekly, NI, NIYearly, NIWeekly;
    let gross = document.getElementById("gross-monthly").value - PensionContribution();
    if(gross >= 1047.50){
        NIFreeAmount = 1047.50
        NIAmount = gross - NIFreeAmount;
    } 
    else {
        NIFreeAmount = 0;
        NIAmount = 0;
    }
    NIAmountYearly = NIAmount * 12;
    NIAmountWeekly = NIAmount * (12/52);
    document.getElementById("NI-applied-on").innerHTML = "£" + NIAmount.toFixed(2);
    document.getElementById("NI-applied-on-Yearly").innerHTML = "£" + NIAmountYearly.toFixed(2);
    document.getElementById("NI-applied-on-Weekly").innerHTML = "£" + NIAmountWeekly.toFixed(2);
    NI = 0.1325 * NIAmount;
    NIYearly = NI * 12;
    NIWeekly = NI * (12/52);
    document.getElementById("NI").innerHTML = "£" + NI.toFixed(2);
    document.getElementById("NIYearly").innerHTML = "£" + NIYearly.toFixed(2);
    document.getElementById("NIWeekly").innerHTML = "£" + NIWeekly.toFixed(2);
    return NI;
}

function SLApplied(){
    var SLFreeAmount, SLAmount, SLAmountYearly, SLAmountWeekly, SL, SLYearly, SLWeekly;
    if(document.getElementById("RepaymentPlan").value == "PlanOne"){
        SLFreeAmount = 1682;
    } 
    else if (document.getElementById("RepaymentPlan").value == "PlanTwo"){
        SLFreeAmount = 2274;
    }
    if(document.getElementById("gross-monthly").value >= SLFreeAmount){
        SLAmount = parseInt(document.getElementById("gross-monthly").value) - SLFreeAmount - PensionContribution();
    } 
    else {
        SLFreeAmount = 0;
        SLAmount = 0;
    }
    SLAmountYearly = SLAmount * 12;
    SLAmountWeekly = SLAmount * (12/52);
    document.getElementById("SL-applied-on").innerHTML = "£" + SLAmount.toFixed(2);
    document.getElementById("SL-applied-on-Yearly").innerHTML = "£" + SLAmountYearly.toFixed(2);
    document.getElementById("SL-applied-on-Weekly").innerHTML = "£" + SLAmountWeekly.toFixed(2);
    SL = 0.09 * SLAmount;
    SLYearly = SL * 12;
    SLWeekly = SL * (12/52);
    document.getElementById("SL").innerHTML = "£" + SL.toFixed(2);
    document.getElementById("SLYearly").innerHTML = "£" + SLYearly.toFixed(2);
    document.getElementById("SLWeekly").innerHTML = "£" + SLWeekly.toFixed(2);
    return SL;
}

function PensionContribution(){
    let PensionPercentage = document.getElementById("pension-contribution").value / 100;
    let grossMonthly = document.getElementById("gross-monthly").value;
    let pension = PensionPercentage * grossMonthly;
    let pensionYearly = pension * 12;
    let pensionWeekly = pension * (12/52);
    document.getElementById("pension").innerHTML = "£" + pension.toFixed(2);
    document.getElementById("pensionYearly").innerHTML = "£" + pensionYearly.toFixed(2);
    document.getElementById("pensionWeekly").innerHTML = "£" + pensionWeekly.toFixed(2);
    return pension;
}

function TakeHome(){
    let TakeHomeAmount = document.getElementById("gross-monthly").value - taxable() - NIApplied() - SLApplied() - PensionContribution();
    let TakeHomeAmountYearly = TakeHomeAmount * 12;
    let TakeHomeAmountWeekly = TakeHomeAmount * (12/52);
    document.getElementById("TakeHome").innerHTML = "£" + TakeHomeAmount.toFixed(2);
    document.getElementById("TakeHomeYearly").innerHTML = "£" + TakeHomeAmountYearly.toFixed(2);
    document.getElementById("TakeHomeWeekly").innerHTML = "£" + TakeHomeAmountWeekly.toFixed(2);
}

function darkMode() {
    for(var i = 0; i < document.getElementsByClassName("container").length; i++){
    let element = document.getElementsByClassName("container")[i];
    element.classList.toggle("dark-mode");
    }
}

function darkModeTitle() {{
    const box = document.getElementById('header');
    if(box.style.color == 'white'){
        box.style.color = 'black';
    } else if (box.style.color = 'black') {
        box.style.color = 'white';
     }
    };
}
