import type { InquiryData, HiringData } from '../types/contact';

export async function sendInquiry(data: InquiryData): Promise<void> {
  const response = await fetch('/api/contact/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '문의 전송에 실패했습니다.');
  }
}

export async function sendHiring(data: HiringData): Promise<void> {
  const response = await fetch('/api/contact/hiring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '채용 문의 전송에 실패했습니다.');
  }
}
