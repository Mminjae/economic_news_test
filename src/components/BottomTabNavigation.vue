<template>
  <div class="bottom-nav-container">
    <nav class="bottom-navigation">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="handleTabClick(tab)"
        class="nav-tab"
        :class="{
          active: activeTab === tab.id,
          disabled: tab.requiresAuth && !isAuthenticated,
        }"
      >
        <div class="tab-content">
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
          <span v-if="tab.requiresAuth && !isAuthenticated" class="lock-icon"
            >🔒</span
          >
        </div>
        <div v-if="activeTab === tab.id" class="active-indicator"></div>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["tab-click", "auth-required"]);

const tabs = [
  {
    id: "assets",
    label: "자산",
    icon: "💰",
    requiresAuth: false,
  },
  {
    id: "analysis",
    label: "분석",
    icon: "📊",
    requiresAuth: false,
  },
  {
    id: "home",
    label: "홈",
    icon: "🏠",
    requiresAuth: false,
  },
  {
    id: "economic-content",
    label: "경제컨텐츠",
    icon: "📰",
    requiresAuth: false,
  },
  {
    id: "my-page",
    label: "마이페이지",
    icon: "👤",
    requiresAuth: true,
  },
];

const handleTabClick = (tab) => {
  if (tab.requiresAuth && !props.isAuthenticated) {
    emit("auth-required", tab.id);
    return;
  }

  emit("tab-click", tab.id);
};
</script>

<style scoped>
.bottom-nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
  border-top: 3px solid var(--border-color);
  box-shadow:
    0 -8px 32px rgba(0, 0, 0, 0.12),
    0 -2px 8px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.bottom-nav-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
}

.bottom-navigation {
  display: flex;
  max-width: 700px;
  margin: 0 auto;
  padding: 0.5rem 1rem 1rem;
  gap: 0.25rem;
}

.nav-tab {
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.75rem 0.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-tab.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-tab:not(.disabled):hover {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(37, 99, 235, 0.1) 100%
  );
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.nav-tab.active {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.15) 0%,
    rgba(37, 99, 235, 0.15) 100%
  );
  border: 2px solid rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

.tab-icon {
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.nav-tab.active .tab-icon {
  transform: scale(1.1);
}

.tab-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-tab.active .tab-label {
  color: var(--primary-color);
  font-weight: 700;
}

.lock-icon {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

.active-indicator {
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  border-radius: 2px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 24px;
    opacity: 1;
  }
}

/* Ripple effect */
.nav-tab::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(251, 191, 36, 0.2);
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.nav-tab:not(.disabled):active::before {
  width: 60px;
  height: 60px;
}

/* Dark mode support */
:root.dark .bottom-nav-container {
  background: var(--bg-secondary);
  border-top-color: var(--border-color);
}

:root.dark .nav-tab:not(.disabled):hover {
  background: rgba(251, 191, 36, 0.2);
}

:root.dark .nav-tab.active {
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.25) 0%,
    rgba(245, 158, 11, 0.25) 100%
  );
}

/* Add padding to body to account for fixed bottom navigation */
body {
  padding-bottom: 80px;
}

/* Safe area for iOS devices */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .bottom-navigation {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}

/* Responsive design */
@media (max-width: 480px) {
  .bottom-navigation {
    padding: 0.5rem 0.5rem 1rem;
    gap: 0.25rem;
  }

  .nav-tab {
    padding: 0.5rem 0.25rem;
  }

  .tab-icon {
    font-size: 1.3rem;
  }

  .tab-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 360px) {
  .tab-label {
    font-size: 0.65rem;
  }

  .tab-icon {
    font-size: 1.2rem;
  }
}
</style>
