# Media Lab — Cloudinary + Next.js

A learning project built with Codex assistance: a responsive gallery and an interactive lab for comparing original and transformed Cloudinary image URLs. It uses public images from the `demo` cloud by default. No uploads, authentication, or secret keys are included.

## Run locally

Requires Node.js 20.9 or newer and an internet connection.

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Run `npm run build` to check the production build and `npm test` to test URL generation.

## Try the lab

1. Select an image from the gallery.
2. Switch between Original and Optimized.
3. Change the crop shape and delivery width. Inspect the URL parameters.
4. Open the image in a new tab or copy its URL.
5. To try your own asset, enter its cloud name and Public ID. Use a public Cloudinary asset with the requested transformations allowed. Do not enter an API secret.

The lab requests a fixed width to make individual variants easy to inspect. The gallery uses `srcSet` and `sizes` for responsive selection by the browser. Images are delivered directly from Cloudinary using `<img>`, without a second Next.js optimization layer.

`c_fill,g_auto,w_...,h_...` controls cropping and dimensions; `q_auto` adjusts quality; `f_auto` selects a format based on the browser. Original mode includes no transformations, but CSS still scales its display. The two modes can have different crops.

## Measure actual results

Open your browser developer tools and the Network tab. Disable caching, filter image requests, reload, and record the requested URL, transferred size, Content-Type, viewport, and pixel density. Compare the same original image with an optimized variant and record both sets of dimensions: a smaller file may reflect resizing or cropping as well as compression.

This project does not calculate or promise byte savings or faster load times. Timing varies with the network, caching, and initial transformation generation. Remote images and fonts require internet access; system fonts provide a fallback.

## Prepare the article

The English article draft is in `ARTIGO.md`. Run the project, make your own choices, try your own images, and record what you observe before publishing. Describe Codex assistance where relevant. Do not present this as a production system or client engagement. Publishing the example does not guarantee acceptance into the Cloudinary Creator program.

## References

- https://cloudinary.com/documentation/image_transformations
- https://cloudinary.com/documentation/image_optimization
- https://nextjs.org/docs/app/getting-started/installation
