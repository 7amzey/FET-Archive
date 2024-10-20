 function submitSpinner(){
    document.getElementById(`submit_state`).setAttribute("hidden", "true");
    document.getElementById(`loading_state`).removeAttribute("hidden");
    document.getElementById(`spinner`).removeAttribute("hidden");
}

// the operations done here are adding the subject to favorite & switch between the resources 
document.addEventListener('DOMContentLoaded', function(){

    changeLogo();
    
    let bookRes = document.querySelectorAll('tr[data-type="book"]');
    let examRes = document.querySelectorAll('tr[data-type="exam"]');
    let summaryRes = document.querySelectorAll('tr[data-type="summary"]');
    let videoRes = document.querySelectorAll('tr[data-type="video"]');

    let bookBtn = document.getElementById('bookBtn');
    let examBtn = document.getElementById('examBtn');
    let summaryBtn = document.getElementById('summaryBtn');
    let videoBtn = document.getElementById('videoBtn');

    bookBtn.addEventListener('click', () => {
        bookBtn.setAttribute('class', "btn btn-warning col-12");
        examBtn.setAttribute('class', "btn btn-outline-warning col-12");
        summaryBtn.setAttribute('class', "btn btn-outline-warning col-12");
        videoBtn.setAttribute('class', "btn btn-outline-warning col-12");
       
        bookRes.forEach((res) => {
            res.removeAttribute('hidden');
        });
        examRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        summaryRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        videoRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
    });

    summaryBtn.addEventListener('click', () => {
        bookBtn.setAttribute('class', "btn btn-outline-warning col-12");
        examBtn.setAttribute('class', "btn btn-outline-warning col-12");
        summaryBtn.setAttribute('class', "btn btn-warning col-12");
        videoBtn.setAttribute('class', "btn btn-outline-warning col-12");

        bookRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        examRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        summaryRes.forEach((res) => {
            res.removeAttribute('hidden');
        });
        videoRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
    });

    examBtn.addEventListener('click', () => {
        bookBtn.setAttribute('class', "btn btn-outline-warning col-12");
        examBtn.setAttribute('class', "btn btn-warning col-12");
        summaryBtn.setAttribute('class', "btn btn-outline-warning col-12");
        videoBtn.setAttribute('class', "btn btn-outline-warning col-12");

        bookRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        examRes.forEach((res) => {
            res.removeAttribute('hidden');
        });
        summaryRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        videoRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
    });

    videoBtn.addEventListener('click', () => {
        bookBtn.setAttribute('class', "btn btn-outline-warning col-12");
        examBtn.setAttribute('class', "btn btn-outline-warning col-12");
        summaryBtn.setAttribute('class', "btn btn-outline-warning col-12");
        videoBtn.setAttribute('class', "btn btn-warning col-12");

        bookRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        examRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        summaryRes.forEach((res) => {
            res.setAttribute('hidden', 'true');
        });
        videoRes.forEach((res) => {
            res.removeAttribute('hidden');
        });
    });
})
// change logo of teams exist in resources
function changeLogo() {
    const darklogos = document.querySelectorAll("[data-img-theme='dark']");
    const lightlogos = document.querySelectorAll("[data-img-theme='light']");

    if(localStorage.getItem("theme") === "light"){
        darklogos.forEach(logo => logo.hidden = true);
        lightlogos.forEach(logo => logo.hidden = false);
    } else {
        darklogos.forEach(logo => logo.hidden = false);
        lightlogos.forEach(logo => logo.hidden = true);
    }
}

function addFinished(id, hours){
    let subject = {
        id: id,
        hours: hours
    };
    let finishedSubjects = JSON.parse(localStorage.getItem("finishedSubjects")) || {};
    let finishedBtn = document.getElementById("finishedBtn");
    if(localStorage.getItem("finishedSubjects")){
        if(finishedSubjects.hasOwnProperty(id)){
            delete finishedSubjects[id];
            finishedBtn.setAttribute('class', 'btn btn-outline-success mx-1 mb-2');
        }else{
            finishedSubjects[id] = subject;
            finishedBtn.setAttribute('class', 'btn btn-success mx-1 mb-2');
        }
    }else{
        finishedSubjects[id] = subject;
    }
    localStorage.setItem("finishedSubjects", JSON.stringify(finishedSubjects));
}