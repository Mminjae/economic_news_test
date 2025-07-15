<script setup>
import { ref, computed, onMounted } from "vue";

// Quiz difficulty levels
const difficultyLevels = [
  {
    id: "easy",
    label: "초급",
    icon: "🌱",
    color: "#10b981",
    description: "기본적인 경제 개념",
    points: 5,
  },
  {
    id: "medium",
    label: "중급",
    icon: "🔥",
    color: "#f59e0b",
    description: "응용 경제 지식",
    points: 10,
  },
  {
    id: "hard",
    label: "고급",
    icon: "💎",
    color: "#ef4444",
    description: "전문적인 경제 이론",
    points: 20,
  },
];

// Quiz questions by difficulty
const quizQuestions = {
  easy: [
    {
      id: 1,
      question: "다음 중 인플레이션을 나타내는 지표는?",
      options: ["GDP", "소비자물가지수(CPI)", "실업률", "환율"],
      correct: 1,
      explanation:
        "소비자물가지수(CPI)는 소비자가 구입하는 재화와 서비스의 가격 변동을 측정하여 인플레이션을 나타내는 대표적인 지표입니다.",
    },
    {
      id: 2,
      question: "한국은행의 주요 역할이 아닌 것은?",
      options: ["통화정책 수행", "기준금리 결정", "주식 거래", "화폐 발행"],
      correct: 2,
      explanation:
        "한국은행은 통화정책, 기준금리 결정, 화폐 발행 등의 업무를 담당하지만 주식 거래는 하지 않습니다.",
    },
    {
      id: 3,
      question: "GDP는 무엇의 약자인가요?",
      options: [
        "General Domestic Product",
        "Gross Domestic Product",
        "Global Development Plan",
        "Government Development Policy",
      ],
      correct: 1,
      explanation:
        "GDP는 Gross Domestic Product의 약자로, 국���총생산을 의미합니다.",
    },
  ],
  medium: [
    {
      id: 4,
      question: "양적완화(QE) 정책의 주요 목적은?",
      options: [
        "인플레이션 억제",
        "유동성 공급 확대",
        "환율 상승",
        "국가부채 감소",
      ],
      correct: 1,
      explanation:
        "양적완화는 중앙은행이 국채 등을 대량 매입하여 시중에 유동성을 공급하는 정책으로, 경기 부양을 목적으로 합니다.",
    },
    {
      id: 5,
      question: "필립스 곡선이 나타내��� 관계는?",
      options: [
        "GDP와 인플레이션",
        "실업률과 인플레이션",
        "금리와 환율",
        "수출과 수입",
      ],
      correct: 1,
      explanation:
        "필립스 곡선은 실업률과 인플레이션 사이의 역상관 관계를 나타내는 경제학 이론입니다.",
    },
    {
      id: 6,
      question: "ESG 투자에서 G는 무엇을 의미하는가?",
      options: [
        "Growth (성장)",
        "Global (글로벌)",
        "Governance (지배구조)",
        "Green (친환경)",
      ],
      correct: 2,
      explanation:
        "ESG는 Environmental(환경), Social(사회), Governance(지배��조)의 약자로, G는 기업의 지배구조를 의미합니다.",
    },
  ],
  hard: [
    {
      id: 7,
      question: "테일러 준칙에서 중앙은행이 고려하는 주요 변수는?",
      options: [
        "GDP와 환율",
        "인플레이션과 산출갭",
        "실업률과 금리",
        "수출과 투자",
      ],
      correct: 1,
      explanation:
        "테일러 준칙은 중앙은행이 기준금리를 설정할 때 인플레이션율과 산출갭(실제GDP와 잠재GDP의 차이)을 고려하는 통화정책 준칙입니다.",
    },
    {
      id: 8,
      question: "리카도의 비교우위론에 따른 무역의 이익은?",
      options: [
        "절대우위가 있는 재화만 수출",
        "기회비��이 낮은 재화에 특화",
        "모든 재화를 균등하게 생산",
        "자급자족이 최선",
      ],
      correct: 1,
      explanation:
        "리카도의 비교우위론에 따르면, 각국이 기회비용이 상대적으로 낮은 재화 생산에 특화하여 무역하면 모든 국가가 이익을 얻을 수 있습니다.",
    },
    {
      id: 9,
      question: "CAPM 모델에서 베타(β)가 의미하는 것은?",
      options: [
        "절대수익률",
        "���장 위험 대비 민감도",
        "무위험 수익률",
        "배당수익률",
      ],
      correct: 1,
      explanation:
        "CAPM에서 베타는 개별 자산의 수익률이 시장 전체 수익률 변화에 얼마나 민감하게 반응하는지를 나타내는 지표입니다.",
    },
  ],
};

