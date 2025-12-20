document.addEventListener("DOMContentLoaded", () => {
  const div = document.createElement("div");
  div.className = "by_xmy_plugin";
  document.body.appendChild(div);
})
console.log("Forwarding script is running: " + window.location.href);

window.addEventListener("message", async (event) => {
  console.debug("Content script received an event:", event);

  if (event.source !== window) return;
  if (!["XMY_PREPARE_PAGE"].includes(event.data?.type)) return;
  console.log(
    "Content script received an event, redicting to background.",
    event
  );
  chrome.runtime.sendMessage(event.data, (response) => {
    window.postMessage(response);
  });
});
