// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const thumbnailSlider = document.getElementById("thumbnail-slider");
  const thumbnailSizeValue = document.getElementById("thumbnail-size-value");
  const inPageSliderToggle = document.getElementById("toggleInPageSlider");
  const shortsDisplayMode = document.getElementById("shortsDisplayMode");

  // Load the current state
  chrome.storage.sync.get(
    {
      shortsMode: "hide",
      thumbnailWidth: 220,
      useInPageSlider: false,
    },
    ({ shortsMode, thumbnailWidth, useInPageSlider }) => {
      shortsDisplayMode.value = shortsMode || "hide";
      thumbnailSlider.value = thumbnailWidth;
      thumbnailSizeValue.textContent = `${thumbnailWidth}px`;
      inPageSliderToggle.checked = useInPageSlider;
    }
  );

  // Listen for shorts display mode changes
  shortsDisplayMode.addEventListener("change", () => {
    const mode = shortsDisplayMode.value;
    chrome.storage.sync.set({ shortsMode: mode });

    // Send message to active tab only if we're on YouTube
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            type: "UPDATE_SHORTS_MODE",
            mode: mode,
          })
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
