// 1. 업로드 이미지 미리보기 (image upload preview)
function readImage(input) {
    const container = document.querySelector('.img-container');

    // 업로드 다시할 떄 기존 li태그 삭제
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    const fileArr = Array.from(input.files);

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