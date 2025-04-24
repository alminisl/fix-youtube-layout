function neutralizeYtGridWidthVar() {
  const varFix = document.createElement("style");
  varFix.id = "yt-var-override";
  varFix.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-item-row-usable-width: auto !important;
      width: 100% !important;
    }

    ytd-rich-grid-media {
      max-width: unset !important;
    }
  `;
  document.head.appendChild(varFix);
}

function applyLayout(thumbnailWidth) {
  document.getElementById("yt-layout-style")?.remove();

  const style = document.createElement("style");
  style.id = "yt-layout-style";
  style.textContent = `
    #contents.style-scope.ytd-rich-grid-renderer {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(${thumbnailWidth}px, 1fr)) !important;
      gap: 20px !important;
      padding: 16px;
      justify-content: center;
    }

    ytd-rich-item-renderer {
    max-width: ${thumbnailWidth}px !important;
    background: #1f1f1f;
    border-radius: 0px !important; /* 👈 sharp edges */
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

     #avatar-container {
      margin-left: 8px !important; /* adjust to taste */
      display: flex;
      align-items: center;
    }

    

  div#thumbnail.style-scope.ytd-rich-grid-media {
    position: relative !important;
  }


.badge-style-type-live-now-alternate {
    position: absolute !important;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    background-color: red !important;
    color: white !important;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    display: flex !important;
    align-items: center;
    gap: 4px;
    pointer-events: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

  .badge-style-type-live-now-alternate yt-icon {
    width: 16px;
    height: 16px;
    color: white !important;
  }

  .badge-style-type-live-now-alternate p {
    margin: 0 !important;
    font-size: 12px;
    font-weight: 600;
  }

    ytd-rich-item-renderer {
    max-width: ${thumbnailWidth}px !important;
    background: #1f1f1f;
    border-radius: 0px !important;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    transform-origin: center center;
  }

  ytd-rich-item-renderer:hover {
    transform: scale(1.035); /* 👈 pop-out scale */
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15); /* subtle glow */
    z-index: 10;
  }

  ytd-rich-section-renderer[is-shorts] ytd-rich-item-renderer {
  max-width: 220px !important;
  border-radius: 0 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transform: none;
  transition: transform 0.2s;
}
  `;
  document.head.appendChild(style);
  console.log(`Applied layout with thumbnail width: ${thumbnailWidth}px`);
}

// New function to enhance Shorts display
function enhanceShortsDisplay(thumbnailWidth) {
  console.log("Enhancing shorts display with thumbnail width:", thumbnailWidth);

  const shortsStyleId = "yt-shorts-enhance-style";
  let styleElement = document.getElementById(shortsStyleId);

  // Remove existing style if it exists
  if (styleElement) {
    styleElement.remove();
  }

  styleElement = document.createElement("style");
  styleElement.id = shortsStyleId;
  styleElement.textContent = `
    /* Convert Shorts shelf to grid */
    ytd-rich-section-renderer[is-shorts] #contents.ytd-rich-grid-renderer,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] #items,
    ytd-reel-shelf-renderer #items {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(${thumbnailWidth}px, 1fr)) !important;
      gap: 20px !important;
      padding: 16px !important;
      overflow: visible !important;
      max-height: none !important;
    }
    
    /* Fix Shorts items */
    ytd-rich-section-renderer[is-shorts] ytd-rich-item-renderer,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer,
    ytd-reel-shelf-renderer ytd-reel-item-renderer {
      max-width: ${thumbnailWidth}px !important;
      background: #1f1f1f !important;
      border-radius: 0px !important;
      overflow: hidden !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      transform-origin: center center !important;
      margin: 0 !important;
      height: auto !important;
      width: 100% !important;
    }
    
    /* Hover effect for Shorts items */
    ytd-rich-section-renderer[is-shorts] ytd-rich-item-renderer:hover,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer:hover,
    ytd-reel-shelf-renderer ytd-reel-item-renderer:hover {
      transform: scale(1.035) !important;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15) !important;
      z-index: 10 !important;
    }
    
    /* Fix Shorts thumbnail images to be proper aspect ratio */
    ytd-rich-section-renderer[is-shorts] #thumbnail.ytd-thumbnail,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] #thumbnail.ytd-thumbnail,
    ytd-reel-shelf-renderer #thumbnail.ytd-thumbnail {
      aspect-ratio: 16 / 9 !important;
      height: auto !important;
      width: 100% !important;
    }
    
    /* Remove the scrollbar and scroll buttons */
    ytd-rich-section-renderer[is-shorts] #scroll-container,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] #scroll-container,
    ytd-reel-shelf-renderer #scroll-container {
      overflow: visible !important;
    }
    
    ytd-rich-section-renderer[is-shorts] .scroll-button,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] .scroll-button,
    ytd-reel-shelf-renderer .scroll-button {
      display: none !important;
    }
    
    /* Adjust title and metadata for Shorts */
    ytd-rich-section-renderer[is-shorts] #video-title,
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts] #video-title,
    ytd-reel-shelf-renderer #video-title {
      font-size: 14px !important;
      line-height: 1.4 !important;
      margin: 10px 10px 5px 10px !important;
      max-height: none !important;
      overflow: visible !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
    }
    
    /* Force shorts section to expand */
    ytd-rich-section-renderer[is-shorts],
    ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts],
    ytd-reel-shelf-renderer {
      max-height: none !important;
      overflow: visible !important;
    }
  `;

  document.head.appendChild(styleElement);
}

function toggleShortsVisibility(hide) {
  console.log(`Toggling shorts visibility, hide=${hide}`);

  // Use multiple selectors to target shorts content more reliably
  const shortsSelectors = [
    "ytd-rich-section-renderer[is-shorts]",
    "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts]",
    "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
    "ytd-rich-section-renderer:has(span:contains('Shorts'))",
    "ytd-shelf-renderer:has(span:contains('Shorts'))",
    "ytd-reel-shelf-renderer",
  ];

  // Also add a style to hide shorts in CSS for more persistent hiding
  const shortsStyleId = "yt-shorts-hide-style";
  let styleElement = document.getElementById(shortsStyleId);

  if (hide) {
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = shortsStyleId;
      styleElement.textContent = `
        /* Hide various shorts containers */
        ytd-rich-section-renderer[is-shorts],
        ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts],
        ytd-reel-shelf-renderer,
        ytd-shelf-renderer:has(span:contains('Shorts')),
        ytd-rich-section-renderer:has(span:contains('Shorts')) {
          display: none !important;
        }
        
        /* Hide shorts tab in navigation */
        ytd-mini-guide-entry-renderer[aria-label*="Shorts"],
        ytd-guide-entry-renderer[title*="Shorts"] {
          display: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  } else {
    // Remove the style if we're showing shorts
    if (styleElement) {
      styleElement.remove();
    }
  }

  // Also use direct DOM manipulation for immediate effect
  shortsSelectors.forEach((selector) => {
    try {
      document.querySelectorAll(selector).forEach((section) => {
        section.style.display = hide ? "none" : "";
      });
    } catch (error) {
      console.log(`Error with selector "${selector}":`, error);
    }
  });

  console.log(`Applied shorts visibility: hide=${hide}`);
}

