/**
 * Every string on the site, in both languages.
 *
 * The voice is quiet and precise: short sentences, no exclamation, no sales
 * pressure. The page is built like a spec sheet, so the words behave like one —
 * they state, they don't shout. The Arabic edition keeps the same register:
 * formal, plain, no ornament.
 *
 * `EN` is the source of truth for the shape; `AR` is typed against it, so a
 * string added on one side has to be added on the other before this compiles.
 *
 * Company facts (positioning, activities, vision, mission, the partner names)
 * are taken from the company profile supplied by the client in September 2026.
 * Product figures still come from the packaging in `visuals/`.
 */

export type Locale = "en" | "ar";

export const LOCALES: readonly Locale[] = ["en", "ar"];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie that carries the visitor's choice, read by the server on every request. */
export const LOCALE_COOKIE = "marasi.locale";

export const DIR: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ar: "rtl" };

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

export type ProfileBlock = {
  title: string;
  paragraphs: string[];
  /** Optional enumeration printed after the paragraphs. */
  list?: string[];
};

const EN = {
  meta: {
    title: "Marasi Al-Arz — food import, trading & distribution in Iraq",
    description:
      "Iraq-based importer, trader and distributor of food products, with its own ProBite label of food-service pickles, peppers and sauces. Wholesale, agencies, private label.",
  },
  nav: {
    range: "Range",
    house: "About",
    business: "Business",
    partners: "Partners",
    profile: "Profile",
    process: "Process",
    controls: "Standards",
    contact: "Contact",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    /** The toggle names the language it switches *to*. */
    language: "عربي",
    languageA11y: "Switch to Arabic",
  },
  a11y: {
    toggleTheme: "Switch between light and dark",
    scrollProgress: "Reading progress",
  },
  hero: {
    eyebrow: "Marasi Al-Arz · Food import, trading & distribution · Iraq",
    headline: "Good taste, by the case.",
    lede: "We import, distribute and market the food products that professional kitchens across Iraq rely on — including our own ProBite label, in formats measured for service.",
    primary: "View the range",
    secondary: "Request a quote",
    stampTop: "Marasi Al-Arz",
    manifest: [
      { k: "Base", v: "Iraq" },
      { k: "Brand", v: "ProBite" },
      { k: "Model", v: "Import & distribution" },
      { k: "Lines", v: "03" },
    ],
    labelCaption: "Our own brand",
    scroll: "Scroll",
  },
  ticker: [
    "Import & distribution",
    "Iraq-wide supply",
    "Food-service formats",
    "Real cheddar",
    "Gluten free",
    "Bilingual labelling",
    "Private label available",
    "Wholesale supply",
  ],
  figures: {
    eyebrow: "Off the label",
    title: "The numbers, as printed",
    note: "Every figure below appears on the pack itself. None of them are estimates.",
    items: [
      { value: 3.78, suffix: " kg", label: "Net weight, food-service jar" },
      { value: 25, suffix: "", label: "Servings per jar, at 100 g" },
      { value: 48, suffix: "", label: "Servings per cheddar can" },
      { value: 0, suffix: " g", label: "Trans fat, per serving" },
    ],
  },
  range: {
    eyebrow: "The range",
    title: "Three lines, made for service",
    lede: "Generous formats a kitchen opens once and works through — consistent, considered, easy to plan around.",
    filterLabel: "Filter",
    specsTitle: "On the label",
    pairingTitle: "Serve with",
    metersTitle: "Taste profile",
    empty: "Nothing here yet.",
    // Links to the product photograph, so it must not promise a spec page.
    viewSpec: "Open photograph",
  },
  house: {
    eyebrow: "About",
    title: "Imported, distributed and marketed under one name",
    activityLabel: "Principal activity",
    activity:
      "Import, trading, distribution and marketing of food products in Iraq.",
    body: [
      "Marasi Al-Arz is an Iraq-based company engaged in the import, trading, distribution and marketing of food products. The work is building reliable supply chains and delivering quality products to the Iraqi market — the anchor in our mark stands for exactly that.",
      "We run one integrated model: international sourcing, importation, procurement, warehousing, distribution and local sales. Selected suppliers and business partners keep the supply consistent; our standards of quality, efficiency and service keep it worth having.",
      "As part of that growth, we develop and market products under our own brand, ProBite — a portfolio of food-service products that answers what the market asks for and creates value that lasts.",
    ],
    pillars: [
      {
        k: "01",
        title: "Import",
        body: "Food products sourced from international suppliers and brought into Iraq with the import and procurement work done properly.",
      },
      {
        k: "02",
        title: "Distribute",
        body: "Trading, wholesale and distribution through established commercial channels, to customers and operations across the country.",
      },
      {
        k: "03",
        title: "Own brand",
        body: "Products developed, sourced and marketed under ProBite — the same care, with our name on the label.",
      },
    ],
    vision: {
      title: "Vision",
      body: "To become a trusted and leading food trading and distribution company in Iraq, recognised for reliability, quality, strong supplier relationships and efficient supply chain management.",
    },
    mission: {
      title: "Mission",
      body: "To provide reliable access to quality food products through efficient sourcing, importation, distribution and commercial partnerships, while creating sustainable value for customers, suppliers, business partners and stakeholders.",
    },
  },
  business: {
    eyebrow: "Our business",
    title: "Where it comes from, where it goes, who it is for",
    lede: "The three questions a buyer asks first. The answers, stated plainly.",
    blocks: [
      {
        k: "01",
        title: "Supply sources",
        body: "Products are sourced from international suppliers and from the local market, depending on category, availability, commercial requirements and demand. Every supplier is qualified before the first order.",
        points: [
          "International suppliers",
          "Local producers and markets",
          "Qualified before the first order",
        ],
      },
      {
        k: "02",
        title: "Markets",
        body: "Our primary market is Iraq. Products move through established commercial channels to customers and business operations across the country.",
        points: [
          "Iraq, nationwide",
          "Established commercial channels",
          "Wholesale and direct supply",
        ],
      },
      {
        k: "03",
        title: "Target customers",
        body: "Restaurant chains and hospitality operations, wholesale and commercial buyers, and partners who want a dependable supply of selected food products.",
        points: [
          "Restaurant and hospitality operations",
          "Wholesale and commercial customers",
          "Distribution partners",
        ],
      },
    ],
    activitiesTitle: "Principal activities",
    activities: [
      "Importing food products from international suppliers.",
      "Trading and distributing food products within the Iraqi market.",
      "Wholesale supply to commercial and business customers.",
      "Developing, sourcing and marketing private-label products under the ProBite brand.",
      "Supplying selected food products to restaurant and hospitality operations.",
      "Managing relationships with international and local suppliers.",
      "Developing distribution channels and long-term commercial partnerships.",
    ],
  },
  partners: {
    eyebrow: "Partners & brands",
    title: "The names we work with, and the one we own",
    lede: "Commercial relationships built to last — agencies, partnerships and franchise supply.",
    brandsTitle: "Brands & relationships",
    brands: [
      {
        name: "ProBite",
        role: "Own brand",
        body: "Developed, sourced and marketed by Marasi Al-Arz. Pickles, peppers and sauces in food-service formats.",
      },
      {
        name: "99 Grill",
        role: "Restaurant chain · Iraq",
        body: "We support the chain's food supply requirements — selected products, delivered with continuity, as the branch network grows.",
      },
      {
        name: "Chicken Dip",
        role: "Restaurant chain · Iraq",
        body: "Selected food products supplied to the chain's operations, as part of a stable and efficient supply network.",
      },
    ],
    modelsTitle: "How we work together",
    models: [
      {
        k: "01",
        title: "Agencies",
        body: "Brand representation in Iraq: import, distribution and marketing for international food brands that want a partner on the ground.",
      },
      {
        k: "02",
        title: "Partnerships",
        body: "Long-term commercial partnerships with suppliers, customers and business partners, on transparent terms and a supply that holds.",
      },
      {
        k: "03",
        title: "Franchise",
        body: "Supply partner to franchised restaurant networks — a dependable source of the products an expanding branch network needs.",
      },
    ],
  },
  profile: {
    eyebrow: "Company profile",
    title: "The company, on one page",
    lede: "The profile as issued — for partners, suppliers and institutions that need the full picture.",
    blocks: [
      {
        title: "Overview",
        paragraphs: [
          "Marasi Al-Arz is an Iraq-based company engaged in the import, trading, distribution and marketing of food products, with a focus on building reliable supply chains and delivering high-quality products to the Iraqi market.",
          "The company operates through an integrated business model covering international sourcing, importation, procurement, warehousing, distribution and local sales. It works with selected suppliers and business partners to ensure a consistent and reliable supply of food products while maintaining appropriate standards of quality, efficiency and service.",
          "As part of its growth strategy, the company develops and markets products under its own brand, ProBite, aiming to establish a strong portfolio of food products that responds to market demand and creates sustainable long-term value.",
          "The company also plays an important role in supporting the supply requirements of the 99 Grill and Chicken Dip restaurant chains in Iraq, providing selected food products and contributing to an efficient and stable supply network that supports their operations and expanding branch networks.",
        ],
      },
      {
        title: "Business activities",
        paragraphs: ["The company's principal activities include:"],
        list: [
          "Importing food products from international suppliers.",
          "Trading and distributing food products within the Iraqi market.",
          "Wholesale supply to commercial and business customers.",
          "Developing, sourcing and marketing private-label products under the ProBite brand.",
          "Supplying selected food products to restaurant and hospitality operations.",
          "Managing relationships with international and local suppliers.",
          "Developing distribution channels and long-term commercial partnerships.",
        ],
      },
      {
        title: "Business model & revenue",
        paragraphs: [
          "The company generates its revenues primarily through the sale and distribution of imported and locally sourced food products within the Iraqi market.",
          "The business cycle generally involves sourcing products from approved suppliers, completing the required import and procurement processes, receiving and storing products, and subsequently distributing and selling them to commercial customers and business operations.",
          "Transactions are conducted through bank transfers, commercial payments and other approved payment methods, depending on the nature and terms of each transaction.",
        ],
      },
      {
        title: "Supply chain & market",
        paragraphs: [
          "The company is focused on establishing a dependable supply chain by maintaining relationships with qualified suppliers and business partners. It sources products from both international and local markets, depending on product category, availability, commercial requirements and market demand.",
          "Its primary market is Iraq, where products are distributed through established commercial channels to support customers and business operations across the country.",
        ],
      },
      {
        title: "Brands & strategic relationships",
        paragraphs: [
          "The company develops and markets its own food products under the ProBite brand and maintains commercial relationships with selected suppliers, customers and business partners.",
          "It also supports the food supply requirements of 99 Grill and Chicken Dip, contributing to the availability and continuity of selected food products required for their restaurant operations.",
        ],
      },
      {
        title: "Our commitment",
        paragraphs: [
          "Marasi Al-Arz is committed to building a transparent, reliable and sustainable business based on responsible sourcing, quality products, efficient supply chain management and long-term commercial relationships.",
          "The company seeks to continuously strengthen its operations, expand its product portfolio, develop new business opportunities and establish sustainable partnerships with suppliers, customers, financial institutions and other stakeholders.",
        ],
      },
    ] as ProfileBlock[],
  },
  process: {
    eyebrow: "Process",
    title: "Six steps, in order",
    lede: "The sequence below is the path a product actually takes, from the supplier's door to the customer's.",
    steps: [
      { k: "01", title: "Source", body: "Products are selected from approved international and local suppliers against category, availability and demand." },
      { k: "02", title: "Import", body: "Import and procurement completed in full — documentation, clearance and payment on the agreed terms." },
      { k: "03", title: "Receive", body: "Goods are received and checked against the order before they go anywhere near a shelf." },
      { k: "04", title: "Store", body: "Warehoused under the right conditions and tracked by batch until they are called off." },
      { k: "05", title: "Distribute", body: "Moved through established commercial channels to customers across Iraq." },
      { k: "06", title: "Supply", body: "Sold to commercial customers and business operations — and kept flowing, so a growing branch network never runs short." },
    ],
  },
  controls: {
    eyebrow: "Standards",
    title: "What we hold ourselves to",
    lede: "Each claim below is printed on the pack — easy to check against the jar in your hand.",
    items: [
      { title: "U.S. quality standards", body: "Made to the highest U.S. quality standards, as stated on the pack." },
      { title: "Bilingual labelling", body: "English and Arabic wherever it matters — ingredients, nutrition, storage." },
      { title: "Nutrition per 100 g", body: "A full panel rather than a summary: fat, carbohydrates, fibre, sugar, protein, sodium, iron, potassium." },
      { title: "Traceable on pack", body: "A QR code and barcode on every label, so a case can be traced rather than guessed." },
      { title: "Declared additives", body: "E-numbers printed in full — E260, E330, E202, E509 — never just 'preservatives'." },
      { title: "Gluten free lines", body: "The pickle and pepper lines carry the claim on the front of the pack." },
    ],
  },
  cta: {
    eyebrow: "Working together",
    title: "Tell us what your kitchens need",
    body: "Distribution, agency, private label or wholesale — tell us the market and the volume, and we will reply with a specification and a price.",
    primary: "Start a conversation",
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you need",
    lede: "The clearer the volume, the more useful our reply.",
    fields: {
      name: "Your name",
      company: "Company",
      market: "City or region",
      email: "Email",
      message: "What do you need?",
    },
    placeholders: {
      name: "Layla Haddad",
      company: "Restaurant group, distributor, retailer…",
      market: "Baghdad, Erbil, Basra…",
      email: "you@company.com",
      message: "Lines, monthly volumes, packaging preferences.",
    },
    submit: "Send enquiry",
    sending: "Sending…",
    success: "Enquiry sent. We will reply to the address you provided.",
    reset: "Send another",
    errors: {
      name: "Please add a name we can reply to.",
      email: "That email address does not look right.",
      message: "A line or two about what you need is enough.",
    },
    direct: "Or reach us directly",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    whatsappAction: "Message us on WhatsApp",
    emailLabel: "Email",
    locationLabel: "Location",
    locationValue: "Iraq — supply nationwide",
    demoNote: "Demo form — submissions stay in the browser and are not sent anywhere yet.",
  },
  footer: {
    tagline: "Food import, trading and distribution. Iraq.",
    brandLine: "ProBite is the own brand of Marasi Al-Arz.",
    follow: "Follow",
    rights: "All rights reserved.",
    built: "Weights and figures transcribed from the pack.",
  },
};

