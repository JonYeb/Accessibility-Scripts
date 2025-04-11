function setMissingLinkTitles() {
    const LINK_TO_SECTION = 'Link to Section';
    const DEFAULT_LINK_TITLE = 'Link';

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.hasAttribute('title')) {
            const img = link.querySelector('img');
            if (img && img.hasAttribute('alt')) {
                link.setAttribute('title', img.getAttribute('alt'));
            } else {
                const href = link.getAttribute('href');
                if (href) {
                    if (href.startsWith('#')) {
                        link.setAttribute('title', `${LINK_TO_SECTION} ${href.substring(1)}`);
                    } else {
                        try {
                            const url = new URL(href, window.location.origin);
                            const pathParts = url.pathname.split('/').filter(part => part !== '');
                            if (pathParts.length > 0) {
                                link.setAttribute('title', pathParts[pathParts.length - 1].replace(/[-_]/g, ' '));
                            } else {
                                link.setAttribute('title', url.hostname);
                            }
                        } catch (e) {
                            // If it's not a valid URL, treat it as a relative path
                            const pathParts = href.split('/').filter(part => part !== '');
                            if (pathParts.length > 0) {
                                link.setAttribute('title', pathParts[pathParts.length - 1].replace(/[-_]/g, ' '));
                            } else {
                                link.setAttribute('title', DEFAULT_LINK_TITLE);
                            }
                        }
                    }
                } else {
                    link.setAttribute('title', DEFAULT_LINK_TITLE);
                }
            }
        }
    });
}

setMissingLinkTitles();