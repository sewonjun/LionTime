// 1. input file - image upload preview
const inpImage = document.querySelector("#img-product");

function readImage(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.querySelector(".img-preview");
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

inpImage.addEventListener("change", e => {
    readImage(e.target);
    formCheck();
});

// 2. form 태그 내부값 체크, 버튼 활성화
const inpName = document.querySelector(".inp-name");
const inpPrice = document.querySelector(".inp-price");
const inpLink = document.querySelector(".inp-link");
const btnSave = document.querySelector(".btn-save");

function formCheck() {
    if(inpName.value && inpPrice.value && inpLink.value && inpImage.value) {
        btnSave.disabled = false;
    } else {
        btnSave.disabled = true;
    }
}

inpName.addEventListener("change", e => {
    e.target.value = parseInt(e.target.value);
    console.log(typeof(e.target.value));
    formCheck();
});
inpPrice.addEventListener("change", e => {
    formCheck();
});
inpLink.addEventListener("change", e => {
    formCheck();
});

// 3. 가격 1000단위 컴마 찍기
function comma(str) {
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function uncomma(str) {
    return str.replace(/[^\d]+/g, '');
}

inpPrice.addEventListener("input", e => {
    e.target.value = comma(uncomma(e.target.value));
});

