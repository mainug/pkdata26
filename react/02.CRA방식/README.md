# 02. CRA 방식 (Create React App)

## 개요

**Create React App (CRA)** 는 React 애플리케이션을 빠르게 생성하는 개발 도구입니다. 2017 년 스톡홀름 컨퍼런스에서 소개되었으며, `create-react-app` 명령어를 통해 React 프로젝트 자동 생성을 가능하게 했습니다.

### 등장 배경

- 2015 년, CRA 템플릿이 공개되어 Popcorn Time 프로젝트를 위한 React 앱 개발
- 2017 년 스톡홀름 컨퍼런스 공식 발표 및 대중적 인지 확대
- 개발자가 복잡한 설정 없이 React 프로젝트를 빠르게 시작할 수 있었기 때문

### 현재 상태

- **2020 년 공식 지원 종료** (deprecated)
- **2026 년 트렌드**: 대부분 Vite 나 Next.js 등 다른 도구로 전환

---

## 기본 작동 원리

### 설치 방법

```bash
# CRA 설치
npx create-react-app my-app

# 또는 (CRA v5)
npx create-react-app@latest my-app
```

### 프로젝트 생성 후 파일 구조

```
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── index.js
│   ├── App.css
│   └── App.js
├── package.json
└── README.md
```

### 핵심 명령어

```bash
# 개발 서버 실행 (Hot Reload 지원)
npm start

# 빌드
npm run build

# 코드 스타일링 (Prettier)
npm run lint

# 테스트
npm test
```

---

## 장점

### 1. **자동화된 설정**

- 개발자가 파일 구조, 의존성, 설정을 직접 설정할 필요 없음
- 개발 도구 체인 (Babel, ESLint, Prettier) 자동 설정

### 2. **Hot Module Replacement (HMR)**

- 컴포넌트 변경 시 브라우저가 자동으로 업데이트
- 개발 생산성 향상

### 3. **코드 최적화 자동**

- Babel 의 `production.build()` 호출
- CSS/JavaScript/CSS3 최적화 자동

### 4. **플러그인 생태계**

- CRA 플러그인 시스템 지원
- 필요한 기능만 선택적으로 추가 가능

---

## 단점

### 1. **설정 시간 낭비**

- 기본 프로젝트 생성 후에도 설정 작업 필요
- 복잡한 프로젝트에서는 비효율적

### 2. **빌드 속도 느림**

- Webpack 기반 빌드 도구
- 대형 프로젝트에서 빌드 시간이 오래 걸림

### 3. **Node.js 의존성**

- Node.js 환경 필수 필요
- 서버less 환경에서는 불리

### 4. **2020 년 공식 지원 종료**

- 최신 기능 업데이트 누락
- 보안 패치 받기 어려움

### 5. **의존성 업데이트 어려움**

- 패키지 경직 (legacy) 현상
- 보안 업데이트 주기적 지연

---

## 2026 년 현재 트렌드

### CRA 사용 감소 이유

- **Vite 의 빠른 빌드 속도** (수백 배)
- **Next.js 의 SSR/SSG 기능** (SEO 최적화)
- **Rspack/Rollup 등의 대체 빌드 도구** 부상

### 2026 년 React 프로젝트 생성 트렌드

```
순수 React 프로젝트 → Vite 권장
- 빠른 개발 서버
- 빠른 빌드
- Node.js 불필요

대규모/복잡한 프로젝트 → Next.js 권장
- SSR/SSG/ISR 지원
- API route 지원
- SEO 최적화

웹 애플리케이션 → Remix 권장
- 서버 측 로직 통합
- URL 매핑 자동
```

### CRA 아예 안 쓸 경우

- **새 프로젝트**: Vite 나 Next.js 사용 권장
- **CRA 프로젝트 유지**: 2026 년 초만 유지
- **업그레이드 필요**: Vite 나 Next.js 로 전환 고려

---

## 대안 도구

### 1. **Vite (권장)**

- 빠른 빌드 속도 (HMR 포함)
- Node.js 불필요한 경우에도 사용
- 2026 년 새 프로젝트의 1 순위 선택

### 2. **Next.js (공식)**

- React 의 공식 번들
- SSR/SSG/ISR 최적화
- API route 지원

### 3. **Remix**

- 웹 애플리케이션 프레임워크
- 서버 측 로직 통합
- URL 매핑 자동

### 4. **Qwik (새로운 트렌드)**

- 렌더링-free 웹 프레임워크
- 2026 년 신규 프로젝트 인기
- 빠른 성능, 작은 앱 크기

---

## CRA 와 다른 도구 비교

| 기능         | CRA  | Vite      | Next.js |
| ------------ | ---- | --------- | ------- |
| 빌드 속도    | 느림 | 매우 빠름 | 중간    |
| SSR 지원     | ❌   | ❌        | ✅      |
| HMR          | ✅   | ✅        | ✅      |
| SEO 지원     | ❌   | ❌        | ✅      |
| API route    | ❌   | ❌        | ✅      |
| Node.js 필수 | ✅   | ❌        | ✅      |
| 2026 년 추천 | ❌   | ✅        | ✅      |

---

## 요약

- **CRA 는 과거 프로젝트 생성을 위한 도구였으나**, 2020 년 공식 지원 종료 후 점차 사용 감소
- **2026 년에는 Vite 나 Next.js 등 더 효율적인 도구를 사용**
- **새로운 프로젝트**: Vite (순수), Next.js (SSR/SEO 필요) 권장
- **기존 CRA 프로젝트**: 유지보수 가능하나 새 기능에는 접근 불가

---

**다음**: 03. VITE 방식  
**이전**: 01. CDN 방식
