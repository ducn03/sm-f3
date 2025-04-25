<script lang="ts">
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import { uiStore } from '$f3/presentation/stores/ui-store';
    
    // Props
    export let pageName = ''; // For page-specific styling or logic
    export let hideFooter = false; // Option to hide footer on specific pages
    
    // Menu items for header
    const menuItems = [
      { label: 'Dashboard', href: '/' },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' }
    ];
    
    // Footer links
    const footerLinks = [
      { label: 'About', href: '/about' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Contact', href: '/contact' }
    ];
  </script>
  
  <div class={`flex flex-col min-h-screen ${$uiStore.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
    <!-- Header -->
    <Header {menuItems} />
    
    <!-- Main content -->
    <main class="flex-grow">
      <!-- Sidebar -->
      {#if $uiStore.sidebarOpen}
        <div class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-10" 
             style="margin-top: 60px; top: 0;">
          <div class="p-4">
            <h2 class="text-xl font-bold mb-4">Navigation</h2>
            <nav class="space-y-2">
              {#each menuItems as item}
                <a 
                  href={item.href} 
                  class="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                >
                  {item.label}
                </a>
              {/each}
            </nav>
          </div>
        </div>
      {/if}
      
      <!-- Page content -->
      <div class={`w-full ${$uiStore.sidebarOpen ? 'md:pl-64' : ''} transition-all duration-300`}>
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <!-- Content provided via slot -->
          <slot></slot>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    {#if !hideFooter}
      <Footer {footerLinks} />
    {/if}
  </div>