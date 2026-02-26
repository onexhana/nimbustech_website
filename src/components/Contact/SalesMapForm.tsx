// src/components/Contact/SalesMapForm.tsx
// SalesMap 웹 폼 로더 공용 컴포넌트 (고객 문의 / 인재 문의 공통)

import { useEffect } from 'react';

interface SalesMapFormProps {
  formUrl: string;
  containerId: string;
}

export default function SalesMapForm({ formUrl, containerId }: SalesMapFormProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);
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
  }, [containerId]);

  return (
    <div
      id={containerId}
      data-web-form={formUrl}
      style={{ width: '100%', minHeight: '500px' }}
    />
  );
}
