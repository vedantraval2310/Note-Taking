console.log("Welcome to notes app. This is app.js");
showNotes(); // takes all the notes from local storage and display in notes is Div

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  console.log(notesObj);

  showNotes();
});

// function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="bg-light shadow-lg m-3 p-3 rounded-3 text-center" style="width: 18rem;">
          <h5 class="card-title text-center">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger p-1">Delete Note</button>
      </div> `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = ``;
  }
}

// function to delete a Note
function deleteNote(index) {
  console.log("I am deleating", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  console.log("Input event fired!", inputVal);
  let noteCards = document.getElementByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementByTagName("p")[0].innerText;
    if (cardTxt.include(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});
