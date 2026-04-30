const fs = require('fs');
const filePath = 'src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Cart Icon in Navbar
// Before: <span className="icon">\uD83D\uDED2</span>
// After: <span className="icon">🛒</span>
content = content.replace(/<span className="icon">\\uD83D\\uDED2<\/span>/g, '<span className="icon">🛒</span>');

// 2. Fix Theme Toggle in Navbar
// Before: {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
content = content.replace(/\{theme === "dark" \? "\\u2600\\uFE0F" : "\\uD83C\\uDF19"\}/g, '{theme === "dark" ? "☀️" : "🌙"}');

// 3. Fix Language Options in Navbar
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

// 4. Fix Mobile Drawer (Hamburger Menu)
// Search for problematic blocks identified in Step 89
content = content.replace(/🏠 \{t\("nav_home"\)\}/, '🏠 {t("nav_home")}');
content = content.replace(/🔐 \{isLoggedIn \? t\("profile"\) : t\("sign_in"\)\}/, '🔐 {isLoggedIn ? t("profile") : t("sign_in")}');
content = content.replace(/📦 \{t\("orders"\)\}/, '📦 {t("orders")}');
content = content.replace(/❤️ \{t\("wishlist"\)\}/, '❤️ {t("wishlist")}');
content = content.replace(/ \{t\("cart"\)\} \(\{cartCount\}\)/, '🛒 {t("cart")} ({cartCount})');
content = content.replace(/⚙️ Help & Settings/, '⚙️ Help & Settings');
content = content.replace(/☀️ Switch to Light Mode/, '☀️ Switch to Light Mode');
content = content.replace(/ Switch to Dark Mode/, '🌙 Switch to Dark Mode');
content = content.replace(/ Language:/, '🌐 Language:');

// 5. Final safety cleanup of any remaining replacement characters
// content = content.replace(//g, ''); // Remove stray double replacement chars

// Save with BOM to force UTF-8 interpretation on Windows
const BOM = Buffer.from([0xEF, 0xBB, 0xBF]);
const buf = Buffer.concat([BOM, Buffer.from(content, 'utf8')]);
fs.writeFileSync(filePath, buf);
console.log('App.jsx icons deep cleaned and literalized.');
