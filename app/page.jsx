'use client';

import { ThemeProvider } from '@/src/context/ThemeContext';
import { AuthProvider } from '@/src/context/AuthContext';
import App from '@/src/App';

export default function Page() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}
