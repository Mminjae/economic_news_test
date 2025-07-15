<template>
  <div class="auth-container">
    <div class="auth-modal">
      <div class="auth-header">
        <h2 class="auth-title">
          {{ isSignup ? "회원가입" : "로그인" }}
        </h2>
        <button @click="$emit('close')" class="close-btn">✕</button>
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
          <label for="confirmPassword" class="form-label">비밀번호 확인</label>
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close", "login"]);

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

    emit("close");
  } catch (err) {
    error.value = "오류가 발생했습니다. 다시 시도해주세요.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.auth-modal {
  background: var(--bg-primary);
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.auth-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.auth-form {
  padding: 1.5rem;
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
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  border: none;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
  padding: 1rem 1.5rem 1.5rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
}

.switch-text {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.switch-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  margin-left: 0.5rem;
  text-decoration: underline;
}

.switch-btn:hover {
  color: var(--secondary-color);
}

/* Dark mode support */
:root.dark .auth-modal {
  background: var(--bg-secondary);
}

:root.dark .form-input {
  background: var(--bg-primary);
  border-color: var(--border-color);
}

:root.dark .error-message {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .auth-container {
    padding: 0.5rem;
  }

  .auth-modal {
    max-width: none;
  }

  .auth-header {
    padding: 1rem;
  }

  .auth-form {
    padding: 1rem;
  }

  .auth-footer {
    padding: 0.75rem 1rem 1rem;
  }
}
</style>
