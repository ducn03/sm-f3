<script lang="ts">
    // User information props
    export let user = {
      id: '',
      fullName: '',
      email: '',
      avatar: '', // URL to avatar image
      role: '',   // User role/position
      department: '', // Optional department
      status: 'active', // active, away, offline, busy
      joinDate: ''  // Optional join date
    };
  
    // Style props
    export let variant: 'default' | 'compact' | 'detailed' = 'default';
    export let showActions: boolean = true;
    export let bordered: boolean = true;
    export let clickable: boolean = false;
    
    // Functions
    function handleViewProfile() {
      // Emit event or handle navigation
      const event = new CustomEvent('viewProfile', { detail: user.id });
      dispatch('viewProfile', user.id);
    }
    
    function handleSendMessage() {
      // Emit event or handle messaging
      const event = new CustomEvent('sendMessage', { detail: user.id });
      dispatch('sendMessage', user.id);
    }
    
    // Helper functions
    function getInitials(name: string): string {
      if (!name) return '';
      return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    function getStatusColor(status: string): string {
    // Khai báo statusColors là một Record có key là string và value là string
    const statusColors: Record<string, string> = {
        active: 'bg-green-500',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
        offline: 'bg-gray-400'
    };
    // Vẫn cần fallback vì về mặt lý thuyết, status có thể là bất kỳ string nào
    return statusColors[status] || 'bg-gray-400';
    }
    
    // Dispatch custom events
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="{bordered ? 'border border-gray-200 dark:border-gray-700' : ''} 
           {clickable ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''} 
           bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-200"
    on:click={clickable ? handleViewProfile : null}
  >
    {#if variant === 'compact'}
      <!-- Compact layout -->
      <div class="flex items-center px-4 py-3 space-x-3">
        <!-- Avatar -->
        {#if user.avatar}
          <img 
            src={user.avatar} 
            alt={user.fullName} 
            class="w-8 h-8 rounded-full object-cover"
          />
        {:else}
          <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200 font-medium text-sm">
            {getInitials(user.fullName)}
          </div>
        {/if}
        
        <!-- User info -->
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">{user.fullName}</h4>
          {#if user.role}
            <p class="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
          {/if}
        </div>
        
        <!-- Status indicator -->
        <div class="flex items-center">
          <span class="w-2 h-2 rounded-full {getStatusColor(user.status)}"></span>
        </div>
      </div>
      
    {:else if variant === 'detailed'}
      <!-- Detailed layout -->
      <div class="p-5">
        <div class="flex items-start">
          <!-- Avatar -->
          <div class="mr-4">
            {#if user.avatar}
              <img 
                src={user.avatar} 
                alt={user.fullName} 
                class="w-16 h-16 rounded-full object-cover"
              />
            {:else}
              <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200 font-medium text-xl">
                {getInitials(user.fullName)}
              </div>
            {/if}
          </div>
          
          <!-- User info -->
          <div class="flex-1">
            <div class="flex items-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{user.fullName}</h3>
              <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {user.role}
              </span>
              <span class="ml-2 inline-flex items-center">
                <span class="w-2 h-2 rounded-full {getStatusColor(user.status)} mr-1"></span>
                <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.status}</span>
              </span>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
            
            {#if user.department}
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span class="font-medium">Department:</span> {user.department}
              </p>
            {/if}
            
            {#if user.joinDate}
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span class="font-medium">Joined:</span> {user.joinDate}
              </p>
            {/if}
          </div>
        </div>
        
        {#if showActions}
          <div class="mt-5 flex space-x-2">
            <button 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
              on:click|stopPropagation={handleViewProfile}
            >
              View Profile
            </button>
            <button 
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm font-medium rounded-md transition-colors duration-200"
              on:click|stopPropagation={handleSendMessage}
            >
              Message
            </button>
          </div>
        {/if}
      </div>
      
    {:else}
      <!-- Default layout -->
      <div class="p-4">
        <div class="flex items-center">
          <!-- Avatar with status -->
          <div class="relative">
            {#if user.avatar}
              <img 
                src={user.avatar} 
                alt={user.fullName} 
                class="w-10 h-10 rounded-full object-cover"
              />
            {:else}
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200 font-medium">
                {getInitials(user.fullName)}
              </div>
            {/if}
            
            <!-- Status dot -->
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 {getStatusColor(user.status)}"></span>
          </div>
          
          <!-- User info -->
          <div class="ml-3 flex-1">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</h4>
            <div class="flex items-center text-xs">
              {#if user.role}
                <span class="text-gray-500 dark:text-gray-400">{user.role}</span>
              {/if}
              {#if user.department}
                <span class="mx-1 text-gray-300 dark:text-gray-600">•</span>
                <span class="text-gray-500 dark:text-gray-400">{user.department}</span>
              {/if}
            </div>
          </div>
          
          {#if showActions}
            <div class="flex space-x-1">
              <button 
                class="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors duration-200"
                on:click|stopPropagation={handleViewProfile}
                aria-label="View profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button 
                class="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors duration-200"
                on:click|stopPropagation={handleSendMessage}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>