// Reactive state
const selectedDifficulty = ref(null);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref([]);
const showResult = ref(false);
const isSubmitted = ref(false);
const gameStarted = ref(false);
const showProfile = ref(false);

// Daily stats (stored in localStorage)
const dailyStats = ref({
  date: new Date().toDateString(),
  easy: { attempted: 0, correct: 0, points: 0 },
  medium: { attempted: 0, correct: 0, points: 0 },
  hard: { attempted: 0, correct: 0, points: 0 },
  totalPoints: 0,
  totalCorrect: 0,
  totalAttempted: 0,
});

// User profile data
const userProfile = ref({
  name: "경제 학습자",
  level: 1,
  totalPoints: 0,
  achievements: [],
  streak: 0,
});

// Computed properties
const currentQuestions = computed(() => {
  return selectedDifficulty.value
    ? quizQuestions[selectedDifficulty.value.id]
    : [];
});

const currentQuestion = computed(() => {
  return currentQuestions.value[currentQuestionIndex.value];
});

const progressPercentage = computed(() => {
  return (
    ((currentQuestionIndex.value + 1) / currentQuestions.value.length) * 100
  );
});

const totalDailyPoints = computed(() => {
  return (
    dailyStats.value.easy.points +
    dailyStats.value.medium.points +
    dailyStats.value.hard.points
  );
});

const overallAccuracy = computed(() => {
  if (dailyStats.value.totalAttempted === 0) return 0;
  return Math.round(
    (dailyStats.value.totalCorrect / dailyStats.value.totalAttempted) * 100,
  );
});

const currentDifficultyStats = computed(() => {
  if (!selectedDifficulty.value) return null;
  return dailyStats.value[selectedDifficulty.value.id];
});

// Methods
const selectDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty;
  resetQuiz();
};

const startQuiz = () => {
  if (!selectedDifficulty.value) return;
  gameStarted.value = true;
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  showResult.value = false;
  selectedAnswer.value = null;
  isSubmitted.value = false;
};

const selectAnswer = (optionIndex) => {
  if (isSubmitted.value) return;
  selectedAnswer.value = optionIndex;
};

const submitAnswer = () => {
  if (selectedAnswer.value === null || isSubmitted.value) return;

  const isCorrect = selectedAnswer.value === currentQuestion.value.correct;

  userAnswers.value.push({
    questionId: currentQuestion.value.id,
    selectedAnswer: selectedAnswer.value,
    correct: isCorrect,
    explanation: currentQuestion.value.explanation,
  });

  // Update daily stats
  updateDailyStats(isCorrect);

  isSubmitted.value = true;

  // Auto advance after 2 seconds
  setTimeout(() => {
    nextQuestion();
  }, 2000);
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < currentQuestions.value.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    isSubmitted.value = false;
  } else {
    finishQuiz();
  }
};

const finishQuiz = () => {
  showResult.value = true;
  saveDailyStats();
  updateUserProfile();
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  userAnswers.value = [];
  showResult.value = false;
  isSubmitted.value = false;
  gameStarted.value = false;
};

const backToSelection = () => {
  selectedDifficulty.value = null;
  resetQuiz();
};

const updateDailyStats = (isCorrect) => {
  const diffId = selectedDifficulty.value.id;
  const points = isCorrect ? selectedDifficulty.value.points : 0;

  dailyStats.value[diffId].attempted++;
  dailyStats.value.totalAttempted++;

  if (isCorrect) {
    dailyStats.value[diffId].correct++;
    dailyStats.value[diffId].points += points;
    dailyStats.value.totalCorrect++;
    dailyStats.value.totalPoints += points;
  }
};

const updateUserProfile = () => {
  const correctAnswers = userAnswers.value.filter(
    (answer) => answer.correct,
  ).length;
  const earnedPoints = correctAnswers * selectedDifficulty.value.points;

  userProfile.value.totalPoints += earnedPoints;

  // Calculate level based on total points
  userProfile.value.level = Math.floor(userProfile.value.totalPoints / 100) + 1;

  saveUserProfile();
};

