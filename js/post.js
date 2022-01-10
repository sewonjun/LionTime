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
const query = window.location.pathname.split('/').pop();
console.log(query);

async function getData() {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://146.56.183.55:5050/product/${query}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      }
  })
  const data = await res.json();
  console.log(data);
  return data;
}