// Query selectors
const myForm = document.getElementById("myForm");
const input = document.getElementById("itemInput")
const list = document.querySelector(".list")
const submitBtn = document.getElementById("submit-btn")
const clearBtn = document.querySelector(".clearItems")

let edit = false;
let editValueInput = "";
let clearValue = false;
// Event listeners
myForm.addEventListener("submit", getInputValue);
clearBtn.addEventListener("click", clearItems)
// gets the input value for the form
function getInputValue(e) {
    clearValue = true;
    e.preventDefault();
    const value = input.value;
    if (value != "" && edit == false) {
        clearValue = true;
        let key = getId()
        setStorage(key, value)
        createListItem(key, value);

    }
    if (edit == true) {
        editValue(editValueTarget)
    }
    checkClearValue();
    myForm.reset();

}

// Turns clear all button on or off
function checkClearValue() {
    if (list.childNodes.length > 1) {
        clearBtn.classList.remove("hidden");
    }
    else {
        clearBtn.classList.add("hidden");

    }
}

function createListItem(key, value) {
    const newStuff = document.createElement("article")
    newStuff.classList.add("listArticle");
    newStuff.setAttribute("id", key)
    newStuff.innerHTML = `<div class="list__item--container">
    <p class="list__item--content">${value}</p>
    <div class=buttonContainer>
    <button class="importantBtn btn">Important</button>
    <button class="editBtn btn">Edit</button>
    <button class="deleteBtn btn">Delete</button></div></div>`
    list.appendChild(newStuff)

    const editBtn = newStuff.querySelector(".editBtn");
    editBtn.addEventListener("click", editEnable);

    const deleteBtn = newStuff.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", removeItem)
}
// clear all list items
function clearItems() {
    list.innerHTML = " ";
    checkClearValue();
    localStorage.clear()
}
// 
function editEnable(e) {
    edit = true
    submitBtn.innerText = "edit"
    editValueTarget = e.currentTarget.parentElement.parentElement.firstElementChild
    return editValueTarget
}
function editValue(e) {
    e.innerText = input.value;
    edit = false;
    submitBtn.innerText = "Submit"
}

// delete item
function removeItem(e,) {
    if (!edit) {
        const element = e.currentTarget.parentElement.parentElement.parentElement;
        let idKey = element.id
        list.removeChild(element);
        console.log(idKey);
        localStorage.removeItem(idKey)
        checkClearValue()
    }

}

// Filter
//  - probably requires some form of array 
// Search and filter
// change buttons to svg
// make same size
// Improve ui
// Add user caching
// Re-click edit to get rid of it
// important button functionality


// Get input, generate id through get time, save to local storage
function setStorage(key, value) {

    localStorage.setItem(key, value)
}

function getId() {
    let number = new Date().getTime();
    return number
}
document.onload = () => {

}
// let m = number.getMilliseconds(