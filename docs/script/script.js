const notAvailText = document.createElement('i');
notAvailText.textContent = 'Available for Firefox only';
notAvailText.className = 'not-firefox';
const addButton = document.querySelector('.add-button');

if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
  addButton.parentNode.insertBefore(notAvailText, addButton.nextSibling);
  addButton.style.display = 'none';
}
