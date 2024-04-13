import { RouterProvider } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { router } from './routes';

function App() {
  return (
    <div className="App">
      <SkeletonTheme borderRadius={0} baseColor="#ffffff1f">
        <RouterProvider router={router} />
      </SkeletonTheme>
    </div>
  );
}

export default App;
