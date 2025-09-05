// src/components/Contact/InquiryForm.tsx
import { useEffect } from 'react';

export default function InquiryForm() {
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
      <div
        id="salesmap-web-form"
        data-web-form="https://salesmap.kr/web-form/e2fb0363-5a7d-44db-878a-d24463b86765"
        style={{ width: '100%', minHeight: '500px', backgroundColor: 'transparent' }}
      />
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
