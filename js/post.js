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
const imgCheck = document.querySelector('.img-check');

(async function getPostData() {
    const postId = localStorage.getItem('post-id'); // 로컬의 게시글 아이디값
    const token = localStorage.getItem('token');
    // const logUser = localStorage.getItem("username"); // 토글 버튼 체크
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
        postList.innerHTML += `<li><img src="${imgName}" alt="게시글 이미지"></li>`;
        imgCheck.innerHTML += `<li></li>`;
    }
    imgCheck.firstChild.style.backgroundColor = "#F26E22";
    nameUser.textContent = data.post.author.username;
    idUser.textContent = data.post.author.accountname;
    txtDesc.textContent = data.post.content;
    countLike.textContent = data.post.heartCount;
    countComment.textContent = data.post.commentCount;

    putData = {
        id: data.post.id,
        desc: data.post.content,
        image: data.post.image,
        hearted: data.post.hearted
    }
    if(putData.hearted === true) {
      btnLike.src = '../images/icon-heart-fill.png';
    }
})();

// 3. 게시글 수정, 삭제
let putData;

const postBtn = document.querySelector('.box-post .btn-more-mini');
postBtn.addEventListener('click', () => {
  setTimeout(function() {
    const btnUpdate = document.querySelector('.update');
    btnUpdate.addEventListener("click", () => {
      localStorage.setItem("putItem", JSON.stringify(putData));
      location.href="/pages/postUpload.html";
    });
  },200);
});

// 4. 게시글 삭제
async function postDel() {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://146.56.183.55:5050/post/${putData.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  const data = await res.json();
  console.log(data);
  
  if(data) {
      alert("삭제 성공");
      location.href="/pages/profile.html";
  } else {
      alert("삭제 실패");
  }
}

// 5. 이미지 슬라이드
const prevButton = document.querySelector('.prev'); 
const nextButton = document.querySelector('.next'); 

let index = 0;

prevButton.addEventListener('click', (e) => {
    if (index === 0) return;
    imgCheck.childNodes[index].style.backgroundColor = "#fff";
    index -= 1;
    postList.style.transform = `translate3d(-${304 * index}px, 0, 0)`;
    imgCheck.childNodes[index].style.backgroundColor = "#F26E22";
}); 
nextButton.addEventListener('click', () => {
    if (index === postList.childElementCount - 1) return;
    imgCheck.childNodes[index].style.backgroundColor = "#fff";
    index += 1;
    postList.style.transform = `translate3d(-${304 * index}px, 0, 0)`;
    imgCheck.childNodes[index].style.backgroundColor = "#F26E22";
});

// 6. 이미지 슬라이드, 삭제 alert 겹침현상 제거
document.addEventListener("click", e => {
  setTimeout(function() {
    const alertOn = document.querySelector('.alert.on');
    if(alertOn) {
      document.querySelector('.btn-slide').style.zIndex = 0;
      // 게시글 삭제
      if(alertOn.children[1].children[1].className == "btn-alert btn-delete"){
        alertOn.children[1].children[1].addEventListener("click", () => {
          postDel();
        });
      }
    } else {
      document.querySelector('.btn-slide').style.zIndex = 10;
    }
  },200);
});

// 7. 좋아요/좋아요 취소
const btnLike = document.querySelector('.img-like');
console.log(btnLike);
console.log(putData);

btnLike.addEventListener('click', () => {
  if(putData.hearted === true) {
    btnLike.src = '../images/icon-heart.png';
    putData.hearted = false;
    countLike.textContent = parseInt(countLike.textContent) - 1;
    unHeart();
  } else {
    btnLike.src = '../images/icon-heart-fill.png';
    putData.hearted = true;
    countLike.textContent = parseInt(countLike.textContent) + 1;
    heart();
  }
});

async function heart() {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://146.56.183.55:5050/post/${putData.id}/heart`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  // const data = await res.json();
  // console.log("하트: ", data);
}

async function unHeart() {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://146.56.183.55:5050/post/${putData.id}/unheart`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  // const data = await res.json();
  // console.log("하트 취소: ", data);
}