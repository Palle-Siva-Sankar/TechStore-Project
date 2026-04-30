import "./App.css";
import ProductCard from "./component/ProductCard";
import Checkout from "./component/Checkout";
import Profile from "./component/Profile";
import Orders from "./component/Orders";
import Support from "./component/Support";
import OTPModal from "./component/OTPModal";
import ProductDetail from "./component/ProductDetail";
import HeroSlider from "./component/HeroSlider";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import products from "./component/data";

const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    deliver_to: "Deliver to",
    search_placeholder: "Search TechStore...",
    search_in: "Search in",
    trending: "Trending Searches",
    cart: "Cart",
    wishlist: "Wishlist",
    orders: "Orders",
    sign_in: "Sign In",
    profile: "Profile",
    help: "Help & Settings",
    best_sellers: "Best Sellers",
    top_deals: "Top Deals",
    back_to_top: "Back to Top",
    footer_desc: "Your premium destination for the best tech gadgets. Shop with confidence — secured payments, fast delivery, and 24/7 support.",
    footer_acc: "Your Account",
    footer_info: "Help & Info",
    hello: "Hello",
    hello_sign_in: "Hello, Sign in!",
    total: "Total",
    checkout: "Checkout",
    home_cat_title: "What are you looking for?",
    footer_shop: "Shop By Category",
    footer_links_acc: ["Your Profile", "Your Orders", "Wishlist", "TechStore Prime"],
    footer_links_info: ["Contact Us", "Shipping & Rates", "Returns & Replacements", "Privacy Policy"],
    cat_all: "All Products",
    cat_smartphones: "Mobiles",
    cat_computers: "Laptops",
    cat_audio: "Earphones",
    cat_accessories: "Accessories",
    cat_all_desc: "Browse everything",
    cat_smartphones_desc: "Latest smartphones",
    cat_computers_desc: "Powerful machines",
    cat_audio_desc: "Premium audio",
    cat_accessories_desc: "Must-have gear",
    location_title: "Choose your location",
    location_placeholder: "Enter Pincode/Zip Code",
    location_apply: "Apply",
    location_detect: "Use Current Location",
    location_or: "or",
    hero_title_1: "Find the best tech at unbeatable prices",
    hero_desc_1: "Discover premium gadgets, smartphones, laptops, and accessories — all in one place.",
    hero_title_2: "Next-Gen Gaming Experience",
    hero_desc_2: "Power your performance with latest RTX 40-series machines and premium mechanical gear.",
    hero_title_3: "Immersive Wireless Audio",
    hero_desc_3: "Experience studio-quality sound with adaptive noise cancellation anywhere you go.",
    hero_search_btn: "Search",
    dept_all: "All",
    dept_smartphones: "Mobiles & Acc.",
    dept_computers: "Laptops & PC",
    dept_audio: "Headphones & Audio",
    dept_accessories: "Electronics Accessories",
    suggestion_depts: "Departments",
    suggestion_products: "Products",
    filter_any: "Any Price",
    filter_under_100: "Under \u20B9100",
    filter_100_500: "\u20B9100 to \u20B9500",
    filter_500_1000: "\u20B9500 to \u20B91000",
    filter_over_1000: "Over \u20B91000"
  },
  es: {
    nav_home: "Inicio",
    deliver_to: "Enviar a",
    search_placeholder: "Buscar en TechStore...",
    search_in: "Buscar en",
    trending: "Búsquedas Tendencia",
    cart: "Carrito",
    wishlist: "Favoritos",
    orders: "Pedidos",
    sign_in: "Iniciar Sesión",
    profile: "Perfil",
    help: "Ayuda y Ajustes",
    best_sellers: "Más Vendidos",
    top_deals: "Ofertas Destacadas",
    back_to_top: "Volver Arriba",
    footer_desc: "Tu destino premium para los mejores gadgets tecnológicos. Compra con confianza: pagos seguros, entrega rápida y soporte 24/7.",
    footer_acc: "Tu Cuenta",
    footer_info: "Ayuda e Información",
    hello: "Hola",
    hello_sign_in: "¡Hola, inicia sesión!",
    total: "Total",
    checkout: "Pagar",
    home_cat_title: "¿Qué estás buscando?",
    footer_shop: "Comprar Por Categoría",
    footer_links_acc: ["Tu Perfil", "Tus Pedidos", "Lista de Deseos", "TechStore Prime"],
    footer_links_info: ["Contáctanos", "Envío y Tarifas", "Devoluciones", "Política de Privacidad"],
    cat_all: "Todos",
    cat_smartphones: "Móviles",
    cat_computers: "Laptops",
    cat_audio: "Auriculares",
    cat_accessories: "Accesorios",
    location_title: "Elige tu ubicación",
    location_placeholder: "Código Postal",
    location_apply: "Aplicar",
    location_detect: "Usar ubicación actual",
    location_or: "o",
    hero_title_1: "Encuentra la mejor tecnología a precios imbatibles",
    hero_desc_1: "Descubre gadgets premium, smartphones, laptops y accesorios, todo en un solo lugar.",
    hero_title_2: "Experiencia Gaming de Próxima Generación",
    hero_desc_2: "Potencia tu rendimiento con las últimas máquinas RTX serie 40 y equipo mecánico premium.",
    hero_title_3: "Audio Inalámbrico Inmersivo",
    hero_desc_3: "Experimenta sonido de calidad de estudio con cancelación de ruido adaptativa.",
    hero_search_btn: "Buscar",
    cat_all_desc: "Explorar todo",
    cat_smartphones_desc: "Últimos móviles",
    cat_computers_desc: "Máquinas potentes",
    cat_audio_desc: "Audio premium",
    cat_accessories_desc: "Equipamiento",
    dept_all: "Todos los departamentos",
    dept_smartphones: "Móviles y Acc.",
    dept_computers: "PC y Laptops",
    dept_audio: "Auriculares y Audio",
    dept_accessories: "Acc. Electrónicos",
    suggestion_depts: "Departamentos",
    suggestion_products: "Productos",
    filter_any: "Cualquier precio",
    filter_under_100: "Menos de ₹100",
    filter_100_500: "₹100 a ₹500",
    filter_500_1000: "₹500 a ₹1000",
    filter_over_1000: "Más de ₹1000"
  },
  hi: {
    nav_home: "होम",
    deliver_to: "को भेजें",
    search_placeholder: "टेक्स्टोर में खोजें...",
    search_in: "इसमें खोजें",
    trending: "ट्रेंडिंग खोजें",
    cart: "कार्ट",
    wishlist: "विशलिस्ट",
    orders: "ऑर्डर",
    sign_in: "साइन इन करें",
    profile: "प्रोफ़ाइल",
    help: "सहायता और सेटिंग्स",
    best_sellers: "बेस्ट सेलर्स",
    top_deals: "टॉप ऑफर्स",
    back_to_top: "ऊपर वापस जाएं",
    footer_desc: "बेहतरीन टेक गैजेट्स के लिए आपका प्रीमियम गंतव्य। भरोसे के साथ खरीदारी करें - सुरक्षित भुगतान, तेज़ डिलीवरी और 24/7 सहायता।",
    footer_acc: "आपका खाता",
    footer_info: "सहायता और जानकारी",
    hello: "नमस्ते",
    hello_sign_in: "नमस्ते, साइन इन करें!",
    total: "कुल",
    checkout: "चेकआउट",
    home_cat_title: "आप क्या ढूंढ रहे हैं?",
    footer_shop: "श्रेणी के अनुसार खरीदारी करें",
    footer_links_acc: ["आपकी प्रोफ़ाइल", "आपके ऑर्डर", "विशलिस्ट", "टेक्स्टोर प्राइम"],
    footer_links_info: ["हमसे संपर्क करें", "शिपिंग और दरें", "रिटर्न और रिप्लेसमेंट", "गोपनीयता नीति"],
    cat_all: "सभी उत्पाद",
    cat_smartphones: "मोबाइल",
    cat_computers: "लैपटॉप",
    cat_audio: "इयरफ़ोन",
    cat_accessories: "एक्सेसरीज",
    location_title: "अपना स्थान चुनें",
    location_placeholder: "पिनकोड दर्ज करें",
    location_apply: "लागू करें",
    location_detect: "वर्तमान स्थान का उपयोग करें",
    location_or: "या",
    hero_search_btn: "खोजें",
    cat_all_desc: "सब कुछ ब्राउज़ करें",
    cat_smartphones_desc: "नवीनतम स्मार्टफोन",
    cat_computers_desc: "शक्तिशाली मशीनें",
    cat_audio_desc: "प्रीमियम ऑडियो",
    cat_accessories_desc: "अनिवार्य गियर",
    dept_all: "सभी विभाग",
    dept_smartphones: "सेल फोन और एक्सेसरीज",
    dept_computers: "कंप्यूटर और लैपटॉप",
    dept_audio: "हेडफ़ोन और ऑडियो",
    dept_accessories: "इलेक्ट्रॉनिक्स एक्सेसरीज",
    suggestion_depts: "विभाग",
    suggestion_products: "उत्पाद",
    filter_any: "कोई भी कीमत",
    filter_under_100: "₹100 से कम",
    filter_100_500: "₹100 से ₹500",
    filter_500_1000: "₹500 से ₹1000",
    filter_over_1000: "₹1000 से अधिक"
  },
  te: {
    nav_home: "హోమ్",
    deliver_to: "డెలవరీ",
    search_placeholder: "వెతకండి...",
    search_in: "వెతకండి",
    trending: "ట్రెండింగ్",
    cart: "కార్ట్",
    wishlist: "విష్‌లిస్ట్",
    orders: "ఆర్డర్లు",
    sign_in: "సైన్ ఇన్",
    profile: "ప్రొఫైల్",
    help: "సహాయం",
    best_sellers: "బెస్ట్ సెల్లర్స్",
    top_deals: "టాప్ డీల్స్",
    back_to_top: "పైకి వెళ్ళండి",
    footer_desc: "టెక్ గ్యాడ్జెట్ల కోసం మీ ప్రీమియం గమ్యం.",
    footer_acc: "మీ ఖాతా",
    footer_info: "సహాయం",
    hello: "నమస్కారం",
    hello_sign_in: "మొదలుపెట్టండి",
    total: "మొత్తం",
    checkout: "చెక్అవుట్",
    home_cat_title: "మీరు ఏమి వెతుకుతున్నారు?",
    footer_shop: "కేటగిరీలు",
    footer_links_acc: ["ప్రొఫైల్", "ఆర్డర్లు", "విష్‌లిస్ట్", "ప్రైమ్"],
    footer_links_info: ["మమ్మల్ని సంప్రదించండి", "షిప్పింగ్", "రిటర్న్స్", "గోప్యత"],
    cat_all: "అన్నీ",
    cat_smartphones: "మొబైల్స్",
    cat_computers: "ల్యాప్‌టాప్స్",
    cat_audio: "ఇయర్‌ఫోన్స్",
    cat_accessories: "యాక్సెసరీస్",
    location_title: "స్థానాన్ని ఎంచుకోండి",
    location_placeholder: "పిన్ కోడ్",
    location_apply: "వర్తించు",
    location_detect: "స్థానం",
    location_or: "లేదా",
    hero_title_1: "అత్యుత్తమ సాంకేతికతను పొందండి",
    hero_desc_1: "ప్రీమియం గ్యాడ్జెట్లు, స్మార్ట్‌ఫోన్లు మరియు మరిన్ని ఇక్కడ మాత్రమే.",
    hero_title_2: "నెక్స్ట్-జెన్ గేమింగ్ అనుభవం",
    hero_desc_2: "లేటెస్ట్ RTX 40-సిరీస్ మెషీన్లతో మీ పనితీరును పెంచుకోండి.",
    hero_title_3: "వైర్‌లెస్ ఆడియో అనుభవం",
    hero_desc_3: "నాయిస్ క్యాన్సిలేషన్‌తో అద్భుతమైన సౌండ్ పొందండి.",
    hero_search_btn: "వెతకండి",
    cat_all_desc: "అన్ని ఉత్పత్తులు",
    cat_smartphones_desc: "లేటెస్ట్ మొబైల్స్",
    cat_computers_desc: "శక్తివంతమైన ల్యాప్‌టాప్స్",
    cat_audio_desc: "ప్రీమియం ఆడియో",
    cat_accessories_desc: "యాక్సెసరీస్",
    dept_all: "అన్ని విభాగాలు",
    dept_smartphones: "మొబైల్స్ & యాక్సెసరీస్",
    dept_computers: "కంప్యూటర్లు & ల్యాప్‌టాప్స్",
    dept_audio: "హెడ్‌ఫోన్స్ & ఆడియో",
    dept_accessories: "ఎలక్ట్రానిక్స్ యాక్సెసరీస్",
    suggestion_depts: "విభాగాలు",
    suggestion_products: "ఉత్పత్తులు",
    filter_any: "ఏ ధరకైనా",
    filter_under_100: "₹100 లోపు",
    filter_100_500: "₹100 నుండి ₹500",
    filter_500_1000: "₹500 నుండి ₹1000",
    filter_over_1000: "₹1000 పైగా"
  },
  kn: {
    nav_home: "ಹೋಮ್",
    deliver_to: "ಡೆಲಿವರಿ",
    search_placeholder: "ಹುಡುಕಿ...",
    search_in: "ಹುಡುಕಿ",
    trending: "ಟ್ರೆಂಡಿಂಗ್",
    cart: "ಕಾರ್ಟ್",
    wishlist: "ವಿಶ್‌ಲಿಸ್ಟ್",
    orders: "ಆರ್ಡರ್‍ಗಳು",
    sign_in: "ಸೈನ್ ಇನ್",
    profile: "ಪ್ರೊಫೈಲ್",
    help: "ಸಹಾಯ",
    best_sellers: "ಬೆಸ್ಟ್ ಸೆಲ್ಲರ್ಸ್",
    top_deals: "ಟಾಪ್ ಡೀಲ್ಸ್",
    back_to_top: "ಮೇಲಕ್ಕೆ",
    footer_desc: "ತಂತ್ರಜ್ಞಾನಕ್ಕಾಗಿ ನಿಮ್ಮ ತಾಣ.",
    footer_acc: "ಖಾತೆ",
    footer_info: "ಸಹಾಯ",
    hello: "ನಮಸ್ಕಾರ",
    hello_sign_in: "ಪ್ರವೇಶಿಸಿ",
    total: "ಒಟ್ಟು",
    checkout: "ಚೆಕ್ಔಟ್",
    home_cat_title: "ಏನು ಹುಡುಕುತ್ತಿದ್ದೀರಿ?",
    footer_shop: "ವರ್ಗಗಳು",
    footer_links_acc: ["ಪ್ರೊಫೈಲ್", "ಆರ್ಡರ್‍ಗಳು", "ವಿಶ್‌ಲಿಸ್ಟ್", "ಪ್ರೈಮ್"],
    footer_links_info: ["ಸಂಪರ್ಕ", "ಶಿಪ್ಪಿಂಗ್", "ರಿಟರ್ನ್ಸ್", "ಗೌಪ್ಯತೆ"],
    cat_all: "ಎಲ್ಲಾ",
    cat_smartphones: "ಮೊಬೈಲ್",
    cat_computers: "ಲ್ಯಾಪ್ಟಾಪ್",
    cat_audio: "ಇಯರ್‌ಫೋನ್",
    cat_accessories: "ಪರಿಕರ",
    location_title: "ಸ್ಥಳ ಆರಿಸಿ",
    location_placeholder: "ಪಿನ್ ಕೋಡ್",
    location_apply: "ಅನ್ವಯಿಸು",
    location_detect: "ಸ್ಥಳ ಬಳಸಿ",
    location_or: "ಅಥವಾ",
    hero_title_1: "ಅತ್ಯುತ್ತಮ ತಂತ್ರಜ್ಞಾನವನ್ನು ಆರಿಸಿ",
    hero_desc_1: "ಪ್ರೀಮಿಯం ಗ್ಯಾಜೆಟ್‌ಗಳು ಮತ್ತು ಪರಿಕರಗಳನ್ನು ಒಂದೇ ಕಡೆ ಅನ್ವೇಷಿಸಿ.",
    hero_title_2: "ಗೇಮಿಂಗ್ ಅನುಭವ",
    hero_desc_2: "RTX 40-ಸರಣಿಯ ಯಂತ್ರಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೆಚ್ಚಿಸಿ.",
    hero_title_3: "ವೈರ್‌ಲೆಸ್ ಆಡಿಯೋ",
    hero_desc_3: "ನಾಯ್ಸ್ ಕ್ಯಾನ್ಸಲೇಶನ್‌ನೊಂದಿಗೆ ಸ್ಟುಡಿಯೋ ಗುಣಮಟ್ಟದ ಧ್ವನಿಯನ್ನು ಅನುಭವಿಸಿ.",
    hero_search_btn: "ಹುಡುಕಿ",
    cat_all_desc: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    cat_smartphones_desc: "ಇತ್ತೀಚಿನ ಮೊಬೈಲ್",
    cat_computers_desc: "ಶಕ್ತಿಯುತ ಲ್ಯಾಪ್ಟಾಪ್",
    cat_audio_desc: "ಪ್ರೀಮಿಯಂ ಆಡಿಯೋ",
    cat_accessories_desc: "ಪರಿಕರಗಳು",
    dept_all: "ಎಲ್ಲಾ ವಿಭಾಗಗಳು",
    dept_smartphones: "ಮೊಬైಲ್ ಮತ್ತು ಪರಿಕರಗಳು",
    dept_computers: "ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಲ್ಯಾಪ್ಟಾಪ್",
    dept_audio: "ಹೆಡ್‌ಫೋನ್ ಮತ್ತು ಆಡಿಯೋ",
    dept_accessories: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಪರಿಕರಗಳು",
    suggestion_depts: "ವಿಭಾಗಗಳು",
    suggestion_products: "ಉತ್ಪನ್ನಗಳು",
    filter_any: "ಯಾವುದೇ ಬೆಲೆ",
    filter_under_100: "₹100 ಒಳಗೆ",
    filter_100_500: "₹100 ರಿಂದ ₹500",
    filter_500_1000: "₹500 ರಿಂದ ₹1000",
    filter_over_1000: "₹1000 ಕ್ಕಿಂತ ಹೆಚ್ಚು"
  },
  ml: {
    nav_home: "ഹോം",
    deliver_to: "ഡെലിവറി",
    search_placeholder: "തിരയുക...",
    search_in: "തിരയുക",
    trending: "ട്രെൻഡിംഗ്",
    cart: "കാർട്ട്",
    wishlist: "വിഷ്‌ലിസ്റ്റ്",
    orders: "ഓർഡറുകൾ",
    sign_in: "സൈൻ ഇൻ",
    profile: "പ്രൊഫൈൽ",
    help: "സഹായം",
    best_sellers: "ബെസ്റ്റ് സെല്ലേഴ്സ്",
    top_deals: "ഡീലുകൾ",
    back_to_top: "മുകളിലേക്ക്",
    footer_desc: "മികച്ച സാങ്കേതിക വിദ്യയ്ക്കുള്ള ഇടം.",
    footer_acc: "അക്കൗണ്ട്",
    footer_info: "സഹായം",
    hello: "നമസ്കാരം",
    hello_sign_in: "പ്രവേശിക്കുക",
    total: "ആകെ",
    checkout: "ചെക്ക്ഔട്ട്",
    home_cat_title: "എന്താണ് തിരയുന്നത്?",
    footer_shop: "വിഭാഗങ്ങൾ",
    footer_links_acc: ["പ്രൊഫൈൽ", "ഓർഡറുകൾ", "വിഷ്‌ലിസ്റ്റ്", "പ്രൈം"],
    footer_links_info: ["സമ്പർക്കം", "ഷിപ്പിംഗ്", "റിട്ടേൺസ്", "സ്വകാര്യത"],
    cat_all: "എല്ലാം",
    cat_smartphones: "മൊബൈലുകൾ",
    cat_computers: "ലാപ്ടോപ്പുകൾ",
    cat_audio: "ഇയർഫോണുകൾ",
    cat_accessories: "സഹായങ്ങൾ",
    location_title: "പ്രദേശം തിരഞ്ഞെടുക്കുക",
    location_placeholder: "പിൻകോഡ്",
    location_apply: "പ്രവേശിക്കുക",
    location_detect: "ലൊക്കേഷൻ",
    location_or: "അല്ലെങ്കിൽ",
    hero_title_1: "മികച്ച സാങ്കേതികവിദ്യ നേടൂ",
    hero_desc_1: "സ്മാർട്ട്‌ഫോണുകളും ലാപ്‌ടോപ്പുകളും കുറഞ്ഞ വിലയിൽ സ്വന്തമാക്കൂ.",
    hero_title_2: "ഗെയിമിംഗ് അനുഭവം",
    hero_desc_2: "RTX 40-സീരീസ് മെഷീനുകൾ ഉപയോഗിച്ച് വേഗത വർദ്ധിപ്പിക്കൂ.",
    hero_title_3: "വയർലെസ്സ് ഓഡിയോ",
    hero_desc_3: "അതിശയിപ്പിക്കുന്ന ശബ്‌ദാനുഭവം ആസ്വദിക്കൂ.",
    hero_search_btn: "തിരയുക",
    cat_all_desc: "എല്ലാ ഉൽപ്പന്നങ്ങളും",
    cat_smartphones_desc: "പുതിയ മൊബൈലുകൾ",
    cat_computers_desc: "ശക്തമായ ലാപ്ടോപ്പുകൾ",
    cat_audio_desc: "പ്രീമിയം ഓഡിയോ",
    cat_accessories_desc: "ആക്സസറികൾ",
    dept_all: "എല്ലാ വിഭാഗങ്ങളും",
    dept_smartphones: "മൊബൈലും ആക്‌സസറികളും",
    dept_computers: "കമ്പ്യൂട്ടറും ലാപ്ടോപ്പും",
    dept_audio: "ഹെഡ്‌ഫോണും ഓഡിയോയും",
    dept_accessories: "ഇലക്ട്രോണിക്സ് ആക്സസറികൾ",
    suggestion_depts: "വിഭാഗങ്ങൾ",
    suggestion_products: "ഉൽപ്പന്നങ്ങൾ",
    filter_any: "ഏത് വിലയും",
    filter_under_100: "₹100-ൽ താഴെ",
    filter_100_500: "₹100 മുതൽ ₹500 വരെ",
    filter_500_1000: "₹500 മുതൽ ₹1000 വരെ",
    filter_over_1000: "₹1000-ത്തിന് മുകളിൽ"
  },
  ja: {
    nav_home: "ホーム",
    deliver_to: "お届け先",
    search_placeholder: "検索...",
    search_in: "部門別",
    trending: "トレンド",
    cart: "カート",
    wishlist: "リスト",
    orders: "注文",
    sign_in: "ログイン",
    profile: "アカウント",
    help: "ヘルプ",
    best_sellers: "売れ筋",
    top_deals: "セール",
    back_to_top: "トップへ",
    footer_desc: "プレミアムテック。",
    footer_acc: "アカウント",
    footer_info: "情報",
    hello: "こんにちは",
    hello_sign_in: "ログイン",
    total: "合計",
    checkout: "レジ",
    home_cat_title: "何をお探しですか？",
    footer_shop: "カテゴリー",
    footer_links_acc: ["プロフィール", "注文", "リスト", "プライム"],
    footer_links_info: ["連絡", "配送", "返品", "規約"],
    cat_all: "すべて",
    cat_smartphones: "スマホ",
    cat_computers: "パソコン",
    cat_audio: "イヤホン",
    cat_accessories: "周辺機器",
    location_title: "お届け先を選択",
    location_placeholder: "郵便番号",
    location_apply: "適用",
    location_detect: "現在地",
    location_or: "または",
    hero_title_1: "最高峰のテックを驚きの価格で",
    hero_desc_1: "スマホ、ノートパソコン、周辺機器がすべてここに。",
    hero_title_2: "次世代のゲーミング体験",
    hero_desc_2: "最新のRTX 40シリーズでパフォーマンスを最大限に。",
    hero_title_3: "没入型ワイヤレスオーディオ",
    hero_desc_3: "ノイズキャンセリングでスタジオ品質のサウンドを。",
    hero_search_btn: "検索",
    cat_all_desc: "すべて見る",
    cat_smartphones_desc: "最新スマホ",
    cat_computers_desc: "高性能PC",
    cat_audio_desc: "プレミアム音響",
    cat_accessories_desc: "周辺機器",
    dept_all: "すべての部門",
    dept_smartphones: "携帯電話・アクセサリ",
    dept_computers: "パソコン",
    dept_audio: "オーディオ",
    dept_accessories: "電子機器アクセサリ",
    suggestion_depts: "部門",
    suggestion_products: "製品",
    filter_any: "すべての価格",
    filter_under_100: "100ドル以下",
    filter_100_500: "100ドル～500ドル",
    filter_500_1000: "500ドル～1000ドル",
    filter_over_1000: "1000ドル以上"
  },
  zh: {
    nav_home: "首页",
    deliver_to: "配送",
    search_placeholder: "搜索...",
    search_in: "部门",
    trending: "热搜",
    cart: "购物车",
    wishlist: "清单",
    orders: "订单",
    sign_in: "登录",
    profile: "资料",
    help: "帮助",
    best_sellers: "畅销",
    top_deals: "秒杀",
    back_to_top: "顶部",
    footer_desc: "科技之选。",
    footer_acc: "帐户",
    footer_info: "帮助",
    hello: "您好",
    hello_sign_in: "登录",
    total: "总计",
    checkout: "结算",
    home_cat_title: "找什么？",
    footer_shop: "分类",
    footer_links_acc: ["资料", "订单", "心愿单", "Prime"],
    footer_links_info: ["联系", "配送", "退换", "隐私"],
    cat_all: "全部",
    cat_smartphones: "手机",
    cat_computers: "电脑",
    cat_audio: "耳机",
    cat_accessories: "配件",
    location_title: "配送地址",
    location_placeholder: "邮政编码",
    location_apply: "确定",
    location_detect: "位置",
    location_or: "或",
    hero_title_1: "以优惠价格寻找顶尖科技",
    hero_desc_1: "一站式探索优质数码产品、手机、电脑及配件。",
    hero_title_2: "新一代电竞体验",
    hero_desc_2: "借助最新的 RTX 40 系列机器提升您的性能。",
    hero_title_3: "沉浸式无线音频",
    hero_desc_3: "体验具有自适应降噪功能的录音室级音质。",
    hero_search_btn: "搜索",
    cat_all_desc: "浏览全部",
    cat_smartphones_desc: "新款手机",
    cat_computers_desc: "高性能电脑",
    cat_audio_desc: "优质音频",
    cat_accessories_desc: "数码配件",
    dept_all: "所有部门",
    dept_smartphones: "手机及配件",
    dept_computers: "电脑及笔记本",
    dept_audio: "耳机及音响",
    dept_accessories: "数码配件部",
    suggestion_depts: "部门",
    suggestion_products: "产品",
    filter_any: "任意价格",
    filter_under_100: "100美元以下",
    filter_100_500: "100-500美元",
    filter_500_1000: "500-1000美元",
    filter_over_1000: "1000美元以上"
  },
  fr: {
    nav_home: "Accueil",
    deliver_to: "Livrer à",
    search_placeholder: "Rechercher...",
    search_in: "Rayons",
    trending: "Tendances",
    cart: "Panier",
    wishlist: "Favoris",
    orders: "Commandes",
    sign_in: "Connexion",
    profile: "Profil",
    help: "Aide",
    best_sellers: "Ventes",
    top_deals: "Offres",
    back_to_top: "Haut",
    footer_desc: "High-tech premium.",
    footer_acc: "Compte",
    footer_info: "Infos",
    hello: "Bonjour",
    hello_sign_in: "Identifiez-vous",
    total: "Total",
    checkout: "Commander",
    home_cat_title: "Que cherchez-vous ?",
    footer_shop: "Catégories",
    footer_links_acc: ["Profil", "Commandes", "Favoris", "Prime"],
    footer_links_info: ["Contact", "Livraison", "Retours", "Confidentialité"],
    cat_all: "Tout",
    cat_smartphones: "Mobiles",
    cat_computers: "PC",
    cat_audio: "Audio",
    cat_accessories: "Accessoires",
    location_title: "Choisir l'adresse",
    location_placeholder: "Code postal",
    location_apply: "Appliquer",
    location_detect: "Position",
    location_or: "ou",
    hero_title_1: "Trouvez le meilleur de la tech à prix imbattables",
    hero_desc_1: "Découvrez des gadgets premium, smartphones, ordinateurs et accessoires.",
    hero_title_2: "Expérience Gaming Next-Gen",
    hero_desc_2: "Boostez vos performances avec les machines RTX série 40.",
    hero_title_3: "Audio Sans Fil Immersif",
    hero_desc_3: "Vivez un son de qualité studio avec réduction de bruit.",
    hero_search_btn: "Chercher",
    cat_all_desc: "Tout voir",
    cat_smartphones_desc: "Nouveaux mobiles",
    cat_computers_desc: "PC puissants",
    cat_audio_desc: "Audio premium",
    cat_accessories_desc: "Équipement",
    dept_all: "Tous les rayons",
    dept_smartphones: "Mobiles & Acc.",
    dept_computers: "PC & Laptops",
    dept_audio: "Casques & Audio",
    dept_accessories: "Acc. Électroniques",
    suggestion_depts: "Rayons",
    suggestion_products: "Produits",
    filter_any: "Tous les prix",
    filter_under_100: "Moins de 100₹",
    filter_100_500: "100₹ à 500₹",
    filter_500_1000: "500₹ à 1000₹",
    filter_over_1000: "Plus de 1000₹"
  },
  de: {
    nav_home: "Start",
    deliver_to: "Lieferung",
    search_placeholder: "Suchen...",
    search_in: "Kategorien",
    trending: "Beliebt",
    cart: "Warenkorb",
    wishlist: "Liste",
    orders: "Bestellungen",
    sign_in: "Anmelden",
    profile: "Profil",
    help: "Hilfe",
    best_sellers: "Bestseller",
    top_deals: "Angebote",
    back_to_top: "Hoch",
    footer_desc: "Premium Tech-Produkte.",
    footer_acc: "Konto",
    footer_info: "Hilfe",
    hello: "Hallo",
    hello_sign_in: "Anmelden",
    total: "Gesamt",
    checkout: "Kasse",
    home_cat_title: "Wonach suchen Sie?",
    footer_shop: "Kategorien",
    footer_links_acc: ["Profil", "Bestellungen", "Wunschliste", "Prime"],
    footer_links_info: ["Kontakt", "Versand", "Retouren", "Datenschutz"],
    cat_all: "Alle",
    cat_smartphones: "Smartphones",
    cat_computers: "Laptops",
    cat_audio: "Audio",
    cat_accessories: "Zubehör",
    location_title: "Standort wählen",
    location_placeholder: "Postleitzahl",
    location_apply: "Anwenden",
    location_detect: "Standort",
    location_or: "oder",
    hero_title_1: "Finden Sie beste Tech zu unschlagbaren Preisen",
    hero_desc_1: "Entdecken Sie Premium-Gadgets, Smartphones und Zubehör.",
    hero_title_2: "Next-Gen Gaming-Erlebnis",
    hero_desc_2: "Maximieren Sie Ihre Leistung mit RTX 40-Serie Maschinen.",
    hero_title_3: "Immersives Wireless Audio",
    hero_desc_3: "Erleben Sie Studio-Qualität mit Noise Cancelling.",
    hero_search_btn: "Suchen",
    cat_all_desc: "Alles durchsuchen",
    cat_smartphones_desc: "Neue Smartphones",
    cat_computers_desc: "Starke Rechner",
    cat_audio_desc: "Premium Audio",
    cat_accessories_desc: "Zubehör",
    dept_all: "Alle Kategorien",
    dept_smartphones: "Handys & Zubehör",
    dept_computers: "Computer & Laptops",
    dept_audio: "Kopfhörer & Audio",
    dept_accessories: "Elektronik-Zubehör",
    suggestion_depts: "Kategorien",
    suggestion_products: "Produkte"
  },
  ar: {
    nav_home: "الرئيسية",
    deliver_to: "توصيل إلى",
    search_placeholder: "بحث...",
    search_in: "الأقسام",
    trending: "رائج",
    cart: "السلة",
    wishlist: "القائمة",
    orders: "الطلبات",
    sign_in: "دخول",
    profile: "الملف",
    help: "مساعدة",
    best_sellers: "الأكثر",
    top_deals: "عروض",
    back_to_top: "للأعلى",
    footer_desc: "وجهتك للتقنية المميزة.",
    footer_acc: "حسابك",
    footer_info: "معلومات",
    hello: "مرحباً",
    hello_sign_in: "سجل الدخول",
    total: "الإجمالي",
    checkout: "دفع",
    home_cat_title: "عما تبحث؟",
    footer_shop: "الفئات",
    footer_links_acc: ["الملف", "الطلبات", "القائمة", "برايم"],
    footer_links_info: ["اتصل بنا", "الشحن", "الاسترجاع", "الخصوصية"],
    cat_all: "الكل",
    cat_smartphones: "موبايل",
    cat_computers: "لابتوب",
    cat_audio: "سماعات",
    cat_accessories: "ملحقات",
    location_title: "اختر موقعك",
    location_placeholder: "أدخل الرمز البريدي",
    location_apply: "تطبيق",
    location_detect: "موقعي",
    location_or: "أو",
    hero_title_1: "ابحث عن أفضل التقنيات بأسعار لا تقبل المنافسة",
    hero_desc_1: "اكتشف الأدوات الفاخرة والهواتف الذكية والملحقات في مكان واحد.",
    hero_title_2: "تجربة ألعاب الجيل القادم",
    hero_desc_2: "عزز أداءك مع أحدث أجهزة RTX من فئة 40.",
    hero_title_3: "صوت لاسلكي غامر",
    hero_desc_3: "استمتع بصوت استوديو احترافي مع ميزة إلغاء الضوضاء.",
    hero_search_btn: "بحث",
    cat_all_desc: "تصفح الكل",
    cat_smartphones_desc: "أحدث الهواتف",
    cat_computers_desc: "أجهزة قوية",
    cat_audio_desc: "صوت فائق",
    cat_accessories_desc: "معدات لا غنى عنها",
    dept_all: "جميع الأقسام",
    dept_smartphones: "الهواتف والملحقات",
    dept_computers: "الكمبيوتر واللابتوب",
    dept_audio: "السماعات والصوت",
    dept_accessories: "ملحقات إلكترونية",
    suggestion_depts: "الأقسام",
    suggestion_products: "المنتجات"
  },
  ru: {
    nav_home: "Главная",
    deliver_to: "Доставка",
    search_placeholder: "Поиск...",
    search_in: "Отделы",
    trending: "Популярно",
    cart: "Корзина",
    wishlist: "Список",
    orders: "Заказы",
    sign_in: "Войти",
    profile: "Профиль",
    help: "Помощь",
    best_sellers: "Хиты",
    top_deals: "Скидки",
    back_to_top: "Наверх",
    footer_desc: "Премиум гаджеты.",
    footer_acc: "Аккаунт",
    footer_info: "Помощь",
    hello: "Привет",
    hello_sign_in: "Войти",
    total: "Итого",
    checkout: "Оплата",
    home_cat_title: "Что ищем?",
    footer_shop: "Категории",
    footer_links_acc: ["Профиль", "Заказы", "Список", "Prime"],
    footer_links_info: ["Контакты", "Доставка", "Возврат", "Приватность"],
    cat_all: "Все",
    cat_smartphones: "Смартфоны",
    cat_computers: "Ноутбуки",
    cat_audio: "Аудио",
    cat_accessories: "Аксессуары",
    location_title: "Выберите адрес",
    location_placeholder: "Введите индекс",
    location_apply: "Применить",
    location_detect: "Определить место",
    location_or: "или",
    hero_title_1: "Лучшие гаджеты по суперценам",
    hero_desc_1: "Премиальные смартфоны, ноутбуки и аксессуары — всё здесь.",
    hero_title_2: "Гейминг следующего поколения",
    hero_desc_2: "Повысьте производительность с серией RTX 40.",
    hero_title_3: "Иммерсивный беспроводной звук",
    hero_desc_3: "Студийное качество звука с шумоподавлением.",
    hero_search_btn: "Найти",
    cat_all_desc: "Смотреть всё",
    cat_smartphones_desc: "Новые смартфоны",
    cat_computers_desc: "Мощные ноутбуки",
    cat_audio_desc: "Премиум звук",
    cat_accessories_desc: "Аксессуары",
    dept_all: "Все отделы",
    dept_smartphones: "Телефоны и аксессуары",
    dept_computers: "Компьютеры и ноутбуки",
    dept_audio: "Наушники и аудио",
    dept_accessories: "Электроника и аксессуары",
    suggestion_depts: "Отделы",
    suggestion_products: "Товары",
    filter_any: "Любая цена",
    filter_under_100: "До 100₹",
    filter_100_500: "От 100₹ до 500₹",
    filter_500_1000: "От 500₹ до 1000₹",
    filter_over_1000: "Свыше 1000₹"
  },
  pt: {
    nav_home: "Início",
    deliver_to: "Entregar",
    search_placeholder: "Pesquisar...",
    search_in: "Setores",
    trending: "Tendência",
    cart: "Carrinho",
    wishlist: "Lista",
    orders: "Pedidos",
    sign_in: "Entrar",
    profile: "Perfil",
    help: "Ajuda",
    best_sellers: "Vendas",
    top_deals: "Ofertas",
    back_to_top: "Topo",
    footer_desc: "Tecnologia premium para você.",
    footer_acc: "Sua conta",
    footer_info: "Ajuda",
    hello: "Olá",
    hello_sign_in: "Entrar",
    total: "Total",
    checkout: "Pagar",
    home_cat_title: "O que procura?",
    footer_shop: "Categorias",
    footer_links_acc: ["Perfil", "Pedidos", "Lista", "Prime"],
    footer_links_info: ["Contato", "Frete", "Retorno", "Privacidade"],
    cat_all: "Tudo",
    cat_smartphones: "Celulares",
    cat_computers: "Laptops",
    cat_audio: "Fones",
    cat_accessories: "Acessórios",
    location_title: "Localização",
    location_placeholder: "CEP",
    location_apply: "Aplicar",
    location_detect: "Localizar",
    location_or: "ou",
    hero_title_1: "Tecnologia com preços imbatíveis",
    hero_desc_1: "Gadgets premium e acessórios em um só lugar.",
    hero_title_2: "Experiência Gaming Next-Gen",
    hero_desc_2: "Aumente sua performance com RTX 40.",
    hero_title_3: "Áudio Sem Fio",
    hero_desc_3: "Som de estúdio com cancelamento de ruído.",
    hero_search_btn: "Buscar",
    cat_all_desc: "Ver tudo",
    cat_smartphones_desc: "Celulares novos",
    cat_computers_desc: "Máquinas potentes",
    cat_audio_desc: "Áudio premium",
    cat_accessories_desc: "Equipamento",
    dept_all: "Setores",
    dept_smartphones: "Celulares & Acc.",
    dept_computers: "Computadores",
    dept_audio: "Fones & Som",
    dept_accessories: "Acessórios",
    suggestion_depts: "Departamentos",
    suggestion_products: "Produtos",
    filter_any: "Qualquer preço",
    filter_under_100: "Abaixo de ₹100",
    filter_100_500: "₹100 a ₹500",
    filter_500_1000: "₹500 a ₹1000",
    filter_over_1000: "Acima de ₹1000"
  },
};

