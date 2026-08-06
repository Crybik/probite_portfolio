/**
 * The ProBite range.
 *
 * Every figure here is transcribed from the physical labels in `visuals/` —
 * net and drained weights, serving counts, the nutrition panel, the taste
 * meters, the E-numbers, the barcode. Nothing is invented, because the whole
 * page is built to read like a spec sheet and a spec sheet that lies is worth
 * nothing.
 */

/**
 * The low-chroma marker a product family owns. It identifies the line on a
 * hairline or a dot — it never colours a surface, a button or a heading. The
 * saturated colour in this brand stays inside the photographs.
 */
export type LineColor = "pickles" | "peppers" | "sauces";

export type Bilingual = { en: string; ar: string };

export type TasteMeter = {
  label: Bilingual;
  /** Filled dots out of `of`, exactly as printed on the jar. */
  value: number;
  of: number;
};

export type SpecRow = {
  label: Bilingual;
  value: Bilingual;
};

export type Product = {
  id: string;
  slug: string;
  name: Bilingual;
  /** The script sub-name on the label, e.g. "Pickles Chips". */
  variant: Bilingual;
  category: Bilingual;
  categoryId: "pickles" | "peppers" | "sauces";
  color: LineColor;
  image: string;
  /** Intrinsic size of the trimmed photograph, for layout stability. */
  width: number;
  height: number;
  blurb: Bilingual;
  badges: Bilingual[];
  meters: TasteMeter[];
  specs: SpecRow[];
  /** Free-text pairing line lifted from the label's "Great with" copy. */
  pairing?: Bilingual;
};

const KG = (en: string, ar: string): Bilingual => ({ en, ar });

