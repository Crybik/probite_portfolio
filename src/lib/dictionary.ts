/**
 * Every string on the site.
 *
 * The voice is quiet and precise: short sentences, no exclamation, no sales
 * pressure. The page is built like a spec sheet, so the words behave like one —
 * they state, they don't shout.
 *
 * The site ships in English only. The `Locale` union and the `bi()` helper are
 * kept because the product data still carries Arabic label transcriptions, and
 * an Arabic edition may come later — but nothing here renders anything but
 * English.
 */

const DICT_RAW = {
  en: {
    nav: {
      range: "Range",
      house: "About",
      process: "Process",
      controls: "Standards",
      contact: "Contact",
      skip: "Skip to content",
      menu: "Menu",
      close: "Close",
    },
    a11y: {
      toggleTheme: "Switch between light and dark",
      scrollProgress: "Reading progress",
    },
    hero: {
      eyebrow: "Marasi Al-Arz · Food manufacturing",
      headline: "Good taste, by the case.",
      lede: "We make the pickles, peppers and sauces that professional kitchens rely on — produced under our ProBite label, in formats measured for service.",
      primary: "View the range",
      secondary: "Request a quote",
      stampTop: "Marasi Al-Arz",
      manifest: [
        { k: "Label", v: "ProBite" },
        { k: "Format", v: "Food service" },
        { k: "Net", v: "3.78 kg" },
        { k: "Lines", v: "03" },
      ],
      scroll: "Scroll",
    },
    ticker: [
      "Food-service formats",
      "Freshly sliced",
      "Gluten free",
      "Real cheddar",
      "Brine added",
      "Bilingual labelling",
      "Private label available",
      "Wholesale & export",
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
      title: "Made, packed and shipped under one name",
      body: [
        "Marasi Al-Arz is a food manufacturer with its own label, ProBite, and its own way of moving it. The anchor in our mark stands for the part of the work that begins after the jar is sealed.",
        "Everything we make comes in food-service formats. A 3.78 kg jar has one purpose: open it at the start of service, and think about something else.",
      ],
      pillars: [
        {
          k: "01",
          title: "Manufacture",
          body: "Slicing, brining, filling and sealing under one roof, to a written specification.",
        },
        {
          k: "02",
          title: "Export",
          body: "Bilingual labels, barcoded packs and cases that travel well and arrive without questions.",
        },
        {
          k: "03",
          title: "Private label",
          body: "The same lines, your artwork — for partners who would rather see their own name on the jar.",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "Six steps, in order",
      lede: "The sequence below is the path the product actually takes, from intake to container.",
      steps: [
        { k: "01", title: "Select", body: "Raw stock is graded on arrival. Only what meets the specification moves forward." },
        { k: "02", title: "Wash & slice", body: "Cut to a fixed profile — crinkle, ring or whole — so every jar behaves the same." },
        { k: "03", title: "Brine & fill", body: "Brine mixed to formula, filled to net weight, checked against drained weight." },
        { k: "04", title: "Seal & treat", body: "Sealed, heat-treated and rested. This is where shelf life is decided." },
        { k: "05", title: "Code & case", body: "Batch code, barcode and label applied, then cased for clean stacking." },
        { k: "06", title: "Ship", body: "Palletised and moved, with our name on the paperwork." },
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
      title: "Put your name on the jar",
      body: "Distribution, private label or wholesale — tell us the market and the volume, and we will reply with a specification and a price.",
      primary: "Start a conversation",
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell us what you need",
      lede: "The clearer the volume, the more useful our reply.",
      fields: {
        name: "Your name",
        company: "Company",
        market: "Market or country",
        email: "Email",
        message: "What do you need?",
      },
      placeholders: {
        name: "Layla Haddad",
        company: "Restaurant group, distributor, importer…",
        market: "Gulf, Levant, Europe…",
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
      direct: "Or call us directly",
      demoNote: "Demo form — submissions stay in the browser and are not sent anywhere yet.",
    },
    footer: {
      tagline: "Food manufacturing and export.",
      brandLine: "ProBite is the food-service label of Marasi Al-Arz.",
      rights: "All rights reserved.",
      built: "Weights and figures transcribed from the pack.",
    },
  },

};

export type Locale = "en" | "ar";

export type Dict = (typeof DICT_RAW)["en"];

export const COPY: Dict = DICT_RAW.en;
