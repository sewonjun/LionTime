const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".btn-menu");
const listCount = document.querySelector(".list-modal-container").childElementCount;
const modalMenuBtn = document.querySelectorAll(".btn-list");
const dimd = document.querySelector(".dimd");
const closeBtn = document.querySelector(".close-chat-room");

let bottomValue = (listCount*46)+46;

    modal.style.bottom = `-${bottomValue}px`;
    modalMenuBtn.forEach((btn)=>{
        btn.disabled = true;
    })

    modalBtn.addEventListener("click",()=>{
        modal.classList.toggle("modal-on");
        dimd.classList.toggle("on");
        console.log(modal.classList.value);
        if(modal.classList.value === "modal modal-on"){
            modal.style.bottom = "0px";
            modalMenuBtn.forEach((btn)=>{
            btn.disabled = false;
            });
        } else {
            modal.style.bottom = `-${bottomValue}px`;
            modalMenuBtn.forEach((btn)=>{
            btn.disabled = true;
            });
        }
    })

    dimd.addEventListener("click",()=>{
        modal.classList.toggle("modal-on");
        dimd.classList.toggle("on");
        modal.style.bottom = `-${bottomValue}px`;
        modalMenuBtn.forEach((btn)=>{
        btn.disabled = true;
        });
    })

    closeBtn.addEventListener("click",()=>{
        history.back();
    })

