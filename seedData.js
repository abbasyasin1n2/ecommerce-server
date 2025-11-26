// ============================================
// SEED DATA - ElectroHub Products
// Complete product catalog from cardinformation.md
// ============================================

const seedProducts = [
  // =============================================
  // CATEGORY: Electronics
  // SUB-CATEGORY: Headphones (4 products)
  // =============================================
  {
    title: "Skullcandy Crusher Evo Wireless Bluetooth Headphones",
    shortDescription: "Multi-Sensory Bass, Noise Isolating Over-Ear Fit, 40 Hours Battery with Extra USB-C Charging Cable",
    fullDescription: "Experience music like never before with the Skullcandy Crusher Evo. Featuring patented multi-sensory Crusher Bass technology with two full-range 40mm audio drivers plus additional dual bass drivers, your music and movies will come alive with a sound experience you can actually feel. With up to 40 hours of battery life and Rapid Charge technology (10 minutes = 4 hours), you'll never miss a beat. Download the Skullcandy app and participate in a hearing analysis that automatically adjusts the sound levels for your specific hearing.",
    price: 10000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764138883/skullcandy_bxxoar.jpg",
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Skullcandy",
    rating: 4.7,
    specifications: {
      "Color": "True Black",
      "Ear Placement": "Over Ear",
      "Form Factor": "Over Ear",
      "Impedance": "32 Ohm",
      "Battery Life": "40 Hours",
      "Connectivity": "Wireless Bluetooth"
    },
    features: [
      "PATENTED MULTI-SENSORY CRUSHER BASS TECHNOLOGY with dual bass drivers",
      "UP TO 40 HOURS BATTERY + RAPID CHARGE (10 min = 4 hours)",
      "PERSONAL SOUND via Skullcandy App with hearing analysis",
      "CALL, TRACK AND VOLUME CONTROLS with convenient buttons",
      "BUILT-IN TILE FINDING TECHNOLOGY",
      "FLAT-FOLDING AND COLLAPSIBLE DESIGN for portability",
      "BUNDLE INCLUDES EXTRA USB-C TO USB-C CHARGING CABLE"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Raycon Everyday Earbuds Classic Bluetooth Wireless",
    shortDescription: "Stereo Sound, Active Noise Canceling, 32 Hours Playtime with Microphone - Rose Gold",
    fullDescription: "Welcome to cutting-edge technology in true wireless audio with the Raycon Everyday Earbuds Classic! Featuring advanced Bluetooth 5.2 and Active Noise Cancellation (ANC) for a stable, immersive listening experience. These wireless earbuds pair effortlessly with all Bluetooth-enabled devices up to 33 feet away. Enjoy true wireless freedom with no cords, no hassle—just powerful, high-quality sound wherever you go. The ergonomic design ensures a secure fit while guaranteeing fatigue-free ears and long-lasting comfort.",
    price: 5999,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764138984/raycon_lbz7lj.jpg",
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Raycon",
    rating: 4.3,
    specifications: {
      "Color": "Rose Gold",
      "Ear Placement": "In Ear",
      "Form Factor": "In Ear",
      "Impedance": "16 Ohm",
      "Bluetooth Version": "5.2",
      "Playtime": "32 Hours Total"
    },
    features: [
      "TRUE WIRELESS with Bluetooth 5.2 connectivity up to 33 feet",
      "ACTIVE NOISE CANCELLATION (ANC) for immersive listening",
      "LIGHTWEIGHT, SECURE & COMFORTABLE ergonomic design",
      "IPX6 WATERPROOF for workouts and outdoor activities",
      "32 HOURS TOTAL PLAYTIME (8 hours + 24 from case)",
      "DEEP BASS with high-fidelity sound",
      "6 DIFFERENT SIZED soft silicone gel tips included"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "PHILIPS TAT3519 Wireless Earbuds",
    shortDescription: "True Wireless with Noise Canceling Pro, Dynamic Bass, 24H Battery Life, Bluetooth 5.3, IPX4",
    fullDescription: "The Philips TAT3519 earbuds deliver an authentic listening experience with 10mm dynamic drivers. Adaptive noise cancellation suppresses external sounds in real time, including wind. Enjoy 8 hours of playtime with an extra 16 hours from the pocket-sized charging case. These compact true wireless earbuds sit snugly in your ear for all-day wear with 4 sizes of tips included. Bluetooth 5.3 provides stable connectivity with dual device support.",
    price: 4500,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764139191/PHILIPS_TAT3519_yv6ikq.jpg",
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Philips",
    rating: 4.0,
    specifications: {
      "Color": "Black",
      "Ear Placement": "In Ear",
      "Form Factor": "In Ear",
      "Noise Control": "Adaptive Noise Cancellation",
      "Bluetooth Version": "5.3",
      "Battery Life": "24 Hours Total"
    },
    features: [
      "10mm DYNAMIC DRIVER for authentic listening experience",
      "NOISE CANCELING PRO with adaptive ANC and Awareness Mode",
      "24 HOURS TOTAL PLAYTIME (8 + 16 from case)",
      "QUICK CHARGE - 15 minutes gives 1 hour playtime",
      "BLUETOOTH 5.3 with dual device connectivity",
      "IPX4 WATER RESISTANT with anti-slip design",
      "TOUCH & APP CONTROL via PHILIPS Headphones app"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Sennheiser HD 599 SE Around Ear Open Back Headphone",
    shortDescription: "Premium Audiophile-Grade Over-Ear Headphones with Velour Ear Pads - Black",
    fullDescription: "The Sennheiser HD 599 SE delivers exceptional sound quality with premium, audiophile-grade performance. These open-back headphones feature lightweight construction with luxurious velour covered ear pads for extreme comfort during extended listening sessions. Compatible with virtually every audio device including phones, tablets, and computers. Two detachable cables included for versatility.",
    price: 12000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764139479/Sennheiser_prpwfd.jpg",
    category: "Electronics",
    subcategory: "Headphones",
    brand: "Sennheiser",
    rating: 4.6,
    specifications: {
      "Color": "Black",
      "Ear Placement": "Over Ear",
      "Form Factor": "Over Ear",
      "Impedance": "50 Ohm",
      "Connector Type": "3.5mm Jack",
      "Design": "Open Back"
    },
    features: [
      "PREMIUM AUDIOPHILE-GRADE sound quality",
      "OPEN BACK DESIGN for natural, spacious soundstage",
      "LUXURIOUS VELOUR EAR PADS for extreme comfort",
      "LIGHTWEIGHT CONSTRUCTION for extended listening",
      "TWO DETACHABLE CABLES included (3m with 6.3mm + 1.2m with 3.5mm)",
      "UNIVERSAL COMPATIBILITY with all audio devices"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // =============================================
  // CATEGORY: Electronics
  // SUB-CATEGORY: Camera & Photo (4 products)
  // =============================================
  {
    title: "YINOCHE Kids Camera Instant Print",
    shortDescription: "Camera for Kids with Printable Photos, Toddler Camera Toys for Ages 3-14 - Blue",
    fullDescription: "The YINOCHE instant print camera adopts thermal printing technology that presents images by heating semiconductors. Choose the print mode, click the shoot button, and get a black-white photo printed instantly. Save color pictures and print black & white photos. Besides shooting, printing, and recording, this camera has 3 puzzle games, 2.4 inch IPS HD screen, 8MP photo shooting, and 1080P video recording. Perfect gift for children ages 3-14.",
    price: 2400,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764139769/YINOCHE_Kids_Camera_rduxmj.jpg",
    category: "Electronics",
    subcategory: "Camera & Photo",
    brand: "YINOCHE",
    rating: 4.5,
    specifications: {
      "Compatible Mountings": "Leica L",
      "Photo Sensor Technology": "CMOS",
      "Supported File Format": "AVI",
      "Image Stabilization": "Digital",
      "Optical Zoom": "1x",
      "Resolution": "8 MP",
      "Model Name": "KC5 Kids Camera Instant Print"
    },
    features: [
      "INSTANT PRINT with thermal printing technology",
      "8MP PHOTO SHOOTING with 1080P video recording",
      "2.4 INCH IPS HD SCREEN for easy viewing",
      "3 PUZZLE GAMES for entertainment",
      "1000mAh BATTERY for 3 hours of daily use",
      "COMES WITH SD CARD for storage",
      "30 DAYS FREE EXCHANGE, 2 years warranty"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "AGFA Photo Realishot DC8300 Compact Digital Camera",
    shortDescription: "18MP, Full HD Video, 2.7 inch LCD Screen, 8X Optical Zoom, Lithium Battery - Red",
    fullDescription: "Capture high-resolution photos and Full HD 1080p videos with the AGFA Photo Realishot DC8300. The 21MP interpolation with CMOS sensor ensures enhanced sharpness and detail. Use the 2.7-inch LCD screen to easily adjust your framing, and with the 8x optical zoom, capture subjects both up close and at a distance with precision and versatility. Features automatic scene modes and intelligent features like face detection.",
    price: 20000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764139938/AGFA_Photo_Realishot_DC8300_qey3u3.jpg",
    category: "Electronics",
    subcategory: "Camera & Photo",
    brand: "AgfaPhoto",
    rating: 3.6,
    specifications: {
      "Aspect Ratio": "1.65:1",
      "Photo Sensor Technology": "CMOS",
      "Supported File Format": "JPEG",
      "Image Stabilization": "Yes",
      "Optical Zoom": "8x",
      "Screen Size": "2.7 Inches",
      "Color": "Red",
      "Photo Sensor Size": "1/3.2-inch"
    },
    features: [
      "21MP INTERPOLATION with CMOS Sensor",
      "FULL HD 1080p video recording",
      "2.7 INCH LCD SCREEN for framing",
      "8X OPTICAL ZOOM for versatile shooting",
      "RECHARGEABLE LITHIUM BATTERY via USB",
      "EXPANDABLE STORAGE up to 32GB SD card",
      "SCENE MODES: portrait, landscape, night with face detection"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Instant Print Camera for Kids - Funducts",
    shortDescription: "Toddler Cameras with 1080P HD Video, 32GB SD Card, 3 Rolls Photo Paper - Blue",
    fullDescription: "This kids camera is not only a digital camera for taking photos but also an instant print camera. Print black-and-white photos in just 1 second, while color images save to the 32GB SD card. With 3 rolls of BPA-free thermal paper included. Features 1080P video, 16X digital zoom, filters, frames, and MP3 playback. The 2.4 inch large screen includes puzzle games for casual relaxation. Perfect birthday or Christmas gift for kids ages 3-12.",
    price: 4800,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764140177/Instant_Print_Camera_for_Kids_gjtdp3.jpg",
    category: "Electronics",
    subcategory: "Camera & Photo",
    brand: "Funducts",
    rating: 4.2,
    specifications: {
      "Optical Zoom": "1x",
      "Digital Zoom": "16x",
      "Resolution": "48 MP",
      "Color": "Blue",
      "Battery": "Lithium Ion",
      "Screen Size": "2.4 Inches",
      "Battery Weight": "32 Grams"
    },
    features: [
      "INSTANT PRINT in just 1 second",
      "1080P HD VIDEO recording with 48MP photos",
      "16X DIGITAL ZOOM with filters and frames",
      "BPA-FREE THERMAL PAPER - safe for kids",
      "32GB SD CARD INCLUDED for storage",
      "4-6 HOURS BATTERY LIFE on full charge",
      "SHOCKPROOF DESIGN with lanyard included"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Fujifilm Instax Mini 12 Instant Camera Bundle",
    shortDescription: "Clay White with Minimate Custom Case, 10 Sheet Film & Photo Album",
    fullDescription: "The Fujifilm Instax Mini 12 Camera features a Fujinon 60mm Lens and Optical Image Viewfinder. This Polaroid-style instant camera produces credit card size prints instantly. Quickly capture fun moments and savor them forever. Includes selfie mirror integrated on lens, built-in flash, and auto exposure mode with matching camera strap. Bundle includes 10 Instax film sheets, custom case, and photo album.",
    price: 16000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764140493/Fujifilm_Instax_Mini_is50m8.jpg",
    category: "Electronics",
    subcategory: "Camera & Photo",
    brand: "Fujifilm",
    rating: 4.6,
    specifications: {
      "Film Format Type": "Instax Mini",
      "Model Name": "Mini 12",
      "Film Color": "Color",
      "Viewfinder Magnification": "1.0x",
      "Lens": "Fujinon 60mm",
      "Color": "Clay White"
    },
    features: [
      "INSTANT PRINT - credit card size photos",
      "FUJINON 60mm LENS with optical viewfinder",
      "SELFIE MIRROR integrated on lens",
      "BUILT-IN FLASH with Auto Exposure Mode",
      "BUNDLE INCLUDES 10 film sheets, case & album",
      "MATCHING CAMERA STRAP included"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // =============================================
  // CATEGORY: Computer
  // SUB-CATEGORY: Monitors (4 products)
  // =============================================
  {
    title: "KOORUI 24 Inch Computer Gaming Monitor",
    shortDescription: "Full HD 1920x1080p 144Hz IPS Ultra-Slim Display with HDMI VGA, FreeSync",
    fullDescription: "The KOORUI gaming monitor delivers a seamless gaming experience with a 144Hz refresh rate and FreeSync support. Say goodbye to screen tearing and lag—perfect for fast-paced competitive gaming. Enjoy stunning visuals with this 24-inch monitor featuring an IPS panel, 99% sRGB, and 72% NTSC color coverage. Wide viewing angles and accurate color reproduction make it ideal for gaming, content creation, and media consumption. Equipped with flicker-free technology and low blue light mode.",
    price: 10000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764140868/KOORUI_t78uue.jpg",
    category: "Computer",
    subcategory: "Monitors",
    brand: "KOORUI",
    rating: 4.5,
    specifications: {
      "Screen Size": "23.8 Inches",
      "Resolution": "FHD 1080p (1920x1080)",
      "Refresh Rate": "144Hz",
      "Panel Type": "IPS",
      "Aspect Ratio": "16:9",
      "Color Gamut": "99% sRGB, 72% NTSC",
      "Connectivity": "HDMI, VGA",
      "Screen Surface": "Matte"
    },
    features: [
      "144Hz REFRESH RATE for smooth gaming",
      "FREESYNC SUPPORT - eliminates screen tearing",
      "IPS PANEL with wide viewing angles",
      "99% sRGB COLOR ACCURACY",
      "ULTRA-SLIM DESIGN with VESA 100x100mm mount",
      "EYE CARE technology with flicker-free and low blue light",
      "12-MONTH REPLACEMENT WARRANTY"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Philips 24 inch Frameless Full HD Monitor",
    shortDescription: "100Hz, VESA, HDMI, VGA, Eye Care, 4 Year Warranty - 241V8LB Black",
    fullDescription: "This 23.8\" Philips V line monitor delivers crisp Full HD 1920x1080 visuals. The VA panel produces brighter whites and deeper blacks with true-to-life images and 16.7 million colors. The 178/178 degree extra wide viewing angle prevents color shifting. Virtually bezel-free on three sides for seamless multi-monitor setups. EasyRead mode provides a paper-like experience for lengthy documents.",
    price: 9000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764141013/Philips_New_24_inch_Frameless_b9k79z.jpg",
    category: "Computer",
    subcategory: "Monitors",
    brand: "Philips",
    rating: 4.6,
    specifications: {
      "Screen Size": "23.8 Inches",
      "Resolution": "FHD 1080p (1920x1080)",
      "Refresh Rate": "100Hz",
      "Panel Type": "VA",
      "Aspect Ratio": "16:9",
      "Connectivity": "HDMI, VGA",
      "Screen Surface": "Glossy"
    },
    features: [
      "CRISP FULL HD 1920x1080 visuals",
      "VA PANEL with incredible contrast",
      "178/178 DEGREE wide viewing angles",
      "FRAMELESS DESIGN on three sides",
      "EASYREAD MODE for documents",
      "4 YEAR ADVANCE REPLACEMENT WARRANTY"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "ASUS ROG Swift 32\" 4K OLED Gaming Monitor",
    shortDescription: "QD-OLED, 240Hz, 0.03ms, G-SYNC Compatible, 99% DCI-P3, 90W USB-C - PG32UCDM",
    fullDescription: "32-inch 4K (3840 x 2160) QD-OLED gaming monitor with 240Hz refresh rate and 0.03ms (GTG) response time for immersive gaming. Features highly efficient custom heatsink, advanced airflow design, and graphene film for better heat management to reduce burn-in risk. VESA DisplayHDR 400 True Black compliance with 99% DCI-P3 gamut and true 10-bit color. Includes 3-month Adobe Creative Cloud subscription.",
    price: 70000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764141170/ASUS_ROG_Swift_32_j6ulxt.jpg",
    category: "Computer",
    subcategory: "Monitors",
    brand: "ASUS",
    rating: 4.4,
    specifications: {
      "Screen Size": "32 Inches",
      "Resolution": "4K UHD (3840x2160)",
      "Refresh Rate": "240Hz",
      "Response Time": "0.03ms GTG",
      "Panel Type": "QD-OLED",
      "Aspect Ratio": "16:9",
      "Color Gamut": "99% DCI-P3",
      "HDR": "VESA DisplayHDR 400 True Black",
      "Screen Surface": "Matte"
    },
    features: [
      "4K QD-OLED with 240Hz refresh rate",
      "0.03ms RESPONSE TIME for competitive gaming",
      "G-SYNC COMPATIBLE",
      "CUSTOM HEATSINK with graphene film for OLED protection",
      "TRUE 10-BIT COLOR with Delta E < 2",
      "90W USB-C power delivery",
      "3-MONTH ADOBE CREATIVE CLOUD included"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Dell S2425HS Monitor 23.8 Inch FHD",
    shortDescription: "100Hz, Integrated 2x5W Speakers, Height/Tilt/Swivel/Pivot Adjustable - Ash White",
    fullDescription: "Modern, lifestyle-inspired design with ultrathin bezels. Enjoy impressive audio with integrated dual 5W speakers with wide dynamic range and 5 preset audio profiles. Experience consistent vibrant colors across wide viewing angles with IPS technology and 99% sRGB coverage. TÜV Rheinland 4-star eye comfort certification with ComfortView Plus reducing blue light to less than 35%.",
    price: 12000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764141290/Dell_S2425HS_Monitor_qtigcl.jpg",
    category: "Computer",
    subcategory: "Monitors",
    brand: "Dell",
    rating: 4.7,
    specifications: {
      "Screen Size": "23.8 Inches",
      "Resolution": "FHD 1080p (1920x1080)",
      "Refresh Rate": "100Hz",
      "Panel Type": "IPS",
      "Aspect Ratio": "16:9",
      "Color Gamut": "99% sRGB",
      "Speakers": "2x 5W Integrated",
      "Screen Surface": "Matte",
      "Contrast Ratio": "1500:1"
    },
    features: [
      "ULTRATHIN BEZELS with modern design",
      "DUAL 5W SPEAKERS with 5 audio presets",
      "IPS PANEL with 99% sRGB coverage",
      "FULL ERGONOMIC ADJUSTMENT: tilt, swivel, pivot, height",
      "TÜV RHEINLAND 4-STAR eye comfort certified",
      "COMFORTVIEW PLUS reduces blue light to <35%",
      "DUAL HDMI connectivity"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // =============================================
  // CATEGORY: Computer
  // SUB-CATEGORY: Computer Accessories & Peripherals (4 products)
  // =============================================
  {
    title: "Xbox Wireless Gaming Controller (2025) - Carbon Black",
    shortDescription: "Play on Xbox, Windows, Android, iOS, FireTV, Smart TVs, VR - 40 Hours Battery",
    fullDescription: "Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay with battery life up to 40 hours. New hybrid D-pad and textured grip on triggers, bumpers, and back-case. Seamlessly capture and share content with the Share button. Includes Xbox Wireless and Bluetooth technology for easy pairing across devices.",
    price: 5000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764141564/Xbox_Wireless_Gaming_Controller_e3hvxh.jpg",
    category: "Computer",
    subcategory: "Computer Accessories & Peripherals",
    brand: "Xbox",
    rating: 4.8,
    specifications: {
      "Platform": "Xbox One, iOS, Windows, Android, Xbox Series S, Xbox Series X",
      "Battery Life": "Up to 40 Hours",
      "Connectivity": "Xbox Wireless, Bluetooth",
      "Audio Jack": "3.5mm",
      "USB": "USB-C"
    },
    features: [
      "MODERNIZED DESIGN with sculpted surfaces",
      "UP TO 40 HOURS battery life",
      "HYBRID D-PAD with textured grip",
      "SHARE BUTTON for screenshots and recordings",
      "CROSS-PLATFORM: Xbox, Windows, Android, iOS, Smart TVs, VR",
      "3.5mm AUDIO JACK for headsets",
      "CUSTOM BUTTON MAPPING via Xbox Accessories app"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "ASUS ROG Strix B550-F Gaming WiFi II Motherboard",
    shortDescription: "AMD AM4, ATX, PCIe 4.0, WiFi 6E, 2.5Gb LAN, HDMI 2.1, Aura Sync RGB",
    fullDescription: "AM4 socket motherboard ready for AMD Ryzen 3000 and 5000 series, plus 5000 and 4000 G-series desktop processors. Best gaming connectivity with PCIe 4.0-ready, dual M.2 slots, USB 3.2 Gen 2 Type-C, HDMI 2.1 and DisplayPort 1.2. Features on-board WiFi 6E (802.11ax) and Intel 2.5 Gb Ethernet. Robust 12+2 teamed power stages with ProCool power connector.",
    price: 14500,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764141815/Asus_ROG_Strix_B550-F_gum22z.jpg",
    category: "Computer",
    subcategory: "Computer Accessories & Peripherals",
    brand: "ASUS",
    rating: 4.5,
    specifications: {
      "CPU Socket": "Socket AM4",
      "Compatible Processors": "AMD Ryzen 3000/5000 Series",
      "Chipset": "AMD B550",
      "RAM Technology": "DDR4",
      "Memory Speed": "2133 MHz",
      "Form Factor": "ATX",
      "WiFi": "WiFi 6E (802.11ax)",
      "Bluetooth": "v5.2"
    },
    features: [
      "AM4 SOCKET for Ryzen 3000/5000 series",
      "PCIe 4.0 READY with dual M.2 slots",
      "WIFI 6E (802.11ax) built-in",
      "INTEL 2.5Gb ETHERNET with LANGuard",
      "12+2 POWER STAGES with ProCool connector",
      "HDMI 2.1 and DisplayPort 1.2 output",
      "AURA SYNC RGB lighting"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "CORSAIR Vengeance LPX DDR4 RAM 32GB (2x16GB)",
    shortDescription: "3200MHz CL16-20-20-38 1.35V Desktop Memory - Black",
    fullDescription: "Hand-sorted memory chips ensure high performance with generous overclocking headroom. VENGEANCE LPX is optimized for wide compatibility with the latest Intel and AMD DDR4 motherboards. Low-profile height of just 34mm ensures fit in most small-form-factor builds. High-performance PCB guarantees strong signal quality and stability. Solid aluminum heatspreader efficiently dissipates heat.",
    price: 18000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142021/CORSAIR_Vengeance_LPX_gy2jgw.jpg",
    category: "Computer",
    subcategory: "Computer Accessories & Peripherals",
    brand: "Corsair",
    rating: 4.8,
    specifications: {
      "Memory Size": "32 GB (2x16GB)",
      "Memory Technology": "DDR4",
      "Memory Speed": "3200 MHz",
      "CAS Latency": "CL16-20-20-38",
      "Voltage": "1.35V",
      "Height": "34mm",
      "Compatible Devices": "Intel 300/400/500 Series, AMD"
    },
    features: [
      "HAND-SORTED CHIPS for high performance",
      "WIDE COMPATIBILITY with Intel and AMD",
      "LOW-PROFILE 34mm height for SFF builds",
      "HIGH-PERFORMANCE PCB for signal stability",
      "ALUMINUM HEATSPREADER for heat dissipation",
      "XMP 2.0 SUPPORT for easy overclocking"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "AMD RYZEN 7 9800X3D Desktop Processor",
    shortDescription: "8-Core, 16-Thread, Zen 5 Architecture, 96MB L3 Cache, Up to 5.2GHz",
    fullDescription: "The world's fastest gaming processor, built on AMD 'Zen5' technology and Next Gen 3D V-Cache. 8 cores and 16 threads delivering +~16% IPC uplift and great power efficiency. 96MB L3 cache with better thermal performance vs. previous gen allowing higher clock speeds up to 5.2GHz. Drop-in ready for proven Socket AM5 infrastructure. Cooler not included.",
    price: 45000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142227/AMD_RYZEN_7_9800X3D_x3hqzd.jpg",
    category: "Computer",
    subcategory: "Computer Accessories & Peripherals",
    brand: "AMD",
    rating: 4.8,
    specifications: {
      "CPU Model": "Ryzen 7 9800X3D",
      "Cores": "8",
      "Threads": "16",
      "Base Clock": "4.7 GHz",
      "Boost Clock": "5.2 GHz",
      "L3 Cache": "96MB (3D V-Cache)",
      "Socket": "AM5",
      "Architecture": "Zen 5"
    },
    features: [
      "WORLD'S FASTEST GAMING PROCESSOR",
      "ZEN 5 ARCHITECTURE with 16% IPC uplift",
      "96MB 3D V-CACHE for gaming performance",
      "8 CORES / 16 THREADS",
      "UP TO 5.2GHz boost clock",
      "SOCKET AM5 compatible",
      "IMPROVED THERMAL PERFORMANCE"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // =============================================
  // CATEGORY: Computer
  // SUB-CATEGORY: GPU (4 products)
  // =============================================
  {
    title: "PowerColor Hellhound Spectral White AMD Radeon RX 9060 XT",
    shortDescription: "16GB GDDR6 Graphics Card, 2740 MHz, HDMI 2.1b, DisplayPort 2.1a",
    fullDescription: "PowerColor Hellhound Spectral White edition featuring AMD Radeon RX 9060 XT with 16GB GDDR6 memory. GPU clock speed of 2740 MHz. Connectivity includes 1x HDMI 2.1b and 2x DisplayPort 2.1a. Requires one 8-pin PCI Express power connector and minimum 550W system power. Card dimensions: 310 x 100 x 40mm.",
    price: 55000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142426/PowerColor_Hellhound_jgyvwy.jpg",
    category: "Computer",
    subcategory: "GPU",
    brand: "PowerColor",
    rating: 4.5,
    specifications: {
      "GPU": "AMD Radeon RX 9060 XT",
      "Memory": "16 GB GDDR6",
      "GPU Clock": "2740 MHz",
      "Power Connector": "1x 8-pin PCIe",
      "Min System Power": "550W",
      "Outputs": "1x HDMI 2.1b, 2x DisplayPort 2.1a",
      "Dimensions": "310 x 100 x 40mm"
    },
    features: [
      "AMD RADEON RX 9060 XT GPU",
      "16GB GDDR6 high-speed memory",
      "2740 MHz GPU clock speed",
      "HDMI 2.1b and DisplayPort 2.1a",
      "SPECTRAL WHITE premium design",
      "550W MINIMUM system power requirement"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "GIGABYTE GeForce RTX 5060 WINDFORCE OC 8G",
    shortDescription: "8GB GDDR7 128-bit, PCIe 5.0, NVIDIA Blackwell, DLSS 4",
    fullDescription: "Powered by the NVIDIA Blackwell architecture and DLSS 4. Features GeForce RTX 5060 GPU integrated with 8GB GDDR7 128-bit memory interface. PCIe 5.0 support for maximum bandwidth. WINDFORCE cooling system ensures optimal temperatures during intensive gaming sessions.",
    price: 60000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142541/GIGABYTE_GeForce_RTX_5060_relwat.jpg",
    category: "Computer",
    subcategory: "GPU",
    brand: "GIGABYTE",
    rating: 4.7,
    specifications: {
      "GPU": "NVIDIA GeForce RTX 5060",
      "Architecture": "Blackwell",
      "Memory": "8 GB GDDR7",
      "Memory Interface": "128-bit",
      "PCIe": "5.0",
      "Outputs": "DisplayPort, HDMI"
    },
    features: [
      "NVIDIA BLACKWELL architecture",
      "DLSS 4 AI-powered graphics",
      "8GB GDDR7 next-gen memory",
      "PCIe 5.0 interface",
      "WINDFORCE COOLING SYSTEM",
      "FACTORY OVERCLOCKED"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "MSI Gaming GeForce RTX 3060 12GB",
    shortDescription: "15 Gbps GDDR6 192-Bit, PCIe 4, Twin Fan Ampere OC",
    fullDescription: "NVIDIA GeForce RTX 3060 with 12GB GDDR6 dedicated graphics memory. Features 1710 MHz base GPU clock speed and 1807 MHz boost clock. Connectivity includes 3x DisplayPort v1.4a and 1x HDMI 2.1. Maximum display resolution of 7680 x 4320. Perfect for 1080p and 1440p gaming.",
    price: 35000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142652/MSI_Gaming_GeForce_RTX_3060_pkvwpl.jpg",
    category: "Computer",
    subcategory: "GPU",
    brand: "MSI",
    rating: 4.7,
    specifications: {
      "GPU": "NVIDIA GeForce RTX 3060",
      "Architecture": "Ampere",
      "Memory": "12 GB GDDR6",
      "Memory Speed": "15 Gbps",
      "Memory Interface": "192-bit",
      "Base Clock": "1710 MHz",
      "Boost Clock": "1807 MHz",
      "Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1",
      "Max Resolution": "7680 x 4320"
    },
    features: [
      "NVIDIA AMPERE architecture",
      "12GB GDDR6 memory at 15 Gbps",
      "RAY TRACING and DLSS support",
      "TORX TWIN FAN cooling",
      "FACTORY OVERCLOCKED",
      "MULTIPLE DISPLAY SUPPORT up to 8K"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "PowerColor Red Devil AMD Radeon RX 9070 XT",
    shortDescription: "16GB GDDR6, 2520 MHz, Triple Fan, HDMI 2.1, DisplayPort 2.1",
    fullDescription: "PowerColor Red Devil premium edition featuring AMD Radeon RX 9070 XT with 16GB GDDR6 memory. GPU clock speed of 2520 MHz. Features triple 8-pin PCI Express power connectors for maximum performance. Connectivity includes 1x HDMI 2.1 and 3x DisplayPort 2.1. Requires minimum 900W system power. Card dimensions: 340 x 132 x 69mm.",
    price: 95000,
    imageUrl: "https://res.cloudinary.com/dslruzece/image/upload/v1764142817/PowerColor_Red_Devil_AMD_Radeon_RX_9070_XT_kdonhc.jpg",
    category: "Computer",
    subcategory: "GPU",
    brand: "PowerColor",
    rating: 4.8,
    specifications: {
      "GPU": "AMD Radeon RX 9070 XT",
      "Memory": "16 GB GDDR6",
      "GPU Clock": "2520 MHz",
      "Power Connector": "3x 8-pin PCIe",
      "Min System Power": "900W",
      "Outputs": "1x HDMI 2.1, 3x DisplayPort 2.1",
      "Dimensions": "340 x 132 x 69mm"
    },
    features: [
      "AMD RADEON RX 9070 XT flagship GPU",
      "16GB GDDR6 high-speed memory",
      "RED DEVIL TRIPLE FAN cooling",
      "HDMI 2.1 and 3x DisplayPort 2.1",
      "PREMIUM BUILD QUALITY",
      "900W MINIMUM system power requirement"
    ],
    createdBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = seedProducts;
