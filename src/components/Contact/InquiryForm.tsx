// src/components/Contact/InquiryForm.tsx
import { useEffect } from 'react';

export default function InquiryForm() {
  // 웹폼 스크립트 로딩 및 폼 초기화를 위한 useEffect
  // 마운트 시 SalesMap 웹폼 로더 스크립트를 동적으로 삽입하고, 로드 완료 후 SmFormSettings.loadForm() 호출
  useEffect(() => {
    const container = document.getElementById('salesmap-web-form');
    if (!container) return;
    const inlineScript = document.createElement('script');
    inlineScript.text = `!(function (window, document) {
      var currentScript = document.currentScript;
      var scriptElement = document.createElement('script');
      scriptElement.onload = function () {
        window.SmFormSettings.loadForm();
      };
      scriptElement.id = 'loadFormScript';
      scriptElement.src = 'https://salesmap.kr/web-form-loader-v4.js';
      currentScript.parentNode.insertBefore(scriptElement, currentScript);
    })(window, document);`;
    container.appendChild(inlineScript);
  }, []);

  return (
    <>
      {/* 폼 렌더링을 위한 컨테이너 요소: SalesMap 웹폼이 이 div 내부에 삽입됩니다. */}
      <div
        id="salesmap-web-form"
        data-web-form="https://salesmap.kr/web-form/e2fb0363-5a7d-44db-878a-d24463b86765"
        style={{ width: '100%', minHeight: '500px', backgroundColor: 'transparent' }}
      />
      {/* 웹폼 기본 배경 투명화 및 상단 헤더 수정 스타일 적용 */}
      <style>{`
        /* 배경 투명 처리 */
        #salesmap-web-form,
        #salesmap-web-form * {
          background: transparent !important;
        }
        /* 웹폼 상단 헤더 숨기기 */
        #salesmap-web-form > *:first-child {
          display: none !important;
        }
        /* 웹폼 제목 텍스트 변경 - 더 강력한 선택자 */
        #salesmap-web-form h1,
        #salesmap-web-form h2,
        #salesmap-web-form h3,
        #salesmap-web-form [class*="title"],
        #salesmap-web-form [class*="Title"],
        #salesmap-web-form [class*="header"],
        #salesmap-web-form [class*="Header"] {
          visibility: hidden !important;
          position: relative !important;
          height: auto !important;
        }
        #salesmap-web-form h1::before,
        #salesmap-web-form h2::before,
        #salesmap-web-form h3::before,
        #salesmap-web-form [class*="title"]::before,
        #salesmap-web-form [class*="Title"]::before,
        #salesmap-web-form [class*="header"]::before,
        #salesmap-web-form [class*="Header"]::before {
          content: "고객사 문의" !important;
          visibility: visible !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          color: #000000 !important;
          display: block !important;
        }
      `}</style>
    </>
  );
}
