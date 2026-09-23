import type { Dictionary } from "./dict";

export const dictionaryAr: Dictionary = {
  langName: "العربية",
  otherLang: "EN",
  otherLangFull: "ENGLISH",
  switchTo: "EN",
  dir: "rtl",

  nav: {
    work: "المشاريع",
    lab: "التجارب",
    research: "أبحاث",
    notes: "الملاحظات",
    about: "عن",
    linkedin: "LINKEDIN",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    menu: "القائمة",
  },

  hero: {
    eyebrow: "مهندس برمجيات",
    heading: ["باني", "الأنظمة"],
    blurb: "أبني برمجيات تعيش في الواقع بكل قيوده.",
    sub: "برمجيات · أتمتة · أمن",
    viewWork: "استعرض المشاريع",
    linkedin: "LINKEDIN",
    metaBar: ["الخرطوم، السودان", "محلي أولًا", "أنظمة بميزانية صفر"],
  },

  status: {
    title: "حالة النظام",
    online: "متصل",
    localTime: "الوقت المحلي",
    location: "الموقع",
    focus: "التركيز",
    projects: "المشاريع",
    labs: "التجارب",
  },

  home: {
    quote: ["لا أجمع التقنيات؛", "أبني الأنظمة."],
    workIndex: "01 / المشاريع",
    workTitle: "مشاريع مختارة",
    systemsCount: "أنظمة",
    engIndex: "02 / الهندسة",
    engTitle: "أين يسكن العمل",
    engCards: [
      {
        index: "أ",
        title: "البنية",
        desc: "كل نظام يحمل قراراته ومفاضلاته، والشكل الذي نتج عنه في النهاية.",
      },
      {
        index: "ب",
        title: "الأمن",
        desc: "نموذج تهديد حيث يلزم، لا ملصق في كل زاوية.",
      },
      {
        index: "ج",
        title: "الأتمتة",
        desc: "نزيل ضغطات المفاتيح عن العمل المتكرر — بتكلفة زهيدة ونتيجة واضحة.",
      },
    ],
    labIndex: "03 / التجارب",
    labTitle: "تجارب",
    allEntries: "كل المدخلات",
    labCmd: "ls experiments",
    researchIndex: "04 / أبحاث",
    researchTitle: "أبحاث",
    viewResearch: "استعرض الأبحاث",
    notesIndex: "05 / ملاحظات",
    notesTitle: "ملاحظات هندسية",
    allNotes: "كل الملاحظات",
    read: "اقرأ",
    open: "افتح",
    noteCount: "ملاحظة",
    aboutIndex: "06 / عن",
    aboutTitle: "تاج السر خالد",
    fullProfile: "الملف الكامل",
    aboutP1: "مهندس برمجيات، همّي الأنظمة العملية والأتمتة والبرمجيات التي تراعي الأمن.",
    aboutP2:
      "أستمتع بالعمل حين يتوقف الحل الواضح عن الصلاحية لأن البيئة غير منضبطة.",
    stackLabel: "الأدوات",
    timelineLabel: "المسار الزمني",
    timeline: [
      { year: "2024", role: "Isnaad", detail: "أنظمة بيانات وأتمتة" },
      { year: "2025", role: "هندسة برمجيات", detail: "أبحاث أمنية" },
      { year: "2026", role: "رئيس تقنية المعلومات", detail: "برمجيات وأنظمة وتشغيل" },
      { year: "الآن", role: "بناء", detail: "tajelsir.systems" },
    ],
    philosophy: [
      "هندسة البرمجيات",
      "الأتمتة",
      "أبحاث الأمن",
      "نماذج أولية للمنتجات",
    ],
    interests: [
      "معمارية البرمجيات",
      "الأتمتة",
      "أمن التطبيقات",
      "أدوات المطوّرين",
      "أنظمة محلية أولًا",
      "أنظمة ثنائية اللغة",
    ],
    contactEyebrow: "عندك مشكلة؟",
    contactText: "إن كان عندك مشروع أو نظام أو مشكلة تقنية عنيدة:",
    contactLinks: ["بريد", "LINKEDIN"],
    letsBuild: ["لنبنِ", "شيئًا", "معًا"],
  },

  work: {
    back: "الأعمال",
    interface: "00 / الواجهة",
    interfaceNote:
      "صُوِّرت من النظام الحي — السطح الذي يصله المستخدم الفعلي.",
    problem: "01 / المشكلة",
    constraints: "02 / القيود",
    architecture: "03 / البنية",
    decisions: "04 / قرارات الهندسة",
    tradeoffs: "05 / المفاضلات",
    whatBroke: "06 / ما انكسر",
    security: "07 / الأمن",
    result: "08 / النتيجة",
    open: "افتح",
    decision: "القرار",
    cost: "التكلفة",
    threatModel: "نموذج التهديد",
    mitigation: "المعالجة",
    assumption: "الافتراض",
    failed: "ما انهار",
    fix: "الإصلاح",
  },

  lab: {
    back: "التجارب",
    title: "تجارب",
    sub: "تجارب ونماذج أولية وأشياء بنيتها لأنّي أردت أن أعرف ماذا سيحدث.",
    type: "النوع",
    status: "الحالة",
    stack: "الأدوات",
    question: "السؤال",
    why: "لماذا",
    approach: "المنهج",
    flow: "البنية / المسار",
    result: "النتيجة",
    learned: "ما تعلمته",
    source: "المصدر",
    sourceCmd: "مؤرشف محليًا · linkedin.com/in/",
    open: "افتح",
    filters: ["الكل", "أمن", "أتمتة", "أنظمة", "بحوث"],
    categories: {
      SECURITY: "أمن",
      AUTOMATION: "أتمتة",
      SYSTEMS: "أنظمة",
      RESEARCH: "بحوث",
    },
  },

  notes: {
    back: "الملاحظات",
    title: "ملاحظات هندسية",
    sub: "ملاحظات قصيرة عن قرارات ومفاضلات والافتراضات التي تقف خلفها.",
    read: "اقرأ",
    next: "الملاحظة التالية",
    all: "كل الملاحظات",
    note: "ملاحظة",
  },

  about: {
    back: "الرئيسية",
    statement: "01 / لمحة",
    statementLead:
      "أبني برمجيات صُمّمت لقيود العالم الحقيقي — أنظمة تظل تعمل حتى حين يتعطل كل من حولها.",
    statementBody:
      "أستمتع بالعمل حيث يسقط الحل الواضح لأن البيئة غير مهذبة: شبكات لا تستقر، وجمهور عربي أولًا، وفرق ميدانية، وميزانيات شبه منعدمة. الهندسة المثيرة تسكن المسافة بين ما يفترضه الكتب وما يحدث فعلًا على الأرض.",
    interests: "02 / ما يشغلني الآن",
    contact: "03 / تواصل",
    stack: "الأدوات",
    timeline: "المسار الزمني",
  },

  research: {
    back: "أبحاث",
    title: "أبحاث",
    sub: "خط أساس رصدي لبنية إنترنت السودان العامة.",
    featured: "مميّز",
    openCase: "افتح ملف التحقيق",
    allEntries: "كل مدخلات الأبحاث",
    atlasBlurb:
      "جرد بصيغة Markdown يقارب 1,730 سطرًا، يغطي النطاقات وDNS/DNSSEC وTLS والخوادم والواجهات والسحابة والاتصالات والمالية الرقمية والحكومة والجامعات والرعاية الصحية والمنظمات غير الحكومية — خط أساس موثّق لإنترنت عام في دولة واحدة.",
    open: "افتح",
  },

  footer: {
    role: "مهندس برمجيات",
    elsewhere: "في مكان آخر",
    site: "الموقع",
    colophon: "خاتمة",
    builtWith: "بُني بـ",
    viewSource: "[ عرض الملف ]",
    language: "اللغة",
  },

  notFound: {
    title: "404 — غير موجود",
    sub: "لا يوجد شيء في هذا العنوان؛ غالبًا حُذف أو كُتب خطأً.",
    backHome: "العودة للواجهة",
  },

  metadata: {
    description:
      "مهندس برمجيات يبني أنظمة عملية وأتمتة وبرمجيات تراعي الأمن. من الخرطوم، السودان.",
    ogTitle: "TAJELSIR / الأنظمة",
    ogDescription:
      "مهندس برمجيات يبني أنظمة عملية وأتمتة وبرمجيات تراعي الأمن.",
  },
};