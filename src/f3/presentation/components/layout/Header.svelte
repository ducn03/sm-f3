<script lang="ts">
    import { authStore } from '$f3/services/auth/stores/auth-store';
    import { uiStore } from '$f3/presentation/stores/ui-store';
    import { logout } from '$f3/services/auth/auth-service';
    
    // Menu items
    export let menuItems = [
      { label: 'Dashboard', href: '/' },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' }
    ];
    
    // Toggle sidebar
    function toggleSidebar() {
      uiStore.toggleSidebar();
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
      uiStore.toggleDarkMode();
    }
    
    // Logout function
    function handleLogout() {
      logout;
      window.location.href = '/login';
    }
  </script>
  
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="px-4 py-3 flex items-center justify-between">
      <!-- Left side - Logo and hamburger menu -->
      <div class="flex items-center space-x-4">
        <button 
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          on:click={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <a href="/" class="text-xl font-bold">MyApp</a>
      </div>
      
      <!-- Center - Navigation -->
      <nav class="hidden md:flex items-center space-x-4">
        {#each menuItems as item}
          <a 
            href={item.href} 
            class="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            {item.label}
          </a>
        {/each}
      </nav>
      
      <!-- Right side - User profile and actions -->
      <div class="flex items-center space-x-3">
        <button 
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          on:click={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {#if $uiStore.darkMode}
            <!-- Sun icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          {:else}
            <!-- Moon icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          {/if}
        </button>
        
        {#if $authStore.isAuthenticated && $authStore.userInfo}
          <div class="relative">
            <button 
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                {$authStore.userInfo.fullName ? $authStore.userInfo.fullName : 'User'}
              </span>
              <span class="hidden md:block">{$authStore.userInfo.fullName || 'User'}</span>
            </button>
            
            <!-- Dropdown menu would go here -->
          </div>
          
          <button 
            class="p-2 rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            on:click={handleLogout}
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        {:else}
          <a 
            href="/login" 
            class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </a>
        {/if}
      </div>
    </div>
  </header>