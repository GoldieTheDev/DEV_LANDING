import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Rocket, Code2, ServerCog, Smartphone, Sparkles, Star, Github, Mail, Phone, Languages } from "lucide-react";

// =====================================
// Simple bilingual copy (EN / AR)
// =====================================
const copy = {
  en: {
    brand: "EXPERTCODER",
    nav: { pricing: "Packages", portfolio: "Portfolio", faq: "FAQ", contact: "Contact" },
    hero: {
      kicker: "Interactive • Modern • Professional",
      title: "Build. Impress. Convert.",
      desc:
        "From a sleek landing page to a full‑stack platform with backend & database—delivered with stunning visuals and smooth motion.",
      viewPricing: "View Packages",
      seePortfolio: "See Portfolio",
    },
    pricing: {
      sectionKicker: "Services",
      title: "What I can build for you",
      landing: {
        title: "Landing Page",
        period: "Timeline: ~1–3 days",
        tagline: "Best for product launches, personal sites, and single campaigns.",
        features: [
          "Sleek single-page design (responsive)",
          "Hero, services, pricing, contact",
          "Basic SEO & analytics hook",
          "Publish on GitHub Pages (free hosting + HTTPS)",
        ],
      },
      full: {
        title: "Full-Stack Platform",
        period: "Timeline: ~1–3 weeks",
        tagline: "For SaaS, dashboards, and apps that need auth + database.",
        features: [
          "Frontend + Backend + Database",
          "Auth, CRUD, admin dashboard",
          "Payment (Stripe/Tap) integration*",
          "Cloud deployment guidance",
        ],
      },
      addons: {
        title: "Add-Ons",
        period: "Scope: flexible",
        tagline: "Enhance existing projects with AI, 3D, branding, or maintenance.",
        features: [
          "AI chat / content generation",
          "3D/Three.js hero or gallery",
          "Branding & UI kit",
          "Maintenance: per-project agreement",
        ],
      },
      apps: {
        title: "Enterprise Apps (Web + iOS + Android)",
        period: "Timeline: custom",
        tagline: "For larger multi-platform builds with web, mobile, and backend.",
        features: [
          "Unified backend + REST/GraphQL API",
          "Mobile apps (iOS & Android) + Web",
          "CI/CD, crash reporting, analytics",
          "Optional long-term maintenance",
        ],
      },
      note: "Every project is priced individually based on scope, complexity, and timeline.",
    },

    portfolio: {
      kicker: "Interactive previews",
      title: "Recent Work & Demos",
      llmKicker: "NLP / LLM apps",
      llmTitle: "NLP & LLM Projects",
      llmIntro:
        "A few language + AI tools I’ve been building lately — from resume analysis to SEO and developer productivity assistants.",
    },

    faq: {
      title: "FAQ",
      kicker: "Common questions",
      items: [
        [
          "Is GitHub Pages hosting free?",
          "Yes. SSL is included. Custom domains are supported; domain purchase is separate.",
        ],
        [
          "Can you include payments or a backend?",
          "Yes, that’s part of the Full‑Stack package. We set up auth, CRUD, and integrate Stripe/Tap.",
        ],
        [
          "How fast can we launch a landing page?",
          "Usually within 1–3 days depending on content and feedback speed.",
        ],
      ],
    },
    contact: {
      kicker: "Say hello",
      title: "Let’s talk",
      desc: "Choose your preferred contact method. I’ll get back during working hours.",
      email: "Email",
      github: "GitHub",
      whatsapp: "WhatsApp",
      note: "A reply might take up from 24 to 48 hours.",
    },
    toggle: { ar: "العربية", en: "EN" },
  },
  ar: {
    brand: "EXPERTCODER",
    nav: { pricing: "الأسعار", portfolio: "الأعمال", faq: "الأسئلة", contact: "تواصل" },
    hero: {
      kicker: "تفاعلي • عصري • احترافي",
      title: "ابنِ. أبهِر. حوّل.",
      desc:
        "من واجهة موقع أنيقة إلى منصة متكاملة بواجهة خلفية وقاعدة بيانات — مع مؤثرات سلسة وتجربة جذابة.",
      viewPricing: "عرض الباقات",
      seePortfolio: "شاهد الأعمال",
    },
    pricing: {
      sectionKicker: "الخدمات",
      title: "ماذا يمكنني أن أقدّم لك",
      landing: {
        title: "واجهة موقع",
        period: "المدة المتوقعة: 1–3 أيام",
        tagline: "مثالية لإطلاق منتج، صفحة شخصية، أو حملة واحدة.",
        features: [
          "تصميم صفحة واحدة متجاوبة",
          "أقسام: نبذة، خدمات، تسعير، تواصل",
          "تهيئة أساسية لمحركات البحث + تحليلات",
          "نشر عبر GitHub Pages (استضافة مجانية + HTTPS)",
        ],
      },
      full: {
        title: "منصة متكاملة",
        period: "المدة المتوقعة: 1–3 أسابيع",
        tagline: "لـ SaaS، ولوحات التحكم، والمشاريع التي تحتاج قاعدة بيانات وصلاحيات.",
        features: [
          "واجهة أمامية + خلفية + قاعدة بيانات",
          "تسجيل دخول وصلاحيات ولوحة تحكم",
          "دمج بوابة دفع (Stripe/Tap)",
          "إرشادات النشر السحابي",
        ],
      },
      addons: {
        title: "إضافات",
        period: "نطاق العمل: مرن",
        tagline: "تحسين المشاريع الحالية بالذكاء الاصطناعي أو 3D أو الهوية البصرية أو الصيانة.",
        features: [
          "ذكاء اصطناعي للدردشة/المحتوى",
          "مشاهد 3D/Three.js",
          "هوية بصرية وواجهة مستخدم",
          "الصيانة حسب اتفاق كل مشروع",
        ],
      },
      apps: {
        title: "تطبيقات مؤسسية (ويب + iOS + أندرويد)",
        period: "المدة: تُحدد حسب حجم المشروع",
        tagline: "للمشاريع الأكبر متعددة المنصات (ويب + جوال + خادم).",
        features: [
          "خادم موحّد + REST/GraphQL API",
          "تطبيقات جوال (iOS & Android) + ويب",
          "تكامل CI/CD وتقارير الأعطال وتحليلات",
          "إمكانية الاتفاق على صيانة طويلة الأمد",
        ],
      },
      note: "كل مشروع يُسعَّر بشكل منفصل حسب النطاق والتعقيد والمدة.",
    },

    portfolio: {
      kicker: "معاينات تفاعلية",
      title: "أعمال وعروض حديثة",
      llmKicker: "تطبيقات الذكاء الاصطناعي و NLP",
      llmTitle: "مشاريع NLP / LLM",
      llmIntro:
        "مجموعة من الأدوات التي طوّرتها بالاعتماد على معالجة NLP والـ LLM — لتحليل السير الذاتية، وفحص الـ SEO، ومساعدة المطورين على فهم مشاريعهم.",
    },

    faq: {
      title: "الأسئلة الشائعة",
      kicker: "إجابات مختصرة",
      items: [
        [
          "هل استضافة GitHub Pages مجانية؟",
          "نعم، وتشمل شهادة SSL. يمكن ربط نطاق مخصص (يُشترى منفصلًا).",
        ],
        [
          "هل يمكن تضمين الدفع أو الواجهة الخلفية؟",
          "نعم، ضمن باقة المنصة المتكاملة: مصادقة، CRUD، ودمج Stripe/Tap.",
        ],
        [
          "كم يستغرق إطلاق صفحة واجهة الموقع",
          "عادةً 1–3 أيام حسب توافر المحتوى وسرعة المراجعة.",
        ],
      ],
    },
    contact: {
      kicker: "مرحبًا بك",
      title: "تحدث معنا",
      desc: "اختر وسيلة التواصل المفضلة وسيصلك الرد خلال ساعات العمل.",
      email: "البريد الإلكتروني",
      github: "جِت هَب",
      whatsapp: "واتساب",
      note: "مدة الرد قد تستغرق مابين 24 الى 48 ساعة",
    },
    toggle: { ar: "العربية", en: "EN" },
  },
};

