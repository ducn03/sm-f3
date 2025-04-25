<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { clickOutside } from '../../actions/click-outside';
    
    export let isOpen: boolean = false;
    export let title: string = '';
    export let closeOnClickOutside: boolean = true;
    export let closeOnEsc: boolean = true;
    export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
    
    // Kích thước modal theo size
    $: sizeClass = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4'
    }[size];
    
    // Event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    // Close modal
    function close() {
      dispatch('close');
    }
    
    // Handle keyboard events
    function handleKeydown(event: KeyboardEvent) {
      if (closeOnEsc && event.key === 'Escape') {
        close();
      }
    }
    
    // Handle click outside
    function handleClickOutside() {
      if (closeOnClickOutside) {
        close();
      }
    }
  </script>
  
  <svelte:window on:keydown={handleKeydown} />
  
  {#if isOpen}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      transition:fade={{ duration: 200 }}
    >
      <div
        class="bg-white rounded-lg shadow-xl {sizeClass} w-full max-h-[90vh] overflow-auto"
        transition:scale={{ start: 0.95, duration: 200 }}
        use:clickOutside={handleClickOutside}
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            class="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            on:click={close}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <slot />
        </div>
        
        {#if $$slots.footer}
          <div class="p-4 border-t bg-gray-50">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </div>
  {/if}