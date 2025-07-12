'use client';

import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/chatbot/Chatbot'), {
  ssr: false,
  loading: () => null,
});

export function ChatbotWrapper() {
  return <Chatbot />;
}
