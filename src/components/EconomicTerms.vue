<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Extended terms data
const allTerms = ref([
  {
    id: 1,
    term: "GDP",
    fullName: "Gross Domestic Product (국내총생산)",
    definition:
      "한 나라의 영토 내에서 일정 기간 동안 생산된 모든 최종 재화와 서비스의 시장가치 총합입니다.",
    example: "2023년 한국의 GDP는 약 2,080조원으로 세계 10위를 기록했습니다.",
    category: "거시경제",
    bookmark: false,
  },
  {
    id: 2,
    term: "인플레이션",
    fullName: "Inflation",
    definition:
      "물가가 지속적으로 상승하여 화폐의 구매력이 하락하는 경제 현상입니다.",
    example: "연 2-3%의 적정 인플레이션은 경제 성장에 도움이 됩니다.",
    category: "통화정책",
    bookmark: true,
  },
  {
    id: 3,
    term: "기준금리",
    fullName: "Base Rate",
    definition:
      "한국은행이 금융기관에 자금을 대출할 때 적용하는 기준이 되는 금리입니다.",
    example: "2024년 현재 한국의 기준금리는 3.5%입니다.",
    category: "통화정책",
    bookmark: false,
  },
  {
    id: 4,
    term: "CPI",
    fullName: "Consumer Price Index (소비자물가지수)",
    definition:
      "일반 소비자가 생활하는 데 필요한 상품과 서비스 가격의 평균적인 변동을 나타내는 지수입니다.",
    example: "2024년 1월 CPI는 전년 동월 대비 2.8% 상승했습니다.",
    category: "물가",
    bookmark: true,
  },
  {
    id: 5,
    term: "양적완화",
    fullName: "Quantitative Easing (QE)",
    definition:
      "중앙은행이 국채 등을 대량 매입하여 시중에 유동성을 공급하는 통화정책입니다.",
    example:
      "COVID-19 팬데믹 당시 각국 중앙은행이 양적완화 정책을 실시했습니다.",
    category: "통화정책",
    bookmark: false,
  },
  {
    id: 6,
    term: "실업률",
    fullName: "Unemployment Rate",
    definition:
      "경제활동인구 중에서 일할 의사와 능력이 있음에도 불구하고 일자리를 얻지 못한 사람의 비율입니다.",
    example: "2024년 3월 한국의 실업률은 2.7%를 기록했습니다.",
    category: "고용",
    bookmark: true,
  },
  {
    id: 7,
    term: "환율",
    fullName: "Exchange Rate",
    definition: "한 나라의 화폐와 다른 나라 화폐 사이의 교환비율을 의미합니다.",
    example: "달러 강세로 원/달러 환율이 1,350원대까지 ��승했습니다.",
    category: "외환",
    bookmark: false,
  },
  {
    id: 8,
    term: "국가부채",
    fullName: "National Debt",
    definition:
      "중앙정부와 지방정부가 발행한 채권 등을 통해 부담하게 된 부채의 총액입니다.",
    example: "한국의 국가부채는 GDP 대비 50% 수준을 유지하고 있습니다.",
    category: "재정",
    bookmark: false,
  },
  {
    id: 9,
    term: "경상수지",
    fullName: "Current Account Balance",
    definition:
      "한 나라가 외국과의 거래에서 발생하는 상품, 서비스, 소득, 경상이전의 수지를 말합니다.",
    example: "한국은 2023년 경상수지 흑자 290억 달러를 기록했습니다.",
    category: "국제수지",
    bookmark: true,
  },
  {
    id: 10,
    term: "ESG",
    fullName: "Environmental, Social, and Governance",
    definition:
      "환경(Environmental), 사회(Social), 지배구조(Governance)를 고려한 지속가능경영 평가 기준입니다.",
    example:
      "많은 기업들이 ESG 경영을 통해 지속가능한 발전을 추구하고 있습니다.",
    category: "지속가능성",
    bookmark: false,
  },
]);

