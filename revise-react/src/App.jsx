import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import { ProjectProvider } from './context/ProjectContext';
import { TaskProvider } from './context/TaskContext';
import Router from './routes/Router';
import SideBar from './components/SideBar';
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
      <ProjectProvider>
        <TaskProvider>
          <div>
            <main className="flex min-h-screen">
              <SignedIn>
                {!isHomePage && <SideBar />}
                <div
                  className={`main-content flex-1 ${
                    !isHomePage ? 'p-6 md:ml-64' : 'p-0'
                  } bg-gray-900`}
                >
                  <Router />
                </div>
              </SignedIn>
              <SignedOut>
                {isHomePage ? (
                  <div className="main-content flex-1 p-4 bg-gray-900">
                    <Router />
                  </div>
                ) : (
                  <RedirectToSignIn />
                )}
              </SignedOut>
            </main>
          </div>
        </TaskProvider>
      </ProjectProvider>
    </ClerkProvider>
  );
};

export default App;
