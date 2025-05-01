<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Alert, Spinner } from 'flowbite-svelte';
  import FloatingLabelInput from '$f3/presentation/components/ui/FloatingLabelInput.svelte';
  import { UI_CONSTANT } from '$f3/constant/ui-constant'
  import { MESSAGE_CONSTANT } from '$f3/constant/message-constant';
  import { login } from '$f3/services/auth/auth-service';
  import { logger } from '$lib/services/logger';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  let rememberMe = false;
  let errorMessage = '';
  let isLoading = false;

  export let title = 'Đăng nhập';
  export let submitLabel = 'Đăng nhập';
  export let redirectLabel = 'Chưa có tài khoản?';
  export let redirectUrl = '/register';
  export let successRedirectUrl = '/dashboard';
  let usernameRequiredError = MESSAGE_CONSTANT.AUTH.usernameRequiredError;
  let passwordRequiredError = MESSAGE_CONSTANT.AUTH.passwordRequiredError;
  let requiredError = MESSAGE_CONSTANT.FORM.required;
  export let logo: null | typeof import('svelte').SvelteComponent = null;

  async function handleSubmit() {
    // Các input sẽ nhận biết được khi người dùng submit
    window.dispatchEvent(new CustomEvent(UI_CONSTANT.form));

    if (!username || !password) {
      errorMessage = requiredError;
      return;
    }

    errorMessage = '';
    isLoading = true;
    
    try {
      const response = await login({ username, password, rememberMe });

      if (response && response.data.token) {
        // Thông báo đăng nhập thành công cho trang gốc
        dispatch('login-success', { 
          userInfo: response.data, 
          redirectUrl: successRedirectUrl 
        });
      } else {
        errorMessage = response.meta.message;
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = MESSAGE_CONSTANT.SYSTEM.error;
      }
    } finally {
      isLoading = false;
    }
  }

  function handleSocialLogin(provider: string) {
    isLoading = true;
    dispatch('social-login', { provider });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="w-full max-w-md p-6 sm:p-8 space-y-5">
    <!-- Logo hoặc Tiêu đề -->
    <div class="flex justify-center mb-2">
      {#if logo}
        <svelte:component this={logo} class="h-12" />
      {:else}
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">{title}</h2>
      {/if}
    </div>

    <!-- Username -->
    <FloatingLabelInput
      style="outlined"
      id="username"
      type="text"
      bind:value={username}
      disabled={isLoading}
      class="w-full"
      label="Tên đăng nhập"
      required
      requiredError={usernameRequiredError}
      focusColor="primary"
      successColor="primary"
    />

    <!-- Password -->
    <FloatingLabelInput
      style="outlined"
      id="password"
      type="password"
      autocomplete="current-password"
      bind:value={password}
      disabled={isLoading}
      class="w-full"
      label="Mật khẩu"
      required
      requiredError={passwordRequiredError}
      focusColor="primary"
      successColor="primary"
    />

    <!-- Forgot password -->
    <div class="flex items-center justify-end">
      <a href="/forgot-password" class="text-sm text-blue-600 hover:underline dark:text-blue-500">Quên mật khẩu?</a>
    </div>

    <!-- Submit -->
    <Button type="submit" color="primary" class="w-full py-2.5" disabled={isLoading}>
      {#if isLoading}
        <Spinner class="mr-2 w-4 h-4" />Chờ tôi xíu nhé! 🥹🥹🥹
      {:else}
        {submitLabel}
      {/if}
    </Button>

    <!-- Error -->
    {#if errorMessage}
      <Alert color="red" class="mt-2">
        <span class="font-medium">Lỗi:</span> {errorMessage}
      </Alert>
    {/if}

    <!-- Redirect -->
    <div class="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
      {redirectLabel} <a href={redirectUrl} class="text-blue-600 hover:underline dark:text-blue-500">Đăng ký ngay</a>
    </div>

    <!-- Divider -->
    <div class="flex items-center justify-center my-2">
      <div class="border-t border-gray-300 w-full"></div>
      <span class="mx-3 text-sm text-gray-400">hoặc</span>
      <div class="border-t border-gray-300 w-full"></div>
    </div>

    <!-- Social Login -->
    <div class="flex flex-col space-y-2">
      <Button
        type="button"
        color="light"
        class="w-full flex items-center justify-center gap-2 hover:bg-gray-100 text-gray-700 border"
        on:click={() => handleSocialLogin('google')}
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" class="w-5 h-5" alt="Google" />
        <span>Đăng nhập với Google</span>
      </Button>

      <Button
        type="button"
        color="light"
        class="w-full flex items-center justify-center gap-2 hover:bg-gray-100 text-gray-700 border"
        on:click={() => handleSocialLogin('facebook')}
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" class="w-5 h-5" alt="Facebook" />
        <span>Đăng nhập với Facebook</span>
      </Button>
    </div>

  </div>
</form>

<style>
  form {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>