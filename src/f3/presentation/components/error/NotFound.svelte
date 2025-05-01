<!-- Trang lỗi 404: Not Found -->
<script lang="ts">
    import Container from '$f3/presentation/components/layout/Container.svelte';
    import { goto } from '$app/navigation';
    
    // Thông tin lỗi
    const errorInfo = {
      code: 404,
      title: "Page Not Found",
      message: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
      icon: "search"
    };
  
    // Chuyển về trang chủ
    const handleHome = () => {
      goto('/dashboard');
    };
  
    // Quay lại trang trước
    const handleGoBack = () => {
      history.back();
    };
  </script>
  
  <Container pageName="error-404">
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center max-w-lg px-6 py-12 bg-white dark:bg-gray-800 shadow rounded-lg">
        <!-- Icon lỗi -->
        <div class="mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20 p-6 w-24 h-24 flex items-center justify-center">
          {#if errorInfo.icon === "search"}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          {/if}
        </div>
        
        <!-- Nội dung lỗi -->
        <h1 class="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{errorInfo.code}</h1>
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
        </div>
      </div>
    </div>
  </Container>