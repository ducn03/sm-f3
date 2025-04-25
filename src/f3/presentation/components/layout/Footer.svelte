<script lang="ts">
    import { authStore } from '$f3/services/auth/stores/auth-store';
    import { uiStore } from '$f3/presentation/stores/ui-store';
    
    // Footer navigation links
    export let footerLinks = [
      { label: 'About', href: '/about' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Contact', href: '/contact' }
    ];
    
    // Copyright year calculation
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const copyrightYear = startYear === currentYear ? currentYear : `${startYear}-${currentYear}`;
    
    // Social media links
    const socialLinks = [
      { name: 'Twitter', url: 'https://twitter.com/myapp', icon: 'twitter' },
      { name: 'Facebook', url: 'https://facebook.com/myapp', icon: 'facebook' },
      { name: 'Instagram', url: 'https://instagram.com/myapp', icon: 'instagram' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/myapp', icon: 'linkedin' }
    ];
  </script>
  
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Footer top section with columns -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company info -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">MyApp</h3>
          <p class="text-gray-600 text-sm">
            Simplifying your digital experience with powerful tools and intuitive design.
          </p>
        </div>
        
        <!-- Quick links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul class="space-y-2">
            {#each footerLinks as link}
              <li>
                <a 
                  href={link.href} 
                  class="text-gray-600 hover:text-gray-900 text-sm transition duration-150"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Resources -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a href="/docs" class="text-gray-600 hover:text-gray-900 text-sm transition duration-150">Documentation</a></li>
            <li><a href="/tutorials" class="text-gray-600 hover:text-gray-900 text-sm transition duration-150">Tutorials</a></li>
            <li><a href="/api" class="text-gray-600 hover:text-gray-900 text-sm transition duration-150">API Reference</a></li>
            <li><a href="/support" class="text-gray-600 hover:text-gray-900 text-sm transition duration-150">Support</a></li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
          <form class="space-y-2">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <!-- Footer bottom section with copyright and social -->
      <div class="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <!-- Copyright -->
        <p class="text-gray-500 text-sm mb-4 sm:mb-0">
          © {copyrightYear} MyApp. All rights reserved.
        </p>
        
        <!-- Social links -->
        <div class="flex space-x-4">
          {#each socialLinks as social}
            <a 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition duration-150"
              aria-label={social.name}
            >
              {#if social.icon === 'twitter'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              {:else if social.icon === 'facebook'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              {:else if social.icon === 'instagram'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              {:else if social.icon === 'linkedin'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </footer>