# LionTime

LionTime은 커뮤니티 웹사이트이고 어쩌구...

## 멤버

-   김민찬 / 이춘구 / 전세원 / 정기수

## 1. 목표와 기능

### 1.1 목표
라이언 타임은 게시물을 작성하고 댓글, 좋아요를 주고받는 모바일 커뮤니티 플랫폼입니다.  
사용자들이 실시간으로 게시글을 업로드하고 댓글을 달며 소통할 수 있는 플랫폼이 되는 것을 목표로 합니다.
### 1.2 기능
- 로그인/회원가입
- 홈 피드
- 사용자 프로필
- 팔로워, 팔로잉
- 내 프로필 수정
- 상품 등록/수정/삭제
- 게시글 등록/수정/삭제
- 게시글 댓글/좋아요
- 채팅 목록
- 채팅방
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
<details>
    <summary>상품 등록</summary>  

- 나의 프로필 페이지에서 `상품등록` 버튼을 클릭하면 상품을 등록할 수 있는 페이지가 나타납니다.  
- 상품 이미지, 상품명, 가격, 판매링크를 입력받을 수 있으며, 모든 입력이 완료되면 `저장` 버튼이 활성화됩니다.  
- 상품명은 2~15자 이내로 입력되게 하고, 가격은 숫자를 입력하면 자동으로 원단위로 변환시킵니다.
- URL로 상품 id를 전달 받으면 해당 상품을 수정합니다.
</details>
<details>
    <summary>게시글 페이지</summary>

- 우측의 토글 버튼을 누르고 게시글 작성자는 `수정/삭제` 버튼으로 해당 기능을 수행할 수 있고 사용자들은 신고하기 버튼으로 해당 게시글을 신고할 수 있습니다.
  - `수정` 버튼 클릭 시 게시글 작성 페이지로 이동하고 URL로 게시글의 id를 전달합니다.
  - `삭제` 버튼 클릭 시 삭제 확인 여부를 묻는 모달창이 뜨고 게시글을 삭제할 수 있습니다.
- 이미지 개수가 표시되고 이미지의 왼쪽/오른쪽을 클릭해서 넘길 수 있습니다.
</details>
<details>
    <summary>게시글 작성 페이지</summary>

- 게시글을 작성할 수 있는 페이지로, 하단 메뉴바에서 `게시글 작성` 을 클릭하면 표시됩니다.
- 글과 사진이 업로드 되면 `업로드` 버튼이 활성화되고, 버튼을 누르면 게시글이 업로드됩니다.
- 사진은 우측 하단 버튼을 클릭하면 업로드할 수 있으며, 최대 3장까지 업로드 가능합니다.
</details>


## 7. 추가 기능
<details>
    <summary>댓글</summary>

- 게시글 하단에 말풍선 아이콘을 클릭하면 댓글을 확인하고 입력할 수 있는 페이지가 나타납니다.
- 댓글 입력창에 텍스트를 입력하면 `게시` 버튼이 활성화됩니다.
- 댓글 작성자는 본인의 댓글을 삭제할 수 있고 사용자들은 다른 댓글을 신고할 수 있습니다.
- 댓글 삭제 및 신고하기 기능을 구현합니다.
- 댓글 작성이 현재 시간으로 부터 몇 초, 분, 시간 전에 작성되었는지 표시합니다.
- 댓글 개수는 카운트 되어 말풍선 아이콘 우측에 표시됩니다.
</details>
<details>
    <summary>좋아요</summary>

- 게시글이 나타나는 모든 페이지에 해당합니다.
- 게시글 하단에는 하트 모양에 좋아요 버튼이 있습니다.
- 빈 하트를 클릭하면 색이 칠해진 하트로 변하고, 색이 칠해진 하트를 누르면 빈 하트로 변합니다.
- 좋아요 개수는 카운트 되어 하트모양 우측에 표시됩니다.
</details>

## 8. 개발하며 느낌점

-   김민찬
-   이춘구
-   전세원
-   정기수  
새로운 사람들과 프로젝트를 처음 해보게 됐는데 팀원분들이 모두 열심히 해준 덕분에 무사히 프로젝트를 마칠 수 있었습니다. 완벽하다고 할 순 없지만 프로젝트를 완수했다는 게 뿌듯하고 완벽하지 못하기 때문에 배울 수 있는 것이 더 많았다고 생각합니다.<br> 프로젝트를 하면서 열심히 프로그래밍 하면서 오류를 해결하고 팀원들과 맞춰보기도 하면서 많이 배웠고 스스로 어떤 점이 부족한지 알게 되었습니다. 저를 한 단계 더 성장하게 해준 의미 있는 프로젝트였습니다.
