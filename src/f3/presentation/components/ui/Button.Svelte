<script lang="ts">
    import type { SvelteComponent } from 'svelte';

    export let variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' = 'primary';
    export let size: 'sm' | 'md' | 'lg' = 'md';
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let disabled: boolean = false;
    export let fullWidth: boolean = false;
    export let loading: boolean = false;
    export let icon: typeof SvelteComponent | null = null;
    export let iconPosition: 'left' | 'right' = 'left';
    
    // Tính toán classes dựa trên props
    $: variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-800'
    }[variant];
    
    $: sizeClasses = {
      sm: 'text-sm py-1 px-3',
      md: 'text-base py-2 px-4',
      lg: 'text-lg py-3 px-6'
    }[size];
    
    $: widthClass = fullWidth ? 'w-full' : '';
  </script>
  
  <button
    {type}
    {disabled}
    class="{variantClasses} {sizeClasses} {widthClass} rounded flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    on:click
    on:mouseover
    on:focus
  >
    {#if loading}
      <span class="animate-spin mr-2">
        <!-- Simple spinner -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </span>
    {:else if icon && iconPosition === 'left'}
      <span class="mr-2">
        <svelte:component this={icon} />
      </span>
    {/if}
    
    <slot />
    
    {#if icon && iconPosition === 'right' && !loading}
      <span class="ml-2">
        <svelte:component this={icon} />
      </span>
    {/if}
  </button>