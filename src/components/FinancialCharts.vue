<script setup>
import { ref, computed, onMounted } from "vue";

// Mock data for financial assets
const mockAssetData = {
  crypto: [
    {
      id: 1,
      name: "비트코인",
      symbol: "BTC",
      price: 56000000,
      change: 2.45,
      changeAmount: 1340000,
      favorite: false,
    },
    {
      id: 2,
      name: "이더리움",
      symbol: "ETH",
      price: 3200000,
      change: -1.2,
      changeAmount: -38000,
      favorite: true,
    },
    {
      id: 3,
      name: "리플",
      symbol: "XRP",
      price: 850,
      change: 5.6,
      changeAmount: 45,
      favorite: false,
    },
    {
      id: 4,
      name: "에이다",
      symbol: "ADA",
      price: 650,
      change: 3.2,
      changeAmount: 20,
      favorite: true,
    },
  ],
  stocks: [
    {
      id: 5,
      name: "삼성전자",
      symbol: "005930",
      price: 72000,
      change: 1.8,
      changeAmount: 1200,
      favorite: true,
    },
    {
      id: 6,
      name: "SK하이닉스",
      symbol: "000660",
      price: 128000,
      change: -0.5,
      changeAmount: -600,
      favorite: false,
    },
    {
      id: 7,
      name: "NAVER",
      symbol: "035420",
      price: 205000,
      change: 2.1,
      changeAmount: 4200,
      favorite: false,
    },
    {
      id: 8,
      name: "카카오",
      symbol: "035720",
      price: 89000,
      change: -1.8,
      changeAmount: -1600,
      favorite: true,
    },
  ],
  fx: [
    {
      id: 9,
      name: "USD/KRW",
      symbol: "USDKRW",
      price: 1320.5,
      change: 0.8,
      changeAmount: 10.5,
      favorite: true,
    },
    {
      id: 10,
      name: "EUR/KRW",
      symbol: "EURKRW",
      price: 1435.2,
      change: -0.3,
      changeAmount: -4.3,
      favorite: false,
    },
    {
      id: 11,
      name: "JPY/KRW",
      symbol: "JPYKRW",
      price: 8.95,
      change: 1.2,
      changeAmount: 0.11,
      favorite: false,
    },
    {
      id: 12,
      name: "GBP/KRW",
      symbol: "GBPKRW",
      price: 1678.3,
      change: 0.5,
      changeAmount: 8.4,
      favorite: true,
    },
  ],
  gold: [
    {
      id: 13,
      name: "금 선물",
      symbol: "GOLD",
      price: 2340.5,
      change: 0.9,
      changeAmount: 20.8,
      favorite: true,
    },
    {
      id: 14,
      name: "은 선물",
      symbol: "SILVER",
      price: 28.45,
      change: -1.1,
      changeAmount: -0.32,
      favorite: false,
    },
    {
      id: 15,
      name: "백금",
      symbol: "PLATINUM",
      price: 945.2,
      change: 1.5,
      changeAmount: 14.1,
      favorite: false,
    },
    {
      id: 16,
      name: "팔라듐",
      symbol: "PALLADIUM",
      price: 1023.8,
      change: -2.3,
      changeAmount: -24.1,
      favorite: true,
    },
  ],
};

// Chart mock data for line chart
const chartData = ref([
  { time: "09:00", value: 55800000 },
  { time: "10:00", value: 55900000 },
  { time: "11:00", value: 56100000 },
  { time: "12:00", value: 55950000 },
  { time: "13:00", value: 56200000 },
  { time: "14:00", value: 56000000 },
  { time: "15:00", value: 56300000 },
  { time: "16:00", value: 56150000 },
  { time: "17:00", value: 56400000 },
  { time: "18:00", value: 56000000 },
]);

// Reactive state
const selectedAssetType = ref("crypto");
const selectedTimePeriod = ref("1D");
const showFavoritesOnly = ref(false);
const selectedAsset = ref(mockAssetData.crypto[0]);

// Asset type options
const assetTypes = [
  { key: "crypto", label: "가상화폐", icon: "₿" },
  { key: "stocks", label: "주식", icon: "📈" },
  { key: "fx", label: "외환", icon: "💱" },
  { key: "gold", label: "금", icon: "🥇" },
];

