document.addEventListener("DOMContentLoaded", function(){
  const body = document.getElementsByTagName('body')[0];
  const divs =  document.querySelectorAll('div .column');
  const modalBox = document.getElementById('modal-box');
  const span = document.getElementsByClassName('close')[0];
  const modalText = document.querySelector('.modal-content p');
  const employeeArray = [];

  // used fetch api tp get 12 random "employees" from Random User API
  fetch('https://randomuser.me/api/?format=json&results=12')
    .then(response => response.json())
    .then(data => createData(data.results))
    .then(data => createGrid())

  function clickBox (event) {
    modalBox.style.display = "block";
    console.log(event.target);
    //modalText.innerHTML = `<p>${event.target}</p>`;
  }

  function hoverBox (event) {

  }

  function createData (data) {
      for (let i = 0; i < data.length; i++) {
        let tempArray = [];
        let firstName = data[i].name.first;
        firstName = firstName[0].toUpperCase() + firstName.substr(1);
        let lastName = data[i].name.last;
        lastName = lastName[0].toUpperCase() + lastName.substr(1);
        let city = data[i].location.city;
        city = city[0].toUpperCase() + city.substr(1);
        tempArray.push(data[i].picture.thumbnail);
        tempArray.push(firstName);
        tempArray.push(lastName);
        tempArray.push(data[i].email);
        tempArray.push(city);
        tempArray.push(data[i].cell);
        tempArray.push(data[i].location);
        tempArray.push(data[i].dob.date);
        employeeArray.push(tempArray);
      }
      console.log(employeeArray);
  }

  // create grid for employees
  function createGrid (data) {
    // select all 4 rows
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const row3 = document.getElementById('row3');
    const row4 = document.getElementById('row4');
    // add employee info to divs
    for (let i = 0; i < employeeArray.length; i++) {
      const newCol = document.createElement('div');
      newCol.classList.add("column");
      newCol.innerHTML = `<img src="${employeeArray[i][0]}" alt="thumbnail photo">
          <p>${employeeArray[i][1]} ${employeeArray[i][2]} <br> ${employeeArray[i][3]} <br>
          ${employeeArray[i][4]}</p>`
      if (i >= 0 && i < 3) {
        row1.appendChild(newCol);
      } else if (i >= 3 && i < 6) {
        row2.appendChild(newCol);
      } else if (i >= 6 && i < 9) {
        row3.appendChild(newCol);
      } else {
        row4.appendChild(newCol);
      }
    }
  }

  modalBox.style.display = "none";

  // adds listeners to all the boxes
  divs.forEach((box) => {
    //box.addEventListener('mouseover', hoverBox);
    //box.addEventListener('mouseout', hoverBox);
    box.addEventListener('click', clickBox);
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modalBox.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target === modalBox) {
          modalBox.style.display = "none";
      }
  }
});