// Fallback slider creation just in case the popup isn't working
function createSlider(initialWidth) {
  if (document.getElementById("yt-slider-control")) return;

  const slider = document.createElement("div");
  slider.id = "yt-slider-control";
  slider.innerHTML = `
    <label style="color:white">Thumbnail Size: <span id="yt-slider-value">${initialWidth}px</span></label>
    <input type="range" min="160" max="340" value="${initialWidth}" id="yt-slider" />
  `;

  // Apply some styling to make it look better
  slider.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1f1f1f;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  document.body.appendChild(slider);

  const input = slider.querySelector("#yt-slider");
  const value = slider.querySelector("#yt-slider-value");

  input.addEventListener("input", () => {
    const newWidth = parseInt(input.value, 10);
    value.textContent = `${newWidth}px`;
    applyLayout(newWidth);
    chrome.storage.sync.set({ thumbnailWidth: newWidth });
  });
}

// Initialize everything
function init() {
  console.log("YouTube Layout Fixer: Initializing...");
  chrome.storage.sync.get(
    { thumbnailWidth: 220, shortsMode: "hide", useInPageSlider: false },
    ({ thumbnailWidth, shortsMode, useInPageSlider }) => {
      neutralizeYtGridWidthVar();
      applyLayout(thumbnailWidth);

      // Handle shorts based on selected mode
      updateShortsDisplayMode(shortsMode, thumbnailWidth);

      // Create fallback slider only if useInPageSlider is true
      if (useInPageSlider) {
        createSlider(thumbnailWidth);
      }

      console.log(
        `YouTube Layout Fixer: Initialized with width=${thumbnailWidth}, shortsMode=${shortsMode}`
      );
    }
  );
}

