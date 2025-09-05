import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 检测是否在 GitHub Pages 环境中
const isGithubPages = window.location.hostname.includes('github.io');

// 在 GitHub Pages 中使用 HashRouter 以避免路由问题
const Router = isGithubPages ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
      <Toaster />
    </Router>
  </StrictMode>
  );

   // 注册Service Worker以支持PWA功能
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // 使用相对路径注册Service Worker
      navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
