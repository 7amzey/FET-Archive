document.addEventListener("DOMContentLoaded", () => {   
    // Hide page content so the spinner be showed alone
    //document.getElementById("content").style.display = "none";

    // Switching between themes
    if(localStorage.getItem("theme")){
        let body = document.getElementsByTagName("body")[0];
        body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
    }
    let light_icon = document.getElementById("lightIcon");
    let dark_icon = document.getElementById("darkIcon");
    light_icon.addEventListener("click", () => setTheme("light"));
    dark_icon.addEventListener("click", () => setTheme("dark"));

    // indicate every key on element with id searchInput
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => search(searchInput.value))
})

// Function for direct search
function search(value){
    let list = document.getElementById("searchList");
    list.innerHTML = "";

    
    // check if the search bar is empty or not
    if(value.length >= 1){
        list.removeAttribute("hidden");
        fetch(`/dir_search/?data=${value}`)
        .then(response => response.json())
        .then(data => {
            list.innerHTML = "";
            // check if there's subjects returned or not
            if(data.info == "[]"){
                let li = document.createElement("li");
                li.setAttribute("class", "list-group-item");
                li.innerHTML = `لا يوجد نتائج ل ${value}`;
                list.appendChild(li);
            }else{
                let subjects = JSON.parse(data.info); // convert from JSON format to object format so js can handle it 
                subjects.forEach(subject => {
                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    li.setAttribute("class", "list-group-item");
                    a.setAttribute("href", `/1/${subject.pk}`);
                    a.setAttribute("class", "link-body-emphasis link-underline-opacity-0")
                    a.innerHTML = subject.fields.subject;
                    li.appendChild(a);
                    list.appendChild(li);
                })
            }
        })
    }
    else{
        list.setAttribute("hidden", "true")
    }
}

/*
// Hide the spinner when the page is loaded
window.onload = function () {
    document.getElementById('pageSpinner').style.display = 'none';
    document.getElementById("content").style.display = "block";
};


// This event listener is excuted before leaveing the page (to show to spinner)
document.addEventListener('beforeunload', () => {
    document.getElementById('pageSpinner').style.display = 'block';
    document.getElementById("content").style.display = "none";
});
*/

function addFav(nm, url, id){
    let heart = document.getElementById(`favBtn`);
    let heartIndex = document.getElementById(`favBtn${id}`);
    // create object that holds the data we need
    let sub = {
        "name": nm,
        "url":url
    }
    // check if there's any subject in the local storage
    if(localStorage.getItem("subjects")){
        let subjects = JSON.parse(localStorage.getItem("subjects"));
        // check if the subject exist in the favorite list
        if(subjects.hasOwnProperty(id)){
            // delete the subject from favorite list
            delete subjects[id];
            // if statment to determine if we in the subject page
            heart?heart.setAttribute("class", "btn btn-outline-danger mx-1 mb-2"):null;
            // if statment to determine if we in the index page
            heartIndex?heartIndex.setAttribute("class", "bi bi-heart text-danger"):null;
        }else{
            // if the subject not in favorite list then it well be added
            subjects[id] = sub;
            // if statment to determine if we in the subject page
            heart?heart.setAttribute("class", "btn btn-danger mx-1 mb-2"):null;
            // if statment to determine if we in the index page
            heartIndex?heartIndex.setAttribute("class", "bi bi-heart-fill text-danger"):null;
        }
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }else{
        // if there's no subjects then create an object to store the data in it as pairs
        let subjects = {};
        subjects[id] = sub;
        localStorage.setItem("subjects", JSON.stringify(subjects));
        heart.setAttribute("class", "btn btn-danger mx-1 mb-2");
    }
}

// function to switch between themes 
function setTheme(theme){
    localStorage.setItem("theme", theme);
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("data-bs-theme", theme);
    if(document.getElementById("lightLogo")){
        changeLogo();
    }
    if(document.getElementById("darkMap")){
        changeMap();
    }
    if(document.querySelector("[data-img-theme]")){
        changeLogo();
    }
}