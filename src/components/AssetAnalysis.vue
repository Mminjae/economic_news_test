<template>
  <div class="asset-analysis">
    <div class="page-header">
      <h1 class="page-title">💰 자산분석</h1>
      <p class="page-description">
        당신의 자산을 체계적으로 분석하고 관리하세요
      </p>
    </div>

    <div class="content-container">
      <div class="feature-cards">
        <div class="feature-card">
          <div class="card-icon">📊</div>
          <h3 class="card-title">포트폴리오 분석</h3>
          <p class="card-description">
            투자 포트폴리오의 성과를 분석하고 리스크를 평가합니다.
          </p>
          <button class="card-btn">분석 시작</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">💎</div>
          <h3 class="card-title">자산 배분</h3>
          <p class="card-description">최적의 자산 배분 전략을 제시합니다.</p>
          <button class="card-btn">배분 보기</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">📈</div>
          <h3 class="card-title">수익률 추적</h3>
          <p class="card-description">
            시간별 수익률 변화를 추적하고 분석합니다.
          </p>
          <button class="card-btn">추적 시작</button>
        </div>

        <div class="feature-card">
          <div class="card-icon">🎯</div>
          <h3 class="card-title">목표 설정</h3>
          <p class="card-description">
            재�� 목표를 설정하고 달성 계획을 세웁니다.
          </p>
          <button class="card-btn">목표 설정</button>
        </div>
      </div>

      <div class="coming-soon">
        <div class="coming-soon-content">
          <h2 class="coming-soon-title">🚀 준비 중입니다</h2>
          <p class="coming-soon-text">
            더 정확하고 상세한 자산분석 기능을 준비 중입니다.<br />
            곧 여러분께 선보일 예정이니 기대해 주세요!
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
.asset-analysis {
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
  padding: 0 3rem;
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
:root.dark .feature-card {
  background: var(--bg-primary);
}

:root.dark .coming-soon {
  background: var(--bg-primary);
}

/* Responsive Design */
@media (max-width: 1199px) and (min-width: 768px) {
  .content-container {
    max-width: 768px;
    padding: 0 2rem;
  }
}

@media (max-width: 767px) {
  .asset-analysis {
    padding: 1rem;
  }

  .content-container {
    max-width: 100%;
    padding: 0 1rem;
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

  .coming-soon {
    padding: 2rem 1rem;
  }
}
</style>
