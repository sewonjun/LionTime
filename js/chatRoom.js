const messageSendBtn = document.querySelector(".btn-message-send");
const inputText = document.querySelector(".inp-chat");
const backKeyBtn =document.querySelector(".btn-back-key");

inputText.addEventListener("input",()=>{
    if(inputText.value!==""){
        messageSendBtn.classList.add("change-color");
    }else{
        messageSendBtn.classList.remove("change-color");
    }
    console.log(inputText.value);
})

backKeyBtn.addEventListener("click",()=>{
    history.back();
})

