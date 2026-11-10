export interface TheliosLink {
  label: string
  href: string
}

export interface TheliosFeature {
  tag: string
  title: string
  body: string
  href: string
}

export interface TheliosProduct {
  id: string
  name: string
  blurb: string
  cta: string
  icon: 'copilot' | 'analysis' | 'dataset'
}

export interface TheliosStep {
  number: string
  title: string
  body: string
}

export interface TheliosPrinciple {
  word: string
  body: string
}

export const THELIOS = {
  brand: 'Thelios.AI',
  tagline: 'AI-powered Computer Vision to transform Decision Making',
  nav: [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Industries', href: '#industries' },
    { label: 'Products', href: '#products' },
    { label: 'Company', href: '#company' },
    { label: 'Blogs', href: 'https://www.thelios.ai/blogs/' },
  ] satisfies TheliosLink[],
  links: {
    contact: 'https://thelios.ai/contact-us?ref=home',
    privacy: 'https://thelios.ai/thelios-ai-privacy-policy/',
    terms: 'https://thelios.ai/thelios-ai-terms-of-service',
  },
  hero: {
    headlineLeft: 'Visual Copilot',
    headlineRight: 'for Sports',
    subheadline: 'AI-powered Computer Vision to transform Decision Making. Our Visual Copilot generates real-time insights from video & images.',
  },
  ticker: ['Visual Copilot', 'Sports analytics', 'No-code workflow', 'Real-time insights', 'Structured datasets', 'Baseball analytics'],
  features: [
    {
      tag: 'Sports',
      title: 'Automated game and player tracking from video',
      body: 'No special cameras or wearable devices required.',
      href: '#industries',
    },
    {
      tag: 'Analysis',
      title: 'Custom analysis that aligns with your goals',
      body: 'Define visual criteria and build a unique dataset for evaluating performance and predicting success.',
      href: '#solutions',
    },
    {
      tag: 'Coming soon',
      title: 'Gear up for game-changing Baseball Analytics',
      body: 'The next Visual Copilot experience is built for the diamond.',
      href: '#roadmap',
    },
  ] satisfies TheliosFeature[],
  products: [
    {
      id: 'copilot',
      name: 'Visual Copilot',
      blurb: 'Generate real-time insights from video and images, then turn visual data into better decisions.',
      cta: 'Explore solutions',
      icon: 'copilot',
    },
    {
      id: 'analysis',
      name: 'Custom analysis',
      blurb: 'Configure the visual analysis criteria that matter to your team, your sport, and your goals.',
      cta: 'See custom analysis',
      icon: 'analysis',
    },
    {
      id: 'dataset',
      name: 'Structured datasets',
      blurb: 'Consume clear visual layouts and structured datasets that integrate with the tools you already use.',
      cta: 'View the workflow',
      icon: 'dataset',
    },
  ] satisfies TheliosProduct[],
  capabilities: [
    { value: 'No-Code Solution', label: 'Make visual intelligence accessible', body: 'An intuitive interface that requires no technical expertise.' },
    { value: 'Cloud-based', label: 'Compute without infrastructure', body: 'Access powerful computing resources and storage in the cloud.' },
    { value: 'Precise', label: 'Track the details that matter', body: 'Identify small objects and their interactions with precision and granularity.' },
  ],
  steps: [
    { number: '01', title: 'Bring the video', body: 'Start with the game footage and visual data your team already has.' },
    { number: '02', title: 'Configure the view', body: 'Define the visual analysis criteria that align with your objectives.' },
    { number: '03', title: 'Decide with context', body: 'Turn real-time insights into visual layouts and structured datasets.' },
  ] satisfies TheliosStep[],
  principles: [
    { word: 'See More', body: 'Computer vision can reveal the small objects, motion, and interactions that are easy to miss in a fast-moving game.' },
    { word: 'Work Smarter', body: 'A no-code, configurable workflow lets coaches, analysts, and knowledge visualists spend more time on decisions.' },
    { word: 'Move Forward', body: 'Thelios turns visual data into a goldmine for evaluating performance and predicting success.' },
  ] satisfies TheliosPrinciple[],
  media: {
    logo: '/logo.svg',
    heroImage: 'https://www.thelios.ai/wp-content/uploads/2024/10/hero.svg',
    heroVideo: 'https://www.thelios.ai/wp-content/uploads/2026/02/demo_video_nba.mp4',
    sportsVideo: 'https://thelios.ai/wp-content/uploads/2024/10/nfl.mp4',
    volleyballVideo: 'https://thelios.ai/wp-content/uploads/2024/10/volleyball.mp4',
    desktop: 'https://www.thelios.ai/wp-content/uploads/2024/10/hero.svg',
    tablet: 'https://www.thelios.ai/wp-content/uploads/2024/10/hero.svg',
    team: 'https://www.thelios.ai/wp-content/uploads/2024/10/hero.svg',
  },
  footer: {
    description: 'Thelios.AI uses AI-powered computer vision to transform decision-making with real-time insights from video and images.',
    groups: [
      { title: 'Explore', links: [{ label: 'Solutions', href: '#solutions' }, { label: 'Industries', href: '#industries' }, { label: 'Products', href: '#products' }] },
      { title: 'Learn', links: [{ label: 'Blogs', href: 'https://www.thelios.ai/blogs/' }, { label: 'Contact Us', href: 'https://thelios.ai/contact-us?ref=home' }] },
    ] satisfies { title: string; links: TheliosLink[] }[],
    legal: [
      { label: 'Privacy Policy', href: 'https://thelios.ai/thelios-ai-privacy-policy/' },
      { label: 'Terms & Conditions', href: 'https://thelios.ai/thelios-ai-terms-of-service' },
    ] satisfies TheliosLink[],
  },
} as const
