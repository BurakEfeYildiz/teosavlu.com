const popup = document.getElementById('campaign-popup');
const popupImage = document.getElementById('popup-image');

const popupCandidates = [
    'pop-up.jpg',
    'pop-up.jpeg',
    'pop-up.png',
    'pop-up.webp',
    'popup.jpg',
    'popup.jpeg',
    'popup.png',
    'popup.webp'
];

function tryLoadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

async function loadFirstAvailablePopup() {
    const cacheBuster = `v=${Date.now()}`;

    for (const filename of popupCandidates) {
        const candidate = `${filename}?${cacheBuster}`;
        const result = await tryLoadImage(candidate);
        if (result) {
            return result;
        }
    }

    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!popup || !popupImage) {
        return;
    }

    const popupSrc = await loadFirstAvailablePopup();
    if (!popupSrc) {
        return;
    }

    popupImage.src = popupSrc;

    setTimeout(() => {
        popup.style.display = 'flex';
    }, 100);
});

function closePopup() {
    if (!popup) {
        return;
    }

    popup.style.display = 'none';
}

if (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target.id === 'campaign-popup') {
            closePopup();
        }
    });
}

window.closePopup = closePopup;
