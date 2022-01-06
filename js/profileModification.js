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
