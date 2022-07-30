"use strict"

function currentDate() {
    let date = document.getElementById('currentDate');
    const currentYear = new Date().getFullYear();
    const nameOfMonth = new Intl.DateTimeFormat('en-UK', {month: 'long'}).format(
        new Date(),
      );    
      const currentDay = new Date().getDate();
    const together = [nameOfMonth, currentDay, currentYear].join(' ');
    date.innerText += together;
}

currentDate();

let numberInput = document.querySelector('#numberInput');

numberInput.addEventListener('input', FetchAPIRequest)

function FetchAPIRequest(){
    let number = numberInput.value;

    fetch('http://numbersapi.com/'+number)
    .then((response) => response.text())
    .then((data) => {
        if(numberInput.value != '')
        document.getElementById("NumberText").innerHTML = data;
    })
    .catch(err => console.log(err));

}
