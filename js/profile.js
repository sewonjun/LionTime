const API_URL = 'http://146.56.183.55:5050';
const TARGET_ID = location.href.split('?')[1];
const SESSION_ID = sessionStorage.getItem('user-token');

//  본인 프로필인지 남의 프로필인지 확인해서 분기
if (TARGET_ID === SESSION_ID) {
    const othersUtil = document.querySelector('.profile-utils-others');
    othersUtil.remove();
} else {
    const myUtil = document.querySelector('.profile-utils-mine');
    myUtil.remove();
}
