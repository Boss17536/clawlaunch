'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, logPageView } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Analytics when component mounts
    initAnalytics();
  }, []);

  useEffect(() => {
    // Log page views on route change
    if (pathname) {
      logPageView(pathname, document.title);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
