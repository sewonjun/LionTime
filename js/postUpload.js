// 1. 업로드 이미지 미리보기 (image upload preview)
let inpFile;

function readImage(input) {
    inpFile = input.files;
    const container = document.querySelector('.img-container');

    // 업로드 다시할 떄 기존 li태그 삭제
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    const fileArr = Array.from(input.files);
    console.log("fArr",fileArr);
    console.log("inp.file: ", input.files);

    if(fileArr.length > 3) {
        return alert("최대 3개까지 업로드 가능합니다");
    }
    
    if(input.files.length) {
        console.log(input.files);

        const row = document.createElement('div');
        row.classList.add('row');

        fileArr.forEach((file, index) => {
            const reader = new FileReader();
            const imgDiv = document.createElement('div');
            const btnX = document.createElement('div');
            const img = document.createElement('img');
            btnX.classList.add('btnX');
            img.classList.add('image');

            const label = document.createElement('label');
            label.classList.add('image-label');

            imgDiv.appendChild(img);
            imgDiv.append(label);
            imgDiv.appendChild(btnX);

            reader.onload = e => {
                img.src = e.target.result;
                if(input.files.length > 1) {
                    imgDiv.firstChild.style.width = "168px";
                    imgDiv.firstChild.style.height = "126px";
                } else {
                    imgDiv.firstChild.style.width = "304px";
                    imgDiv.firstChild.style.height = "228px";
                }
            }
            row.appendChild(imgDiv);
            reader.readAsDataURL(file);
        });
        container.appendChild(row);
    }

    // remove upload image
    const btnDel = document.querySelectorAll('.btnX');
    let btnDelArr = Array.prototype.slice.call(btnDel);
    btnDel.forEach((element) => {
        element.addEventListener('click', e => {
            const delIndex = btnDelArr.indexOf(element);
            element.parentNode.remove();
            fileArr.splice(delIndex, 1);
            btnDelArr.splice(delIndex, 1);
        })
    });

    if(fileArr.length === 1) {
        container.style.height = "228px";
        container.firstChild.style.width = "304px";
        container.firstChild.style.height = "228px";
    } else if(fileArr.length === 2) {
        container.style.height = "126px";
        container.firstChild.style.width = "344px";
        container.firstChild.style.height = "126px";
    } else if(fileArr.length === 3) {
        container.style.height = "126px";
        container.firstChild.style.width = "520px";
        container.firstChild.style.height = "126px";
    }

    imgSlider();
}

const inputImage = document.querySelector('#img-upload');
inputImage.addEventListener('change', e => {
    readImage(e.target);
});


// 2. 업로드 이미지 슬라이더
function imgSlider() {
    let slider = document.querySelector(".img-container");
    let innerSlider = document.querySelector(".row");
    let pressed = false;
    let startx;
    let x;
    
    slider.addEventListener("mousedown", e => {
        pressed = true;
        startx = e.offsetX - innerSlider.offsetLeft;
        slider.style.cursor = "grabbing";
    })
    
    slider.addEventListener("mouseenter", () => {
        slider.style.cursor = "grab";
    })
    
    slider.addEventListener("mouseup", () => {
        slider.style.cursor = "grab";
    })
    
    window.addEventListener("mouseup", () => {
        pressed = false;
    })
    
    slider.addEventListener("mousemove", e => {
        if (!pressed) return;
        e.preventDefault();
        x = e.offsetX;
    
        innerSlider.style.left = `${x - startx}px`;
        checkboundary();
    })
    
    function checkboundary() {
        let outer = slider.getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();
    
        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = "0px";
        } else if (inner.right < outer.right) {
            innerSlider.style.left = `-${inner.width - outer.width}px`;
        }
    }
}

// 3. textarea 높이 자동 조절
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (18 + obj.scrollHeight) + 'px';
}

// 4. 이미지 서버로 전송, filename 값 가져오기
async function imgData() {
    let name = [];
    const token = localStorage.getItem('token');

    const res = await fetch("http://146.56.183.55:5050/image/uploadfiles", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
        body: {
            key: "image",
            value: inpFile,
        }
    })
    const data = await res.json();
    console.log(data);
    alert("data");

    for (const i of data) {
        name.push(i["filename"]);
    }
    if(name.length > 1) {
        return name.join(",");
    } else {
        return name[0];
    }
}

// 5. 게시글 데이터 전송
const inpText = document.querySelector('.inp-post');
const btnUpload = document.querySelector('.btn-upload');

async function postData() {
    console.log(inpText.value);
    console.log(fileArr);
    alert('good?');
    const content = inpText.value;
    const token = localStorage.getItem('token');

    const res = await fetch("http://146.56.183.55:5050/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "post":{
                "content": content,
                "image": imgData(),
            }
        })
    })
    const json = await res.json();
    if(json.product) {
        alert("업로드 성공");
        location.href="/pages/post.html";
    } else {
        alert("업로드 실패");
    }
}


btnUpload.addEventListener('click', e => {
  // postData();
  console.log(imgData());
});