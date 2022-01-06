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