function setMissingImageAltText() {
    const DEFAULT_ALT_TEXT = "Image"; // Default alt text if no filename is available
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        if (!img.alt) {
            const src = img.src;
            if (src) {
                const filename = src.split('/').pop().split('?')[0]; // Extract filename without query parameters
                const filenameWithoutExtension = filename.split('.').slice(0, -1).join('.'); // Remove extension
                const altText = filenameWithoutExtension.replace(/[-_]/g, ' ').replace(/(\d+)/g, '').trim(); // Replace hyphens/underscores with spaces, remove numbers and trim
                if (altText) {
                    img.alt = altText;
                } else {
                    img.alt = DEFAULT_ALT_TEXT;
                }
            } else {
                img.alt = DEFAULT_ALT_TEXT;
            }
        }
    });
}

setMissingImageAltText();