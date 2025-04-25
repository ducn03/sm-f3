<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Input, Button, Alert, Spinner, FloatingLabelInput } from 'flowbite-svelte';

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
  export let logo: null | typeof import('svelte').SvelteComponent = null;

  function handleSubmit() {
    if (!username || !password) {
      errorMessage = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    errorMessage = '';
    isLoading = true;

    dispatch('submit', { username, password, rememberMe });
  }

  export function setError(msg: string) {
    errorMessage = msg;
  }

  export function setLoading(loading: boolean) {
    isLoading = loading;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="mx-auto max-w-sm mt-10 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md space-y-4">
  <div class="flex justify-center mb-6">
    {#if logo}
      <svelte:component this={logo} class="h-12" />
    {:else}
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">{title}</h2>
    {/if}
  </div>

  <!-- Username -->
  <div class="mb-4">
    <FloatingLabelInput style="outlined" id="username" type="text" placeholder="Nhập tên đăng nhập" bind:value={username} disabled={isLoading} class="w-full">
      Tên đăng nhập
    </FloatingLabelInput>
  </div>

  <!-- Password -->
  <div class="mb-6">
    <FloatingLabelInput style="outlined" id="password" type="password" placeholder="Nhập mật khẩu" bind:value={password} disabled={isLoading} class="w-full">
      Mật khẩu
    </FloatingLabelInput>
  </div>

  <!-- Forgot Password -->
  <div class="flex items-center justify-end mb-6">
    <a href="/forgot-password" class="text-sm text-blue-600 hover:underline dark:text-blue-500">Quên mật khẩu?</a>
  </div>

  <!-- Submit -->
  <Button type="submit" color="blue" class="w-full py-2.5" disabled={isLoading}>
    {#if isLoading}
      <Spinner class="mr-2 w-4 h-4" /> Đang xử lý...
    {:else}
      {submitLabel}
    {/if}
  </Button>

  <!-- Error -->
  {#if errorMessage}
    <Alert color="red" class="mt-4">
      <span class="font-medium">Lỗi:</span> {errorMessage}
    </Alert>
  {/if}

  <!-- Redirect -->
  <div class="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
    {redirectLabel} <a href={redirectUrl} class="text-blue-600 hover:underline dark:text-blue-500">Đăng ký ngay</a>
  </div>
</form>