// Reactive state
const searchQuery = ref("");
const selectedTerm = ref(null);
const showDetailModal = ref(false);
const showBookmarksOnly = ref(false);

// Computed properties
const filteredTerms = computed(() => {
  let terms = allTerms.value;

  // Filter by bookmarks if enabled
  if (showBookmarksOnly.value) {
    terms = terms.filter((term) => term.bookmark);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    terms = terms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.fullName.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.category.toLowerCase().includes(query),
    );
  }

  return terms;
});

const bookmarkedCount = computed(() => {
  return allTerms.value.filter((term) => term.bookmark).length;
});

const categories = computed(() => {
  const cats = [...new Set(allTerms.value.map((term) => term.category))];
  return cats.sort();
});

// Methods
const toggleBookmark = (termId) => {
  const term = allTerms.value.find((t) => t.id === termId);
  if (term) {
    term.bookmark = !term.bookmark;
    saveBookmarks();
  }
};

const selectTerm = (term) => {
  selectedTerm.value = term;
  showDetailModal.value = true;
};

const closeDetail = () => {
  showDetailModal.value = false;
  selectedTerm.value = null;
};

const toggleBookmarksFilter = () => {
  showBookmarksOnly.value = !showBookmarksOnly.value;
};

const clearSearch = () => {
  searchQuery.value = "";
};

const saveBookmarks = () => {
  const bookmarkedIds = allTerms.value
    .filter((term) => term.bookmark)
    .map((term) => term.id);
  localStorage.setItem("economicTermsBookmarks", JSON.stringify(bookmarkedIds));
};

const loadBookmarks = () => {
  const saved = localStorage.getItem("economicTermsBookmarks");
  if (saved) {
    const bookmarkedIds = JSON.parse(saved);
    allTerms.value.forEach((term) => {
      term.bookmark = bookmarkedIds.includes(term.id);
    });
  }
};

// Handle escape key for modal
const handleEscapeKey = (event) => {
  if (event.key === "Escape" && showDetailModal.value) {
    closeDetail();
  }
};

// Lifecycle
onMounted(() => {
  loadBookmarks();
  document.addEventListener("keydown", handleEscapeKey);
});

// Watch for search changes
watch(searchQuery, () => {
  // Auto-clear bookmarks filter when searching
  if (searchQuery.value.trim() && showBookmarksOnly.value) {
    showBookmarksOnly.value = false;
  }
});
</script>

