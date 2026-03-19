import fs from 'fs';
const data = fs.readFileSync('src/data.ts', 'utf8');
console.log('Has \\\\n:', data.includes('\\\\n'));
console.log('Has \\n:', data.includes('\n'));
