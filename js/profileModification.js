const API_URL = 'http://146.56.183.55:5050';
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

// 계정 ID 검증 (중복 불가)
const inputId = document.querySelector('#input-userId');
const invalidId = document.querySelector('.invalid-userId');
let isValidId = false;
inputId.addEventListener('blur', (e) => {
    isValidId = validateId(e.target.value);
    console.log(isValidId);
    isSubmittable();
});

function validateId(id) {
    if (inputId.value.length === 0 || id.match(/[^a-z0-9\.\_]/, 'gi')) {
        invalidId.textContent =
            '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
        inputId.classList.add('invalid');
        return false;
    } else {
        let isExist = false;
        // api 통해서 중복검사
        // const idArr = getEveryId();
        // isExist = idArr.some(id);
        if (isExist) {
            invalidId.textContent = '이미 사용 중인 ID입니다.';
            inputId.classList.add('invalid');
            return false;
        } else {
            invalidId.textContent = '';
            inputId.classList.remove('invalid');
            return true;
        }
    }
}

// 존재하는 모든 사용자 정보 fetch
// async function getEveryId() {
//     const res = await fetch(API_URL + '/user');
//     const resJson = res.json();
//     const idArr = resJson.map((elem) => {
//         elem.id;
//     });
//     return idArr;
// }

// submit 버튼 활성화
const submitBtn = document.querySelectorAll('.btn-submit');
function isSubmittable() {
    if (isValidName && isValidId) {
        submitBtn.forEach((elem) => {
            elem.disabled = false;
        });
    } else {
        submitBtn.forEach((elem) => {
            elem.disabled = true;
        });
    }
}

if (isLogin) {
    //  프로필 수정 버튼 클릭
    const saveBtn = document.querySelector('.btn-save');
    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = 'http://146.56.183.55:5050';
        try {
            const res = await fetch(url + '/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        accountname,
                        intro,
                        image,
                    },
                }),
            });
            const resJson = await res.json();
            console.log(resJson);
        } catch (err) {}
    });
} else {
    // 시작하기 버튼 클릭
    const joinBtn = document.querySelector('.btn-join');
    joinBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = 'http://146.56.183.55:5050';
        try {
            const res = await fetch(url + '/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                        username,
                        accountname,
                        intro,
                        image,
                    },
                }),
            });
            const resJson = await res.json();
            console.log(resJson);
        } catch (err) {}
        location.href = '../pages/home.html';
    });
}
