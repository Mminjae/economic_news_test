<template>
  <div class="analysis-page">
    <div class="page-header">
      <h1 class="page-title">📊 분석</h1>
      <p class="page-description">
        당신의 소비 패턴과 금융 현황을 분석하고 현명한 지출을 도와드립니다
      </p>
    </div>

    <div class="content-container">
      <div class="feature-cards">
        <div class="feature-card">
          <div class="card-icon">📊</div>
          <h3 class="card-title">지출 분석</h3>
          <p class="card-description">
            카테고리별 지출 내역을 분석하고 시각화합니다.
          </p>
          <button class="card-btn">분석 보기</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">📝</div>
          <h3 class="card-title">예산 관리</h3>
          <p class="card-description">
            월별 예산을 설정하고 지출을 추적합니다.
          </p>
          <button class="card-btn">예산 설정</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">💡</div>
          <h3 class="card-title">절약 팁</h3>
          <p class="card-description">개인 맞춤형 절약 방법을 제안합니다.</p>
          <button class="card-btn">팁 보기</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">🎯</div>
          <h3 class="card-title">목표 달성</h3>
          <p class="card-description">
            저축 목표를 설정하고 달성 상황을 모니터링합니다.
          </p>
          <button class="card-btn">목표 설정</button>
        </div>
      </div>

      <div class="demo-section">
        <h2 class="demo-title">📈 이번 달 소비 현황</h2>
        <div class="demo-cards">
          <div class="demo-card">
            <div class="demo-icon">🍽️</div>
            <div class="demo-content">
              <h4 class="demo-label">식비</h4>
              <p class="demo-amount">350,000원</p>
              <p class="demo-percentage">+12% vs 지난달</p>
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-icon">🚗</div>
            <div class="demo-content">
              <h4 class="demo-label">교통비</h4>
              <p class="demo-amount">150,000원</p>
              <p class="demo-percentage">-5% vs 지난달</p>
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-icon">🛍️</div>
            <div class="demo-content">
              <h4 class="demo-label">쇼핑</h4>
              <p class="demo-amount">280,000원</p>
              <p class="demo-percentage">+25% vs 지난달</p>
            </div>
          </div>
        </div>
      </div>

      <div class="coming-soon">
        <div class="coming-soon-content">
          <h2 class="coming-soon-title">🚀 준비 중입니다</h2>
          <p class="coming-soon-text">
            더 정교한 소비분석과 개인화된 금융 조언 기능을 개발 중입니다.<br />
            곧 만나보실 수 있습니다!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will be implemented here
</script>

<style scoped>
.analysis-page {
  padding: 2rem;
  min-height: calc(100vh - 120px);
  background: var(--bg-primary);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
}

.page-description {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(251, 191, 36, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: #2563eb;
  box-shadow: 0 12px 35px rgba(37, 99, 235, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-title {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.card-description {
  margin: 0 0 1.5rem 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-btn {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  position: relative;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.card-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-title {
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
}

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.15);
}

.demo-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.demo-content {
  flex: 1;
}

.demo-label {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.demo-amount {
  margin: 0 0 0.25rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.demo-percentage {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.coming-soon {
  background: var(--bg-secondary);
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
}

.coming-soon-title {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.coming-soon-text {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Dark mode support */
:root.dark .feature-card,
:root.dark .demo-card {
  background: var(--bg-primary);
}

:root.dark .coming-soon {
  background: var(--bg-primary);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .analysis-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .demo-cards {
    grid-template-columns: 1fr;
  }

  .demo-card {
    padding: 1rem;
  }

  .coming-soon {
    padding: 2rem 1rem;
  }
}
</style>
