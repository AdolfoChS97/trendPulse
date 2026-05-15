import { ref } from 'vue'

export type Locale = 'en' | 'es'

const currentLocale = ref<Locale>(detectLocale())
const fallbackLocale: Locale = 'en'

function detectLocale(): Locale {
  const stored = localStorage.getItem('tp_locale') as Locale | null
  if (stored && ['en', 'es'].includes(stored)) return stored
  const browser = navigator.language.slice(0, 2)
  return browser === 'es' ? 'es' : 'en'
}

const messages: Record<Locale, Record<string, string>> = {
  en: {
    // ── Navigation ──
    'nav.pricing': 'Pricing',
    'nav.login': 'Sign in',

    // ── Hero ──
    'hero.headline': "Know what's trending",
    'hero.headline_gradient': 'before it trends',
    'hero.subtitle': 'Real-time trend intelligence for creators who need to stay ahead.',
    'hero.subtitle2': 'No noise. Just signal.',
    'hero.cta': 'Start free',
    'hero.cta2': 'See how it works',
    'hero.nocc': 'No credit card · 2 keywords free · 5 platforms',
    'hero.social': 'Trusted by 5,000+ creators and entrepreneurs',

    // ── How It Works ──
    'how.title': 'How it works',
    'how.subtitle': 'From idea to insight in four steps',
    'how.step1_title': 'Monitor',
    'how.step1_desc': 'Add keywords and connect your social accounts. See real-time trend feeds across all platforms in one dashboard.',
    'how.step2_title': 'Detect',
    'how.step2_desc': 'Our algorithm tracks volume, growth rate, and sentiment. Get a unified Trend Score (0-100) that tells you what is actually moving.',
    'how.step3_title': 'Predict',
    'how.step3_desc': 'Acceleration patterns are detected hours before a trend goes mainstream. Receive alerts with projected growth trajectories.',
    'how.step4_title': 'Act',
    'how.step4_desc': 'Turn insights into action. Create content, launch products, or pivot your strategy based on real trend data — not hunches.',

    // ── Social Proof ──
    'social.title': 'Trusted by creators',
    'social.subtitle': 'See what our users are saying',
    'social.stat1': 'Creators',
    'social.stat2': 'Rating',
    'social.stat3': 'Faster than rivals',
    'social.stat4': 'Platforms',

    // ── Final CTA ──
    'final.title': 'Ready to spot your next trend?',
    'final.subtitle': 'Start free. No credit card. Upgrade when you grow.',
    'final.nocc': 'No credit card · 2 keywords free · 5 platforms',
    'final.start': 'Start free',

    // ── Pricing ──
    'pricing.title': 'Simple, transparent pricing',
    'pricing.subtitle': 'Start free. Upgrade when you grow.',
    'pricing.most_popular': 'Most Popular',

    // ── Dashboard ──
    'nav.dashboard': 'Dashboard',
    'nav.insights': 'Insights',
    'nav.settings': 'Settings',

    'dashboard.title': 'TrendPulse',
    'dashboard.monitored': 'keywords monitored',
    'dashboard.free': 'Free Plan',
    'dashboard.empty_title': 'Monitor your first keyword',
    'dashboard.empty_desc': 'Track trends across X, YouTube, Instagram, TikTok and Twitch',
    'dashboard.add_btn': 'Add Keyword',
    'dashboard.retry': 'Retry',

    'keyword.add_title': 'Add Keyword',
    'keyword.add_placeholder': 'e.g. sustainable fashion',
    'keyword.add_subtitle': 'Platforms: X · YouTube · Instagram · TikTok · Twitch',
    'keyword.add_cancel': 'Cancel',
    'keyword.add_track': 'Track',
    'keyword.added': 'Keyword added successfully',

    'keyword.score_label': 'Trend Score',
    'keyword.mentions': 'Mentions (24h)',
    'keyword.growth': 'Growth Rate',
    'keyword.platforms': 'Platforms',
    'keyword.by_platform': 'By Platform',
    'keyword.platforms_monitored': 'platforms monitored',
    'keyword.stop_monitoring': 'Stop monitoring this keyword',
    'keyword.score_strong': 'Strong',
    'keyword.score_low': 'Low Interest',
    'keyword.score_moderate': 'Moderate',
    'keyword.score_growing': 'Trending',
    'keyword.score_explosive': 'Explosive',

    'insights.title': 'AI Insights',
    'insights.upgrade_title': 'AI Insights',
    'insights.upgrade_desc': 'Get AI-powered trend analysis and recommendations. Available from Creator plan.',
    'insights.upgrade_cta': 'Upgrade to Creator — $9.99/mo',
    'insights.coming_soon': 'Insights will appear here automatically when our AI engine analyzes your monitored keywords.',
    'insights.auto_note': 'Insights update every 6 hours',

    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.plan': 'Plan',
    'settings.your_plan': 'Your plan',
    'settings.upgrade_cta': 'Upgrade to Creator — $9.99/mo',
    'settings.upgrade_desc': "You're on the free plan. Upgrade for:",
    'settings.upgrade_feat1': '10 keywords (up from 2)',
    'settings.upgrade_feat2': 'All 5 platforms',
    'settings.upgrade_feat3': '30-day history',
    'settings.upgrade_feat4': 'AI-powered insights',
    'settings.upgrade_feat5': 'Data export (CSV)',
    'settings.managed_billing': 'You are on the Creator plan. Manage billing in the web dashboard.',
    'settings.connected_platforms': 'Connected Platforms',
    'settings.notifications': 'Notification Settings',
    'settings.privacy': 'Privacy Policy',
    'settings.logout': 'Log out',
    'settings.explorer': 'Explorer',
    'settings.creator': 'Creator',
    'settings.business': 'Business',
    'settings.agency': 'Agency',

    'common.offline': 'You are offline',
    'common.last_synced': 'last synced',
    'common.cancel': 'Cancel',
    'common.welcome': 'Welcome to TrendPulse!',
    'common.login_failed': 'Login failed. Please try again.',
    'common.request_failed': 'Request failed',

    'platform.live': 'LIVE TRENDS',
    'platform.updated': 'Updated now',

    'alert.emerging': 'Emerging Trend Alert',
    'alert.prediction': 'is accelerating. Predicted to spike in the next 48 hours.',

    // ── Pricing page ──
    'pricing.back': 'Back',
    'pricing.title': 'Simple, transparent pricing',
    'pricing.subtitle': 'Start free. Upgrade when you grow.',
    'pricing.most_popular': 'Most Popular',
    'pricing.explorer': 'Explorer',
    'pricing.creator': 'Creator',
    'pricing.business': 'Business',
    'pricing.agency': 'Agency',
    'pricing.start': 'Start Free',
    'pricing.trial': 'Start Free Trial',
    'pricing.contact': 'Contact us',
    'pricing.mo': '/mo',
    'pricing.forever': 'forever',
    'pricing.feat1_explorer': '2 keywords',
    'pricing.feat2_explorer': '2 platforms',
    'pricing.feat3_explorer': '7-day history',
    'pricing.feat4_explorer': 'Daily updates',
    'pricing.feat5_explorer': 'Basic trend chart',
    'pricing.feat1_creator': '10 keywords',
    'pricing.feat2_creator': 'All 5 platforms',
    'pricing.feat3_creator': '30-day history',
    'pricing.feat4_creator': 'Real-time alerts',
    'pricing.feat5_creator': 'Sentiment analysis',
    'pricing.feat6_creator': 'CSV export',
    'pricing.feat7_creator': 'Emerging detection',
    'pricing.feat1_business': '25 keywords',
    'pricing.feat2_business': 'All platforms',
    'pricing.feat3_business': '90-day history',
    'pricing.feat4_business': 'AI insights',
    'pricing.feat5_business': 'PDF reports',
    'pricing.feat6_business': 'Team (3 members)',
    'pricing.feat7_business': 'Push notifications',
    'pricing.feat1_agency': 'Unlimited keywords',
    'pricing.feat2_agency': 'All platforms',
    'pricing.feat3_agency': '365-day history',
    'pricing.feat4_agency': 'API access',
    'pricing.feat5_agency': 'White-label',
    'pricing.feat6_agency': 'Unlimited team',
    'pricing.feat7_agency': 'Priority support',
    'pricing.faq_title': 'FAQ',
    'pricing.faq1_q': 'Do I need a business account?',
    'pricing.faq1_a': 'Yes. To monitor trends, you connect your own business/creator accounts via OAuth.',
    'pricing.faq2_q': 'Can I cancel anytime?',
    'pricing.faq2_a': 'Yes. Cancel anytime from Settings.',
    'pricing.faq3_q': 'What platforms do you support?',
    'pricing.faq3_a': 'X (Twitter), YouTube, Instagram, TikTok, and Twitch.',
    'pricing.faq4_q': 'Do I need a credit card?',
    'pricing.faq4_a': 'No. The Explorer plan is free. No credit card required.',
    'pricing.faq5_q': 'How often is data updated?',
    'pricing.faq5_a': 'Explorer: daily. Creator: every 6h. Business: real-time.',
  },
  es: {
    // ── Navegación ──
    'nav.pricing': 'Precios',
    'nav.login': 'Iniciar sesión',

    // ── Hero ──
    'hero.headline': 'Descubre qué es tendencia',
    'hero.headline_gradient': 'antes de que explote',
    'hero.subtitle': 'Inteligencia de tendencias en tiempo real para creadores.',
    'hero.subtitle2': 'Sin ruido. Solo señal.',
    'hero.cta': 'Empezar gratis',
    'hero.cta2': 'Ver cómo funciona',
    'hero.nocc': 'Sin tarjeta · 2 keywords gratis · 5 plataformas',
    'hero.social': 'Usado por más de 5,000 creadores y emprendedores',

    // ── Cómo funciona ──
    'how.title': 'Cómo funciona',
    'how.subtitle': 'De idea a insight en cuatro pasos',
    'how.step1_title': 'Monitorear',
    'how.step1_desc': 'Agrega keywords y conecta tus cuentas. Ve tendencias en tiempo real en todas las plataformas.',
    'how.step2_title': 'Detectar',
    'how.step2_desc': 'Nuestro algoritmo analiza volumen, crecimiento y sentimiento. Obtén un Trend Score unificado (0-100).',
    'how.step3_title': 'Predecir',
    'how.step3_desc': 'Detecta patrones de aceleración horas antes del mainstream. Recibe alertas con trayectorias proyectadas.',
    'how.step4_title': 'Actuar',
    'how.step4_desc': 'Convierte insights en acción. Crea contenido, lanza productos o pivota tu estrategia con datos reales.',

    // ── Social Proof ──
    'social.title': 'Usado por creadores',
    'social.subtitle': 'Mira lo que dicen nuestros usuarios',
    'social.stat1': 'Creadores',
    'social.stat2': 'Calificación',
    'social.stat3': 'Más rápido',
    'social.stat4': 'Plataformas',

    // ── CTA Final ──
    'final.title': '¿Listo para detectar tu próxima tendencia?',
    'final.subtitle': 'Empieza gratis. Sin tarjeta. Actualiza cuando crezcas.',
    'final.nocc': 'Sin tarjeta · 2 keywords gratis · 5 plataformas',
    'final.start': 'Empezar gratis',

    // ── Precios ──
    'pricing.title': 'Precios simples y transparentes',
    'pricing.subtitle': 'Empieza gratis. Actualiza cuando crezcas.',
    'pricing.most_popular': 'Más Popular',

    // ── Dashboard ──
    'nav.dashboard': 'Dashboard',
    'nav.insights': 'Insights',
    'nav.settings': 'Ajustes',

    'dashboard.title': 'TrendPulse',
    'dashboard.monitored': 'keywords monitoreadas',
    'dashboard.free': 'Plan Gratuito',
    'dashboard.empty_title': 'Monitorea tu primer keyword',
    'dashboard.empty_desc': 'Analiza tendencias en X, YouTube, Instagram, TikTok y Twitch',
    'dashboard.add_btn': 'Agregar Keyword',
    'dashboard.retry': 'Reintentar',

    'keyword.add_title': 'Agregar Keyword',
    'keyword.add_placeholder': 'ej. moda sostenible',
    'keyword.add_subtitle': 'Plataformas: X · YouTube · Instagram · TikTok · Twitch',
    'keyword.add_cancel': 'Cancelar',
    'keyword.add_track': 'Monitorear',
    'keyword.added': 'Keyword agregada con éxito',

    'keyword.score_label': 'Trend Score',
    'keyword.mentions': 'Menciones (24h)',
    'keyword.growth': 'Crecimiento',
    'keyword.platforms': 'Plataformas',
    'keyword.by_platform': 'Por Plataforma',
    'keyword.platforms_monitored': 'plataformas monitoreadas',
    'keyword.stop_monitoring': 'Dejar de monitorear este keyword',
    'keyword.score_strong': 'Fuerte',
    'keyword.score_low': 'Bajo Interés',
    'keyword.score_moderate': 'Moderado',
    'keyword.score_growing': 'Creciente',
    'keyword.score_explosive': 'Explosiva',

    'insights.title': 'Insights IA',
    'insights.upgrade_title': 'Insights IA',
    'insights.upgrade_desc': 'Obtén análisis de tendencias y recomendaciones con IA. Disponible desde el plan Creator.',
    'insights.upgrade_cta': 'Actualizar a Creator — $9.99/mes',
    'insights.coming_soon': 'Los insights aparecerán aquí automáticamente cuando nuestro motor de IA analice tus keywords.',
    'insights.auto_note': 'Los insights se actualizan cada 6 horas',

    'settings.title': 'Ajustes',
    'settings.profile': 'Perfil',
    'settings.plan': 'Plan',
    'settings.your_plan': 'Tu plan',
    'settings.upgrade_cta': 'Actualizar a Creator — $9.99/mes',
    'settings.upgrade_desc': 'Estás en el plan gratuito. Actualiza para:',
    'settings.upgrade_feat1': '10 keywords (antes 2)',
    'settings.upgrade_feat2': 'Las 5 plataformas',
    'settings.upgrade_feat3': '30 días de historial',
    'settings.upgrade_feat4': 'Insights con IA',
    'settings.upgrade_feat5': 'Exportar datos (CSV)',
    'settings.managed_billing': 'Estás en el plan Creator. Gestiona la facturación en el dashboard web.',
    'settings.connected_platforms': 'Plataformas Conectadas',
    'settings.notifications': 'Notificaciones',
    'settings.privacy': 'Política de Privacidad',
    'settings.logout': 'Cerrar sesión',
    'settings.explorer': 'Explorer',
    'settings.creator': 'Creator',
    'settings.business': 'Business',
    'settings.agency': 'Agency',

    'common.offline': 'Estás sin conexión',
    'common.last_synced': 'última sincronización',
    'common.cancel': 'Cancelar',
    'common.welcome': '¡Bienvenido a TrendPulse!',
    'common.login_failed': 'Error al iniciar sesión. Intenta de nuevo.',
    'common.request_failed': 'Error en la solicitud',

    'platform.live': 'TENDENCIAS EN VIVO',
    'platform.updated': 'Actualizado ahora',

    'alert.emerging': 'Alerta de Tendencia Emergente',
    'alert.prediction': 'está acelerando. Se prevé un pico en las próximas 48 horas.',

    // ── Pricing page ──
    'pricing.back': 'Volver',
    'pricing.title': 'Precios simples y transparentes',
    'pricing.subtitle': 'Empieza gratis. Actualiza cuando crezcas.',
    'pricing.most_popular': 'Más Popular',
    'pricing.explorer': 'Explorer',
    'pricing.creator': 'Creator',
    'pricing.business': 'Business',
    'pricing.agency': 'Agency',
    'pricing.start': 'Empezar Gratis',
    'pricing.trial': 'Prueba Gratis',
    'pricing.contact': 'Contáctanos',
    'pricing.mo': '/mes',
    'pricing.forever': 'para siempre',
    'pricing.feat1_explorer': '2 keywords',
    'pricing.feat2_explorer': '2 plataformas',
    'pricing.feat3_explorer': '7 días de historial',
    'pricing.feat4_explorer': 'Actualización diaria',
    'pricing.feat5_explorer': 'Gráfica básica',
    'pricing.feat1_creator': '10 keywords',
    'pricing.feat2_creator': '5 plataformas',
    'pricing.feat3_creator': '30 días de historial',
    'pricing.feat4_creator': 'Alertas en tiempo real',
    'pricing.feat5_creator': 'Análisis de sentimiento',
    'pricing.feat6_creator': 'Exportar CSV',
    'pricing.feat7_creator': 'Detección de tendencias',
    'pricing.feat1_business': '25 keywords',
    'pricing.feat2_business': 'Todas las plataformas',
    'pricing.feat3_business': '90 días de historial',
    'pricing.feat4_business': 'Insights IA',
    'pricing.feat5_business': 'Reportes PDF',
    'pricing.feat6_business': 'Equipo (3 miembros)',
    'pricing.feat7_business': 'Notificaciones push',
    'pricing.feat1_agency': 'Keywords ilimitadas',
    'pricing.feat2_agency': 'Todas las plataformas',
    'pricing.feat3_agency': '365 días de historial',
    'pricing.feat4_agency': 'Acceso API',
    'pricing.feat5_agency': 'White-label',
    'pricing.feat6_agency': 'Equipo ilimitado',
    'pricing.feat7_agency': 'Soporte prioritario',
    'pricing.faq_title': 'Preguntas Frecuentes',
    'pricing.faq1_q': '¿Necesito una cuenta business?',
    'pricing.faq1_a': 'Sí. Para monitorear tendencias, conectas tus propias cuentas business/creator vía OAuth.',
    'pricing.faq2_q': '¿Puedo cancelar cuando quiera?',
    'pricing.faq2_a': 'Sí. Cancela cuando quieras desde Ajustes.',
    'pricing.faq3_q': '¿Qué plataformas soportan?',
    'pricing.faq3_a': 'X (Twitter), YouTube, Instagram, TikTok y Twitch.',
    'pricing.faq4_q': '¿Necesito tarjeta de crédito?',
    'pricing.faq4_a': 'No. El plan Explorer es gratis. Sin tarjeta.',
    'pricing.faq5_q': '¿Cada cuánto se actualizan los datos?',
    'pricing.faq5_a': 'Explorer: diario. Creator: cada 6h. Business: tiempo real.',
  },
}

export function useI18n() {
  function t(key: string): string {
    return messages[currentLocale.value]?.[key]
      ?? messages[fallbackLocale]?.[key]
      ?? key
  }

  function setLocale(locale: Locale) {
    currentLocale.value = locale
    localStorage.setItem('tp_locale', locale)
  }

  return {
    locale: currentLocale,
    t,
    setLocale,
    availableLocales: ['en', 'es'] as Locale[],
  }
}
