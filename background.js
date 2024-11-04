chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.extensionOn && changes.extensionOn.newValue === true) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        });
      }
    });
  }
});
