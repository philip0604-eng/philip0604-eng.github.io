# Donghyun Lee | Independent Research

**무료 GitHub Pages 웹사이트 완성본 — PDF 50편 포함**

사이트는 순수 HTML/CSS/JavaScript로 구성되어 **도메인 구입, 웹서버, 유료 호스팅, 외부 프레임워크 없이** 공개할 수 있습니다.

## 먼저 확인하기

1. 이 압축파일을 컴퓨터에서 **압축 해제**합니다.
2. 압축 해제 폴더의 `index.html`을 더블클릭하면 첫 화면을 미리 볼 수 있습니다.
3. 논문 목록은 `research/index.html`에서 볼 수 있습니다.
4. 각 논문 페이지에는 PDF 원문 열람·다운로드 링크가 들어 있습니다.

## GitHub Pages로 무료 공개하기

### 1) GitHub 계정 및 저장소 만들기

1. https://github.com 에서 무료 계정을 만듭니다.
2. 오른쪽 위 **+ → New repository**를 누릅니다.
3. Repository name을 **`본인GitHub아이디.github.io`**로 만듭니다. 예: 아이디가 `dlee-research`이면 `dlee-research.github.io`.
4. **Public**을 선택하고 Create repository를 누릅니다.
5. 논문 사이트 파일을 모두 업로드하고 `main` 브랜치에 커밋합니다. ZIP 파일 자체를 한 개 올리는 것이 아니라, **압축을 푼 내용 전체**를 올려야 합니다. `.github/workflows/pages.yml`도 꼭 포함합니다. 웹에서 폴더 업로드가 어려우면 무료 GitHub Desktop 앱을 쓰는 방법이 편리합니다.

### 2) Pages 배포 켜기

1. 저장소의 **Settings → Pages**로 갑니다.
2. **Build and deployment → Source → GitHub Actions**를 선택합니다.
3. **Actions** 탭에서 `Publish Research Website` 작업이 성공했는지 확인합니다. 설정 후 커밋이 필요할 수도 있으며, Actions 탭에서 수동 실행도 가능합니다.
4. 공개 주소: **`https://본인GitHub아이디.github.io/`**.

저장소를 `본인아이디.github.io` 대신 다른 이름으로 만들면 주소는 `https://본인아이디.github.io/저장소이름/`이 됩니다. 이 배포 스크립트는 두 경우 모두 자동 처리합니다.

## 구글 검색 등록

1. 위 공개 주소가 정상 작동하는지 먼저 확인합니다.
2. https://search.google.com/search-console/ 에서 웹사이트 등록 및 소유권 확인을 합니다. 구글에서 안내하는 방법(예: HTML 파일)을 따르세요.
3. 좌측 메뉴 **Sitemaps**에서 `sitemap.xml`을 제출합니다. 이 사이트의 배포 과정은 공개 주소에 맞는 **42개 웹페이지(홈, 목록, 개별 논문 50개)**의 `sitemap.xml`을 자동 생성합니다.
4. Search Console의 **URL 검사**에서 홈과 대표 논문 페이지의 등록 상태를 확인합니다.

**주의:** 사이트맵을 제출해도 구글 색인·검색 순위가 보장되는 것은 아닙니다. 검색 반영까지 시간이 걸릴 수 있습니다.

## 웹사이트에서 할 수 있는 것

- 총 50개의 논문/도서/에세이를 각자의 고유 웹주소에서 소개
- 본문 초록, 연구 분야, 분량, 원본 PDF 열람 및 다운로드
- 논문 제목·초록·키워드 통합 검색
- 6개의 분야별 필터, 제목/분량/분야별 정렬
- 모바일/태블릿/PC 반응형 웹디자인
- 검색엔진이 읽기 쉬운 정적 HTML과 구조화된 문서 메타데이터
- 구글 사이트맵 자동 생성, SEO 메타태그 자동 보완
- 방문자 추적 스크립트 없음

## PDF 추가하기

파일 추가와 논문 카드 등록에는 현재 약간의 HTML 편집이 필요합니다. `research.json`은 추후 확장을 위한 전체 논문 메타데이터이며, 웹페이지는 빠른 로딩과 검색엔진 호환을 위해 정적 HTML로 생성해 두었습니다. 기존 50편은 변경 없이 동작합니다.

## 운영 비용

GitHub Pages의 일반적인 **공개 무료 저장소/개인 포트폴리오 이용 범위**에서 사이트 자체의 호스팅 비용은 0원입니다. PDF 총량은 약 71 MiB로 일반적인 GitHub Pages 저장소 권고 용량 1 GB 이하이며, PDF 개별 크기도 일반 업로드 제한보다 작습니다. GitHub 서비스 제한·정책은 바뀔 수 있습니다. `.github/workflows/pages.yml`은 무료 GitHub Actions로 빌드 및 배포합니다.

## 라이선스

웹사이트 디자인과 논문 원문은 별개입니다. 논문 원문의 저작권과 라이선스는 각각 PDF 표기 및 저자 권리에 따르며, **사이트에서 자유롭게 열람 가능하다는 것이 재사용 허가를 의미하지는 않습니다**.

## 기술 메모

- 사이트 본체: `index.html`, `research/index.html`, `papers/*.html`, `pdfs/*.pdf`, `assets/*`
- 자동 배포: `.github/workflows/pages.yml`
- 배포 전처리: `scripts/prepare_deploy.py`
- 전체 자료 목록: `research.json`
- 커스텀 도메인 사용 시 저장소 최상위에 `CNAME` 파일을 추가하고 도메인명(예: `research.example.org`)을 한 줄로 쓰면 배포 스크립트가 자동 반영합니다. 실제 DNS 설정은 별도로 필요합니다.
