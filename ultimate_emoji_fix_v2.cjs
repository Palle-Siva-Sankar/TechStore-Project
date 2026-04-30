const fs = require('fs');
const filePath = 'src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Navbar Fixes
content = content.replace(/<span className="icon">\\uD83D\\uDED2<\/span>/g, '<span className="icon">🛒</span>');
content = content.replace(/\{theme === "dark" \? "\\u2600\\uFE0F" : "\\uD83C\\uDF19"\}/g, '{theme === "dark" ? "☀️" : "🌙"}');

// 2. Language Flags
content = content.replace(/\\uD83C\\uDDFA\\uD83C\\uDDF8 EN/g, '🇺🇸 EN');
content = content.replace(/\\uD83C\\uDDEA\\uD83C\\uDDF8 ES/g, '🇪🇸 ES');
content = content.replace(/\\uD83C\\uDDEE\\uD83C\\uDDF3 HI/g, '🇮🇳 HI');
content = content.replace(/\\uD83C\\uDDEE\\uD83C\\uDDF3 TE/g, '🇮🇳 TE');
content = content.replace(/\\uD83C\\uDDEE\\uD83C\\uDDF3 KN/g, '🇮🇳 KN');
content = content.replace(/\\uD83C\\uDDEE\\uD83C\\uDDF3 ML/g, '🇮🇳 ML');
content = content.replace(/\\uD83C\\uDDEF\\uD83C\\uDDF5 JA/g, '🇯🇵 JA');
content = content.replace(/\\uD83C\\uDDE8\\uD83C\\uDDF3 ZH/g, '🇨🇳 ZH');
content = content.replace(/\\uD83C\\uDDEB\\uD83C\\uDDF7 FR/g, '🇫🇷 FR');
content = content.replace(/\\uD83C\\uDDE9\\uD83C\\uDDEA DE/g, '🇩🇪 DE');
content = content.replace(/\\uD83C\\uDDF8\\uD83C\\uDDE6 AR/g, '🇸🇦 AR');
content = content.replace(/\\uD83C\\uDDF7\\uD83C\\uDDFA RU/g, '🇷🇺 RU');
content = content.replace(/\\uD83C\\uDDF5\\uD83C\\uDDF9 PT/g, '🇵🇹 PT');

// 3. Mobile Drawer
content = content.replace(/🏠 \{t\("nav_home"\)\}/g, '🏠 {t("nav_home")}');
content = content.replace(/🔐 \{isLoggedIn \? t\("profile"\) : t\("sign_in"\)\}/g, '🔐 {isLoggedIn ? t("profile") : t("sign_in")}');
content = content.replace(/📦 \{t\("orders"\)\}/g, '📦 {t("orders")}');
content = content.replace(/❤️ \{t\("wishlist"\)\}/g, '❤️ {t("wishlist")}');
content = content.replace(/ \{t\("cart"\)\} \(\{cartCount\}\)/g, '🛒 {t("cart")} ({cartCount})');
content = content.replace(/⚙️ Help & Settings/g, '⚙️ Help & Settings');
content = content.replace(/☀️ Switch to Light Mode/g, '☀️ Switch to Light Mode');
content = content.replace(/ Switch to Dark Mode/g, '🌙 Switch to Dark Mode');
content = content.replace(/ Language:/g, '🌐 Language:');

// 4. Save with BOM
const BOM = Buffer.from([0xEF, 0xBB, 0xBF]);
const buf = Buffer.concat([BOM, Buffer.from(content, 'utf8')]);
fs.writeFileSync(filePath, buf);
console.log('App.jsx icons deep cleaned and literalized.');
