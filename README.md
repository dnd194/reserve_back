# Shuttle Booking Backend

## Overview
사내 임직원을 위한 통근 셔틀 예약 시스템 백엔드 포트폴리오입니다.  
노선(Route)–운행(Trip)–예약(Booking) 도메인을 중심으로 예약 생성/취소, 좌석 수 관리, 인증/인가 로직을 구현했습니다.


---

## Tech Stack
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- Auth: **JWT (Access Token, Cookie 기반)**

---

## Domain Model

### Core Domains
- **Route**: 셔틀 노선 정보
- **Trip**: 노선별 운행 시간 및 좌석 정보
- **Booking**: 사용자 예약 정보
- **User**: 인증/권한 주체

---

## Key Features

### 1. 운행(Trip) 조회
- 노선(routeId) 기준 운행 목록 조회
- 최대 좌석 대비 예약된 좌석 수 계산
- 프론트에서 잔여 좌석 표시 가능하도록 응답 구성

### 2. 예약 생성
- 잔여 좌석 초과 시 예약 불가 처리
- 동일 사용자 중복 예약 방지
- 예약 성공 시 예약 수 증가

### 3. 예약 취소
- 예약 소유자 검증 후 취소 가능
- 취소 시 좌석 수 증가 처리

### 4. 인증 / 인가
- JWT 기반 인증
- Access Token을 쿠키로 전달
- Guard를 통한 보호된 API 접근 제어

---

## Architecture

- **Controller**: HTTP 요청/응답 처리
- **Service**: 비즈니스 로직 및 도메인 규칙
- **Entity**: 데이터 모델 정의
- **Auth Module**: 인증/인가 전담

```text
Controller
  ↓
Service
  ↓
Repository (TypeORM)
```

---

## Folder Structure

```bash
src/
  auth/
    auth.controller.ts
    auth.service.ts
    jwt.strategy.ts
    jwt.guard.ts
  routes/
    routes.controller.ts
    routes.service.ts
    route.entity.ts
  trips/
    trips.controller.ts
    trips.service.ts
    trip.entity.ts
  bookings/
    bookings.controller.ts
    bookings.service.ts
    booking.entity.ts
```

---

## API Endpoints

| Domain | Method | Endpoint | Description |
|---|---|---|---|
| Auth | POST | `/auth/login` | 로그인 및 토큰 발급 |
| Route | GET | `/routes` | 노선 목록 조회 |
| Trip | GET | `/routes/:id/trips` | 노선별 운행 조회 |
| Booking | POST | `/bookings` | 예약 생성 |
| Booking | POST | `/bookings/:id/cancel` | 예약 취소 |

---

## Frontend Repository
- Frontend: https://github.com/dnd194/reserve_front.git

