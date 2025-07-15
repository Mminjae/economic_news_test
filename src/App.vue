<script setup>
import { ref, onMounted } from "vue";
import FinanceNews from "./components/FinanceNews.vue";
import FinancialCharts from "./components/FinancialCharts.vue";
import EconomicTerms from "./components/EconomicTerms.vue";
import EconomicQuiz from "./components/EconomicQuiz.vue";
import UserProfile from "./components/UserProfile.vue";
import AssetAnalysis from "./components/AssetAnalysis.vue";
import SpendingAnalysis from "./components/SpendingAnalysis.vue";
import BottomTabNavigation from "./components/BottomTabNavigation.vue";
import Authentication from "./components/Authentication.vue";

// Tab management
const activeTab = ref("asset-analysis");
const activeSubTab = ref("news");

// Authentication management
const isAuthenticated = ref(false);
const currentUser = ref(null);
const showAuthModal = ref(false);

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
  showAuthModal.value = false;
};

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  currentUser.value = null;
  isAuthenticated.value = false;
  // If currently on My Page, redirect to Asset Analysis
  if (activeTab.value === "my-page") {
    activeTab.value = "asset-analysis";
  }
};

const handleAuthRequired = (tabId) => {
  showAuthModal.value = true;
};

const closeAuthModal = () => {
  showAuthModal.value = false;
};

// Tab navigation
const handleTabClick = (tabId) => {
  activeTab.value = tabId;
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
        <h1 class="app-title">💼 경제 포털</h1>
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
      <AssetAnalysis v-if="activeTab === 'asset-analysis'" />
      <SpendingAnalysis v-else-if="activeTab === 'spending-analysis'" />

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
    </main>

    <!-- Bottom Tab Navigation -->
    <BottomTabNavigation
      :activeTab="activeTab"
      :isAuthenticated="isAuthenticated"
      @tab-click="handleTabClick"
      @auth-required="handleAuthRequired"
    />

    <!-- Authentication Modal -->
    <Authentication
      v-if="showAuthModal"
      @close="closeAuthModal"
      @login="handleLogin"
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
  background: var(--bg-primary);
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.app-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
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
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: var(--border-color);
}

.dark-mode-toggle {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
  border-color: #f59e0b;
  background: rgba(251, 191, 36, 0.1);
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 140px);
}

/* Economic Content Styles */
.economic-content {
  padding: 2rem;
}

.content-header {
  text-align: center;
  margin-bottom: 2rem;
}

.content-title {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.content-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.content-tabs {
  max-width: 1200px;
  margin: 0 auto;
}

.mini-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.mini-tab {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.mini-tab:hover {
  color: var(--text-primary);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-1px);
}

.mini-tab.active {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
}

.mini-tab-content {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode support */
:root.dark .app-header {
  background: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:root.dark .mini-tab {
  background: var(--bg-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .app-title {
    font-size: 1.4rem;
  }

  .user-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .welcome-text {
    font-size: 0.8rem;
  }

  .economic-content {
    padding: 1rem;
  }

  .content-title {
    font-size: 1.6rem;
  }

  .mini-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .mini-tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.2rem;
  }

  .header-container {
    padding: 0.75rem;
  }

  .mini-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .content-title {
    font-size: 1.4rem;
  }

  .content-description {
    font-size: 1rem;
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
