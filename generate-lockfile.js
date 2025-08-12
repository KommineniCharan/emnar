#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('Generating package-lock.json...');

try {
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    console.error('package.json not found!');
    process.exit(1);
  }

  // Generate package-lock.json
  execSync('npm install --package-lock-only', { stdio: 'inherit' });
  
  console.log('✅ package-lock.json generated successfully!');
} catch (error) {
  console.error('❌ Error generating package-lock.json:', error.message);
  process.exit(1);
}