export type Dict = typeof EN;

const AR: Dict = {
  meta: {
    title: "مراسي الأرز — استيراد وتجارة وتوزيع المواد الغذائية في العراق",
    description:
      "شركة عراقية لاستيراد وتجارة وتوزيع المواد الغذائية، تملك علامتها الخاصة بروبايت للمخللات والفلفل والصوصات بعبوات الخدمة الغذائية. بيع بالجملة، وكالات، علامة خاصة.",
  },
  nav: {
    range: "المنتجات",
    house: "من نحن",
    business: "نشاط الشركة",
    partners: "الشركاء",
    profile: "بروفايل الشركة",
    process: "آلية العمل",
    controls: "المعايير",
    contact: "تواصل معنا",
    skip: "الانتقال إلى المحتوى",
    menu: "القائمة",
    close: "إغلاق",
    language: "EN",
    languageA11y: "التبديل إلى الإنجليزية",
  },
  a11y: {
    toggleTheme: "التبديل بين الوضع الفاتح والداكن",
    scrollProgress: "تقدّم القراءة",
  },
  hero: {
    eyebrow: "مراسي الأرز · استيراد وتجارة وتوزيع المواد الغذائية · العراق",
    headline: "الطعم الجيّد، بالكرتونة.",
    lede: "نستورد ونوزّع ونسوّق المواد الغذائية التي تعتمد عليها المطابخ الاحترافية في أنحاء العراق — ومنها علامتنا الخاصة بروبايت، بعبوات مصمّمة لخدمة المطاعم.",
    primary: "استعرض المنتجات",
    secondary: "اطلب عرض سعر",
    stampTop: "مراسي الأرز",
    manifest: [
      { k: "المقر", v: "العراق" },
      { k: "العلامة", v: "بروبايت" },
      { k: "النموذج", v: "استيراد وتوزيع" },
      { k: "الخطوط", v: "٠٣" },
    ],
    labelCaption: "علامتنا الخاصة",
    scroll: "مرّر",
  },
  ticker: [
    "استيراد وتوزيع",
    "توريد في عموم العراق",
    "عبوات الخدمة الغذائية",
    "شيدر حقيقي",
    "خالٍ من الغلوتين",
    "ملصقات ثنائية اللغة",
    "علامة خاصة عند الطلب",
    "بيع بالجملة",
  ],
  figures: {
    eyebrow: "من الملصق",
    title: "الأرقام كما طُبعت",
    note: "كل رقم أدناه مطبوع على العبوة نفسها. لا شيء منها تقديري.",
    items: [
      { value: 3.78, suffix: " كجم", label: "الوزن الصافي، برطمان الخدمة الغذائية" },
      { value: 25, suffix: "", label: "حصة في البرطمان، بواقع ١٠٠ جم" },
      { value: 48, suffix: "", label: "حصة في عبوة الشيدر" },
      { value: 0, suffix: " جم", label: "دهون متحوّلة في الحصة" },
    ],
  },
  range: {
    eyebrow: "المنتجات",
    title: "ثلاثة خطوط، صُنعت للخدمة",
    lede: "عبوات سخيّة يفتحها المطبخ مرة واحدة ويعمل بها حتى النهاية — ثابتة الجودة، مدروسة، سهلة التخطيط.",
    filterLabel: "تصفية",
    specsTitle: "على الملصق",
    pairingTitle: "يُقدَّم مع",
    metersTitle: "بصمة الطعم",
    empty: "لا شيء هنا بعد.",
    viewSpec: "فتح الصورة",
  },
  house: {
    eyebrow: "من نحن",
    title: "استيراد وتوزيع وتسويق تحت اسم واحد",
    activityLabel: "النشاط الرئيسي",
    activity: "استيراد وتجارة وتوزيع وتسويق المواد الغذائية في العراق.",
    body: [
      "مراسي الأرز شركة عراقية تعمل في استيراد وتجارة وتوزيع وتسويق المواد الغذائية. عملنا هو بناء سلاسل توريد موثوقة وإيصال منتجات عالية الجودة إلى السوق العراقية — وهذا ما ترمز إليه المرساة في شعارنا.",
      "نعمل بنموذج متكامل واحد: التوريد الدولي، والاستيراد، والمشتريات، والتخزين، والتوزيع، والبيع المحلي. موردون وشركاء أعمال مختارون يحافظون على استمرارية التوريد، ومعاييرنا في الجودة والكفاءة والخدمة تحافظ على قيمته.",
      "وضمن خطة النمو، نطوّر ونسوّق منتجات تحت علامتنا الخاصة بروبايت — مجموعة من منتجات الخدمة الغذائية تلبّي ما يطلبه السوق وتخلق قيمة تدوم.",
    ],
    pillars: [
      {
        k: "٠١",
        title: "الاستيراد",
        body: "مواد غذائية من موردين دوليين تُستورد إلى العراق مع إتمام إجراءات الاستيراد والمشتريات على الوجه الصحيح.",
      },
      {
        k: "٠٢",
        title: "التوزيع",
        body: "تجارة وبيع بالجملة وتوزيع عبر قنوات تجارية راسخة، إلى العملاء والمنشآت في عموم البلاد.",
      },
      {
        k: "٠٣",
        title: "علامتنا الخاصة",
        body: "منتجات نطوّرها ونورّدها ونسوّقها تحت علامة بروبايت — بالعناية نفسها، واسمنا على الملصق.",
      },
    ],
    vision: {
      title: "الرؤية",
      body: "أن نصبح شركة موثوقة ورائدة في تجارة وتوزيع المواد الغذائية في العراق، معروفة بالاعتمادية والجودة وعلاقاتها القوية مع الموردين وكفاءة إدارة سلسلة التوريد.",
    },
    mission: {
      title: "الرسالة",
      body: "توفير وصول موثوق إلى مواد غذائية عالية الجودة من خلال كفاءة التوريد والاستيراد والتوزيع والشراكات التجارية، مع خلق قيمة مستدامة للعملاء والموردين وشركاء الأعمال وأصحاب المصلحة.",
    },
  },
  business: {
    eyebrow: "نشاط الشركة",
    title: "من أين نورّد، وأين نبيع، ولمن",
    lede: "ثلاثة أسئلة يطرحها المشتري أولًا. وهذه إجاباتها بوضوح.",
    blocks: [
      {
        k: "٠١",
        title: "مصادر التوريد",
        body: "نورّد المنتجات من موردين دوليين ومن السوق المحلية، بحسب الفئة والتوافر والمتطلبات التجارية والطلب. كل مورد يُعتمد قبل الطلبية الأولى.",
        points: ["موردون دوليون", "منتجون وأسواق محلية", "اعتماد قبل الطلبية الأولى"],
      },
      {
        k: "٠٢",
        title: "الأسواق",
        body: "سوقنا الرئيسية هي العراق. تصل المنتجات عبر قنوات تجارية راسخة إلى العملاء والمنشآت التجارية في عموم البلاد.",
        points: ["العراق، في جميع المحافظات", "قنوات تجارية راسخة", "بيع بالجملة وتوريد مباشر"],
      },
      {
        k: "٠٣",
        title: "العملاء المستهدفون",
        body: "سلاسل المطاعم ومنشآت الضيافة، ومشترو الجملة والعملاء التجاريون، والشركاء الذين يريدون توريدًا يمكن الاعتماد عليه لمنتجات غذائية مختارة.",
        points: ["المطاعم ومنشآت الضيافة", "عملاء الجملة والعملاء التجاريون", "شركاء التوزيع"],
      },
    ],
    activitiesTitle: "الأنشطة الرئيسية",
    activities: [
      "استيراد المواد الغذائية من موردين دوليين.",
      "تجارة وتوزيع المواد الغذائية داخل السوق العراقية.",
      "التوريد بالجملة للعملاء التجاريين والمنشآت.",
      "تطوير وتوريد وتسويق منتجات بعلامة خاصة تحت اسم بروبايت.",
      "توريد مواد غذائية مختارة لمنشآت المطاعم والضيافة.",
      "إدارة العلاقات مع الموردين الدوليين والمحليين.",
      "تطوير قنوات التوزيع والشراكات التجارية طويلة الأمد.",
    ],
  },
  partners: {
    eyebrow: "الشركاء والعلامات التجارية",
    title: "الأسماء التي نعمل معها، والاسم الذي نملكه",
    lede: "علاقات تجارية بُنيت لتدوم — وكالات، وشراكات، وتوريد لشبكات الامتياز التجاري.",
    brandsTitle: "العلامات والعلاقات",
    brands: [
      {
        name: "ProBite",
        role: "علامتنا الخاصة",
        body: "تطوّرها وتورّدها وتسوّقها مراسي الأرز. مخللات وفلفل وصوصات بعبوات الخدمة الغذائية.",
      },
      {
        name: "99 Grill",
        role: "سلسلة مطاعم · العراق",
        body: "ندعم احتياجات السلسلة من التوريد الغذائي — منتجات مختارة تصل باستمرارية مع توسّع شبكة الفروع.",
      },
      {
        name: "Chicken Dip",
        role: "سلسلة مطاعم · العراق",
        body: "مواد غذائية مختارة تُورَّد لعمليات السلسلة، ضمن شبكة توريد مستقرة وفعّالة.",
      },
    ],
    modelsTitle: "كيف نعمل معًا",
    models: [
      {
        k: "٠١",
        title: "الوكالات",
        body: "تمثيل العلامات التجارية في العراق: استيراد وتوزيع وتسويق للعلامات الغذائية الدولية التي تبحث عن شريك على الأرض.",
      },
      {
        k: "٠٢",
        title: "الشراكات",
        body: "شراكات تجارية طويلة الأمد مع الموردين والعملاء وشركاء الأعمال، بشروط شفافة وتوريد لا ينقطع.",
      },
      {
        k: "٠٣",
        title: "الامتياز التجاري",
        body: "شريك توريد لشبكات المطاعم العاملة بنظام الامتياز التجاري — مصدر يمكن الاعتماد عليه للمنتجات التي تحتاجها شبكة فروع تتوسّع.",
      },
    ],
  },
  profile: {
    eyebrow: "بروفايل الشركة",
    title: "الشركة في صفحة واحدة",
    lede: "البروفايل كما صدر — للشركاء والموردين والمؤسسات التي تحتاج الصورة الكاملة.",
    blocks: [
      {
        title: "نبذة عامة",
        paragraphs: [
          "مراسي الأرز شركة عراقية تعمل في استيراد وتجارة وتوزيع وتسويق المواد الغذائية، مع تركيز على بناء سلاسل توريد موثوقة وإيصال منتجات عالية الجودة إلى السوق العراقية.",
          "تعمل الشركة وفق نموذج أعمال متكامل يشمل التوريد الدولي والاستيراد والمشتريات والتخزين والتوزيع والبيع المحلي. وتتعاون مع موردين وشركاء أعمال مختارين لضمان توريد ثابت وموثوق للمواد الغذائية مع الحفاظ على معايير مناسبة للجودة والكفاءة والخدمة.",
          "وضمن استراتيجية النمو، تطوّر الشركة وتسوّق منتجات تحت علامتها الخاصة بروبايت، بهدف بناء محفظة قوية من المنتجات الغذائية تستجيب لطلب السوق وتخلق قيمة مستدامة على المدى الطويل.",
          "كما تؤدي الشركة دورًا مهمًا في دعم احتياجات التوريد لسلسلتي مطاعم 99 Grill وChicken Dip في العراق، بتوفير مواد غذائية مختارة والإسهام في شبكة توريد فعّالة ومستقرة تدعم عملياتهما وشبكة فروعهما المتوسّعة.",
        ],
      },
      {
        title: "أنشطة الشركة",
        paragraphs: ["تشمل الأنشطة الرئيسية للشركة:"],
        list: [
          "استيراد المواد الغذائية من موردين دوليين.",
          "تجارة وتوزيع المواد الغذائية داخل السوق العراقية.",
          "التوريد بالجملة للعملاء التجاريين والمنشآت.",
          "تطوير وتوريد وتسويق منتجات بعلامة خاصة تحت اسم بروبايت.",
          "توريد مواد غذائية مختارة لمنشآت المطاعم والضيافة.",
          "إدارة العلاقات مع الموردين الدوليين والمحليين.",
          "تطوير قنوات التوزيع والشراكات التجارية طويلة الأمد.",
        ],
      },
      {
        title: "نموذج الأعمال والإيرادات",
        paragraphs: [
          "تحقق الشركة إيراداتها بشكل رئيسي من بيع وتوزيع المواد الغذائية المستوردة والمحلية داخل السوق العراقية.",
          "تبدأ دورة العمل عادةً بتوريد المنتجات من موردين معتمدين، ثم إتمام إجراءات الاستيراد والمشتريات المطلوبة، واستلام المنتجات وتخزينها، ثم توزيعها وبيعها للعملاء التجاريين والمنشآت.",
          "تُنفَّذ المعاملات عبر التحويلات المصرفية والمدفوعات التجارية وغيرها من وسائل الدفع المعتمدة، بحسب طبيعة كل معاملة وشروطها.",
        ],
      },
      {
        title: "سلسلة التوريد والسوق",
        paragraphs: [
          "تركّز الشركة على بناء سلسلة توريد يمكن الاعتماد عليها من خلال علاقات مستمرة مع موردين وشركاء أعمال مؤهلين. وتورّد منتجاتها من الأسواق الدولية والمحلية معًا، بحسب فئة المنتج وتوافره والمتطلبات التجارية وطلب السوق.",
          "سوقها الرئيسية هي العراق، حيث تُوزَّع المنتجات عبر قنوات تجارية راسخة لدعم العملاء والمنشآت التجارية في عموم البلاد.",
        ],
      },
      {
        title: "العلامات والعلاقات الاستراتيجية",
        paragraphs: [
          "تطوّر الشركة وتسوّق منتجاتها الغذائية الخاصة تحت علامة بروبايت، وتحافظ على علاقات تجارية مع موردين وعملاء وشركاء أعمال مختارين.",
          "كما تدعم احتياجات التوريد الغذائي لسلسلتي 99 Grill وChicken Dip، مسهمةً في توافر واستمرارية المواد الغذائية المختارة اللازمة لتشغيل مطاعمهما.",
        ],
      },
      {
        title: "التزامنا",
        paragraphs: [
          "تلتزم مراسي الأرز ببناء عمل شفاف وموثوق ومستدام يقوم على التوريد المسؤول والمنتجات عالية الجودة وكفاءة إدارة سلسلة التوريد والعلاقات التجارية طويلة الأمد.",
          "وتسعى الشركة باستمرار إلى تعزيز عملياتها وتوسيع محفظة منتجاتها وتطوير فرص أعمال جديدة وبناء شراكات مستدامة مع الموردين والعملاء والمؤسسات المالية وسائر أصحاب المصلحة.",
        ],
      },
    ] as ProfileBlock[],
  },
  process: {
    eyebrow: "آلية العمل",
    title: "ست خطوات، بالترتيب",
    lede: "التسلسل أدناه هو المسار الفعلي الذي يقطعه المنتج، من باب المورد إلى باب العميل.",
    steps: [
      { k: "٠١", title: "التوريد", body: "تُختار المنتجات من موردين دوليين ومحليين معتمدين، بحسب الفئة والتوافر والطلب." },
      { k: "٠٢", title: "الاستيراد", body: "تُستكمل إجراءات الاستيراد والمشتريات بالكامل — المستندات والتخليص والدفع وفق الشروط المتفق عليها." },
      { k: "٠٣", title: "الاستلام", body: "تُستلم البضاعة وتُطابق مع الطلبية قبل أن تقترب من أي رف." },
      { k: "٠٤", title: "التخزين", body: "تُخزَّن في الظروف المناسبة وتُتابع بحسب الدفعة إلى حين طلبها." },
      { k: "٠٥", title: "التوزيع", body: "تنتقل عبر قنوات تجارية راسخة إلى العملاء في أنحاء العراق." },
      { k: "٠٦", title: "التوريد المستمر", body: "تُباع للعملاء التجاريين والمنشآت — ويستمر تدفقها، فلا تنقص شبكة فروع تتوسّع شيئًا." },
    ],
  },
  controls: {
    eyebrow: "المعايير",
    title: "ما نلتزم به",
    lede: "كل ما يرد أدناه مطبوع على العبوة — يسهل التحقق منه على البرطمان الذي بين يديك.",
    items: [
      { title: "معايير الجودة الأمريكية", body: "مصنوع وفق أعلى معايير الجودة الأمريكية، كما هو مدوّن على العبوة." },
      { title: "ملصقات ثنائية اللغة", body: "الإنجليزية والعربية حيثما يهمّ الأمر — المكونات، والقيمة الغذائية، والتخزين." },
      { title: "القيمة الغذائية لكل ١٠٠ جم", body: "جدول كامل لا ملخّص: الدهون، والكربوهيدرات، والألياف، والسكر، والبروتين، والصوديوم، والحديد، والبوتاسيوم." },
      { title: "قابل للتتبع على العبوة", body: "رمز QR وباركود على كل ملصق، فتُتتبَّع الكرتونة بدل أن تُخمَّن." },
      { title: "مضافات مصرّح بها", body: "أرقام E مطبوعة كاملة — E260 وE330 وE202 وE509 — لا مجرد كلمة «مواد حافظة»." },
      { title: "خطوط خالية من الغلوتين", body: "خطّا المخللات والفلفل يحملان العبارة على واجهة العبوة." },
    ],
  },
  cta: {
    eyebrow: "العمل معًا",
    title: "أخبرنا بما تحتاجه مطابخك",
    body: "توزيع، أو وكالة، أو علامة خاصة، أو بيع بالجملة — أخبرنا بالسوق والكمية، ونردّ عليك بالمواصفات والسعر.",
    primary: "ابدأ الحديث",
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "أخبرنا بما تحتاجه",
    lede: "كلما كانت الكمية أوضح، كان ردّنا أنفع.",
    fields: {
      name: "الاسم",
      company: "الشركة",
      market: "المدينة أو المنطقة",
      email: "البريد الإلكتروني",
      message: "ما الذي تحتاجه؟",
    },
    placeholders: {
      name: "ليلى حدّاد",
      company: "مجموعة مطاعم، موزّع، تاجر تجزئة…",
      market: "بغداد، أربيل، البصرة…",
      email: "you@company.com",
      message: "الخطوط، الكميات الشهرية، تفضيلات التعبئة.",
    },
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال…",
    success: "وصل طلبك. سنردّ على العنوان الذي زوّدتنا به.",
    reset: "إرسال طلب آخر",
    errors: {
      name: "أضف اسمًا نستطيع الرد عليه.",
      email: "عنوان البريد الإلكتروني لا يبدو صحيحًا.",
      message: "سطر أو سطران عمّا تحتاجه يكفيان.",
    },
    direct: "أو تواصل معنا مباشرة",
    phoneLabel: "الهاتف",
    whatsappLabel: "واتساب",
    whatsappAction: "راسلنا على واتساب",
    emailLabel: "البريد الإلكتروني",
    locationLabel: "الموقع",
    locationValue: "العراق — توريد إلى جميع المحافظات",
    demoNote: "نموذج تجريبي — تبقى البيانات في المتصفح ولا تُرسل إلى أي جهة بعد.",
  },
  footer: {
    tagline: "استيراد وتجارة وتوزيع المواد الغذائية. العراق.",
    brandLine: "بروبايت هي العلامة الخاصة لشركة مراسي الأرز.",
    follow: "تابعنا",
    rights: "جميع الحقوق محفوظة.",
    built: "الأوزان والأرقام منقولة عن العبوة.",
  },
};

export const DICT: Record<Locale, Dict> = { en: EN, ar: AR };

/** Kept for callers that only ever needed the English copy. */
export const COPY: Dict = EN;
