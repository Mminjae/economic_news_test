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
