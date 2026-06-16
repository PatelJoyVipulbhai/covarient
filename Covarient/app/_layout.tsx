import { Stack } from "expo-router";
import '@/global.css';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    // Load Space Grotesk and Inter fonts links dynamically in document head if not preloaded
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Initialize Lenis
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        gestureOrientation: 'vertical',
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      // Store globally for GSAP scroll triggering
      (window as any).lenis = lenis;
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      {Platform.OS === 'web' && <div className="noise-overlay" />}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
