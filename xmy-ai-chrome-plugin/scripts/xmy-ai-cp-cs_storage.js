const url = new URL(window.location.href);

chrome.storage.local.set({
  [`ls:${window.location.hostname}`]: JSON.stringify(localStorage)
});
