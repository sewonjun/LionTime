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

    getComment();
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

  await fetch(`http://146.56.183.55:5050/post/${putData.id}/heart`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  });
}

async function unHeart() {
  const token = localStorage.getItem('token');

  await fetch(`http://146.56.183.55:5050/post/${putData.id}/unheart`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  });
}

// 8. 댓글 기능
const btnComment = document.querySelector('.btn-comment');
const inpComment = document.querySelector('#txt-comment');

inpComment.addEventListener("input", () => {
  console.log(inpComment.value);
  if(inpComment.value) {
    btnComment.disabled = false;
  } else {
    btnComment.disabled = true;
  }
})

btnComment.addEventListener('click', e => {
  postComment();
})

// 댓글 작성
async function postComment() {
  const token = localStorage.getItem('token');
  console.log(inpComment.value);

  await fetch(`http://146.56.183.55:5050/post/${putData.id}/comments`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          "comment":{
              "content": inpComment.value
          }
      })
  });
  inpComment.value = "";
  location.reload();
}

// 댓글 리스트
async function getComment() {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://146.56.183.55:5050/post/${putData.id}/comments`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  const data = await res.json();
  console.log("겟! ",data.comments[1]);
  let liComment = document.querySelector('.cont-comments ul');
  for (const comment of data.comments) {
    liComment.innerHTML += `
      <li>
        <button class="btn-more-mini user"></button>    
        <img src=${comment.author.image} alt="작성자 프로필 사진" class="img-user-comment">
        <div class="box-comment">
            <p class="txt-comment-name-user">${comment.author.username}<small>· ${dateBefore(comment.createdAt)}</small></p>
            <p class="txt-comment-desc">${comment.content}</p>
        </div>
      </li>
    `;
  }
}

// 날짜 차이 구하기
function dateBefore(createdAt) {
  const now = new Date();
  let nowISO = now.toISOString();
  if(nowISO.slice(0, 4) > createdAt.slice(0, 4)) {
    return `${nowISO.slice(0, 4) - createdAt.slice(0, 4)}년 전`;
  } else if(nowISO.slice(5, 7) > createdAt.slice(5, 7)) {
    return `${nowISO.slice(5, 7) - createdAt.slice(5, 7)}월 전`;
  } else if(nowISO.slice(8, 10) > createdAt.slice(8, 10)) {
    return `${nowISO.slice(8, 10) - createdAt.slice(8, 10)}일 전`;
  } else if(nowISO.slice(11, 13) > createdAt.slice(11, 13)) {
    return `${nowISO.slice(11, 13) - createdAt.slice(11, 13)}시간 전`;
  } else if(nowISO.slice(14, 16) > createdAt.slice(14, 16)) {
    return `${nowISO.slice(14, 16) - createdAt.slice(14, 16)}분 전`;
  } else {
    return '방금';
  }
}