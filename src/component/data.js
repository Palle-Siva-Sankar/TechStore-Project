const products = [
  // Computers
  { 
    id: 1, 
    name: "Apple iMac 27\", 1TB HDD, Retina 5K Display", 
    price: 1699, 
    originalPrice: 1999, 
    discount: "15% OFF", 
    rating: 5.0, 
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Apple", 
    category: "Computers",
    reviews: [
      { id: 101, user: "Sarah J.", avatar: "https://i.pravatar.cc/150?u=1", rating: 5, date: "2024-03-15", comment: "The display is absolutely stunning. Perfect for my design work!", verified: true },
      { id: 102, user: "Mark T.", avatar: "https://i.pravatar.cc/150?u=2", rating: 5, date: "2024-02-28", comment: "Fast, sleek, and reliable. Exactly what I expected from Apple.", verified: true }
    ]
  },
  { 
    id: 2, 
    name: "MacBook Pro M2 14\" Space Gray", 
    price: 1999, 
    originalPrice: 2199, 
    discount: "9% OFF", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Apple", 
    category: "Computers",
    reviews: [
      { id: 201, user: "Alex R.", avatar: "https://i.pravatar.cc/150?u=3", rating: 5, date: "2024-03-10", comment: "M2 chip is a beast. Battery life is incredible.", verified: true },
      { id: 202, user: "Jessica W.", avatar: "https://i.pravatar.cc/150?u=4", rating: 4, date: "2024-03-05", comment: "Amazing laptop, but quite expensive.", verified: true }
    ]
  },
  { 
    id: 3, 
    name: "Dell XPS 15 OLED Laptop", 
    price: 1799, 
    originalPrice: 1899, 
    discount: "5% OFF", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Dell", 
    category: "Computers",
    reviews: [
      { id: 301, user: "David L.", avatar: "https://i.pravatar.cc/150?u=5", rating: 5, date: "2024-02-20", comment: "The OLED screen is a game changer. Colors pop!", verified: true },
      { id: 302, user: "Emma S.", avatar: "https://i.pravatar.cc/150?u=6", rating: 4, date: "2024-02-15", comment: "Beautiful design, though it gets a bit warm under load.", verified: true }
    ]
  },
  { 
    id: 4, 
    name: "ASUS ROG Zephyrus G14 Gaming", 
    price: 1499, 
    originalPrice: 1699, 
    discount: "12% OFF", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Asus", 
    category: "Computers",
    reviews: [
      { id: 401, user: "Kevin M.", avatar: "https://i.pravatar.cc/150?u=7", rating: 5, date: "2024-03-01", comment: "Best gaming laptop for the size. Handles everything smoothly.", verified: true },
      { id: 402, user: "Chris P.", avatar: "https://i.pravatar.cc/150?u=8", rating: 4, date: "2024-02-25", comment: "Great performance, but the fans can get loud.", verified: true }
    ]
  },
  { 
    id: 5, 
    name: "Lenovo ThinkPad X1 Carbon Gen 11", 
    price: 1599, 
    originalPrice: null, 
    discount: null, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Lenovo", 
    category: "Computers",
    reviews: [
      { id: 501, user: "Robert K.", avatar: "https://i.pravatar.cc/150?u=9", rating: 5, date: "2024-01-30", comment: "The keyboard is legendary. Perfect for business trips.", verified: true },
      { id: 502, user: "Linda B.", avatar: "https://i.pravatar.cc/150?u=10", rating: 4, date: "2024-01-15", comment: "Lightweight and durable. Great build quality.", verified: false }
    ]
  },

  // Smartphones
  { 
    id: 6, 
    name: "iPhone 15 Pro Max 256GB", 
    price: 1199, 
    originalPrice: null, 
    discount: null, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Apple", 
    category: "Smartphones",
    reviews: [
      { id: 601, user: "Aiden G.", avatar: "https://i.pravatar.cc/150?u=11", rating: 5, date: "2024-03-12", comment: "The camera is insane. Best phone I've ever owned.", verified: true },
      { id: 602, user: "Sophia L.", avatar: "https://i.pravatar.cc/150?u=12", rating: 5, date: "2024-03-08", comment: "Titanium build feels so premium. Loving it!", verified: true }
    ]
  },
  { 
    id: 7, 
    name: "Samsung Galaxy S24 Ultra 512GB", 
    price: 1299, 
    originalPrice: 1399, 
    discount: "7% OFF", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Samsung", 
    category: "Smartphones",
    reviews: [
      { id: 701, user: "Liam N.", avatar: "https://i.pravatar.cc/150?u=13", rating: 5, date: "2024-03-05", comment: "The zoom is incredible. AI features are actually useful.", verified: true },
      { id: 702, user: "Olivia D.", avatar: "https://i.pravatar.cc/150?u=14", rating: 4, date: "2024-02-28", comment: "Massive screen, very powerful. S-Pen is a nice touch.", verified: true }
    ]
  },
  { 
    id: 8, 
    name: "Google Pixel 8 Pro 128GB", 
    price: 999, 
    originalPrice: 1099, 
    discount: "9% OFF", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Google", 
    category: "Smartphones",
    reviews: [
      { id: 801, user: "Noah V.", avatar: "https://i.pravatar.cc/150?u=15", rating: 5, date: "2024-02-15", comment: "The cleanest Android experience. Photos are stunning.", verified: true },
      { id: 802, user: "Mia H.", avatar: "https://i.pravatar.cc/150?u=16", rating: 4, date: "2024-02-10", comment: "Great software features, battery life could be better.", verified: true }
    ]
  },
  { 
    id: 9, 
    name: "OnePlus 12 16GB RAM", 
    price: 799, 
    originalPrice: 899, 
    discount: "11% OFF", 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "OnePlus", 
    category: "Smartphones",
    reviews: [
      { id: 901, user: "Lucas F.", avatar: "https://i.pravatar.cc/150?u=17", rating: 5, date: "2024-01-25", comment: "Fastest charging phone I've used. Performance is top-notch.", verified: true },
      { id: 902, user: "Isabella K.", avatar: "https://i.pravatar.cc/150?u=18", rating: 4, date: "2024-01-20", comment: "Excellent value for money. Very smooth screen.", verified: true }
    ]
  },
  { 
    id: 10, 
    name: "Sony Xperia 1 V Flagship", 
    price: 1399, 
    originalPrice: null, 
    discount: null, 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Sony", 
    category: "Smartphones",
    reviews: [
      { id: 1001, user: "Ethan S.", avatar: "https://i.pravatar.cc/150?u=19", rating: 5, date: "2024-03-01", comment: "Best phone for photography enthusiasts. Manual controls are great.", verified: true },
      { id: 1002, user: "Ava Z.", avatar: "https://i.pravatar.cc/150?u=20", rating: 4, date: "2024-02-25", comment: "Love the 4K screen and headphone jack. A bit expensive though.", verified: true }
    ]
  },

  // Audio
  { 
    id: 11, 
    name: "Sony WH-1000XM5 Wireless", 
    price: 349, 
    originalPrice: 399, 
    discount: "12% OFF", 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Sony", 
    category: "Audio",
    reviews: [
      { id: 1101, user: "Mason B.", avatar: "https://i.pravatar.cc/150?u=21", rating: 5, date: "2024-03-10", comment: "Noise cancellation is magical. Comfort is 10/10.", verified: true },
      { id: 1102, user: "Charlotte J.", avatar: "https://i.pravatar.cc/150?u=22", rating: 5, date: "2024-03-05", comment: "Sound quality is superb. Best headphones in the market.", verified: true }
    ]
  },
  { 
    id: 12, 
    name: "Apple AirPods Pro 2nd Gen", 
    price: 249, 
    originalPrice: 299, 
    discount: "16% OFF", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Apple", 
    category: "Audio",
    reviews: [
      { id: 1201, user: "James W.", avatar: "https://i.pravatar.cc/150?u=23", rating: 5, date: "2024-03-08", comment: "Seamless integration with iPhone. ANC is much improved.", verified: true },
      { id: 1202, user: "Amelia L.", avatar: "https://i.pravatar.cc/150?u=24", rating: 4, date: "2024-03-01", comment: "Great fit, sound is crisp. Love the charging case.", verified: true }
    ]
  },
  { 
    id: 13, 
    name: "Bose QuietComfort Ultra", 
    price: 429, 
    originalPrice: null, 
    discount: null, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Bose", 
    category: "Audio",
    reviews: [
      { id: 1301, user: "Benjamin T.", avatar: "https://i.pravatar.cc/150?u=25", rating: 5, date: "2024-02-15", comment: "Immersive audio mode is wild. Very comfortable for long flights.", verified: true },
      { id: 1302, user: "Evelyn M.", avatar: "https://i.pravatar.cc/150?u=26", rating: 4, date: "2024-02-10", comment: "Excellent ANC, sounds very balanced.", verified: true }
    ]
  },
  { 
    id: 14, 
    name: "Sennheiser Momentum 4 Wireless", 
    price: 349, 
    originalPrice: null, 
    discount: null, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Sennheiser", 
    category: "Audio",
    reviews: [
      { id: 1401, user: "Henry C.", avatar: "https://i.pravatar.cc/150?u=27", rating: 5, date: "2024-01-20", comment: "Battery life is insane. 60 hours is no joke.", verified: true },
      { id: 1402, user: "Grace P.", avatar: "https://i.pravatar.cc/150?u=28", rating: 4, date: "2024-01-15", comment: "Audiophile-grade sound quality. Simple design.", verified: true }
    ]
  },
  { 
    id: 15, 
    name: "JBL Tune 770NC Wireless", 
    price: 199, 
    originalPrice: 249, 
    discount: "20% OFF", 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "JBL", 
    category: "Audio",
    reviews: [
      { id: 1501, user: "Sebastian R.", avatar: "https://i.pravatar.cc/150?u=29", rating: 5, date: "2023-12-15", comment: "Great bass, very punchy. Good value for money.", verified: true },
      { id: 1502, user: "Harper Q.", avatar: "https://i.pravatar.cc/150?u=30", rating: 4, date: "2023-12-01", comment: "Solid ANC for the price. Foldable and portable.", verified: true }
    ]
  },

  // Accessories
  { 
    id: 16, 
    name: "Apple Watch Ultra 2 GPS+Cellular", 
    price: 799, 
    originalPrice: 849, 
    discount: "6% OFF", 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Apple", 
    category: "Accessories",
    reviews: [
      { id: 1601, user: "Jack O.", avatar: "https://i.pravatar.cc/150?u=31", rating: 5, date: "2024-03-05", comment: "Rugged and capable. Battery life finally lasts 3 days.", verified: true },
      { id: 1602, user: "Scarlett Y.", avatar: "https://i.pravatar.cc/150?u=32", rating: 5, date: "2024-03-01", comment: "The brightest screen I've seen on a watch. Perfect for hiking.", verified: true }
    ]
  },
  { 
    id: 17, 
    name: "Samsung Galaxy Watch 6 Classic", 
    price: 399, 
    originalPrice: 449, 
    discount: "11% OFF", 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Samsung", 
    category: "Accessories",
    reviews: [
      { id: 1701, user: "Owen X.", avatar: "https://i.pravatar.cc/150?u=33", rating: 5, date: "2024-02-15", comment: "The rotating bezel is back! Love the classic look.", verified: true },
      { id: 1702, user: "Zoe V.", avatar: "https://i.pravatar.cc/150?u=34", rating: 4, date: "2024-02-10", comment: "Great health tracking features. Beautiful screen.", verified: true }
    ]
  },
  { 
    id: 18, 
    name: "Logitech MX Master 3S Mouse", 
    price: 99, 
    originalPrice: null, 
    discount: null, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", 
    isBestSeller: true, 
    brand: "Logitech", 
    category: "Accessories",
    reviews: [
      { id: 1801, user: "Wyatt U.", avatar: "https://i.pravatar.cc/150?u=35", rating: 5, date: "2024-03-10", comment: "The quiet clicks are amazing. Best productivity mouse.", verified: true },
      { id: 1802, user: "Abigail H.", avatar: "https://i.pravatar.cc/150?u=36", rating: 5, date: "2024-03-05", comment: "Ergonomics are perfect. Multi-device switching is seamless.", verified: true }
    ]
  },
  { 
    id: 19, 
    name: "Razer BlackWidow V4 Keyboard", 
    price: 169, 
    originalPrice: 199, 
    discount: "15% OFF", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Razer", 
    category: "Accessories",
    reviews: [
      { id: 1901, user: "Gabriel N.", avatar: "https://i.pravatar.cc/150?u=37", rating: 5, date: "2024-01-15", comment: "Switches feel great. RGB lighting is top-tier.", verified: true },
      { id: 1902, user: "Chloe G.", avatar: "https://i.pravatar.cc/150?u=38", rating: 4, date: "2024-01-05", comment: "Solid build, great for gaming and typing.", verified: true }
    ]
  },
  { 
    id: 20, 
    name: "Anker 737 Power Bank 24000mAh", 
    price: 109, 
    originalPrice: 129, 
    discount: "15% OFF", 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", 
    isBestSeller: false, 
    brand: "Anker", 
    category: "Accessories",
    reviews: [
      { id: 2001, user: "Julian F.", avatar: "https://i.pravatar.cc/150?u=39", rating: 5, date: "2023-11-20", comment: "Can charge my laptop! The screen is very informative.", verified: true },
      { id: 2002, user: "Victoria E.", avatar: "https://i.pravatar.cc/150?u=40", rating: 4, date: "2023-11-10", comment: "Fastest power bank I've owned. A bit bulky but worth it.", verified: true }
    ]
  }
];

export default products;
