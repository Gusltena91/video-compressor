// Module worker proxy - imports the actual FFmpeg worker from CDN
// This file must be same-origin (in the repo) to avoid cross-origin Worker errors
import 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/worker.js';
