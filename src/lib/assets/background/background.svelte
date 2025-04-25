<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
    <!-- Background gradient -->
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8f5ff" />
        <stop offset="100%" stop-color="#f0e6ff" />
      </linearGradient>
      
      <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c27cff" />
        <stop offset="100%" stop-color="#b14aff" />
      </linearGradient>
  
      <!-- Message bubble pattern -->
      <pattern id="messagePattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
        <!-- Chat bubble 1 -->
        <path d="M4,4 q0,-1.5 1.5,-1.5 h6 q1.5,0 1.5,1.5 v3 q0,1.5 -1.5,1.5 h-1 l-1,2 v-2 h-4 q-1.5,0 -1.5,-1.5 z" 
              fill="#b14aff" fill-opacity="0.1" stroke="white" stroke-opacity="0.5" stroke-width="0.1" />
        
        <!-- Chat bubble 2 -->
        <path d="M16,12 q0,-1.5 1.5,-1.5 h6 q1.5,0 1.5,1.5 v3 q0,1.5 -1.5,1.5 h-4 l-1,2 v-2 h-1 q-1.5,0 -1.5,-1.5 z" 
              fill="#b14aff" fill-opacity="0.1" stroke="white" stroke-opacity="0.5" stroke-width="0.1" />
        
        <!-- Chat bubble 3 -->
        <path d="M6,18 q0,-1.5 1.5,-1.5 h5 q1.5,0 1.5,1.5 v2.5 q0,1.5 -1.5,1.5 h-1 l-1,1.5 v-1.5 h-3 q-1.5,0 -1.5,-1.5 z" 
              fill="#b14aff" fill-opacity="0.1" stroke="white" stroke-opacity="0.5" stroke-width="0.1" />
      </pattern>
  
      <!-- Circular message icon pattern -->
      <pattern id="circlePattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <!-- Message icon 1 -->
        <g transform="translate(4,4)">
          <circle cx="0" cy="0" r="1.2" fill="#b14aff" fill-opacity="0.15" />
          <path d="M-0.6,-0.4 h1.2 a0.2,0.2 0 0 1 0.2,0.2 v0.4 a0.2,0.2 0 0 1 -0.2,0.2 h-1.2 a0.2,0.2 0 0 1 -0.2,-0.2 v-0.4 a0.2,0.2 0 0 1 0.2,-0.2 z" fill="white" fill-opacity="0.5" />
        </g>
        
        <!-- Message icon 2 -->
        <g transform="translate(12,8)">
          <circle cx="0" cy="0" r="1" fill="#b14aff" fill-opacity="0.15" />
          <path d="M-0.5,-0.3 h1 a0.15,0.15 0 0 1 0.15,0.15 v0.3 a0.15,0.15 0 0 1 -0.15,0.15 h-1 a0.15,0.15 0 0 1 -0.15,-0.15 v-0.3 a0.15,0.15 0 0 1 0.15,-0.15 z" fill="white" fill-opacity="0.5" />
        </g>
        
        <!-- Message icon 3 -->
        <g transform="translate(6,12)">
          <circle cx="0" cy="0" r="0.8" fill="#b14aff" fill-opacity="0.15" />
          <path d="M-0.4,-0.25 h0.8 a0.1,0.1 0 0 1 0.1,0.1 v0.3 a0.1,0.1 0 0 1 -0.1,0.1 h-0.8 a0.1,0.1 0 0 1 -0.1,-0.1 v-0.3 a0.1,0.1 0 0 1 0.1,-0.1 z" fill="white" fill-opacity="0.5" />
        </g>
      </pattern>
      
      <!-- T icon pattern -->
      <pattern id="tPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <g font-family="cursive" font-size="2" fill="white" fill-opacity="0.4">
          <text x="4" y="4">T</text>
          <text x="12" y="12">T</text>
          <text x="16" y="4">T</text>
          <text x="6" y="16">T</text>
        </g>
      </pattern>
    </defs>
    
    <!-- Main background - using the purple gradient as base -->
    <rect width="100%" height="100%" fill="url(#purpleGradient)" />
    
    <!-- Message patterns that fill the entire background -->
    <rect width="100%" height="100%" fill="url(#messagePattern)" />
    <rect width="100%" height="100%" fill="url(#circlePattern)" />
    <rect width="100%" height="100%" fill="url(#tPattern)" />
    
    <!-- Additional standalone message icons scattered throughout -->
    <g>
      <!-- Message bubbles -->
      <path d="M25,16 q0,-1.6 1.6,-1.6 h8 q1.6,0 1.6,1.6 v5 q0,1.6 -1.6,1.6 h-1.6 l-1.6,2.4 v-2.4 h-4.8 q-1.6,0 -1.6,-1.6 z" 
            fill="#b14aff" fill-opacity="0.15" stroke="white" stroke-opacity="0.6" stroke-width="0.12" />
            
      <path d="M66,25 q0,-1.6 1.6,-1.6 h8 q1.6,0 1.6,1.6 v5 q0,1.6 -1.6,1.6 h-4.8 l-1.6,2.4 v-2.4 h-1.6 q-1.6,0 -1.6,-1.6 z" 
            fill="#b14aff" fill-opacity="0.15" stroke="white" stroke-opacity="0.6" stroke-width="0.12" />
            
      <path d="M42,42 q0,-1.6 1.6,-1.6 h6.4 q1.6,0 1.6,1.6 v3.2 q0,1.6 -1.6,1.6 h-1.2 l-1.2,2 v-2 h-4 q-1.6,0 -1.6,-1.6 z" 
            fill="#b14aff" fill-opacity="0.15" stroke="white" stroke-opacity="0.6" stroke-width="0.12" />
            
      <path d="M83,50 q0,-1.6 1.6,-1.6 h6.4 q1.6,0 1.6,1.6 v3.2 q0,1.6 -1.6,1.6 h-4 l-1.2,2 v-2 h-1.2 q-1.6,0 -1.6,-1.6 z" 
            fill="#b14aff" fill-opacity="0.15" stroke="white" stroke-opacity="0.6" stroke-width="0.12" />
    </g>
    
    <!-- Larger message icons scattered around -->
    <g>
      <!-- Message icon groups -->
      <g transform="translate(16,33)">
        <circle cx="0" cy="0" r="2" fill="#b14aff" fill-opacity="0.2" />
        <path d="M-1,-0.6 h2 a0.25,0.25 0 0 1 0.25,0.25 v0.8 a0.25,0.25 0 0 1 -0.25,0.25 h-2 a0.25,0.25 0 0 1 -0.25,-0.25 v-0.8 a0.25,0.25 0 0 1 0.25,-0.25 z" fill="white" fill-opacity="0.5" />
        <line x1="-0.6" y1="0" x2="0.6" y2="0" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
        <line x1="-0.6" y1="0.4" x2="0.2" y2="0.4" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
      </g>
      
      <g transform="translate(58,16)">
        <circle cx="0" cy="0" r="2" fill="#b14aff" fill-opacity="0.2" />
        <path d="M-1,-0.6 h2 a0.25,0.25 0 0 1 0.25,0.25 v0.8 a0.25,0.25 0 0 1 -0.25,0.25 h-2 a0.25,0.25 0 0 1 -0.25,-0.25 v-0.8 a0.25,0.25 0 0 1 0.25,-0.25 z" fill="white" fill-opacity="0.5" />
        <line x1="-0.6" y1="0" x2="0.6" y2="0" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
        <line x1="-0.6" y1="0.4" x2="0.2" y2="0.4" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
      </g>
      
      <g transform="translate(75,42)">
        <circle cx="0" cy="0" r="2" fill="#b14aff" fill-opacity="0.2" />
        <path d="M-1,-0.6 h2 a0.25,0.25 0 0 1 0.25,0.25 v0.8 a0.25,0.25 0 0 1 -0.25,0.25 h-2 a0.25,0.25 0 0 1 -0.25,-0.25 v-0.8 a0.25,0.25 0 0 1 0.25,-0.25 z" fill="white" fill-opacity="0.5" />
        <line x1="-0.6" y1="0" x2="0.6" y2="0" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
        <line x1="-0.6" y1="0.4" x2="0.2" y2="0.4" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
      </g>
      
      <g transform="translate(29,54)">
        <circle cx="0" cy="0" r="2" fill="#b14aff" fill-opacity="0.2" />
        <path d="M-1,-0.6 h2 a0.25,0.25 0 0 1 0.25,0.25 v0.8 a0.25,0.25 0 0 1 -0.25,0.25 h-2 a0.25,0.25 0 0 1 -0.25,-0.25 v-0.8 a0.25,0.25 0 0 1 0.25,-0.25 z" fill="white" fill-opacity="0.5" />
        <line x1="-0.6" y1="0" x2="0.6" y2="0" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
        <line x1="-0.6" y1="0.4" x2="0.2" y2="0.4" stroke="white" stroke-opacity="0.7" stroke-width="0.15" />
      </g>
    </g>
    
    <!-- Message dots connecting lines -->
    <g stroke="white" stroke-width="0.08" stroke-opacity="0.4">
      <line x1="16" y1="16" x2="33" y2="25" />
      <line x1="33" y1="25" x2="50" y2="16" />
      <line x1="50" y1="16" x2="66" y2="25" />
      <line x1="66" y1="25" x2="83" y2="16" />
      
      <line x1="16" y1="50" x2="33" y2="42" />
      <line x1="33" y1="42" x2="50" y2="50" />
      <line x1="50" y1="50" x2="66" y2="42" />
      <line x1="66" y1="42" x2="83" y2="50" />
    </g>
    
    <!-- Additional white message icons -->
    <g fill="white" fill-opacity="0.4">
      <!-- Simple chat bubble icons -->
      <path d="M10,29 q0,-1.2 1.2,-1.2 h5 q1.2,0 1.2,1.2 v2.4 q0,1.2 -1.2,1.2 h-0.8 l-0.8,1.2 v-1.2 h-3.4 q-1.2,0 -1.2,-1.2 z" />
      <path d="M54,12 q0,-1.2 1.2,-1.2 h5 q1.2,0 1.2,1.2 v2.4 q0,1.2 -1.2,1.2 h-3.4 l-0.8,1.2 v-1.2 h-0.8 q-1.2,0 -1.2,-1.2 z" />
      <path d="M35,58 q0,-1.2 1.2,-1.2 h5 q1.2,0 1.2,1.2 v2.4 q0,1.2 -1.2,1.2 h-0.8 l-0.8,1.2 v-1.2 h-3.4 q-1.2,0 -1.2,-1.2 z" />
      <path d="M79,8 q0,-1.2 1.2,-1.2 h5 q1.2,0 1.2,1.2 v2.4 q0,1.2 -1.2,1.2 h-3.4 l-0.8,1.2 v-1.2 h-0.8 q-1.2,0 -1.2,-1.2 z" />
      
      <!-- Envelope icons -->
      <g transform="translate(21,8)">
        <rect x="-1.2" y="-0.8" width="2.4" height="1.6" rx="0.15" ry="0.15" />
        <path d="M-1.2,-0.8 L0,0.4 L1.2,-0.8" />
        <path d="M-1.2,0.8 L0,-0.4 L1.2,0.8" />
      </g>
      
      <g transform="translate(71,54)">
        <rect x="-1.2" y="-0.8" width="2.4" height="1.6" rx="0.15" ry="0.15" />
        <path d="M-1.2,-0.8 L0,0.4 L1.2,-0.8" />
        <path d="M-1.2,0.8 L0,-0.4 L1.2,0.8" />
      </g>
      
      <g transform="translate(46,29)">
        <rect x="-1.2" y="-0.8" width="2.4" height="1.6" rx="0.15" ry="0.15" />
        <path d="M-1.2,-0.8 L0,0.4 L1.2,-0.8" />
        <path d="M-1.2,0.8 L0,-0.4 L1.2,0.8" />
      </g>
    </g>
  </svg>