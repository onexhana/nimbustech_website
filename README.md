# ☁️ Nimbus Tech Official Website

> **Nimbus Tech(님버스테크)***의 공식 기업 홈페이지 프로젝트입니다.
> 클라우드 기술을 선도하는 Nimbus Tech의 비전과 서비스를 고객에게 전달하기 위해 구축되었습니다.

<br>

## 🔗 Live Demo (배포 사이트)
실제 운영 중인 웹사이트는 아래 링크에서 확인하실 수 있습니다.
<br>
👉 **[http://nimbustech.s3-website.kr.object.ncloudstorage.com/](http://nimbustech.s3-website.kr.object.ncloudstorage.com/)**

<br>

## 📌 Project Overview (프로젝트 개요)
이 프로젝트는 고객 및 파트너사에게 회사의 아이덴티티와 주요 사업 영역을 명확히 전달하는 것을 목적으로 합니다. 웹 표준을 준수하며, PC 및 모바일 환경에 최적화된 반응형 웹사이트로 개발되었습니다.

### 주요 기능 및 섹션
* **Main Visual**: 기업의 핵심 가치를 시각적으로 전달하는 인트로
* **About Us**: 회사 소개, 비전, 연혁
* **Business Area**: 주요 제공 서비스 및 솔루션 소개
* **Contact**: 오시는 길 및 문의처 (Google Maps / Contact Form)

<br>

## 🛠 Tech Stack (기술 스택)

| Category | Technology |
| --- | --- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Infra & Deploy** | ![Ncloud](https://img.shields.io/badge/Naver_Cloud_Platform-03C75A?style=flat-square&logo=naver&logoColor=white) (Object Storage) |
| **VCS** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) |

<br>

## 🌿 Branch Strategy (브랜치 전략)
이 프로젝트는 협업 및 안정적인 버전 관리를 위해 다음과 같은 브랜치 전략을 사용합니다.

* **`dev` (Default Branch)**:
    * **최종 통합 브랜치**입니다.
    * 모든 개발 사항이 병합(Merge)되어 완성된 코드가 관리되는 메인 브랜치입니다.
    * 이 브랜치의 코드가 실제 배포 서버(Object Storage)에 업로드됩니다.
* `feature/*` (Optional): 기능 개발 단위 브랜치

<br>

## 📂 Project Structure (폴더 구조)
```bash
nimbustech_website/
├── 📂 assets/          # 이미지, 폰트 등 정적 리소스
│   ├── 📂 images/
│   └── 📂 icons/
├── 📂 css/             # 스타일시트 (Main, Reset, Responsive)
├── 📂 js/              # 자바스크립트 로직 (UI 인터랙션)
├── index.html          # 메인 페이지
└── README.md           # 프로젝트 문서
