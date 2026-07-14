# Shinsegae Square Media Art Awards Review System

신세계스퀘어 미디어아트 어워즈 온라인 심사 시스템 MVP입니다.

## 구조

- 하나의 Next.js 앱 서버에서 관리자와 심사위원 화면을 함께 제공합니다.
- `/login`에서 역할을 선택해 로그인합니다.
- 관리자 로그인 시 `/admin/dashboard`로 이동합니다.
- 심사위원 로그인 시 `/judge/evaluation`로 이동합니다.

## 데모 계정

| 역할 | 이메일 | 비밀번호 |
| --- | --- | --- |
| 관리자 | admin@shinsegaeawards.kr | password |
| 심사위원 | hong@jury.kr | password |

## 주요 URL

- 통합 로그인: `/login`
- 관리자 대시보드: `/admin/dashboard`
- 심사위원 평가 페이지: `/judge/evaluation`
- 관리자 로그인 바로가기: `/admin/login`
- 심사위원 로그인 바로가기: `/judge/login`

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000/login`으로 접속합니다.

## GitHub 배포 메모

GitHub 저장소에 올린 뒤 Vercel, Netlify, Render 같은 하나의 웹 서버/호스팅에 연결하면 됩니다.
현재 MVP는 더미 데이터를 사용하며, 실제 계정/권한/DB 연동은 Supabase 또는 PostgreSQL 연결 단계에서 붙이면 됩니다.
