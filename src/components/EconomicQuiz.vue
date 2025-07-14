<script setup>
import { ref, onMounted } from "vue";

const currentQuestion = ref(0);
const score = ref(0);
const showResult = ref(false);
const selectedAnswer = ref(null);
const isDarkMode = ref(false);
const userAnswers = ref([]);

const questions = ref([
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
    question: "GDP 대비 국가부채 비율이 높다는 것의 의미는?",
    options: [
      "경제가 안정적이다",
      "인플레이션이 높다",
      "재정건전성에 우려가 있다",
      "실업률이 낮다",
    ],
    correct: 2,
    explanation:
      "GDP 대비 국가부채 비율이 높다는 것은 국가의 경제 규모 대비 부채가 많다는 뜻으로, 재정건전성에 대한 우려를 나타냅니다.",
  },
  {
    id: 4,
    question: "양적완화(QE) 정책의 목적은?",
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
    question: "ESG 투자에서 G는 무엇을 의미하는가?",
    options: [
      "Growth (성장)",
      "Global (글로벌)",
      "Governance (지배구조)",
      "Green (친환경)",
    ],
    correct: 2,
    explanation:
      "ESG는 Environmental(환경), Social(사회), Governance(지배구조)의 약자로, G는 기업의 지배구조를 의미합니다.",
  },
]);

const selectAnswer = (index) => {
  selectedAnswer.value = index;
};

const nextQuestion = () => {
  const isCorrect =
    selectedAnswer.value === questions.value[currentQuestion.value].correct;

  userAnswers.value.push({
    questionIndex: currentQuestion.value,
    selectedAnswer: selectedAnswer.value,
    correct: isCorrect,
  });

  if (isCorrect) {
    score.value++;
  }

  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    selectedAnswer.value = null;
  } else {
    showResult.value = true;
  }
};

const resetQuiz = () => {
  currentQuestion.value = 0;
  score.value = 0;
  showResult.value = false;
  selectedAnswer.value = null;
  userAnswers.value = [];
};

const getScoreGrade = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return { grade: "A", color: "#10b981", emoji: "🏆" };
  if (percentage >= 80) return { grade: "B", color: "#3b82f6", emoji: "🎉" };
  if (percentage >= 70) return { grade: "C", color: "#f59e0b", emoji: "👏" };
  if (percentage >= 60) return { grade: "D", color: "#ef4444", emoji: "📚" };
  return { grade: "F", color: "#8b5cf6", emoji: "💪" };
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("quizPageDarkMode", isDarkMode.value);
};

const loadDarkMode = () => {
  const saved = localStorage.getItem("quizPageDarkMode");
  if (saved !== null) {
    isDarkMode.value = JSON.parse(saved);
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }
};

onMounted(() => {
  loadDarkMode();
});
</script>

