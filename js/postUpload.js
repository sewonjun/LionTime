// 1. 업로드 이미지 미리보기 (image upload preview)
function readImage(input) {
    const container = document.querySelector('.img-container');

    // 업로드 다시할 떄 기존 li태그 삭제
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    if(input.files.length) {
        console.log(input.files);

        const fileArr = Array.from(input.files);
        const row = document.createElement('li');
        row.classList.add('row');

        fileArr.forEach((file, index) => {
            const reader = new FileReader();
            const imgDiv = document.createElement('div');
            const btnX = document.createElement('button');
            const img = document.createElement('img');
            img.classList.add('image');

            const label = document.createElement('label');
            label.classList.add('image-label');

            imgDiv.appendChild(img);
            imgDiv.append(label);
            imgDiv.appendChild(btnX);

            reader.onload = e => {
                img.src = e.target.result;
                if(input.files.length > 1) {
                    imgDiv.style.width = "168px";
                    imgDiv.style.height = "126px";
                } else {
                    imgDiv.style.width = "304px";
                    imgDiv.style.height = "228px";
                }
            }

            console.log(file.name);
            row.appendChild(imgDiv);
            reader.readAsDataURL(file);
        });
        container.appendChild(row);
    }
}

const inputImage = document.querySelector('#img-upload')
inputImage.addEventListener('change', e => {
    readImage(e.target);
})


// 2. 업로드할 이미지 제거
