const checkbox = document.getElementById("optionsCheckbox");
const icon = document.getElementById("optionsIcon");

checkbox.addEventListener("change", function() {
    if (checkbox.checked){
        icon.style.transform = "rotate(90deg) translate(20px, 0px)";
        icon.style.transition = "0.1s ease-in-out";
    }
    else
        icon.style.transform = "rotate(0deg)";
});

const darkModeToggle = document.getElementById('darkmode');

const lightTheme = document.getElementById('light-theme');
const darkTheme = document.getElementById('dark-theme');

if (localStorage.getItem('darkmode') === 'enabled') {
    darkModeToggle.checked = true;
    darkTheme.removeAttribute('disabled');
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        darkTheme.removeAttribute('disabled');
        localStorage.setItem('darkmode', 'enabled');
    } else {
        darkTheme.setAttribute('disabled', 'true');
        localStorage.setItem('darkmode', 'disabled');
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        var checkedInputs = document.querySelectorAll('input');
            checkedInputs.forEach(function(input) {
            input.checked = false;
            icon.style.transform = "rotate(0deg)";
        });
    }
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById("login").checked = false;        
});

document.getElementsByClassName('close')[1].addEventListener('click', function() {
    document.querySelector('input[name="accountType"]:checked').checked = false;        
});