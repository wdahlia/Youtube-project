# Youtube Clone Coding
<br>

### 최종 화면

![DarkMode](https://user-images.githubusercontent.com/108653518/235184615-479ee4de-e587-43c4-9a7a-94242642df66.gif)
- `DarkMode`
<br>

![Main](https://user-images.githubusercontent.com/108653518/235185360-e7b97ba5-c9a8-43c1-ab59-b24245189a6f.gif)
- `메인 화면`
<br>

![ezgif-5-7e95e93644](https://user-images.githubusercontent.com/108653518/235186494-947b8fec-864d-41e7-aed7-4f319edab290.gif)
- `Aside`
<br>

![SearchBar](https://user-images.githubusercontent.com/108653518/235184609-064fe27c-3da1-4630-8dee-7e259ad0ba03.gif)
- `SearchBar`
<br>

![VideoArea](https://user-images.githubusercontent.com/108653518/235184604-0e3c2abc-6d90-45da-b607-ee170b33816d.gif)
- `검색 결과`
<br>

![무제_AdobeExpress](https://user-images.githubusercontent.com/108653518/235184596-c83bf6de-7e90-43ab-a043-fe2c388d2ada.gif)
- `비디오 상세 페이지`
<br>



- Youtube API 사용 페이지 구현
	- 해당 API 호출 횟수 제한되어 있으므로, 
	- 목업 데이터 생성해서 페이지 구성
- **Context API** 사용, darkMode Toggle 구성
- **Route** 사용
	- `/`  : 메인 페이지 (로고 클릭, aside의 navbar의 홈 클릭시에도 이동 되게끔 구성)
	- 검색 시 `?q={search value}` 전송
		- path : `/results`
		- search value 하고 map 내부 components에서 channelId 가지고 또 api 호출 보내줘야함
	- 각 영상 썸네일 클릭시, 해당 디테일 페이지 이동 `?v={videoId}`
		- path : `/watch`
		- videoId 전달해서 보내기
- API 사용 시, **Tanstack React-Query** 사용해서 API 데이터 관리

- `API 요청`
	- 모든 API 요청은 **GET** 
		- BaseURL : `https://youtube.googleapis.com/youtube/v3/`
		- `/search/`
			- `params`
				- **api_key**
				- **q** 
					- 검색 값
				- **maxResults** 
					- 페이지당 최대로 결과 몇 개까지 받아올건지
					- Acceptable values are `0` to `50` 
					- default values are 5
				- **regionCode**
					- string
					- country code 작성, KR로 설정했음
				- **type**
					- default value는 channel,playlist,video 지만
					- 임의적으로 설정 가능
				- **part**
					- snippet으로 설정
		- `/videos/`
		- `/channels/`
			- `params`
				- **api_key**
				- **id**
					- ChannelId값 넣어주기
				- **part**
					- snippet으로 설정
			

- `pages`
	- `Root`
		- Nav Component
		- Router의 children이 표시될 영역인 Outlet
	- `Main`
		- BaseURL + `/videos/`
		- **인기동영상** 25개 데이터 fetch해서 map 함수 이용하여 VideoCard 컴포넌트로 데이터 뿌려주기
		- VideoCard Component
	- `VideoArea`
		- **검색한 동영상**이 표시되는 영역
		- fetch해 온 25개의 검색 데이터 사용, map 함수 이용해서 VideoCard 컴포넌트로 데이터 뿌려주기
		- VideoCard Component
	- `VideoDetail`
		- 각 썸네일을 클릭 시 동영상의 세부 내용, 연관 동영상 표시
		- RelatedVideo 컴포넌트
<br>

- `Components`
	- `Nav`
		- icon - SVG
		- 내부 `SearchBar`는 별도의 컴포넌트 이용
	- `SearchBar`
		- focus 되었을때 backgroundColor 다르게 설정
	- `VideoCard`
		- VideoCard 내부에서 ChannelId 가지고 다시 Channels로 data fetch해서 channel thumb Image 받아와야함
		


### 오류 해결

#### yarn start 했을 때
- `"react" was conflicted between "package.json » eslint-config-react-app` 오류 발생

- 해결 
- eslint 구성의 문제
	1. 프로젝트에서 `eslint-config-react-app`가 설치되어 있는지 확인합니다. 만약 설치되어 있지 않다면 아래의 명령어로 설치
		- `yarn add eslint-config-react-app --dev`
	    
	2.  프로젝트에서 사용 중인 React 버전과 `eslint-config-react-app` 버전이 호환되는지 확인합니다. 호환되지 않는 경우, React 버전을 업그레이드하거나 `eslint-config-react-app` 버전을 다운그레이드하여 해결할 수 있습니다.
	    
	3.  `.eslintrc` 파일에 다음과 같은 설정을 추가.
		- `{ "extends": "react-app" }`
	    
	4.  프로젝트 루트 디렉토리에서 `yarn cache clean` 명령어를 실행하여 캐시를 삭제.
	    
	5.  `yarn install` 명령어를 실행하여 의존성 패키지를 다시 설치.
    
	
- 위의 단계를 시도해보고 여전히 문제가 발생 시, `node_modules` 폴더와 `yarn.lock` 파일을 삭제한 후 `yarn install` 명령어를 실행. 이렇게 하면 모든 의존성이 다시 설치.

#### 구조 분해 할당 오류
- `Cannot destructure property 'statistics' of 'channels' as it is undefined.`
	- statistics와 channels가 undefined 이기 때문에 구조 분해 할당을 할 수 없다는 이유
- 해결 방법
	- 비동기 통신이기 때문에 값을 fetching 해오지 않아도 밑의 코드가 실행이 됨
	- async, await나 setTimeOut 사용하여 해결, useQuery에서도 역시나 비동기 통신이기때문에
	- 값을 받아오는 시간이 있음에도 불구하고 밑의 코드가 실행되기에 구조분해 할당 오류 나는 것
	- 또다시 오류 발생, 병렬적으로 실행되다보니 전역에서 호출해서 출력하는 것에 문제 생김
	-  useQueries를 사용하여 해결 
