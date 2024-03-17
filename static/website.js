const imageInput = document.getElementById('image-input');
const outputImage = document.getElementById('output-image');
const chooseFile = document.getElementsByClassName("custom-file-label");
const progressBar = document.getElementById('progress-bar');
const downloadButton = document.getElementById('download-button');
progressBar.style.display = 'none';


imageInput.addEventListener('change', handleImageUpload);

downloadButton.addEventListener('click', downloadImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        progressBar.style.display = 'block';
        Swal.fire({
        title: 'Success!',
        text: 'Thank you for uploading your file. Please wait...',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000
        })
        chooseFile[0].innerText = file.name;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5
            progressBar.value = progress;
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.output_image) {
                outputImage.src = data.output_image;
                outputImage.style.display = 'block';
                resetProgressBar();
                downloadButton.style.display = 'block';
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function resetProgressBar() {
    progressBar.style.display = 'none';
    chooseFile[0].innerText = "Choose New Image"
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = outputImage.src;
    link.download = 'output-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
