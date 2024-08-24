import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './pages/Login';
import SignupForm from './pages/Signup';
import Footer from './components/Footer';
import ReportSubmit from './pages/ReportSubmit';
import PatientHistory from './pages/PatientHistory';
import ChatInterface from './components/ChatInterface';
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

function App() {
  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
  })

  return (
    <AuthProvider store={store}>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path="/report" element={<ReportSubmit />} />
          <Route path="/history" element={<PatientHistory></PatientHistory>} />
        </Routes>
        <ChatInterface />
        <Footer />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
