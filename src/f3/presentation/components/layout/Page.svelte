<script lang="ts">
    import Container from '$f3/presentation/components/layout/Container.svelte';
    
    // Page-specific data and logic
    const pageTitle = "Dashboard";
    const userData = {
      name: "John Doe",
      stats: {
        tasks: 12,
        completed: 8,
        pending: 4
      }
    };
  </script>
  
  <Container pageName="dashboard">
    <div class="space-y-6">
      <!-- Page header -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold">{pageTitle}</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-1">Welcome back, {userData.name}!</p>
      </div>
      
      <!-- Dashboard content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stats card -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Your Tasks</h2>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.tasks}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{userData.stats.completed}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{userData.stats.pending}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        
        <!-- Other dashboard widgets would go here -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p class="text-sm">Task "Update profile" completed</p>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p class="text-sm">New task "Review documents" assigned</p>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <p class="text-sm">Task "Prepare presentation" due tomorrow</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <button class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150">Create New Task</button>
            <button class="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150">Generate Report</button>
            <button class="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150">Invite Team Member</button>
          </div>
        </div>
      </div>
    </div>
  </Container>