<template>
  <div class="economic-quiz" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header -->
    <header class="quiz-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">🧠 경제 퀴즈</h1>
          <p class="page-subtitle">
            경제 지식을 테스트하고 실력을 향상시켜보세요!
          </p>
        </div>
        <div class="header-actions">
          <button
            @click="toggleDarkMode"
            class="dark-mode-toggle"
            :title="isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'"
          >
            {{ isDarkMode ? "☀️" : "🌙" }}
          </button>
        </div>
      </div>
    </header>

    <!-- Quiz Content -->
    <main class="quiz-main">
      <div v-if="!showResult" class="quiz-container">
        <!-- Progress Section -->
        <div class="progress-section">
          <div class="progress-info">
            <span class="question-counter"
              >문제 {{ currentQuestion + 1 }} / {{ questions.length }}</span
            >
            <span class="score-counter">현재 점수: {{ score }}</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }"
            ></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="question-card">
          <div class="question-header">
            <div class="question-badge">Q{{ currentQuestion + 1 }}</div>
            <h2 class="question-text">
              {{ questions[currentQuestion].question }}
            </h2>
          </div>

          <div class="options-container">
            <button
              v-for="(option, index) in questions[currentQuestion].options"
              :key="index"
              @click="selectAnswer(index)"
              class="option-btn"
              :class="{
                selected: selectedAnswer === index,
                'option-a': index === 0,
                'option-b': index === 1,
                'option-c': index === 2,
                'option-d': index === 3,
              }"
            >
              <span class="option-letter">{{
                String.fromCharCode(65 + index)
              }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>

          <div class="question-footer">
            <button
              @click="nextQuestion"
              :disabled="selectedAnswer === null"
              class="next-btn"
            >
              <span>{{
                currentQuestion === questions.length - 1
                  ? "결과 확인"
                  : "다음 문제"
              }}</span>
              <span class="btn-icon">{{
                currentQuestion === questions.length - 1 ? "🎯" : "→"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-else class="result-container">
        <div class="result-card">
          <div class="result-header">
            <div class="result-icon">
              {{ getScoreGrade(score, questions.length).emoji }}
            </div>
            <h2 class="result-title">퀴즈 완료!</h2>
            <div class="result-score">
              <div
                class="score-circle"
                :style="{
                  borderColor: getScoreGrade(score, questions.length).color,
                }"
              >
                <span class="score-number">{{ score }}</span>
                <span class="score-total">/ {{ questions.length }}</span>
              </div>
              <div class="grade-info">
                <span
                  class="grade-letter"
                  :style="{
                    color: getScoreGrade(score, questions.length).color,
                  }"
                >
                  {{ getScoreGrade(score, questions.length).grade }}
                </span>
                <span class="percentage"
                  >{{ Math.round((score / questions.length) * 100) }}%</span
                >
              </div>
            </div>
          </div>

          <div class="result-content">
            <div class="score-message">
              <p v-if="score === questions.length">
                🏆 완벽합니다! 경제 전문가가 될 자질이 있으시네요!
              </p>
              <p v-else-if="score >= questions.length * 0.8">
                🎉 훌륭합니다! 경제에 대한 이해도가 높으시네요!
              </p>
              <p v-else-if="score >= questions.length * 0.6">
                👍 좋습니다! 조금만 더 공부하면 완벽해질 거예요!
              </p>
              <p v-else>📚 더 공부하면 더 좋은 결과를 얻을 수 있을 거예요!</p>
            </div>

            <!-- Question Review -->
            <div class="review-section">
              <h3 class="review-title">📋 문제 복기</h3>
              <div class="review-list">
                <div
                  v-for="(answer, index) in userAnswers"
                  :key="index"
                  class="review-item"
                  :class="{
                    correct: answer.correct,
                    incorrect: !answer.correct,
                  }"
                >
                  <div class="review-header">
                    <span class="review-number">Q{{ index + 1 }}</span>
                    <span class="review-status">
                      {{ answer.correct ? "✅" : "❌" }}
                    </span>
                  </div>
                  <div class="review-content">
                    <p class="review-question">
                      {{ questions[answer.questionIndex].question }}
                    </p>
                    <p class="review-answer">
                      <strong>선택한 답:</strong>
                      {{
                        questions[answer.questionIndex].options[
                          answer.selectedAnswer
                        ]
                      }}
                    </p>
                    <p v-if="!answer.correct" class="review-correct">
                      <strong>정답:</strong>
                      {{
                        questions[answer.questionIndex].options[
                          questions[answer.questionIndex].correct
                        ]
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="result-actions">
            <button @click="resetQuiz" class="retry-btn">
              <span>다시 도전하기</span>
              <span class="btn-icon">🔄</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.economic-quiz {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%);
  color: #1a202c;
  transition: all 0.3s ease;
  position: relative;
}

.economic-quiz.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e2e8f0;
}

.economic-quiz::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(234, 88, 12, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(251, 191, 36, 0.05) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
}

.economic-quiz.dark-mode::before {
  background:
    radial-gradient(
      circle at 20% 50%,
      rgba(234, 88, 12, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(251, 191, 36, 0.1) 0%,
      transparent 50%
    );
}

/* Header */
.quiz-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.quiz-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ea580c 0%, #f59e0b 50%, #ea580c 100%);
}

.dark-mode .quiz-header {
  background: rgba(26, 26, 46, 0.95);
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
}

.page-title {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0.5rem 0 0 0;
  color: #64748b;
  font-size: 1.1rem;
}

.dark-mode .page-subtitle {
  color: #94a3b8;
}

