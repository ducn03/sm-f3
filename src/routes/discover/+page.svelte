<script lang="ts">
    import Container from '$f3/presentation/components/layout/Container.svelte';
    
    // Page-specific data and logic
    const pageTitle = "Khám phá";
    
    const suggestedUsers = [
      { id: 1, name: "Nguyễn Minh", username: "@minhng", avatar: "/placeholders/avatar1.jpg", followers: 1205, isFollowing: false },
      { id: 2, name: "Trần Thu Hà", username: "@hatt", avatar: "/placeholders/avatar2.jpg", followers: 3450, isFollowing: true },
      { id: 3, name: "Phạm Văn Nam", username: "@nampv", avatar: "/placeholders/avatar3.jpg", followers: 853, isFollowing: false },
      { id: 4, name: "Lê Thị Mai", username: "@maile", avatar: "/placeholders/avatar4.jpg", followers: 2780, isFollowing: false }
    ];
    
    const trendingTopics = [
      { id: 1, tag: "#CongNghe", posts: "2.5k", trending: "Hà Nội" },
      { id: 2, tag: "#DuLich2025", posts: "1.8k", trending: "TP.HCM" },
      { id: 3, tag: "#AmThuc", posts: "1.2k", trending: "Toàn quốc" },
      { id: 4, tag: "#F1VietnamGP", posts: "4.7k", trending: "Toàn quốc" }
    ];
    
    const popularPosts = [
      { 
        id: 1, 
        author: "Trần Quang", 
        username: "@quangtran",
        avatar: "/placeholders/avatar5.jpg",
        time: "2 giờ trước", 
        content: "Vừa ghé quán cà phê mới mở ở phố đi bộ. Không gian cực kỳ ấn tượng và cà phê thì ngon tuyệt! #CaPhe #HaNoi", 
        imageUrl: "/placeholders/coffee.jpg",
        likes: 234,
        comments: 45,
        shares: 12,
        liked: true
      },
      { 
        id: 2, 
        author: "Mai Phương", 
        username: "@phuongmai",
        avatar: "/placeholders/avatar6.jpg",
        time: "5 giờ trước", 
        content: "Cuối tuần này ai có kế hoạch gì chưa? Mình đang tính đi Sapa, thời tiết dự báo khá đẹp! #DuLich #Sapa #CuoiTuan", 
        imageUrl: "/placeholders/sapa.jpg",
        likes: 189,
        comments: 37,
        shares: 5,
        liked: false
      },
      { 
        id: 3, 
        author: "Hoàng Nam", 
        username: "@namhoang",
        avatar: "/placeholders/avatar7.jpg",
        time: "Hôm qua", 
        content: "Vừa trải nghiệm giao diện mới của app. Cảm thấy rất smooth và user-friendly. Các bạn thấy sao? #AppMoi #Review", 
        imageUrl: null,
        likes: 312,
        comments: 64,
        shares: 23,
        liked: false
      }
    ];

    let hideFooter = true;

  </script>
  
  <Container pageName="discover" hideFooter={hideFooter}>
    <div class="space-y-6">
      <!-- Page header -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold">{pageTitle}</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-1">Khám phá người dùng, xu hướng và nội dung hot</p>
      </div>
      
      <!-- Search bar -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div class="relative">
          <input 
            type="text" 
            class="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Tìm kiếm người dùng, hashtag, hoặc nội dung..." 
          />
          <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded-md text-sm">
            Tìm kiếm
          </button>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Suggested users section -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Gợi ý kết bạn</h2>
          <div class="space-y-4">
            {#each suggestedUsers as user}
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden"></div>
                  <div class="ml-3">
                    <p class="text-gray-900 dark:text-white font-medium">{user.name}</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">{user.username}</p>
                  </div>
                </div>
                {#if user.isFollowing}
                  <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    Đang theo dõi
                  </button>
                {:else}
                  <button class="px-3 py-1 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600">
                    Theo dõi
                  </button>
                {/if}
              </div>
            {/each}
          </div>
          <button class="mt-4 w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150">
            Xem thêm gợi ý
          </button>
        </div>
        
        <!-- Trending topics -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Xu hướng</h2>
          <div class="space-y-4">
            {#each trendingTopics as topic}
              <div class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                <h3 class="font-medium text-primary-600 dark:text-primary-400">{topic.tag}</h3>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span class="mr-3">{topic.posts} bài viết</span>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Thịnh hành tại: {topic.trending}</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <button class="mt-4 w-full py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition duration-150">
            Xem tất cả xu hướng
          </button>
        </div>
        
        <!-- Events section -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Sự kiện sắp diễn ra</h2>
          <div class="space-y-4">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-1 rounded-full">Hôm nay</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">20:00</span>
              </div>
              <h3 class="font-medium mt-2 text-gray-900 dark:text-white">Tech Meetup Hà Nội</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Gặp gỡ cộng đồng công nghệ tại Hà Nội, chia sẻ kinh nghiệm và networking.</p>
              <div class="flex items-center text-xs text-gray-500 mt-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Cầu Giấy, Hà Nội</span>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500">128 người tham gia</span>
                <button class="py-1 px-3 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600">
                  Tham gia
                </button>
              </div>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Ngày mai</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">09:30</span>
              </div>
              <h3 class="font-medium mt-2 text-gray-900 dark:text-white">Workshop Nhiếp ảnh</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Workshop chụp ảnh thiên nhiên cùng nhiếp ảnh gia Minh Trần.</p>
              <div class="flex items-center text-xs text-gray-500 mt-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Thảo Cầm Viên, TP.HCM</span>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-500">56 người tham gia</span>
                <button class="py-1 px-3 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600">
                  Tham gia
                </button>
              </div>
            </div>
          </div>
          <button class="mt-4 w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150">
            Xem tất cả sự kiện
          </button>
        </div>
      </div>
      
      <!-- Popular posts section -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Bài viết phổ biến</h2>
        <div class="space-y-6">
          {#each popularPosts as post}
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div class="p-4">
                <!-- Post header -->
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden"></div>
                  <div class="ml-3">
                    <div class="flex items-center">
                      <span class="text-gray-900 dark:text-white font-medium">{post.author}</span>
                      <span class="ml-1 text-gray-500 dark:text-gray-400 text-sm">{post.username}</span>
                    </div>
                    <p class="text-gray-500 dark:text-gray-400 text-xs">{post.time}</p>
                  </div>
                </div>
                
                <!-- Post content -->
                <div class="mt-3">
                  <p class="text-gray-800 dark:text-gray-200">{post.content}</p>
                  
                  {#if post.imageUrl}
                    <div class="mt-3 h-64 bg-gray-300 dark:bg-gray-600 rounded-lg overflow-hidden"></div>
                  {/if}
                </div>
                
                <!-- Post actions -->
                <div class="mt-4 flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <button class="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                        <svg class={`w-5 h-5 ${post.liked ? "text-primary-500" : ""}`} fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      <span>{post.likes}</span>
                    </button>
                    <button class="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      <span>{post.comments}</span>
                    </button>
                    <button class="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
        <div class="mt-6 flex justify-center">
          <button class="py-2 px-6 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition duration-150">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </div>
  </Container>