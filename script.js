const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('#projects .project-card');
const profilePhoto = document.querySelector('.profile-photo');
const avatarInitials = document.querySelector('.avatar-initials');
const spotlight = document.querySelector('.spotlight');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

if (profilePhoto && avatarInitials) {
  const hideFallback = () => {
    avatarInitials.style.display = 'none';
  };

  const showFallback = () => {
    profilePhoto.style.display = 'none';
    avatarInitials.style.display = 'inline-flex';
  };

  if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
    hideFallback();
  } else {
    profilePhoto.addEventListener('load', hideFallback, { once: true });
    profilePhoto.addEventListener('error', showFallback, { once: true });
  }
}

if (spotlight) {
  let rafId = null;
  const current = { x: 50, y: 28 };
  const target = { x: 50, y: 28 };

  const updateSpotlight = (x, y) => {
    spotlight.style.setProperty('--spot-x', `${x}%`);
    spotlight.style.setProperty('--spot-y', `${y}%`);
  };

  const animateSpotlight = () => {
    current.x += (target.x - current.x) * 0.08;
    current.y += (target.y - current.y) * 0.08;
    updateSpotlight(current.x, current.y);

    if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
      rafId = requestAnimationFrame(animateSpotlight);
    } else {
      rafId = null;
    }
  };

  const setTarget = (event) => {
    target.x = (event.clientX / window.innerWidth) * 100;
    target.y = (event.clientY / window.innerHeight) * 100;

    if (!rafId) {
      rafId = requestAnimationFrame(animateSpotlight);
    }
  };

  window.addEventListener('pointermove', (event) => {
    setTarget(event);
  });

  window.addEventListener('pointerdown', (event) => {
    setTarget(event);

    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
}
