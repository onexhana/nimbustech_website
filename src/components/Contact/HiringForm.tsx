// src/components/Contact/HiringForm.tsx
// 인재 문의 폼 (SalesMap 임베드)

import SalesMapForm from './SalesMapForm';
import { SALESMAP_HIRING_FORM_URL } from '../../constants/contact';

export default function HiringForm() {
  return (
    <SalesMapForm
      formUrl={SALESMAP_HIRING_FORM_URL}
      containerId="salesmap-web-form"
    />
  );
}
