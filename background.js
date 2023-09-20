chrome.action.onClicked.addListener(() => {
  const localStorage = chrome.storage.local;
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const host = url.host;

    const hosts = (await localStorage.get(["hosts"]))["hosts"] ?? [];

    if (hosts.includes(host)) {
      hosts.splice(hosts.indexOf(host), 1);
    } else {
      hosts.push(host);
    }

    await localStorage.set({ hosts: hosts });
    chrome.tabs.reload(tab.id);
  });
});