export const PRODUCTS: Product[] = [
  {
    id: "burger-dill",
    slug: "burger-dill-pickles",
    name: { en: "Burger Dill", ar: "مخلل البرغر" },
    variant: { en: "Pickle Chips", ar: "شرائح مخلل" },
    category: { en: "Pickles", ar: "مخللات" },
    categoryId: "pickles",
    color: "pickles",
    image: "/products/burger-dill-pickles.jpg",
    width: 797,
    height: 1204,
    blurb: {
      en: "Tangy and crunchy, cut for the burger line. Holds its bite through service instead of going limp under a hot patty.",
      ar: "حامض ومقرمش، مقطّع خصيصًا لخط البرغر. يحافظ على قرمشته طوال الخدمة ولا يذبل تحت قطعة اللحم الساخنة.",
    },
    badges: [
      { en: "Freshly sliced", ar: "شرائح طازجة" },
      { en: "Gluten free", ar: "خالٍ من الغلوتين" },
      { en: "10 calories", ar: "١٠ سعرات" },
      { en: "With brine added", ar: "مع محلول ملحي" },
    ],
    meters: [
      { label: { en: "Crunchiness", ar: "القرمشة" }, value: 3, of: 4 },
      { label: { en: "Saltiness", ar: "الملوحة" }, value: 2, of: 4 },
      { label: { en: "Tanginess", ar: "الحموضة" }, value: 3, of: 4 },
    ],
    specs: [
      {
        label: { en: "Net weight", ar: "الوزن الصافي" },
        value: KG("3.78 kg / 126 oz", "٣٫٧٨ كجم / ١٢٦ أونصة"),
      },
      {
        label: { en: "Drained weight", ar: "الوزن المصفّى" },
        value: KG("2.5 kg / 88 oz", "٢٫٥ كجم / ٨٨ أونصة"),
      },
      {
        label: { en: "Format", ar: "العبوة" },
        value: { en: "PET food-service jar", ar: "برطمان خدمة غذائية" },
      },
      {
        label: { en: "Cut", ar: "التقطيع" },
        value: { en: "Crinkle chip", ar: "شرائح مموّجة" },
      },
    ],
    pairing: {
      en: "Burgers, stack sandwiches, fried chicken, snacking straight from the jar.",
      ar: "البرغر، الساندويتشات المزدوجة، الدجاج المقلي، أو مباشرة من البرطمان.",
    },
  },
  {
    id: "jalapeno",
    slug: "jalapeno-pepper",
    name: { en: "Jalapeño Power", ar: "هالبينو باور" },
    variant: { en: "Sliced Pepper", ar: "شرائح فلفل" },
    category: { en: "Peppers", ar: "فلفل" },
    categoryId: "peppers",
    color: "peppers",
    image: "/products/jalapeno-pepper.jpg",
    width: 745,
    height: 1263,
    blurb: {
      en: "The spicy touch that completes nachos, balancing the cheese. Mild heat with jalapeño flavour that carries.",
      ar: "اللمسة الحارة التي تكمّل الناتشوز وتوازن الجبنة. حرارة معتدلة بنكهة هالبينو واضحة.",
    },
    badges: [
      { en: "Crunchy bite", ar: "قضمة مقرمشة" },
      { en: "Freshly sliced", ar: "شرائح طازجة" },
      { en: "Gluten free", ar: "خالٍ من الغلوتين" },
      { en: "With brine added", ar: "مع محلول ملحي" },
    ],
    meters: [
      { label: { en: "Crunchiness", ar: "القرمشة" }, value: 3, of: 4 },
      { label: { en: "Saltiness", ar: "الملوحة" }, value: 2, of: 4 },
      { label: { en: "Tanginess", ar: "الحموضة" }, value: 3, of: 4 },
    ],
    specs: [
      {
        label: { en: "Net weight", ar: "الوزن الصافي" },
        value: KG("3.78 kg / 126 oz", "٣٫٧٨ كجم / ١٢٦ أونصة"),
      },
      {
        label: { en: "Drained weight", ar: "الوزن المصفّى" },
        value: KG("2.25 kg / 88 oz", "٢٫٢٥ كجم / ٨٨ أونصة"),
      },
      {
        label: { en: "Servings", ar: "عدد الحصص" },
        value: { en: "25 × 100 g", ar: "٢٥ × ١٠٠ جم" },
      },
      {
        label: { en: "Energy", ar: "الطاقة" },
        value: { en: "16 kcal / 100 g", ar: "١٦ سعرة / ١٠٠ جم" },
      },
      {
        label: { en: "Sodium", ar: "الصوديوم" },
        value: { en: "980 mg / 100 g", ar: "٩٨٠ ملجم / ١٠٠ جم" },
      },
      {
        label: { en: "Barcode", ar: "الباركود" },
        value: { en: "6923380455066", ar: "6923380455066" },
      },
    ],
    pairing: {
      en: "Nachos, loaded fries, pizza, subs, anything that needs heat without drowning it.",
      ar: "الناتشوز، البطاطس المحمّلة، البيتزا، الساندويتشات — كل ما يحتاج حرارة دون أن تطغى.",
    },
  },
  {
    id: "cheddar-sauce",
    slug: "cheddar-cheese-sauce",
    name: { en: "Cheddar Cheese", ar: "صوص الشيدر" },
    variant: { en: "Sauce", ar: "صوص" },
    category: { en: "Sauces", ar: "صوصات" },
    categoryId: "sauces",
    color: "sauces",
    image: "/products/cheddar-cheese-sauce.jpg",
    width: 1318,
    height: 1400,
    blurb: {
      en: "Smooth and creamy, made with real cheddar. Pours warm and stays pourable on a busy line.",
      ar: "ناعم وكريمي بجبن شيدر حقيقي. يُقدَّم دافئًا ويبقى سهل الصب في أوقات الذروة.",
    },
    badges: [
      { en: "Real cheddar", ar: "شيدر حقيقي" },
      { en: "Smooth & creamy", ar: "ناعم وكريمي" },
      { en: "About 48 servings", ar: "نحو ٤٨ حصة" },
    ],
    meters: [
      { label: { en: "Creaminess", ar: "القوام الكريمي" }, value: 4, of: 4 },
      { label: { en: "Saltiness", ar: "الملوحة" }, value: 2, of: 4 },
      { label: { en: "Sharpness", ar: "حدّة النكهة" }, value: 3, of: 4 },
    ],
    specs: [
      {
        label: { en: "Net weight", ar: "الوزن الصافي" },
        value: KG("3.0 kg / 105.82 oz", "٣٫٠ كجم / ١٠٥٫٨٢ أونصة"),
      },
      {
        label: { en: "Servings", ar: "عدد الحصص" },
        value: { en: "About 48", ar: "نحو ٤٨" },
      },
      {
        label: { en: "Format", ar: "العبوة" },
        value: { en: "Steel can, easy stack", ar: "عبوة معدنية قابلة للتكديس" },
      },
      {
        label: { en: "Serve at", ar: "حرارة التقديم" },
        value: { en: "40–60 °C", ar: "٤٠–٦٠ °م" },
      },
    ],
    pairing: {
      en: "Tortilla chips, burgers, fries, nachos, pasta, mac and cheese, chili, burritos, enchiladas, dips.",
      ar: "رقائق التورتيلا، البرغر، البطاطس، الناتشوز، المعكرونة، الماك آند تشيز، التشيلي، البوريتو، الديبس.",
    },
  },
];

export const CATEGORIES: { id: string; label: Bilingual }[] = [
  { id: "all", label: { en: "Everything", ar: "الكل" } },
  { id: "pickles", label: { en: "Pickles", ar: "مخللات" } },
  { id: "peppers", label: { en: "Peppers", ar: "فلفل" } },
  { id: "sauces", label: { en: "Sauces", ar: "صوصات" } },
];

/** Written out in full so Tailwind can see every class it needs to generate. */
export const LINE_CLASSES: Record<
  LineColor,
  { text: string; dot: string; rule: string }
> = {
  pickles: {
    text: "text-line-pickles",
    dot: "bg-line-pickles",
    rule: "bg-line-pickles",
  },
  peppers: {
    text: "text-line-peppers",
    dot: "bg-line-peppers",
    rule: "bg-line-peppers",
  },
  sauces: {
    text: "text-line-sauces",
    dot: "bg-line-sauces",
    rule: "bg-line-sauces",
  },
};

export const COMPANY = {
  nameEn: "Marasi Al-Arz",
  nameAr: "مراسي الأرز",
  brand: "ProBite",
  phone: "+962 7 9222 7921",
  phoneHref: "tel:+962792227921",
} as const;
