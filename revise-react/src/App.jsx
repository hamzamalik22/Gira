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
          <div className="h-screen bg-gray-50 dark:bg-gray-900">
            <SignedIn>
              {!isHomePage && (
                <>
                  <Navbar />
                  <div className="flex h-[calc(100vh-64px)]">
                    <SideBar />
                    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                      <div className="p-6">
                        <Router />
                      </div>
                    </main>
                  </div>
                </>
              )}
              {isHomePage && (
                <main className="w-full">
                  <Router />
                </main>
              )}
            </SignedIn>
            <SignedOut>
              {isHomePage ? (
                <main className="w-full">
                  <Router />
                </main>
              ) : (
                <RedirectToSignIn />
              )}
            </SignedOut>
          </div>
        </TaskProvider>
      </ProjectProvider>
    </ClerkProvider>
  );
};

export default App;
