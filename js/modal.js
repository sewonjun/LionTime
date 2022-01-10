if(document.title==="chatRoom"){
    chatRoomInit();
} else if(document.title==="게시글"){
    PostInit();
} else if(document.title === "내 프로필"){
    Profile();
}


function chatRoomInit(){
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
}

function PostInit(){
    
    const modalOwner = document.querySelector(".modal.owner");
    const modalUser = document.querySelector(".modal.user");

    const modalBtns = document.querySelectorAll(".btn-more-mini");

    const listCountOwner = document.querySelector(".list-modal-container.owner").childElementCount;
    const listCountUser = document.querySelector(".list-modal-container.user").childElementCount;
    const modalMenuBtnOwner = document.querySelectorAll(".btn-list.owner");
    const modalMenuBtnUser = document.querySelectorAll(".btn-list.user");
    const dimd = document.querySelector(".dimd");

    let modalOwnerBottomValue = (listCountOwner*46)+46;
    let modalUserBottomValue = (listCountUser*46)+46;

    modalOwner.style.bottom = `-${modalOwnerBottomValue}px`;
    modalUser.style.bottom = `-${modalUserBottomValue}px`;

    

    modalBtns.forEach((target)=>{
        if(target.classList.value ==="btn-more-mini owner"){
            target.addEventListener("click",()=>{
                modalOwner.classList.toggle("modal-on");
                dimd.classList.toggle("on");
                console.log(modalOwner.classList.value);
                if(modalOwner.classList.value === "modal owner modal-on"){
                    modalOwner.style.bottom = "0px";
                    
                    modalMenuBtnOwner.forEach((btn)=>{
                        btn.disabled = false;
                        
                    });
                } else {
                    modalOwner.style.bottom = `-${modalOwnerBottomValue}px`;
                    modalMenuBtnOwner.forEach((btn)=>{
                        btn.disabled = true;
                    });
                }
            })
        } else {
            target.addEventListener("click",()=>{
                modalUser.classList.toggle("modal-on");
                dimd.classList.toggle("on");
                console.log(modalUser.classList.value);
                if(modalUser.classList.value === "modal user modal-on"){
                    modalUser.style.bottom = "0px";
                    
                    modalMenuBtnUser.forEach((btn)=>{
                        btn.disabled = false;
                        
                    });
                } else {
                    modalUser.style.bottom = `-${modalUserBottomValue}px`;
                    modalMenuBtnUser.forEach((btn)=>{
                        btn.disabled = true;
                    });
                }
            })
        }
        
    })

    dimd.addEventListener("click",()=>{
        if(modalOwner.classList.value === "modal owner modal-on"){
            modalOwner.classList.toggle("modal-on");
            dimd.classList.toggle("on");
            modalOwner.style.bottom = `-${modalOwnerBottomValue}px`;
            modalMenuBtnOwner.forEach((btn)=>{
            btn.disabled = true;
            });
        } else {
            modalUser.classList.toggle("modal-on");
            dimd.classList.toggle("on");
            modalUser.style.bottom = `-${modalUserBottomValue}px`;
            modalMenuBtnUser.forEach((btn)=>{
                btn.disabled = true;
            });
        }
    })


}

function Profile(){
    const postList = document.querySelector('.post-list');
   
    const modal = document.querySelector(".modal");
    const modalBtns = document.querySelectorAll(".btn-list-modal");
    const dimd = document.querySelector(".dimd");
    const listCount = document.querySelector(".list-modal-container").childElementCount;

    let bottomValue = (listCount*46)+46;
    
    modal.style.bottom = `-${bottomValue}px`;


    postList.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('btn-post-menu')) {
        // 모달 띄우기
        
        modal.classList.toggle("modal-on");
        dimd.classList.toggle("on");
        if(modal.classList.value === "modal modal-on"){
            modal.style.bottom = "0px";
            modalBtns.forEach((btn)=>{
                btn.disabled = false;
                });
        }else {
            modal.style.bottom = `-${bottomValue}px`;
            modalBtns.forEach((btn)=>{
                btn.disabled = true;
                });
        }
    }
});


dimd.addEventListener("click",()=>{
    modal.classList.toggle("modal-on");
    dimd.classList.toggle("on");
    modal.style.bottom = `-${bottomValue}px`;
    modalBtns.forEach((btn)=>{
    btn.disabled = true;
    });
})


const profileMenu = document.querySelector(".btn-profile-menu");
const modalProfile = document.querySelector(".frofile-menu");
const modalBtnsProfile = document.querySelectorAll(".btn-list-modal-prof");
const listCountProfile = document.querySelector(".list-modal-container-profile").childElementCount;
const dimdpro = document.querySelector(".dimd.pro");

let bottomValueProfile = (listCountProfile*46)+46;
    
modalProfile.style.bottom = `-${bottomValueProfile}px`;


profileMenu.addEventListener("click",()=>{
    modalProfile.classList.toggle("modal-on");
    dimdpro.classList.toggle("on");
    
    if(modalProfile.classList.value === "modal frofile-menu modal-on"){
        modalProfile.style.bottom = "0px";
        modalBtnsProfile.forEach((btn)=>{
        btn.disabled = false;
        });
    } else {
        modalProfile.style.bottom = `-${bottomValueProfile}px`;
        modalBtnsProfile.forEach((btn)=>{
        btn.disabled = true;
        });
    }
})

dimdpro.addEventListener("click",()=>{
    modalProfile.classList.toggle("modal-on");
    dimdpro.classList.toggle("on");
    modalProfile.style.bottom = `-${bottomValue}px`;
    modalBtnsProfile.forEach((btn)=>{
    btn.disabled = true;
    });
})


}