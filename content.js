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
  `;
  document.head.appendChild(style);
}

function createSlider(initialWidth = 220) {
  const slider = document.createElement("div");
  slider.id = "yt-slider-control";
  slider.innerHTML = `
    <label style="color:white">Thumbnail Size: <span id="yt-slider-value">${initialWidth}px</span></label>
    <input type="range" min="160" max="340" value="${initialWidth}" id="yt-slider" />
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

chrome.storage.sync.get({ thumbnailWidth: 220 }, ({ thumbnailWidth }) => {
  neutralizeYtGridWidthVar();
  applyLayout(thumbnailWidth);
  createSlider(thumbnailWidth);
});
