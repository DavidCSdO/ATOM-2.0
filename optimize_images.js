const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const TERRA_TEXTURES_DIR = path.join(PUBLIC_DIR, 'Terra', 'textures');

async function optimizeImage(filePath, outputPath) {
  try {
    console.log(`Optimizing: ${filePath}`);
    const imgInfo = await sharp(filePath)
      .resize(8192, 8192, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Success! Original size: ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB, New size: ${(imgInfo.size / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function run() {
  const tasks = [];
  
  // NewBack.png
  const newBack = path.join(PUBLIC_DIR, 'NewBack.png');
  if (fs.existsSync(newBack)) {
    tasks.push(optimizeImage(newBack, path.join(PUBLIC_DIR, 'NewBack.webp')));
  }

  // Fundo 1.png
  const fundo1 = path.join(PUBLIC_DIR, 'Fundo 1.png');
  if (fs.existsSync(fundo1)) {
    tasks.push(optimizeImage(fundo1, path.join(PUBLIC_DIR, 'Fundo 1.webp')));
  }

  // Fundo 2.png
  const fundo2 = path.join(PUBLIC_DIR, 'Fundo 2.png');
  if (fs.existsSync(fundo2)) {
    tasks.push(optimizeImage(fundo2, path.join(PUBLIC_DIR, 'Fundo 2.webp')));
  }

  // Terra 2 textures
  if (fs.existsSync(TERRA_TEXTURES_DIR)) {
    const files = fs.readdirSync(TERRA_TEXTURES_DIR);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        const filePath = path.join(TERRA_TEXTURES_DIR, file);
        const outputPath = path.join(TERRA_TEXTURES_DIR, file.replace(/\.(png|jpe?g)$/i, '.webp'));
        tasks.push(optimizeImage(filePath, outputPath));
      }
    }
  }

  await Promise.all(tasks);
  console.log('All optimizations finished.');
}

run();
