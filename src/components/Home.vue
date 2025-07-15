<template>
  <div class="home-page">
    <!-- Welcome Header -->
    <div class="welcome-header">
      <div class="welcome-content">
        <h1 class="welcome-title">
          <span class="greeting">안녕하세요!</span>
          <span v-if="user" class="user-name">{{ user.name }}님</span>
          <span v-else class="guest-text">뱅크랩에 오신 것을 환영합니다</span>
        </h1>
        <p class="welcome-subtitle">
          {{
            user
              ? "오늘도 현명한 경제 활동을 시작해보세요"
              : "로그인하여 개인화된 서비스를 이용하세요"
          }}
        </p>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-container">
      <!-- User Profile Block -->
      <div class="dashboard-block profile-block">
        <div class="block-header">
          <div class="block-title">
            <span class="block-icon">👤</span>
            <h3>프로필</h3>
          </div>
          <button
            v-if="!user"
            @click="$emit('show-auth')"
            class="action-button"
          >
            로그인
          </button>
        </div>

        <div v-if="user" class="profile-content">
          <div class="profile-avatar">
            <div class="avatar-circle">
              {{ user.name.charAt(0) }}
            </div>
            <div class="level-badge">Lv.{{ userLevel }}</div>
          </div>
          <div class="profile-info">
            <h4 class="profile-name">{{ user.name }}</h4>
            <p class="profile-email">{{ user.email }}</p>
            <div class="profile-stats">
              <span class="stat-item"
                >가입일: {{ formatJoinDate(user.joinDate) }}</span
              >
            </div>
          </div>
        </div>

        <div v-else class="guest-content">
          <div class="guest-avatar">
            <span class="guest-icon">🔐</span>
          </div>
          <div class="guest-info">
            <h4 class="guest-title">로그인이 필요합니다</h4>
            <p class="guest-description">
              개인화된 서비스를 이용하려면 로그인하세요
            </p>
          </div>
        </div>
      </div>

      <!-- Asset Summary Block -->
      <div class="dashboard-block asset-block">
        <div class="block-header">
          <div class="block-title">
            <span class="block-icon">💰</span>
            <h3>총 자산 요약</h3>
          </div>
          <button @click="$emit('navigate', 'assets')" class="action-button">
            상세보기
          </button>
        </div>

        <div class="asset-content">
          <div class="total-asset">
            <span class="asset-label">총 자산</span>
            <span class="asset-amount">{{ formatCurrency(totalAssets) }}</span>
          </div>

          <div class="asset-breakdown">
            <div class="asset-item">
              <div class="asset-type">
                <span class="type-icon">🏦</span>
                <span class="type-name">예금</span>
              </div>
              <span class="type-amount">{{
                formatCurrency(assets.savings)
              }}</span>
            </div>

            <div class="asset-item">
              <div class="asset-type">
                <span class="type-icon">📈</span>
                <span class="type-name">투자</span>
              </div>
              <span class="type-amount">{{
                formatCurrency(assets.investment)
              }}</span>
            </div>

            <div class="asset-item">
              <div class="asset-type">
                <span class="type-icon">🏠</span>
                <span class="type-name">부동산</span>
              </div>
              <span class="type-amount">{{
                formatCurrency(assets.realEstate)
              }}</span>
            </div>
          </div>

          <div class="asset-chart">
            <div class="chart-placeholder">
              <span class="chart-icon">📊</span>
              <p class="chart-text">자산 분포도</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Personality Test Block -->
      <div class="dashboard-block test-block">
        <div class="block-header">
          <div class="block-title">
            <span class="block-icon">🧠</span>
            <h3>투자 성향 검사</h3>
          </div>
        </div>

        <div class="test-content">
          <div v-if="personalityTest.completed" class="test-result">
            <div class="result-badge">
              <span class="result-icon">{{ personalityTest.result.icon }}</span>
              <div class="result-info">
                <h4 class="result-type">{{ personalityTest.result.type }}</h4>
                <p class="result-description">
                  {{ personalityTest.result.description }}
                </p>
              </div>
            </div>

            <div class="result-stats">
              <div class="stat-bar">
                <span class="stat-label">위험 선호도</span>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: personalityTest.result.riskLevel + '%' }"
                  ></div>
                </div>
                <span class="stat-value"
                  >{{ personalityTest.result.riskLevel }}%</span
                >
              </div>
            </div>

            <button @click="retakeTest" class="test-button secondary">
              다시 검사하기
            </button>
          </div>

          <div v-else class="test-prompt">
            <div class="prompt-illustration">
              <span class="prompt-icon">🎯</span>
            </div>
            <div class="prompt-content">
              <h4 class="prompt-title">투자 성향을 알아보세요</h4>
              <p class="prompt-description">
                간단한 질문으로 당신의 투자 성향을 파악하고<br />
                맞춤형 투자 조언을 받아보세요
              </p>
              <div class="test-features">
                <div class="feature-item">
                  <span class="feature-icon">⏱️</span>
                  <span>5분 소요</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📊</span>
                  <span>정확한 분석</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">💡</span>
                  <span>맞춤 조언</span>
                </div>
              </div>
              <button @click="startTest" class="test-button primary">
                검사 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Block -->
      <div class="dashboard-block actions-block">
        <div class="block-header">
          <div class="block-title">
            <span class="block-icon">⚡</span>
            <h3>빠른 실행</h3>
          </div>
        </div>

        <div class="actions-content">
          <div class="action-grid">
            <button
              @click="$emit('navigate', 'economic-content')"
              class="quick-action"
            >
              <span class="action-icon">📰</span>
              <span class="action-label">뉴스 보기</span>
            </button>

            <button @click="$emit('navigate', 'analysis')" class="quick-action">
              <span class="action-icon">📊</span>
              <span class="action-label">지출 분석</span>
            </button>

            <button @click="$emit('navigate', 'assets')" class="quick-action">
              <span class="action-icon">💎</span>
              <span class="action-label">자산 관리</span>
            </button>

            <button class="quick-action" @click="openCalculator">
              <span class="action-icon">🧮</span>
              <span class="action-label">계산기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["navigate", "show-auth"]);