const TRENDING_SEARCHES = [
  "iPhone 15 Pro", "MacBook Pro", "AirPods Pro", "Samsung Galaxy",
  "Sony Headphones", "Gaming Laptop", "Apple Watch", "Wireless Mouse"
];

const SEARCH_DEPARTMENTS = [
  { key: "All", label_key: "dept_all" },
  { key: "Smartphones", label_key: "dept_smartphones" },
  { key: "Computers", label_key: "dept_computers" },
  { key: "Audio", label_key: "dept_audio" },
  { key: "Accessories", label_key: "dept_accessories" },
];

const CATEGORIES = [
  { key: "All", label_key: "cat_all", icon: "🛍️", desc_key: "cat_all_desc" },
  { key: "Smartphones", label_key: "cat_smartphones", icon: "\uD83D\uDCF1", desc_key: "cat_smartphones_desc" },
  { key: "Computers", label_key: "cat_computers", icon: "\uD83D\uDCBB", desc_key: "cat_computers_desc" },
  { key: "Audio", label_key: "cat_audio", icon: "\uD83C\uDFA7", desc_key: "cat_audio_desc" },
  { key: "Accessories", label_key: "cat_accessories", icon: "⌚", desc_key: "cat_accessories_desc" },
];

function App() {
  // Global State
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState(() => {
    const saved = localStorage.getItem("activeCategory");
    return (saved && saved !== "null" && saved !== "undefined") ? saved : "All";
  });
  const [infoTab, setInfoTab] = useState("contact");
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      // We always load the user data to keep addresses/profile permanent
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("User parse error:", e);
      return null;
    }
  });

  const [isSessionActive, setIsSessionActive] = useState(() => {
    try {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const isFresh = Date.now() - parseInt(loginTime) < 10 * 60 * 60 * 1000;
        return isFresh;
      }
    } catch (e) {
      console.error("Session parse error:", e);
    }
    return false;
  });

  const isLoggedIn = user && isSessionActive;

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Cart parse error:", e);
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Wishlist parse error:", e);
      return [];
    }
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Orders parse error:", e);
      return [];
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [globalLocation, setGlobalLocation] = useState(() => localStorage.getItem("globalLocation") || "Select your address");
  const [locatingDelivery, setLocatingDelivery] = useState(false);

  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otpTarget, setOtpTarget] = useState("");
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [pendingPayTotal, setPendingPayTotal] = useState(0);
  const [heroSearch, setHeroSearch] = useState("");

  const [selectedProductId, setSelectedProductId] = useState(() => {
    const saved = localStorage.getItem("selectedProductId");
    if (saved && saved !== "null" && saved !== "undefined") {
      const n = Number(saved);
      return isNaN(n) ? null : n;
    }
    return null;
  });

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempPincode, setTempPincode] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Persist language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Persist User, Cart, Wishlist, Orders
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (isSessionActive) {
      if (!localStorage.getItem("loginTime")) {
        localStorage.setItem("loginTime", Date.now().toString());
      }
    } else {
      localStorage.removeItem("loginTime");
    }
  }, [isSessionActive]);

  useEffect(() => {
    localStorage.setItem("globalLocation", globalLocation);
  }, [globalLocation]);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Removed activePage persistence as requested (always default to home)

  useEffect(() => {
    localStorage.setItem("activeCategory", activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (selectedProductId !== null) {
      localStorage.setItem("selectedProductId", selectedProductId.toString());
    } else {
      localStorage.removeItem("selectedProductId");
    }
  }, [selectedProductId]);

  // Translation helper
  const t = (key) => TRANSLATIONS[language][key] || key;


  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Browser History (Back/Forward Nav)
  // Push a history entry whenever we navigate
  const navigateTo = useCallback((page, opts = {}) => {
    const state = { page, category: opts.category || activeCategory, productId: opts.productId || null };
    window.history.pushState(state, "", window.location.pathname);
    setActivePage(page);
    if (opts.category !== undefined) setActiveCategory(opts.category);
    if (opts.productId !== undefined) setSelectedProductId(opts.productId);
    window.scrollTo(0, 0);
  }, [activeCategory]);

  // Listen to browser popstate (back/forward button)
  useEffect(() => {
    // Push initial state so first back press goes to home instead of leaving
    window.history.replaceState({ page: activePage, category: activeCategory, productId: selectedProductId }, "", window.location.pathname);

    function handlePopState(e) {
      if (e.state) {
        setActivePage(e.state.page || "home");
        if (e.state.category) setActiveCategory(e.state.category);
        if (e.state.productId !== undefined) setSelectedProductId(e.state.productId);
        window.scrollTo(0, 0);
      } else {
        // No state = we've gone back past the start — go home instead of closing
        setActivePage("home");
        window.scrollTo(0, 0);
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Location Fetcher
  function fetchGlobalLocation() {
    setLocatingDelivery(true);
    showToast("Finding your location...", "info");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const resp = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await resp.json();
            const address = data.address;
            const city = address.city || address.town || address.village || "";
            const district = address.county || address.state_district || address.district || "";
            const pincode = address.postcode || "";
            const parts = [city, district].filter(Boolean);
            const locationStr = address
              ? (parts.join(", ") + (pincode ? ` - ${pincode}` : "")) || address.state || ""
              : data.display_name.split(",")[0];
            setGlobalLocation(locationStr || `Lat ${latitude.toFixed(2)}, Lng ${longitude.toFixed(2)}`);
            showToast("Location updated!", "success");
          } catch {
            setGlobalLocation("Location mapped");
          }
          setLocatingDelivery(false);
        },
        () => {
          setGlobalLocation("New York 10001");
          setLocatingDelivery(false);
        },
        { timeout: 8000 }
      );
    } else {
      setGlobalLocation("New York 10001");
      setLocatingDelivery(false);
    }
  }

  // Computed Cart
  const cartCount = cartItems.reduce((sum, v) => sum + v.quantity, 0);
  const cartPrice = cartItems.reduce((sum, v) => sum + v.price * v.quantity, 0);

  // Toast Function
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Navigate to category
  function goToCategory(cat) {
    setActiveCategory(cat);
    setSearch("");
    setMinPrice(""); setMaxPrice(""); setMinRating(""); setSortBy("");
    window.history.pushState({ page: "products", category: cat, productId: null }, "", window.location.pathname);
    setActivePage("products");
    window.scrollTo(0, 0);
  }

  // Cart Handlers
  const addToCart = useCallback((product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    showToast(`${product.name} added to cart! 🛒`, "success");
  }, [cartItems]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    showToast("Item removed from cart", "warning");
  }, [cartItems]);

  const updateCartQty = useCallback((productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty <= 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  }, []);

  // Wishlist
  const onToggleWishlist = useCallback((productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast("Removed from Wishlist 💔", "error");
    } else {
      setWishlist([...wishlist, productId]);
      showToast("Added to Wishlist ❤️", "success");
    }
  }, [wishlist]);

  // Authentication
  function initiateLogin() {
    if (isLoggedIn) {
      window.history.pushState({ page: "profile", category: activeCategory, productId: null }, "", window.location.pathname);
      setActivePage("profile");
    } else {
      setOtpTarget("login");
      setShowOTP(true);
    }
  }

  function handleOTPVerify(emailParam, nameParam) {
    if (otpTarget === "login") {
      let displayName = nameParam;
      if (!displayName) {
        const parsedName = emailParam ? emailParam.split("@")[0] : "User";
        displayName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
      }
      const newUser = {
        phone: "Add your phone",
        name: displayName,
        email: emailParam,
        address: "Please set your address",
        addresses: [] // initialize an empty array for robust logic
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("loginTime", Date.now().toString());
      showToast("Welcome! You're logged in 🎉", "success");
    } else if (otpTarget === "payment") {
      const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 1000000),
        items: [...cartItems],
        total: pendingPayTotal || cartPrice,
        date: new Date().toLocaleDateString(),
        status: "Processing"
      };
      setOrders([newOrder, ...orders]);
      setCartItems([]);
      setActivePage("orders");
      showToast("Payment Successful! Order Placed 🎉", "success");
    }
    setShowOTP(false);
  }

  // Order management
  function handleUpdateOrder(orderId, updates) {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, ...updates } : order
    ));
    if (updates.status === "Cancelled") {
      showToast("Order cancelled successfully", "warning");
    }
  }

  // Filtering & Sorting (for products page)
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "All" || product.category === activeCategory;

      // Check specific ranges
      const minP = minPrice ? Number(minPrice) : 0;
      const maxP = maxPrice ? Number(maxPrice) : Infinity;
      const matchPrice = product.price >= minP && product.price <= maxP;

      const matchRating = !minRating || product.rating >= Number(minRating);
      return matchSearch && matchCategory && matchPrice && matchRating;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => a.rating - b.rating);

    return result;
  }, [search, activeCategory, minPrice, maxPrice, minRating, sortBy]);

  // Search suggestions (Amazon-style)
  const [searchCategory, setSearchCategory] = useState("All");

  const suggestions = useMemo(() => {
    if (search.length < 1) return [];
    return products
      .filter(p => {
        const matchName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = searchCategory === "All" || p.category === searchCategory;
        return matchName && matchCat;
      })
      .slice(0, 8);
  }, [search, searchCategory]);

  const heroSuggestions = useMemo(() => {
    if (heroSearch.length < 1) return [];
    return products
      .filter(p => p.name.toLowerCase().includes(heroSearch.toLowerCase()))
      .slice(0, 5);
  }, [heroSearch]);

  const categorySuggestions = useMemo(() => {
    if (search.length < 1) return [];
    return CATEGORIES.filter(c => t(c.label_key).toLowerCase().includes(search.toLowerCase()) || c.key.toLowerCase().includes(search.toLowerCase()));
  }, [search, language]);

  // Trending items to show when search is focused but empty
  const trendingFiltered = useMemo(() => {
    if (search.length === 0) return TRENDING_SEARCHES;
    return TRENDING_SEARCHES.filter(t => t.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  // Best sellers for featured section
  const bestSellers = useMemo(() => products.filter(p => p.isBestSeller), []);
  const deals = useMemo(() => products.filter(p => p.discount), []);

  const selectedProduct = useMemo(() => selectedProductId ? products.find(p => p.id === selectedProductId) : null, [selectedProductId]);
  const wishlistedProducts = useMemo(() => products.filter(p => wishlist.includes(p.id)), [wishlist]);

  // Handlers
  const handleHeroSearch = useCallback((e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearch(heroSearch);
      setActiveCategory("All");
      window.history.pushState({ page: "products", category: "All", productId: null }, "", window.location.pathname);
      setActivePage("products");
    }
  }, [heroSearch]);

  const handleProductClick = useCallback((id) => {
    setSelectedProductId(id);
    window.history.pushState({ page: "product-detail", category: activeCategory, productId: id }, "", window.location.pathname);
    setActivePage("product-detail");
    window.scrollTo(0, 0);
  }, [activeCategory]);

  const goInfo = useCallback((tab) => {
    setInfoTab(tab);
    window.history.pushState({ page: "info", category: activeCategory, productId: null }, "", window.location.pathname);
    setActivePage("info");
    window.scrollTo(0, 0);
  }, [activeCategory]);

  return (
    <div className="app" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* OTP Modal */}
      {showOTP && (
        <OTPModal
          onClose={() => setShowOTP(false)}
          onVerify={handleOTPVerify}
          target={otpTarget}
        />
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="modal-content location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t("location_title")}</h3>
              <button className="close-btn" onClick={() => setShowLocationModal(false)}>✖</button>
            </div>
            <div className="location-modal-body">
              {user && user.addresses && user.addresses.length > 0 && (
                <div className="saved-addresses-section">
                  <h4>{t("saved_addresses_title") || "Select a saved address"}</h4>
                  <div className="modal-addresses-list">
                    {user.addresses.map(addr => (
                      <div
                        key={addr.id}
                        className={`modal-address-item ${globalLocation === addr.detail ? 'selected' : ''}`}
                        onClick={() => {
                          setGlobalLocation(addr.detail);
                          setShowLocationModal(false);
                          showToast("Delivery address updated!", "success");
                        }}
                      >
                        <div className="addr-icon">📍</div>
                        <div className="addr-info">
                          <strong>{addr.label}</strong>
                          <p>{addr.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-manage-link" onClick={() => { setShowLocationModal(false); setActivePage("profile"); }}>
                    {t("manage_addresses") || "Manage address book"}
                  </div>
                  <div className="location-divider">
                    <span>{t("location_or") || "or enter a pincode"}</span>
                  </div>
                </div>
              )}

              <div className="pincode-input-section">
                <input
                  type="text"
                  placeholder={t("location_placeholder")}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                />
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (tempPincode.length === 6) {
                      setGlobalLocation(`Pincode: ${tempPincode}`);
                      setShowLocationModal(false);
                      showToast("Location updated!", "success");
                    } else {
                      showToast("Please enter a valid 6-digit pincode", "error");
                    }
                  }}
                >
                  {t("location_apply")}
                </button>
              </div>

              <div className="location-divider">
                <span>{t("location_or")}</span>
              </div>

              <button
                className="btn-secondary detect-btn"
                onClick={() => {
                  setShowLocationModal(false);
                  fetchGlobalLocation();
                }}
              >
                📍 {t("location_detect")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-container">
            <a href="#" onClick={(e) => { e.preventDefault(); window.history.pushState({ page: "home", category: "All", productId: null }, "", window.location.pathname); setActivePage("home"); setSearch(""); window.scrollTo(0, 0); }} className="logo">
              <span className="logo-icon">TechStore</span>
            </a>
          </div>

          {/* Global Delivery Location */}
          <div className={`nav-delivery ${locatingDelivery ? 'locating' : ''}`} onClick={() => setShowLocationModal(true)} title={t("location_title")}>
            <span className="delivery-icon">📍</span>
            <div className="delivery-text">
              <span>{t("deliver_to")} {user ? user.name.split(" ")[0] : ""}</span>
              <strong>{locatingDelivery ? "..." : globalLocation}</strong>
            </div>
          </div>

          {/* Search - Amazon Style */}
          <div className="amazon-search-container" ref={searchRef}>
            <select
              className="search-category-dropdown"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              {SEARCH_DEPARTMENTS.map(dep => (
                <option key={dep.key} value={dep.key}>{t(dep.label_key)}</option>
              ))}
            </select>

            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder={searchCategory === "All" ? t("search_placeholder") : `${t("search_in")} ${t(SEARCH_DEPARTMENTS.find(d => d.key === searchCategory)?.label_key)}...`}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => { if (e.key === "Enter") { setShowSuggestions(false); setActiveCategory(searchCategory); setActivePage("products"); } }}
              />
              {showSuggestions && (
                <div className="search-suggestions amazon-dropdown">
                  {/* Trending Searches - shown when empty or partially matching */}
                  {trendingFiltered.length > 0 && search.length === 0 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">🔥 {t("trending")}</div>
                      {trendingFiltered.slice(0, 5).map((term, i) => (
                        <div key={`trend-${i}`} className="suggestion-item trending" onClick={() => {
                          setSearch(term);
                          setShowSuggestions(false);
                          setActiveCategory("All");
                          setActivePage("products");
                        }}>
                          <span className="suggestion-icon">🔥</span>
                          <span>{term}</span>
                          <span className="suggestion-arrow">↗</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category suggestions */}
                  {categorySuggestions.length > 0 && search.length >= 1 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">📂 {t("suggestion_depts")}</div>
                      {categorySuggestions.map(cat => (
                        <div key={`cat-${cat.key}`} className="suggestion-item category-suggestion" onClick={() => {
                          setSearch("");
                          setShowSuggestions(false);
                          goToCategory(cat.key);
                        }}>
                          <span className="suggestion-icon">{cat.icon}</span>
                          <div className="suggestion-cat-info">
                            <span>{t(cat.label_key)}</span>
                            <small>in {t(cat.desc_key)}</small>
                          </div>
                          <span className="suggestion-arrow">→</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product suggestions */}
                  {suggestions.length > 0 && (
                    <div className="suggestion-section">
                      {search.length >= 1 && <div className="suggestion-section-title">🛍️ {t("suggestion_products")}</div>}
                      {suggestions.map(p => (
                        <div key={p.id} className="suggestion-item product-suggestion" onClick={() => {
                          setSearch(p.name);
                          setShowSuggestions(false);
                          handleProductClick(p.id);
                        }}>
                          <img src={p.image} alt="" className="suggestion-thumb" />
                          <div className="suggestion-product-info">
                            <span className="suggestion-product-name">{p.name}</span>
                            <span className="suggestion-product-meta">
                              <span className="suggestion-price">₹{p.price}</span>
                              {p.rating && <span className="suggestion-rating">★ {p.rating}</span>}
                              <span className="suggestion-category-tag">{p.category}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Browse All - footer */}
                  {search.length >= 1 && (
                    <div className="suggestion-footer" onClick={() => {
                      setShowSuggestions(false);
                      setActiveCategory(searchCategory);
                      setActivePage("products");
                    }}>
                      See all results for "<strong>{search}</strong>"
                    </div>
                  )}

                  {/* Quick Categories when empty */}
                  {search.length === 0 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">📂 Browse Categories</div>
                      {CATEGORIES.map(cat => (
                        <div key={`browse-${cat.key}`} className="suggestion-item category-suggestion" onClick={() => {
                          setShowSuggestions(false);
                          goToCategory(cat.key);
                        }}>
                          <span className="suggestion-icon">{cat.icon}</span>
                          <span>{t(cat.label_key)}</span>
                          <span className="suggestion-arrow">→</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button className="search-btn" onClick={() => { setShowSuggestions(false); setActiveCategory(searchCategory); setActivePage("products"); }}>🔍</button>
          </div>

          <div className="nav-actions">
            <div className="language-selector-wrapper desktop-only">
              <select
                className="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                title="Select Language"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="hi">🇮🇳 HI</option>
                <option value="te">🇮🇳 TE</option>
                <option value="kn">🇮🇳 KN</option>
                <option value="ml">🇮🇳 ML</option>
                <option value="ja">🇯🇵 JA</option>
                <option value="zh">🇨🇳 ZH</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="ar">🇸🇦 AR</option>
                <option value="ru">🇷🇺 RU</option>
                <option value="pt">🇵🇹 PT</option>
              </select>
            </div>

            <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Change Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button className="action-icon-wrapper" onClick={() => { window.history.pushState({ page: "orders", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("orders"); }} title={t("orders")}>
              <span className="icon">📦</span>
            </button>

            <button className="action-icon-wrapper" onClick={() => { window.history.pushState({ page: "wishlist", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("wishlist"); }} title={t("wishlist")}>
              <span className="icon">❤</span>
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </button>

            <div className="action-icon-wrapper" onMouseEnter={() => setIsCartPopupOpen(true)} onMouseLeave={() => setIsCartPopupOpen(false)} onClick={() => { window.history.pushState({ page: "checkout", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("checkout"); }}>
              <span className="icon">🛒</span>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
              {isCartPopupOpen && cartItems.length > 0 && (
                <div className="popup cart-popup">
                  <h4>{t("cart")} ({cartCount})</h4>
                  <div className="popup-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="popup-item" onClick={() => { handleProductClick(item.id); setIsCartPopupOpen(false); }} style={{ cursor: "pointer" }}>
                        <span className="truncate" onMouseOver={(e) => e.target.style.color = "var(--accent-color)"} onMouseOut={(e) => e.target.style.color = ""}>{item.name} (x{item.quantity})</span>
                        <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.8rem", marginTop: "0.8rem", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span>{t("total")}:</span><span style={{ color: "var(--accent-color)" }}>₹{cartPrice.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => { window.history.pushState({ page: "checkout", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("checkout"); }}>{t("checkout")} →</button>
                </div>
              )}
            </div>

            <button className="btn-primary sign-in-btn" onClick={initiateLogin}>
              {isLoggedIn ? `👤` : t("sign_in")}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="drawer-content">
            <div className="drawer-header">
              <h3>{isLoggedIn ? `👤 ${t("hello")}, ${user.name}` : `👋 ${t("hello_sign_in")}`}</h3>
              <button className="close-drawer" onClick={() => setIsMobileMenuOpen(false)}>✖</button>
            </div>
            <div className="drawer-links">
              <button onClick={() => { window.history.pushState({ page: "home", category: "All", productId: null }, "", window.location.pathname); setActivePage("home"); setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}>🏠 {t("nav_home")}</button>
              <button onClick={() => { initiateLogin(); setIsMobileMenuOpen(false); }}>🔐 {isLoggedIn ? t("profile") : t("sign_in")}</button>
              <button onClick={() => { window.history.pushState({ page: "orders", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("orders"); setIsMobileMenuOpen(false); }}>📦 {t("orders")}</button>
              <button onClick={() => { window.history.pushState({ page: "wishlist", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("wishlist"); setIsMobileMenuOpen(false); }}>❤️ {t("wishlist")}</button>
              <button onClick={() => { window.history.pushState({ page: "checkout", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("checkout"); setIsMobileMenuOpen(false); }}>🛒 {t("cart")} ({cartCount})</button>
              <button onClick={() => { window.history.pushState({ page: "info", category: activeCategory, productId: null }, "", window.location.pathname); setActivePage("info"); setIsMobileMenuOpen(false); }}>⚙️ Help & Settings</button>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
              </button>

              <div className="drawer-language-selector">
                <span>🌐 Language:</span>
                <select
                  className="language-selector"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="hi">हिन्दी</option>
                  <option value="te">తెలుగు</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ml">മലയാളം</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ar">العربية</option>
                  <option value="ru">Русский</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <div className="drawer-divider"></div>
              <h4>Shop By Category</h4>
              {CATEGORIES.filter(c => c.key !== "All").map(cat => (
                <button key={cat.key} onClick={() => { goToCategory(cat.key); setIsMobileMenuOpen(false); }}>
                  {cat.icon} {t(cat.label_key)}
                </button>
              ))}

              {activePage === "products" && (
                <>
                  <div className="drawer-divider"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="nav-categories" style={{ padding: '0.5rem 4%', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <button
          className="nav-cat-btn all-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}
        >
          <span className="hamburger-icon" style={{ fontSize: '1.2rem' }}>☰</span>
        </button>
        <button
          className={`nav-cat-btn ${activePage === "home" ? "active" : ""}`}
          onClick={() => { window.history.pushState({ page: "home", category: "All", productId: null }, "", window.location.pathname); setActivePage("home"); setSearch(""); window.scrollTo(0, 0); }}
          style={{ fontWeight: '700' }}
        >
          Home
        </button>
        {CATEGORIES.filter(c => c.key !== "All").map(cat => (
          <button
            key={cat.key}
            className={`nav-cat-btn ${activePage === "products" && activeCategory === cat.key ? "active" : ""}`}
            onClick={() => goToCategory(cat.key)}
          >
            {t(cat.label_key)}
          </button>
        ))}
      </div>

      {/* ============================================
          MOBILE FILTER DRAWER
          ============================================ */}
      <div className={`filter-drawer-wrapper ${isFilterDrawerOpen ? "open" : ""}`}>
        <div className="filter-drawer-overlay" onClick={() => setIsFilterDrawerOpen(false)}></div>
        <div className="filter-drawer-container">
          <div className="filter-drawer-header">
            <h3>Filters & Sort</h3>
            <button className="close-filter-drawer" onClick={() => setIsFilterDrawerOpen(false)}>✖</button>
          </div>

          <div className="filter-drawer-body">
            {/* Section 1: Shop By Category */}
            <div className="filter-section">
              <div className="section-header-row">
                <h4>{t("footer_shop")}</h4>
              </div>
              <div className="filter-radio-group">
                {CATEGORIES.filter(c => c.key !== "All").map(cat => (
                  <label key={`mobile-cat-${cat.key}`} className="filter-label">
                    <input
                      type="radio"
                      name="mobile-category"
                      checked={activeCategory === cat.key}
                      onChange={() => { goToCategory(cat.key); setIsFilterDrawerOpen(false); }}
                    />
                    <span className="label-text">{t(cat.label_key)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="drawer-divider"></div>

            {/* Section 2: Total (Price) */}
            <div className="filter-section">
              <div className="section-header-row">
                <h4>{t("total")}</h4>
                {(minPrice || maxPrice) && (
                  <button className="section-clear-btn" onClick={() => { setMinPrice(""); setMaxPrice(""); }}>Clear</button>
                )}
              </div>
              <div className="filter-radio-group">
                <label className="filter-label">
                  <input type="radio" name="mobilePriceRange" onChange={() => setMaxPrice("")} checked={!minPrice && !maxPrice} />
                  <span className="label-text">{t("filter_any")}</span>
                </label>
                <label className="filter-label">
                  <input type="radio" name="mobilePriceRange" onChange={() => setMaxPrice("100")} checked={maxPrice === "100"} />
                  <span className="label-text">{t("filter_under_100")}</span>
                </label>
                <label className="filter-label">
                  <input type="radio" name="mobilePriceRange" onChange={() => setMaxPrice("500")} checked={maxPrice === "500"} />
                  <span className="label-text">{t("filter_100_500")}</span>
                </label>
                <label className="filter-label">
                  <input type="radio" name="mobilePriceRange" onChange={() => setMaxPrice("1000")} checked={maxPrice === "1000"} />
                  <span className="label-text">{t("filter_500_1000")}</span>
                </label>
              </div>

              {/* RANGE SLIDER IN TOTAL SECTION (MOBILE) */}
              <div className="price-range-slider-wrapper mobile-range-wrapper" style={{ marginTop: '1.5rem' }}>
                <div className="price-range-header">
                  <span>Up to ₹{maxPrice || 2000}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={maxPrice || 2000}
                  onChange={(e) => { setMinPrice("0"); setMaxPrice(e.target.value); }}
                  style={{
                    background: `linear-gradient(to right, var(--accent-color) ${((maxPrice || 2000) / 2000) * 100}%, var(--border-color) ${((maxPrice || 2000) / 2000) * 100}%)`
                  }}
                  className="price-range-slider"
                />
              </div>
            </div>

            <div className="drawer-divider"></div>

            {/* Section 3: Customer Review */}
            <div className="filter-section">
              <div className="section-header-row">
                <h4>Customer Review</h4>
              </div>
              <div className="filter-radio-group">
                {[4, 3, 2, 1].map(r => (
                  <label key={`mobile-rating-${r}`} className="filter-label">
                    <input type="radio" name="mobileRating" onChange={() => { setMinRating(String(r)); setIsFilterDrawerOpen(false); }} checked={minRating === String(r)} />
                    <div className="rating-content">
                      <span className="stars">{"★".repeat(r)}{"☆".repeat(5 - r)}</span>
                      <span className="up-text">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setIsFilterDrawerOpen(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <div className="global-3d-bg">
        <img src="/3d-bg.png" alt="3D Background" />
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>

        {/* Stars overlay - visible in dark mode */}
        <div className="stars-container">
          {useMemo(() => Array.from({ length: 40 }).map((_, i) => (
            <div key={`star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              opacity: 0.3 + Math.random() * 0.7
            }} />
          )), [theme])}
        </div>

        {/* Snow / falling particles - visible in dark mode */}
        <div className="snow-container">
          {useMemo(() => Array.from({ length: 30 }).map((_, i) => (
            <div key={`snow-${i}`} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              opacity: 0.15 + Math.random() * 0.4,
              fontSize: `${4 + Math.random() * 8}px`
            }}>✦</div>
          )), [theme])}
        </div>
      </div>

      {/* ============================================
          HOME PAGE
          ============================================ */}
      {activePage === "home" && (
        <>
          <HeroSlider
            heroSearch={heroSearch}
            onSearchChange={setHeroSearch}
            onSearchSubmit={handleHeroSearch}
            suggestions={heroSuggestions}
            onSuggestionClick={(id) => { handleProductClick(id); setHeroSearch(""); }}
            t={t}
          />

          <section className="categories-section">
            <h2>{t("home_cat_title")}</h2>
            <div className="category-grid">
              {CATEGORIES.map(cat => (
                <div key={cat.key} className="category-card" onClick={() => goToCategory(cat.key)}>
                  <span className="category-icon">{cat.icon}</span>
                  <h3>{t(cat.label_key)}</h3>
                  <p>{t(cat.desc_key)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="featured-section">
            <h2>🔥 {t("best_sellers")}</h2>
            <div className="featured-scroll">
              {bestSellers.map(data => (
                <ProductCard
                  key={data.id}
                  Id={data.id}
                  image={data.image}
                  name={data.name}
                  price={data.price}
                  originalPrice={data.originalPrice}
                  discount={data.discount}
                  rating={data.rating}
                  reviews={data.reviews}
                  isBestSeller={data.isBestSeller}
                  isWishListed={wishlist.includes(data.id)}
                  onAddToCart={() => addToCart(data)}
                  onToggleWish={() => onToggleWishlist(data.id)}
                  onClickProduct={() => handleProductClick(data.id)}
                />
              ))}
            </div>
          </section>

          <section className="featured-section">
            <h2>🏷️ {t("top_deals")}</h2>
            <div className="featured-scroll">
              {deals.map(data => (
                <ProductCard
                  key={data.id}
                  Id={data.id}
                  image={data.image}
                  name={data.name}
                  price={data.price}
                  originalPrice={data.originalPrice}
                  discount={data.discount}
                  rating={data.rating}
                  reviews={data.reviews}
                  isBestSeller={data.isBestSeller}
                  isWishListed={wishlist.includes(data.id)}
                  onAddToCart={() => addToCart(data)}
                  onToggleWish={() => onToggleWishlist(data.id)}
                  onClickProduct={() => handleProductClick(data.id)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ============================================
          PRODUCTS PAGE (AMAZON / FLIPKART STYLE)
          ============================================ */}
      {activePage === "products" && (
        <section className="products-page-wrapper">
          <div className="products-header-row">
            <div className="header-info-col">
              <h1>{activeCategory === "All" ? t("cat_all") : t("cat_" + activeCategory.toLowerCase())}</h1>
              <p>{filteredProducts.length} results found {search ? `${t("search_in")} "${search}"` : ""}</p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className="mobile-filter-trigger"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <span>⚡ Filters</span>
            </button>
          </div>

          <div className="products-layout">
            <aside className="filters-sidebar">
              <div className="filter-section">
                <div className="section-header-row">
                  <h4>{t("footer_shop")}</h4>
                  {activeCategory !== "All" && (
                    <button className="section-clear-btn" onClick={() => setActiveCategory("All")}>Clear</button>
                  )}
                </div>
                <div className="filter-radio-group">
                  {CATEGORIES.filter(c => c.key !== "All").map(cat => (
                    <label key={cat.key} className="filter-label">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === cat.key}
                        onChange={() => goToCategory(cat.key)}
                      />
                      <span className="label-text">{t(cat.label_key)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="section-header-row">
                  <h4>{t("total")}</h4>
                  {(minPrice || maxPrice) && (
                    <button className="section-clear-btn" onClick={() => { setMinPrice(""); setMaxPrice(""); }}>Clear</button>
                  )}
                </div>
                <div className="filter-radio-group">
                  <label className="filter-label">
                    <input type="radio" name="priceRange" onChange={() => { setMinPrice(""); setMaxPrice(""); }} checked={!minPrice && !maxPrice} />
                    <span className="label-text">{t("filter_any")}</span>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="priceRange" onChange={() => { setMinPrice("0"); setMaxPrice("100"); }} checked={minPrice === "0" && maxPrice === "100"} />
                    <span className="label-text">{t("filter_under_100")}</span>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="priceRange" onChange={() => { setMinPrice("100"); setMaxPrice("500"); }} checked={minPrice === "100" && maxPrice === "500"} />
                    <span className="label-text">{t("filter_100_500")}</span>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="priceRange" onChange={() => { setMinPrice("500"); setMaxPrice("1000"); }} checked={minPrice === "500" && maxPrice === "1000"} />
                    <span className="label-text">{t("filter_500_1000")}</span>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="priceRange" onChange={() => { setMinPrice("1000"); setMaxPrice(""); }} checked={minPrice === "1000" && !maxPrice} />
                    <span className="label-text">{t("filter_over_1000")}</span>
                  </label>

                  <div className="price-range-slider-wrapper" style={{ marginTop: '1.5rem' }}>
                    <div className="price-range-header">
                      <span>Up to ₹{maxPrice || 2000}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="2000"
                      step="10"
                      value={maxPrice || 2000}
                      onChange={(e) => { setMinPrice("0"); setMaxPrice(e.target.value); }}
                      style={{
                        background: `linear-gradient(to right, var(--accent-color) ${((maxPrice || 2000) / 2000) * 100}%, var(--border-color) ${((maxPrice || 2000) / 2000) * 100}%)`
                      }}
                      className="price-range-slider"
                    />
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <div className="section-header-row">
                  <h4>Customer Review</h4>
                  {minRating !== "" && (
                    <button className="section-clear-btn" onClick={() => setMinRating("")}>Clear</button>
                  )}
                </div>
                <div className="filter-radio-group">
                  <label className="filter-label">
                    <input type="radio" name="rating" onChange={() => setMinRating("4")} checked={minRating === "4"} />
                    <div className="rating-content">
                      <span className="stars">★★★★☆</span>
                      <span className="up-text">& Up</span>
                    </div>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="rating" onChange={() => setMinRating("3")} checked={minRating === "3"} />
                    <div className="rating-content">
                      <span className="stars">★★★☆☆</span>
                      <span className="up-text">& Up</span>
                    </div>
                  </label>
                  <label className="filter-label">
                    <input type="radio" name="rating" onChange={() => setMinRating("")} checked={minRating === ""} />
                    <span className="label-text">Any Rating</span>
                  </label>
                </div>
              </div>

              {(search || minPrice || maxPrice || minRating || activeCategory !== "All") && (
                <button className="clear-filters-btn" onClick={() => { setSearch(""); setMinPrice(""); setMaxPrice(""); setMinRating(""); setActiveCategory("All"); }}>
                  Clear All Filters
                </button>
              )}
            </aside>

            <div className="main-products">
              <div className="products-top-bar">
                <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                </select>
              </div>

              <div className="product-grid">
                {filteredProducts.map((data) => (
                  <ProductCard
                    key={data.id}
                    Id={data.id}
                    image={data.image}
                    name={data.name}
                    price={data.price}
                    originalPrice={data.originalPrice}
                    discount={data.discount}
                    rating={data.rating}
                    reviews={data.reviews}
                    isBestSeller={data.isBestSeller}
                    isWishListed={wishlist.includes(data.id)}
                    onAddToCart={() => addToCart(data)}
                    onToggleWish={() => onToggleWishlist(data.id)}
                    onClickProduct={() => handleProductClick(data.id)}
                  />
                ))}
                {filteredProducts.length === 0 && (
                  <div style={{ color: 'var(--text-secondary)', textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '3rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h3 style={{ color: 'var(--text-primary)' }}>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCT DETAIL PAGE */}
      {activePage === "product-detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          allProducts={products}
          wishlist={wishlist}
          onAddToCart={addToCart}
          onToggleWish={onToggleWishlist}
          onGoBack={() => setActivePage("products")}
          onViewProduct={handleProductClick}
        />
      )}

      {/* WISHLIST PAGE */}
      {activePage === "wishlist" && (
        <div className="page-container">
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your Wishlist ❤️</h2>
          {wishlistedProducts.length > 0 ? (
            <div className="product-grid">
              {wishlistedProducts.map((data) => (
                <ProductCard
                  key={data.id}
                  Id={data.id}
                  image={data.image}
                  name={data.name}
                  price={data.price}
                  originalPrice={data.originalPrice}
                  discount={data.discount}
                  rating={data.rating}
                  reviews={data.reviews}
                  isBestSeller={data.isBestSeller}
                  isWishListed={true}
                  onAddToCart={() => addToCart(data)}
                  onToggleWish={() => onToggleWishlist(data.id)}
                  onClickProduct={() => handleProductClick(data.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🤍</div>
              <h2>Your Wishlist is Empty</h2>
              <button className="btn-primary" onClick={() => setActivePage("products")}>Discover Products</button>
            </div>
          )}
        </div>
      )}

      {/* INFO & SETTINGS PAGE */}
      {activePage === "info" && (
        <div className="page-container">
          <div className="products-layout">
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h4>Help & Settings</h4>
                <div className="filter-radio-group">
                  <label className="filter-label"><input type="radio" checked={infoTab === "contact"} onChange={() => setInfoTab("contact")} /> 📧 Contact Us</label>
                  <label className="filter-label"><input type="radio" checked={infoTab === "shipping"} onChange={() => setInfoTab("shipping")} /> 🚚 Shipping Policy</label>
                  <label className="filter-label"><input type="radio" checked={infoTab === "returns"} onChange={() => setInfoTab("returns")} /> 🔄 Returns & Refunds</label>
                  <label className="filter-label"><input type="radio" checked={infoTab === "privacy"} onChange={() => setInfoTab("privacy")} /> 🛡️ Privacy & Security</label>
                  <label className="filter-label"><input type="radio" checked={infoTab === "settings"} onChange={() => setInfoTab("settings")} /> ⚙️� Site Settings</label>
                </div>
              </div>
            </aside>
            <div className="main-products">
              <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', minHeight: '400px' }}>
                {infoTab === "contact" && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>Contact Support</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>We're here to help! Reach out to us through any of these channels.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px' }}><strong>📞 Phone:</strong> +1 (800) 123-4567<br /><small style={{ color: 'var(--text-secondary)' }}>Mon-Fri, 9am - 6pm EST</small></div>
                      <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px' }}><strong>📧 Email:</strong> support@techstore.com<br /><small style={{ color: 'var(--text-secondary)' }}>Replies within 24 hours</small></div>
                      <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px' }}><strong>💬 Live Chat:</strong> Click the floating icon at the bottom right.<br /><small style={{ color: 'var(--text-secondary)' }}>24/7 Virtual Assistant</small></div>
                    </div>
                  </div>
                )}
                {infoTab === "shipping" && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>Shipping Policy</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Fast and reliable shipping to your doorstep.</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
                      <li><strong>Free Shipping:</strong> On all orders over ₹500.</li>
                      <li><strong>Standard Shipping (₹9.99):</strong> 3-5 business days.</li>
                      <li><strong>Express Delivery (₹19.99):</strong> 1-2 business days (available in select areas).</li>
                      <li>All packages are fully insured against loss or damage.</li>
                    </ul>
                  </div>
                )}
                {infoTab === "returns" && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>Returns & Refunds</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Hassle-free 30-day return policy.</p>
                    <ol style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.5rem' }}>
                      <li>Initiate a return from your Orders tab.</li>
                      <li>Print the automatically generated prepaid shipping label.</li>
                      <li>Drop off the package at our partner carrier.</li>
                      <li>Refunds are processed within 3-5 days of receiving the item.</li>
                    </ol>
                  </div>
                )}
                {infoTab === "privacy" && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>Privacy & Security</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your data is safe with us.</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
                      <li><strong>256-bit SSL Encryption:</strong> All checkout and personal data is fully encrypted.</li>
                      <li><strong>2-Factor Authentication:</strong> We use OTP validation for secure logins and payments.</li>
                      <li>We never sell your personal information to third parties.</li>
                    </ul>
                  </div>
                )}
                {infoTab === "settings" && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>Site Settings</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px' }}>
                        <h4>Appearance</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Switch between our Cosmic Dark theme and Warm Sand Light theme.</p>
                        <button className="btn-secondary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                          Toggle Theme: {theme === "dark" ? "Dark Mode" : "Light Mode"}
                        </button>
                      </div>
                      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px' }}>
                        <h4>Notifications</h4>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-color)' }} /> Receive order progress updates via email
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {activePage === "checkout" && (
        <Checkout
          cartItems={cartItems}
          cartPrice={cartPrice}
          user={user}
          isLoggedIn={isLoggedIn}
          onLoginRequired={initiateLogin}
          onPay={(total, method) => {
            setPendingPayTotal(total);
            setOtpTarget("payment");
            setShowOTP(true);
          }}
          onRemoveFromCart={removeFromCart}
          onUpdateQty={updateCartQty}
          onGoShopping={() => setActivePage("products")}
          onProductClick={handleProductClick}
        />
      )}

      {/* PROFILE */}
      {activePage === "profile" && isLoggedIn && user && (
        <Profile
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
          setIsSessionActive={setIsSessionActive}
          onLogout={() => {
            setUser(null);
            setIsSessionActive(false);
            setActivePage("home");
            showToast("Logged out successfully. 👋", "info");
          }}
        />
      )}

      {/* ORDERS */}
      {activePage === "orders" && (
        <Orders orders={orders} onUpdateOrder={handleUpdateOrder} onViewProduct={handleProductClick} />
      )}

      {/* Support Widget */}
      <Support />

      {/* FOOTER */}
      <footer className="footer-expanded">
        <div className="footer-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ⬆ {t("back_to_top")}
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <h3
              className="logo-icon"
              style={{ marginBottom: "0.8rem", cursor: "pointer" }}
              onClick={() => { window.history.pushState({ page: "home", category: "All", productId: null }, "", window.location.pathname); setActivePage("home"); setSearch(""); window.scrollTo(0, 0); }}
            >
              TechStore
            </h3>
            <p>{t("footer_desc")}</p>
          </div>
          <div className="footer-col">
            <h4>{t("footer_shop")}</h4>
            <div className="footer-links">
              {CATEGORIES.map(c => (
                <a
                  key={c.key}
                  href="#"
                  onClick={(e) => { e.preventDefault(); goToCategory(c.key); }}
                >
                  {t(`cat_${c.key.toLowerCase()}`)}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>{t("footer_acc")}</h4>
            <div className="footer-links">
              {t("footer_links_acc").map((link, i) => (
                <a key={i} href="#" onClick={(e) => { e.preventDefault(); if (i === 1) setActivePage("orders"); else if (i === 2) setActivePage("wishlist"); else initiateLogin(); }}>{link}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>{t("footer_info")}</h4>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); goInfo("contact"); }}>{t("footer_links_info")[0]}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goInfo("shipping"); }}>{t("footer_links_info")[1]}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goInfo("returns"); }}>{t("footer_links_info")[2]}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goInfo("privacy"); }}>{t("footer_links_info")[3]}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 TechStore. Built with React. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

