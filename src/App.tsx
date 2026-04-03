import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import FlashcardHome from './pages/FlashcardHome';
import FlashcardStudy from './pages/FlashcardStudy';
import DramaList from './pages/DramaList';
import DramaDubbing from './pages/DramaDubbing';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flashcard" element={<FlashcardHome />} />
          <Route path="/flashcard/study" element={<FlashcardStudy />} />
          <Route path="/drama" element={<DramaList />} />
          <Route path="/drama/:id" element={<DramaDubbing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;