<script setup>
import { ref, computed, onMounted } from "vue";

// User profile data
const userProfile = ref({
  name: "경제 학습자",
  email: "user@example.com",
  level: 1,
  totalPoints: 0,
  joinDate: "2024-01-15",
  streak: 0,
  achievements: [],
  stats: {
    quizzesTaken: 0,
    correctAnswers: 0,
    averageScore: 0,
    newsRead: 0,
    termsBookmarked: 0,
    favoriteCategory: "통화정책",
  },
  preferences: {
    notifications: true,
    darkMode: false,
    difficulty: "medium",
  },
});

// Activity history
const activityHistory = ref([
  {
    date: "2024-03-15",
    type: "quiz",
    description: "중급 퀴즈 완료",
    points: 80,
  },
  {
    date: "2024-03-14",
    type: "news",
    description: "금융 뉴스 5개 읽음",
    points: 25,
  },
  {
    date: "2024-03-13",
    type: "terms",
    description: "경제용어 3개 북마크",
    points: 15,
  },
]);

// Achievements data
const availableAchievements = [
  {
    id: 1,
    name: "첫 걸음",
    description: "첫 퀴즈 완료",
    icon: "🏆",
    unlocked: true,
  },
  {
    id: 2,
    name: "학습자",
    description: "퀴즈 10개 완료",
    icon: "📚",
    unlocked: false,
    requirement: 10,
  },
  {
    id: 3,
    name: "전문가",
    description: "퀴즈 50개 완료",
    icon: "🎓",
    unlocked: false,
    requirement: 50,
  },
  {
    id: 4,
    name: "뉴스 마니아",
    description: "뉴스 100개 읽음",
    icon: "📰",
    unlocked: false,
    requirement: 100,
  },
  {
    id: 5,
    name: "연속 학습",
    description: "7일 연속 학습",
    icon: "🔥",
    unlocked: false,
    requirement: 7,
  },
];

// Computed properties
const levelProgress = computed(() => {
  const pointsForCurrentLevel = (userProfile.value.level - 1) * 100;
  const pointsForNextLevel = userProfile.value.level * 100;
  const currentProgress = userProfile.value.totalPoints - pointsForCurrentLevel;
  const progressPercentage = (currentProgress / 100) * 100;
  return {
    current: currentProgress,
    needed: 100 - currentProgress,
    percentage: Math.max(0, Math.min(100, progressPercentage)),
  };
});

const accuracyRate = computed(() => {
  if (userProfile.value.stats.quizzesTaken === 0) return 0;
  return Math.round(
    (userProfile.value.stats.correctAnswers /
      userProfile.value.stats.quizzesTaken) *
      100,
  );
});

