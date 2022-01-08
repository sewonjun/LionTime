const API_URL = 'http://146.56.183.55:5050';
const TARGET_ID = location.href.split('?')[1];
const SESSION_ID = sessionStorage.getItem('user-token');

//  본인 프로필인지 남의 프로필인지 확인해서 분기
if (TARGET_ID === SESSION_ID) {
    const othersUtil = document.querySelector('.profile-utils-others');
    othersUtil.remove();
} else {
    const myUtil = document.querySelector('.profile-utils-mine');
    myUtil.remove();
}

// 프로필 정보 가져오기
async function getProfile() {
    try {
        const res = await fetch(API_URL + `/profile/hey_binky`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer key',
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        console.log(resJson);
        return resJson;
    } catch (err) {}
}

// 프로필 정보 출력하기
async function printProfile() {
    const profileData = await getProfile();
    const {
        username,
        accountname,
        intro,
        image,
        followerCount,
        followingCount,
    } = profileData;

    const profileImg = document.querySelector('.profile-img');
    const followersNum = document.querySelector('.followers-num');
    const followingNum = document.querySelector('.following-num');
    const userName = document.querySelector('.user-name');
    const userId = document.querySelector('.user-id');
    const userIntro = document.querySelector('.user-intro');

    profileImg.setAttribute('src', image);
    followersNum.textContent = followerCount;
    followingNum.textContent = followingCount;
    userName.textContent = username;
    userId.textContent = accountname;
    userIntro.textContent = intro;
}

// 판매 중인 상품 목록 가져오기
async function getProductList() {
    try {
        const res = await fetch(API_URL + `/product/${TARGET_ID}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer key',
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        console.log(resJson);
    } catch (err) {}
}

// 판매 중인 상품 목록 출력하기
async function printProduct(){
    const productData=getProductList();
    for (let product in productData){

    }
}

// 게시글 가져오기
async function getPostList() {
    try {
        const res = await fetch(API_URL + `/post/${TARGET_ID}/userpost`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer key',
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        console.log(resJson);
    } catch (err) {}
}

// 게시글 출력하기
async function printPost(){
    
}