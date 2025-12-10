'use client';

import { useEffect, useRef } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { User } from '@supabase/supabase-js';

interface StoreInitializerProps {
  user: User | null;
}

export default function StoreInitializer({ user }: StoreInitializerProps) {
  const initialized = useRef(false);

  // 1. Initialize store immediately before first render (Hydration)
  if (!initialized.current) {
    useUserStore.setState({ user });
    initialized.current = true;
  }

  // 2. Listen for future updates (e.g. after Login/Redirect)
  useEffect(() => {
    useUserStore.setState({ user });
  }, [user]);

  return null;
}