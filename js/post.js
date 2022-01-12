// 1. 뒤로가기 버튼
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click", () => {
    history.back();
});

// 2. GET /post/:post_id 값 가져오기
const nameUser = document.querySelector('.name-user');
const idUser = document.querySelector('.id-user');
const txtDesc = document.querySelector('.txt-desc');
const postList = document.querySelector('.post-list');
const countLike = document.querySelector('.count-like');
const countComment = document.querySelector('.count-comment');

async function getPostData() {
    const postId = localStorage.getItem('post-id'); // 로컬의 게시글 아이디값
    const token = localStorage.getItem('access-token');
    const logUser = localStorage.getItem("username"); // 토글 버튼 체크
    const res = await fetch(`http://146.56.183.55:5050/post/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await res.json();

    let imgData = data.post.image.split(',');
    for (const imgName of imgData) {
        postList.innerHTML += `<li><img src="http://146.56.183.55:5050/${imgName}" alt=""></li>`;
    }
    nameUser.textContent = data.post.author.username;
    idUser.textContent = data.post.author.accountname;
    txtDesc.textContent = data.post.content;
    countLike.textContent = data.post.heartCount;
    countComment.textContent = data.post.commentCount;

    // 게시글 모달 버튼
    let postBtn = document.querySelector('.box-post .btn-more-mini');
    if(logUser === data.post.author.username) {
        postBtn.classList.add('owner');
    } else {
        postBtn.classList.add('user');
    }
    PostInit(); // 먼저 실행되면 위 로직이 적용되기 전에 버튼이 만들어짐

    putData = {
        desc: data.post.content,
        image: data.post.image
    }
}

getPostData();

// 3. 게시글 수정
let putData;
const btnUpdate = document.querySelector('.btn-list.update');
btnUpdate.addEventListener("click", () => {
    localStorage.setItem("putItem", JSON.stringify(putData));
    location.href="/pages/postUpload.html";
})
