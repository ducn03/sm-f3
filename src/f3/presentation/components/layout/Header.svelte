<script lang="ts">
  import { authStore } from '$f3/services/auth/stores/auth-store';
  import { uiStore } from '$f3/presentation/stores/ui-store';
  import { onMount } from 'svelte';
  import { logout } from '$f3/services/auth/auth-service';
  import Logo from '$lib/assets/logo/logo.svelte';
  
  // Social media navigation items
  export let menuItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Explore', href: '/explore', icon: 'compass' },
    { label: 'Messages', href: '/messages', icon: 'message-circle' },
    { label: 'Notifications', href: '/notifications', icon: 'bell' },
    { label: 'Bookmarks', href: '/bookmarks', icon: 'bookmark' }
  ];

  // Primary color - can be passed as a prop or set here
  export let primaryColor = 'purple';
  
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
    logout();
    window.location.href = '/login';
  }

  // Notification count (hardcoded for demo)
  $: notificationCount = 1;

  // Track if we're on mobile
  let isMobile = false;

  // Update mobile state on resize
  function updateMobileState() {
    isMobile = window.innerWidth < 768;
  }

  onMount(() => {
    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  });
</script>

<!-- Top Header -->
<header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
  <div class="px-4 py-3 flex items-center justify-between max-w-6xl mx-auto">
    <!-- Left side - Logo and hamburger menu (hidden on mobile) -->
    <div class="flex items-center space-x-4">
      <button 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 md:flex hidden"
        on:click={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      <a href="/" class="text-xl font-bold flex items-center h-8 w-40 mr-2">
        <Logo />
      </a>
    </div>
    
    <!-- Center - Navigation (only on desktop) -->
    <nav class="hidden md:flex items-center space-x-2">
      {#each menuItems as item}
        <a 
          href={item.href} 
          class="px-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-{primaryColor}-600 dark:hover:text-{primaryColor}-400 flex items-center"
        >
          {#if item.icon === 'home'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          {:else if item.icon === 'compass'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          {:else if item.icon === 'message-circle'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          {:else if item.icon === 'bell'}
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {#if notificationCount > 0}
                <span class="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{notificationCount > 9 ? '9+' : notificationCount}</span>
              {/if}
            </div>
          {:else if item.icon === 'bookmark'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          {/if}
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
    
    <!-- Right side - Mobile specific (Messages & Settings only on mobile) -->
    <div class="flex items-center space-x-3">
      <!-- Messages icon - only on mobile -->
      <a
        href="/messages"
        class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        {#if notificationCount > 0}
          <span class="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{notificationCount > 9 ? '9+' : notificationCount}</span>
        {/if}
      </a>
      
      <!-- Search bar - desktop only -->
      <div class="relative hidden md:block">
        <input 
          type="text" 
          placeholder="Search..." 
          class="bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 focus:bg-white dark:focus:bg-gray-600 w-48"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <!-- Dark mode toggle - desktop only -->
      <button 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 hidden md:block"
        on:click={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {#if $uiStore.darkMode}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {/if}
      </button>
      
      <!-- Create post button - desktop only -->
      <button class="hidden md:flex items-center space-x-1 bg-{primaryColor}-500 hover:bg-{primaryColor}-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 focus:ring-opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Post</span>
      </button>
      
      <!-- Settings icon - only on mobile -->
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a
        href="/settings"
        class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </a>
      
      <!-- Profile section - desktop only -->
      {#if $authStore.isAuthenticated && $authStore.userInfo}
        <div class="relative hidden md:block">
          <button 
            class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500"
          >
            <span class="w-9 h-9 bg-gradient-to-r from-{primaryColor}-400 to-purple-500 text-white rounded-full flex items-center justify-center overflow-hidden">
              {#if $authStore.userInfo.fullName}
                <img src={$authStore.userInfo.fullName} alt="Profile" class="w-full h-full object-cover" />
              {:else}
                {$authStore.userInfo.fullName ? $authStore.userInfo.fullName.charAt(0).toUpperCase() : 'U'}
              {/if}
            </span>
          </button>
          
          <!-- Dropdown menu would go here -->
        </div>
        
        <button 
          class="p-2 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 hidden md:block"
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
          class="px-4 py-2 rounded-full bg-{primaryColor}-500 hover:bg-{primaryColor}-600 text-white focus:outline-none focus:ring-2 focus:ring-{primaryColor}-500 focus:ring-opacity-50 hidden md:block"
        >
          Login
        </a>
      {/if}
    </div>
  </div>
</header>

<!-- Bottom Navigation for Mobile -->
{#if isMobile}
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
    <div class="flex justify-around items-center">
      {#each menuItems as item}
        <a 
          href={item.href} 
          class="py-3 px-2 flex flex-col items-center text-xs text-gray-700 dark:text-gray-300 hover:text-{primaryColor}-600 dark:hover:text-{primaryColor}-400"
          aria-label={item.label}
        >
          {#if item.icon === 'home'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          {:else if item.icon === 'compass'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          {:else if item.icon === 'message-circle'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            {#if notificationCount > 0}
              <span class="absolute top-2 right-8 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{notificationCount > 9 ? '9+' : notificationCount}</span>
            {/if}
          {:else if item.icon === 'bell'}
            <div class="relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {#if notificationCount > 0}
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{notificationCount > 9 ? '9+' : notificationCount}</span>
              {/if}
            </div>
          {:else if item.icon === 'bookmark'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          {/if}
          <span class="text-xs mt-1">{item.label}</span>
        </a>
      {/each}
    </div>
  </nav>

  <!-- Add padding to the bottom of the page content when mobile nav is present -->
  <div class="h-16"></div>
{/if}