// User level calculation
const userLevel = computed(() => {
  if (!props.user) return 1;
  // Simple level calculation based on join date
  const joinDate = new Date(props.user.joinDate || Date.now());
  const daysSinceJoin = Math.floor(
    (Date.now() - joinDate) / (1000 * 60 * 60 * 24),
  );
  return Math.floor(daysSinceJoin / 30) + 1; // Level up every 30 days
});

// Sample asset data
const assets = ref({
  savings: 15000000,
  investment: 8500000,
  realEstate: 35000000,
});

const totalAssets = computed(() => {
  return (
    assets.value.savings + assets.value.investment + assets.value.realEstate
  );
});

// Personality test data
const personalityTest = ref({
  completed: false,
  result: {
    type: "안정형 투자자",
    description: "위험을 최소화하고 안정적인 수익을 추구합니다",
    icon: "🛡️",
    riskLevel: 35,
  },
});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatJoinDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR");
};

const startTest = () => {
  // Simulate starting the test
  alert("투자 성향 검사를 시작합니다!");
  // For demo, we'll mark it as completed after a delay
  setTimeout(() => {
    personalityTest.value.completed = true;
  }, 1000);
};

const retakeTest = () => {
  personalityTest.value.completed = false;
};

const openCalculator = () => {
  alert("계산기 기능을 준비 중입��다!");
};
</script>

<style scoped>
.home-page {
  min-height: calc(100vh - 140px);
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
  padding: 1rem;
}

/* Welcome Header */
.welcome-header {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(37, 99, 235, 0.05) 100%
  );
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 2px solid var(--border-color);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1);
}

.welcome-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.1),
    transparent
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.welcome-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
}

.greeting {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.user-name {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.guest-text {
  color: var(--text-secondary);
  font-size: 1.3rem;
}

.welcome-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
}

/* Dashboard Container */
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Dashboard Blocks */
.dashboard-block {
  background: var(--bg-primary);
  border-radius: 16px;
  border: 2px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.dashboard-block:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid var(--border-color);
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    rgba(251, 191, 36, 0.05) 100%
  );
}

.block-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.block-icon {
  font-size: 1.5rem;
}

.block-title h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.action-button {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.action-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

/* Profile Block */
.profile-content,
.guest-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar,
.guest-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

.level-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #10b981;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 2px solid var(--bg-primary);
}

.guest-icon {
  font-size: 2.5rem;
  opacity: 0.6;
}

.profile-info,
.guest-info {
  flex: 1;
}

.profile-name,
.guest-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.profile-email,
.guest-description {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.profile-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* Asset Block */
.asset-content {
  padding: 1.5rem;
}

.total-asset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.1) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  border-radius: 12px;
}

.asset-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.asset-amount {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-color);
}

.asset-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.asset-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.type-icon {
  font-size: 1.1rem;
}

.type-name {
  font-weight: 600;
  color: var(--text-primary);
}

.type-amount {
  font-weight: 700;
  color: var(--text-primary);
}

.asset-chart {
  text-align: center;
  padding: 1rem;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
}

.chart-icon {
  font-size: 2rem;
}

.chart-text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Test Block */
.test-content {
  padding: 1.5rem;
}

.test-result {
  text-align: center;
}

.result-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 12px;
}

.result-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.result-info {
  text-align: left;
  flex: 1;
}

.result-type {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.result-description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.result-stats {
  margin-bottom: 1.5rem;
}

.stat-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 80px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  transition: width 0.5s ease;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary-color);
  min-width: 40px;
  text-align: right;
}

.test-prompt {
  text-align: center;
}

.prompt-illustration {
  margin-bottom: 1rem;
}

.prompt-icon {
  font-size: 3rem;
}

.prompt-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.prompt-description {
  margin: 0 0 1.5rem 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.test-features {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.feature-icon {
  font-size: 1rem;
}

.test-button {
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.test-button.primary {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
}

.test-button.secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.test-button:hover {
  transform: translateY(-1px);
}

/* Actions Block */
.actions-content {
  padding: 1.5rem;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.quick-action {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.quick-action:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
}

.action-icon {
  font-size: 1.5rem;
}

.action-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Dark mode support */
:root.dark .dashboard-block {
  background: var(--bg-secondary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

:root.dark .block-header {
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    rgba(251, 191, 36, 0.1) 100%
  );
}

:root.dark .total-asset {
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.15) 0%,
    rgba(245, 158, 11, 0.08) 100%
  );
}

:root.dark .result-badge {
  background: var(--bg-primary);
}

:root.dark .quick-action {
  background: var(--bg-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .welcome-header {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .block-header {
    padding: 1rem;
  }

  .profile-content,
  .guest-content,
  .asset-content,
  .test-content,
  .actions-content {
    padding: 1rem;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .home-page {
    padding: 0.75rem;
  }

  .welcome-header {
    padding: 1rem;
  }

  .welcome-title {
    font-size: 1.3rem;
  }

  .asset-breakdown {
    gap: 0.5rem;
  }

  .test-features {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
