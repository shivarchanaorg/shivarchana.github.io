// index.js

document.addEventListener('DOMContentLoaded', function () {
  const customCursor = document.getElementById('custom-cursor');

  document.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    // Update custom cursor position
    customCursor.style.transform = `translate(${x}px, ${y}px) rotate(${Date.now() / 100}deg)`;

    // Create and update cursor trail
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 50);
  });
});