const daysSinceJoin = computed(() => {
  const joinDate = new Date(userProfile.value.joinDate);
  const today = new Date();
  const diffTime = Math.abs(today - joinDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Methods
const loadUserProfile = () => {
  const savedProfile = localStorage.getItem("quizUserProfile");
  const savedStats = localStorage.getItem("quizDailyStats");
  const savedBookmarks = localStorage.getItem("economicTermsBookmarks");

  if (savedProfile) {
    const parsed = JSON.parse(savedProfile);
    userProfile.value = { ...userProfile.value, ...parsed };
  }

  if (savedStats) {
    const stats = JSON.parse(savedStats);
    userProfile.value.stats.correctAnswers = stats.totalCorrect || 0;
    userProfile.value.stats.quizzesTaken = stats.totalAttempted || 0;
    userProfile.value.stats.averageScore =
      stats.totalAttempted > 0
        ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100)
        : 0;
  }

  if (savedBookmarks) {
    const bookmarks = JSON.parse(savedBookmarks);
    userProfile.value.stats.termsBookmarked = bookmarks.length;
  }
};

const saveUserProfile = () => {
  localStorage.setItem("userProfile", JSON.stringify(userProfile.value));
};

const updatePreference = (key, value) => {
  userProfile.value.preferences[key] = value;
  saveUserProfile();

  if (key === "darkMode") {
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("globalDarkMode", value);
  }
};

const exportData = () => {
  const dataToExport = {
    profile: userProfile.value,
    exportDate: new Date().toISOString(),
    version: "1.0",
  };

  const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `profile-${userProfile.value.name}-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const resetProgress = () => {
  if (
    confirm(
      "정말로 모든 진행상황을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    )
  ) {
    localStorage.removeItem("quizUserProfile");
    localStorage.removeItem("quizDailyStats");
    localStorage.removeItem("economicTermsBookmarks");
    userProfile.value = {
      name: "경제 학습자",
      email: "user@example.com",
      level: 1,
      totalPoints: 0,
      joinDate: new Date().toISOString().split("T")[0],
      streak: 0,
      achievements: [],
      stats: {
        quizzesTaken: 0,
        correctAnswers: 0,
        averageScore: 0,
        newsRead: 0,
        termsBookmarked: 0,
        favoriteCategory: "통화정책",
      },
      preferences: {
        notifications: true,
        darkMode: false,
        difficulty: "medium",
      },
    };
    alert("진행상황이 초기화되었습니다.");
  }
};

// Lifecycle
onMounted(() => {
  loadUserProfile();
});
</script>

<template>
  <div class="user-profile">
    <!-- Header -->
    <header class="profile-header">
      <div class="header-content">
        <div class="profile-avatar">
          <div class="avatar-circle">
            <span class="avatar-text">{{ userProfile.name.charAt(0) }}</span>
          </div>
          <div class="level-badge">Lv.{{ userProfile.level }}</div>
        </div>

        <div class="profile-info">
          <h1 class="profile-name">{{ userProfile.name }}</h1>
          <p class="profile-email">{{ userProfile.email }}</p>
          <div class="profile-meta">
            <span class="join-date">📅 {{ daysSinceJoin }}일째 학습 중</span>
            <span class="streak">🔥 {{ userProfile.streak }}일 연속</span>
          </div>
        </div>

        <div class="profile-actions">
          <button @click="exportData" class="action-btn export">
            <span class="btn-icon">📥</span>
            <span>데이터 내보내기</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Progress Section -->
    <section class="progress-section">
      <div class="section-content">
        <h2 class="section-title">📊 학습 진행도</h2>

        <div class="progress-cards">
          <!-- Level Progress -->
          <div class="progress-card">
            <div class="card-header">
              <h3 class="card-title">레벨 진행도</h3>
              <span class="card-value">{{ userProfile.totalPoints }}P</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${levelProgress.percentage}%` }"
                ></div>
              </div>
              <div class="progress-text">
                다음 레벨까지 {{ levelProgress.needed }}P
              </div>
            </div>
          </div>

          <!-- Quiz Stats -->
          <div class="progress-card">
            <div class="card-header">
              <h3 class="card-title">퀴즈 통계</h3>
              <span class="card-value">{{ accuracyRate }}%</span>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{
                  userProfile.stats.quizzesTaken
                }}</span>
                <span class="stat-label">참여</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{
                  userProfile.stats.correctAnswers
                }}</span>
                <span class="stat-label">정답</span>
              </div>
            </div>
          </div>

          <!-- Activity Stats -->
          <div class="progress-card">
            <div class="card-header">
              <h3 class="card-title">활동 통계</h3>
              <span class="card-value">{{
                userProfile.stats.newsRead + userProfile.stats.termsBookmarked
              }}</span>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{
                  userProfile.stats.newsRead
                }}</span>
                <span class="stat-label">뉴스</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{
                  userProfile.stats.termsBookmarked
                }}</span>
                <span class="stat-label">용어</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements-section">
      <div class="section-content">
        <h2 class="section-title">🏆 업적</h2>

        <div class="achievements-grid">
          <div
            v-for="achievement in availableAchievements"
            :key="achievement.id"
            class="achievement-card"
            :class="{ unlocked: achievement.unlocked }"
          >
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-content">
              <h3 class="achievement-name">{{ achievement.name }}</h3>
              <p class="achievement-description">
                {{ achievement.description }}
              </p>
              <div
                v-if="!achievement.unlocked && achievement.requirement"
                class="achievement-progress"
              >
                목표: {{ achievement.requirement }}
              </div>
            </div>
            <div v-if="achievement.unlocked" class="achievement-badge">
              완료
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activity History -->
    <section class="activity-section">
      <div class="section-content">
        <h2 class="section-title">📈 최근 활동</h2>

        <div class="activity-list">
          <div
            v-for="(activity, index) in activityHistory"
            :key="index"
            class="activity-item"
          >
            <div class="activity-icon">
              {{
                activity.type === "quiz"
                  ? "🧠"
                  : activity.type === "news"
                    ? "📰"
                    : "📚"
              }}
            </div>
            <div class="activity-content">
              <p class="activity-description">{{ activity.description }}</p>
              <span class="activity-date">{{ activity.date }}</span>
            </div>
            <div class="activity-points">+{{ activity.points }}P</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Settings Section -->
    <section class="settings-section">
      <div class="section-content">
        <h2 class="section-title">⚙️ 설정</h2>

        <div class="settings-grid">
          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">알림</h3>
              <p class="setting-description">학습 알림을 받습니다</p>
            </div>
            <button
              @click="
                updatePreference(
                  'notifications',
                  !userProfile.preferences.notifications,
                )
              "
              class="toggle-btn"
              :class="{ active: userProfile.preferences.notifications }"
            >
              <span class="toggle-slider"></span>
            </button>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">다크 모드</h3>
              <p class="setting-description">어두운 테마를 사용합니다</p>
            </div>
            <button
              @click="
                updatePreference('darkMode', !userProfile.preferences.darkMode)
              "
              class="toggle-btn"
              :class="{ active: userProfile.preferences.darkMode }"
            >
              <span class="toggle-slider"></span>
            </button>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3 class="setting-title">기본 난이도</h3>
              <p class="setting-description">퀴즈 기본 난이도를 설정합니다</p>
            </div>
            <select
              v-model="userProfile.preferences.difficulty"
              @change="updatePreference('difficulty', $event.target.value)"
              class="difficulty-select"
            >
              <option value="easy">초급</option>
              <option value="medium">중급</option>
              <option value="hard">고급</option>
            </select>
          </div>
        </div>

        <div class="danger-zone">
          <h3 class="danger-title">⚠️ 위험 구역</h3>
          <button @click="resetProgress" class="danger-btn">
            모든 진행상황 초기화
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.user-profile {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1a202c;
  transition: all 0.3s ease;
}

