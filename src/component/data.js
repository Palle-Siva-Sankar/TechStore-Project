const products = [
  // Computers
  { id: 1, name: "Apple iMac 27\", 1TB HDD, Retina 5K Display", price: 1699, originalPrice: 1999, discount: "15% OFF", rating: 5.0, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop", isBestSeller: true, brand: "Apple", category: "Computers" },
  { id: 2, name: "MacBook Pro M2 14\" Space Gray", price: 1999, originalPrice: 2199, discount: "9% OFF", rating: 4.9, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", isBestSeller: true, brand: "Apple", category: "Computers" },
  { id: 3, name: "Dell XPS 15 OLED Laptop", price: 1799, originalPrice: 1899, discount: "5% OFF", rating: 4.7, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop", isBestSeller: false, brand: "Dell", category: "Computers" },
  { id: 4, name: "ASUS ROG Zephyrus G14 Gaming", price: 1499, originalPrice: 1699, discount: "12% OFF", rating: 4.8, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop", isBestSeller: false, brand: "Asus", category: "Computers" },
  { id: 5, name: "Lenovo ThinkPad X1 Carbon Gen 11", price: 1599, originalPrice: null, discount: null, rating: 4.6, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop", isBestSeller: false, brand: "Lenovo", category: "Computers" },

  // Smartphones
  { id: 6, name: "iPhone 15 Pro Max 256GB", price: 1199, originalPrice: null, discount: null, rating: 4.9, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", isBestSeller: true, brand: "Apple", category: "Smartphones" },
  { id: 7, name: "Samsung Galaxy S24 Ultra 512GB", price: 1299, originalPrice: 1399, discount: "7% OFF", rating: 4.8, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", isBestSeller: true, brand: "Samsung", category: "Smartphones" },
  { id: 8, name: "Google Pixel 8 Pro 128GB", price: 999, originalPrice: 1099, discount: "9% OFF", rating: 4.7, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", isBestSeller: false, brand: "Google", category: "Smartphones" },
  { id: 9, name: "OnePlus 12 16GB RAM", price: 799, originalPrice: 899, discount: "11% OFF", rating: 4.6, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", isBestSeller: false, brand: "OnePlus", category: "Smartphones" },
  { id: 10, name: "Sony Xperia 1 V Flagship", price: 1399, originalPrice: null, discount: null, rating: 4.5, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop", isBestSeller: false, brand: "Sony", category: "Smartphones" },

  // Audio
  { id: 11, name: "Sony WH-1000XM5 Wireless", price: 349, originalPrice: 399, discount: "12% OFF", rating: 4.9, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", isBestSeller: true, brand: "Sony", category: "Audio" },
  { id: 12, name: "Apple AirPods Pro 2nd Gen", price: 249, originalPrice: 299, discount: "16% OFF", rating: 4.8, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop", isBestSeller: true, brand: "Apple", category: "Audio" },
  { id: 13, name: "Bose QuietComfort Ultra", price: 429, originalPrice: null, discount: null, rating: 4.7, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop", isBestSeller: false, brand: "Bose", category: "Audio" },
  { id: 14, name: "Sennheiser Momentum 4 Wireless", price: 349, originalPrice: null, discount: null, rating: 4.6, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", isBestSeller: false, brand: "Sennheiser", category: "Audio" },
  { id: 15, name: "JBL Tune 770NC Wireless", price: 199, originalPrice: 249, discount: "20% OFF", rating: 4.5, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop", isBestSeller: false, brand: "JBL", category: "Audio" },

  // Accessories
  { id: 16, name: "Apple Watch Ultra 2 GPS+Cellular", price: 799, originalPrice: 849, discount: "6% OFF", rating: 4.8, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", isBestSeller: true, brand: "Apple", category: "Accessories" },
  { id: 17, name: "Samsung Galaxy Watch 6 Classic", price: 399, originalPrice: 449, discount: "11% OFF", rating: 4.6, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop", isBestSeller: false, brand: "Samsung", category: "Accessories" },
  { id: 18, name: "Logitech MX Master 3S Mouse", price: 99, originalPrice: null, discount: null, rating: 4.9, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", isBestSeller: true, brand: "Logitech", category: "Accessories" },
  { id: 19, name: "Razer BlackWidow V4 Keyboard", price: 169, originalPrice: 199, discount: "15% OFF", rating: 4.7, image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop", isBestSeller: false, brand: "Razer", category: "Accessories" },
  { id: 20, name: "Anker 737 Power Bank 24000mAh", price: 109, originalPrice: 129, discount: "15% OFF", rating: 4.5, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", isBestSeller: false, brand: "Anker", category: "Accessories" }
];

export default products;
