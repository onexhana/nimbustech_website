import { useState, useEffect } from 'react';

interface FilterStyleEditorProps {
  selectedCategory: string;
  onSave: (category: string, style: any) => void;
}

export default function FilterStyleEditorComponent({ selectedCategory, onSave }: FilterStyleEditorProps) {
  // 관리자에서 설정한 필터 스타일 가져오기
  const getFilterStyle = (categoryName: string) => {
    const savedFilterStyles = localStorage.getItem('filterStyleSettings');
    if (savedFilterStyles) {
      try {
        const filterStyles = JSON.parse(savedFilterStyles);
        return filterStyles[categoryName];
      } catch (error) {
        console.error('필터 스타일 로드 실패:', error);
      }
    }
    
    // 기본값 반환 (현재 사이트 색상)
    return {
      backgroundColor: "#00A3E0",
      textColor: "#ffffff",
      borderColor: "#00A3E0",
      borderWidth: 1,
      fontSize: 25,
      fontWeight: 500,
      borderRadius: 999,
      padding: "12px 24px",
      hoverBackgroundColor: "#008CC0",
      hoverTextColor: "#ffffff"
    };
  };

  const currentStyle = getFilterStyle(selectedCategory);
  const [tempStyle, setTempStyle] = useState({
    backgroundColor: currentStyle.backgroundColor || "#00A3E0",
    textColor: currentStyle.textColor || "#ffffff",
    borderColor: currentStyle.borderColor || "#00A3E0",
    borderWidth: currentStyle.borderWidth || 1,
    fontSize: currentStyle.fontSize || 25,
    fontWeight: currentStyle.fontWeight || 500,
    borderRadius: currentStyle.borderRadius || 999,
    padding: currentStyle.padding || "12px 24px",
    hoverBackgroundColor: currentStyle.hoverBackgroundColor || "#008CC0",
    hoverTextColor: currentStyle.hoverTextColor || "#ffffff"
  });

  return (
    <>
      {/* 기본 색상 설정 */}
      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>🎨</span>
          </div>
          기본 색상 설정
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              배경색
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={tempStyle.backgroundColor}
                onChange={(e) => setTempStyle({...tempStyle, backgroundColor: e.target.value})}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={tempStyle.backgroundColor}
                onChange={(e) => setTempStyle({...tempStyle, backgroundColor: e.target.value})}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  background: 'white',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              글자색
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={tempStyle.textColor}
                onChange={(e) => setTempStyle({...tempStyle, textColor: e.target.value})}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={tempStyle.textColor}
                onChange={(e) => setTempStyle({...tempStyle, textColor: e.target.value})}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  background: 'white',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              테두리색
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={tempStyle.borderColor}
                onChange={(e) => setTempStyle({...tempStyle, borderColor: e.target.value})}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={tempStyle.borderColor}
                onChange={(e) => setTempStyle({...tempStyle, borderColor: e.target.value})}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  background: 'white',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              테두리 굵기 (px)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={tempStyle.borderWidth}
              onChange={(e) => setTempStyle({...tempStyle, borderWidth: parseInt(e.target.value) || 0})}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.875rem',
                background: 'white',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* 글씨 설정 */}
      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #10b981, #14b8a6)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>📝</span>
          </div>
          글씨 설정
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              글자 크기 (px)
            </label>
            <input
              type="number"
              min="10"
              max="50"
              value={tempStyle.fontSize}
              onChange={(e) => setTempStyle({...tempStyle, fontSize: parseInt(e.target.value) || 16})}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.875rem',
                background: 'white',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              글자 두께
            </label>
            <select
              value={tempStyle.fontWeight}
              onChange={(e) => setTempStyle({...tempStyle, fontWeight: parseInt(e.target.value)})}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.875rem',
                background: 'white',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            >
              <option value={300}>Light (300)</option>
              <option value={400}>Normal (400)</option>
              <option value={500}>Medium (500)</option>
              <option value={600}>Semi Bold (600)</option>
              <option value={700}>Bold (700)</option>
              <option value={800}>Extra Bold (800)</option>
              <option value={900}>Black (900)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 모양 설정 */}
      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>🔲</span>
          </div>
          모양 설정
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              모서리 둥글기 (px)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={tempStyle.borderRadius}
              onChange={(e) => setTempStyle({...tempStyle, borderRadius: parseInt(e.target.value) || 0})}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.875rem',
                background: 'white',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              패딩
            </label>
            <select
              value={tempStyle.padding}
              onChange={(e) => setTempStyle({...tempStyle, padding: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.875rem',
                background: 'white',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            >
              <option value="8px 16px">작게 (8px 16px)</option>
              <option value="12px 20px">중간 (12px 20px)</option>
              <option value="12px 24px">크게 (12px 24px)</option>
              <option value="16px 32px">매우 크게 (16px 32px)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 호버 효과 설정 */}
      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>✨</span>
          </div>
          호버 효과 설정
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              호버 배경색
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={tempStyle.hoverBackgroundColor}
                onChange={(e) => setTempStyle({...tempStyle, hoverBackgroundColor: e.target.value})}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={tempStyle.hoverBackgroundColor}
                onChange={(e) => setTempStyle({...tempStyle, hoverBackgroundColor: e.target.value})}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  background: 'white',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              호버 글자색
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={tempStyle.hoverTextColor}
                onChange={(e) => setTempStyle({...tempStyle, hoverTextColor: e.target.value})}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={tempStyle.hoverTextColor}
                onChange={(e) => setTempStyle({...tempStyle, hoverTextColor: e.target.value})}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  background: 'white',
                  color: '#111827',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 실시간 미리보기 */}
      <div style={{ marginBottom: '2rem' }}>
        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #ef4444, #f87171)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>👁️</span>
          </div>
          실시간 미리보기
        </h5>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>일반 상태:</span>
            <button 
              style={{
                padding: tempStyle.padding,
                fontSize: `${tempStyle.fontSize}px`,
                fontWeight: tempStyle.fontWeight,
                color: tempStyle.textColor,
                backgroundColor: tempStyle.backgroundColor,
                border: `${tempStyle.borderWidth}px solid ${tempStyle.borderColor}`,
                borderRadius: `${tempStyle.borderRadius}px`,
                cursor: 'default',
                minWidth: '120px',
                transition: 'all 0.3s ease'
              }}
            >
              {selectedCategory}
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>호버 상태:</span>
            <button 
              style={{
                padding: tempStyle.padding,
                fontSize: `${tempStyle.fontSize}px`,
                fontWeight: tempStyle.fontWeight,
                color: tempStyle.hoverTextColor,
                backgroundColor: tempStyle.hoverBackgroundColor,
                border: `${tempStyle.borderWidth}px solid ${tempStyle.borderColor}`,
                borderRadius: `${tempStyle.borderRadius}px`,
                cursor: 'default',
                minWidth: '120px',
                transition: 'all 0.3s ease'
              }}
            >
              {selectedCategory}
            </button>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          onClick={() => {
            setTempStyle({
              backgroundColor: currentStyle.backgroundColor || "#00A3E0",
              textColor: currentStyle.textColor || "#ffffff",
              borderColor: currentStyle.borderColor || "#00A3E0",
              borderWidth: currentStyle.borderWidth || 1,
              fontSize: currentStyle.fontSize || 25,
              fontWeight: currentStyle.fontWeight || 500,
              borderRadius: currentStyle.borderRadius || 999,
              padding: currentStyle.padding || "12px 24px",
              hoverBackgroundColor: currentStyle.hoverBackgroundColor || "#008CC0",
              hoverTextColor: currentStyle.hoverTextColor || "#ffffff"
            });
          }}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          초기화
        </button>
        <button
          onClick={() => onSave(selectedCategory, tempStyle)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'white',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}
        >
          {selectedCategory} 필터 저장
        </button>
      </div>
    </>
  );
}
