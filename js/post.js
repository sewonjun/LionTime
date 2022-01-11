// 1. 뒤로가기 버튼
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click", () => {
    history.back();
});

// 2. 작성자 체크, 삭제하기 or 신고하기
// const { id, name, password } = JSON.parse(localStorage.getItem("user-info"));
// localStorage.remove("user-info");
// console.log(id, name, password); 
// const btnChoice = document.querySelector('.btn-list');

// if(작성자체크) {
//     user.innerText = '삭제하기';
// }

// 3. GET /post/:post_id 값 가져오기
const nameUser = document.querySelector('.name-user');
const idUser = document.querySelector('.id-user');
const txtDesc = document.querySelector('.txt-desc');
const postList = document.querySelector('.post-list');
const countLike = document.querySelector('.count-like');
const countComment = document.querySelector('.count-comment');

async function getData() {
  const postId = localStorage.getItem('post-id'); // 로컬의 게시글 아이디값
  const token = localStorage.getItem('access-token');
  const res = await fetch(`http://146.56.183.55:5050/post/${postId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  const data = await res.json();

  let imgData = data.post.image.split(',');
  console.log(imgData);
  for (const imgName of imgData) {
    postList.innerHTML += `<li><img src="http://146.56.183.55:5050/${imgName}" alt=""></li>`;
  }
  nameUser.textContent = data.post.author.username;
  idUser.textContent = data.post.author.accountname;
  txtDesc.textContent = data.post.content;
  countLike.textContent = data.post.heartCount;
  countComment.textContent = data.post.commentCount;
}

getData();
