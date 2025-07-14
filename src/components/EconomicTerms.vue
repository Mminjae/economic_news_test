<script setup>
import { ref } from "vue";

const terms = ref([
  {
    id: 1,
    term: "GDP",
    fullName: "Gross Domestic Product (국내총생산)",
    definition:
      "한 나라의 영토 내에서 일정 기간 동안 생산된 모든 최종 재화와 서비스의 시장가치 총합입니다.",
    example: "2023년 한국의 GDP는 약 2,080조원으로 세계 10위를 기록했습니다.",
  },
  {
    id: 2,
    term: "인플레이션",
    fullName: "Inflation",
    definition:
      "물가가 지속적으로 상승하여 화폐의 구매력이 하락하는 경제 현상입니다.",
    example: "연 2-3%의 적정 인플레이션은 경제 성장에 도움이 됩니다.",
  },
  {
    id: 3,
    term: "기준금리",
    fullName: "Base Rate",
    definition:
      "한국은행이 금융기관에 자금을 대출할 때 적용하는 기준이 되는 금리입니다.",
    example: "2024년 현재 한국의 기준금리는 3.5%입니다.",
  },
]);

const searchQuery = ref("");

const filteredTerms = ref(terms.value);

const searchTerms = () => {
  if (!searchQuery.value) {
    filteredTerms.value = terms.value;
    return;
  }

  filteredTerms.value = terms.value.filter(
    (term) =>
      term.term.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      term.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      term.definition.includes(searchQuery.value),
  );
};
</script>

<template>
  <div class="economic-terms">
    <header class="terms-header">
      <h1>📚 경제 용어</h1>
      <p>경제와 금융 분야의 주요 용어들을 쉽게 찾아보세요</p>
    </header>

    <div class="search-section">
      <input
        v-model="searchQuery"
        @input="searchTerms"
        type="text"
        placeholder="경제 용어를 검색해보세요..."
        class="search-input"
      />
    </div>

    <div class="terms-grid">
      <div v-for="term in filteredTerms" :key="term.id" class="term-card">
        <h3 class="term-title">{{ term.term }}</h3>
        <p class="term-full-name">{{ term.fullName }}</p>
        <p class="term-definition">{{ term.definition }}</p>
        <div class="term-example">
          <strong>예시:</strong> {{ term.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.economic-terms {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2rem 1rem;
}

.terms-header {
  text-align: center;
  margin-bottom: 2rem;
}

.terms-header h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #1e40af;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
}

.terms-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.term-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.term-title {
  color: #1e40af;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.term-full-name {
  color: #64748b;
  margin: 0 0 1rem 0;
  font-style: italic;
}

.term-definition {
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.term-example {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #1e40af;
}
</style>
