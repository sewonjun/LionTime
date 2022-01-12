let inpFile;
const container = document.querySelector('.img-container');
const row = document.querySelector('.row');
let dataImg = [];

// POST
const inpText = document.querySelector('.inp-post');
const btnUpload = document.querySelector('.btn-upload');

async function postData() {
    const imgName = await imgData();
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
                "image": imgName,
            }
        })
    })
    const data = await res.json();
    console.log(data);
    if(data) {
        alert("업로드 성공");
        localStorage.setItem("post-id", data.post.id); // post id
        location.href="/pages/post.html";
    } else {
        alert("업로드 실패");
    }
}

// 이미지 서버로 전송, filename 값 가져오기
async function imgData() {
    if(dataImg.length > 1) {
        return dataImg.join(",");
    } else if(dataImg.length === 1) {
        return dataImg[0];
    }

    let formData = new FormData();
    for (const file of inpFile) {
        formData.append('image', file);
    }
    const token = localStorage.getItem('token');
    const res = await fetch("http://146.56.183.55:5050/image/uploadfiles", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const data = await res.json();

    for (const i of data) {
        dataImg.push(i["filename"]);
    }
    if(dataImg.length > 1) {
        return dataImg.join(",");
    } else {
        return dataImg[0];
    }
}

// PUT
const putItem = JSON.parse(localStorage.getItem('putItem'));
console.log(putItem);

// put 원래 값
if(putItem) {
    document.querySelector('.inp-post').value = putItem.desc;
    dataImg = putItem.image.split(',');
    if(dataImg.length > 1) {
        for (const imgName of dataImg) {
            row.innerHTML += `
                <div>
                    <img class="image" style="width: 168px; height: 126px" src="http://146.56.183.55:5050/${imgName}" alt="업로드 이미지">
                    <div class="btnX"></div>
                </div>`;
        }
    } else {
        row.innerHTML += `
            <div>
                <img class="image" style="width: 304px; height: 228px" src="http://146.56.183.55:5050/${dataImg[0]}" alt="업로드 이미지">
                <div class="btnX"></div>
            </div>`;
    }

    imgLen(dataImg.length);
    btnRemove(dataImg);
    imgSlider();
}

async function putData() {
    const imgName = await imgData();
    const content = inpText.value;
    const token = localStorage.getItem('access-token');

    const res = await fetch(`http://146.56.183.55:5050/post/${putItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "post":{
                "content": content,
                "image": imgName,
            }
        })
    })
    const data = await res.json();
    console.log(data);
    if(data) {
        alert("업로드 성공");
        localStorage.setItem("post-id", data.post.id); // post id
        location.href="/pages/post.html";
    } else {
        alert("업로드 실패");
    }
}

btnUpload.addEventListener('click', e => {
    e.preventDefault();
    putItem ? putData() : postData();
});

// 업로드 이미지 미리보기 (image upload preview)
function readImage(input) {
    inpFile = input.files;
    
    // 업로드 다시할 떄 기존 자식태그 삭제
    while (row.hasChildNodes()) {
        row.removeChild(row.firstChild);
    }
    dataImg = [];

    const fileArr = Array.from(input.files);

    if(fileArr.length + dataImg.length > 3) {
        return alert("최대 3개까지 업로드 가능합니다");
    }
    
    if(input.files.length) {
        fileArr.forEach((file, index) => {
            const reader = new FileReader();
            const imgDiv = document.createElement('div');
            const btnX = document.createElement('div');
            const img = document.createElement('img');
            btnX.classList.add('btnX');
            img.classList.add('image');

            imgDiv.appendChild(img);
            imgDiv.appendChild(btnX);

            reader.onload = e => {
                img.src = e.target.result;
                if(input.files.length + dataImg.length > 1) {
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

    btnRemove(fileArr);
    imgLen(fileArr.length + dataImg.length);
    imgSlider();
}

const inputImage = document.querySelector('#img-upload');
inputImage.addEventListener('change', e => {
    readImage(e.target);
    formCheck();
});


// 업로드 이미지 슬라이더
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

// 이미지 개수별 img-container 크기
function imgLen(len) {
    console.log(container);
    if(len === 1) {
        container.style.height = "228px";
        row.style.width = "304px";
        row.style.height = "228px";
        document.querySelector('.image').style.width = "304px";
        document.querySelector('.image').style.height = "228px";
    } else if(len === 2) {
        container.style.height = "126px";
        row.style.width = "344px";
        row.style.height = "126px";
    } else if(len === 3) {
        container.style.height = "126px";
        row.style.width = "520px";
        row.style.height = "126px";
    }
}

// remove upload image
function btnRemove(imgArr){
    const btnDel = document.querySelectorAll('.btnX');
    let btnDelArr = Array.prototype.slice.call(btnDel);
    btnDel.forEach((element) => {
        element.addEventListener('click', e => {
            const delIndex = btnDelArr.indexOf(element);
            element.parentNode.remove();
            imgArr.splice(delIndex, 1);
            btnDelArr.splice(delIndex, 1);
            imgLen(btnDelArr.length);
            formCheck();
        })
    });
}

// textarea 높이 자동 조절
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (18 + obj.scrollHeight) + 'px';
}

// 뒤로가기
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click",()=>{
  history.back();
});

// 입력 값 체크, 버튼 활성화
const inpPost = document.querySelector(".inp-post");

inpPost.addEventListener("input", e => {
    console.log(e);
    formCheck();
});

function formCheck() {
    if(inpPost.value && (inputImage.value || dataImg.length)) {
        btnUpload.disabled = false;
    } else {
        btnUpload.disabled = true;
    }
}