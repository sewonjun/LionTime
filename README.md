# LionTime

LionTime은 자신의 스토에서 판매하는 상품을 등록하여 홍보할 수 있는 SNS입니다.
상품을 등록하지 않아도 일상을 공유하며 자유로운 SNS 활동을 할 수 있습니다. 글과 사진을 함께 게시물로 작성하여 자신의 일상을 공유 할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할수도 있습니다.

## 멤버

-   김민찬 / 이춘구 / 전세원 / 정기수

## 1. 목표와 기능

바닐라 자바스크립트를 이용한 SNS 프론트엔드 개발 구현과 API를 이용한 서버 연결

### 1.1 목표

### 1.2 기능

## 2. 개발 환경 및 배포 URL

### 2.1 개발 환경

[브랜치 전략](https://acute-repair-803.notion.site/LionTime-a0e407d3cf314098bbaa692af9576a0c)

### 2.2 배포 URL

## 3. 프로젝트 구조와 개발 일정

### 3.1 프로젝트 구조

```
│  .gitignore
│  .prettierrc
│  index.html
│  README.md
│
├─ css
│      404.css
│      chatList.css
│      chatRoom.css
│      home.css
│      join.css
│      joinProfile.css
│      login.css
│      loginEmail.css
│      post.css
│      postUpload.css
│      productAdd.css
│      productModification.css
│      profile.css
│      profileFollower.css
│      profileModification.css
│      search.css
│
├─ font
├─ images
│      404.png
│      default-profile-img-small.png
│      default-profile-img.png
│      icon-arrow-left.png
│      icon-heart-fill.png
│      icon-heart.png
│      icon-home-fill.png
│      icon-home.png
│      icon-img-button-fill.png
│      icon-img-button.png
│      icon-img-layers.png
│      icon-img.png
│      icon-message-fill.png
│      icon-message-small.png
│      icon-message.png
│      icon-more-vertical-small.png
│      icon-more-vertical.png
│      icon-post-add.png
│      icon-post-album-off.png
│      icon-post-album-on.png
│      icon-post-list-off.png
│      icon-post-list-on.png
│      icon-profile-fill.png
│      icon-profile.png
│      icon-search.png
│      icon-share.png
│      icon-x.png
│      logo-facebook.png
│      logo-google.png
│      logo-kakaotalk.png
│      logo-main.png
│      logo-symbol-gray.png
│      logo-symbol-white.png
│
├─ js
└─ pages
        404.html
        chatList.html
        chatRoom.html
        home.html
        join.html
        joinProfile.html
        login.html
        loginEmail.html
        post.html
        postUpload.html
        productAdd.html
        productModification.html
        profile.html
        profileFollower.html
        profileModification.html
        search.html
```

### 3.2 개발일정

## 4. 역할분담

-   김민찬 - 채팅, 하단 탭 메뉴, 모달 버튼
-   이춘구 - 프로필, 팔로우
-   전세원 - 스플래쉬, 로그인, 회원가입, 홈, 검색
-   정기수 - 상품 등록, 게시글

## 5. UI

[Figma](https://www.figma.com/file/Gn6gQJdYwImYsEYSzBXhud/%EB%A9%8B%EC%82%AC_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%8A%A4%EC%BF%A8?node-id=7678%3A92530)

## 6. 메인 기능

### Splash

-   서비스 접속 초기화면입니다.
-   splash 화면이 잠시 나온 뒤 다음 페이지가 나타납니다.
    -   로그인을 하지 않은 경우 : 로그인 화면
    -   로그인이 되어 있는 경우 : LionTime 피드

### 로그인

-   로그인은 **로그인 메인 화면**과 **이메일 로그인 화면**으로 나눠져 있습니다.
-   SNS(카카오톡, 구글, 페이스북) 로그인은 구현하지 않으며, 화면에 버튼만 배치하도록 합니다.
-   로그인 메인 화면에서 `이메일로 로그인` 을 클릭하면 이메일로 로그인할 수 있는 화면으로 이동합니다.
-   이메일과 비밀번호를 모두 입력하면 `다음` 버튼이 활성화 됩니다. 입력되지 않은 입력창이 있다면 버튼은 활성되지 않습니다.
-   `로그인` 버튼을 클릭하면 이메일 주소와 로그인에 대한 유효성 검사를 진행하며, 이메일 주소 또는 비밀번호가 일치하지 않을 경우에는 경고 문구가 나타납니다.
-   입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)

### 회원가입

-   로그인 메인 화면에서 `회원가입` 을 누르거나 이메일 로그인 화면에서 `이메일로 회원가입` 을 누르면 회원가입 화면이 나타납니다.
-   회원가입 페이지에서는 유효성 검사가 로그인 페이지와 조금 다르게 진행됩니다.
-   이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시됩니다.
-   이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우, 또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
-   입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 주황색, #F26E22)
-   작성이 완료된 후, 유효성 검사를 통과할 경우 `다음` 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 폼이 나타납니다.
-   프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받습니다.
    -   프로필 사진은 등록하지 않을 경우 기본 이미지가 등록되게 합니다.
    -   사용자 이름과 소개는 다른 사용자와 중복될 수 있습니다.
    -   계정 ID는 중복이 불가합니다.
    -   프로필 설정에서도 같은 방식으로 유효성 검사가 진행됩니다. 계정 ID에 대한 중복 유무와 형식을 검사합니다.

### LionTime 피드 (홈 화면)

-   감귤마켓 피드는 사용자들이 올린 게시글들이 표시되는 페이지입니다.
-   감귤마켓 피드에는 자신이 팔로우한 사용자의 게시글만 확인할 수 있습니다.
-   팔로우한 사용자가 없을 경우와 내가 팔로우한 사용자가 올린 게시글이 없는 경우 "유저를 검색해 팔로우 해보세요!" 문구와 함께 `검색하기` 버튼이 표시됩니다.

### 검색

-   감귤마켓 피드 상단에 돋보기 버튼(검색 버튼)을 클릭하면 표시되는 페이지입니다.
-   사용자 이름을 검색할 수 있는 페이지입니다.
-   마크업만 구현한 상태입니다.

## 7. 추가 기능

## 8. 개발하며 느낌점

-   김민찬
-   이춘구
-   전세원
    LionTime 프로젝트는 시멘틱 마크업에 신경을 쓰려 노력했지만, 기능 구현을 위해 어쩔 수 없이 들어가게 되는 태그들을 어떻게 넣어야 할 지 고민을 많이 하게 되는 프로젝트였습니다. 이미지를 가상요소의 배경으로 넣을때 스크린리더기가 충분히 읽을 수 있는 구조로 짜기 위해 노력했습니다. <br>
    이번 프로젝트를 통해 팀 협엽시 깃 사용법, 깃 충돌 관리법, 컨밴션 정하기 등 협업 시 필요한 많은 것들을 배웠습니다. 생각보다 많은 대화가 필요한 것이 초기 셋팅이라는 생각이 들었고 중간에도 틈틈히 소통을 해야 개발이 잘 이루어질 수 있겠다는 점을 느낀 프로젝트였습니다. 서로 틈틈히 소통을 하고 팀원들이 많이 도와준 덕에 처음 해본 프로젝트여서 많은 부족함이 있었지만 무사히 LionTime을 개발 할 수 있었습니다. 협업이 프로젝트에 얼마나 중요한지 알게 된 프로젝트입니다.
-   정기수
