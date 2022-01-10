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

async function getFollows() {
    try {
        const res = await fetch(
            API_URL + `profile/${TARGET_ACCOUNTNAME}/follower`,
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

async function printFollows() {
    const followsData = await getFollows();
    console.log(followsData);

    const usersList = document.querySelector('.users-list');
    for (const follow of followsData) {
        const {
            _id,
            accountname,
            image,
            username,
            intro,
            follower,
            following,
        } = follow;
        console.log(follower);
        const li = document.createElement('li');
        li.classList.add('users-list-item');
        li.dataset.accountname = accountname;
        const img = document.createElement('img');
        img.classList.add('user-img');
        img.setAttribute('src', image);
        li.append(img);
        const div = document.createElement('div');
        div.classList.add('user-profile');
        li.append(div);
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
        if (follower.includes(TARGET_ACCOUNTNAME)) {
            followBtn.classList.add('cancel');
        }
        li.append(button);
        usersList.append(li);
    }
}
printFollows();

// 이 사람들의 follower 목록에 TARGET_ID의 아이디가 있느냐
