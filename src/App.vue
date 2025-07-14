<script setup>
import { ref } from "vue";
import FinanceNews from "./components/FinanceNews.vue";
import FinancialCharts from "./components/FinancialCharts.vue";
import EconomicTerms from "./components/EconomicTerms.vue";
import EconomicQuiz from "./components/EconomicQuiz.vue";

// Tab management
const activeTab = ref("news");

const tabs = [
  { id: "news", label: "경제 뉴스", icon: "📰", component: "FinanceNews" },
  {
    id: "charts",
    label: "금융 차트",
    icon: "📈",
    component: "FinancialCharts",
  },
  { id: "terms", label: "경제 용어", icon: "📚", component: "EconomicTerms" },
  { id: "quiz", label: "경제 퀴즈", icon: "🧠", component: "EconomicQuiz" },
];

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};
</script>

<template>
  <div class="app">
    <!-- Tab Navigation -->
    <nav class="tab-navigation">
      <div class="nav-container">
        <div class="nav-brand">
          <h1 class="brand-title">💼 경제 포털</h1>
        </div>
        <div class="nav-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="nav-tab"
            :class="{ active: activeTab === tab.id }"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Tab Content -->
    <main class="tab-content">
      <FinanceNews v-if="activeTab === 'news'" />
      <FinancialCharts v-else-if="activeTab === 'charts'" />
      <EconomicTerms v-else-if="activeTab === 'terms'" />
      <EconomicQuiz v-else-if="activeTab === 'quiz'" />
    </main>
  </div>
</template>

<style>
/* App Layout */
.app {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

/* Tab Navigation */
.tab-navigation {
  background: white;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-brand {
  flex-shrink: 0;
}

.brand-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-tab {
  background: transparent;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-secondary);
  position: relative;
  overflow: hidden;
}

.nav-tab::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(102, 126, 234, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.nav-tab:hover::before {
  left: 100%;
}

.nav-tab:hover {
  color: var(--text-primary);
  border-color: rgba(102, 126, 234, 0.2);
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
}

.nav-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.nav-tab.active::before {
  display: none;
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-label {
  font-size: 0.95rem;
  white-space: nowrap;
}

.tab-content {
  flex: 1;
}

/* Dark mode support for navigation */
:root.dark .tab-navigation {
  background: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:root.dark .nav-tab {
  color: var(--text-secondary);
}

:root.dark .nav-tab:hover {
  color: var(--text-primary);
  background: rgba(102, 126, 234, 0.1);
}

:root.dark .nav-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Responsive Design for Navigation */
@media (max-width: 1024px) {
  .nav-container {
    padding: 1rem;
  }

  .brand-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .nav-tabs {
    justify-content: center;
    width: 100%;
  }

  .nav-tab {
    flex: 1;
    justify-content: center;
    min-width: 0;
  }

  .tab-label {
    font-size: 0.85rem;
  }
}

@media (max-width: 640px) {
  .nav-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
  }

  .nav-tab {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem;
  }

  .brand-title {
    font-size: 1.4rem;
  }

  .nav-tabs {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .nav-tab {
    padding: 0.75rem 1rem;
  }

  .tab-icon {
    font-size: 1.1rem;
  }

  .tab-label {
    font-size: 0.8rem;
  }
}

/* Global styles for dark mode support */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --accent-color: #fbbf24;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #06b6d4;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;
}

:root.dark {
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --border-color: #374151;
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

/* Print styles */
@media print {
  body {
    background: white !important;
    color: black !important;
  }

  .news-header,
  .search-section,
  .bookmark-btn,
  .dark-mode-toggle {
    display: none !important;
  }
}
</style>