.dark-mode-toggle {
  background: none;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .dark-mode-toggle {
  border-color: #475569;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
  border-color: #ea580c;
}

/* Main Content */
.quiz-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

/* Progress Section */
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

.score-counter {
  color: #64748b;
}

.dark-mode .score-counter {
  color: #94a3b8;
}

.progress-bar {
  background: rgba(234, 88, 12, 0.1);
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  background: linear-gradient(90deg, #ea580c 0%, #f59e0b 100%);
  height: 100%;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Question Card */
.question-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(234, 88, 12, 0.1);
  position: relative;
  overflow: hidden;
}

.dark-mode .question-card {
  background: #1e293b;
  border-color: rgba(234, 88, 12, 0.2);
}

.question-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ea580c 0%, #f59e0b 100%);
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

.dark-mode .question-text {
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.dark-mode .option-btn {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

.option-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(234, 88, 12, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.option-btn:hover::before {
  left: 100%;
}

.option-btn:hover {
  border-color: #ea580c;
  background: #fed7aa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.2);
}

.dark-mode .option-btn:hover {
  background: #475569;
  border-color: #ea580c;
}

.option-btn.selected {
  background: #ea580c;
  color: white;
  border-color: #ea580c;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.3);
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

.option-btn.selected .option-letter {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.option-text {
  flex: 1;
  font-weight: 500;
}

/* Question Footer */
.question-footer {
  display: flex;
  justify-content: flex-end;
}

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

.next-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.next-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
}

.btn-icon {
  font-size: 1rem;
}

/* Results */
.result-card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.dark-mode .result-card {
  background: #1e293b;
}

.result-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ea580c 0%, #f59e0b 100%);
}

.result-header {
  margin-bottom: 2rem;
}

.result-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.result-title {
  margin: 0 0 2rem 0;
  color: #ea580c;
  font-size: 2.5rem;
  font-weight: 800;
}

.result-score {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border: 6px solid #ea580c;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ea580c;
  line-height: 1;
}

.score-total {
  font-size: 1.2rem;
  color: #64748b;
}

.dark-mode .score-total {
  color: #94a3b8;
}

.grade-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.grade-letter {
  font-size: 3rem;
  font-weight: 800;
}

.percentage {
  font-size: 1.5rem;
  font-weight: 600;
  color: #64748b;
}

.dark-mode .percentage {
  color: #94a3b8;
}

.score-message {
  margin-bottom: 2rem;
}

.score-message p {
  font-size: 1.2rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
}

.dark-mode .score-message p {
  color: #d1d5db;
}

/* Review Section */
.review-section {
  text-align: left;
  margin-bottom: 2rem;
}

.review-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ea580c;
  text-align: center;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-item {
  background: #fef3e2;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.dark-mode .review-item {
  background: #334155;
  border-color: #475569;
}

.review-item.correct {
  border-color: #10b981;
  background: #ecfdf5;
}

.dark-mode .review-item.correct {
  background: #064e3b;
  border-color: #10b981;
}

.review-item.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
}

.dark-mode .review-item.incorrect {
  background: #7f1d1d;
  border-color: #ef4444;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-number {
  font-weight: 700;
  color: #ea580c;
}

.review-status {
  font-size: 1.2rem;
}

.review-content p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.review-question {
  font-weight: 600;
  color: #1a202c;
}

.dark-mode .review-question {
  color: #f1f5f9;
}

.review-answer,
.review-correct {
  color: #64748b;
}

.dark-mode .review-answer,
.dark-mode .review-correct {
  color: #94a3b8;
}

/* Result Actions */
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
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .page-title {
    font-size: 2rem;
  }

  .quiz-main {
    padding: 1.5rem 1rem;
  }

  .question-card {
    padding: 2rem;
  }

  .question-text {
    font-size: 1.3rem;
  }

  .result-score {
    flex-direction: column;
    gap: 1rem;
  }

  .score-circle {
    width: 100px;
    height: 100px;
  }

  .score-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .quiz-header {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .question-card {
    padding: 1.5rem;
  }

  .option-btn {
    padding: 1rem;
  }

  .result-card {
    padding: 2rem;
  }

  .progress-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
