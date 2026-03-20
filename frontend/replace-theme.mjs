import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, 'src');

const replacements = [
  { match: /bg-black/g, replace: 'bg-white' },
  { match: /text-white/g, replace: 'text-gray-900' },
  { match: /text-gray-400/g, replace: 'text-gray-600' },
  { match: /text-gray-300/g, replace: 'text-gray-600' },
  { match: /orange-500/g, replace: 'green-600' },
  { match: /orange-600/g, replace: 'green-700' },
  { match: /orange-900/g, replace: 'green-900' },
  { match: /orange-400/g, replace: 'green-500' },
  { match: /from-black to-gray-900/g, replace: 'from-gray-50 to-white' },
  { match: /from-gray-900 to-black/g, replace: 'from-gray-50 to-white' },
  { match: /from-gray-900/g, replace: 'from-gray-100' },
  { match: /bg-gradient-to-r from-black to-gray-900/g, replace: 'bg-gradient-to-r from-gray-50 to-white' },
  // specific revert for buttons or texts that need white text on green backgrounds
  { match: /text-gray-900 hover:text-green-600/g, replace: 'text-gray-900 hover:text-green-600' }, 
];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      // Don't modify Navbar or Footer again
      if (fullPath.includes('Navbar.jsx') || fullPath.includes('Footer.jsx') || fullPath.includes('ChatBot.jsx')) {
        return;
      }
      
      let content = fs.readFileSync(fullPath, 'utf8');
      replacements.forEach(({match, replace}) => {
        content = content.replace(match, replace);
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

processDirectory(folderPath);
console.log('Done replacing theme classes.');
