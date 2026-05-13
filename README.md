# GuestBook 서비스 소개

## 개요
React와 Tailwind CSS로 구현한 심플한 방명록 서비스입니다. 별도의 백엔드 없이 클라이언트 상태만으로 동작하며, 누구나 쉽게 닉네임과 한 줄 메시지를 남길 수 있습니다.

<p align="center">
<img width="635" height="661" alt="Image" src="https://github.com/user-attachments/assets/49486ac8-c271-454c-a4e0-630844ac34e1" />
</p>

## 기술 스택
* React 18 — 컴포넌트 기반 UI, useState로 상태 관리
* Tailwind CSS 3 — 유틸리티 클래스 기반 스타일링
* Create React App — 개발 서버 및 빌드 도구

## 기능
### 글 작성
* 닉네임(최대 20자)과 메시지(최대 100자) 입력
* 버튼 클릭 또는 엔터 키로 등록
### 입력 검증
* 닉네임 또는 메시지가 비어있으면 에러 문구 표시
* 글자 수 초과 시 에러 문구 표시
* 메시지 입력창 하단에 실시간 글자 수 표시
### 글 목록
* 최신 글이 상단에 표시 (최신순 정렬)
* 등록 날짜와 시간 표시 (한국 시간 기준, YYYY. MM. DD. HH:MM)
* 전체 글 수 표시
* 닉네임 첫 글자로 자동 생성되는 컬러 아바타
### UX
* 등록 성공 시 버튼이 "✓ 등록되었습니다!"로 2초간 변경
* 글 등록 후 입력 필드 자동 초기화

# deployToAWS.yml 소개
## 워크플로우 이름
GitHub Actions 탭에서 표시되는 워크플로우 이름
```yml
name: Deploy to AWS S3 (Academy)
```
## 트리거
main 브랜치에 push가 발생할 때만 자동으로 실행
```yml
on:
  push:
    branches:
      - main
```
## 실행 환경
Ubuntu 리눅스 서버에서 실행, 워크플로우가 시작될 때 생성되고 끝나면 사라짐.
```yml
runs-on: ubuntu-latest
```
## 실행 순서
1. Checkout source code  

GitHub 레포지토리의 코드를 Ubuntu 서버로 가져옴.
```yml
uses: actions/checkout@v4
```
2. Set up Node.js
Node.js 18을 설치  

cache: npm으로 node_modules를 캐싱해서 다음 실행부터 설치 속도 빨라짐.
```yml
uses: actions/setup-node@v4
with:
  node-version: 18
  cache: npm
```
3. Install dependencies  

package.json을 기준으로 의존성 패키지를 설치
```yml
run: npm install
```
4. Build  

React 앱 빌드
```yml
run: npm run build
```
5. Configure AWS credentials  

GitHub Secrets에 저장된 AWS 자격증명으로 인증
```yml
uses: aws-actions/configure-aws-credentials@v4
with:
  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  aws-session-token: ${{ secrets.AWS_SESSION_TOKEN }}
  aws-region: us-east-1
```
6. Deploy to S3  

빌드된 build/ 폴더를 S3 버킷에 업로드  

--delete로 S3에만 남아있는 불필요한 파일을 자동 삭제  

git과 .github 폴더는 업로드 대상에서 제외
```yml
run: |
  aws s3 sync ./build s3://${{ secrets.S3_BUCKET_NAME }} --delete \
    --exclude ".git/*" \
    --exclude ".github/*"
```

# AWS url
## 과제 1) Github Actions를 활용하여 CI/CD 환경 구축
<http://dmu-guestbook.s3-website-us-east-1.amazonaws.com>
## 과제 2) AWS Amplify 서비스를 활용하여 호스팅하기
<https://main.d21uyp5ra5ovrt.amplifyapp.com>
  

# youtube link
## 과제 1) Github Actions를 활용하여 CI/CD 환경 구축
<https://youtu.be/JHPprcujumI>
## 과제 2) AWS Amplify 서비스를 활용하여 호스팅하기
<https://youtu.be/diAc1-2ka4k>