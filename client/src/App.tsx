import React from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute />}>
                    <Route index element={<HomePage />} />
                </Route>              
            </Routes>
        </Router>
      </PersistGate>
    </Provider>

  );
};

export default App;