const FALLBACK_COLOR = "rgb(229, 231, 235)";
const colorCache = new Map();

export function getAverageColor(src) {
    if (colorCache.has(src)) {
        return Promise.resolve(colorCache.get(src));
    }
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const size = 8;
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, size, size);
            const { data } = ctx.getImageData(0, 0, size, size);
            let r = 0, g = 0, b = 0;
            const pixelCount = data.length / 4;
            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }
            const color = `rgb(${Math.round(r / pixelCount)}, ${Math.round(g / pixelCount)}, ${Math.round(b / pixelCount)})`;
            colorCache.set(src, color);
            resolve(color);
        };
        img.onerror = () => resolve(FALLBACK_COLOR);
        img.src = src;
    });
}
