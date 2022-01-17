// function getInput() {
//     console.log(document.querySelector("#idEmailInput").value)
//     console.log(document.querySelector("#loginPWInput").value)
// }

const email = document.querySelector('#idEmailInput')
const pw = document.querySelector('#loginPWInput')

// 비동기로 동하는것을 명시해줘야 await을 할 수 있다!
async function login() {
    const email = document.querySelector("#idEmailInput").value
    const pw = document.querySelector("#loginPWInput").value
    const url = "http://146.56.183.55:5050"
    const loginData = {
        "user": {
            "email": email,
            "password": pw
        }
    }

    const res = await fetch(url + '/user/login', {
        //메소드 구분
        method: "POST",
        //헤더
        headers: {
            "Content-type": "application/json"
        },
        //이건 오브잭트를 문자열로 바꿔주는 부분
        body: JSON.stringify(loginData)
    })
    const json = await res.json();//외않됌? 포인트 res.json()도 비동기. await을 해줘야한다.
    // console.log(json);
    // console.log(json.user.token);
    // console.log(json.user.accountname);
    sessionStorage.setItem("Token", json.user.token)
    sessionStorage.setItem("_id", json.user._id)
    sessionStorage.setItem("accountname", json.user.accountname)
    

    location.href = "home.html"
}
const $loginBtn = document.querySelector('#submitBtn')
$loginBtn.addEventListener("click", login)