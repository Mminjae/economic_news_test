<script setup>
import { ref } from "vue";

const currentQuestion = ref(0);
const score = ref(0);
const showResult = ref(false);
const selectedAnswer = ref(null);

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
      "한국은행은 통화정책, 기준금리 결정, ��폐 발행 등의 업무를 담당하지만 주식 거래는 하지 않습니다.",
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
]);

const selectAnswer = (index) => {
  selectedAnswer.value = index;
};

const nextQuestion = () => {
  if (selectedAnswer.value === questions.value[currentQuestion.value].correct) {
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
};
</script>

<template>
  <div class="economic-quiz">
    <header class="quiz-header">
      <h1>🧠 경제 퀴즈</h1>
      <p>경제 지식을 테스트해보세요!</p>
    </header>

    <div v-if="!showResult" class="quiz-container">
      <div class="progress-bar">
        <div
          class="progress"
          :style="{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }"
        ></div>
      </div>

      <div class="question-info">
        <span class="question-number"
          >질문 {{ currentQuestion + 1 }} / {{ questions.length }}</span
        >
      </div>

      <div class="question-card">
        <h2 class="question">{{ questions[currentQuestion].question }}</h2>

        <div class="options">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            @click="selectAnswer(index)"
            class="option-btn"
            :class="{ selected: selectedAnswer === index }"
          >
            {{ option }}
          </button>
        </div>

        <button
          @click="nextQuestion"
          :disabled="selectedAnswer === null"
          class="next-btn"
        >
          {{
            currentQuestion === questions.length - 1 ? "결과 보기" : "다음 질문"
          }}
        </button>
      </div>
    </div>

    <div v-else class="result-container">
      <div class="result-card">
        <h2>퀴즈 완료! 🎉</h2>
        <div class="score">
          <span class="score-text">점수</span>
          <span class="score-number">{{ score }} / {{ questions.length }}</span>
        </div>

        <div class="score-message">
          <p v-if="score === questions.length">
            완벽합니다! 경제 전문가가 될 자질이 있으시네요! 💯
          </p>
          <p v-else-if="score >= questions.length * 0.7">
            좋은 결과입니다! 경제에 대한 이해도가 높으시네요! 👏
          </p>
          <p v-else>더 공부하면 더 좋은 결과를 얻을 수 있을 거예요! 📚</p>
        </div>

        <button @click="resetQuiz" class="retry-btn">다시 도전하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.economic-quiz {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%);
  padding: 2rem 1rem;
}

.quiz-header {
  text-align: center;
  margin-bottom: 2rem;
}

.quiz-header h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #ea580c;
}

.quiz-container,
.result-container {
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  background: #fed7aa;
  height: 8px;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress {
  background: #ea580c;
  height: 100%;
  transition: width 0.3s ease;
}

.question-info {
  text-align: center;
  margin-bottom: 2rem;
  color: #9a3412;
  font-weight: 600;
}

.question-card,
.result-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.question {
  font-size: 1.3rem;
  margin: 0 0 2rem 0;
  color: #1a202c;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-btn {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 1rem;
}

.option-btn:hover {
  border-color: #ea580c;
  background: #fed7aa;
}

.option-btn.selected {
  background: #ea580c;
  color: white;
  border-color: #ea580c;
}

.next-btn,
.retry-btn {
  background: #ea580c;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.next-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.next-btn:not(:disabled):hover,
.retry-btn:hover {
  background: #c2410c;
  transform: translateY(-2px);
}

.result-card {
  text-align: center;
}

.result-card h2 {
  margin: 0 0 2rem 0;
  color: #ea580c;
  font-size: 2rem;
}

.score {
  margin-bottom: 2rem;
}

.score-text {
  font-size: 1.2rem;
  color: #64748b;
  display: block;
  margin-bottom: 0.5rem;
}

.score-number {
  font-size: 3rem;
  font-weight: 800;
  color: #ea580c;
}

.score-message {
  margin-bottom: 2rem;
}

.score-message p {
  font-size: 1.1rem;
  color: #374151;
  margin: 0;
}
</style>
