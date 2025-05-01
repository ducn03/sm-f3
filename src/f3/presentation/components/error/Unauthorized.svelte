<!-- Trang lỗi 401: Unauthorized -->
<script lang="ts">
    import Container from '$f3/presentation/components/layout/Container.svelte';
    import { goto } from '$app/navigation';
    
    // Thông tin lỗi
    const errorInfo = {
      code: 401,
      title: "Unauthorized",
      message: "Bạn cần đăng nhập để truy cập trang này.",
      icon: "lock"
    };
  
    // Chuyển về trang đăng nhập
    const handleLogin = () => {
      goto('/login');
    };
  
    // Quay lại trang trước
    const handleGoBack = () => {
      history.back();
    };
  </script>
  
  <Container pageName="error-401">
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center max-w-lg px-6 py-12 bg-white dark:bg-gray-800 shadow rounded-lg">
        <!-- Icon lỗi -->
        <div class="mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 p-6 w-24 h-24 flex items-center justify-center">
          {#if errorInfo.icon === "lock"}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          {/if}
        </div>
        
        <!-- Nội dung lỗi -->
        <h1 class="text-5xl font-bold text-red-600 dark:text-red-400 mb-2">{errorInfo.code}</h1>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{errorInfo.title}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">{errorInfo.message}</p>
        
        <!-- Các nút hành động -->
        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <button 
            on:click={handleLogin}
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150">
            Đăng nhập
          </button>
          <button 
            on:click={handleGoBack}
            class="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition duration-150">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </Container>