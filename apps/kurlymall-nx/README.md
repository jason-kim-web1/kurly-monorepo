# Kurlymall NX

## 설치

### node version setting (v14.16.1)

#### Kurlymall NX는 node version 14.16.1을 사용하고 있습니다. 레포를 사용하기 전에 node version이 14.16.1인지 확인합니다.

```bash
node -v
```

<img width="497" alt="image" src="https://github.com/thefarmersfront/kurlymall-nx/assets/97081934/5bd3e75c-6fd9-495d-a673-65bfc714fd87">

#### nvm을 사용하는 경우

현재 nvm default node version이 14.16.1이 아닌 경우 nvm use로 변경이 가능합니다.

```bash
# 예시) nvm을 사용하는 경우
nvm use
```

<img width="635" alt="image" src="https://github.com/thefarmersfront/kurlymall-nx/assets/97081934/2d96fa4f-abcb-4e96-9afb-33b0cbd3f75d">

추가적으로 아래 설정을 하면 해당 레포 사용 시 매번 nvm use 명령어를 사용 할 필요 없이 자동으로 node version이 14.16.1으로 변경됩니다.

https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file

<img width="619" alt="image" src="https://github.com/thefarmersfront/kurlymall-nx/assets/97081934/42e57234-5d7c-447e-8bb0-9be088046fcf">

### [kurly-web-sdk](https://github.com/thefarmersfront/kurly-web-sdk) package install을 위한 선행 작업

#### `~/.npmrc` (계정의 디렉토리의 `.npmrc`) 파일 열기

```bash
# 예시) vi editor

vi ~/.npmrc
```

#### `~/.npmrc`에 아래 내용 추가

\*<GITHUB_PERSONAL_ACCESS_TOKEN> : 사용자 Github Personal Access Token 으로 대체

[Github Personal Access Token 생성 방법](https://docs.github.com/ko/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fin[…]al-access-token)

```
//npm.pkg.github.com/:_authToken=<GITHUB_PERSONAL_ACCESS_TOKEN>
```
**참고: personal access token(classic) 사용시 다음의 권한 부여가 필요합니다(이미지 참고)**
![image](https://github.com/thefarmersfront/kurlymall-nx/assets/121470556/3f8ac162-5e14-4415-a033-afb245adf755)

### NPM Install

```bash
npm ci
```

## 실행

### NGINX 실행

- https://kurly0521.atlassian.net/wiki/spaces/WWWV3/pages/3190720136/docker

```
docker run -d --name kurlymall-nx -p 80:80 -v $(pwd)/nginx/default.conf:/etc/nginx/conf.d/default.conf nginx:1.20.0-alpine
```

### Next.js 실행

```
npm run dev
```

### .env 설정

`.env.example` 복사 후 `.env.local` 로 이름 변경

### 로컬 실행 도메인 설정
api.kurly.com CORS 설정 관련하여 Allowed origin header 값이 `*` 에서 `.kurly.com` , `.kurycorp.kr` 으로 제한됨에 따라 아래 경로 파일 내용에 DNS 설정을 추가해주세요.
```
sudo vi /etc/hosts

# 아래 내용을 추가해주세요.
127.0.0.1	www.local.kurly.com 
```

그리고나서 로컬 도메인은 `www.local.kurly.com`을 사용하셔야 정상적으로 api 응답을 받을 수 있습니다.

## 테스트

## 배포하기

### 빌드 명령어

```bash
# production
$ npm run build
# 나머지
$ npm run build:<환경>
```

#### Development

```shell
$ npm run build:dev
```

#### Stage

```shell
$ npm run build:stg
```

#### Perf 부하테스트 환경

```shell
$ npm run build:perf
```

#### Production

```shell
$ npm run build
```

### 개발환경에 배포하기

```bash
node cli/rancher.js
```

## 릴리즈 노트 포맷

```text
[정기배포|핫픽스 x.x.x ] - 선물하기, 3P상품 옵션 업데이트
```

```text
정기배포 - 2.10.1선물 내역에서 레이아웃 깨지는 현상을 수정하라. (#2785)
핫픽스 2.9.1.1 - 그룹콘텐츠 옵션 변경시 상품상세 설명 영역 데이터를 업데이트하라 (#2783)
```
