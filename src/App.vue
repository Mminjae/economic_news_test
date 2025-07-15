<script setup>
import { ref, onMounted } from "vue";
import FinanceNews from "./components/FinanceNews.vue";
import FinancialCharts from "./components/FinancialCharts.vue";
import EconomicTerms from "./components/EconomicTerms.vue";
import EconomicQuiz from "./components/EconomicQuiz.vue";
import UserProfile from "./components/UserProfile.vue";
import AssetAnalysis from "./components/AssetAnalysis.vue";
import Analysis from "./components/Analysis.vue";
import Home from "./components/Home.vue";
import BottomTabNavigation from "./components/BottomTabNavigation.vue";
import Authentication from "./components/Authentication.vue";

// Tab management
const activeTab = ref("home");
const activeSubTab = ref("news");

// Authentication management
const isAuthenticated = ref(false);
const currentUser = ref(null);
const showAuthPage = ref(false);

// Global dark mode management
const isDarkMode = ref(false);

// Authentication functions
const checkAuthStatus = () => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    currentUser.value = JSON.parse(user);
    isAuthenticated.value = true;
  }
};

const handleLogin = (user) => {
  currentUser.value = user;
  isAuthenticated.value = true;
  showAuthPage.value = false;
  // Redirect to home after login
  activeTab.value = "home";
};

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  currentUser.value = null;
  isAuthenticated.value = false;
  // If currently on My Page, redirect to Home
  if (activeTab.value === "my-page") {
    activeTab.value = "home";
  }
};

const handleAuthRequired = (tabId) => {
  showAuthPage.value = true;
  activeTab.value = "my-page";
};

const handleShowAuth = () => {
  showAuthPage.value = true;
  activeTab.value = "my-page";
};

// Tab navigation
const handleTabClick = (tabId) => {
  activeTab.value = tabId;
  // Reset to news when switching to economic content
  if (tabId === "economic-content") {
    activeSubTab.value = "news";
  }
};

const handleNavigation = (tabId) => {
  activeTab.value = tabId;
};

// Dark mode functions
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("globalDarkMode", isDarkMode.value);
};

const loadDarkMode = () => {
  const saved = localStorage.getItem("globalDarkMode");
  if (saved !== null) {
    isDarkMode.value = JSON.parse(saved);
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }
};

// Lifecycle
onMounted(() => {
  loadDarkMode();
  checkAuthStatus();
});
</script>

