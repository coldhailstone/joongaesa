# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**joongaesa (중개사닷컴)** — 부동산 중개인을 위한 고객 및 매물 관리 웹 애플리케이션. Vue 3 + TypeScript + Firebase 기반의 SPA.

## 개발 명령어

```bash
npm install       # 의존성 설치
npm run serve     # 개발 서버 실행 (hot reload)
npm run build     # 프로덕션 빌드
npm run lint      # ESLint 검사 및 자동 수정
```

테스트 프레임워크는 현재 설정되어 있지 않음.

## 아키텍처

### 기술 스택
- **Vue 3** + **TypeScript** + **Vue CLI 5**
- **Vuex 4**: 전역 상태 관리
- **Vue Router 4**: SPA 라우팅
- **Firebase 9**: Auth, Firestore, Storage, App Check (ReCaptcha v3)
- **Bootstrap Vue 3** + **Bootstrap 5**: UI 컴포넌트
- **SCSS**: 스타일 전처리

### 디렉토리 구조

```
src/
├── api/            # Firebase 초기화 및 CRUD 유틸, Daum 주소 API
├── components/     # 재사용 컴포넌트
│   ├── common/     # 알림 (Notification)
│   ├── layout/     # NavBar, Footer
│   ├── form/       # 공통 폼 컴포넌트 (FormInput, FormAddress, FormFile 등)
│   ├── estate/     # 매물 카드, 매물 상세 모달
│   └── customer/   # 고객 카드, 고객 상세/결과 모달
├── router/         # 라우트 정의 및 네비게이션 가드
├── store/          # Vuex 모듈 (user, loading, estate, customer)
├── types/          # TypeScript 인터페이스 (Estate, Customer, CustomerResult)
├── utils/          # 공통 함수 (common.ts), 상수 (constants.ts)
└── views/          # 페이지 컴포넌트
    ├── auth/       # Login, Join
    ├── estate/     # EstateList, EstateAdd (등록/수정 겸용)
    └── customer/   # CustomerList, CustomerAdd (등록/수정 겸용)
```

### 상태 관리 (Vuex)

스토어는 도메인별 모듈로 분리됨:

| 모듈 | 역할 |
|------|------|
| `user` | Firebase Auth 사용자 상태, 로그인/로그아웃 액션 |
| `loading` | 전역 로딩 오버레이 (`isLoading` 불리언) |
| `estateList` | 매물 목록 조회 및 생성 |
| `estateDetail` | 매물 상세 조회, 수정, 삭제 |
| `customerList` | 고객 목록 조회 및 생성 |
| `customerDetail` | 고객 상세 조회, 수정, 삭제, 거래 결과(result 서브컬렉션) |

### Firebase API 패턴

`src/api/firebase.ts`에 공통 CRUD 유틸이 정의되어 있으며, 스토어 액션에서 이를 사용함:

```typescript
getList(path, queryList)    // 컬렉션 목록 조회 (where 조건 배열)
getDetail(path, id)         // 단일 문서 조회
addData(path, body)         // 문서 생성
updateData(path, id, body)  // 문서 수정
deleteData(path, id)        // 문서 삭제
uploadFile(file)            // Storage 이미지 업로드 → { name, url } 반환
```

Firestore 쿼리 조건 추가는 `utils/common.ts`의 `addQuery(list, key, value)` 유틸 사용.

### 라우팅 및 인증 가드

`router/index.ts`의 `beforeEach` 가드에서 `'매물 관리'`, `'고객 관리'` 라우트 이름에 대해 로그인 여부를 체크. 미인증 시 `/login`으로 리다이렉트.

`EstateAdd`와 `CustomerAdd`는 등록(`/new`)과 수정(`/:id`) 라우트를 동일 컴포넌트로 처리 — 라우트 파라미터 `id` 유무로 분기.

### 폼 컴포넌트 패턴

`src/components/form/` 하위 컴포넌트들은 모두 `v-model`로 바인딩하는 방식으로 설계됨:
- `FormInput`: 텍스트/숫자/날짜/시간 입력 (접두사/접미사 지원)
- `FormAddress`: Daum 주소 검색 API 연동 (우편번호 + 주소 자동 입력)
- `FormFile`: 드래그 앤 드롭 이미지 업로드 (Firebase Storage 연동)
- `FormRadio`, `FormCheckbox`: 상수 배열 기반 옵션 선택
- `FormTextarea`: 텍스트 영역

### 상수 및 공통 유틸

`src/utils/constants.ts`에 건물형태, 거래유형, 방구조 등 모든 선택지 상수가 정의됨. 폼 컴포넌트 옵션 생성 시 `utils/common.ts`의 `setOptions(constant)` 사용.

## 환경 변수

로컬 개발 시 `.env` 파일에 Firebase 설정 필요:

```
VUE_APP_FIREBASE_API_KEY
VUE_APP_FIREBASE_AUTH_DOMAIN
VUE_APP_FIREBASE_PROJECT_ID
VUE_APP_FIREBASE_STORAGE_BUCKET
VUE_APP_FIREBASE_MESSAGING_SENDER_ID
VUE_APP_FIREBASE_APP_ID
VUE_APP_FIREBASE_MEASUREMENT_ID
VUE_APP_FIREBASE_RECAPTCHA_KEY
VUE_APP_FIREBASE_DEBUG_TOKEN_CI   # localhost App Check 디버그 토큰
```

## 코드 스타일

- **Prettier**: 싱글 쿼트, 탭 폭 4, 라인 길이 100
- **ESLint**: Vue 3 essential + TypeScript + Prettier 통합
- `strict: false` — 느슨한 TypeScript 타입 검사 적용 중
- 경로 별칭 `@` → `src/`