<template>
  <div class="economic-terms">
    <!-- Header -->
    <header class="terms-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">📚 경제��어 사전</h1>
          <p class="page-subtitle">
            경제와 금융 분야의 핵심 용어들을 쉽게 찾아보세요
          </p>
        </div>
      </div>
    </header>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-wrapper">
          <div class="search-input-container">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="용어명, 설명, 카테고리로 검색..."
              class="search-input"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-search"
            >
              ✕
            </button>
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <div class="filter-actions">
          <button
            @click="toggleBookmarksFilter"
            class="bookmarks-toggle"
            :class="{ active: showBookmarksOnly }"
          >
            ⭐ 즐겨찾기
            <span v-if="bookmarkedCount > 0" class="bookmark-count">{{
              bookmarkedCount
            }}</span>
          </button>
        </div>
      </div>

      <div class="search-info">
        <span class="results-count"> {{ filteredTerms.length }}개의 용어 </span>
        <span v-if="showBookmarksOnly" class="filter-indicator">
          • 즐겨찾기만 표시
        </span>
        <span v-if="searchQuery" class="filter-indicator">
          • "{{ searchQuery }}" 검색 결과
        </span>
      </div>
    </section>

    <!-- Main Content -->
    <main class="terms-main">
      <!-- Terms List -->
      <div class="terms-list">
        <!-- Empty State -->
        <div v-if="filteredTerms.length === 0" class="empty-state">
          <div class="empty-icon">📖</div>
          <h3 class="empty-title">
            {{
              searchQuery
                ? "검색 결과가 없습니다"
                : showBookmarksOnly
                  ? "즐겨찾기한 용어가 없습니다"
                  : "용어가 없습니다"
            }}
          </h3>
          <p class="empty-message">
            {{
              searchQuery
                ? "다른 검색어를 시도해보세요"
                : showBookmarksOnly
                  ? "용어를 즐겨찾기에 추가해보세요"
                  : "용어를 추가해주세요"
            }}
          </p>
          <button
            v-if="searchQuery || showBookmarksOnly"
            @click="
              searchQuery = '';
              showBookmarksOnly = false;
            "
            class="reset-btn"
          >
            전체 용어 보기
          </button>
        </div>

        <!-- Terms Grid -->
        <div v-else class="terms-grid">
          <div
            v-for="term in filteredTerms"
            :key="term.id"
            @click="selectTerm(term)"
            class="term-card"
            :class="{ bookmarked: term.bookmark }"
          >
            <div class="term-header">
              <div class="term-category">{{ term.category }}</div>
              <button
                @click.stop="toggleBookmark(term.id)"
                class="bookmark-btn"
                :class="{ active: term.bookmark }"
                :title="term.bookmark ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'"
              >
                {{ term.bookmark ? "⭐" : "☆" }}
              </button>
            </div>

            <div class="term-content">
              <h3 class="term-title">{{ term.term }}</h3>
              <p class="term-full-name">{{ term.fullName }}</p>
              <p class="term-preview">
                {{ term.definition.substring(0, 80) }}...
              </p>
            </div>

            <div class="term-footer">
              <span class="view-detail">자세히 보기 →</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Detail Modal -->
    <div
      v-if="showDetailModal && selectedTerm"
      class="modal-overlay"
      @click="closeDetail"
    >
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <header class="modal-header">
          <div class="modal-title-section">
            <div class="modal-category">{{ selectedTerm.category }}</div>
            <h2 class="modal-title">{{ selectedTerm.term }}</h2>
            <p class="modal-full-name">{{ selectedTerm.fullName }}</p>
          </div>
          <div class="modal-actions">
            <button
              @click="toggleBookmark(selectedTerm.id)"
              class="modal-bookmark-btn"
              :class="{ active: selectedTerm.bookmark }"
            >
              {{ selectedTerm.bookmark ? "⭐" : "☆" }}
            </button>
            <button @click="closeDetail" class="modal-close-btn">✕</button>
          </div>
        </header>

        <!-- Modal Content -->
        <div class="modal-content">
          <div class="definition-section">
            <h3 class="section-title">📖 정의</h3>
            <p class="definition-text">{{ selectedTerm.definition }}</p>
          </div>

          <div class="example-section">
            <h3 class="section-title">💡 예시</h3>
            <div class="example-box">
              <p class="example-text">{{ selectedTerm.example }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.economic-terms {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  color: #1e293b;
  transition: all 0.3s ease;
}

:root.dark .economic-terms {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f1f5f9;
}

/* Header */
.terms-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

:root.dark .terms-header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 3rem;
}

.page-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0.5rem 0 0 0;
  color: #64748b;
  font-size: 1rem;
}

:root.dark .page-subtitle {
  color: #94a3b8;
}

/* Search Section */
.search-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-wrapper {
  flex: 1;
  min-width: 280px;
}

