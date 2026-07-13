// Local proxy for FFmpeg class worker - avoids cross-origin Worker restriction
// The actual code is loaded from CDN via importScripts (which allows cross-origin)
importScripts('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/umd/814.ffmpeg.js');
