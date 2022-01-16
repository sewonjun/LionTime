const btnNext = document.querySelector("#nextBtn")
const email = document.querySelector('#emailInput');
const pw = document.querySelector('#pwInput');

// 파라미터 값을 가져온다..  
async function checkEmailValid(email) {
    const url = "http://146.56.183.55:5050"
    const res = await fetch(url + '/user/emailvalid', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": {
                "email": email
            }
        })
    })
    const json = await res.json()
    console.log(json)
    // return json.message == "사용 가능한 이메일 입니다." ? true : false
}

// 피드 불러오는 api 명세 
// async function getFeed() {
//     const url = "http://146.56.183.55:5050"

//     const res = await fetch(url + '/post/feed', {
//         //메소드 구분
//         method: "GET",
//         //헤더
//         headers: {
//             "Authorization": `Bearer ${TOKEN}`,
//             "Content-type": "application/json"
//         }
//     })
//     const json = await res.json();//외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
//     console.log(json)
//     return json
// }


// 잠시 주석처리

// async function join() {
//     const email = document.querySelector("#emailInput").value;
//     const password = document.querySelector("#passwordInput").value;
//     // const userName = document.querySelector("#userNameInput").value;
//     // const userId = document.querySelector("#userIdInput").value;
//     // const intro = document.querySelector("#userIntroInput").value;
//     // const imageUrl = document.querySelector("#imagePre").src
//     try {
//         const res = await fetch("http://146.56.183.55:5050/user", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 "user": {
//                     "email": email,
//                     "password": password
//                     // "username": userName,
//                     // "accountname": userId,
//                     // "intro": intro,
//                     // "image": imageUrl,
//                 }
//             })
//         })
//         console.log(res)
//         const json = await res.json()
//         const message = json.message
//         // if(message=="회원가입 성공"){
//         if (res.status == 200) {
//             location.href = "./home.html"
//         }
//         else {
//             console.log(json)
//         }
//     } catch (err) {
//         alert(err)
//     }
// }
// $submitBtn.addEventListener("click", join)
