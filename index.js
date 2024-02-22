const customCursor = document.getElementById('custom-cursor');

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const cursorSize = customCursor.clientWidth;

    // Update custom cursor position
    customCursor.style.left = `${x - cursorSize / 2}px`;
    customCursor.style.top = `${y - cursorSize / 2}px`;

    // Increase trail quality by adding more trail elements
    const trailDensity = 8; // Adjust the density of trail elements
    for (let i = 0; i < trailDensity; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      const trailSize = 12; // Set the size of the trail
      trail.style.width = `${trailSize}px`;
      trail.style.height = `${trailSize}px`;
      trail.style.left = `${x - trailSize / 2}px`;
      trail.style.top = `${y - trailSize / 2}px`;
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 80); // Adjust the timeout for the trail duration
    }
  });
});
