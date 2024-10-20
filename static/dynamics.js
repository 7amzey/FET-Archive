document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("contact_form")

    form.onsubmit = function() {
        document.getElementById("submit_state").hidden = true;
        document.getElementById("loading_state").hidden = false;
        document.getElementById("spinner").hidden = false;
            
    }

})