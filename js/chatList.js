const linkImgBtn = document.querySelectorAll(".link-img");
const backKeyBtn = document.querySelector(".btn-back-key");

linkImgBtn.forEach((selectBtn)=>{
    selectBtn.addEventListener("click",()=>{
        selectBtn.classList.toggle("this-page");
        linkImgBtn.forEach((btn)=>{
            if(btn!==selectBtn){
                btn.classList.remove("this-page");
            }
        })
    })
})

backKeyBtn.addEventListener("click",()=>{
    history.back();
})