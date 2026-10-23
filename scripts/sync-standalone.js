// scripts/sync-standalone.js
// Idempotently copies public/ and .next/static into .next/standalone for Linux / Hostinger / Phusion Passenger
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.log('> [Nyeras Standalone Sync] .next/standalone directory not found. Skipping asset sync.');
  process.exit(0);
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true, errorOnExist: false });
}

// 1. Copy public assets into .next/standalone/public
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
if (fs.existsSync(publicSrc)) {
  copyDirRecursive(publicSrc, publicDest);
  console.log('> [Nyeras Standalone Sync] Copied public/ -> .next/standalone/public');
}

// 2. Copy .next/static assets into .next/standalone/.next/static
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  copyDirRecursive(staticSrc, staticDest);
  console.log('> [Nyeras Standalone Sync] Copied .next/static/ -> .next/standalone/.next/static');
}

console.log('> [Nyeras Standalone Sync] Asset synchronization completed.');