const saveDailyStats = () => {
  localStorage.setItem("quizDailyStats", JSON.stringify(dailyStats.value));
};

const loadDailyStats = () => {
  const saved = localStorage.getItem("quizDailyStats");
  if (saved) {
    const parsed = JSON.parse(saved);
    // Check if it's the same day
    if (parsed.date === new Date().toDateString()) {
      dailyStats.value = parsed;
    } else {
      // Reset for new day
      resetDailyStats();
    }
  }
};

const resetDailyStats = () => {
  dailyStats.value = {
    date: new Date().toDateString(),
    easy: { attempted: 0, correct: 0, points: 0 },
    medium: { attempted: 0, correct: 0, points: 0 },
    hard: { attempted: 0, correct: 0, points: 0 },
    totalPoints: 0,
    totalCorrect: 0,
    totalAttempted: 0,
  };
  saveDailyStats();
};

const saveUserProfile = () => {
  localStorage.setItem("quizUserProfile", JSON.stringify(userProfile.value));
};

const loadUserProfile = () => {
  const saved = localStorage.getItem("quizUserProfile");
  if (saved) {
    userProfile.value = JSON.parse(saved);
  }
};

const emit = defineEmits(["navigate"]);

const showProfile = () => {
  emit("navigate", "profile");
};

// Lifecycle
onMounted(() => {
  loadDailyStats();
  loadUserProfile();
});
</script>

