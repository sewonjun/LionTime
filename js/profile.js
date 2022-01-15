const API_URL = 'http://146.56.183.55:5050/';
const MY_ID = sessionStorage.getItem('my-id');
// const MY_ACCOUNTNAME = sessionStorage.getItem('my-accountname');
const MY_ACCOUNTNAME = 'hey_binky';
const TOKEN = sessionStorage.getItem('my-token');
const TARGET_ID = localStorage.getItem('target-id');
// localStorage.removeItem('target-id');
// const TARGET_ID = '61ca638ab5c6cd18084e447d'; => hey_binky의 id
// const TARGET_ID = '61d9c3d7685c75821c46c002'; => test_accountname_mod0의 id
// const TARGET_ACCOUNTNAME = localStorage.getItem('target-accountname');
// localStorage.removeItem('target-accountname');
const TARGET_ACCOUNTNAME = 'hey_binky';
// const TARGET_ACCOUNTNAME = 'test_accountname_mod0';
const isMyProfile = MY_ID === TARGET_ID;
// const isMyProfile = true;

// 회원가입
// async function join() {
//     try {
//         const res = await fetch(API_URL + '/user', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user: {
//                     email: 'testEmail@test.com',
//                     password: 'testpassword',
//                     username: 'test',
//                     accountname: 'test_accountname',
//                     intro: '테스트 아이디입니다.',
//                     image: '',
//                 },
//             }),
//         });
//         const resJson = await res.json();
//         console.log(resJson);
//     } catch (err) {}
// }
// join();

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
        sessionStorage.setItem('my-id', _id);
        sessionStorage.setItem('my-token', token);
        sessionStorage.setItem('my-accountname', accountname);
    } catch (err) {
        console.log(err);
    }
})();

