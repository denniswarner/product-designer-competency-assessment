import { TwoColumnLayout } from './components/layout/TwoColumnLayout';
import './styles/tailwind.css';

function App() {
  return (
    <TwoColumnLayout
      sidebar={
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <p className="text-gray-600">Sidebar content will go here</p>
        </div>
      }
      main={
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Product Design Competency Assessment
          </h1>
          <p className="text-gray-600">
            Main content will go here
          </p>
        </div>
      }
    />
  );
}

export default App;