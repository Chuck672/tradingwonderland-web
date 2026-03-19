import fs from 'fs';

let content = fs.readFileSync('src/components/Diagrams.tsx', 'utf8');

const m10Start = content.indexOf("case 'm10-mistakes':");
let m10Content = content.substring(m10Start);

const cases = m10Content.split("case 'm10-");
for (let i = 1; i < cases.length; i++) {
    const c = cases[i];
    const name = c.substring(0, c.indexOf("':"));
    console.log("--- m10-" + name + " ---");
    const matches = c.match(/<text[^>]*>[\s\S]*?<\/text>/g);
    if (matches) {
        matches.forEach(m => {
            // extract text content
            const textContent = m.replace(/<text[^>]*>/, '').replace(/<\/text>/, '').trim();
            console.log(textContent);
        });
    }
}
