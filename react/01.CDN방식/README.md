# 01. CDN 방식 React

## 개요

CDN 방식은 `npm` 없이 외부 라이브러리를 CDN 에서 가져와 사용하는 방식입니다.
단순하게 HTML 파일에 스크립트 태그만 추가하는 방식입니다.

## 장점

- **설치 과정이 빠름**: `npm install` 없이 바로 실행 가능
- **경량**: 추가 의존성 없음
- **단점**: 개발자가 컴포넌트를 재사용해야 할 때 관리가 어려움

## 적용 방법

`<script type="module">` 태그를 사용하여 ES6 모듈로 React 및 ReactDOM 을 불러옵니다.

### CDN 연결 경로

| 라이브러리   | URL                                                              |
| ------------ | ---------------------------------------------------------------- |
| React        | `https://unpkg.com/react@18/umd/react.production.min.js`         |
| ReactDOM     | `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js` |
| Babel (필수) | `https://unpkg.com/@babel/standalone/babel.min.js`               |

### 스크립트 로드 순서

1. React
2. ReactDOM
3. Babel

## 프로젝트 구조 예시

```
react/
└── 01.CDN방식/
    ├── README.md
    └── index.html (학습자 채워짐)
```

## 예제 코드 (index.html)

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CDN 방식 React</title>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel" src="index.html"></script>
  </body>
</html>
```

## 학습 가이드

1. CDN 에서 React, ReactDOM, Babel 로딩
2. `<script type="text/babel">` 를 사용한 컴포넌트 작성
3. `createRoot()` 를 사용한 렌더링

---

**다음**: 02. CRA 방식  
**이전**: 00. 개요
