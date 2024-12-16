import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PostForm from './components/PostForm'; // 경로를 확인하세요

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <PostForm />
  </StrictMode>
);