// New function to handle different shorts display modes
function updateShortsDisplayMode(mode, thumbnailWidth) {
  console.log(`Updating shorts display mode to: ${mode}`);

  // Remove any existing shorts styles
  document.getElementById("yt-shorts-hide-style")?.remove();
  document.getElementById("yt-shorts-enhance-style")?.remove();

  // Show all shorts elements first (reset)
  const shortsSelectors = [
    "ytd-rich-section-renderer[is-shorts]",
    "ytd-rich-section-renderer ytd-rich-shelf-renderer[is-shorts]",
    "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
    "ytd-rich-section-renderer:has(span:contains('Shorts'))",
    "ytd-shelf-renderer:has(span:contains('Shorts'))",
    "ytd-reel-shelf-renderer",
  ];

  shortsSelectors.forEach((selector) => {
    try {
      document.querySelectorAll(selector).forEach((section) => {
        section.style.display = ""; // Reset display
      });
    } catch (error) {
      console.log(`Error with selector "${selector}":`, error);
    }
  });

  // Apply appropriate style based on mode
  switch (mode) {
    case "hide":
      toggleShortsVisibility(true);
      break;

    case "enhance":
      toggleShortsVisibility(false); // Make sure they're visible
      enhanceShortsDisplay(thumbnailWidth);
      break;

    case "default":
    default:
      // Do nothing, just show shorts with YouTube's default styling
      break;
  }
}

// Set up message listener with proper response
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.type === "TOGGLE_SHORTS") {
    toggleShortsVisibility(message.hide);
    sendResponse({ success: true });
  } else if (message.type === "UPDATE_THUMBNAIL_SIZE") {
    console.log(`Updating thumbnail size to ${message.width}px`);
    applyLayout(message.width);

    // Also update shorts display if in enhanced mode
    chrome.storage.sync.get({ shortsMode: "hide" }, ({ shortsMode }) => {
      if (shortsMode === "enhance") {
        enhanceShortsDisplay(message.width);
      }
    });

    sendResponse({ success: true });
  } else if (message.type === "UPDATE_SHORTS_MODE") {
    console.log(`Updating shorts mode to ${message.mode}`);
    chrome.storage.sync.get({ thumbnailWidth: 220 }, ({ thumbnailWidth }) => {
      updateShortsDisplayMode(message.mode, thumbnailWidth);
    });
    sendResponse({ success: true });
  } else if (message.type === "TOGGLE_IN_PAGE_SLIDER") {
    console.log(`Toggle in-page slider: ${message.useInPageSlider}`);

    if (message.useInPageSlider) {
      // Get current width setting and create the slider
      chrome.storage.sync.get({ thumbnailWidth: 220 }, ({ thumbnailWidth }) => {
        createSlider(thumbnailWidth);
      });
    } else {
      // Remove the slider if it exists
      const slider = document.getElementById("yt-slider-control");
      if (slider) {
        slider.remove();
      }
    }

    sendResponse({ success: true });
  }

  // Return true to indicate you wish to send a response asynchronously
  return true;
});

// Add listener for YouTube navigation (SPA)
document.addEventListener("yt-navigate-finish", function () {
  console.log("YouTube navigation detected, re-initializing layout...");

  // Wait a moment for YouTube to render its content
  setTimeout(() => {
    chrome.storage.sync.get(
      { thumbnailWidth: 220, shortsMode: "hide" },
      ({ thumbnailWidth, shortsMode }) => {
        applyLayout(thumbnailWidth);
        updateShortsDisplayMode(shortsMode, thumbnailWidth);
      }
    );
  }, 1000);
});
