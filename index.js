let powerButton = document.getElementById('powerButton');
let statusBadge = document.getElementById('status');

chrome.storage.sync.get('extensionOn', (data) => {
  powerButton.style.fill = data.extensionOn ? "#2563eb" : "#d1d5db"; // Changes the color of the power button based on the state of the extension
});

powerButton.addEventListener('click', () => {
  chrome.storage.sync.get('extensionOn', (data) => {
    let newState = !data.extensionOn;
    chrome.storage.sync.set({ extensionOn: newState });
    powerButton.style.fill = newState ? "#2563eb" : "#d1d5db"; // Changes the color of the power button based on the state of the extension
  });
});

