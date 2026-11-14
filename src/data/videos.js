// Put media files in public/videos. The hero falls back to its built-in poster
// if the configured video is missing or cannot play.
export const heroVideo = {
  id: 'hero',
  label: 'Salon introduction',
  src: '/videos/video-4.mp4',
  mobileSrc: '',
  poster: '/ijo-hero-poster.svg',
  mobilePoster: '',
  aspect: 'portrait',
  autoplay: true,
  loop: true,
  muted: true,
  playsInline: true,
  preload: 'metadata',
};

// The gallery plays videos inline. Sources load only as each video approaches view.
export const videos = [
  { id: 'salon-film-one', label: 'IJO salon film', src: '/videos/video-1.mp4', aspect: 'landscape' },
  { id: 'salon-film-two', label: 'IJO salon film', src: '/videos/video-2.mp4', aspect: 'portrait' },
  { id: 'salon-film-three', label: 'IJO salon film', src: '/videos/video-3.mp4', aspect: 'portrait' },
  { id: 'salon-film-four', label: 'IJO salon film', src: '/videos/video-4.mp4', aspect: 'portrait' },
  { id: 'salon-film-five', label: 'IJO salon film', src: '/videos/video-5.mp4', aspect: 'portrait' },
  { id: 'salon-film-six', label: 'IJO salon film', src: '/videos/video-6.mp4', aspect: 'portrait' },
];
