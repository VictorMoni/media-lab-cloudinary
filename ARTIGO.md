# From Original Images to Responsive Delivery: A Lab with Next.js and Cloudinary

The same image can appear in a card, a gallery, or a portrait layout. Delivering the original file in every context deserves a closer look: the dimensions and crop each interface needs can be different.

Media Lab explores this problem through a small Next.js learning project built with Codex assistance. Its purpose is to make image delivery decisions visible by letting you switch between an original image URL and a Cloudinary transformation URL.

## A small, observable experiment

The lab includes a gallery of four public Cloudinary sample images. Select an image, switch between landscape, square, and portrait crops, choose a delivery width, and inspect the resulting URL.

A separate form lets you try a public image from another Cloudinary cloud by entering a cloud name and Public ID. It does not upload files or require an API secret. The asset must be publicly accessible and allow the requested transformations.

The project is a learning experiment rather than a production storefront or client engagement.

## The transformation is in the URL

A landscape variant with a delivery width of 640 pixels uses this structure:

```text
https://res.cloudinary.com/demo/image/upload/c_fill,g_auto,w_640,h_427/q_auto/f_auto/sample
```

Each part represents a delivery decision:

- `c_fill` fills the requested dimensions, cropping when necessary.
- `g_auto` uses automatic gravity to guide the crop.
- `w_640,h_427` defines the dimensions of the variant.
- `q_auto` adjusts quality automatically.
- `f_auto` negotiates an appropriate format based on the requesting browser.

Quality and format use separate URL components, as described in the [Cloudinary image optimization documentation](https://cloudinary.com/documentation/image_optimization).

In Original mode, the URL includes none of these transformations. CSS still controls its displayed size, so the space an image occupies on the page should not be confused with the dimensions of the delivered file.

## Centralizing delivery decisions

The `lib/cloudinary.mjs` module builds image URLs and limits delivery widths to five options: 320, 480, 640, 960, and 1280 pixels. This avoids generating an unlimited number of variants for every small interface adjustment.

The function also encodes Public ID segments while preserving folder separators and validates the cloud name before assembling a URL.

Here is an example from the project:

```js
imageUrl({
  cloud: 'demo',
  publicId: 'sample',
  width: 640,
  shape: 'portrait',
});
```

This requests a 640 × 800 pixel variant with automatic crop positioning, quality, and format selection.

## Responsive delivery and comparison serve different purposes

The comparison panel requests a fixed width. This makes it possible to inspect a particular variant and see how each setting changes the URL.

The gallery cards use `srcSet` and `sizes` instead. The browser receives several width candidates and selects one based on the available display space and pixel density.

Images are delivered directly from Cloudinary through `<img>` elements, without an additional Next.js image optimization layer. Alternative text, lazy loading in the gallery, and image error messages complete the basic experience.

## What was checked

During assisted development, Codex ran five automated tests covering URL generation and completed a production build successfully. Browser checks confirmed that the four sample images loaded and that switching to a portrait crop or the original version updated the URL and displayed dimension information.

These checks cover parts of the implementation. They do not establish a performance improvement in a production application or prove that every crop is appropriate on every device.

## Measuring the next step

The lab does not display estimated savings percentages. To report quantitative results, open the browser Network tab, disable caching, and record the transferred size and actual response format for each variant.

Record the image dimensions too. Comparing a large original with a small cropped variant measures the combined effects of resizing, cropping, and optimization. Attributing the entire difference to compression would be misleading.

Response times need similar care. Network conditions, caching, and the first generation of a transformation can affect a measurement.

## Making image delivery decisions visible

Working with media involves decisions about interface design, dimensions, cropping, and delivery. This example brings those decisions into a small interactive page, with URLs that can be inspected and opened separately.

The next step is to try original assets, evaluate the crops, and record reproducible measurements. That provides a foundation for a more personal account of the choices made and the results observed while using the project.

### References

- [Cloudinary image transformations](https://cloudinary.com/documentation/image_transformations)
- [Cloudinary image optimization](https://cloudinary.com/documentation/image_optimization)
- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)

*Project and article prepared with Codex assistance. Before publishing, review the description, run the project, and add your own observations. No performance results have been fabricated.*
