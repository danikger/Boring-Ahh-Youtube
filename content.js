let extensionOn = true;

chrome.storage.sync.get('extensionOn', (data) => {
    extensionOn = data.extensionOn;
    if (extensionOn) {
        // Add the iframe
        if (!document.querySelector('#iframe-container')) {
            addIframe();
        }
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.extensionOn) {
        extensionOn = changes.extensionOn.newValue;
        if (extensionOn) {
            // Add the iframe
            if (!document.querySelector('#iframe-container')) {
                addIframe();
            }
        } else {
            // Remove the iframe
            const iframeContainer = document.querySelector('#iframe-container');
            if (iframeContainer) {
                iframeContainer.remove();
            }
        }
    }
});

/**
 * Adds an iframe with a YouTube video to the page.
 */
function addIframe() {
    const youtubeVideoUrl = "https://www.youtube.com/embed/vnM6WJrWdkk?si=a3kVOB2ToGM7Y4sS&t=738&autoplay=1&mute=1";

    // Create div element
    const div = document.createElement("div");
    div.id = "iframe-container";
    div.style.overflow = "hidden";
    div.style.width = "45%";
    div.style.height = "100%";

    // Create iframe element
    const iframe = document.createElement("iframe");
    iframe.width = "300%";
    iframe.height = "100%";
    iframe.src = youtubeVideoUrl;
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    iframe.style.position = "relative";
    iframe.style.overflow = "hidden";
    iframe.style.left = "-100%";

    // Append iframe to the div
    div.appendChild(iframe);

    // Find the main video player and insert the new div with iframe inside it
    const videoContainer = document.querySelector(".html5-video-container");
    videoContainer.parentNode.insertBefore(div, videoContainer.nextSibling);
    videoContainer.style.display = "inline-block";
    videoContainer.style.width = "100%";
    videoContainer.style.display = "relative";

    const videoPlayer = document.querySelector(".html5-video-player");
    videoPlayer.style.display = "flex";

    const mainVideo = document.querySelector(".html5-main-video");
    mainVideo.style.width = "100%";
    mainVideo.style.maxWidth = "100%";
    mainVideo.style.left = "0px";

    // Check for changes in the page and reset the width to 100% and left to 0px
    const observer = new MutationObserver(() => {
        mainVideo.style.width = "100%";
        mainVideo.style.left = "0px";
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });


}

