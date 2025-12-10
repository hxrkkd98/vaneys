'use client';

import { useRef } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { User } from '@supabase/supabase-js';

interface StoreInitializerProps {
  user: User | null;
}

export default function StoreInitializer({ user }: StoreInitializerProps) {
  const initialized = useRef(false);

  // This ensures the store is set immediately before the first render
  if (!initialized.current) {
    useUserStore.setState({ user });
    initialized.current = true;
  }

  return null;
}