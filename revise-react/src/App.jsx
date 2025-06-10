import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import Router from './routes/Router';
import Sidebar from './components/SideBar';
import Navbar from './components/Navbar';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.error('Error: VITE_CLERK_PUBLISHABLE_KEY is not defined in .env.local');
  throw new Error('Missing Clerk Publishable Key. Please check your .env.local file.');
}

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div>
        <main>
          <SignedIn>
            {!isHomePage && <Sidebar />}
            <div className="main-content">
              <Router />
            </div>
          </SignedIn>
          <SignedOut>
            {isHomePage ? (
              <div className="main-content">
                <Router />
              </div>
            ) : (
              <RedirectToSignIn />
            )}
          </SignedOut>
        </main>
      </div>
    </ClerkProvider>
  );
};

export default App;