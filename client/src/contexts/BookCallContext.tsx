/*
 * Book-a-Call Context - manages the booking qualifier modal globally.
 * Replaces direct links to the Google Calendar booking page so every
 * call request passes through three qualifying questions first.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import BookCallModal from "@/components/BookCallModal";

export const CALENDAR_URL = "https://calendar.app.google/YWP7rF8gFUXgfMRCA";

interface BookCallContextType {
  openBookCall: () => void;
  closeBookCall: () => void;
}

const BookCallContext = createContext<BookCallContextType | null>(null);

export function useBookCall() {
  const context = useContext(BookCallContext);
  if (!context) {
    throw new Error("useBookCall must be used within a BookCallProvider");
  }
  return context;
}

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookCall = useCallback(() => setIsOpen(true), []);
  const closeBookCall = useCallback(() => setIsOpen(false), []);

  return (
    <BookCallContext.Provider value={{ openBookCall, closeBookCall }}>
      {children}
      <BookCallModal open={isOpen} onClose={closeBookCall} />
    </BookCallContext.Provider>
  );
}
