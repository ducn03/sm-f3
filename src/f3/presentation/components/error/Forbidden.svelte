<!-- Trang lỗi 403: Forbidden -->
<script lang="ts">
    import Container from '$f3/presentation/components/layout/Container.svelte';
    import { goto } from '$app/navigation';
    
    // Thông tin lỗi
    const errorInfo = {
      code: 403,
      title: "Forbidden",
      message: "Bạn không có quyền truy cập vào trang này.",
      icon: "shield"
    };
  
    // Chuyển về trang chủ
    const handleHome = () => {
      goto('/dashboard');
    };
  
    // Quay lại trang trước
    const handleGoBack = () => {
      history.back();
    };
  
    // Liên hệ quản trị viên
    const handleContact = () => {
      goto('/contact');
    };
  </script>
  
  <Container pageName="error-403">
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center max-w-lg px-6 py-12 bg-white dark:bg-gray-800 shadow rounded-lg">
        <!-- Icon lỗi -->
        <div class="mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 p-6 w-24 h-24 flex items-center justify-center">
          {#if errorInfo.icon === "shield"}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
            on:click={handleHome}
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150">
            Trang chủ
          </button>
          <button 
            on:click={handleGoBack}
            class="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition duration-150">
            Quay lại
          </button>
          <button 
            on:click={handleContact}
            class="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition duration-150">
            Liên hệ hỗ trợ
          </button>
        </div>
      </div>
    </div>
  </Container>