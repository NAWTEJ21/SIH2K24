// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('download-image', async (event, wmsUrl) => {
    try {
        const response = await axios.post('http://localhost:5000/download_image', { wms_url: wmsUrl });
        const imagePath = response.data.path;
        event.sender.send('image-downloaded', imagePath);
    } catch (error) {
        console.error('Error downloading image:', error);
        event.sender.send('error', 'Failed to download image from WMS.');
    }
});

ipcMain.on('perform-segmentation', async (event) => {
    try {
        const response = await axios.get('http://localhost:5000/perform_segmentation');
        const segmentedImagePath = response.data.path;
        event.sender.send('segmentation-complete', segmentedImagePath);
    } catch (error) {
        console.error('Error performing segmentation:', error);
        event.sender.send('error', 'Failed to perform segmentation.');
    }
});
