<template>
  <div class="auth-page">
    <div class="auth-background">
      <div class="background-pattern"></div>
    </div>

    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">
            {{ isSignup ? "회원가입" : "로그인" }}
          </h2>
          <p class="auth-subtitle">
            {{
              isSignup
                ? "새 계정을 만들어 서비스를 이용하세요"
                : "계정에 로그인하여 개인화된 서비스를 이용하세요"
            }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">이메일</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-input"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div v-if="isSignup" class="form-group">
            <label for="confirmPassword" class="form-label"
              >비밀번호 확인</label
            >
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="form-input"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div v-if="isSignup" class="form-group">
            <label for="name" class="form-label">이름</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-input"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="loading-spinner">⏳</span>
            {{ isSignup ? "회원가입" : "로그인" }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="switch-text">
            {{ isSignup ? "이미 계정이 있으신가요?" : "계정이 없으신가요?" }}
            <button @click="toggleMode" class="switch-btn">
              {{ isSignup ? "로그인" : "회원가입" }}
            </button>
          </p>
        </div>
      </div>

      <div class="auth-features">
        <h3 class="features-title">뱅크랩에서 제공하는 서비스</h3>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">💰</span>
            <div class="feature-content">
              <h4 class="feature-name">자산 관리</h4>
              <p class="feature-description">체계적인 자산 분석과 관리</p>
            </div>
          </div>

          <div class="feature-item">
            <span class="feature-icon">📊</span>
            <div class="feature-content">
              <h4 class="feature-name">소비 분석</h4>
              <p class="feature-description">지출 패턴 분석과 절약 팁</p>
            </div>
          </div>

          <div class="feature-item">
            <span class="feature-icon">📰</span>
            <div class="feature-content">
              <h4 class="feature-name">경제 뉴스</h4>
              <p class="feature-description">최신 경제 동향과 시장 분석</p>
            </div>
          </div>

          <div class="feature-item">
            <span class="feature-icon">🧠</span>
            <div class="feature-content">
              <h4 class="feature-name">투자 성향 검사</h4>
              <p class="feature-description">개인 맞춤형 투자 조언</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["login"]);

const isSignup = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const name = ref("");
const error = ref("");
const loading = ref(false);

const toggleMode = () => {
  isSignup.value = !isSignup.value;
  error.value = "";
  clearForm();
};

const clearForm = () => {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  name.value = "";
};

const validateForm = () => {
  if (!email.value || !password.value) {
    error.value = "이메일과 비밀번호를 입력해주세요.";
    return false;
  }

  if (isSignup.value) {
    if (!name.value) {
      error.value = "이름을 입력해주세요.";
      return false;
    }

    if (password.value !== confirmPassword.value) {
      error.value = "비밀번호가 일치하지 않습니다.";
      return false;
    }

    if (password.value.length < 6) {
      error.value = "비밀번호는 6자 이상이어야 합니다.";
      return false;
    }
  }

  return true;
};

const handleSubmit = async () => {
  error.value = "";

  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isSignup.value) {
      // Simulate signup
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((user) => user.email === email.value)) {
        error.value = "이미 등록된 이메일입니다.";
        return;
      }

      const newUser = {
        id: Date.now(),
        email: email.value,
        password: password.value,
        name: name.value,
        joinDate: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login after signup
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      emit("login", newUser);
    } else {
      // Simulate login
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === email.value && u.password === password.value,
      );

      if (!user) {
        error.value = "이메일 또는 비밀번호가 올바르지 않습니다.";
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      emit("login", user);
    }
  } catch (err) {
    error.value = "오류가 발생했습니다. 다시 시도해주세요.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    rgba(251, 191, 36, 0.1) 100%
  );
  z-index: 1;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(251, 191, 36, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(245, 158, 11, 0.1) 0%,
      transparent 50%
    );
  z-index: 2;
}

.auth-container {
  position: relative;
  z-index: 3;
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 3rem;
  align-items: center;
}

.auth-card {
  background: var(--bg-primary);
  border-radius: 20px;
  border: 2px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.auth-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.auth-title {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.auth-form {
  padding: 1rem 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.1);
  background: var(--bg-primary);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
  padding: 0.875rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.auth-footer {
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-top: 2px solid var(--border-color);
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    rgba(251, 191, 36, 0.05) 100%
  );
}

.switch-text {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

.switch-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 700;
  margin-left: 0.5rem;
  text-decoration: underline;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.switch-btn:hover {
  color: var(--secondary-color);
  transform: translateY(-1px);
}

/* Features Section */
.auth-features {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.features-title {
  margin: 0 0 2rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.15);
  border-color: var(--primary-color);
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.feature-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Dark mode support */
:root.dark .auth-card {
  background: var(--bg-secondary);
  backdrop-filter: blur(20px);
}

:root.dark .form-input {
  background: var(--bg-primary);
}

:root.dark .form-input:focus {
  background: var(--bg-secondary);
}

:root.dark .error-message {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
}

:root.dark .feature-item {
  background: var(--bg-secondary);
}

:root.dark .auth-footer {
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    rgba(251, 191, 36, 0.1) 100%
  );
}

/* Responsive Design */
@media (max-width: 1024px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  .auth-features {
    order: -1;
  }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    border-radius: 16px;
  }

  .auth-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .auth-title {
    font-size: 1.8rem;
  }

  .auth-form {
    padding: 1rem 1.5rem;
  }

  .auth-footer {
    padding: 1rem 1.5rem 1.5rem;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .feature-item {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 0.5rem;
  }

  .auth-header {
    padding: 1rem;
  }

  .auth-title {
    font-size: 1.6rem;
  }

  .auth-form {
    padding: 0.5rem 1rem;
  }

  .auth-footer {
    padding: 1rem;
  }

  .features-title {
    font-size: 1.3rem;
  }
}
</style>