// Time period options
const timePeriods = ["1D", "1W", "1M", "1Y"];

// Computed properties
const currentAssets = computed(() => {
  const assets = mockAssetData[selectedAssetType.value] || [];
  return showFavoritesOnly.value
    ? assets.filter((asset) => asset.favorite)
    : assets;
});

const favoriteAssets = computed(() => {
  return Object.values(mockAssetData)
    .flat()
    .filter((asset) => asset.favorite);
});

// Methods
const selectAssetType = (type) => {
  selectedAssetType.value = type;
  if (mockAssetData[type] && mockAssetData[type].length > 0) {
    selectedAsset.value = mockAssetData[type][0];
  }
};

const selectTimePeriod = (period) => {
  selectedTimePeriod.value = period;
  // Update chart data based on period (mock implementation)
  updateChartData(period);
};

const toggleFavorite = (assetId) => {
  Object.values(mockAssetData)
    .flat()
    .forEach((asset) => {
      if (asset.id === assetId) {
        asset.favorite = !asset.favorite;
      }
    });
};

const selectAsset = (asset) => {
  selectedAsset.value = asset;
  // Update chart data for selected asset (mock implementation)
  updateChartDataForAsset(asset);
};

const updateChartData = (period) => {
  // Mock data update based on time period
  const dataPoints =
    period === "1D" ? 10 : period === "1W" ? 7 : period === "1M" ? 30 : 365;
  const basePrice = selectedAsset.value.price;

  chartData.value = Array.from({ length: dataPoints }, (_, i) => ({
    time: period === "1D" ? `${9 + i}:00` : `Day ${i + 1}`,
    value: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
  }));
};

const updateChartDataForAsset = (asset) => {
  const basePrice = asset.price;
  chartData.value = chartData.value.map((point, i) => ({
    ...point,
    value: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
  }));
};

const formatPrice = (price, type) => {
  if (type === "crypto" && price >= 1000000) {
    return `${(price / 1000000).toFixed(2)}M원`;
  } else if (type === "stocks") {
    return `${price.toLocaleString()}원`;
  } else if (type === "fx") {
    return `${price.toFixed(2)}원`;
  } else if (type === "gold") {
    return `$${price.toFixed(2)}`;
  }
  return `${price.toLocaleString()}원`;
};

const formatChange = (change, changeAmount, type) => {
  const sign = change >= 0 ? "+" : "";
  const formattedAmount =
    type === "fx"
      ? changeAmount.toFixed(2)
      : Math.abs(changeAmount).toLocaleString();
  return `${sign}${change.toFixed(2)}% (${sign}${formattedAmount})`;
};

// Lifecycle
onMounted(() => {
  updateChartData("1D");
});
</script>