// API 데이터 가져오기
async function fetchData(endpoint) {
    try {
        const res = await fetch(API_URL + endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        return resJson;
    } catch (err) {}
}

// 전체 유저 가져오기
// async function getUsers() {
//     const response = await fetch(API_URL + 'user');
//     const json = await response.json();
//     console.log(json);
// }
// getUsers();

//  본인 프로필인지 남의 프로필인지 확인해서 분기
if (isMyProfile) {
    const othersUtil = document.querySelector('.profile-utils-others');
    othersUtil.remove();
} else {
    const myUtil = document.querySelector('.profile-utils-mine');
    myUtil.remove();
}

// 프로필 정보 출력하기
(async function printProfile() {
    const endpoint = `profile/${TARGET_ACCOUNTNAME}`;
    const data = await fetchData(endpoint);
    const profileData = data.profile;
    const {
        username,
        accountname,
        intro,
        image,
        follower,
        followerCount,
        followingCount,
    } = profileData;

    const profileImg = document.querySelector('.profile-img');
    const followersNum = document.querySelector('.followers-num');
    const followingNum = document.querySelector('.followings-num');
    const userName = document.querySelector('.user-name');
    const userId = document.querySelector('.user-id');
    const userIntro = document.querySelector('.user-intro');
    const followBtn = document.querySelector('.btn-follow');

    profileImg.setAttribute('src', image);
    followersNum.textContent = `${followerCount}`;
    followingNum.textContent = `${followingCount}`;
    userName.textContent = username;
    userId.textContent = `@ ${accountname}`;
    userIntro.textContent = intro;
    if (followBtn) {
        if (follower.includes(MY_ACCOUNTNAME)) {
            followBtn.classList.add('following');
            followBtn.textContent = '언팔로우';
        } else {
            followBtn.textContent = '팔로우';
        }
    }
})();

// 판매 중인 상품 목록 출력하기
(async function printProduct() {
    const endpoint = `product/hey_binky`;
    const data = await fetchData(endpoint);
    const productData = data.product;

    if (productData.length === 0) {
        const product = document.querySelector('.product');
        product.remove();
        return;
    }
    const productList = document.querySelector('.product-list');
    for (const product of productData) {
        const { id, itemImage, itemName, link, price } = product;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('product-item');
        a.setAttribute('href', link);
        a.dataset.productId = id;
        const img = document.createElement('img');
        img.setAttribute('src', itemImage);
        img.setAttribute(
            'onError',
            "this.src='../images/default-post-product-image.png'"
        );
        img.classList.add('product-img');
        const p = document.createElement('p');
        p.classList.add('product-name');
        p.textContent = itemName;
        const span = document.createElement('span');
        span.classList.add('product-price');
        span.textContent = `${price.toLocaleString()}원`;
        a.append(img);
        a.append(p);
        a.append(span);
        li.append(a);
        productList.append(li);
    }
})();

// 게시글 출력하기
(async function printPost() {
    const endpoint = `post/hey_binky/userpost`;
    const data = await fetchData(endpoint);
    const postData = data.post;

    if (postData.length === 0) {
        const post = document.querySelector('.post');
        post.remove();
        return;
    }

    const postList = document.querySelector('.post-list');
    const postAlbum = document.querySelector('.post-album');

    for (const post of postData) {
        const {
            id,
            author: { image: authorImg, username, accountname },
            content,
            image,
            heartCount,
            hearted,
            commentCount,
            createdAt,
        } = post;
        // 게시글 목록 형식
        const listItem = document.createElement('li');
        listItem.classList.add('post-list-item');
        listItem.innerHTML = `
        <img src=${authorImg} class="post-author-img"/>
        <div>
            <div class="post-author-info">
                <strong class="post-author">${username}</strong>
                <span class="post-author-id">@ ${accountname}</span>
            </div>
            <p class="post-text" data-post-id=${id}>${content}</p> 
            <img src="${
                image.split(',')[0]
            }" onerror="this.src='../images/default-post-product-image.png'" data-post-id=${id} class="post-img"/>
            <div class="post-utils">
                <button class="btn-like" data-hearted=${hearted}>
                    <span class="sr-only">좋아요</span>
                </button>
                <span class="count-like">${heartCount}</span>
                <button class="btn-comment" data-post-id=${id}>
                    <span class="sr-only">댓글</span>
                </button>
                <span class="count-comment">${commentCount}</span>
            </div>
            <span class="post-date">
                ${createdAt.slice(0, 4)}년 
                ${createdAt.slice(5, 7)}월 
                ${createdAt.slice(8, 10)}일
            </span>
        </div>
        <button class="btn-post-menu">
            <span class="sr-only">게시글 메뉴 열기</span>
        </button>
        `;
        postList.append(listItem);

        //  게시글 앨범 형식
        if (!!image) {
            const albumItem = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', './post.html');
            a.classList.add('post-album-item');
            a.dataset.postId = id;
            const albumImg = document.createElement('img');
            albumImg.setAttribute('src', `${API_URL + image.split(',')[0]}`);
            albumImg.setAttribute(
                'onError',
                "this.src='../images/default-post-product-image.png'"
            );
            albumImg.classList.add('post-album-img');
            a.append(albumImg);
            if (image.split(',').length > 1) {
                const multiIcon = document.createElement('div');
                multiIcon.classList.add('icon-multi-image');
                a.append(multiIcon);
            }
            albumItem.append(a);
            postAlbum.append(albumItem);
        }
    }
})();

// 팔로워, 팔로잉 목록 이동
const followersLink = document.querySelector('.followers-num');
followersLink.addEventListener('click', () => {
    localStorage.setItem('target-id', TARGET_ID);
    localStorage.setItem('is-followers-page', true);
});
const followingsLink = document.querySelector('.followings-num');
followingsLink.addEventListener('click', (e) => {
    localStorage.setItem('target-id', TARGET_ID);
    localStorage.setItem('is-followers-page', false);
});

// 채팅하기
if (!isMyProfile) {
    const chatBtn = document.querySelector('.btn-chat');
    chatBtn.addEventListener('click', () => {
        localStorage.setItem('target-id', TARGET_ID);
    });
}

// 팔로우 버튼 토글
const followBtn = document.querySelector('.btn-follow');
if (followBtn) {
    followBtn.addEventListener('click', () => {
        if (followBtn.classList.contains('following')) {
            followBtn.classList.remove('following');
            followBtn.textContent = '팔로우';
        } else {
            followBtn.classList.add('following');
            followBtn.textContent = '언팔로우';
        }
    });
}

// 본인 프로필일 때
if (isMyProfile) {
    // 프로필 수정
    const modifyBtn = document.querySelector('.btn-modify');
    modifyBtn.addEventListener('click', () => {
        localStorage.setItem('target-id', MY_ID);
    });

    // 상품 등록
    const addProductBtn = document.querySelector('.btn-add-product');
    addProductBtn.addEventListener('click', () => {
        localStorage.setItem('target-id', TARGET_ID);
    });
}

// 판매 중인 상품
const productList = document.querySelector('.product-list');
// 가로 스크롤
productList.addEventListener('wheel', (e) => {
    const { scrollLeft, clientWidth, scrollWidth } = productList;
    // scrollWidth(1500) = clientWidth(370) + scrollLeft(0~1130)
    if (scrollLeft === 0 && e.deltaY < 0) {
        return false;
    }
    if (scrollLeft + clientWidth >= scrollWidth && e.deltaY > 0) {
        return false;
    }
    e.preventDefault();
    productList.scrollBy({
        left: e.deltaY < 0 ? -100 : 100,
    });
});
productList.addEventListener('click', (e) => {
    if (
        (e.target.parentNode.classList.contains('product-item') ||
            e.target.classList.contains('product-item')) &&
        isMyProfile
    ) {
        e.preventDefault();
        // 모달 띄우기
    }
});

// 게시물 표기 방식 전환
const listBtn = document.querySelector('.btn-list');
const albumBtn = document.querySelector('.btn-album');
listBtn.addEventListener('click', () => {
    listBtn.classList.add('selected');
    albumBtn.classList.remove('selected');
    postList.classList.remove('hidden');
    postAlbum.classList.add('hidden');
});
albumBtn.addEventListener('click', () => {
    listBtn.classList.remove('selected');
    albumBtn.classList.add('selected');
    postList.classList.add('hidden');
    postAlbum.classList.remove('hidden');
});

// 목록형 게시글의 각종 기능들 분기
const postList = document.querySelector('.post-list');
postList.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('post-text') ||
        e.target.classList.contains('post-img') ||
        e.target.classList.contains('btn-comment')
    ) {
        postDetail(e.target);
        return;
    }
    if (e.target.classList.contains('btn-like')) {
        likePost(e.target);
        return;
    }
    if (e.target.classList.contains('btn-post-menu')) {
        // 모달 띄우기
        // const modal = document.querySelector(".modal");
        // modal.style.backgroundColor="red";
    }
});

// 앨범형 게시글 상세 페이지 이동
const postAlbum = document.querySelector('.post-album');
postAlbum.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('post-album-item')) {
        postDetail(e.target.parentNode);
    }
});

// 게시글 좋아요
function likePost(likeBtn) {
    const isHearted = likeBtn.dataset.hearted;
    const likeCount = likeBtn.nextSibling.nextSibling;
    if (isHearted === 'true') {
        likeBtn.dataset.hearted = false;
        likeCount.textContent -= 1;
    } else {
        likeBtn.dataset.hearted = true;
        likeCount.textContent = +likeCount.textContent + 1;
    }
}

// 게시글 상세 페이지 이동
function postDetail(post) {
    const postId = post.dataset.postId;
    localStorage.setItem('postId', postId);
}
