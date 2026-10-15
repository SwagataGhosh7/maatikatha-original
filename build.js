const { execSync } = require('child_process');
const path = require('path');

const rootDir = __dirname;
const serverDir = path.join(rootDir, 'server');
const clientDir = path.join(rootDir, 'client');

const env = { ...process.env, NODE_ENV: 'development' };
delete env.npm_config_allow_scripts;

console.log('📦 [1/3] Installing backend dependencies...');
execSync('npm install --production=false', { cwd: serverDir, stdio: 'inherit', env });

console.log('📦 [2/3] Installing frontend dependencies (including Vite)...');
execSync('npm install --production=false', { cwd: clientDir, stdio: 'inherit', env });

console.log('⚡ [3/3] Building frontend client with Vite...');
execSync('npm run build', { cwd: clientDir, stdio: 'inherit', env });

console.log('✅ Full-stack build completed successfully!');
