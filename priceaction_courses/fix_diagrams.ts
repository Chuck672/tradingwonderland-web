import * as fs from 'fs';

let content = fs.readFileSync('src/components/Diagrams.tsx', 'utf8');

const m10Start = content.indexOf("case 'm10-mistakes':");
const m11Start = content.indexOf("case 'm11-");

let beforeM10 = content.substring(0, m10Start);
let m10Content = m11Start !== -1 ? content.substring(m10Start, m11Start) : content.substring(m10Start);
let afterM10 = m11Start !== -1 ? content.substring(m11Start) : '';

// 1. Remove titles:
// Match <text ... y="40" ...> ... </text>
m10Content = m10Content.replace(/<text[^>]*y="40"[^>]*>[\s\S]*?<\/text>\s*/g, '');

// 2. Change viewBox="0 0 600 300" to viewBox="0 40 600 260" to crop the top empty space.
m10Content = m10Content.replace(/viewBox="0 0 600 300"/g, 'viewBox="0 40 600 260"');
m10Content = m10Content.replace(/viewBox="0 0 600 400"/g, 'viewBox="0 40 600 360"');

fs.writeFileSync('src/components/Diagrams.tsx', beforeM10 + m10Content + afterM10);
