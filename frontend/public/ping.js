(function () {
  function setup() {
    "use strict";

    let API_HOST = document.getElementById("api-url").value;

    const lastOutput = document.getElementById("last-output");
    const logElement = document.getElementById("request-logs");

    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", function () {
      API_HOST = document.getElementById("api-url").value;
      logElement.innerText = `API Host: ${API_HOST}\n`;
      lastOutput.innerText = "";
    });

    function ping() {
      fetch(`${API_HOST}/`)
        .then(async (response) => {
          const data = await response.text();
          const json = JSON.parse(data);
          const formatted = JSON.stringify(json, null, 2);
          const now = new Date().toLocaleString();
          logElement.innerText += `[${now}] ✅ Got healthcheck response: ${data}\n`;
          const isDifferent = lastOutput.innerText !== formatted;
          lastOutput.innerText = formatted;
          if (isDifferent) {
            lastOutput.classList.add("changed");
            setTimeout(() => lastOutput.classList.remove("changed"), 50);
          }
        })
        .catch(() => {
          const now = new Date().toLocaleString();
          logElement.innerText += `[${now}] ❌ API is down\n`;
          lastOutput.innerText = "";
        })
        .finally(() => {
          const logContainer = logElement.parentElement;
          // Update scroll position if not currently scrolled up
          if (
            logContainer.scrollHeight - logContainer.scrollTop <
            logContainer.clientHeight + 30
          ) {
            logContainer.scrollTop = logContainer.scrollHeight;
          }
        });
    }

    logElement.innerText = `API Host: ${API_HOST}\n`;

    return ping;
  }

  let interval;

  window.addEventListener("DOMContentLoaded", function () {
    const ping = setup();
    interval = setInterval(ping, 1000);
  });

  window.addEventListener("beforeunload", function () {
    clearInterval(interval);
  });
})();
