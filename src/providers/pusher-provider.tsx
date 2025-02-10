'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Channel } from 'pusher-js';
import { pusherClient } from '@/lib/pusher';

interface PusherContextType {
  channel?: Channel;
}

const PusherContext = createContext<PusherContextType>({});

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    const channel = pusherClient.subscribe('main');
    setChannel(channel);

    return () => {
      pusherClient.unsubscribe('main');
    };
  }, []);

  return (
    <PusherContext.Provider value={{ channel }}>
      {children}
    </PusherContext.Provider>
  );
}

export const usePusher = () => useContext(PusherContext);
