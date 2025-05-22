
console.log("✅ JS file loaded!");

let isDragging = false;
let startX = 0;
let startY = 0;
let rotationX = 0;
let rotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let totalDelta = 0;
let isFlipped = false;

const flipper = document.getElementById('flipper');
const flipCard = document.getElementById('flipCard');
const threshold = 10; // pixels to count as drag

function updateTransform() {
    flipper.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
}

// START DRAG
function startDrag(x, y) {
    isDragging = true;
    startX = x;
    startY = y;
    totalDelta = 0;
}

// MOVE DRAG
function moveDrag(x, y) {
    if (!isDragging) return;
    const deltaX = x - startX;
    const deltaY = y - startY;
    totalDelta += Math.abs(deltaX) + Math.abs(deltaY);

    rotationY = currentRotationY + deltaX * 0.5;
    rotationX = currentRotationX - deltaY * 0.5;

    updateTransform();
}

// END DRAG
function endDrag(x, y) {
    if (!isDragging) return;
    isDragging = false;

    currentRotationX = rotationX;
    currentRotationY = rotationY;

    if (totalDelta < threshold) {
        // Minimal movement: flip the card
        isFlipped = !isFlipped;
        currentRotationY = isFlipped ? 180 : 0;
        currentRotationX = 0;
        rotationY = currentRotationY;
        rotationX = currentRotationX;
        updateTransform();
    }
}

// MOUSE EVENTS
flipCard.addEventListener('mousedown', (e) => {
    startDrag(e.clientX, e.clientY);
});
document.addEventListener('mousemove', (e) => {
    moveDrag(e.clientX, e.clientY);
});
document.addEventListener('mouseup', (e) => {
    endDrag(e.clientX, e.clientY);
});

// TOUCH EVENTS
flipCard.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
});
document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
});
document.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    endDrag(startX, startY);

    // If there was no drag, toggle flip
    if (totalDelta < threshold) {
        isFlipped = !isFlipped;
        currentRotationY = isFlipped ? 180 : 0;
        currentRotationX = 0;
        rotationY = currentRotationY;
        rotationX = currentRotationX;
        updateTransform();
    }
});

function togglePanel() {
    const panel = document.getElementById('menuPanel');
    const button = document.querySelector('.toggle-button');
    panel.classList.toggle('visible');
    button.classList.toggle('active');
    // Adjust the menu width to match the button width
    const buttonWidth = button.offsetWidth;
    panel.style.maxWidth = `${buttonWidth}px`;
}

function toggleFullscreen(button) {
  const icon = button.querySelector('i');

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      icon.classList.remove('fa-expand');
      icon.classList.add('fa-times');
    });
  } else {
    document.exitFullscreen().then(() => {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-expand');
    });
  }
}




  const popup = document.getElementById('popup');

  function closePopup() {
    popup.classList.remove('show');
  }

  window.addEventListener('load', () => {
    popup.classList.add('show');
    setTimeout(() => {
      closePopup();
    }, 4000); // auto close after 4 seconds
  });




function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

  // Show QR popup and overlay when icon is clicked
  document.getElementById('qrCodeIcon').addEventListener('click', function() {
    document.getElementById('qrPopup').classList.add('show');
    document.getElementById('overlay').style.display = 'block'; // Show overlay
  });

  // Close QR popup and hide overlay when X icon is clicked
  function closeQrPopup() {
    document.getElementById('qrPopup').classList.remove('show');
    document.getElementById('overlay').style.display = 'none'; // Hide overlay
  }

console.log("✅ End JS file loaded!");
