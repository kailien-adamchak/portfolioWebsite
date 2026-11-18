// Opens a project's pop-up when its card is clicked.
// A card with href="#lotus" opens <dialog id="lotus">. The address bar shows #lotus,
// so a link to projects.html#lotus opens straight to that project.

const openProject = (id) => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
};

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    const id = card.getAttribute('href').slice(1);
    history.replaceState(null, '', '#' + id);
    openProject(id);
  });
});

document.querySelectorAll('.project-modal').forEach((dialog) => {
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());

  // Clicking the dark area outside the pop-up closes it
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      const inside = event.clientX >= r.left && event.clientX <= r.right &&
                     event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) dialog.close();
    }
  });

  // Remove #id from the address bar when the pop-up closes (button, Esc or outside click)
  dialog.addEventListener('close', () => {
    history.replaceState(null, '', location.pathname + location.search);
  });
});

if (location.hash) openProject(location.hash.slice(1));

// Also open when a #project link is followed while already on this page
window.addEventListener('hashchange', () => {
  if (location.hash) openProject(location.hash.slice(1));
});

// Photo spots (<figure class="ph">): show the photo once it loads.
// Until then the spot is a blank box labelled with the filename it's waiting for.
document.querySelectorAll('.ph img').forEach((img) => {
  const spot = img.closest('.ph');
  spot.dataset.label = img.getAttribute('src').split('/').pop();
  const show = () => spot.classList.add('has-image');
  if (img.complete && img.naturalWidth) show();
  else img.addEventListener('load', show);
});
