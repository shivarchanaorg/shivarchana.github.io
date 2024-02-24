const customCursor = document.getElementById('custom-cursor');
let isCursorVisible = true;

document.addEventListener('DOMContentLoaded', function () {
  // Check if the device is a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // If the device is mobile, hide the custom cursor
  if (isMobile) {
    customCursor.style.display = 'none';
  }

  let prevX, prevY;
  let lastMoveTime = Date.now();

  document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const cursorSize = customCursor.clientWidth;

    // Update custom cursor position
    customCursor.style.left = `${x - cursorSize / 2}px`;
    customCursor.style.top = `${y - cursorSize / 2}px`;

    // Calculate movement speed
    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTime;
    const speedX = prevX ? Math.abs(x - prevX) / deltaTime : 0;
    const speedY = prevY ? Math.abs(y - prevY) / deltaTime : 0;
    const speed = Math.sqrt(speedX ** 2 + speedY ** 2);

    // Reset the visibility flag and show the cursor (if not on mobile)
    isCursorVisible = !isMobile;
    customCursor.style.display = isCursorVisible ? 'block' : 'none';

    // Increase trail quality by adding more trail elements
    const trailDensity = 20; // Adjust the density of trail elements (increase for more dots)
    for (let i = 0; i < trailDensity; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      const trailSize = 12; // Set the initial size of the trail

      // Calculate faster aging rate based on movement speed
      const agingRate = Math.max(1, speed * 0.5); // Adjust the aging rate factor as needed

      trail.style.width = `${trailSize}px`;
      trail.style.height = `${trailSize}px`;
      trail.style.left = `${x - trailSize / 2}px`;
      trail.style.top = `${y - trailSize / 2}px`;
      document.body.appendChild(trail);

      // Gradually decrease the size of each dot over time
      let age = 0;
      const updateSize = () => {
        age += agingRate;
        const scaledSize = Math.max(0, trailSize - age);
        trail.style.width = `${scaledSize}px`;
        trail.style.height = `${scaledSize}px`;

        if (scaledSize > 0) {
          requestAnimationFrame(updateSize);
        } else {
          trail.remove();
        }
      };

      setTimeout(() => {
        updateSize();
      }, 20 * i); // Adjust the timeout for the trail duration
    }

    prevX = x;
    prevY = y;
    lastMoveTime = currentTime;
  });

  document.addEventListener('mouseleave', function () {
    // Hide the cursor when the mouse leaves the window
    isCursorVisible = false;
    customCursor.style.display = 'none';
  });

  // Periodically check if the mouse is over the window and show the cursor (if not on mobile)
  setInterval(() => {
    if (isCursorVisible) {
      customCursor.style.display = 'block';
    }
  }, 1000); // Adjust the interval as needed
});

