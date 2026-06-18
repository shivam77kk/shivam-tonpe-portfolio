export const caseStudies = [
  {
    id: 'sensei-ultra',
    title: 'Sensei Ultra',
    tagline: 'Adaptive Campus Automation Platform',
    category: 'EdTech · AI',
    duration: '3 months',
    role: 'Solo Full Stack Developer',
    year: '2024–2025',
    gradient: 'from-violet-600 to-blue-500',
    
    problem: {
      headline: 'Universities across India sit on mountains of unused student data.',
      body: `Institutions track attendance, grades, and basic demographics — but none of this data connects. Students silently fall behind, faculty can't identify who needs help, and administrators react to dropout crises weeks too late. The systems exist, but don't think.`
    },
    
    solution: {
      headline: 'An AI-powered campus intelligence layer.',
      body: `Sensei Ultra plugs into existing institutional data and applies LangGraph.js multi-agent reasoning to generate personalized interventions. Students get adaptive study plans and "Quizo" testing. Faculty get early-warning flags. Admins see real-time cohort health dashboards. Everyone gets smarter.`,
      techStack: ['Next.js 15', 'Node.js', 'MongoDB', 'LangGraph.js', 'Google Gemini API', 'Socket.io', 'Flutter', 'Tailwind CSS']
    },
    
    challenges: [
      'Designing multi-agent state machines that don\'t loop infinitely — solved with explicit termination conditions and max-step guards in LangGraph.',
      'Real-time bidirectional updates across student, faculty, and admin dashboards without a dedicated WebSocket infrastructure — solved with Socket.io rooms architecture.',
      'Making AI-generated study plans actually useful (not generic) — solved by feeding per-student backlog, CGPA trend, and subject history into the prompt context.'
    ],
    
    impact: [
      { metric: '60%', label: 'Faster study plan generation vs manual' },
      { metric: '3',   label: 'Distinct user personas served' },
      { metric: '5+',  label: 'AI agents coordinating per query' },
      { metric: '1',   label: 'Unified platform replacing 4 tools' }
    ],
    
    githubUrl: 'https://github.com/shivam77kk',
    liveUrl: null,
  },
  
  {
    id: 'edu-ultra',
    title: 'Edu-Ultra',
    tagline: 'AI Learning Hub',
    category: 'EdTech · LLM',
    duration: '6 weeks',
    role: 'Full Stack Developer',
    year: '2024',
    gradient: 'from-blue-500 to-cyan-400',
    
    problem: {
      headline: 'Students waste hours consuming YouTube lectures with zero retention.',
      body: `Indian students rely heavily on YouTube for exam prep — but passive video watching without structure creates an illusion of learning. There was no tool that could take a 2-hour lecture, extract what matters, and immediately test comprehension.`
    },
    
    solution: {
      headline: 'Turn any YouTube video into a complete learning package.',
      body: `Edu-Ultra ingests YouTube URLs, transcribes the content via the YouTube Data API, and runs it through Gemini API pipelines to generate: summaries, flashcard decks, MCQ quizzes, and debate simulations. A LangGraph.js doubt-solving agent handles follow-up questions in context.`,
      techStack: ['React.js', 'Node.js', 'Express.js', 'LangGraph.js', 'Google Gemini API', 'YouTube Data API', 'MongoDB']
    },
    
    challenges: [
      'YouTube transcript quality varies wildly — solved by post-processing with Gemini to clean and restructure before downstream tasks.',
      'Debate simulation needed two AI personas arguing opposing positions simultaneously — solved with parallel LangGraph branches and shared state.',
      'Keeping the doubt-solving agent in context across multi-turn conversations without re-sending the full video transcript every time — solved with summary compression in system prompt.'
    ],
    
    impact: [
      { metric: '80%', label: 'Time saved in note-making' },
      { metric: '3x',  label: 'Quiz generation speed vs manual' },
      { metric: '1',   label: 'URL → full study pack (< 30 seconds)' },
      { metric: '∞',   label: 'Any YouTube video supported' }
    ],
    
    githubUrl: 'https://github.com/shivam77kk',
    liveUrl: null,
  },
  
  {
    id: 'trivo',
    title: 'Trivo (Jhaad-Lagao-Bidhu)',
    tagline: 'AI Reforestation Platform',
    category: 'Climate · AI · Social Impact',
    duration: '4 weeks',
    role: 'Full Stack Developer (Hackathon)',
    year: '2024',
    gradient: 'from-green-500 to-emerald-400',
    
    problem: {
      headline: 'Plantation drives in India fail because wrong trees get planted in wrong places.',
      body: `India runs hundreds of government and NGO plantation drives annually — but survival rates are low. Teams plant what's convenient, not what thrives in local soil + climate conditions. Real-time weather, historical climate data, and species compatibility are never consulted together.`
    },
    
    solution: {
      headline: 'Real-time AI plant intelligence, right where you\'re planting.',
      body: `Trivo takes a GPS location and instantly queries OpenWeather API for real-time climate conditions. Gemini + Groq AI analyze soil type estimates, rainfall patterns, temperature ranges, and indigenous species databases to recommend the top 5 plants most likely to survive. Includes care alerts and seasonal maintenance schedules.`,
      techStack: ['Node.js', 'Express.js', 'Next.js', 'Three.js Globe', 'Google Gemini API', 'Groq API', 'OpenWeather API', 'LangGraph.js', 'MongoDB']
    },
    
    challenges: [
      'Combining real-time weather, historical climate averages, and AI reasoning in one coherent recommendation — solved with a multi-step LangGraph pipeline that chains data gathering → analysis → recommendation.',
      'Making the globe visualization (Three.js) feel purposeful rather than decorative — solved by linking plotted locations to actual plantation records in the database.',
      'Hackathon time constraint (72 hours) — solved by having the LangGraph architecture planned before coding started, separating data collection from AI reasoning cleanly.'
    ],
    
    impact: [
      { metric: '5',   label: 'Personalized plant recommendations per location' },
      { metric: '3',   label: 'AI models consulted per recommendation' },
      { metric: '1',   label: 'Interactive globe showing plantation activity' },
      { metric: '🌱',  label: 'Real environmental impact potential' }
    ],
    
    githubUrl: 'https://github.com/shivam77kk',
    liveUrl: null,
  }
];
