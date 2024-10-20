document.addEventListener("DOMContentLoaded", () => {


    // function to control which calender is active currently the 2nd semester 
    calendarControl(1);

    let sem1Btn = document.getElementById("sem1Label");
    let sem2Btn = document.getElementById("sem2Label");
    let sem3Btn = document.getElementById("sem3Label");

    // if we press on one of the buttons it switch between the semesters
    sem1Btn.onclick = () => calendarControl(1);
    sem2Btn.onclick = () => calendarControl(2);
    sem3Btn.onclick = () => calendarControl(3);


    let favList = document.getElementById("favList");
    let plusIcon = document.getElementById("plusIcon");
    
    // check if there is subjects in favorite list
    if(localStorage.getItem("subjects") != "{}" && localStorage.getItem("subjects")){
 
        favList.setAttribute("class", "row px-1 py-2 mx-3 rounded-3");
        plusIcon.setAttribute("hidden", "true");

        let subjects = JSON.parse(localStorage.getItem("subjects"));
        // loop over the subjects in saved subjects in localStorage
        for(let id in subjects){
            if(subjects.hasOwnProperty(id)){
                // create div to hold all the information of the subject
                let outerDiv = document.createElement("div");
                outerDiv.setAttribute("class", "col-12 col-md-4 col-lg-3 p-1");

                let innerDiv = document.createElement("div");
                innerDiv.setAttribute("class", "col-12 custom-border rounded-2 d-flex justify-content-between");
                // create anchor link for the subject
                let title = document.createElement("a");
                title.setAttribute("href", `${subjects[id].url}`);
                title.setAttribute("class", "text-end link-body-emphasis text-decoration-none p-2");
                title.innerHTML = subjects[id].name;

                // create span for the heart button
                let heart = document.createElement("span");
                heart.setAttribute("class", "align-self-center ps-2");
                heart.setAttribute("style", "cursor: pointer;")
                heart.setAttribute("onclick", `addFav("${subjects[id].name}", "${subjects[id].url}", ${id})`);
                heart.innerHTML = `<i class="bi bi-heart-fill text-danger" id="favBtn${id}"></i>`;

                // append them in order
                outerDiv.appendChild(innerDiv);
                innerDiv.appendChild(title);
                innerDiv.appendChild(heart);
                favList.appendChild(outerDiv);
            }
        }
    }

})

// function to switch between semesters depending on the number it get (the number must be between 1 and 3 )
function calendarControl(sem){
    let sem1 = document.getElementById("sem1");
    let sem2 = document.getElementById("sem2");
    let sem3 = document.getElementById("sem3");


    if(sem == 1){
        sem1Label.setAttribute("data-active", "true");
        sem2Label.setAttribute("data-active", "false");
        sem3Label.setAttribute("data-active", "false");

        sem1.removeAttribute("hidden");
        sem2.setAttribute("hidden", "true");
        sem3.setAttribute("hidden", "true");
    }
    else if(sem == 2){
        sem1Label.setAttribute("data-active", "false");
        sem2Label.setAttribute("data-active", "true");
        sem3Label.setAttribute("data-active", "false");

        sem2.removeAttribute("hidden");
        sem1.setAttribute("hidden", "true");
        sem3.setAttribute("hidden", "true");
    }
    else{
        sem1Label.setAttribute("data-active", "false");
        sem2Label.setAttribute("data-active", "false");
        sem3Label.setAttribute("data-active", "true");

        sem3.removeAttribute("hidden");
        sem1.setAttribute("hidden", "true");
        sem2.setAttribute("hidden", "true");
    }
}