const API_URL = 'http://146.56.183.55:5050/';
const MY_ID = sessionStorage.getItem('my-id');
const MY_ACCOUNTNAME = sessionStorage.getItem('my-accountname');
const TOKEN = sessionStorage.getItem('token');
// const TARGET_ID = localStorage.getItem('target-id');
// localStorage.removeItem('target-id');
const TARGET_ID = '61ca638ab5c6cd18084e447d';
// const TARGET_ACCOUNTNAME = localStorage.getItem('target-accountname');
// localStorage.removeItem('target-accountname');
const TARGET_ACCOUNTNAME = 'hey_binky';
const isMyProfile = MY_ACCOUNTNAME === TARGET_ACCOUNTNAME;

const isFollowersPage = localStorage.getItem('is-followers-page') === 'true';
localStorage.removeItem('is-followers-page');

const pageName = document.querySelector('.page-name');
if (isFollowersPage) {
    pageName.textContent = 'Followers';
} else {
    pageName.textContent = 'Followings';
}

// 로그인
(async function login() {
    try {
        const res = await fetch(API_URL + 'user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email: 'testEmail@test.com',
                    password: 'testpassword',
                },
            }),
        });
        const resJson = await res.json();
        const { _id, accountname, token } = resJson.user;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('my-accountname', accountname);
        sessionStorage.setItem('my-id', _id);
    } catch (err) {}
})();

async function fetchData(endpoint) {
    try {
        const res = await fetch(
            API_URL + `profile/${TARGET_ACCOUNTNAME}/${endpoint}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-type': 'application/json',
                },
            }
        );
        const resJson = await res.json();
        return resJson;
    } catch (err) {}
}

(async function printFollows() {
    const followsData = isFollowersPage
        ? await fetchData('follower')
        : await fetchData('following');

    const usersList = document.querySelector('.users-list');
    for (const follow of followsData) {
        const { accountname, image, username, intro, follower } = follow;
        const li = document.createElement('li');
        li.classList.add('users-list-item');
        li.dataset.accountname = accountname;
        const img = document.createElement('img');
        img.classList.add('user-img');
        if (image.slice(0, 4) === 'http') {
            img.setAttribute('src', image);
        } else {
            img.setAttribute('src', API_URL + image);
        }
        img.setAttribute(
            'onError',
            "this.src='http://146.56.183.55:5050/Ellipse.png'"
        );
        const div = document.createElement('div');
        div.classList.add('user-profile');
        const span = document.createElement('span');
        span.classList.add('user-name');
        span.textContent = username;
        div.append(span);
        if (!!intro) {
            const p = document.createElement('p');
            p.classList.add('user-intro');
            p.textContent = intro;
            div.append(p);
        }
        const button = document.createElement('button');
        button.classList.add('btn-follow');
        if (!isFollowersPage) {
            button.classList.add('cancel');
        } else {
            if (follower.includes(TARGET_ID)) {
                button.classList.add('cancel');
            }
        }
        li.append(img);
        li.append(div);
        li.append(button);
        usersList.append(li);
    }
})();

// 팔로우, 취소 버튼 토글
const usersList = document.querySelector('.users-list');
usersList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-follow')) {
        return;
    } else {
        e.target.classList.toggle('cancel');
    }
});
