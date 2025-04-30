<script lang="ts">
  import LoginForm from '$f3/features/auth/components/LoginForm.svelte';
  import { goto } from '$app/navigation';
  import "../../app.css";
  import Logo from '$lib/assets/logo/logo.svelte';
  import Background from '$lib/assets/background/background.svelte';

  // Xử lý khi LoginForm thông báo đăng nhập thành công
  function handleLoginSuccess(event: { detail: { redirectUrl: any; }; }) {
    const { redirectUrl } = event.detail;
    goto(redirectUrl);
  }

  // Xử lý đăng nhập social
  function handleSocialLogin(event: { detail: { provider: any; }; }) {
    const { provider } = event.detail;
    console.log(`Social login with ${provider} initiated`);
    // Có thể thêm xử lý social login tại đây nếu cần
  }
</script>

<!-- Layout chia đôi -->
<div class="fullscreen-container">
  <!-- Left: Login form -->
  <div class="form-side">
    <LoginForm 
      on:login-success={handleLoginSuccess}
      on:social-login={handleSocialLogin}
      logo={Logo as any}
      successRedirectUrl="/dashboard"
    />
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
      display: flex;
      flex-direction: column;
      padding-bottom: 10vh;
      box-sizing: border-box;
    }

    .background-side {
      display: none; /* Ẩn phần nền */
    }
  }
</style>