<script lang="ts">
  import LoginForm from '$f3/features/auth/components/LoginForm.svelte';
  import type { LoginCredentials } from '$f3/services/auth/interface/login-credentials';
  import { login } from '$f3/services/auth/auth-service';
  import { goto } from '$app/navigation';
  import "../../app.css";
  import Logo from '$lib/assets/logo/logo.svelte';
  import Background from '$lib/assets/background/background.svelte';

  let formRef: LoginForm;

  async function handleLogin(event: CustomEvent<LoginCredentials>) {
    const { username, password, rememberMe } = event.detail;

    formRef.setLoading(true);

    try {
      const response = await login({ username, password, rememberMe });

      if (response && response.token) {
        goto('/dashboard');
      } else {
        formRef.setError('Tài khoản hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      formRef.setError('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      formRef.setLoading(false);
    }
  }
</script>

<!-- Layout chia đôi -->
<div class="fullscreen-container">
  <!-- Left: Login form -->
  <div class="form-side">
    <LoginForm bind:this={formRef} on:submit={handleLogin} logo={Logo as any} />
  </div>

  <!-- Right: Background -->
  <div class="background-side">
    <Background />
  </div>
</div>

<style>
  .fullscreen-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
}

/* Form side mặc định chiếm 50% */
.form-side {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
  padding-bottom: 5vh;
}

/* Background side mặc định 50% */
.background-side {
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .fullscreen-container {
    flex-direction: column; /* Dọc thay vì ngang */
  }

  .form-side {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid;

  /* Thiết lập Flexbox */
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử con theo chiều dọc */
  /* justify-content: flex-start; */ /* Căn các con lên trên (thường là mặc định cho column) */
  
  /* Thêm padding-top để tạo khoảng trống */
  padding-bottom: 10vh; /* Hoặc 20vh, hoặc giá trị rem */


  box-sizing: border-box; 
}

  .background-side {
    display: none; /* Ẩn phần nền */
  }
}
</style>