const llmProjects = {
  en: [
    {
      title: "Elo Hospital — Dev Productivity SaaS",
      subtitle: "Developer productivity & code quality",
      meta:
        "Analyzes codebases and live sites to surface performance and code-quality issues so devs know what to fix next.",
      href: "https://elo-hospital.vercel.app/",
      cta: "Open live app",
    },
    {
      title: "NLP Resume Analyzer",
      subtitle: "Resume analysis with custom NLP",
      meta:
        "A Hugging Face Space that scores resumes, extracts key skills, and returns structured feedback powered by custom NLP pipelines.",
      href: "https://huggingface.co/spaces/GoldieTheDev/nlp-resume-analyzer",
      cta: "Try on Hugging Face",
    },
    {
      title: "SEO Auditor",
      subtitle: "Lightweight SEO inspection tool",
      meta:
        "Audits pages for titles, meta tags, headings and basic technical SEO checks as a free browser-based analyzer.",
      href: "https://seo-auditor-alpha.vercel.app/",
      cta: "Run SEO audit",
    },
  ],
  ar: [
    {
      title: "Elo Hospital — منصة إنتاجية للمطورين",
      subtitle: "لوحة لمتابعة جودة الكود والأداء",
      meta:
        "تحلل المشاريع والمواقع المباشرة لإبراز مشاكل الأداء وجودة الكود ومساعدة المطور على معرفة ما يجب تحسينه أولًا.",
      href: "https://elo-hospital.vercel.app/",
      cta: "فتح التطبيق",
    },
    {
      title: "NLP Resume Analyzer — محلل سير ذاتية",
      subtitle: "تحليل CV باستخدام NLP",
      meta:
        "أداة مبنية على Hugging Face تقوم بقراءة السيرة الذاتية واستخراج المهارات وتقديم ملاحظات تلقائية اعتمادًا على معالجة NLP.",
      href: "https://huggingface.co/spaces/GoldieTheDev/nlp-resume-analyzer",
      cta: "جرّب الأداة",
    },
    {
      title: "SEO Auditor — مدقق SEO",
      subtitle: "فحص سريع لعناصر تحسين محركات البحث",
      meta:
        "يفحص عناوين الصفحات والـ meta tags والعناوين الأساسية ليكشف فرص تحسين السيو بدون الحاجة لاشتراك مدفوع.",
      href: "https://seo-auditor-alpha.vercel.app/",
      cta: "بدء فحص SEO",
    },
  ],
};


