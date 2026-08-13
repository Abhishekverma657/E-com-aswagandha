const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace single quoted '/api/...'
    content = content.replace(/'\/api\/([^']*)'/g, "`${import.meta.env.VITE_API_URL}/api/$1`");
    
    // Replace double quoted "/api/..."
    content = content.replace(/"\/api\/([^"]*)"/g, "`${import.meta.env.VITE_API_URL}/api/$1`");

    // Replace template strings `/api/...`
    content = content.replace(/`\/api\/([^`]*)`/g, "`${import.meta.env.VITE_API_URL}/api/$1`");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Changed ${changedFiles} files`);
