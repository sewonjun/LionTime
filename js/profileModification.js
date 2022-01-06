const isLogin = sessionStorage.getItem('user_token');
// 로그인 상태 파악
if (isLogin) {
    const joinHeader = document.querySelector('.join-header');
    joinHeader.remove();
    const joinBtn = document.querySelector('.btn-join');
    joinBtn.remove();
} else {
    const modHeader = document.querySelector('.mod-header');
    modHeader.remove();
    const modTitle = document.querySelector('.mod-title');
    modTitle.remove();
    const saveBtn = document.querySelector('.btn-save');
    saveBtn.remove();
}

// 프로필 이미지 미리보기
const inputImg = document.querySelector('#input-userImg');
inputImg.addEventListener('change', (e) => {
    preview(e.target);
    const bgImg = document.querySelector('.mod-userImg');
    bgImg.classList.add('hasImg');
});
function preview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImg = document.querySelector('.userImg-preview');
            previewImg.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 사용자 이름 검증
const inputName = document.querySelector('#input-username');
const invalidName = document.querySelector('.invalid-username');
let isValidName = false;
inputName.addEventListener('blur', (e) => {
    isValidName = validateName(e.target.value);
    console.log(isValidName);
    isSubmittable();
});

function validateName(name) {
    if (name.length < 2 || name.length > 10) {
        invalidName.textContent = '*2~10자 이내여야 합니다.';
        inputName.classList.add('invalid');
        return false;
    } else if (name.match(/^\s|\s{2,}|\s$/, 'g')) {
        invalidName.textContent =
            '*시작과 끝이 공백이거나, 연속된 공백을 넣을 수 없습니다.';
        inputName.classList.add('invalid');
        return false;
    } else {
        invalidName.textContent = '';
        inputName.classList.remove('invalid');
        return true;
    }
}