.search-input-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:root.dark .search-input {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.1rem;
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-search:hover {
  background: #dc2626;
  transform: translateY(-50%) scale(1.1);
}

.bookmarks-toggle {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

:root.dark .bookmarks-toggle {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.bookmarks-toggle:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.bookmarks-toggle.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.bookmark-count {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.search-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

:root.dark .search-info {
  color: #94a3b8;
}

.filter-indicator {
  color: #3b82f6;
  font-weight: 600;
}

/* Main Content */
.terms-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem 2rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

:root.dark .empty-state {
  color: #94a3b8;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

:root.dark .empty-title {
  color: #d1d5db;
}

.empty-message {
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.reset-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Terms Grid */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

:root.dark .term-card {
  background: #1e293b;
  border-color: #334155;
}

.term-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%);
  border-radius: 16px 16px 0 0;
}

.term-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

:root.dark .term-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.term-card.bookmarked::before {
  background: linear-gradient(90deg, #f59e0b 0%, #eab308 100%);
}

.term-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.term-category {
  background: #eff6ff;
  color: #1e40af;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:root.dark .term-category {
  background: #1e40af;
  color: #dbeafe;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bookmark-btn:hover {
  background: #f1f5f9;
  transform: scale(1.1);
}

:root.dark .bookmark-btn:hover {
  background: #334155;
}

.bookmark-btn.active {
  color: #f59e0b;
}

.term-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
}

:root.dark .term-title {
  color: #f1f5f9;
}

.term-full-name {
  margin: 0 0 0.75rem 0;
  color: #64748b;
  font-size: 0.9rem;
  font-style: italic;
}

:root.dark .term-full-name {
  color: #94a3b8;
}

.term-preview {
  margin: 0 0 1rem 0;
  color: #475569;
  line-height: 1.5;
  font-size: 0.95rem;
}

:root.dark .term-preview {
  color: #cbd5e1;
}

.term-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
}

:root.dark .term-footer {
  border-top-color: #334155;
}

.view-detail {
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.term-card:hover .view-detail {
  color: #1d4ed8;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease;
}

:root.dark .modal-container {
  background: #1e293b;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.dark-mode .modal-header {
  border-bottom-color: #334155;
}

.modal-category {
  background: #eff6ff;
  color: #1e40af;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  display: inline-block;
}

.dark-mode .modal-category {
  background: #1e40af;
  color: #dbeafe;
}

.modal-title {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
}

.dark-mode .modal-title {
  color: #f1f5f9;
}

.modal-full-name {
  margin: 0;
  color: #64748b;
  font-size: 1.1rem;
  font-style: italic;
}

.dark-mode .modal-full-name {
  color: #94a3b8;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.modal-bookmark-btn,
.modal-close-btn {
  background: none;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .modal-bookmark-btn,
.dark-mode .modal-close-btn {
  border-color: #475569;
  color: #e2e8f0;
}

.modal-bookmark-btn:hover,
.modal-close-btn:hover {
  border-color: #3b82f6;
  transform: scale(1.1);
}

.modal-bookmark-btn.active {
  background: #f59e0b;
  border-color: #f59e0b;
  color: white;
}

.modal-close-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.modal-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.definition-section,
.example-section {
  margin-bottom: 2rem;
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #3b82f6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.definition-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin: 0;
}

.dark-mode .definition-text {
  color: #d1d5db;
}

.example-box {
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
}

.dark-mode .example-box {
  background: #0f172a;
}

.example-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin: 0;
  font-style: italic;
}

.dark-mode .example-text {
  color: #cbd5e1;
}

/* Responsive Design */
@media (max-width: 1199px) and (min-width: 768px) {
  .header-content {
    max-width: 768px;
    padding: 0 2rem;
  }

  .search-section {
    max-width: 768px;
    padding: 2rem;
  }

  .terms-main {
    max-width: 768px;
    padding: 0 2rem 2rem;
  }
}

@media (max-width: 767px) {
  .header-content {
    max-width: 100%;
    padding: 0 1rem;
    flex-direction: column;
    text-align: center;
  }

  .search-section {
    max-width: 100%;
    padding: 1.5rem 1rem 2rem;
  }

  .terms-main {
    max-width: 100%;
    padding: 0 1rem 2rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .search-container {
    flex-direction: column;
  }

  .terms-grid {
    grid-template-columns: 1fr;
  }

  .modal-container {
    margin: 0.5rem;
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.5rem;
    flex-direction: column;
    align-items: stretch;
  }

  .modal-actions {
    align-self: flex-end;
  }

  .modal-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .terms-header {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .search-section {
    padding: 1rem;
  }

  .terms-main {
    padding: 0 1rem 1rem;
  }

  .term-card {
    padding: 1.25rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>
