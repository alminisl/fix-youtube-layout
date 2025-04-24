// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleShorts");
  const thumbnailSlider = document.getElementById("thumbnail-slider");
  const thumbnailSizeValue = document.getElementById("thumbnail-size-value");
  const inPageSliderToggle = document.getElementById("toggleInPageSlider");

  // Load the current state
  chrome.storage.sync.get(
    { hideShorts: true, thumbnailWidth: 220, useInPageSlider: false },
    ({ hideShorts, thumbnailWidth, useInPageSlider }) => {
      toggle.checked = hideShorts;
      thumbnailSlider.value = thumbnailWidth;
      thumbnailSizeValue.textContent = `${thumbnailWidth}px`;
      inPageSliderToggle.checked = useInPageSlider;
    }
  );

  // Listen for shorts toggle changes
  toggle.addEventListener("change", () => {
    const hide = toggle.checked;
    chrome.storage.sync.set({ hideShorts: hide });

    // Send message to active tab only if we're on YouTube
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
        chrome.tabs
          .sendMessage(tabs[0].id, { type: "TOGGLE_SHORTS", hide })
          .catch((err) => console.log("Tab might not be ready yet:", err));
      }
    });
  });

  // Listen for thumbnail size slider changes
  thumbnailSlider.addEventListener("input", () => {
    const newWidth = parseInt(thumbnailSlider.value, 10);
    thumbnailSizeValue.textContent = `${newWidth}px`;
    chrome.storage.sync.set({ thumbnailWidth: newWidth });

    // Send message to active tab only if we're on YouTube
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            type: "UPDATE_THUMBNAIL_SIZE",
            width: newWidth,
          })
          .catch((err) => console.log("Tab might not be ready yet:", err));
      }
    });
  });

  // Listen for in-page slider toggle changes
  inPageSliderToggle.addEventListener("change", () => {
    const useInPageSlider = inPageSliderToggle.checked;
    chrome.storage.sync.set({ useInPageSlider });

    // Send message to active tab only if we're on YouTube
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            type: "TOGGLE_IN_PAGE_SLIDER",
            useInPageSlider,
          })
          .catch((err) => console.log("Tab might not be ready yet:", err));
      }
    });
  });
});
