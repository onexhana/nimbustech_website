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
      {/* 웹폼 기본 배경 투명화 및 상단 헤더 숨김 스타일 적용 */}
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
      `}</style>
    </>
  );
}
