import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Register';
import Header from './components/Header';
import AddProduct from './pages/AddProduct';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
        <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<AddProduct />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
