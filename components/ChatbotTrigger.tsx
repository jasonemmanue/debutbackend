// components/ChatbotTrigger.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare } from 'lucide-react';
import ChatbotGemini from './ChatbotGemini';

export function ChatbotTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:scale-110 transition-transform"
          aria-label="Ouvrir le chatbot"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Assistant BusinessBook</DialogTitle>
        </DialogHeader>
        <ChatbotGemini />
      </DialogContent>
    </Dialog>
  );
}