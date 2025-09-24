// src/pages/admin/AdminContact.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminContact() {
  // Mock 데이터 (나중에 API로 교체)
  const [contactData, setContactData] = useState({
    sections: [
      {
        title: "TRUST",
        description: "구성원 간의 신뢰, 고객과의 신뢰를 기반으로\n모든 협업과 서비스를 책임 있게 수행합니다."
      },
      {
        title: "OWNERSHIP", 
        description: "각자의 역할에 책임을 가지고 임하며,\n스스로 문제를 해결하는 태도를 지향합니다."
      },
      {
        title: "GROWTH",
        description: "기술, AI, 프로젝트 경험을 통해\n개인과 조직이 함께 발전하는 문화를 만들어갑니다."
      }
    ],
    buttons: [
      {
        text: "고객사 직원",
        type: "inquiry"
      },
      {
        text: "인재 채용", 
        type: "hiring"
      }
    ],
    companyInfo: {
      sejong: {
        title: "[세종 본사]",
        address: "집현중앙7로6, B동 1110호 (세종대명벨리온)"
      },
      seoul: {
        title: "[서울사무소]",
        address: "강남구 선릉로90길 10, B동 407호 (대치동, 샹제리제센터)"
      },
      contact: {
        phone: "02-555-0099",
        email: "nimbustech@nimbustech.co.kr"
      }
    },
    pdfFiles: [
      {
        name: "개인정보 처리방침",
        path: "/footer_pdf/개인정보 처리방침_v1.0.pdf"
      },
      {
        name: "님버스테크 회사소개서",
        path: "/footer_pdf/님버스테크 회사소개_v3.5_20250923.pdf"
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('저장된 Contact 데이터:', contactData);
    setIsEditing(false);
    alert('저장되었습니다!');
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...contactData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setContactData({ ...contactData, sections: newSections });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...contactData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setContactData({ ...contactData, buttons: newButtons });
  };

  const updateCompanyInfo = (section: string, field: string, value: string) => {
    setContactData({
      ...contactData,
      companyInfo: {
        ...contactData.companyInfo,
        [section]: {
          ...contactData.companyInfo[section as keyof typeof contactData.companyInfo],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/dashboard"
                className="text-blue-600 hover:text-blue-800"
              >
                ← 대시보드로 돌아가기
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Contact 페이지 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    저장
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  편집
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 가치 섹션 관리 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              가치 섹션 관리
            </h3>
            <div className="space-y-6">
              {contactData.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {section.title} 섹션
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        제목
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명 (줄바꿈으로 구분)
                      </label>
                      <textarea
                        value={section.description}
                        onChange={(e) => updateSection(index, 'description', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 관리 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              버튼 관리
            </h3>
            <div className="space-y-4">
              {contactData.buttons.map((button, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    버튼 {index + 1}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        버튼 텍스트
                      </label>
                      <input
                        type="text"
                        value={button.text}
                        onChange={(e) => updateButton(index, 'text', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        버튼 타입
                      </label>
                      <select
                        value={button.type}
                        onChange={(e) => updateButton(index, 'type', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      >
                        <option value="inquiry">고객사 직원</option>
                        <option value="hiring">인재 채용</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 회사 정보 관리 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              회사 정보 관리
            </h3>
            <div className="space-y-6">
              {/* 세종 본사 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">세종 본사</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제목
                    </label>
                    <input
                      type="text"
                      value={contactData.companyInfo.sejong.title}
                      onChange={(e) => updateCompanyInfo('sejong', 'title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      주소
                    </label>
                    <input
                      type="text"
                      value={contactData.companyInfo.sejong.address}
                      onChange={(e) => updateCompanyInfo('sejong', 'address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* 서울사무소 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">서울사무소</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제목
                    </label>
                    <input
                      type="text"
                      value={contactData.companyInfo.seoul.title}
                      onChange={(e) => updateCompanyInfo('seoul', 'title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      주소
                    </label>
                    <input
                      type="text"
                      value={contactData.companyInfo.seoul.address}
                      onChange={(e) => updateCompanyInfo('seoul', 'address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">연락처 정보</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전화번호
                    </label>
                    <input
                      type="text"
                      value={contactData.companyInfo.contact.phone}
                      onChange={(e) => updateCompanyInfo('contact', 'phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={contactData.companyInfo.contact.email}
                      onChange={(e) => updateCompanyInfo('contact', 'email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PDF 파일 관리 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              PDF 파일 관리
            </h3>
            <div className="space-y-4">
              {contactData.pdfFiles.map((file, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {file.name}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        파일명
                      </label>
                      <input
                        type="text"
                        value={file.name}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        파일 경로
                      </label>
                      <input
                        type="text"
                        value={file.path}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={file.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        파일 미리보기
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            미리보기
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 가치 섹션 미리보기 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">가치 섹션</h4>
                {contactData.sections.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h5 className="text-lg font-bold text-blue-600 mb-1">
                      {section.title}
                    </h5>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* 회사 정보 미리보기 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">회사 정보</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{contactData.companyInfo.sejong.title} {contactData.companyInfo.sejong.address}</p>
                  <p>{contactData.companyInfo.seoul.title} {contactData.companyInfo.seoul.address}</p>
                  <p>T: {contactData.companyInfo.contact.phone}</p>
                  <p>E: {contactData.companyInfo.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
