# 논문 홈페이지 50편 · 숫자 교정 및 편의 기능 개선

기존 색상, 글꼴, 헤더, 논문 개별 페이지, PDF 파일은 그대로 유지됩니다.

## 바뀌는 점
- 메인 화면의 연구 분야별 논문 수를 실제 목록 50편에 맞게 교정: 11·7·11·7·7·7
- 메인 화면 중간에 **New to the archive** 목록 추가: 새 논문 10편으로 바로 이동
- 새 목록 아래 **Search archive** 검색창 추가: 연구 목록의 제목/초록 검색으로 이동
- 섹션 번호를 01~06으로 정리
- 디자인 파일은 기존 CSS 맨 아래 필요한 스타일만 추가. PDF·논문 소개 페이지 미변경

## GitHub Desktop에서 업로드
1. 이 ZIP 파일을 내려받아 압축을 풉니다.
2. GitHub Desktop에서 **Current repository**가 `philip0604-eng.github.io`인지 확인합니다.
3. **Repository → Show in Explorer**로 저장소 폴더를 엽니다.
4. 압축을 풀어 생성된 폴더 속 `index.html` 및 `assets` 폴더를 **저장소 폴더 바로 안**으로 복사하고 파일이 있다면 덮어씁니다.
   (주의: `assets` 폴더는 기존 폴더와 합치세요. 기존 폴더 자체를 삭제하지 마세요.)
5. GitHub Desktop의 **Changes**에 `index.html` 및 `assets/css/style.css` 두 파일이 나타나는지 확인합니다.
6. 왼쪽 아래 Summary에 `Refresh 50-paper homepage and add recent papers index` 입력 → **Commit to main** → **Push origin**.
7. GitHub의 **Actions**에서 배포 완료를 확인하고 사이트에서 Ctrl+F5로 새로고침합니다.

## 그래도 Changes에 두 파일이 안 보인다면
- GitHub Desktop 상단의 **Current repository**가 `philip0604-eng.github.io`인지 확인합니다.
- 파일 탐색기 주소 창에서 현재 경로가 `.../philip0604-eng.github.io`로 끝나는지 확인합니다.
- 그 폴더 바로 아래에 `index.html`이 있는지 확인합니다. `.../philip0604-eng.github.io/Donghyun_Lee_50_Papers_Design_Refinement/index.html`처럼 새 폴더 안에 있으면 변경 인식이 안 됩니다.
- 압축파일을 그대로 복사한 것이 아니라, 그 **안의 파일과 폴더**를 복사해야 합니다.

### 구글 인증 주의
기존 `index.html`에 직접 넣은 Google Search Console 인증 메타 태그 또는 직접 수정한 내용이 있으면, 덮어쓰기 전에 메모장에 따로 복사해 보관하고 새 파일에도 재삽입해야 합니다.

현재 공개된 GitHub 저장소를 직접 편집하지 않았으며, 이 ZIP 파일은 컴퓨터에서 수동으로 업로드하기 위한 변경 파일입니다.