<template>
  <div class="financial-charts">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-title">
          <h1>📊 금융 자산 시각화</h1>
          <p class="header-subtitle">실시간 시장 데이터 및 차트 분석</p>
        </div>
        <div class="header-actions">
          <button
            @click="showFavoritesOnly = !showFavoritesOnly"
            class="favorites-toggle"
            :class="{ active: showFavoritesOnly }"
          >
            ⭐ 즐겨찾기 ({{ favoriteAssets.length }})
          </button>
        </div>
      </div>
    </header>

    <!-- Asset Type Filters -->
    <section class="asset-filters">
      <div class="filter-container">
        <h3 class="filter-title">자산 종류</h3>
        <div class="filter-tabs">
          <button
            v-for="assetType in assetTypes"
            :key="assetType.key"
            @click="selectAssetType(assetType.key)"
            class="filter-tab"
            :class="{ active: selectedAssetType === assetType.key }"
          >
            <span class="tab-icon">{{ assetType.icon }}</span>
            <span class="tab-label">{{ assetType.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Main Dashboard -->
    <main class="dashboard-main">
      <!-- Chart Section -->
      <section class="chart-section">
        <div class="chart-header">
          <div class="chart-title">
            <h3>{{ selectedAsset.name }} ({{ selectedAsset.symbol }})</h3>
            <span class="current-price">{{
              formatPrice(selectedAsset.price, selectedAssetType)
            }}</span>
          </div>
          <div class="time-filters">
            <button
              v-for="period in timePeriods"
              :key="period"
              @click="selectTimePeriod(period)"
              class="time-filter"
              :class="{ active: selectedTimePeriod === period }"
            >
              {{ period }}
            </button>
          </div>
        </div>

        <!-- Simple Line Chart -->
        <div class="chart-container">
          <div class="chart-wrapper">
            <svg
              class="line-chart"
              viewBox="0 0 800 300"
              preserveAspectRatio="xMidYMid meet"
            >
              <!-- Grid lines -->
              <defs>
                <pattern
                  id="grid"
                  width="80"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 30"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="1"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              <!-- Chart line -->
              <polyline
                :points="
                  chartData
                    .map(
                      (point, i) =>
                        `${(i / (chartData.length - 1)) * 760 + 20},${280 - ((point.value - Math.min(...chartData.map((p) => p.value))) / (Math.max(...chartData.map((p) => p.value)) - Math.min(...chartData.map((p) => p.value)))) * 240}`,
                    )
                    .join(' ')
                "
                fill="none"
                stroke="#667eea"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- Data points -->
              <circle
                v-for="(point, i) in chartData"
                :key="i"
                :cx="(i / (chartData.length - 1)) * 760 + 20"
                :cy="
                  280 -
                  ((point.value - Math.min(...chartData.map((p) => p.value))) /
                    (Math.max(...chartData.map((p) => p.value)) -
                      Math.min(...chartData.map((p) => p.value)))) *
                    240
                "
                r="4"
                fill="#667eea"
                class="chart-point"
              />
            </svg>
          </div>

          <!-- Chart labels -->
          <div class="chart-labels">
            <div class="x-labels">
              <span v-for="(point, i) in chartData" :key="i" class="x-label">
                {{ point.time }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-time Prices Section -->
      <section class="prices-section">
        <h3 class="section-title">실시간 자산 가격</h3>
        <div class="assets-grid">
          <div
            v-for="asset in currentAssets"
            :key="asset.id"
            @click="selectAsset(asset)"
            class="asset-card"
            :class="{
              active: selectedAsset.id === asset.id,
              positive: asset.change >= 0,
              negative: asset.change < 0,
            }"
          >
            <div class="asset-header">
              <div class="asset-info">
                <h4 class="asset-name">{{ asset.name }}</h4>
                <span class="asset-symbol">{{ asset.symbol }}</span>
              </div>
              <button
                @click.stop="toggleFavorite(asset.id)"
                class="favorite-btn"
                :class="{ favorited: asset.favorite }"
              >
                {{ asset.favorite ? "⭐" : "☆" }}
              </button>
            </div>
            <div class="asset-price">
              <span class="price">{{
                formatPrice(asset.price, selectedAssetType)
              }}</span>
              <span
                class="change"
                :class="{
                  positive: asset.change >= 0,
                  negative: asset.change < 0,
                }"
              >
                {{
                  formatChange(
                    asset.change,
                    asset.changeAmount,
                    selectedAssetType,
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.financial-charts {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1a202c;
  transition: all 0.3s ease;
  position: relative;
}

:root.dark .financial-charts {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
}

.financial-charts::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(59, 130, 246, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(16, 185, 129, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
}

:root.dark .financial-charts::before {
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(59, 130, 246, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(16, 185, 129, 0.1) 0%,
      transparent 50%
    );
}

/* Header */
.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
}

:root.dark .dashboard-header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: #334155;
}

:root.dark .header-title h1 {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:root.dark .header-subtitle {
  color: #94a3b8;
}

:root.dark .favorites-toggle {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

:root.dark .favorites-toggle:hover {
  border-color: #60a5fa;
}

:root.dark .favorites-toggle.active {
  background: #3b82f6;
  border-color: #3b82f6;
}

.dashboard-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
}

.header-title h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  margin: 0.5rem 0 0 0;
  color: #64748b;
  font-size: 1.1rem;
}

.favorites-toggle {
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorites-toggle:hover {
  border-color: #667eea;
}

.favorites-toggle.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Asset Filters */
.asset-filters {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 1rem;
  position: relative;
  z-index: 10;
}

:root.dark .asset-filters {
  background: #1e293b;
  border-bottom-color: #334155;
}

.filter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}

.filter-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

:root.dark .filter-title {
  color: #f1f5f9;
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #374151;
}

:root.dark .filter-tab {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.filter-tab:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

:root.dark .filter-tab:hover {
  border-color: #60a5fa;
  background: #334155;
}

.filter-tab.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

:root.dark .filter-tab.active {
  background: #3b82f6;
  border-color: #3b82f6;
}

.tab-icon {
  font-size: 1.2rem;
}

/* Main Dashboard */
.dashboard-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem;
  display: grid;
  gap: 2rem;
}

.section-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

/* Prices Section */
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.asset-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

:root.dark .asset-card {
  background: #1e293b;
  border-color: #334155;
}

.asset-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.asset-card.negative::before {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}

.asset-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.asset-card.active {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.asset-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.asset-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

:root.dark .asset-name {
  color: #f1f5f9;
}

.asset-symbol {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

:root.dark .asset-symbol {
  color: #94a3b8;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  background: #f1f5f9;
  transform: scale(1.1);
}

.favorite-btn.favorited {
  color: #f59e0b;
}

.asset-price {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
}

:root.dark .price {
  color: #f1f5f9;
}

.change {
  font-size: 0.9rem;
  font-weight: 600;
}

.change.positive {
  color: #10b981;
}

.change.negative {
  color: #ef4444;
}

/* Chart Section */
.chart-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

:root.dark .chart-section {
  background: #1e293b;
  border-color: #334155;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

:root.dark .chart-title h3 {
  color: #f1f5f9;
}

.current-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
}

:root.dark .current-price {
  color: #60a5fa;
}

.time-filters {
  display: flex;
  gap: 0.5rem;
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 12px;
}

:root.dark .time-filters {
  background: #0f172a;
}

.time-filter {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #64748b;
}

:root.dark .time-filter {
  color: #94a3b8;
}

.time-filter:hover {
  background: white;
  color: #1e293b;
}

:root.dark .time-filter:hover {
  background: #334155;
  color: #f1f5f9;
}

.time-filter.active {
  background: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

:root.dark .time-filter.active {
  background: #3b82f6;
}

/* Chart */
.chart-container {
  position: relative;
}

.chart-wrapper {
  background: #fafbfc;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
}

:root.dark .chart-wrapper {
  background: #0f172a;
  border-color: #334155;
}

.line-chart {
  width: 100%;
  height: auto;
  max-height: 300px;
}

.chart-point {
  transition: all 0.3s ease;
}

.chart-point:hover {
  r: 6;
  fill: #4f46e5;
}

.chart-labels {
  margin-top: 1rem;
}

.x-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
}

.x-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

:root.dark .x-label {
  color: #94a3b8;
}

/* Responsive Design */
@media (max-width: 1199px) and (min-width: 768px) {
  .header-content {
    max-width: 768px;
    padding: 0 2rem;
  }

  .filter-container {
    max-width: 768px;
    padding: 0 2rem;
  }

  .dashboard-main {
    max-width: 768px;
    padding: 2rem;
  }
}

@media (max-width: 767px) {
  .header-content {
    max-width: 100%;
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .filter-container {
    max-width: 100%;
    padding: 0 1rem;
  }

  .dashboard-main {
    max-width: 100%;
    padding: 1.5rem 1rem;
  }

  .chart-header {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 768px) {
  .header-title h1 {
    font-size: 2rem;
  }

  .filter-tabs {
    justify-content: center;
  }

  .assets-grid {
    grid-template-columns: 1fr;
  }

  .time-filters {
    justify-content: center;
  }

  .x-labels {
    padding: 0 1rem;
  }

  .x-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 1.5rem 1rem;
  }

  .header-title h1 {
    font-size: 1.8rem;
  }

  .chart-section {
    padding: 1.5rem;
  }

  .filter-tab {
    padding: 0.75rem 1rem;
  }

  .time-filter {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
