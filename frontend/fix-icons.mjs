import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderPath = path.join(__dirname, 'src');

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for className containing w- and h- and text-gray-900
      // e.g., className="w-6 h-6 text-gray-900" -> "w-6 h-6 text-white"
      let modified = content.replace(/className="([^"]*\b(?:w-\d+|h-\d+)\b[^"]*?)text-gray-900([^"]*)"/g, 'className="$1text-white$2"');
      
      if (modified !== content) {
        fs.writeFileSync(fullPath, modified, 'utf8');
      }
    }
  });
}

processDirectory(folderPath);
console.log('Fixed icon colors to white.');
