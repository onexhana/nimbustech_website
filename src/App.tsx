import Header from './components/common/Header';
import MainPage from './pages/MainPage';

function App() {
  return (
    // 🎨 PRETENDARD 폰트 적용 - React 컴포넌트 레벨
    // font-sans 클래스로 Tailwind CSS의 Pretendard 폰트 설정 활성화
    // 전체 앱에 일관된 폰트 적용을 보장합니다.
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <MainPage />
      </main>
    </div>
  );
}

export default App;