// =====================================
// 3D SCENE
// =====================================
function SpinningTorus({ position = [0, 0, 0], color = "#06b6d4" }) {
  const ref = useRef();
  const base = useMemo(() => ({ x: position[0], y: position[1], z: position[2] }), [position]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.35;
    const { x, y } = state.pointer;
    const targetX = base.x + x * 0.8;
    const targetY = base.y - y * 0.6;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.06;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.06;
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={1.2}>
        <torusKnotGeometry args={[1, 0.34, 256, 16, 2, 3]} />
        <MeshDistortMaterial color={color} distort={0.22} speed={2} roughness={0.15} metalness={0.7} emissive={color} emissiveIntensity={0.08} />
      </mesh>
    </Float>
  );
}

function JellySphere({ position = [0, 0, 0], color = "#7c3aed" }) {
  const ref = useRef();
  const base = useMemo(() => ({ x: position[0], y: position[1], z: position[2] }), [position]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
    const { x, y } = state.pointer;
    const targetX = base.x + x * 0.6;
    const targetY = base.y - y * 0.5;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.06;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.06;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.9, 20]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={1.4} roughness={0.15} metalness={0.6} emissive={color} emissiveIntensity={0.06} />
      </mesh>
    </Float>
  );
}

function ThreeBackdrop() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className="absolute inset-0 -z-10">
      <ambientLight intensity={0.7} />
      <directionalLight intensity={0.8} position={[5, 5, 5]} />
      <directionalLight intensity={0.3} position={[-5, -2, -5]} />
      <Suspense fallback={null}>
        <SpinningTorus position={[-1.3, 0.2, 0]} color="#06b6d4" />
        <JellySphere position={[1.7, -0.2, 0]} color="#7c3aed" />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

