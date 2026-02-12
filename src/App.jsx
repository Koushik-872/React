import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Error boundary component
const ErrorBoundary = ({ error }) => (
  <div className="error-boundary">
    <h2>Something went wrong</h2>
    <p>{error?.message}</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/contacts',
    element: <Contacts />,
    errorElement: <ErrorBoundary />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;