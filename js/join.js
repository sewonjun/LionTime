// 이메일 유효성 검사 
document.addEventListener('DOMContentLoaded', () => {
    const inputemail = document.querySelector('#emailInput');
    const message = document.querySelector('.emailMessage');
    const isEmail = (value) => {
        return (value.indexOf('@') > 1) &&
            (value.split('@')[1].indexOf('.') > 1 
    }

    inputEmail.addEventListener('keyup', (event) => {
        const value = event.currentTarget.value
        if (isEmail(value)) {
            inputAlert.style.color = "green"
            inputAlert.textContent = ``
        } else {
            inputAlert.style.color = 'red'
            inputAlert.textConetent = `*이미 가입된 이메일입니다.`
        }
    })
})