// =====================================
// UI HELPERS
// =====================================
function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-20">
      <motion.header initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 text-center">
        {kicker && (
          <div className="mb-2 inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">{kicker}</div>
        )}
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      </motion.header>
      {children}
    </section>
  );
}

function PriceCard({ icon: Icon, title, tagline, period, features }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow transition-transform duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Icon className="h-6 w-6 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>

      {/* Tagline + period instead of price */}
      <div className="mt-4 space-y-1">
        {tagline && (
          <p className="text-sm font-medium text-slate-700">
            {tagline}
          </p>
        )}
        {period && (
          <p className="text-xs text-slate-500">
            {period}
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3 text-slate-700">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <Star className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-center font-semibold text-white shadow-lg hover:scale-[1.02] transition"
      >
        Get a custom quote
      </a>
    </div>
  );
}

// =====================================
// MAIN PAGE (with language toggle)
// =====================================
export default function DevPricingLanding() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-slate-50 text-slate-900">
      {/* decorative light gradients */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />

      {/* NAV */}
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-extrabold text-white">EC</div>
            <span className="text-sm tracking-widest text-slate-700">EXPERTCODER</span>
          </div>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <a href="#pricing" className="px-3 py-2 text-slate-700 hover:text-slate-900">{t.nav.pricing}</a>
            <a href="#portfolio" className="px-3 py-2 text-slate-700 hover:text-slate-900">{t.nav.portfolio}</a>
            <a href="#faq" className="px-3 py-2 text-slate-700 hover:text-slate-900">{t.nav.faq}</a>
            <a href="#contact" className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow hover:scale-105">{t.nav.contact}</a>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="ml-2 inline-flex items-center gap-2 rounded-full !bg-gradient-to-r !from-cyan-400 !to-violet-500 px-3 py-2 text-xs font-semibold !text-white shadow hover:scale-105 border-0 appearance-none focus:outline-none focus:ring-0"
            >
              <Languages className="h-4 w-4" />
              {lang === 'en' ? copy.en.toggle.ar : copy.ar.toggle.en}
            </button>
          </div>

          {/* Mobile quick actions */}
          <div className={`flex md:hidden items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <a href="#contact" className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-2 text-xs font-semibold text-white shadow">
              {t.nav.contact}
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="inline-flex items-center gap-2 rounded-full !bg-gradient-to-r !from-cyan-400 !to-violet-500 px-3 py-2 text-xs font-semibold !text-white shadow border-0"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              {lang === 'en' ? copy.en.toggle.ar : copy.ar.toggle.en}
            </button>
          </div>
        </div>
      </nav>


      {/* HERO */}
      <header className="relative">
        <div className="absolute inset-0">
          <ThreeBackdrop />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
              <Sparkles className="h-4 w-4" />
              {t.hero.kicker}
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">{t.hero.title}</h1>
            <p className="mt-4 text-lg text-slate-700">{t.hero.desc}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#pricing" className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]">
                {t.hero.viewPricing}
              </a>
              <a href="#portfolio" className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50">
                {t.hero.seePortfolio}
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PRICING */}
      <Section id="pricing" title={t.pricing.title} kicker={t.pricing.sectionKicker}>
        <div className="grid items-stretch gap-6 md:grid-cols-4">
          <PriceCard
          icon={Rocket}
          title={t.pricing.landing.title}
          tagline={t.pricing.landing.tagline}
          period={t.pricing.landing.period}
          features={t.pricing.landing.features}
        />
          <PriceCard
          icon={ServerCog}
          title={t.pricing.full.title}
          tagline={t.pricing.full.tagline}
          period={t.pricing.full.period}
          features={t.pricing.full.features}
        />
          <PriceCard
          icon={Code2}
          title={t.pricing.addons.title}
          tagline={t.pricing.addons.tagline}
          period={t.pricing.addons.period}
          features={t.pricing.addons.features}
        />
          <PriceCard
          icon={Smartphone}
          title={t.pricing.apps.title}
          tagline={t.pricing.apps.tagline}
          period={t.pricing.apps.period}
          features={t.pricing.apps.features}
        />
        </div>
        <p className="mt-3 text-center text-sm text-slate-600">{t.pricing.note}</p>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio" title={t.portfolio.title} kicker={t.portfolio.kicker}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* SathanaGL — Winch App Landing */}
          <motion.a
            href="https://sathanagl.com/"
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow transition-transform duration-300"
          >
            <div className="relative h-44 w-full overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-violet-200/30" />
              <div className="absolute inset-0 grid place-items-center px-4 text-center text-xl font-extrabold text-slate-900">
                SathanaGL — Winch App Landing
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Landing Page</h4>
                <p className="text-sm text-slate-600">React • Tailwind • Conversion-focused</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 opacity-0 transition group-hover:opacity-100">Live Demo</span>
            </div>
          </motion.a>

          {/* Luckily — Pentester & Game Dev Portfolio */}
          <motion.a
            href="https://luckily-uwu.github.io/project/"
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow transition-transform duration-300"
          >
            <div className="relative h-44 w-full overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-violet-200/30" />
              <div className="absolute inset-0 grid place-items-center px-4 text-center text-xl font-extrabold text-slate-900">
                Luckily — Pentester & Game Dev Portfolio
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Portfolio</h4>
                <p className="text-sm text-slate-600">Security • Games • Projects</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 opacity-0 transition group-hover:opacity-100">Live Demo</span>
            </div>
          </motion.a>

          {/* MinaPort — Voice Actress */}
          <motion.a
            href="https://goldiethedev.github.io/minaport/"
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow transition-transform duration-300"
          >
            <div className="relative h-44 w-full overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-violet-200/30" />
              <div className="absolute inset-0 grid place-items-center px-4 text-center text-xl font-extrabold text-slate-900">
                MinaPort — Voice Actress Portfolio
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Voice Actress</h4>
                <p className="text-sm text-slate-600">Personal site • Samples • Contact</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 opacity-0 transition group-hover:opacity-100">Live Demo</span>
            </div>
          </motion.a>
        </div>
          {/* NLP / LLM projects */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {t.portfolio.llmKicker}
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            {t.portfolio.llmTitle}
          </h3>

          <p className="max-w-2xl text-sm text-slate-600">
            {t.portfolio.llmIntro}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {llmProjects[lang].map((project, index) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 + index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow transition-transform duration-300"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-violet-200/30" />
                  <div className="absolute inset-0 grid place-items-center px-4 text-center text-xl font-extrabold text-slate-900">
                    {project.title}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{project.subtitle}</h4>
                    <p className="text-sm text-slate-600">{project.meta}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 opacity-0 transition group-hover:opacity-100">
                    {project.cta}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title={t.faq.title} kicker={t.faq.kicker}>
        <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">
          {t.faq.items.map(([q, a], i) => (
            <details key={i} className="group open:bg-slate-50">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold">
                {q}
                <span className="text-slate-400">+</span>
              </summary>
              <div className="px-5 pb-5 text-slate-700">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title={t.contact.title} kicker={t.contact.kicker}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.01 }} className="relative mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow">
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_0deg,theme(colors.cyan.300),theme(colors.violet.400),theme(colors.cyan.300))] opacity-40 blur-2xl"></div>
          <p className="relative text-slate-700">{t.contact.desc}</p>
          <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
            <motion.a whileHover={{ y: -2, scale: 1.02 }} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 font-semibold text-white shadow" href="mailto:marmaladejellyandsugarsong@gmail.com?subject=Project%20Inquiry">
              <Mail className="h-4 w-4" /> {t.contact.email}
            </motion.a>
            <motion.a whileHover={{ y: -2, scale: 1.02 }} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 shadow hover:bg-slate-50" href="https://github.com/GoldieTheDev" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> {t.contact.github}
            </motion.a>
            <motion.a whileHover={{ y: -2, scale: 1.02 }} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 shadow hover:bg-slate-50" href="https://wa.me/966505577878" target="_blank" rel="noreferrer">
              <Phone className="h-4 w-4" /> {t.contact.whatsapp}
            </motion.a>
          </div>
          <p className="relative mt-3 text-xs text-slate-500">{t.contact.note}</p>
        </motion.div>
      </Section>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-slate-600">© {new Date().getFullYear()} ExpertCoder — All rights reserved.</div>
      </footer>
    </div>
  );
}
