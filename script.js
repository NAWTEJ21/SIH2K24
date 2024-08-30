document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '';
        previewContainer.style.display = 'none';
    }
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to allow for processing

    const formData = new FormData(this);
    const status = document.getElementById('status');

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        status.textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
        status.textContent = 'Failed to upload image';
    });
});
