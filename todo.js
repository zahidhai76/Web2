"use strict"

let listElements = document.getElementsByTagName("li");
for (let i = 0; i < listElements.length; i++) {
  let span = document.createElement("span");
  let cross = document.createTextNode("x");
  span.className = "remove";
  span.appendChild(cross);
  listElements[i].appendChild(span);
}

let removeItem = document.getElementsByClassName("remove");
for (let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', hide)
}

let add = document.getElementsByClassName('addButton')[0]
add.addEventListener('click',newElement);

let ulElements = document.querySelector('ul');
ulElements.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function hide() {
    let div = this.parentElement;
    div.style.display = "none";
}

function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Add an item!");
  } else {
    document.getElementById("myList").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("span");
  let txt = document.createTextNode("x");
  span.className = "remove";
  span.appendChild(txt);
  li.appendChild(span);

  for (let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', hide)
  }
}

