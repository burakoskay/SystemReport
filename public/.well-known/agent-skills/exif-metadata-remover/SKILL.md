# EXIF Metadata Remover

Strip GPS coordinates, camera model, timestamps, and other EXIF metadata from images using [System Report's EXIF tool](https://www.systemreport.net/tools/exif-stripper/).

## How It Works

1. Navigate to `https://www.systemreport.net/tools/exif-stripper/`
2. Drop or select JPEG, PNG, or WebP images
3. The tool strips all EXIF metadata client-side using JavaScript
4. Download the cleaned images

## Privacy

- **100% client-side** — images are processed entirely in the browser
- **Zero uploads** — no image data is ever transmitted to any server
- **No tracking** — no cookies, no analytics on the tool page
- Works offline once the page is loaded

## Supported Formats

| Format | Read | Write | Max Size |
|--------|------|-------|----------|
| JPEG   | ✅   | ✅    | Browser memory limit |
| PNG    | ✅   | ✅    | Browser memory limit |
| WebP   | ✅   | ✅    | Browser memory limit |

## What Gets Removed

- GPS coordinates (latitude, longitude, altitude)
- Camera make and model
- Date/time taken
- Lens information
- Software version
- Orientation data
- Thumbnail images
- All other EXIF, IPTC, and XMP metadata

## Localization

The tool is available in 11 languages at `/{locale}/tools/exif-stripper/`:
`en`, `tr`, `es`, `fr`, `de`, `ja`, `zh-CN`, `ko`, `pt`, `it`, `ar`

## Programmatic Access

This tool runs in the browser and cannot be called as a REST API. To use it programmatically, navigate a browser (headless or otherwise) to the tool URL and interact with the DOM.
