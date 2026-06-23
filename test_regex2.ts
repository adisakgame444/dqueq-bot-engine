import * as fs from 'fs';

const xmlContent = fs.readFileSync('C:/Users/User/.gemini/antigravity/brain/0a2c8371-3e7f-4c68-81fa-b5d5524b9c5c/artifacts/email_screen.xml', 'utf8');
const match = xmlContent.match(/text="([^"]+@gmail\.com)"/);

console.log('Match result:', match ? match[1] : 'No match found');
