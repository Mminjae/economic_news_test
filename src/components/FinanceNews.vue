<script setup>
// Vue 3 Composition API 및 필요한 컴포넌트 임포트
import { ref, computed, onMounted } from "vue";
import { mockNewsData } from "../data/newsData.js";
import NewsCard from "./NewsCard.vue";
import NewsDetail from "./NewsDetail.vue";

// 뉴스 페이지 상태 관리
const news = ref(mockNewsData); // 뉴스 데이터 목록
const searchQuery = ref(""); // 검색 쿠리
const selectedNews = ref(null); // 선택된 뉴스 아이템 (상세보기용)
const bookmarks = ref(new Set()); // 북마크된 뉴스 ID 목록
const showBookmarksOnly = ref(false); // 북마크만 보기 모드

// 계산된 속성들
// 검색어와 북마크 필터링이 적용된 뉴스 목록
const filteredNews = computed(() => {
  let filtered = news.value;

  // 검색��로 필터링 (제목, 요약, 출처, 카테고리에서 검색)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }

  // 북마크만 보기 모드일 때 필터링
  if (showBookmarksOnly.value) {
    filtered = filtered.filter((item) => bookmarks.value.has(item.id));
  }

  return filtered;
});

// 북마크된 기사 수 계산
const bookmarkedCount = computed(() => bookmarks.value.size);

// 뉴스 관리 함수들
// 뉴스 상세보기 모달 열기
const openNewsDetail = (newsItem) => {
  selectedNews.value = newsItem;
};

// 뉴스 상세보기 모달 닫기
const closeNewsDetail = () => {
  selectedNews.value = null;
};

// 북마크 토글 (추가/제거)
const toggleBookmark = (newsId) => {
  if (bookmarks.value.has(newsId)) {
    bookmarks.value.delete(newsId); // 북마크 제거
  } else {
    bookmarks.value.add(newsId);
  }
  saveBookmarks();
};

const isBookmarked = (newsId) => {
  return bookmarks.value.has(newsId);
};

const toggleBookmarksFilter = () => {
  showBookmarksOnly.value = !showBookmarksOnly.value;
};

const saveBookmarks = () => {
  localStorage.setItem("newsBookmarks", JSON.stringify([...bookmarks.value]));
};

const loadBookmarks = () => {
  const saved = localStorage.getItem("newsBookmarks");
  if (saved) {
    bookmarks.value = new Set(JSON.parse(saved));
  }
};

// Lifecycle
onMounted(() => {
  loadBookmarks();
});
</script>

<template>
  <div class="finance-news">
    <!-- Header -->
    <header class="news-header">
      <div class="header-content">
        <div class="header-left">
          <div class="news-title">📰 금융 뉴스</div>
          <p class="news-subtitle">최신 금융 뉴스와 시장 동향을 확인하세요</p>
        </div>
      </div>
    </header>

    <!-- Search and Filter Section -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-input-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="��목, 내용, 출처, 카테고리로 뉴스 검색..."
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="filter-actions">
          <button
            @click="toggleBookmarksFilter"
            class="bookmark-filter"
            :class="{ active: showBookmarksOnly }"
          >
            ⭐ 북마크
            <span v-if="bookmarkedCount > 0" class="bookmark-count">{{
              bookmarkedCount
            }}</span>
          </button>
        </div>
      </div>

      <div class="results-info">
        <span class="results-count">
          {{ filteredNews.length }}개의 기사를 찾았습니다
        </span>
        <span v-if="showBookmarksOnly" class="filter-indicator">
          • 북마크된 기사만 표시
        </span>
      </div>
    </section>

    <!-- News Grid -->
    <main class="news-main">
      <div class="news-grid" v-if="filteredNews.length > 0">
        <NewsCard
          v-for="newsItem in filteredNews"
          :key="newsItem.id"
          :news="newsItem"
          :is-bookmarked="isBookmarked(newsItem.id)"
          @click="openNewsDetail(newsItem)"
          @toggle-bookmark="toggleBookmark(newsItem.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📄</div>
        <h3 class="empty-title">
          {{
            showBookmarksOnly
              ? "북마크된 기��가 ���습니다"
              : "기사를 찾을 수 없습니다"
          }}
        </h3>
        <p class="empty-message">
          {{
            showBookmarksOnly
              ? "기사를 북마크하여 여기서 확인하세요"
              : searchQuery
                ? "검색어를 다시 확인해보세요"
                : "새로운 기사를 기다려주세요"
          }}
        </p>
        <button
          v-if="showBookmarksOnly || searchQuery"
          @click="
            showBookmarksOnly = false;
            searchQuery = '';
          "
          class="reset-filters-btn"
        >
          모든 기사 보기
        </button>
      </div>
    </main>

    <!-- News Detail Modal -->
    <NewsDetail
      v-if="selectedNews"
      :news="selectedNews"
      :is-bookmarked="isBookmarked(selectedNews.id)"
      @close="closeNewsDetail"
      @toggle-bookmark="toggleBookmark(selectedNews.id)"
    />
  </div>
</template>

<style scoped>
.finance-news {
  min-height: 100vh;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  transition: all 0.3s ease;
  position: relative;
}

.finance-news::before {
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
    ),
    radial-gradient(
      circle at 40% 80%,
      rgba(139, 92, 246, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
}

:root.dark .finance-news {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f1f5f9;
}

/* Header Styles */
.news-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.25rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.news-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
}

:root.dark .news-header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
}

.news-title {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.025em;
}

.news-subtitle {
  color: #6b7280;
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
}

.dark-mode .news-subtitle {
  color: #9ca3af;
}

.dark-mode-toggle {
  background: none;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .dark-mode-toggle {
  border-color: #4b5563;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
  border-color: #667eea;
}

/* Search Section */
.search-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 3rem 2rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:root.dark .search-input {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.search-input:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.2rem;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
}

.bookmark-filter {
  background: white;
  border: 2px solid #e5e7eb;
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

:root.dark .bookmark-filter {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.bookmark-filter:hover {
  border-color: #f59e0b;
  transform: translateY(-2px);
}

.bookmark-filter.active {
  background: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.bookmark-count {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.results-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.dark-mode .results-info {
  color: #9ca3af;
}

.filter-indicator {
  color: #667eea;
  font-weight: 600;
}

/* News Grid */
.news-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem 3rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.dark-mode .empty-state {
  color: #9ca3af;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.dark-mode .empty-title {
  color: #d1d5db;
}

.empty-message {
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.reset-filters-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1199px) and (min-width: 768px) {
  .header-content {
    max-width: 768px;
    padding: 0 2rem;
  }

  .search-section {
    max-width: 768px;
    padding: 1.5rem 2rem 2rem;
  }

  .news-main {
    max-width: 768px;
    padding: 0 2rem 3rem;
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

  .news-title {
    font-size: 2rem;
  }

  .search-container {
    flex-direction: column;
  }

  .search-input-wrapper {
    min-width: unset;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .search-section {
    max-width: 100%;
    padding: 1.5rem 1rem 2rem;
  }

  .news-main {
    max-width: 100%;
    padding: 0 1rem 3rem;
  }
}

@media (max-width: 480px) {
  .news-header {
    padding: 1.5rem 1rem;
  }

  .news-title {
    font-size: 1.8rem;
  }

  .news-subtitle {
    font-size: 1rem;
  }
}
</style>
