(async () => {
  const hosts = (await chrome.storage.local.get(["hosts"]))["hosts"] ?? [];
  if (hosts.includes(document.location.host)) {
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = "only light";
    document.head.appendChild(meta);

    let interval;
    interval = setInterval(() => {
      const colorMode = document.documentElement.getAttribute("data-color-mode");
      if (colorMode != "light only" && colorMode != "dark") {
        document.documentElement.setAttribute("data-color-mode", "light only");
        document.body.style.colorScheme = "light only";
      } else {
        clearInterval(interval);
      }
    }, 10);
  }
})();