:root.dark .user-profile {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f1f5f9;
}

/* Header */
.profile-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  position: relative;
}

:root.dark .profile-header {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.profile-header::before {
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
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.profile-avatar {
  position: relative;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.avatar-text {
  font-size: 2rem;
  font-weight: 800;
  color: white;
}

.level-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 3px solid white;
}

:root.dark .level-badge {
  border-color: #0f172a;
}

.profile-info {
  flex: 1;
  min-width: 200px;
}

.profile-name {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 800;
  color: #1a202c;
}

:root.dark .profile-name {
  color: #f1f5f9;
}

.profile-email {
  margin: 0 0 1rem 0;
  color: #64748b;
  font-size: 1.1rem;
}

:root.dark .profile-email {
  color: #94a3b8;
}

.profile-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.join-date,
.streak {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

:root.dark .action-btn {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.action-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.export {
  color: #3b82f6;
}

/* Sections */
.progress-section,
.achievements-section,
.activity-section,
.settings-section {
  padding: 2rem 1rem;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Progress Cards */
.progress-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.progress-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

:root.dark .progress-card {
  background: #1e293b;
  border-color: #334155;
}

.progress-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
}

:root.dark .card-title {
  color: #f1f5f9;
}

.card-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
}

.progress-bar-container {
  margin-top: 1rem;
}

.progress-bar {
  background: #e2e8f0;
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
}

:root.dark .progress-bar {
  background: #334155;
}

.progress-fill {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  transition: width 0.5s ease;
}

.progress-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

:root.dark .progress-text {
  color: #94a3b8;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
}

.stat-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

:root.dark .stat-label {
  color: #94a3b8;
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.achievement-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  opacity: 0.6;
  position: relative;
}

:root.dark .achievement-card {
  background: #1e293b;
  border-color: #334155;
}

.achievement-card.unlocked {
  opacity: 1;
  border-color: #10b981;
}

.achievement-card.unlocked:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
}

.achievement-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.achievement-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #374151;
}

:root.dark .achievement-name {
  color: #f1f5f9;
}

.achievement-description {
  margin: 0 0 1rem 0;
  color: #64748b;
  font-size: 0.9rem;
}

:root.dark .achievement-description {
  color: #94a3b8;
}

.achievement-progress {
  font-size: 0.8rem;
  color: #94a3b8;
  font-style: italic;
}

.achievement-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
}

/* Activity */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

:root.dark .activity-item {
  background: #1e293b;
  border-color: #334155;
}

.activity-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.activity-content {
  flex: 1;
}

.activity-description {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #374151;
}

:root.dark .activity-description {
  color: #f1f5f9;
}

.activity-date {
  font-size: 0.8rem;
  color: #64748b;
}

:root.dark .activity-date {
  color: #94a3b8;
}

.activity-points {
  font-weight: 700;
  color: #10b981;
  font-size: 1.1rem;
}

/* Settings */
.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.setting-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

:root.dark .setting-item {
  background: #1e293b;
  border-color: #334155;
}

.setting-info {
  flex: 1;
}

.setting-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

:root.dark .setting-title {
  color: #f1f5f9;
}

.setting-description {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

:root.dark .setting-description {
  color: #94a3b8;
}

.toggle-btn {
  width: 50px;
  height: 24px;
  background: #e2e8f0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

:root.dark .toggle-btn {
  background: #334155;
}

.toggle-btn.active {
  background: #667eea;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-btn.active .toggle-slider {
  transform: translateX(26px);
}

.difficulty-select {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

:root.dark .difficulty-select {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.difficulty-select:focus {
  outline: none;
  border-color: #667eea;
}

/* Danger Zone */
.danger-zone {
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

:root.dark .danger-zone {
  background: #7f1d1d;
  border-color: #b91c1c;
}

.danger-title {
  margin: 0 0 1rem 0;
  color: #dc2626;
  font-size: 1.2rem;
  font-weight: 700;
}

.danger-btn {
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.danger-btn:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-meta {
    justify-content: center;
  }

  .progress-cards {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .setting-item {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.5rem 1rem;
  }

  .progress-section,
  .achievements-section,
  .activity-section,
  .settings-section {
    padding: 1.5rem 1rem;
  }

  .progress-card {
    padding: 1.5rem;
  }

  .activity-item {
    padding: 1rem;
  }
}
</style>
