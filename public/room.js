var logged = true;

var inputs = document.querySelectorAll('input[name="slot"]');
var labels = document.querySelectorAll('label[for^="s"]');

inputs.forEach(function(input, index) {
    input.addEventListener("change", function() {
        var tds = document.querySelectorAll('td');
        tds.forEach(function(td) {
            td.classList.remove('selected');
        });
        
        if (input.checked) {
            labels[index].parentNode.classList.add('selected');
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        var tds = document.querySelectorAll('td');
        tds.forEach(function(td) {
            td.classList.remove('selected');
        });
        inputs.forEach(function(input) {
            input.checked = false;
        });
    }
});

var takenSlots = document.querySelectorAll('.taken');
takenSlots.forEach(function(slot) {
    var label = slot.querySelector('label');
    if (label) {
        var p = document.createElement('p');
        p.textContent = label.textContent;
        slot.replaceChild(p, label);
    }
});

function updateAvailableSlots() {
    const totalSlots = document.querySelectorAll('#checkboxes input[type="radio"]').length;
    const reservedSlots = document.querySelectorAll('.taken').length; 
    const availableSlots = totalSlots - reservedSlots;
    const availableSlotsElement = document.querySelector('h2');
    if (availableSlotsElement) {
        availableSlotsElement.innerText = `${availableSlots} Slots Available`;
    }
}

updateAvailableSlots();

var today = new Date();
var nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);
var formattedToday = today.toISOString().substr(0, 10);
var formattedNextWeek = nextWeek.toISOString().substr(0, 10);
var dateInput = document.querySelector('input[type="date"]');
dateInput.value = formattedToday;
dateInput.setAttribute('min', formattedToday);
dateInput.setAttribute('max', formattedNextWeek);

const currentTime = new Date();
const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
var timeInput = document.querySelector('input[type="time"]');
timeInput.value = formattedTime;

const reserveButton = document.getElementById("reserve");
const slotRadios = document.querySelectorAll('input[name="slot"]');
    
function isSlotSelected() {
    for (const radio of slotRadios) {
        if (radio.checked) {
            return true;
        }
    }
    return false;
}


for (const radio of slotRadios) {
    radio.addEventListener("change", updateReserveButtonState);
}

function timeTravel() {
    const selectedDateTime = new Date(dateInput.value + 'T' + timeInput.value);
    const currentDateTime = new Date();
    const graceperiod = new Date(currentDateTime.getTime() - 5*60000);
    return selectedDateTime < graceperiod;
}

function updateReserveButtonState() {
    if (isSlotSelected() && !timeTravel()) {
        reserveButton.disabled = false;
        reserveButton.style.cursor = "pointer";
    } else {
        reserveButton.disabled = true;
        reserveButton.style.cursor = "not-allowed";
    }
}

reserveButton.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById("login").checked = true;

    const selectedSlot = Array.from(slotRadios).find(radio => radio.checked).id;
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    // Extract room name from the current URL
    const roomName = window.location.pathname.split('/').pop().split('.')[0];

    const reservationData = {
        slot: selectedSlot,
        date: selectedDate,
        time: selectedTime,
        room: roomName // Include the room name in the reservation data
    };

    fetch('/reserve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

const reservedetailsElements = document.querySelectorAll('td.taken .reservedetails');
var zIndex = 1;

reservedetailsElements.forEach(details => {
    const clonedDetails = details.cloneNode(true);
    clonedDetails.style.position = 'fixed';
    clonedDetails.classList.add('cloned-reservedetails');
    document.body.appendChild(clonedDetails);
    const parentTd = details.closest('td');

    let isHoveringTd = false;
    let isHoveringDetails = false;
    let hideTimeout;

    parentTd.addEventListener('mouseenter', function() {
        isHoveringTd = true;
        showClonedDetails();
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
    });

    parentTd.addEventListener('mouseleave', function() {
        isHoveringTd = false;
        startHideTimer();
    });

    clonedDetails.addEventListener('mouseenter', function() {
        isHoveringDetails = true;
        clonedDetails.style.zIndex = ++zIndex;
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
    });

    clonedDetails.addEventListener('mouseleave', function() {
        isHoveringDetails = false;
        startHideTimer();
    });

    function showClonedDetails() {
        const rect = parentTd.getBoundingClientRect();
        clonedDetails.style.left = `${rect.left}px`;
        clonedDetails.style.top = `calc(${rect.top}px - 1vh)`;
        clonedDetails.style.display = 'flex';
        clonedDetails.style.zIndex = ++zIndex;
    }

    function startHideTimer() {
        hideTimeout = setTimeout(() => {
            if (!isHoveringTd && !isHoveringDetails) {
                clonedDetails.style.display = 'none';
            }
        }, 1000);
    }
});

if (logged){
    reserveButton.addEventListener('click', function() {
        document.querySelector('form').submit();
        window.open('/confirm', '_self');
    });
}