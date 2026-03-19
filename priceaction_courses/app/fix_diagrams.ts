import * as fs from 'fs';

let content = fs.readFileSync('src/components/Diagrams.tsx', 'utf8');

const m10Start = content.indexOf("case 'm10-mistakes':");
console.log("m10Start:", m10Start);

let beforeM10 = content.substring(0, m10Start);
let m10Content = content.substring(m10Start);

console.log("Before replace length:", m10Content.length);

m10Content = m10Content.replace(/<text[^>]*y="40"[^>]*>[\s\S]*?<\/text>\s*/g, '');
m10Content = m10Content.replace(/viewBox="0 0 600 300"/g, 'viewBox="0 40 600 260"');
m10Content = m10Content.replace(/viewBox="0 0 600 400"/g, 'viewBox="0 40 600 360"');

console.log("After replace length:", m10Content.length);

fs.writeFileSync('src/components/Diagrams.tsx', beforeM10 + m10Content);