<template>
  <div class="app">
    <!-- Header with app title and dark mode toggle -->
    <header class="app-header">
      <div class="header-container">
        <h1 class="app-title">🏦 뱅크랩</h1>
        <div class="header-actions">
          <div v-if="isAuthenticated" class="user-info">
            <span class="welcome-text"
              >안녕하세요, {{ currentUser.name }}님!</span
            >
            <button @click="handleLogout" class="logout-btn">로그아웃</button>
          </div>
          <button
            @click="toggleDarkMode"
            class="dark-mode-toggle"
            :title="isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'"
          >
            {{ isDarkMode ? "☀️" : "🌙" }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <Home
        v-if="activeTab === 'home'"
        :user="currentUser"
        @navigate="handleTabClick"
        @show-auth="handleShowAuth"
      />
      <AssetAnalysis v-else-if="activeTab === 'assets'" />
      <Analysis v-else-if="activeTab === 'analysis'" />

      <!-- Economic Content - Using existing news components -->
      <div
        v-else-if="activeTab === 'economic-content'"
        class="economic-content"
      >
        <div class="content-header">
          <div class="header-background">
            <h2 class="content-title">📰 경제 컨텐츠</h2>
            <p class="content-description">
              최신 경제 뉴스와 금융 정보를 확인하세요
            </p>
          </div>
        </div>

        <div class="content-tabs">
          <div class="mini-tabs-container">
            <div class="mini-tabs">
              <button
                @click="activeSubTab = 'news'"
                class="mini-tab"
                :class="{ active: activeSubTab === 'news' }"
              >
                <span class="tab-icon">📰</span>
                <span class="tab-text">뉴스</span>
              </button>
              <button
                @click="activeSubTab = 'charts'"
                class="mini-tab"
                :class="{ active: activeSubTab === 'charts' }"
              >
                <span class="tab-icon">📈</span>
                <span class="tab-text">차트</span>
              </button>
              <button
                @click="activeSubTab = 'terms'"
                class="mini-tab"
                :class="{ active: activeSubTab === 'terms' }"
              >
                <span class="tab-icon">📚</span>
                <span class="tab-text">용어</span>
              </button>
              <button
                @click="activeSubTab = 'quiz'"
                class="mini-tab"
                :class="{ active: activeSubTab === 'quiz' }"
              >
                <span class="tab-icon">🧠</span>
                <span class="tab-text">퀴즈</span>
              </button>
            </div>
          </div>

          <div class="mini-tab-content">
            <div class="content-wrapper">
              <FinanceNews v-if="activeSubTab === 'news'" />
              <FinancialCharts v-else-if="activeSubTab === 'charts'" />
              <EconomicTerms v-else-if="activeSubTab === 'terms'" />
              <EconomicQuiz
                v-else-if="activeSubTab === 'quiz'"
                @navigate="handleNavigation"
              />
            </div>
          </div>
        </div>
      </div>

      <UserProfile
        v-else-if="activeTab === 'my-page' && isAuthenticated"
        :user="currentUser"
        @logout="handleLogout"
      />

      <!-- Authentication Page -->
      <Authentication
        v-else-if="activeTab === 'my-page' && !isAuthenticated"
        @login="handleLogin"
      />
    </main>

    <!-- Bottom Tab Navigation -->
    <BottomTabNavigation
      :activeTab="activeTab"
      :isAuthenticated="isAuthenticated"
      @tab-click="handleTabClick"
      @auth-required="handleAuthRequired"
    />
  </div>
</template>

<style>
/* App Layout */
.app {
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding-bottom: 80px; /* Space for bottom navigation */
}

/* Header */
.app-header {
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.app-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 3rem;
}

@media (min-width: 1920px) {
  .header-container {
    max-width: 1800px;
    padding: 1.5rem 4rem;
  }
}

.app-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.app-title:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

@media (min-width: 1200px) {
  .app-title {
    font-size: 2.2rem;
  }
}

@media (min-width: 1920px) {
  .app-title {
    font-size: 2.5rem;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.logout-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.dark-mode-toggle {
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    var(--bg-primary) 100%
  );
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.dark-mode-toggle::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.dark-mode-toggle:hover::before {
  left: 100%;
}

.dark-mode-toggle:hover {
  transform: scale(1.1) rotate(180deg);
  border-color: #3b82f6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 140px);
}

/* Economic Content Styles */
.economic-content {
  min-height: calc(100vh - 140px);
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
}

.content-header {
  position: relative;
  padding: 3rem 2rem;
  text-align: center;
  overflow: hidden;
}

.header-background {
  position: relative;
  z-index: 2;
}

.content-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.1) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  z-index: 1;
}

.content-title {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

.content-tabs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.mini-tabs-container {
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
}

.mini-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mini-tab {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.mini-tab::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(37, 99, 235, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.mini-tab:hover::before {
  left: 100%;
}

.mini-tab:hover {
  color: var(--text-primary);
  border-color: rgba(37, 99, 235, 0.6);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
}

.mini-tab.active {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
}

.mini-tab.active::before {
  display: none;
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-text {
  font-size: 0.95rem;
  font-weight: 700;
}

.mini-tab-content {
  animation: fadeInUp 0.4s ease-out;
}

.content-wrapper {
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
  overflow: hidden;
  margin-bottom: 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode support */
:root.dark {
}

:root.dark .app-header {
  background: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:root.dark .economic-content {
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
}

:root.dark .content-header::before {
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.15) 0%,
    rgba(245, 158, 11, 0.08) 100%
  );
}

:root.dark .mini-tabs-container {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

:root.dark .mini-tab {
  background: var(--bg-primary);
  border-color: var(--border-color);
}

:root.dark .mini-tab:hover {
  border-color: rgba(251, 191, 36, 0.8);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.3);
}

:root.dark .content-wrapper {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-tabs {
    padding: 0 1.5rem;
  }

  .mini-tabs {
    gap: 0.5rem;
  }

  .mini-tab {
    padding: 0.875rem 1.25rem;
    min-width: 110px;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .header-container {
    padding: 1.25rem 2rem;
  }

  .app-title {
    font-size: 1.8rem;
  }

  .user-info {
    gap: 0.75rem;
  }

  .welcome-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
  }

  .app-title {
    font-size: 1.4rem;
  }

  .user-info {
    flex-direction: row;
    gap: 0.5rem;
    text-align: right;
  }

  .welcome-text {
    font-size: 0.8rem;
  }

  .content-header {
    padding: 2rem 1rem;
  }

  .content-title {
    font-size: 2rem;
  }

  .content-description {
    font-size: 1rem;
  }

  .content-tabs {
    padding: 0 1rem;
  }

  .mini-tabs-container {
    padding: 0.75rem;
  }

  .mini-tabs {
    gap: 0.5rem;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) transparent;
  }

  .mini-tabs::-webkit-scrollbar {
    height: 4px;
  }

  .mini-tabs::-webkit-scrollbar-track {
    background: transparent;
  }

  .mini-tabs::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }

  .mini-tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    min-width: 100px;
    flex-shrink: 0;
  }

  .tab-icon {
    font-size: 1.1rem;
  }

  .tab-text {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.3rem;
  }

  .header-container {
    padding: 1rem 0.75rem;
    flex-direction: row;
    justify-content: space-between;
  }

  .header-actions {
    gap: 0.75rem;
  }

  .dark-mode-toggle {
    width: 42px;
    height: 42px;
    font-size: 1.1rem;
  }

  .logout-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .content-header {
    padding: 1.5rem 0.75rem;
  }

  .content-title {
    font-size: 1.8rem;
  }

  .content-description {
    font-size: 0.95rem;
  }

  .content-tabs {
    padding: 0 0.75rem;
  }

  .mini-tabs-container {
    padding: 0.5rem;
  }

  .mini-tab {
    padding: 0.625rem 0.875rem;
    font-size: 0.8rem;
    min-width: 90px;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tab-icon {
    font-size: 1rem;
  }

  .tab-text {
    font-size: 0.75rem;
    line-height: 1;
  }

  .content-wrapper {
    margin-bottom: 1rem;
  }
}

@media (max-width: 360px) {
  .content-title {
    font-size: 1.6rem;
  }

  .mini-tab {
    padding: 0.5rem 0.75rem;
    min-width: 80px;
  }

  .tab-text {
    font-size: 0.7rem;
  }
}

/* Global styles (keeping existing theme variables) */
:root {
  --primary-color: #fbbf24;
  --secondary-color: #f59e0b;
  --accent-color: #fcd34d;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #06b6d4;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #fffbeb;
  --border-color: #fde68a;
}

:root.dark {
  --text-primary: #fef3c7;
  --text-secondary: #d97706;
  --bg-primary: #451a03;
  --bg-secondary: #78350f;
  --border-color: #92400e;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* Focus styles for accessibility */
button:focus,
input:focus,
textarea:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
button,
a,
input,
textarea {
  transition: all 0.2s ease;
}
</style>
