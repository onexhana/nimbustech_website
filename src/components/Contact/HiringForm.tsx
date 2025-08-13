// src/components/Contact/HiringForm.tsx
// React import removed (React 17+ JSX Transform 사용)
import { useEffect } from 'react';

export default function HiringForm() {
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
    <div
      id="salesmap-web-form"
      data-web-form="https://salesmap.kr/web-form/8c86a635-effb-43f4-b7fc-0985f688b144"
      style={{ width: '100%', minHeight: '500px' }}
    />
  );
}