<template>
  <div class="economic-quiz">
    <!-- Daily Dashboard -->
    <section class="dashboard">
      <div class="dashboard-header">
        <h2 class="dashboard-title">📊 오늘의 퀴즈 현황</h2>
        <button @click="showProfile = !showProfile" class="profile-toggle-btn">
          <span class="profile-icon">👤</span>
          <span class="profile-text">프로필</span>
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card total-points">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <div class="stat-number">{{ totalDailyPoints }}</div>
            <div class="stat-label">적립 포인��</div>
          </div>
        </div>

        <div class="stat-card total-correct">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-number">{{ dailyStats.totalCorrect }}</div>
            <div class="stat-label">정답 개수</div>
          </div>
        </div>

        <div class="stat-card accuracy">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <div class="stat-number">{{ overallAccuracy }}%</div>
            <div class="stat-label">정답률</div>
          </div>
        </div>
      </div>

      <!-- Profile Section -->
      <div v-if="showProfile" class="profile-section">
        <div class="profile-header">
          <h3 class="profile-title">📈 총 누적 현황</h3>
          <button @click="showProfile = false" class="close-profile-btn">
            ✕
          </button>
        </div>

        <div class="profile-content">
          <div class="profile-stats">
            <div class="profile-stat-card">
              <div class="profile-stat-icon">🏆</div>
              <div class="profile-stat-info">
                <div class="profile-stat-value">{{ userProfile.level }}</div>
                <div class="profile-stat-label">레벨</div>
              </div>
            </div>

            <div class="profile-stat-card">
              <div class="profile-stat-icon">💰</div>
              <div class="profile-stat-info">
                <div class="profile-stat-value">
                  {{ userProfile.totalPoints }}
                </div>
                <div class="profile-stat-label">총 포인트</div>
              </div>
            </div>

            <div class="profile-stat-card">
              <div class="profile-stat-icon">🔥</div>
              <div class="profile-stat-info">
                <div class="profile-stat-value">{{ userProfile.streak }}</div>
                <div class="profile-stat-label">연속 도전</div>
              </div>
            </div>
          </div>

          <div class="difficulty-breakdown">
            <h4 class="breakdown-title">난이도별 성과</h4>
            <div class="breakdown-grid">
              <div
                v-for="difficulty in difficultyLevels"
                :key="difficulty.id"
                class="breakdown-item"
              >
                <div class="breakdown-header">
                  <span class="breakdown-icon">{{ difficulty.icon }}</span>
                  <span class="breakdown-name">{{ difficulty.label }}</span>
                </div>
                <div class="breakdown-stats">
                  <div class="breakdown-stat">
                    <span class="breakdown-stat-label">오늘</span>
                    <span class="breakdown-stat-value">
                      {{ dailyStats[difficulty.id]?.correct || 0 }}/{{
                        dailyStats[difficulty.id]?.attempted || 0
                      }}
                    </span>
                  </div>
                  <div class="breakdown-stat">
                    <span class="breakdown-stat-label">포인트</span>
                    <span class="breakdown-stat-value">{{
                      dailyStats[difficulty.id]?.points || 0
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="today-summary">
            <h4 class="summary-title">오늘의 요약</h4>
            <div class="summary-content">
              <div class="summary-item">
                <span class="summary-label">총 시도</span>
                <span class="summary-value"
                  >{{ dailyStats.totalAttempted }}문제</span
                >
              </div>
              <div class="summary-item">
                <span class="summary-label">정답률</span>
                <span class="summary-value">{{ overallAccuracy }}%</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">획득 포인트</span>
                <span class="summary-value">{{ totalDailyPoints }}점</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Difficulty Selection -->
    <section v-if="!selectedDifficulty" class="difficulty-selection">
      <div class="selection-header">
        <h1 class="page-title">🧠 경제 퀴즈</h1>
        <p class="page-subtitle">난이도를 선택하여 퀴즈를 시작하세요!</p>
      </div>

      <div class="difficulty-grid">
        <button
          v-for="difficulty in difficultyLevels"
          :key="difficulty.id"
          @click="selectDifficulty(difficulty)"
          class="difficulty-card"
          :style="{ '--difficulty-color': difficulty.color }"
        >
          <div class="difficulty-icon">{{ difficulty.icon }}</div>
          <div class="difficulty-content">
            <h3 class="difficulty-name">{{ difficulty.label }}</h3>
            <p class="difficulty-description">{{ difficulty.description }}</p>
            <div class="difficulty-points">{{ difficulty.points }} 포인트</div>
          </div>
          <div
            class="difficulty-stats"
            v-if="dailyStats[difficulty.id].attempted > 0"
          >
            <div class="mini-stat">
              정답: {{ dailyStats[difficulty.id].correct }}/{{
                dailyStats[difficulty.id].attempted
              }}
            </div>
            <div class="mini-stat">
              포인트: {{ dailyStats[difficulty.id].points }}
            </div>
          </div>
        </button>
      </div>
    </section>

    <!-- Quiz Game -->
    <section v-else-if="!showResult" class="quiz-game">
      <!-- Quiz Header -->
      <div class="quiz-header">
        <button @click="backToSelection" class="back-btn">← 난이도 선택</button>
        <div class="quiz-info">
          <span
            class="difficulty-badge"
            :style="{ backgroundColor: selectedDifficulty.color }"
          >
            {{ selectedDifficulty.icon }} {{ selectedDifficulty.label }}
          </span>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-info">
          <span class="question-counter"
            >{{ currentQuestionIndex + 1 }} /
            {{ currentQuestions.length }}</span
          >
          <span class="points-info"
            >{{ selectedDifficulty.points }} 포인트</span
          >
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Start Screen -->
      <div v-if="!gameStarted" class="start-screen">
        <div class="start-card">
          <h2>{{ selectedDifficulty.label }} 퀴즈 준비</h2>
          <p>{{ currentQuestions.length }}개의 문제가 준비되어 있습니다.</p>
          <p>
            각 정답마다
            <strong>{{ selectedDifficulty.points }} 포인트</strong>를 획득할 수
            있습니다.
          </p>
          <button @click="startQuiz" class="start-btn">
            <span>퀴즈 시작하기</span>
            <span class="btn-icon">🚀</span>
          </button>
        </div>
      </div>

      <!-- Quiz Card -->
      <div v-else class="quiz-card">
        <div class="question-header">
          <div class="question-badge">Q{{ currentQuestionIndex + 1 }}</div>
          <h2 class="question-text">{{ currentQuestion.question }}</h2>
        </div>

        <div class="options-container">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            class="option-btn"
            :class="{
              selected: selectedAnswer === index,
              correct: isSubmitted && index === currentQuestion.correct,
              incorrect:
                isSubmitted &&
                selectedAnswer === index &&
                index !== currentQuestion.correct,
              disabled: isSubmitted,
            }"
            :disabled="isSubmitted"
          >
            <span class="option-letter">{{
              String.fromCharCode(65 + index)
            }}</span>
            <span class="option-text">{{ option }}</span>
            <span
              v-if="isSubmitted && index === currentQuestion.correct"
              class="correct-mark"
              >✓</span
            >
            <span
              v-if="
                isSubmitted &&
                selectedAnswer === index &&
                index !== currentQuestion.correct
              "
              class="incorrect-mark"
              >✗</span
            >
          </button>
        </div>

        <!-- Explanation (shown after submission) -->
        <div v-if="isSubmitted" class="explanation-section">
          <div class="explanation-header">
            <span class="explanation-icon">💡</span>
            <h3>해설</h3>
          </div>
          <p class="explanation-text">{{ currentQuestion.explanation }}</p>
        </div>

        <!-- Submit Button -->
        <div class="question-footer">
          <button
            v-if="!isSubmitted"
            @click="submitAnswer"
            :disabled="selectedAnswer === null"
            class="submit-btn"
          >
            <span>제출하기</span>
            <span class="btn-icon">📝</span>
          </button>
          <button v-else @click="nextQuestion" class="next-btn">
            <span>{{
              currentQuestionIndex === currentQuestions.length - 1
                ? "결과 확인"
                : "다음 문제"
            }}</span>
            <span class="btn-icon">{{
              currentQuestionIndex === currentQuestions.length - 1 ? "🎯" : "→"
            }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section v-else class="results-section">
      <div class="results-card">
        <div class="results-header">
          <div class="results-icon">🎉</div>
          <h2 class="results-title">퀴즈 완료!</h2>

          <div class="results-stats">
            <div class="result-stat">
              <div class="result-number">
                {{ userAnswers.filter((a) => a.correct).length }}
              </div>
              <div class="result-label">정답</div>
            </div>
            <div class="result-stat">
              <div class="result-number">
                {{
                  userAnswers.filter((a) => a.correct).length *
                  selectedDifficulty.points
                }}
              </div>
              <div class="result-label">획득 포인트</div>
            </div>
            <div class="result-stat">
              <div class="result-number">
                {{
                  Math.round(
                    (userAnswers.filter((a) => a.correct).length /
                      userAnswers.length) *
                      100,
                  )
                }}%
              </div>
              <div class="result-label">정답률</div>
            </div>
          </div>
        </div>

        <div class="results-actions">
          <button @click="startQuiz" class="retry-btn">
            <span>다시 도전</span>
            <span class="btn-icon">🔄</span>
          </button>
          <button @click="backToSelection" class="back-btn">
            <span>난이도 선택</span>
            <span class="btn-icon">📚</span>
          </button>
        </div>
      </div>
    </section>

    <!-- My Profile Button -->
    <div class="profile-section">
      <button @click="showProfile" class="profile-btn">
        <span class="profile-icon">👤</span>
        <span class="profile-text">마이 프로필</span>
        <div class="profile-info">
          <div class="profile-level">Lv.{{ userProfile.level }}</div>
          <div class="profile-points">{{ userProfile.totalPoints }}P</div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.economic-quiz {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%);
  color: #1a202c;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 6rem;
}

:root.dark .economic-quiz {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e2e8f0;
}

/* Dashboard */
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dashboard-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

:root.dark .stat-card {
  background: #1e293b;
  border-color: #334155;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.total-points {
  border-color: #10b981;
}

.total-correct {
  border-color: #3b82f6;
}

.accuracy {
  border-color: #f59e0b;
}

.stat-icon {
  font-size: 2rem;
  width: 48px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #1a202c;
}

:root.dark .stat-number {
  color: #f1f5f9;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

:root.dark .stat-label {
  color: #94a3b8;
}

/* Difficulty Selection */
.difficulty-selection {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.selection-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  margin: 0 0 1rem 0;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0;
  font-size: 1.2rem;
  color: #64748b;
}

:root.dark .page-subtitle {
  color: #94a3b8;
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.difficulty-card {
  background: white;
  border: 3px solid var(--difficulty-color);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

:root.dark .difficulty-card {
  background: #1e293b;
}

.difficulty-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.difficulty-card:hover::before {
  left: 100%;
}

.difficulty-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  border-color: var(--difficulty-color);
}

.difficulty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.difficulty-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--difficulty-color);
}

.difficulty-description {
  margin: 0 0 1rem 0;
  color: #64748b;
  font-size: 1rem;
}

:root.dark .difficulty-description {
  color: #94a3b8;
}

.difficulty-points {
  background: var(--difficulty-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.difficulty-stats {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  margin-top: 1rem;
}

:root.dark .difficulty-stats {
  border-top-color: #334155;
}

.mini-stat {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0.25rem 0;
}

:root.dark .mini-stat {
  color: #94a3b8;
}

/* Quiz Game */
.quiz-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-btn {
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #64748b;
}

:root.dark .back-btn {
  background: #334155;
  border-color: #475569;
  color: #94a3b8;
}

.back-btn:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

:root.dark .back-btn:hover {
  background: #475569;
  border-color: #64748b;
}

.difficulty-badge {
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
}

/* Progress */
.progress-section {
  margin-bottom: 2rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

.question-counter {
  color: #ea580c;
  font-size: 1.1rem;
}

.points-info {
  color: #10b981;
  font-size: 1rem;
}

.progress-bar {
  background: rgba(234, 88, 12, 0.1);
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #ea580c 0%, #f59e0b 100%);
  height: 100%;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Start Screen */
.start-screen {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.start-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

:root.dark .start-card {
  background: #1e293b;
}

.start-card h2 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #1a202c;
}

:root.dark .start-card h2 {
  color: #f1f5f9;
}

.start-card p {
  margin: 0 0 1rem 0;
  color: #64748b;
  font-size: 1.1rem;
}

:root.dark .start-card p {
  color: #94a3b8;
}

.start-btn {
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
}

/* Quiz Card */
.quiz-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(234, 88, 12, 0.1);
}

:root.dark .quiz-card {
  background: #1e293b;
  border-color: rgba(234, 88, 12, 0.2);
}

.question-header {
  margin-bottom: 2rem;
}

.question-badge {
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1a202c;
  line-height: 1.4;
}

:root.dark .question-text {
  color: #f1f5f9;
}

/* Options */
.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-btn {
  background: #fef3e2;
  border: 2px solid #fed7aa;
  padding: 1.25rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

:root.dark .option-btn {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

.option-btn:hover:not(.disabled) {
  border-color: #ea580c;
  background: #fed7aa;
  transform: translateY(-2px);
}

:root.dark .option-btn:hover:not(.disabled) {
  background: #475569;
}

.option-btn.selected {
  background: #ea580c;
  color: white;
  border-color: #ea580c;
}

.option-btn.correct {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.option-btn.incorrect {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.option-btn.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-letter {
  background: rgba(234, 88, 12, 0.2);
  color: #ea580c;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.option-btn.selected .option-letter,
.option-btn.correct .option-letter,
.option-btn.incorrect .option-letter {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.option-text {
  flex: 1;
  font-weight: 500;
}

.correct-mark,
.incorrect-mark {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Explanation */
.explanation-section {
  background: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
  margin-bottom: 2rem;
}

:root.dark .explanation-section {
  background: #0f172a;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.explanation-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #3b82f6;
}

.explanation-text {
  margin: 0;
  line-height: 1.6;
  color: #374151;
}

:root.dark .explanation-text {
  color: #cbd5e1;
}

/* Question Footer */
.question-footer {
  display: flex;
  justify-content: flex-end;
}

.submit-btn,
.next-btn {
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.submit-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  box-shadow: none;
}

.submit-btn:not(:disabled):hover,
.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
}

/* Results */
.results-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.results-card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

:root.dark .results-card {
  background: #1e293b;
}

.results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.results-title {
  margin: 0 0 2rem 0;
  color: #ea580c;
  font-size: 2.5rem;
  font-weight: 800;
}

.results-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.result-stat {
  text-align: center;
}

.result-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ea580c;
}

.result-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
}

:root.dark .result-label {
  color: #94a3b8;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.retry-btn {
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
}

/* Profile Section */
.profile-section {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.profile-btn {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

:root.dark .profile-btn {
  background: #1e293b;
  border-color: #334155;
}

.profile-btn:hover {
  transform: translateX(-50%) translateY(-4px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  border-color: #ea580c;
}

.profile-icon {
  font-size: 1.5rem;
}

.profile-text {
  font-weight: 600;
  color: #1a202c;
}

:root.dark .profile-text {
  color: #f1f5f9;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.profile-level {
  color: #ea580c;
  font-weight: 700;
}

.profile-points {
  color: #10b981;
  font-weight: 600;
}

.btn-icon {
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .difficulty-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quiz-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .results-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .results-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .quiz-card {
    padding: 2rem;
  }

  .start-card {
    padding: 2rem;
  }

  .question-text {
    font-size: 1.3rem;
  }

  .option-btn {
    padding: 1rem;
  }

  .profile-btn {
    padding: 0.75rem 1.5rem;
  }

  .profile-section {
    bottom: 1rem;
  }
}
</style>
