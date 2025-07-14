<script setup>
import { computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
  isBookmarked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "toggle-bookmark"]);

const formattedDate = computed(() => {
  const date = new Date(props.news.publishedAt);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const categoryColor = computed(() => {
  const colors = {
    "Monetary Policy": "#3b82f6",
    "Stock Market": "#10b981",
    Cryptocurrency: "#f59e0b",
    Banking: "#8b5cf6",
    Commodities: "#ef4444",
    "International Markets": "#06b6d4",
  };
  return colors[props.news.category] || "#6b7280";
});

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    emit("close");
  }
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
  document.body.style.overflow = "auto";
});
</script>

<template>
  <div class="news-detail-overlay" @click="handleBackdropClick">
    <div class="news-detail-modal">
      <!-- Modal Header -->
      <header class="modal-header">
        <div class="header-left">
          <span
            class="category-tag"
            :style="{ backgroundColor: categoryColor }"
          >
            {{ news.category }}
          </span>
          <div class="source-info">
            <span class="source-name">{{ news.source }}</span>
            <span class="publish-date">{{ formattedDate }}</span>
          </div>
        </div>

        <div class="header-actions">
          <button
            @click="$emit('toggle-bookmark')"
            class="bookmark-btn"
            :class="{ bookmarked: isBookmarked }"
            :title="isBookmarked ? '북마크에서 제거' : '북마크에 추가'"
          >
            {{ isBookmarked ? "���" : "☆" }}
          </button>
          <button @click="$emit('close')" class="close-btn" title="닫기">
            ✕
          </button>
        </div>
      </header>

      <!-- Modal Content -->
      <div class="modal-content">
        <!-- Article Content -->
        <article class="article-content">
          <h1 class="article-title">{{ news.title }}</h1>

          <div class="article-meta">
            <span class="author">작성자: {{ news.author }}</span>
            <span class="reading-time"
              >📖 ~{{ Math.ceil(news.content.split(" ").length / 200) }}분
              소요</span
            >
          </div>

          <div class="article-summary">
            <p class="summary-text">{{ news.summary }}</p>
          </div>

          <div class="article-body">
            <div
              v-for="(paragraph, index) in news.content.split('\n\n')"
              :key="index"
              class="paragraph"
            >
              {{ paragraph }}
            </div>
          </div>

          <!-- Article Footer -->
          <footer class="article-footer">
            <div class="tags">
              <span class="tag" :style="{ backgroundColor: categoryColor }">
                {{ news.category }}
              </span>
            </div>

            <div class="share-actions">
              <span class="share-text">이 기사 공유하기:</span>
              <div class="share-buttons">
                <button class="share-btn twitter" title="트위터에 공유">
                  🐦
                </button>
                <button class="share-btn linkedin" title="링크드인에 공유">
                  💼
                </button>
                <button class="share-btn copy" title="링크 복사">📋</button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail-overlay {
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

.news-detail-modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease;
}

:root.dark .news-detail-modal {
  background: #1f2937;
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

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(249, 250, 251, 0.8);
  backdrop-filter: blur(10px);
}

:root.dark .modal-header {
  border-bottom-color: #374151;
  background: rgba(31, 41, 55, 0.8);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-tag {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.source-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.source-name {
  font-weight: 700;
  color: #111827;
  font-size: 1.1rem;
}

:root.dark .source-name {
  color: #f9fafb;
}

.publish-date {
  font-size: 0.85rem;
  color: #6b7280;
}

:root.dark .publish-date {
  color: #9ca3af;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.bookmark-btn,
.close-btn {
  background: none;
  border: 2px solid #e5e7eb;
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

:root.dark .bookmark-btn,
:root.dark .close-btn {
  border-color: #4b5563;
  color: #e5e7eb;
}

.bookmark-btn:hover,
.close-btn:hover {
  border-color: #3b82f6;
  transform: scale(1.1);
}

.bookmark-btn.bookmarked {
  background: #fbbf24;
  border-color: #fbbf24;
  color: white;
}

.close-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Modal Content */
.modal-content {
  flex: 1;
  overflow-y: auto;
}

/* Article Content */
.article-content {
  padding: 2rem;
}

.article-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  color: #111827;
  margin-bottom: 1.5rem;
}

:root.dark .article-title {
  color: #f9fafb;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

:root.dark .article-meta {
  border-bottom-color: #374151;
}

.author {
  font-weight: 600;
  color: #3b82f6;
}

:root.dark .author {
  color: #60a5fa;
}

.reading-time {
  color: #6b7280;
  font-size: 0.9rem;
}

:root.dark .reading-time {
  color: #9ca3af;
}

.article-summary {
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 0 8px 8px 0;
}

:root.dark .article-summary {
  background: #374151;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin: 0;
  font-style: italic;
}

:root.dark .summary-text {
  color: #d1d5db;
}

.article-body {
  line-height: 1.8;
  color: #374151;
  margin-bottom: 3rem;
}

:root.dark .article-body {
  color: #d1d5db;
}

.paragraph {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

/* Article Footer */
.article-footer {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

:root.dark .article-footer {
  border-top-color: #374151;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #3b82f6;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
}

.share-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-text {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 600;
}

:root.dark .share-text {
  color: #9ca3af;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

:root.dark .share-btn {
  background: #4b5563;
}

.share-btn:hover {
  transform: scale(1.1);
}

.share-btn.twitter:hover {
  background: #1da1f2;
}

.share-btn.linkedin:hover {
  background: #0077b5;
}

.share-btn.copy:hover {
  background: #10b981;
}

/* Responsive Design */
@media (max-width: 768px) {
  .news-detail-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .news-detail-modal {
    max-width: 100%;
    max-height: 95vh;
    border-radius: 20px 20px 0 0;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .article-content {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .article-summary {
    padding: 1rem;
  }

  .summary-text {
    font-size: 1rem;
  }

  .paragraph {
    font-size: 1rem;
  }

  .share-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
