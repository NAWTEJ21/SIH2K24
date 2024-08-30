// renderer.js

const { ipcRenderer } = require('electron');

function downloadImage() {
    const endpoint = document.getElementById('wms-endpoint').value;
    ipcRenderer.send('download-image', endpoint);
}

ipcRenderer.on('image-downloaded', (event, imagePath) => {
    const imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = `<img src="file://${imagePath}" alt="Downloaded Image">`;
});

function performSegmentation() {
    ipcRenderer.send('perform-segmentation');
}

ipcRenderer.on('segmentation-complete', (event, segmentedImagePath) => {
    const resultContainer = document.getElementById('segmentation-result');
    resultContainer.innerHTML = `<img src="file://${segmentedImagePath}" alt="Segmented Image">`;
});

ipcRenderer.on('error', (event, message) => {
    alert(message);
});
