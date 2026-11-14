# IJO House of Beauty

A responsive React + Vite website for IJO House of Beauty Unisex Salon.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Add the campaign hero video

Edit `heroVideo` in [src/data/videos.js](src/data/videos.js). Put media in `public/videos/`; paths in the configuration start with `/`.

```js
{
  src: '/videos/video-4.mp4',
  mobileSrc: '/videos/ijo-campaign-portrait.mp4',
}
```

The hero plays muted, loops inline, and uses the portrait source on viewports up to 720px when supplied. It shows `/ijo-hero-poster.svg` if the video is missing or cannot play. Visitors who prefer reduced motion see the poster without autoplay.

## Gallery videos

The same file contains six inline video entries. Set each `src` to a file in `public/videos/`. For example:

```js
{ id: 'salon-film-one', label: 'IJO salon film', src: '/videos/style-one.mp4', aspect: 'portrait' }
```

Use `aspect: 'portrait'` or `aspect: 'landscape'` to shape the gallery. Videos load as they approach the viewport and play only when a visitor presses the native video controls.

## Business details

Edit the display phone, international WhatsApp number and pre-filled booking message in [src/data/business.js](src/data/business.js). Edit the Instagram profile and operating days there too.
