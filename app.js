/* =========================================================
   KitepKana — app.js
   Vanilla JS SPA: Router, JWT Auth, Private routes, Admin CRUD,
   Cart, Booking, Favorites, Reviews, i18n (kg/ru/en), Charts,
   Realtime, Telegram/Email, Chatbot, Stripe/Post.kg demo.
   ========================================================= */
'use strict';

/* =========================================================
   1. CONFIG — сайттын жөндөөлөрү
   Telegram, Email, Google, Cloudinary, Firebase ачкычтарын ушул жерге жазыңыз
   ========================================================= */
const CONFIG = {
  "slug": "kitepkana",
  "siteName": "KitepKana",
  "logo": "📚",
  "tagline": {
    "kg": "Китеп дүкөнү жана окуу клубу",
    "ru": "Книжный магазин и книжный клуб",
    "en": "Bookstore and reading club"
  },
  "defaultLang": "kg",
  "dataVersion": "1.0",
  "API_URL": "",
  "GOOGLE_CLIENT_ID": "",
  "TELEGRAM_BOT_TOKEN": "",
  "TELEGRAM_CHAT_ID": "",
  "ORDER_EMAIL": "",
  "CLOUDINARY_CLOUD": "",
  "CLOUDINARY_PRESET": "",
  "FIREBASE_DB_URL": "",
  "perPage": 8,
  "hero": [
    {
      "title": {
        "kg": "Китеп — эң жакшы дос",
        "ru": "Книга — лучший друг",
        "en": "A book is the best friend"
      },
      "text": {
        "kg": "5000+ китеп кыргыз, орус жана англис тилдеринде. Бишкек боюнча 1 күндө жеткиребиз.",
        "ru": "5000+ книг на кыргызском, русском и английском.",
        "en": "5000+ books in Kyrgyz, Russian and English."
      },
      "img": "https://loremflickr.com/1600/900/library,books?lock=290"
    },
    {
      "title": {
        "kg": "Окуу клубу ар жекшемби",
        "ru": "Книжный клуб каждое воскресенье",
        "en": "Book club every Sunday"
      },
      "text": {
        "kg": "Жазуучулар менен жолугушуулар жана талкуулар. Орун брондоңуз!",
        "ru": "Встречи с авторами и обсуждения. Бронируйте место!",
        "en": "Meet authors and discuss. Book your seat!"
      },
      "img": "https://loremflickr.com/1600/900/reading,cafe?lock=291"
    },
    {
      "title": {
        "kg": "Балдар үчүн китептер",
        "ru": "Книги для детей",
        "en": "Books for kids"
      },
      "text": {
        "kg": "Сүрөттүү жомоктор жана окуу китептери арзандатуу менен.",
        "ru": "Сказки с картинками и учебники со скидкой.",
        "en": "Picture tales and textbooks on sale."
      },
      "img": "https://loremflickr.com/1600/900/children,book?lock=292"
    }
  ],
  "categories": [
    {
      "key": "kyrgyz",
      "icon": "🇰🇬",
      "name": {
        "kg": "Кыргыз адабияты",
        "ru": "Кыргызская литература",
        "en": "Kyrgyz literature"
      }
    },
    {
      "key": "world",
      "icon": "🌍",
      "name": {
        "kg": "Дүйнөлүк классика",
        "ru": "Мировая классика",
        "en": "World classics"
      }
    },
    {
      "key": "business",
      "icon": "💼",
      "name": {
        "kg": "Бизнес",
        "ru": "Бизнес",
        "en": "Business"
      }
    },
    {
      "key": "kids",
      "icon": "🧸",
      "name": {
        "kg": "Балдар үчүн",
        "ru": "Детские",
        "en": "Kids"
      }
    },
    {
      "key": "science",
      "icon": "🔬",
      "name": {
        "kg": "Илим",
        "ru": "Наука",
        "en": "Science"
      }
    }
  ],
  "specLabels": {
    "author": {
      "kg": "Автору",
      "ru": "Автор",
      "en": "Author"
    },
    "pages": {
      "kg": "Барактар",
      "ru": "Страниц",
      "en": "Pages"
    },
    "lang": {
      "kg": "Тили",
      "ru": "Язык",
      "en": "Language"
    },
    "cover": {
      "kg": "Мукабасы",
      "ru": "Обложка",
      "en": "Cover"
    },
    "year": {
      "kg": "Жылы",
      "ru": "Год",
      "en": "Year"
    },
    "publisher": {
      "kg": "Басмакана",
      "ru": "Издательство",
      "en": "Publisher"
    }
  },
  "booking": true,
  "bookingLabel": {
    "kg": "Китепти резервдөө",
    "ru": "Зарезервировать книгу",
    "en": "Reserve the book"
  },
  "bookingFields": {
    "dateLabel": {
      "kg": "Алып кетүү күнү",
      "ru": "Дата получения",
      "en": "Pickup date"
    },
    "peopleLabel": {
      "kg": "Нуска саны",
      "ru": "Кол-во экземпляров",
      "en": "Copies"
    },
    "times": [
      "10:00",
      "13:00",
      "16:00",
      "19:00"
    ],
    "maxPeople": 5,
    "perPerson": true
  },
  "priceUnit": null,
  "promoText": {
    "kg": "Эки китеп алсаңыз — үчүнчүсүнө -50%!",
    "ru": "Купи две книги — третья за полцены!",
    "en": "Buy two books — third at half price!"
  },
  "promoCodes": {
    "BOOK15": 15,
    "READ10": 10
  },
  "about": {
    "text": {
      "kg": "KitepKana — 2015-жылы ачылган китеп дүкөнү жана окуу клубу. Биз кыргыз адабиятын жана дүйнөлүк классиканы жайылтабыз. Дүкөнүбүздө кофе бурчу жана балдар зонасы бар.",
      "ru": "KitepKana — книжный магазин и клуб, открытый в 2015 году. Мы продвигаем кыргызскую литературу и мировую классику.",
      "en": "KitepKana is a bookstore and reading club opened in 2015. We promote Kyrgyz literature and world classics."
    },
    "short": {
      "kg": "Ар бир үйгө — китеп!",
      "ru": "В каждый дом — книгу!",
      "en": "A book for every home!"
    },
    "img": "https://loremflickr.com/900/700/bookstore?lock=299"
  },
  "faq": [],
  "team": [
    {
      "name": "Усман Сатыбалдиев",
      "role": {
        "kg": "Негиздөөчү",
        "ru": "Основатель",
        "en": "Founder"
      },
      "img": 9
    },
    {
      "name": "Айгерим Токтосунова",
      "role": {
        "kg": "Менеджер",
        "ru": "Менеджер",
        "en": "Manager"
      },
      "img": 10
    },
    {
      "name": "Нурсултан Абдыкадыров",
      "role": {
        "kg": "Дизайнер",
        "ru": "Дизайнер",
        "en": "Designer"
      },
      "img": 11
    },
    {
      "name": "Мээрим Жунусова",
      "role": {
        "kg": "Кардарлар бөлүмү",
        "ru": "Поддержка клиентов",
        "en": "Customer support"
      },
      "img": 12
    }
  ],
  "stats": [
    21000,
    64000,
    11
  ],
  "contacts": {
    "phone": "+996 774 054 601",
    "whatsapp": "996774054601",
    "instagram": "satyba1dyev18",
    "telegram": "satyba1dyev18",
    "email": "info@kitepkana.kg",
    "address": {
      "kg": "Бишкек ш., Чүй проспекти 150",
      "ru": "г. Бишкек, пр. Чуй 150",
      "en": "150 Chui Ave, Bishkek"
    },
    "mapQuery": "Bishkek, Erkindik boulevard"
  }
};

/* =========================================================
   2. I18N — котормо сөздүгү (kg / ru / en)
   ========================================================= */
const I18N = {
  kg: {
    home: 'Башкы бет', catalog: 'Каталог', about: 'Биз жөнүндө', contacts: 'Байланыш', faq: 'Суроолор',
    cart: 'Себет', favorites: 'Тандалмалар', login: 'Кирүү', register: 'Катталуу', logout: 'Чыгуу',
    profile: 'Профиль', admin: 'Админ панель', translator: 'Котормочу', menu: 'Меню',
    search: 'Издөө', searchPlaceholder: 'Аты боюнча издөө...', all: 'Баары', categories: 'Категориялар',
    price: 'Баасы', from: 'чейин', min: 'Мин', max: 'Макс', rating: 'Рейтинг', inStock: 'Бар болгондор гана',
    sort: 'Сорттоо', sortPopular: 'Популярдуу', sortPriceAsc: 'Арзанынан', sortPriceDesc: 'Кымбатынан',
    sortRating: 'Рейтинг боюнча', sortNew: 'Жаңылар', sortName: 'Аты боюнча (А-Я)',
    reset: 'Тазалоо', filters: 'Фильтрлер', found: 'Табылды', nothingFound: 'Эч нерсе табылган жок',
    nothingFoundText: 'Башка сөз же фильтр менен аракет кылып көрүңүз.',
    addToCart: 'Себетке', outOfStock: 'Жок', book: 'Брондоо', new: 'Жаңы', sale: 'Арзандатуу',
    addedCart: 'Себетке кошулду', addedFav: 'Тандалмаларга кошулду', removedFav: 'Тандалмалардан өчүрүлдү',
    description: 'Сүрөттөмө', specs: 'Мүнөздөмөлөр', reviews: 'Пикирлер', writeReview: 'Пикир калтыруу',
    yourRating: 'Сиздин баа', yourReview: 'Сиздин пикир', send: 'Жөнөтүү', loginToReview: 'Пикир калтыруу үчүн кириңиз',
    reviewAdded: 'Пикириңиз үчүн рахмат!', noReviews: 'Азырынча пикир жок. Биринчи болуңуз!',
    related: 'Окшош товарлар', recentlyViewed: 'Жакында көрүлгөндөр', qty: 'Саны', inStockN: 'Кампада',
    pcs: 'даана', total: 'Жалпы', subtotal: 'Товарлар', delivery: 'Жеткирүү', free: 'Акысыз',
    discount: 'Арзандатуу', promo: 'Промокод', applyPromo: 'Колдонуу', promoOk: 'Промокод колдонулду!',
    promoBad: 'Промокод туура эмес', checkout: 'Заказ берүү', emptyCart: 'Себетиңиз бош',
    goShopping: 'Каталогго өтүү', name: 'Аты-жөнү', email: 'Email', phone: 'Телефон', password: 'Сырсөз',
    confirmPassword: 'Сырсөздү кайталаңыз', address: 'Дарек', city: 'Шаар', comment: 'Комментарий',
    deliveryMethod: 'Жеткирүү ыкмасы', courier: 'Курьер', pickup: 'Өзүм алып кетем', payment: 'Төлөм ыкмасы',
    payCard: 'Карта (Stripe demo)', payPostkg: 'Post.kg (demo)', payCash: 'Накталай', placeOrder: 'Заказды тастыктоо',
    orderPlaced: 'Заказ кабыл алынды!', orderNo: 'Заказ №', required: 'Милдеттүү талаа',
    invalidEmail: 'Email туура эмес', invalidPhone: 'Телефон туура эмес (+996...)', passMin: 'Кеминде 6 белги',
    passMismatch: 'Сырсөздөр дал келбейт', agree: 'Колдонуу шарттарына макулмун', haveAccount: 'Аккаунтуңуз барбы?',
    noAccount: 'Аккаунтуңуз жокпу?', orWith: 'же төмөнкү аркылуу', demoAccounts: 'Демо аккаунттар',
    welcome: 'Кош келиңиз', wrongCreds: 'Email же сырсөз туура эмес', emailTaken: 'Бул email катталган',
    needLogin: 'Алгач аккаунтка кириңиз', noAccess: 'Кирүүгө уруксат жок', myOrders: 'Менин заказдарым',
    myBookings: 'Менин брондорум', myInfo: 'Жеке маалымат', save: 'Сактоо', saved: 'Сакталды',
    status: 'Статус', date: 'Күнү', time: 'Убактысы', people: 'Адам саны', bookingDone: 'Брон кабыл алынды!',
    st_new: 'Жаңы', st_processing: 'Иштелүүдө', st_shipped: 'Жолдо', st_delivered: 'Жеткирилди',
    st_cancelled: 'Жокко чыгарылды', st_pending: 'Күтүүдө', st_confirmed: 'Тастыкталды', st_paid: 'Төлөндү',
    dashboard: 'Статистика', items: 'Товарлар', orders: 'Заказдар', bookings: 'Брондор', users: 'Колдонуучулар',
    revenue: 'Киреше', addItem: 'Товар кошуу', editItem: 'Товарды өзгөртүү', delete: 'Өчүрүү', edit: 'Өзгөртүү',
    cancel: 'Жокко чыгаруу', confirmDelete: 'Чын эле өчүрөсүзбү?', yes: 'Ооба', no: 'Жок', deleted: 'Өчүрүлдү',
    image: 'Сүрөт', uploadImage: 'Сүрөт жүктөө', orUrl: 'же сүрөттүн шилтемеси (URL)', uploading: 'Жүктөлүүдө...',
    stock: 'Кампада', oldPrice: 'Эски баасы', category: 'Категория', role: 'Ролу', actions: 'Аракеттер',
    salesWeek: 'Акыркы 7 күндөгү сатуу', byCategory: 'Категориялар боюнча киреше', topItems: 'Эң көп сатылгандар',
    orderStatus: 'Заказдардын статусу', liveFeed: 'Онлайн окуялар (Realtime)', newOrderRt: 'Жаңы заказ келди!',
    newBookingRt: 'Жаңы брон келди!', liveEmpty: 'Окуялар бул жерде реалдуу убакытта көрүнөт',
    errorTitle: 'Ката кетти', errorHint: 'Баракты жаңыртып көрүңүз. Эгер файлды түз ачсаңыз, Live Server же Vercel аркылуу ачыңыз.',
    retry: 'Кайра аракет', notFound: 'Барак табылган жок', notFoundText: 'Сиз издеген барак жок же жылдырылган.',
    translate: 'Которуу', translating: 'Которулууда...', sourceText: 'Текст', result: 'Натыйжа', swap: 'Алмаштыруу',
    translatorText: 'Кыргыз, орус жана англис тилдеринин ортосунда которуу (MyMemory API).',
    chatTitle: 'Онлайн жардамчы', chatPlaceholder: 'Суроо жазыңыз...', chatHello: 'Саламатсызбы! Мен сиздин жардамчыңызмын. Эмне кызыктырат?',
    botDelivery: 'Бишкек боюнча жеткирүү 1 күндүн ичинде, 5000 сомдон жогору заказга акысыз. Региондорго 2-4 күн.',
    botPayment: 'Төлөө: карта (Visa/Mastercard, Stripe), Post.kg же накталай акча.',
    botContacts: 'Биз менен байланыш: ', botBooking: 'Брондоо үчүн товардын бетиндеги «Брондоо» баскычын басыңыз.',
    botHours: 'Биз дүйшөмбү-ишемби 9:00-20:00 иштейбиз, онлайн заказ 24/7.', botFound: 'Мына, мен тапкандар:',
    botUnknown: 'Кечириңиз, түшүнгөн жокмун. Төмөнкү темалардын бирин тандаңыз же оператор менен байланышыңыз.',
    botHi: 'Салам! Сизге кантип жардам бере алам?', botThanks: 'Рахмат сизге! Дагы суроо болсо жазыңыз 😊',
    qDelivery: 'Жеткирүү', qPayment: 'Төлөм', qContacts: 'Байланыш', qBooking: 'Брондоо', qHours: 'Иш убактысы',
    newsletter: 'Жаңылыктарга жазылуу', newsletterText: 'Арзандатуулар жана жаңы товарлар тууралуу биринчи болуп билиңиз.',
    subscribe: 'Жазылуу', subscribed: 'Ийгиликтүү жазылдыңыз!', whyUs: 'Эмне үчүн биз?', popular: 'Популярдуу',
    newArrivals: 'Жаңы келгендер', viewAll: 'Баарын көрүү', testimonials: 'Кардарлардын пикирлери',
    statItems: 'Товар жана кызмат', statClients: 'Ыраазы кардар', statOrders: 'Аткарылган заказ', statYears: 'Жыл тажрыйба',
    workHours: 'Иш убактысы', workHoursVal: 'Дш-Иш: 9:00 – 20:00', followUs: 'Бизди ээрчиңиз', rights: 'Бардык укуктар корголгон',
    cardNumber: 'Картанын номери', cardExp: 'Мөөнөтү (MM/YY)', cardCvc: 'CVC', cardHolder: 'Карта ээси', pay: 'Төлөө',
    processing: 'Иштелүүдө...', paymentOk: 'Төлөм ийгиликтүү өттү', paymentFail: 'Карта четке кагылды',
    postkgText: 'Post.kg аркылуу төлөө (демо). QR кодду сканерлеп, андан кийин «Төлөдүм» баскычын басыңыз.',
    paid: 'Төлөдүм', testCard: 'Тест карта: 4242 4242 4242 4242, каалаган мөөнөт жана CVC',
    cardInvalid: 'Картанын маалыматы туура эмес', cookieText: 'Бул сайт ыңгайлуулук үчүн cookie жана localStorage колдонот.',
    accept: 'Макулмун', share: 'Бөлүшүү', linkCopied: 'Шилтеме көчүрүлдү', theme: 'Тема', language: 'Тил',
    currency: 'Валюта', prev: 'Мурунку', next: 'Кийинки', weak: 'Алсыз', medium: 'Орточо', strong: 'Күчтүү',
    avatar: 'Аватар', joined: 'Катталган күнү', noOrders: 'Азырынча заказ жок', noBookings: 'Азырынча брон жок',
    noFavs: 'Тандалмалар тизмеси бош', saleEnds: 'Акция бүтөт:', days: 'күн', hours: 'саат', mins: 'мүн', secs: 'сек',
    details: 'Толук маалымат', sendMessage: 'Билдирүү жөнөтүү', messageSent: 'Билдирүүңүз жөнөтүлдү!', message: 'Билдирүү',
    ourMap: 'Биз картада', faqTitle: 'Көп берилүүчү суроолор', loading: 'Жүктөлүүдө...', storageFull: 'Сактагыч толду',
    welcomeBack: 'Кайра кош келиңиз', registered: 'Катталдыңыз!', loggedOut: 'Аккаунттан чыктыңыз',
    githubUser: 'GitHub логиниңиз', googleDemo: 'Google аккаунтуңуз (демо режим)', continue: 'Улантуу',
    userNotFound: 'Колдонуучу табылган жок', bookingTitle: 'Брондоо', bookingFor: 'Брондолуучу',
    makeAdmin: 'Админ кылуу', you: 'сиз', items_count: 'товар', reviewsCount: 'пикир', apiStatus: 'API абалы',
    exchange: 'Курс', ratesLive: 'Валюта курсу API аркылуу жаңыртылды', ratesOffline: 'Курс: офлайн маанилер',
    feat1t: 'Тез жеткирүү', feat1d: 'Бишкек боюнча 24 сааттын ичинде жеткиребиз.',
    feat2t: 'Сапат кепилдиги', feat2d: 'Ар бир товар жана кызмат текшерүүдөн өтөт.',
    feat3t: 'Коопсуз төлөм', feat3d: 'Stripe жана Post.kg аркылуу корголгон төлөм.',
    feat4t: '24/7 колдоо', feat4d: 'Чатбот жана оператор ар дайым жардамга даяр.',
    faq1q: 'Кантип заказ берем?', faq1a: 'Товарды себетке кошуп, «Заказ берүү» баскычын басыңыз, маалыматтарды толтуруп, төлөм ыкмасын тандаңыз.',
    faq2q: 'Жеткирүү канча турат?', faq2a: '5000 сомдон жогору заказга Бишкек боюнча жеткирүү акысыз, калган учурда 200 сом.',
    faq3q: 'Кантип төлөсө болот?', faq3a: 'Visa/Mastercard (Stripe), Post.kg же накталай акча менен төлөй аласыз.',
    faq4q: 'Брондоону жокко чыгарса болобу?', faq4a: 'Ооба, профилиңизден же оператор аркылуу 24 саат мурун жокко чыгара аласыз.',
    faq5q: 'Товарды кайтарса болобу?', faq5a: 'Сатып алгандан кийин 14 күндүн ичинде чек менен кайтара аласыз.',
    faq6q: 'Аккаунтсуз заказ берсе болобу?', faq6a: 'Коопсуздук үчүн заказ жана брондоо катталган колдонуучуларга гана жеткиликтүү.',
    addedItem: 'Товар кошулду', updatedItem: 'Товар жаңыртылды', nameKg: 'Аты (KG)', nameRu: 'Аты (RU)', nameEn: 'Аты (EN)',
    descKg: 'Сүрөттөмө (KG)', descRu: 'Сүрөттөмө (RU)', descEn: 'Сүрөттөмө (EN)', specsHint: 'Ар бир сапка: Аталыш: маани',
    markNew: '«Жаңы» белгиси', viewSite: 'Сайтка кайтуу', searchTable: 'Таблицадан издөө...', customer: 'Кардар',
    sum: 'Сумма', open: 'Ачуу', close: 'Жабуу', total_items: 'Бардык товарлар', avgRating: 'Орточо рейтинг',
    orderDetails: 'Заказдын деталдары', guests: 'Конок', notifSent: 'Билдирүү Telegram/Email аркылуу жөнөтүлдү',
    payStatus: 'Төлөм', unpaid: 'Төлөнө элек', clearCart: 'Себетти тазалоо', continueShopping: 'Сатып алууну улантуу',
    quickView: 'Тез көрүү', backHome: 'Башкы бетке', sortBy: 'Сорттоо:', perPage: 'бетке', showing: 'Көрсөтүлүүдө',
  },
  ru: {
    home: 'Главная', catalog: 'Каталог', about: 'О нас', contacts: 'Контакты', faq: 'Вопросы',
    cart: 'Корзина', favorites: 'Избранное', login: 'Войти', register: 'Регистрация', logout: 'Выйти',
    profile: 'Профиль', admin: 'Админ панель', translator: 'Переводчик', menu: 'Меню',
    search: 'Поиск', searchPlaceholder: 'Поиск по названию...', all: 'Все', categories: 'Категории',
    price: 'Цена', from: 'до', min: 'Мин', max: 'Макс', rating: 'Рейтинг', inStock: 'Только в наличии',
    sort: 'Сортировка', sortPopular: 'Популярные', sortPriceAsc: 'Сначала дешевые', sortPriceDesc: 'Сначала дорогие',
    sortRating: 'По рейтингу', sortNew: 'Новинки', sortName: 'По названию (А-Я)',
    reset: 'Сбросить', filters: 'Фильтры', found: 'Найдено', nothingFound: 'Ничего не найдено',
    nothingFoundText: 'Попробуйте другой запрос или фильтр.',
    addToCart: 'В корзину', outOfStock: 'Нет в наличии', book: 'Забронировать', new: 'Новинка', sale: 'Скидка',
    addedCart: 'Добавлено в корзину', addedFav: 'Добавлено в избранное', removedFav: 'Удалено из избранного',
    description: 'Описание', specs: 'Характеристики', reviews: 'Отзывы', writeReview: 'Оставить отзыв',
    yourRating: 'Ваша оценка', yourReview: 'Ваш отзыв', send: 'Отправить', loginToReview: 'Войдите, чтобы оставить отзыв',
    reviewAdded: 'Спасибо за отзыв!', noReviews: 'Пока нет отзывов. Будьте первым!',
    related: 'Похожие товары', recentlyViewed: 'Недавно просмотренные', qty: 'Количество', inStockN: 'На складе',
    pcs: 'шт', total: 'Итого', subtotal: 'Товары', delivery: 'Доставка', free: 'Бесплатно',
    discount: 'Скидка', promo: 'Промокод', applyPromo: 'Применить', promoOk: 'Промокод применён!',
    promoBad: 'Неверный промокод', checkout: 'Оформить заказ', emptyCart: 'Ваша корзина пуста',
    goShopping: 'Перейти в каталог', name: 'ФИО', email: 'Email', phone: 'Телефон', password: 'Пароль',
    confirmPassword: 'Повторите пароль', address: 'Адрес', city: 'Город', comment: 'Комментарий',
    deliveryMethod: 'Способ доставки', courier: 'Курьер', pickup: 'Самовывоз', payment: 'Способ оплаты',
    payCard: 'Карта (Stripe demo)', payPostkg: 'Post.kg (demo)', payCash: 'Наличными', placeOrder: 'Подтвердить заказ',
    orderPlaced: 'Заказ принят!', orderNo: 'Заказ №', required: 'Обязательное поле',
    invalidEmail: 'Неверный email', invalidPhone: 'Неверный телефон (+996...)', passMin: 'Минимум 6 символов',
    passMismatch: 'Пароли не совпадают', agree: 'Согласен с условиями использования', haveAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?', orWith: 'или через', demoAccounts: 'Демо аккаунты',
    welcome: 'Добро пожаловать', wrongCreds: 'Неверный email или пароль', emailTaken: 'Этот email уже зарегистрирован',
    needLogin: 'Сначала войдите в аккаунт', noAccess: 'Нет доступа', myOrders: 'Мои заказы',
    myBookings: 'Мои брони', myInfo: 'Личные данные', save: 'Сохранить', saved: 'Сохранено',
    status: 'Статус', date: 'Дата', time: 'Время', people: 'Кол-во человек', bookingDone: 'Бронь принята!',
    st_new: 'Новый', st_processing: 'В обработке', st_shipped: 'В пути', st_delivered: 'Доставлен',
    st_cancelled: 'Отменён', st_pending: 'Ожидает', st_confirmed: 'Подтверждена', st_paid: 'Оплачен',
    dashboard: 'Статистика', items: 'Товары', orders: 'Заказы', bookings: 'Брони', users: 'Пользователи',
    revenue: 'Выручка', addItem: 'Добавить товар', editItem: 'Редактировать товар', delete: 'Удалить', edit: 'Изменить',
    cancel: 'Отмена', confirmDelete: 'Вы точно хотите удалить?', yes: 'Да', no: 'Нет', deleted: 'Удалено',
    image: 'Изображение', uploadImage: 'Загрузить фото', orUrl: 'или ссылка на изображение (URL)', uploading: 'Загрузка...',
    stock: 'На складе', oldPrice: 'Старая цена', category: 'Категория', role: 'Роль', actions: 'Действия',
    salesWeek: 'Продажи за 7 дней', byCategory: 'Выручка по категориям', topItems: 'Самые продаваемые',
    orderStatus: 'Статусы заказов', liveFeed: 'События онлайн (Realtime)', newOrderRt: 'Новый заказ!',
    newBookingRt: 'Новая бронь!', liveEmpty: 'События будут появляться здесь в реальном времени',
    errorTitle: 'Произошла ошибка', errorHint: 'Обновите страницу. Если открыли файл напрямую — откройте через Live Server или Vercel.',
    retry: 'Повторить', notFound: 'Страница не найдена', notFoundText: 'Страница не существует или была перемещена.',
    translate: 'Перевести', translating: 'Перевод...', sourceText: 'Текст', result: 'Результат', swap: 'Поменять',
    translatorText: 'Перевод между кыргызским, русским и английским (MyMemory API).',
    chatTitle: 'Онлайн помощник', chatPlaceholder: 'Напишите вопрос...', chatHello: 'Здравствуйте! Я ваш помощник. Что вас интересует?',
    botDelivery: 'Доставка по Бишкеку в течение 1 дня, бесплатно от 5000 сом. В регионы 2-4 дня.',
    botPayment: 'Оплата: карта (Visa/Mastercard, Stripe), Post.kg или наличными.',
    botContacts: 'Наши контакты: ', botBooking: 'Чтобы забронировать, нажмите «Забронировать» на странице товара.',
    botHours: 'Мы работаем пн-сб 9:00-20:00, онлайн заказы 24/7.', botFound: 'Вот что я нашёл:',
    botUnknown: 'Извините, не понял. Выберите тему ниже или свяжитесь с оператором.',
    botHi: 'Привет! Чем могу помочь?', botThanks: 'Спасибо вам! Пишите, если будут вопросы 😊',
    qDelivery: 'Доставка', qPayment: 'Оплата', qContacts: 'Контакты', qBooking: 'Бронь', qHours: 'Часы работы',
    newsletter: 'Подписка на новости', newsletterText: 'Узнавайте первыми о скидках и новинках.',
    subscribe: 'Подписаться', subscribed: 'Вы подписались!', whyUs: 'Почему мы?', popular: 'Популярное',
    newArrivals: 'Новинки', viewAll: 'Смотреть все', testimonials: 'Отзывы клиентов',
    statItems: 'Товаров и услуг', statClients: 'Довольных клиентов', statOrders: 'Выполненных заказов', statYears: 'Лет опыта',
    workHours: 'Часы работы', workHoursVal: 'Пн-Сб: 9:00 – 20:00', followUs: 'Мы в соцсетях', rights: 'Все права защищены',
    cardNumber: 'Номер карты', cardExp: 'Срок (MM/YY)', cardCvc: 'CVC', cardHolder: 'Владелец карты', pay: 'Оплатить',
    processing: 'Обработка...', paymentOk: 'Оплата прошла успешно', paymentFail: 'Карта отклонена',
    postkgText: 'Оплата через Post.kg (демо). Отсканируйте QR, затем нажмите «Я оплатил».',
    paid: 'Я оплатил', testCard: 'Тестовая карта: 4242 4242 4242 4242, любой срок и CVC',
    cardInvalid: 'Неверные данные карты', cookieText: 'Сайт использует cookie и localStorage для удобства.',
    accept: 'Принять', share: 'Поделиться', linkCopied: 'Ссылка скопирована', theme: 'Тема', language: 'Язык',
    currency: 'Валюта', prev: 'Назад', next: 'Далее', weak: 'Слабый', medium: 'Средний', strong: 'Надёжный',
    avatar: 'Аватар', joined: 'Дата регистрации', noOrders: 'Заказов пока нет', noBookings: 'Броней пока нет',
    noFavs: 'Список избранного пуст', saleEnds: 'До конца акции:', days: 'дн', hours: 'ч', mins: 'мин', secs: 'сек',
    details: 'Подробнее', sendMessage: 'Отправить сообщение', messageSent: 'Сообщение отправлено!', message: 'Сообщение',
    ourMap: 'Мы на карте', faqTitle: 'Часто задаваемые вопросы', loading: 'Загрузка...', storageFull: 'Хранилище заполнено',
    welcomeBack: 'С возвращением', registered: 'Вы зарегистрированы!', loggedOut: 'Вы вышли из аккаунта',
    githubUser: 'Ваш логин GitHub', googleDemo: 'Ваш Google аккаунт (демо режим)', continue: 'Продолжить',
    userNotFound: 'Пользователь не найден', bookingTitle: 'Бронирование', bookingFor: 'Бронируется',
    makeAdmin: 'Сделать админом', you: 'вы', items_count: 'товаров', reviewsCount: 'отзывов', apiStatus: 'Статус API',
    exchange: 'Курс', ratesLive: 'Курс валют обновлён через API', ratesOffline: 'Курс: офлайн значения',
    feat1t: 'Быстрая доставка', feat1d: 'Доставим по Бишкеку в течение 24 часов.',
    feat2t: 'Гарантия качества', feat2d: 'Каждый товар и услуга проходят проверку.',
    feat3t: 'Безопасная оплата', feat3d: 'Защищённая оплата через Stripe и Post.kg.',
    feat4t: 'Поддержка 24/7', feat4d: 'Чат-бот и оператор всегда готовы помочь.',
    faq1q: 'Как оформить заказ?', faq1a: 'Добавьте товар в корзину, нажмите «Оформить заказ», заполните данные и выберите способ оплаты.',
    faq2q: 'Сколько стоит доставка?', faq2a: 'Доставка по Бишкеку бесплатна от 5000 сом, иначе 200 сом.',
    faq3q: 'Как оплатить?', faq3a: 'Картой Visa/Mastercard (Stripe), через Post.kg или наличными.',
    faq4q: 'Можно ли отменить бронь?', faq4a: 'Да, в профиле или через оператора за 24 часа.',
    faq5q: 'Можно ли вернуть товар?', faq5a: 'В течение 14 дней после покупки при наличии чека.',
    faq6q: 'Можно ли заказать без аккаунта?', faq6a: 'Для безопасности заказы и брони доступны только зарегистрированным.',
    addedItem: 'Товар добавлен', updatedItem: 'Товар обновлён', nameKg: 'Название (KG)', nameRu: 'Название (RU)', nameEn: 'Название (EN)',
    descKg: 'Описание (KG)', descRu: 'Описание (RU)', descEn: 'Описание (EN)', specsHint: 'Каждая строка: Название: значение',
    markNew: 'Метка «Новинка»', viewSite: 'Вернуться на сайт', searchTable: 'Поиск по таблице...', customer: 'Клиент',
    sum: 'Сумма', open: 'Открыть', close: 'Закрыть', total_items: 'Всего товаров', avgRating: 'Средний рейтинг',
    orderDetails: 'Детали заказа', guests: 'Гость', notifSent: 'Уведомление отправлено в Telegram/Email',
    payStatus: 'Оплата', unpaid: 'Не оплачен', clearCart: 'Очистить корзину', continueShopping: 'Продолжить покупки',
    quickView: 'Быстрый просмотр', backHome: 'На главную', sortBy: 'Сортировка:', perPage: 'на стр.', showing: 'Показано',
  },
  en: {
    home: 'Home', catalog: 'Catalog', about: 'About', contacts: 'Contacts', faq: 'FAQ',
    cart: 'Cart', favorites: 'Favorites', login: 'Log in', register: 'Sign up', logout: 'Log out',
    profile: 'Profile', admin: 'Admin panel', translator: 'Translator', menu: 'Menu',
    search: 'Search', searchPlaceholder: 'Search by name...', all: 'All', categories: 'Categories',
    price: 'Price', from: 'to', min: 'Min', max: 'Max', rating: 'Rating', inStock: 'In stock only',
    sort: 'Sort', sortPopular: 'Popular', sortPriceAsc: 'Price: low to high', sortPriceDesc: 'Price: high to low',
    sortRating: 'Top rated', sortNew: 'Newest', sortName: 'Name (A-Z)',
    reset: 'Reset', filters: 'Filters', found: 'Found', nothingFound: 'Nothing found',
    nothingFoundText: 'Try another keyword or filter.',
    addToCart: 'Add to cart', outOfStock: 'Sold out', book: 'Book', new: 'New', sale: 'Sale',
    addedCart: 'Added to cart', addedFav: 'Added to favorites', removedFav: 'Removed from favorites',
    description: 'Description', specs: 'Specifications', reviews: 'Reviews', writeReview: 'Write a review',
    yourRating: 'Your rating', yourReview: 'Your review', send: 'Send', loginToReview: 'Log in to leave a review',
    reviewAdded: 'Thanks for your review!', noReviews: 'No reviews yet. Be the first!',
    related: 'Similar items', recentlyViewed: 'Recently viewed', qty: 'Quantity', inStockN: 'In stock',
    pcs: 'pcs', total: 'Total', subtotal: 'Items', delivery: 'Delivery', free: 'Free',
    discount: 'Discount', promo: 'Promo code', applyPromo: 'Apply', promoOk: 'Promo code applied!',
    promoBad: 'Invalid promo code', checkout: 'Checkout', emptyCart: 'Your cart is empty',
    goShopping: 'Go to catalog', name: 'Full name', email: 'Email', phone: 'Phone', password: 'Password',
    confirmPassword: 'Repeat password', address: 'Address', city: 'City', comment: 'Comment',
    deliveryMethod: 'Delivery method', courier: 'Courier', pickup: 'Pickup', payment: 'Payment method',
    payCard: 'Card (Stripe demo)', payPostkg: 'Post.kg (demo)', payCash: 'Cash', placeOrder: 'Place order',
    orderPlaced: 'Order placed!', orderNo: 'Order #', required: 'Required field',
    invalidEmail: 'Invalid email', invalidPhone: 'Invalid phone (+996...)', passMin: 'At least 6 characters',
    passMismatch: 'Passwords do not match', agree: 'I agree to the terms of use', haveAccount: 'Already have an account?',
    noAccount: "Don't have an account?", orWith: 'or continue with', demoAccounts: 'Demo accounts',
    welcome: 'Welcome', wrongCreds: 'Wrong email or password', emailTaken: 'This email is already registered',
    needLogin: 'Please log in first', noAccess: 'Access denied', myOrders: 'My orders',
    myBookings: 'My bookings', myInfo: 'Personal info', save: 'Save', saved: 'Saved',
    status: 'Status', date: 'Date', time: 'Time', people: 'People', bookingDone: 'Booking received!',
    st_new: 'New', st_processing: 'Processing', st_shipped: 'Shipped', st_delivered: 'Delivered',
    st_cancelled: 'Cancelled', st_pending: 'Pending', st_confirmed: 'Confirmed', st_paid: 'Paid',
    dashboard: 'Dashboard', items: 'Items', orders: 'Orders', bookings: 'Bookings', users: 'Users',
    revenue: 'Revenue', addItem: 'Add item', editItem: 'Edit item', delete: 'Delete', edit: 'Edit',
    cancel: 'Cancel', confirmDelete: 'Are you sure you want to delete?', yes: 'Yes', no: 'No', deleted: 'Deleted',
    image: 'Image', uploadImage: 'Upload image', orUrl: 'or image link (URL)', uploading: 'Uploading...',
    stock: 'Stock', oldPrice: 'Old price', category: 'Category', role: 'Role', actions: 'Actions',
    salesWeek: 'Sales for the last 7 days', byCategory: 'Revenue by category', topItems: 'Best sellers',
    orderStatus: 'Order statuses', liveFeed: 'Live events (Realtime)', newOrderRt: 'New order received!',
    newBookingRt: 'New booking received!', liveEmpty: 'Events will appear here in real time',
    errorTitle: 'Something went wrong', errorHint: 'Reload the page. If you opened the file directly, use Live Server or Vercel.',
    retry: 'Try again', notFound: 'Page not found', notFoundText: 'The page does not exist or was moved.',
    translate: 'Translate', translating: 'Translating...', sourceText: 'Text', result: 'Result', swap: 'Swap',
    translatorText: 'Translate between Kyrgyz, Russian and English (MyMemory API).',
    chatTitle: 'Online assistant', chatPlaceholder: 'Type a question...', chatHello: 'Hello! I am your assistant. What are you interested in?',
    botDelivery: 'Delivery in Bishkek within 1 day, free for orders over 5000 KGS. Regions: 2-4 days.',
    botPayment: 'Payment: card (Visa/Mastercard, Stripe), Post.kg or cash.',
    botContacts: 'Contact us: ', botBooking: 'To book, press «Book» on the item page.',
    botHours: 'We work Mon-Sat 9:00-20:00, online orders 24/7.', botFound: 'Here is what I found:',
    botUnknown: "Sorry, I didn't get that. Choose a topic below or contact an operator.",
    botHi: 'Hi! How can I help you?', botThanks: 'Thank you! Write if you have more questions 😊',
    qDelivery: 'Delivery', qPayment: 'Payment', qContacts: 'Contacts', qBooking: 'Booking', qHours: 'Hours',
    newsletter: 'Newsletter', newsletterText: 'Be the first to know about sales and new arrivals.',
    subscribe: 'Subscribe', subscribed: 'You are subscribed!', whyUs: 'Why choose us?', popular: 'Popular',
    newArrivals: 'New arrivals', viewAll: 'View all', testimonials: 'Customer reviews',
    statItems: 'Items & services', statClients: 'Happy clients', statOrders: 'Orders completed', statYears: 'Years of experience',
    workHours: 'Working hours', workHoursVal: 'Mon-Sat: 9:00 – 20:00', followUs: 'Follow us', rights: 'All rights reserved',
    cardNumber: 'Card number', cardExp: 'Expiry (MM/YY)', cardCvc: 'CVC', cardHolder: 'Card holder', pay: 'Pay',
    processing: 'Processing...', paymentOk: 'Payment successful', paymentFail: 'Card declined',
    postkgText: 'Pay via Post.kg (demo). Scan the QR code, then press «I have paid».',
    paid: 'I have paid', testCard: 'Test card: 4242 4242 4242 4242, any expiry and CVC',
    cardInvalid: 'Invalid card details', cookieText: 'This site uses cookies and localStorage for convenience.',
    accept: 'Accept', share: 'Share', linkCopied: 'Link copied', theme: 'Theme', language: 'Language',
    currency: 'Currency', prev: 'Prev', next: 'Next', weak: 'Weak', medium: 'Medium', strong: 'Strong',
    avatar: 'Avatar', joined: 'Joined', noOrders: 'No orders yet', noBookings: 'No bookings yet',
    noFavs: 'Your favorites list is empty', saleEnds: 'Sale ends in:', days: 'd', hours: 'h', mins: 'm', secs: 's',
    details: 'Details', sendMessage: 'Send message', messageSent: 'Message sent!', message: 'Message',
    ourMap: 'Find us', faqTitle: 'Frequently asked questions', loading: 'Loading...', storageFull: 'Storage is full',
    welcomeBack: 'Welcome back', registered: 'You are registered!', loggedOut: 'You logged out',
    githubUser: 'Your GitHub username', googleDemo: 'Your Google account (demo mode)', continue: 'Continue',
    userNotFound: 'User not found', bookingTitle: 'Booking', bookingFor: 'Booking for',
    makeAdmin: 'Make admin', you: 'you', items_count: 'items', reviewsCount: 'reviews', apiStatus: 'API status',
    exchange: 'Rate', ratesLive: 'Exchange rates updated via API', ratesOffline: 'Rates: offline values',
    feat1t: 'Fast delivery', feat1d: 'We deliver across Bishkek within 24 hours.',
    feat2t: 'Quality guarantee', feat2d: 'Every item and service is checked.',
    feat3t: 'Secure payment', feat3d: 'Protected payments via Stripe and Post.kg.',
    feat4t: '24/7 support', feat4d: 'Chatbot and operators are always ready to help.',
    faq1q: 'How do I place an order?', faq1a: 'Add an item to the cart, press «Checkout», fill in your details and choose a payment method.',
    faq2q: 'How much is delivery?', faq2a: 'Delivery in Bishkek is free for orders over 5000 KGS, otherwise 200 KGS.',
    faq3q: 'How can I pay?', faq3a: 'By Visa/Mastercard (Stripe), via Post.kg or in cash.',
    faq4q: 'Can I cancel a booking?', faq4a: 'Yes, in your profile or via an operator 24 hours in advance.',
    faq5q: 'Can I return an item?', faq5a: 'Within 14 days after purchase with a receipt.',
    faq6q: 'Can I order without an account?', faq6a: 'For security, orders and bookings are available to registered users only.',
    addedItem: 'Item added', updatedItem: 'Item updated', nameKg: 'Name (KG)', nameRu: 'Name (RU)', nameEn: 'Name (EN)',
    descKg: 'Description (KG)', descRu: 'Description (RU)', descEn: 'Description (EN)', specsHint: 'Each line: Label: value',
    markNew: '«New» badge', viewSite: 'Back to site', searchTable: 'Search table...', customer: 'Customer',
    sum: 'Amount', open: 'Open', close: 'Close', total_items: 'Total items', avgRating: 'Average rating',
    orderDetails: 'Order details', guests: 'Guest', notifSent: 'Notification sent to Telegram/Email',
    payStatus: 'Payment', unpaid: 'Unpaid', clearCart: 'Clear cart', continueShopping: 'Continue shopping',
    quickView: 'Quick view', backHome: 'Back to home', sortBy: 'Sort by:', perPage: 'per page', showing: 'Showing',
  },
};

/* =========================================================
   3. UTILS — жардамчы функциялар
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = CONFIG.slug + '_';
const LANGS = ['kg', 'ru', 'en'];
const CURRENCIES = { KGS: 'сом', USD: '$', EUR: '€', RUB: '₽' };
const CLIENT_ID = Math.random().toString(36).slice(2);

const store = {
  get(k, d = null) { try { const v = localStorage.getItem(P + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(P + k, JSON.stringify(v)); } catch (e) { toast(t('storageFull'), 'error'); } },
  del(k) { localStorage.removeItem(P + k); },
};
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const debounce = (fn, ms = 300) => { let tm; return (...a) => { clearTimeout(tm); tm = setTimeout(() => fn(...a), ms); }; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const state = {
  lang: store.get('lang', CONFIG.defaultLang || 'kg'),
  theme: store.get('theme', (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'),
  currency: store.get('currency', 'KGS'),
  rates: store.get('rates', { KGS: 1, USD: 1 / 87.4, EUR: 1 / 101.5, RUB: 1 / 1.08 }),
  ratesLive: false,
  user: null,
  promo: store.get('promo', null),
};
if (!LANGS.includes(state.lang)) state.lang = 'kg';

/* t() — котормо, loc() — объекттен тилге жараша текст алуу */
function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.kg[key] || key; }
function loc(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[state.lang] || o.kg || o.ru || o.en || ''; }
function money(kgs) {
  const c = state.currency, v = (Number(kgs) || 0) * (state.rates[c] || 1);
  if (c === 'KGS') return Math.round(v).toLocaleString('ru-RU') + ' сом';
  if (c === 'RUB') return Math.round(v).toLocaleString('ru-RU') + ' ₽';
  return CURRENCIES[c] + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(ts, withTime = false) {
  const d = new Date(ts); const l = { kg: 'ky-KG', ru: 'ru-RU', en: 'en-US' }[state.lang];
  try { return d.toLocaleDateString(l, { day: '2-digit', month: 'short', year: 'numeric', ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}) }); }
  catch (e) { return d.toISOString().slice(0, 10); }
}
function catName(key) { const c = CONFIG.categories.find(c => c.key === key); return c ? loc(c.name) : key; }
function catIcon(key) { const c = CONFIG.categories.find(c => c.key === key); return c ? c.icon : '📦'; }
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = v => /^\+?\d[\d\s\-()]{8,16}$/.test(v);

/* =========================================================
   4. CRYPTO + JWT — сырсөз хэш жана токен
   ========================================================= */
const enc = new TextEncoder();
const hasSubtle = !!(window.crypto && crypto.subtle);
const b64urlBytes = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlStr = s => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); };
function simpleHash(str) { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0'); }
async function sha256(str) {
  if (!hasSubtle) return simpleHash(str);
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
const JWT = {
  secret: CONFIG.slug + '::jwt-secret-2026',
  async hmac(data) {
    if (!hasSubtle) return simpleHash(data + this.secret);
    const key = await crypto.subtle.importKey('raw', enc.encode(this.secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return b64urlBytes(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  },
  async sign(payload, days = 7) {
    const now = Math.floor(Date.now() / 1000);
    const h = b64urlStr(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const p = b64urlStr(JSON.stringify({ ...payload, iat: now, exp: now + days * 86400 }));
    return `${h}.${p}.${await this.hmac(h + '.' + p)}`;
  },
  async verify(token) {
    try {
      const [h, p, s] = token.split('.');
      if (!s || await this.hmac(h + '.' + p) !== s) return null;
      const payload = JSON.parse(fromB64url(p));
      return payload.exp * 1000 > Date.now() ? payload : null;
    } catch (e) { return null; }
  },
  decode(token) { try { return JSON.parse(fromB64url(token.split('.')[1])); } catch (e) { return null; } },
};

/* =========================================================
   5. API + DB — маалыматтар API аркылуу жүктөлөт
   ========================================================= */
const API = {
  base: CONFIG.API_URL || 'api/items.json',
  async fetchItems() {
    const res = await fetch(this.base, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error: ' + res.status);
    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || []);
  },
  async rates() {
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/KGS');
      const j = await r.json();
      if (j && j.rates) {
        state.rates = { KGS: 1, USD: j.rates.USD, EUR: j.rates.EUR, RUB: j.rates.RUB };
        state.ratesLive = true; store.set('rates', state.rates); return true;
      }
    } catch (e) { /* офлайн маанилер калат */ }
    return false;
  },
  async translate(text, from, to) {
    const map = { kg: 'ky', ru: 'ru', en: 'en' };
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${map[from]}|${map[to]}`;
    const r = await fetch(url); if (!r.ok) throw new Error('Translate API ' + r.status);
    const j = await r.json(); return j.responseData?.translatedText || '';
  },
  async github(user) {
    const r = await fetch('https://api.github.com/users/' + encodeURIComponent(user));
    if (!r.ok) throw new Error(t('userNotFound')); return r.json();
  },
};

const DB = {
  items: () => store.get('items', []),
  saveItems: v => store.set('items', v),
  item: id => DB.items().find(i => String(i.id) === String(id)),
  users: () => store.get('users', []),
  saveUsers: v => store.set('users', v),
  orders: () => store.get('orders', []),
  saveOrders: v => store.set('orders', v),
  bookings: () => store.get('bookings', []),
  saveBookings: v => store.set('bookings', v),
  reviews: () => store.get('reviews', []),
  saveReviews: v => store.set('reviews', v),
  cart: () => store.get('cart', []),
  saveCart: v => { store.set('cart', v); updateBadges(); },
  favs: () => store.get('favs', []),
  saveFavs: v => { store.set('favs', v); updateBadges(); },
};

async function loadData() {
  const ver = store.get('dataVersion');
  if (ver === CONFIG.dataVersion && DB.items().length) return;
  const items = await API.fetchItems();
  const reviews = [];
  items.forEach(it => { (it.reviews || []).forEach((r, i) => reviews.push({ id: it.id + '-r' + i, itemId: it.id, ...r })); delete it.reviews; });
  DB.saveItems(items);
  DB.saveReviews(reviews);
  store.set('dataVersion', CONFIG.dataVersion);
  seedDemoOrders(items);
}

async function seedUsers() {
  if (DB.users().length) return;
  DB.saveUsers([
    { id: 'u-admin', name: 'Admin', email: 'admin@site.kg', phone: '+996700000000', role: 'admin', pass: await sha256('admin123'), createdAt: Date.now() - 90 * 864e5, provider: 'email' },
    { id: 'u-user', name: 'Айбек Асанов', email: 'user@site.kg', phone: '+996555123456', role: 'user', pass: await sha256('user123'), createdAt: Date.now() - 30 * 864e5, provider: 'email' },
  ]);
}

function seedDemoOrders(items) {
  if (store.get('seeded')) return;
  const names = ['Айбек Асанов', 'Нургүл Токтогулова', 'Тимур Иманов', 'Айпери Жумабаева', 'Бекзат Осмонов', 'Алина Ким'];
  const st = ['delivered', 'delivered', 'shipped', 'processing', 'new', 'cancelled'];
  const orders = [];
  let seed = 7; const rnd = n => { seed = (seed * 9301 + 49297) % 233280; return Math.floor(seed / 233280 * n); };
  for (let i = 0; i < 14; i++) {
    const lines = []; const n = 1 + rnd(3);
    for (let j = 0; j < n; j++) { const it = items[rnd(items.length)]; if (!lines.find(l => l.id === it.id)) lines.push({ id: it.id, name: it.name, price: it.price, qty: 1 + rnd(2), img: it.img }); }
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
    orders.push({ id: 'D' + (1000 + i), userId: 'u-user', customer: names[rnd(names.length)], phone: '+996555' + (100000 + rnd(899999)), city: 'Бишкек', address: 'Чүй пр. ' + (10 + i), items: lines, total, delivery: 0, discount: 0, payment: 'card', paid: true, status: st[rnd(st.length)], createdAt: Date.now() - rnd(7) * 864e5 - rnd(864e5) });
  }
  DB.saveOrders(orders);
  store.set('seeded', true);
}

/* =========================================================
   6. AUTH — JWT аутентификация, OAuth, ролдор
   ========================================================= */
const Auth = {
  async restore() {
    const token = store.get('token');
    if (!token) { state.user = null; return; }
    const payload = await JWT.verify(token);
    const u = payload && DB.users().find(u => u.id === payload.sub);
    state.user = u || null;
    if (!u) store.del('token');
  },
  async issue(u) { store.set('token', await JWT.sign({ sub: u.id, email: u.email, role: u.role, name: u.name })); state.user = u; renderHeader(); },
  async login(email, pass) {
    const u = DB.users().find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!u || !u.pass || u.pass !== await sha256(pass)) throw new Error(t('wrongCreds'));
    await this.issue(u); return u;
  },
  async register({ name, email, phone, pass }) {
    const users = DB.users();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error(t('emailTaken'));
    const u = { id: 'u-' + uid(), name, email: email.trim(), phone, role: 'user', pass: await sha256(pass), createdAt: Date.now(), provider: 'email' };
    users.push(u); DB.saveUsers(users); await this.issue(u); emit('user', { name }); return u;
  },
  async oauth({ email, name, avatar, provider }) {
    const users = DB.users();
    let u = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!u) { u = { id: 'u-' + uid(), name, email, phone: '', role: 'user', avatar, provider, createdAt: Date.now() }; users.push(u); DB.saveUsers(users); emit('user', { name }); }
    await this.issue(u); toast(`${t('welcome')}, ${u.name}!`, 'success');
    const next = new URLSearchParams(location.hash.split('?')[1] || '').get('next');
    location.hash = next || '#/profile';
  },
  logout() { store.del('token'); state.user = null; renderHeader(); toast(t('loggedOut'), 'info'); location.hash = '#/'; },
  isAdmin() { return state.user?.role === 'admin'; },
};

function loadScript(src) {
  return new Promise((res, rej) => { if ($(`script[src="${src}"]`)) return res(); const s = document.createElement('script'); s.src = src; s.async = true; s.onload = res; s.onerror = () => rej(new Error('Script load failed: ' + src)); document.head.appendChild(s); });
}

/* Google OAuth: CONFIG.GOOGLE_CLIENT_ID болсо чыныгы Google, болбосо демо режим */
async function googleLogin(container) {
  if (CONFIG.GOOGLE_CLIENT_ID && container) {
    try {
      await loadScript('https://accounts.google.com/gsi/client');
      google.accounts.id.initialize({ client_id: CONFIG.GOOGLE_CLIENT_ID, callback: r => { const p = JWT.decode(r.credential); if (p) Auth.oauth({ email: p.email, name: p.name, avatar: p.picture, provider: 'google' }); } });
      google.accounts.id.prompt();
      return;
    } catch (e) { console.warn(e); }
  }
  Modal({
    title: 'Google', body: `<p class="muted">${t('googleDemo')}</p>
      <label class="field"><span>${t('name')}</span><input id="gName" value="Google User"></label>
      <label class="field"><span>${t('email')}</span><input id="gEmail" type="email" placeholder="you@gmail.com"></label>`,
    actions: [{ label: t('continue'), cls: 'btn-primary', onClick: async (close) => {
      const email = $('#gEmail').value.trim(), name = $('#gName').value.trim() || 'Google User';
      if (!isEmail(email)) return toast(t('invalidEmail'), 'error');
      close(); await Auth.oauth({ email, name, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`, provider: 'google' });
    } }],
  });
}
/* GitHub OAuth (демо): GitHub API'ден чыныгы профилди алат */
function githubLogin() {
  Modal({
    title: 'GitHub', body: `<label class="field"><span>${t('githubUser')}</span><input id="ghUser" placeholder="octocat"></label><p class="muted small">api.github.com/users/…</p>`,
    actions: [{ label: t('continue'), cls: 'btn-primary', onClick: async (close, btn) => {
      const login = $('#ghUser').value.trim(); if (!login) return;
      btn.disabled = true; btn.textContent = t('loading');
      try { const j = await API.github(login); close(); await Auth.oauth({ email: j.email || `${j.login}@users.github.com`, name: j.name || j.login, avatar: j.avatar_url, provider: 'github' }); }
      catch (e) { toast(e.message, 'error'); btn.disabled = false; btn.textContent = t('continue'); }
    } }],
  });
}

/* =========================================================
   7. REALTIME + NOTIFICATIONS — BroadcastChannel, Firebase, Telegram, Email
   ========================================================= */
const bc = ('BroadcastChannel' in window) ? new BroadcastChannel(P + 'realtime') : null;
const liveFeed = store.get('liveFeed', []);
function emit(type, data) {
  const ev = { type, data, at: Date.now(), from: CLIENT_ID };
  pushLive(ev);
  if (bc) bc.postMessage(ev);
  if (CONFIG.FIREBASE_DB_URL) fetch(`${CONFIG.FIREBASE_DB_URL.replace(/\/$/, '')}/${CONFIG.slug}/events.json`, { method: 'POST', body: JSON.stringify(ev) }).catch(() => {});
}
function pushLive(ev) { liveFeed.unshift(ev); liveFeed.splice(30); store.set('liveFeed', liveFeed); }
function onRealtime(ev) {
  if (!ev || ev.from === CLIENT_ID) return;
  if (!liveFeed.find(e => e.at === ev.at && e.type === ev.type)) pushLive(ev);
  updateBadges();
  if (Auth.isAdmin()) {
    if (ev.type === 'order') toast(`🔔 ${t('newOrderRt')} ${ev.data.id} — ${money(ev.data.total)}`, 'success');
    if (ev.type === 'booking') toast(`🔔 ${t('newBookingRt')} ${ev.data.name || ''}`, 'success');
    if (location.hash.startsWith('#/admin')) router();
  } else if (ev.type === 'items' && /#\/(catalog|item|$)/.test(location.hash || '#/')) { router(); }
}
if (bc) bc.onmessage = e => onRealtime(e.data);
window.addEventListener('storage', e => { if (e.key === P + 'cart' || e.key === P + 'favs') updateBadges(); });
function initFirebaseRealtime() {
  if (!CONFIG.FIREBASE_DB_URL || !window.EventSource) return;
  let first = true;
  const es = new EventSource(`${CONFIG.FIREBASE_DB_URL.replace(/\/$/, '')}/${CONFIG.slug}/events.json`);
  es.addEventListener('put', e => { if (first) { first = false; return; } try { const m = JSON.parse(e.data); if (m.data && m.data.type) onRealtime(m.data); } catch (_) {} });
}

async function notify(subject, text) {
  const tasks = [];
  if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
    tasks.push(fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CONFIG.TELEGRAM_CHAT_ID, text: `<b>${subject}</b>\n${text}`, parse_mode: 'HTML' }),
    }));
  }
  if (CONFIG.ORDER_EMAIL) {
    tasks.push(fetch(`https://formsubmit.co/ajax/${CONFIG.ORDER_EMAIL}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: `${CONFIG.siteName}: ${subject}`, message: text, _template: 'table' }),
    }));
  }
  if (!tasks.length) { console.info('[notify demo]', subject, '\n' + text); return false; }
  const res = await Promise.allSettled(tasks);
  return res.some(r => r.status === 'fulfilled');
}

/* Cloudinary жүктөө, болбосо сүрөт кысылып base64 болуп сакталат */
async function uploadImage(file) {
  if (!file || !file.type.startsWith('image/')) throw new Error('Image only');
  if (CONFIG.CLOUDINARY_CLOUD && CONFIG.CLOUDINARY_PRESET) {
    const fd = new FormData(); fd.append('file', file); fd.append('upload_preset', CONFIG.CLOUDINARY_PRESET);
    const r = await fetch(`https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_CLOUD}/image/upload`, { method: 'POST', body: fd });
    const j = await r.json(); if (j.secure_url) return j.secure_url; throw new Error(j.error?.message || 'Cloudinary error');
  }
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => { const img = new Image(); img.onload = () => { const s = Math.min(1, 800 / img.width); const c = document.createElement('canvas'); c.width = img.width * s; c.height = img.height * s; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.75)); }; img.onerror = rej; img.src = fr.result; };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

/* =========================================================
   8. CART / FAVS / REVIEWS логикасы
   ========================================================= */
const Cart = {
  add(id, qty = 1) {
    const it = DB.item(id); if (!it || it.stock <= 0) return;
    const cart = DB.cart(); const line = cart.find(l => l.id === it.id);
    if (line) line.qty = Math.min(it.stock, line.qty + qty); else cart.push({ id: it.id, qty: Math.min(it.stock, qty) });
    DB.saveCart(cart); toast(`🛒 ${loc(it.name)} — ${t('addedCart')}`, 'success'); bump('#cartBadge');
  },
  set(id, qty) { const it = DB.item(id); let cart = DB.cart(); const l = cart.find(l => l.id === id); if (!l) return; l.qty = clamp(qty, 1, it ? it.stock : 99); DB.saveCart(cart); },
  remove(id) { DB.saveCart(DB.cart().filter(l => l.id !== id)); },
  clear() { DB.saveCart([]); },
  lines() { return DB.cart().map(l => ({ ...l, item: DB.item(l.id) })).filter(l => l.item); },
  count() { return DB.cart().reduce((s, l) => s + l.qty, 0); },
  totals() {
    const subtotal = this.lines().reduce((s, l) => s + l.item.price * l.qty, 0);
    const discount = state.promo && CONFIG.promoCodes[state.promo] ? Math.round(subtotal * CONFIG.promoCodes[state.promo] / 100) : 0;
    const delivery = subtotal - discount >= 5000 || subtotal === 0 ? 0 : 200;
    return { subtotal, discount, delivery, total: subtotal - discount + delivery };
  },
};
const Fav = {
  has: id => DB.favs().includes(id),
  toggle(id) { let f = DB.favs(); const it = DB.item(id); if (f.includes(id)) { f = f.filter(x => x !== id); toast(t('removedFav'), 'info'); } else { f.push(id); toast(`♥ ${it ? loc(it.name) : ''} — ${t('addedFav')}`, 'success'); bump('#favBadge'); } DB.saveFavs(f); $$(`[data-action="toggleFav"][data-id="${id}"]`).forEach(b => { b.classList.toggle('on', f.includes(id)); b.innerHTML = f.includes(id) ? '♥' : '♡'; }); },
};
function reviewsFor(id) { return DB.reviews().filter(r => r.itemId === id).sort((a, b) => b.date - a.date); }
function itemRating(it) { const rs = reviewsFor(it.id); if (!rs.length) return it.rating || 0; return Math.round(rs.reduce((s, r) => s + r.rating, 0) / rs.length * 10) / 10; }
function soldCount(id) { return DB.orders().filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.items.filter(l => l.id === id).reduce((a, l) => a + l.qty, 0), 0); }

/* =========================================================
   9. UI КОМПОНЕНТТЕР
   ========================================================= */

/* [1] Toast — кабарлар */
function toast(msg, type = 'info', ms = 3200) {
  let box = $('#toasts'); if (!box) { box = document.createElement('div'); box.id = 'toasts'; document.body.appendChild(box); }
  const el = document.createElement('div'); el.className = `toast toast-${type}`;
  el.innerHTML = `<span>${{ success: '✅', error: '⛔', info: 'ℹ️' }[type] || ''}</span><p>${esc(msg)}</p><button aria-label="close">×</button>`;
  box.appendChild(el); requestAnimationFrame(() => el.classList.add('show'));
  const close = () => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); };
  el.querySelector('button').onclick = close; setTimeout(close, ms);
}
function bump(sel) { const b = $(sel); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); } }

/* [2] Modal — терезе */
function Modal({ title = '', body = '', actions = [], wide = false, onOpen }) {
  const wrap = document.createElement('div'); wrap.className = 'modal-wrap';
  wrap.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true"><div class="modal-head"><h3>${title}</h3><button class="icon-btn" data-close aria-label="close">✕</button></div><div class="modal-body">${body}</div>${actions.length ? `<div class="modal-foot">${actions.map((a, i) => `<button class="btn ${a.cls || 'btn-ghost'}" data-i="${i}">${a.label}</button>`).join('')}</div>` : ''}</div>`;
  document.body.appendChild(wrap); document.body.classList.add('no-scroll');
  requestAnimationFrame(() => wrap.classList.add('show'));
  const close = () => { wrap.classList.remove('show'); document.body.classList.remove('no-scroll'); setTimeout(() => wrap.remove(), 250); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  wrap.addEventListener('click', e => { if (e.target === wrap || e.target.closest('[data-close]')) close(); });
  $$('.modal-foot button', wrap).forEach(b => b.onclick = () => actions[+b.dataset.i].onClick(close, b));
  onOpen && onOpen(wrap, close);
  return close;
}
function confirmBox(text) {
  return new Promise(res => Modal({ title: '⚠️ ' + t('confirmDelete'), body: `<p>${esc(text)}</p>`, actions: [{ label: t('no'), onClick: c => { c(); res(false); } }, { label: t('yes'), cls: 'btn-danger', onClick: c => { c(); res(true); } }] }));
}

/* [3] Stars — рейтинг жылдыздары */
function Stars(v, size = '') { const full = Math.round(v || 0); return `<span class="stars ${size}" title="${v}">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= full ? 'on' : ''}">★</i>`).join('')}<em>${(v || 0).toFixed ? (+v).toFixed(1) : v}</em></span>`; }
/* [4] StarInput — баа берүү */
function StarInput(name = 'rating', val = 5) { return `<div class="star-input" data-name="${name}">${[5, 4, 3, 2, 1].map(i => `<input type="radio" id="${name}${i}" name="${name}" value="${i}" ${i === val ? 'checked' : ''}><label for="${name}${i}">★</label>`).join('')}</div>`; }

/* [5] Img — сүрөт (ката болсо запастагы сүрөт) */
function Img(src, alt = '', seed = 'x', cls = '') { return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${encodeURIComponent(CONFIG.slug + seed)}/640/480'">`; }

/* [6] Skeleton — жүктөлүү учурундагы карточкалар */
function SkeletonCard() { return `<div class="card skeleton"><div class="sk sk-img"></div><div class="card-body"><div class="sk sk-line w40"></div><div class="sk sk-line"></div><div class="sk sk-line w60"></div><div class="sk sk-btn"></div></div></div>`; }
const SkeletonGrid = (n = 8) => Array.from({ length: n }, SkeletonCard).join('');
function SkeletonDetail() { return `<section class="container page"><div class="detail"><div class="sk sk-hero"></div><div><div class="sk sk-line w40"></div><div class="sk sk-title"></div><div class="sk sk-line"></div><div class="sk sk-line"></div><div class="sk sk-line w60"></div><div class="sk sk-btn"></div></div></div></section>`; }

/* [7] Badge */
const Badge = (s) => `<span class="status st-${s}">${t('st_' + s)}</span>`;

/* [8] ProductCard — товар карточкасы */
function ProductCard(it) {
  const fav = Fav.has(it.id); const r = itemRating(it); const rc = reviewsFor(it.id).length;
  return `<article class="card" data-id="${it.id}">
    <a href="#/item/${it.id}" class="card-img">${Img(it.img, loc(it.name), it.id)}
      <span class="badges">${it.oldPrice ? `<span class="badge sale">-${Math.round(100 - it.price / it.oldPrice * 100)}%</span>` : ''}${it.isNew ? `<span class="badge new">${t('new')}</span>` : ''}</span></a>
    <button class="fav-btn ${fav ? 'on' : ''}" data-action="toggleFav" data-id="${it.id}" aria-label="favorite">${fav ? '♥' : '♡'}</button>
    <button class="qv-btn" data-action="quickView" data-id="${it.id}" title="${t('quickView')}">👁</button>
    <div class="card-body">
      <span class="card-cat">${catIcon(it.category)} ${esc(catName(it.category))}</span>
      <a href="#/item/${it.id}" class="card-title">${esc(loc(it.name))}</a>
      <div class="card-rating">${Stars(r)}<small>(${rc})</small></div>
      <div class="card-price"><b>${money(it.price)}</b>${it.oldPrice ? `<s>${money(it.oldPrice)}</s>` : ''}${CONFIG.priceUnit ? `<small>${esc(loc(CONFIG.priceUnit))}</small>` : ''}</div>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" data-action="addCart" data-id="${it.id}" ${it.stock > 0 ? '' : 'disabled'}>🛒 ${it.stock > 0 ? t('addToCart') : t('outOfStock')}</button>
        ${CONFIG.booking ? `<a class="btn btn-ghost btn-sm" href="#/booking/${it.id}">📅 ${t('book')}</a>` : ''}
      </div>
    </div></article>`;
}

/* [9] Pagination — барактоо */
function Pagination(page, pages) {
  if (pages <= 1) return '';
  const nums = []; for (let i = 1; i <= pages; i++) { if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i); else if (nums[nums.length - 1] !== '…') nums.push('…'); }
  return `<nav class="pager"><button class="pg" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}>‹ ${t('prev')}</button>${nums.map(n => n === '…' ? '<span class="pg-gap">…</span>' : `<button class="pg ${n === page ? 'active' : ''}" data-page="${n}">${n}</button>`).join('')}<button class="pg" data-page="${page + 1}" ${page >= pages ? 'disabled' : ''}>${t('next')} ›</button></nav>`;
}

/* [10] Breadcrumbs */
function Breadcrumbs(list) { return `<nav class="crumbs"><a href="#/">🏠 ${t('home')}</a>${list.map(([l, h]) => h ? ` <span>/</span> <a href="${h}">${esc(l)}</a>` : ` <span>/</span> <b>${esc(l)}</b>`).join('')}</nav>`; }

/* [11] EmptyState */
function EmptyState(icon, title, text = '', btn = '') { return `<div class="empty"><div class="empty-ico">${icon}</div><h3>${title}</h3>${text ? `<p class="muted">${text}</p>` : ''}${btn}</div>`; }

/* [12] SectionTitle */
const SectionTitle = (title, link) => `<div class="sec-title"><h2>${title}</h2>${link ? `<a href="${link}" class="link-more">${t('viewAll')} →</a>` : ''}</div>`;

/* [13] Header — шапка */
function renderHeader() {
  const u = state.user;
  $('#header').innerHTML = `
  <div class="topbar"><div class="container topbar-in">
    <span>📞 <a href="tel:${CONFIG.contacts.phone.replace(/\s/g, '')}">${CONFIG.contacts.phone}</a></span>
    <span class="hide-sm">🕘 ${t('workHoursVal')}</span>
    <span class="rate-chip" id="rateChip">💱 1$ = ${(1 / state.rates.USD).toFixed(2)} сом</span>
  </div></div>
  <div class="container nav">
    <button class="icon-btn burger" data-action="burger" aria-label="${t('menu')}"><span></span><span></span><span></span></button>
    <a href="#/" class="logo"><span class="logo-ico">${CONFIG.logo}</span><span>${esc(CONFIG.siteName)}<small>${esc(loc(CONFIG.tagline))}</small></span></a>
    <div class="search-box" id="headerSearch">
      <input type="search" id="hsInput" placeholder="${t('searchPlaceholder')}" autocomplete="off">
      <button class="search-go" id="hsGo" aria-label="${t('search')}">🔍</button>
      <div class="suggest" id="hsSuggest"></div>
    </div>
    <div class="nav-tools">
      <select id="langSel" class="mini-sel" aria-label="${t('language')}">${LANGS.map(l => `<option value="${l}" ${l === state.lang ? 'selected' : ''}>${l.toUpperCase()}</option>`).join('')}</select>
      <select id="curSel" class="mini-sel hide-sm" aria-label="${t('currency')}">${Object.keys(CURRENCIES).map(c => `<option ${c === state.currency ? 'selected' : ''}>${c}</option>`).join('')}</select>
      <button class="icon-btn" data-action="theme" title="${t('theme')}">${state.theme === 'dark' ? '☀️' : '🌙'}</button>
      <a href="#/favorites" class="icon-btn fav-link" title="${t('favorites')}">♥<b class="cnt" id="favBadge"></b></a>
      <a href="#/cart" class="icon-btn" title="${t('cart')}">🛒<b class="cnt" id="cartBadge"></b></a>
      ${u ? `<div class="user-menu"><button class="avatar-btn" data-action="userMenu">${u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : `<span>${esc(u.name[0] || '?')}</span>`}</button>
        <div class="dropdown" id="userDrop"><b>${esc(u.name)}</b><small>${esc(u.email)} · ${u.role}</small>
        <a href="#/profile">👤 ${t('profile')}</a><a href="#/profile?tab=orders">📦 ${t('myOrders')}</a>
        ${u.role === 'admin' ? `<a href="#/admin">🛠 ${t('admin')}</a>` : ''}<button data-action="logout">🚪 ${t('logout')}</button></div></div>`
      : `<a href="#/login" class="btn btn-primary btn-sm login-btn">👤<span> ${t('login')}</span></a>`}
    </div>
  </div>
  <nav class="mainnav" id="mainnav"><div class="container mainnav-in">
    <div class="mob-head"><b>${t('menu')}</b><button class="icon-btn" data-action="burger">✕</button></div>
    ${NavLinks()}
    <div class="mob-only mob-extra"><a href="#/favorites" class="btn btn-ghost btn-sm">♥ ${t('favorites')}</a>
      <select id="curSel2" class="mini-sel">${Object.keys(CURRENCIES).map(c => `<option ${c === state.currency ? 'selected' : ''}>${c}</option>`).join('')}</select>
      ${u ? `<button class="btn btn-ghost btn-sm" data-action="logout">🚪 ${t('logout')}</button>` : `<a class="btn btn-primary btn-sm" href="#/register">${t('register')}</a>`}
    </div>
  </div></nav><div class="nav-overlay" data-action="burger"></div>`;
  updateBadges(); bindHeader(); updateActiveNav();
}
/* [14] NavLinks — меню шилтемелери */
function NavLinks() {
  const links = [['#/', '🏠', 'home'], ['#/catalog', '🗂', 'catalog'], ['#/about', 'ℹ️', 'about'], ['#/faq', '❓', 'faq'], ['#/contacts', '📍', 'contacts'], ['#/translate', '🌐', 'translator']];
  if (Auth.isAdmin()) links.push(['#/admin', '🛠', 'admin']);
  return links.map(([h, i, k]) => `<a href="${h}" class="nav-link" data-path="${h.slice(1)}">${i} ${t(k)}</a>`).join('') +
    `<div class="nav-cats">${CONFIG.categories.map(c => `<a href="#/catalog?cat=${c.key}" class="nav-cat">${c.icon} ${esc(loc(c.name))}</a>`).join('')}</div>`;
}
function updateActiveNav() { const p = (location.hash.slice(1) || '/').split('?')[0]; $$('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.path === p || (a.dataset.path !== '/' && p.startsWith(a.dataset.path)))); }
function updateBadges() {
  const c = Cart.count(), f = DB.favs().length;
  const cb = $('#cartBadge'), fb = $('#favBadge');
  if (cb) { cb.textContent = c || ''; cb.hidden = !c; }
  if (fb) { fb.textContent = f || ''; fb.hidden = !f; }
}
/* [15] HeaderSearch — жандуу издөө сунуштары */
function bindHeader() {
  const inp = $('#hsInput'), sug = $('#hsSuggest');
  const go = () => { const q = inp.value.trim(); sug.classList.remove('show'); location.hash = '#/catalog' + (q ? '?q=' + encodeURIComponent(q) : ''); };
  inp.addEventListener('input', debounce(() => {
    const q = inp.value.trim().toLowerCase(); if (q.length < 2) { sug.classList.remove('show'); return; }
    const res = searchItems(DB.items(), q).slice(0, 6);
    sug.innerHTML = res.length ? res.map(it => `<a href="#/item/${it.id}">${Img(it.img, '', it.id)}<span>${esc(loc(it.name))}<small>${money(it.price)}</small></span></a>`).join('') + `<button class="sug-all">${t('viewAll')} →</button>` : `<p class="muted">${t('nothingFound')}</p>`;
    sug.classList.add('show'); const all = $('.sug-all', sug); if (all) all.onclick = go;
  }, 200));
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); if (e.key === 'Escape') sug.classList.remove('show'); });
  $('#hsGo').onclick = go;
  sug.addEventListener('click', e => { if (e.target.closest('a')) { sug.classList.remove('show'); inp.value = ''; } });
  document.addEventListener('click', e => { if (!e.target.closest('#headerSearch')) sug.classList.remove('show'); if (!e.target.closest('.user-menu')) $('#userDrop')?.classList.remove('show'); });
  $('#langSel').onchange = e => setLang(e.target.value);
  [$('#curSel'), $('#curSel2')].forEach(s => s && (s.onchange = e => { state.currency = e.target.value; store.set('currency', state.currency); renderHeader(); router(); }));
}
function searchItems(items, q) {
  q = q.toLowerCase().trim(); if (!q) return items;
  return items.filter(it => [it.name?.kg, it.name?.ru, it.name?.en, ...(it.tags || [])].some(s => String(s || '').toLowerCase().includes(q)));
}
function setLang(l) { state.lang = l; store.set('lang', l); document.documentElement.lang = l === 'kg' ? 'ky' : l; renderHeader(); renderFooter(); renderChatbot(true); router(); }
function setTheme(th) { state.theme = th; store.set('theme', th); document.documentElement.dataset.theme = th; renderHeader(); if (window.__charts) router(); }

/* [16] Burger menu */
function toggleBurger(force) { const open = force ?? !document.body.classList.contains('menu-open'); document.body.classList.toggle('menu-open', open); }
const closeBurger = () => toggleBurger(false);

/* [17] Footer */
function renderFooter() {
  const c = CONFIG.contacts;
  $('#footer').innerHTML = `<div class="container footer-grid">
    <div><a href="#/" class="logo"><span class="logo-ico">${CONFIG.logo}</span><span>${esc(CONFIG.siteName)}</span></a><p class="muted">${esc(loc(CONFIG.about.short))}</p>
      <div class="socials"><a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener" title="WhatsApp">🟢 WhatsApp</a><a href="https://instagram.com/${c.instagram}" target="_blank" rel="noopener" title="Instagram">📸 Instagram</a><a href="https://t.me/${c.telegram}" target="_blank" rel="noopener">✈️ Telegram</a></div></div>
    <div><h4>${t('catalog')}</h4>${CONFIG.categories.map(k => `<a href="#/catalog?cat=${k.key}">${esc(loc(k.name))}</a>`).join('')}</div>
    <div><h4>${esc(CONFIG.siteName)}</h4><a href="#/about">${t('about')}</a><a href="#/faq">${t('faq')}</a><a href="#/contacts">${t('contacts')}</a><a href="#/translate">${t('translator')}</a><a href="#/favorites">${t('favorites')}</a></div>
    <div><h4>${t('contacts')}</h4><p>📍 ${esc(loc(c.address))}</p><p>📞 ${c.phone}</p><p>✉️ ${c.email}</p><p>🕘 ${t('workHoursVal')}</p></div>
  </div><div class="footer-bottom"><div class="container">© ${new Date().getFullYear()} ${esc(CONFIG.siteName)}. ${t('rights')}. <span class="muted">API · JWT · i18n · Realtime</span></div></div>`;
}

/* [18] ChatBot — онлайн жардамчы */
const chatHistory = [];
function renderChatbot(refresh = false) {
  let w = $('#chatbot');
  if (!w) { w = document.createElement('div'); w.id = 'chatbot'; document.body.appendChild(w); }
  else if (!refresh) return;
  const open = w.classList.contains('open');
  w.innerHTML = `<button class="chat-fab" data-action="chat" aria-label="chat">💬</button>
   <div class="chat-box"><div class="chat-head"><span>🤖 ${t('chatTitle')}</span><button class="icon-btn" data-action="chat">✕</button></div>
   <div class="chat-msgs" id="chatMsgs"></div>
   <div class="chat-quick">${['qDelivery', 'qPayment', 'qBooking', 'qContacts', 'qHours'].map(k => `<button data-q="${k}">${t(k)}</button>`).join('')}</div>
   <form class="chat-form" id="chatForm"><input id="chatIn" placeholder="${t('chatPlaceholder')}" autocomplete="off"><button class="btn btn-primary btn-sm">➤</button></form></div>`;
  if (open) w.classList.add('open');
  if (chatHistory.length <= 1) chatHistory.splice(0, 1, { me: false, html: esc(t('chatHello')) });
  drawChat();
  $('#chatForm').onsubmit = e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; chatSend(v); };
  $$('.chat-quick button', w).forEach(b => b.onclick = () => chatSend(t(b.dataset.q), b.dataset.q));
}
function drawChat() { const m = $('#chatMsgs'); if (!m) return; m.innerHTML = chatHistory.map(c => `<div class="msg ${c.me ? 'me' : ''}">${c.html}</div>`).join(''); m.scrollTop = m.scrollHeight; }
async function chatSend(text, intent) {
  chatHistory.push({ me: true, html: esc(text) }); drawChat();
  chatHistory.push({ me: false, html: '<span class="typing"><i></i><i></i><i></i></span>' }); drawChat();
  await sleep(600); chatHistory.pop();
  chatHistory.push({ me: false, html: botAnswer(text.toLowerCase(), intent) }); drawChat();
}
function botAnswer(q, intent) {
  const has = (...w) => w.some(x => q.includes(x));
  const c = CONFIG.contacts;
  if (intent === 'qDelivery' || has('жеткир', 'доставк', 'deliver', 'курьер')) return t('botDelivery');
  if (intent === 'qPayment' || has('төлө', 'оплат', 'pay', 'карт', 'card', 'stripe')) return t('botPayment');
  if (intent === 'qBooking' || has('брон', 'book', 'резерв')) return t('botBooking');
  if (intent === 'qHours' || has('убакыт', 'саат', 'час', 'время', 'hour', 'open')) return t('botHours');
  if (intent === 'qContacts' || has('байланыш', 'контакт', 'contact', 'телефон', 'номер', 'phone', 'дарек', 'адрес', 'address')) return `${t('botContacts')}<br>📞 <a href="tel:${c.phone}">${c.phone}</a><br>🟢 <a href="https://wa.me/${c.whatsapp}" target="_blank">WhatsApp</a><br>📍 ${esc(loc(c.address))}`;
  if (has('салам', 'привет', 'здравств', 'hello', 'hi ', 'hey')) return t('botHi');
  if (has('рахмат', 'спасибо', 'thank')) return t('botThanks');
  const words = q.split(/\s+/).filter(w => w.length > 2);
  const found = DB.items().filter(it => words.some(w => searchItems([it], w).length)).slice(0, 4);
  if (found.length) return `${t('botFound')}<br>${found.map(it => `• <a href="#/item/${it.id}">${esc(loc(it.name))}</a> — <b>${money(it.price)}</b>`).join('<br>')}`;
  return t('botUnknown');
}

/* [19] CookieBanner */
function CookieBanner() {
  if (store.get('cookieOk')) return;
  const d = document.createElement('div'); d.className = 'cookie'; d.innerHTML = `<p>🍪 ${t('cookieText')}</p><button class="btn btn-primary btn-sm">${t('accept')}</button>`;
  document.body.appendChild(d); d.querySelector('button').onclick = () => { store.set('cookieOk', true); d.remove(); };
}
/* [20] BackToTop */
function BackToTop() {
  const b = document.createElement('button'); b.className = 'to-top'; b.textContent = '↑'; b.setAttribute('aria-label', 'top'); document.body.appendChild(b);
  b.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => { b.classList.toggle('show', scrollY > 600); $('#header')?.classList.toggle('scrolled', scrollY > 10); }, { passive: true });
}
/* [21] Countdown — акциянын таймери */
function Countdown(id) {
  const end = store.get('saleEnd') > Date.now() ? store.get('saleEnd') : (() => { const e = Date.now() + 3 * 864e5 + 5 * 36e5; store.set('saleEnd', e); return e; })();
  const tick = () => { const el = $('#' + id); if (!el) return clearInterval(iv); let s = Math.max(0, Math.floor((end - Date.now()) / 1000)); const d = Math.floor(s / 86400); s %= 86400; const h = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60); s %= 60; el.innerHTML = [[d, 'days'], [h, 'hours'], [m, 'mins'], [s, 'secs']].map(([v, k]) => `<div><b>${String(v).padStart(2, '0')}</b><small>${t(k)}</small></div>`).join(''); };
  const iv = setInterval(tick, 1000); tick();
}
/* [22] Counter — сандардын анимациясы */
function animateCounters(root) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target, to = +el.dataset.to; const t0 = performance.now(); const step = now => { const p = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('ru-RU') + (el.dataset.suf || ''); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: .3 });
  $$('[data-to]', root).forEach(el => io.observe(el));
}
/* [23] Reveal — скролл анимациясы */
function reveal(root) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }); $$('.reveal', root).forEach(el => io.observe(el)); }

/* [24] ErrorBoundary — ката кармагыч */
function ErrorBoundary(view, err) {
  console.error('[ErrorBoundary]', err);
  view.innerHTML = `<section class="container page"><div class="error-box"><div class="big">⚠️</div><h2>${t('errorTitle')}</h2><code>${esc(err && err.message || err)}</code><p class="muted">${t('errorHint')}</p><div class="row-c"><button class="btn btn-primary" onclick="location.reload()">↻ ${t('retry')}</button><a href="#/" class="btn btn-ghost">${t('backHome')}</a></div></div></section>`;
}
window.addEventListener('error', e => { if (e.message && !String(e.filename || '').includes('gsi')) toast('JS: ' + e.message, 'error'); });
window.addEventListener('unhandledrejection', e => { console.warn(e.reason); });

/* [25] QuickView — тез көрүү модалы */
function quickView(id) {
  const it = DB.item(id); if (!it) return;
  Modal({ title: esc(loc(it.name)), wide: true, body: `<div class="qv">${Img(it.img, '', it.id)}<div><span class="card-cat">${catIcon(it.category)} ${esc(catName(it.category))}</span>${Stars(itemRating(it))}<p>${esc(loc(it.desc))}</p><div class="price-big">${money(it.price)} ${it.oldPrice ? `<s>${money(it.oldPrice)}</s>` : ''}</div></div></div>`,
    actions: [{ label: t('details'), onClick: c => { c(); location.hash = '#/item/' + id; } }, { label: '🛒 ' + t('addToCart'), cls: 'btn-primary', onClick: c => { Cart.add(id); c(); } }] });
}

/* [26] Глобалдык click delegation */
const actions = {
  addCart: id => Cart.add(id),
  toggleFav: id => Fav.toggle(id),
  quickView: id => quickView(id),
  theme: () => setTheme(state.theme === 'dark' ? 'light' : 'dark'),
  burger: () => toggleBurger(),
  logout: () => Auth.logout(),
  userMenu: () => $('#userDrop')?.classList.toggle('show'),
  chat: () => { $('#chatbot').classList.toggle('open'); setTimeout(() => $('#chatIn')?.focus(), 100); },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]'); if (!el) return;
  const fn = actions[el.dataset.action]; if (fn) { e.preventDefault(); fn(el.dataset.id, el, e); }
});

/* =========================================================
   10. БАРАКТАР (PAGES)
   ========================================================= */

/* [27] HeroSlider */
function HeroSlider() {
  return `<section class="hero"><div class="slides" id="slides">${CONFIG.hero.map((s, i) => `
    <div class="slide ${i === 0 ? 'active' : ''}" style="--img:url('${esc(s.img)}')">
      <div class="container slide-in"><span class="hero-tag">${CONFIG.logo} ${esc(CONFIG.siteName)}</span>
      <h1>${esc(loc(s.title))}</h1><p>${esc(loc(s.text))}</p>
      <div class="row"><a href="#/catalog" class="btn btn-primary btn-lg">${t('catalog')} →</a><a href="#/about" class="btn btn-light btn-lg">${t('about')}</a></div></div></div>`).join('')}</div>
    <button class="hero-nav prev" data-dir="-1" aria-label="prev">‹</button><button class="hero-nav next" data-dir="1" aria-label="next">›</button>
    <div class="dots">${CONFIG.hero.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="slide ${i + 1}"></button>`).join('')}</div></section>`;
}
function initSlider() {
  let i = 0; const slides = $$('.slide'), dots = $$('.dots button'); if (!slides.length) return;
  const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('active', k === i)); dots.forEach((d, k) => d.classList.toggle('active', k === i)); };
  $$('.hero-nav').forEach(b => b.onclick = () => { go(i + +b.dataset.dir); reset(); });
  dots.forEach(d => d.onclick = () => { go(+d.dataset.i); reset(); });
  let iv; const reset = () => { clearInterval(iv); iv = setInterval(() => { if (!$('#slides')) return clearInterval(iv); go(i + 1); }, 5500); }; reset();
  let x0 = null; const h = $('.hero'); h.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true }); h.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); reset(); } x0 = null; });
}

/* [28] HOME — башкы бет */
async function Home(view) {
  view.innerHTML = HeroSlider() + `<section class="container sec">${SectionTitle(t('popular'), '#/catalog?sort=rating')}<div class="grid">${SkeletonGrid(4)}</div></section>`;
  initSlider();
  await sleep(350);
  const items = DB.items();
  const popular = [...items].sort((a, b) => itemRating(b) - itemRating(a) || soldCount(b.id) - soldCount(a.id)).slice(0, 8);
  const fresh = items.filter(i => i.isNew).concat(items.filter(i => !i.isNew)).slice(0, 4);
  const sales = items.filter(i => i.oldPrice).slice(0, 4);
  const revs = DB.reviews().slice().sort((a, b) => b.date - a.date).slice(0, 3);
  view.innerHTML = HeroSlider() + `
  <section class="container sec"><div class="cat-tiles">${CONFIG.categories.map(c => `<a href="#/catalog?cat=${c.key}" class="cat-tile reveal"><span>${c.icon}</span><b>${esc(loc(c.name))}</b><small>${items.filter(i => i.category === c.key).length} ${t('items_count')}</small></a>`).join('')}</div></section>
  <section class="container sec">${SectionTitle('🔥 ' + t('popular'), '#/catalog?sort=rating')}<div class="grid">${popular.map(ProductCard).join('')}</div></section>
  ${sales.length ? `<section class="container sec"><div class="promo reveal"><div><span class="hero-tag">% ${t('sale')}</span><h2>${esc(loc(CONFIG.promoText))}</h2><p>${t('promo')}: <b class="code">${Object.keys(CONFIG.promoCodes)[0]}</b> (-${Object.values(CONFIG.promoCodes)[0]}%)</p><p class="muted">${t('saleEnds')}</p><div class="countdown" id="cd"></div></div><div class="promo-items">${sales.slice(0, 2).map(ProductCard).join('')}</div></div></section>` : ''}
  <section class="container sec">${SectionTitle('✨ ' + t('newArrivals'), '#/catalog?sort=new')}<div class="grid">${fresh.map(ProductCard).join('')}</div></section>
  <section class="sec band"><div class="container">${SectionTitle(t('whyUs'))}<div class="features">${[['🚀', 1], ['🏅', 2], ['🔒', 3], ['💬', 4]].map(([i, n]) => `<div class="feature reveal"><span>${i}</span><h3>${t('feat' + n + 't')}</h3><p>${t('feat' + n + 'd')}</p></div>`).join('')}</div>
    <div class="stats">${[[items.length, 'statItems', ''], [CONFIG.stats[0], 'statClients', '+'], [CONFIG.stats[1] + DB.orders().length, 'statOrders', '+'], [CONFIG.stats[2], 'statYears', '']].map(([v, k, s]) => `<div class="stat reveal"><b data-to="${v}" data-suf="${s}">0</b><span>${t(k)}</span></div>`).join('')}</div></div></section>
  ${revs.length ? `<section class="container sec">${SectionTitle('💬 ' + t('testimonials'))}<div class="testis">${revs.map(r => { const it = DB.item(r.itemId); return `<blockquote class="testi reveal">${Stars(r.rating)}<p>“${esc(r.text)}”</p><footer><b>${esc(r.author)}</b>${it ? ` · <a href="#/item/${it.id}">${esc(loc(it.name))}</a>` : ''}</footer></blockquote>`; }).join('')}</div></section>` : ''}
  <section class="container sec"><div class="newsletter reveal"><div><h2>📬 ${t('newsletter')}</h2><p>${t('newsletterText')}</p></div><form id="nlForm" class="nl-form"><input type="email" required placeholder="you@mail.kg"><button class="btn btn-primary">${t('subscribe')}</button></form></div></section>`;
  initSlider(); if (sales.length) Countdown('cd'); animateCounters(view); reveal(view);
  $('#nlForm').onsubmit = e => { e.preventDefault(); const v = e.target[0].value; if (!isEmail(v)) return toast(t('invalidEmail'), 'error'); const l = store.get('subs', []); l.push(v); store.set('subs', l); e.target.reset(); toast(t('subscribed'), 'success'); };
}

/* [29] FiltersPanel */
function FiltersPanel(f, items) {
  const prices = items.map(i => i.price); const maxP = Math.max(0, ...prices);
  return `<div class="filters-head"><h3>⚙️ ${t('filters')}</h3><button class="icon-btn mob-only" id="closeFilters">✕</button></div>
  <div class="f-group"><h4>${t('categories')}</h4>
    <label class="radio"><input type="radio" name="cat" value="all" ${f.cat === 'all' ? 'checked' : ''}> ${t('all')} <small>${items.length}</small></label>
    ${CONFIG.categories.map(c => `<label class="radio"><input type="radio" name="cat" value="${c.key}" ${f.cat === c.key ? 'checked' : ''}> ${c.icon} ${esc(loc(c.name))} <small>${items.filter(i => i.category === c.key).length}</small></label>`).join('')}</div>
  <div class="f-group"><h4>${t('price')} (сом)</h4><div class="row2"><input type="number" id="fMin" placeholder="${t('min')} 0" value="${f.min}" min="0"><input type="number" id="fMax" placeholder="${t('max')} ${maxP}" value="${f.max}" min="0"></div>
    <input type="range" id="fRange" min="0" max="${maxP}" step="${Math.max(1, Math.round(maxP / 100))}" value="${f.max || maxP}"></div>
  <div class="f-group"><h4>${t('rating')}</h4>${[0, 4.5, 4, 3].map(r => `<label class="radio"><input type="radio" name="rt" value="${r}" ${+f.rating === r ? 'checked' : ''}> ${r ? Stars(r) + ' +' : t('all')}</label>`).join('')}</div>
  <div class="f-group"><label class="check"><input type="checkbox" id="fStock" ${f.stock ? 'checked' : ''}> ${t('inStock')}</label>
  <label class="check"><input type="checkbox" id="fSale" ${f.sale ? 'checked' : ''}> % ${t('sale')}</label></div>
  <button class="btn btn-ghost w100" id="fReset">↺ ${t('reset')}</button>`;
}

/* [30] CATALOG — поиск, фильтр, сорттоо, пагинация */
async function Catalog(view, params, q) {
  const f = { q: q.q || '', cat: q.cat || 'all', min: q.min || '', max: q.max || '', rating: +q.rating || 0, stock: q.stock === '1', sale: q.sale === '1', sort: q.sort || 'popular', page: +q.page || 1 };
  const PER = CONFIG.perPage || 8;
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('catalog')]])}
  <div class="page-head"><h1>🗂 ${f.cat !== 'all' ? esc(catName(f.cat)) : t('catalog')}</h1></div>
  <div class="catalog"><aside class="filters" id="filters"></aside>
  <div class="cat-main"><div class="toolbar">
    <div class="search-inline"><span>🔍</span><input type="search" id="cSearch" placeholder="${t('searchPlaceholder')}" value="${esc(f.q)}"></div>
    <button class="btn btn-ghost mob-only" id="openFilters">⚙️ ${t('filters')}</button>
    <select id="cSort" class="sel">${[['popular', 'sortPopular'], ['priceAsc', 'sortPriceAsc'], ['priceDesc', 'sortPriceDesc'], ['rating', 'sortRating'], ['new', 'sortNew'], ['name', 'sortName']].map(([v, k]) => `<option value="${v}" ${f.sort === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select>
  </div><div class="chips" id="chips"></div><p class="muted" id="cCount"></p>
  <div class="grid" id="grid">${SkeletonGrid(PER)}</div><div id="pager"></div></div></div></section>`;
  await sleep(450);
  const items = DB.items();
  $('#filters').innerHTML = FiltersPanel(f, items);

  function apply(scroll) {
    let list = searchItems(items, f.q);
    if (f.cat !== 'all') list = list.filter(i => i.category === f.cat);
    if (f.min !== '') list = list.filter(i => i.price >= +f.min);
    if (f.max !== '') list = list.filter(i => i.price <= +f.max);
    if (f.rating) list = list.filter(i => itemRating(i) >= f.rating);
    if (f.stock) list = list.filter(i => i.stock > 0);
    if (f.sale) list = list.filter(i => i.oldPrice);
    const sorters = { popular: (a, b) => soldCount(b.id) - soldCount(a.id) || itemRating(b) - itemRating(a), priceAsc: (a, b) => a.price - b.price, priceDesc: (a, b) => b.price - a.price, rating: (a, b) => itemRating(b) - itemRating(a), new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || String(b.id).localeCompare(String(a.id)), name: (a, b) => loc(a.name).localeCompare(loc(b.name)) };
    list.sort(sorters[f.sort] || sorters.popular);
    const pages = Math.max(1, Math.ceil(list.length / PER)); f.page = clamp(f.page, 1, pages);
    const slice = list.slice((f.page - 1) * PER, f.page * PER);
    $('#grid').innerHTML = slice.length ? slice.map(ProductCard).join('') : EmptyState('🔎', t('nothingFound'), t('nothingFoundText'), `<button class="btn btn-primary" id="emptyReset">${t('reset')}</button>`);
    $('#cCount').textContent = `${t('found')}: ${list.length} · ${t('showing')} ${slice.length ? (f.page - 1) * PER + 1 : 0}–${(f.page - 1) * PER + slice.length}`;
    $('#pager').innerHTML = Pagination(f.page, pages);
    const chips = []; if (f.q) chips.push(['q', '🔍 ' + f.q]); if (f.cat !== 'all') chips.push(['cat', catName(f.cat)]); if (f.min !== '' || f.max !== '') chips.push(['price', `${f.min || 0} – ${f.max || '∞'}`]); if (f.rating) chips.push(['rating', '★ ' + f.rating + '+']); if (f.stock) chips.push(['stock', t('inStock')]); if (f.sale) chips.push(['sale', t('sale')]);
    $('#chips').innerHTML = chips.map(([k, l]) => `<button class="chip" data-k="${k}">${esc(l)} ✕</button>`).join('');
    const qs = new URLSearchParams(); Object.entries(f).forEach(([k, v]) => { if (v && !(k === 'cat' && v === 'all') && !(k === 'sort' && v === 'popular') && !(k === 'page' && v === 1)) qs.set(k, v === true ? '1' : v); });
    history.replaceState(null, '', '#/catalog' + (qs.toString() ? '?' + qs : ''));
    if (scroll) $('.cat-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const er = $('#emptyReset'); if (er) er.onclick = resetAll;
  }
  function resetAll() { Object.assign(f, { q: '', cat: 'all', min: '', max: '', rating: 0, stock: false, sale: false, page: 1 }); $('#cSearch').value = ''; $('#filters').innerHTML = FiltersPanel(f, items); bindFilters(); apply(); }
  function bindFilters() {
    $$('input[name="cat"]').forEach(r => r.onchange = () => { f.cat = r.value; f.page = 1; apply(); $('.page-head h1').textContent = '🗂 ' + (f.cat !== 'all' ? catName(f.cat) : t('catalog')); });
    $$('input[name="rt"]').forEach(r => r.onchange = () => { f.rating = +r.value; f.page = 1; apply(); });
    $('#fMin').oninput = debounce(e => { f.min = e.target.value; f.page = 1; apply(); }, 400);
    $('#fMax').oninput = debounce(e => { f.max = e.target.value; $('#fRange').value = e.target.value || $('#fRange').max; f.page = 1; apply(); }, 400);
    $('#fRange').oninput = e => { f.max = e.target.value; $('#fMax').value = e.target.value; f.page = 1; apply(); };
    $('#fStock').onchange = e => { f.stock = e.target.checked; f.page = 1; apply(); };
    $('#fSale').onchange = e => { f.sale = e.target.checked; f.page = 1; apply(); };
    $('#fReset').onclick = resetAll;
    const cf = $('#closeFilters'); if (cf) cf.onclick = () => $('#filters').classList.remove('open');
  }
  bindFilters();
  $('#cSearch').oninput = debounce(e => { f.q = e.target.value; f.page = 1; apply(); }, 300);
  $('#cSort').onchange = e => { f.sort = e.target.value; apply(); };
  $('#openFilters').onclick = () => $('#filters').classList.add('open');
  $('#pager').onclick = e => { const b = e.target.closest('[data-page]'); if (b && !b.disabled) { f.page = +b.dataset.page; apply(true); } };
  $('#chips').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; const k = c.dataset.k; if (k === 'q') { f.q = ''; $('#cSearch').value = ''; } if (k === 'cat') f.cat = 'all'; if (k === 'price') { f.min = ''; f.max = ''; } if (k === 'rating') f.rating = 0; if (k === 'stock') f.stock = false; if (k === 'sale') f.sale = false; f.page = 1; $('#filters').innerHTML = FiltersPanel(f, items); bindFilters(); apply(); };
  apply();
}

/* [31] ITEM — товардын толук сүрөттөмөсү */
async function ItemPage(view, { id }) {
  view.innerHTML = SkeletonDetail();
  await sleep(300);
  const it = DB.item(id);
  if (!it) return NotFound(view);
  const rv = store.get('recent', []).filter(x => x !== id); rv.unshift(id); store.set('recent', rv.slice(0, 8));
  const imgs = it.gallery && it.gallery.length ? it.gallery : [it.img];
  const r = itemRating(it); const revs = reviewsFor(id);
  const specs = Object.entries(it.specs || {});
  const related = DB.items().filter(i => i.category === it.category && i.id !== id).slice(0, 4);
  const recent = rv.slice(1, 5).map(DB.item).filter(Boolean);
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('catalog'), '#/catalog'], [catName(it.category), '#/catalog?cat=' + it.category], [loc(it.name)]])}
  <div class="detail">
    <div class="gallery"><div class="g-main">${Img(imgs[0], loc(it.name), it.id, 'zoom')}${it.oldPrice ? `<span class="badge sale big">-${Math.round(100 - it.price / it.oldPrice * 100)}%</span>` : ''}</div>
      <div class="g-thumbs">${imgs.map((s, i) => `<button class="${i === 0 ? 'active' : ''}" data-src="${esc(s)}">${Img(s, '', it.id + i)}</button>`).join('')}</div></div>
    <div class="info">
      <span class="card-cat">${catIcon(it.category)} ${esc(catName(it.category))}</span>
      <h1>${esc(loc(it.name))}</h1>
      <div class="row">${Stars(r, 'lg')}<a href="#reviews" class="muted">${revs.length} ${t('reviewsCount')}</a><span class="muted">· 🛍 ${soldCount(id)}</span></div>
      <div class="price-big">${money(it.price)} ${it.oldPrice ? `<s>${money(it.oldPrice)}</s>` : ''} ${CONFIG.priceUnit ? `<small>${esc(loc(CONFIG.priceUnit))}</small>` : ''}</div>
      <p class="lead">${esc(loc(it.desc))}</p>
      <p class="${it.stock > 0 ? 'ok' : 'bad'}">${it.stock > 0 ? `✔ ${t('inStockN')}: ${it.stock} ${t('pcs')}` : '✖ ' + t('outOfStock')}</p>
      <div class="buy-row">
        <div class="qty"><button id="qMinus">−</button><input id="qIn" type="number" value="1" min="1" max="${it.stock}"><button id="qPlus">+</button></div>
        <button class="btn btn-primary btn-lg" id="buyBtn" ${it.stock > 0 ? '' : 'disabled'}>🛒 ${t('addToCart')}</button>
        <button class="btn btn-ghost btn-lg fav-inline ${Fav.has(id) ? 'on' : ''}" data-action="toggleFav" data-id="${id}">${Fav.has(id) ? '♥' : '♡'}</button>
      </div>
      <div class="row">${CONFIG.booking ? `<a href="#/booking/${id}" class="btn btn-accent">📅 ${esc(loc(CONFIG.bookingLabel))}</a>` : ''}<button class="btn btn-ghost" id="shareBtn">🔗 ${t('share')}</button></div>
      <ul class="perks"><li>🚚 ${t('feat1d')}</li><li>🔒 ${t('feat3d')}</li></ul>
    </div></div>
  <div class="tabs" id="tabs"><div class="tab-btns"><button class="active" data-t="d">${t('description')}</button><button data-t="s">${t('specs')}</button><button data-t="r">${t('reviews')} (${revs.length})</button></div>
    <div class="tab-pane active" data-p="d"><p>${esc(loc(it.desc))}</p>${it.long ? `<p>${esc(loc(it.long))}</p>` : ''}<div class="tags">${(it.tags || []).map(x => `<a class="tag" href="#/catalog?q=${encodeURIComponent(x)}">#${esc(x)}</a>`).join('')}</div></div>
    <div class="tab-pane" data-p="s"><table class="specs">${specs.map(([k, v]) => `<tr><th>${esc(loc(CONFIG.specLabels[k]) || k)}</th><td>${esc(loc(v))}</td></tr>`).join('') || '<tr><td>—</td></tr>'}</table></div>
    <div class="tab-pane" data-p="r" id="reviews">${ReviewsBlock(it)}</div></div>
  ${related.length ? `<section class="sec">${SectionTitle(t('related'), '#/catalog?cat=' + it.category)}<div class="grid">${related.map(ProductCard).join('')}</div></section>` : ''}
  ${recent.length ? `<section class="sec">${SectionTitle('👁 ' + t('recentlyViewed'))}<div class="grid">${recent.map(ProductCard).join('')}</div></section>` : ''}
  </section>`;
  $$('.g-thumbs button').forEach(b => b.onclick = () => { $('.g-main img').src = b.dataset.src; $$('.g-thumbs button').forEach(x => x.classList.toggle('active', x === b)); });
  const gm = $('.g-main'); gm.onmousemove = e => { const r = gm.getBoundingClientRect(); gm.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%'); gm.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%'); };
  const qIn = $('#qIn'); $('#qMinus').onclick = () => qIn.value = clamp(+qIn.value - 1, 1, it.stock || 1); $('#qPlus').onclick = () => qIn.value = clamp(+qIn.value + 1, 1, it.stock || 1);
  $('#buyBtn').onclick = () => Cart.add(id, clamp(+qIn.value || 1, 1, it.stock));
  $('#shareBtn').onclick = async () => { try { if (navigator.share) await navigator.share({ title: loc(it.name), url: location.href }); else { await navigator.clipboard.writeText(location.href); toast(t('linkCopied'), 'success'); } } catch (e) {} };
  $$('.tab-btns button').forEach(b => b.onclick = () => { $$('.tab-btns button').forEach(x => x.classList.toggle('active', x === b)); $$('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.p === b.dataset.t)); });
  if (location.hash.includes('reviews')) $('[data-t="r"]').click();
  bindReviewForm(it);
}
/* [32] ReviewsBlock — пикирлер жана рейтинг */
function ReviewsBlock(it) {
  const revs = reviewsFor(it.id); const r = itemRating(it);
  const dist = [5, 4, 3, 2, 1].map(s => [s, revs.filter(x => x.rating === s).length]);
  return `<div class="rev-wrap"><div class="rev-summary"><b class="rev-avg">${r.toFixed(1)}</b>${Stars(r, 'lg')}<span class="muted">${revs.length} ${t('reviewsCount')}</span>
    ${dist.map(([s, n]) => `<div class="bar-row"><span>${s}★</span><div class="bar"><i style="width:${revs.length ? n / revs.length * 100 : 0}%"></i></div><small>${n}</small></div>`).join('')}</div>
    <div class="rev-list">${state.user ? `<form id="revForm" class="rev-form card-flat"><h4>✍️ ${t('writeReview')}</h4><label>${t('yourRating')}</label>${StarInput('rating', 5)}<textarea id="revText" rows="3" placeholder="${t('yourReview')}" required minlength="3"></textarea><button class="btn btn-primary">${t('send')}</button></form>` : `<p class="card-flat">🔐 <a href="#/login?next=${encodeURIComponent('#/item/' + it.id)}">${t('loginToReview')}</a></p>`}
    ${revs.length ? revs.map(x => `<div class="review"><div class="rev-head"><span class="ava">${esc((x.author || '?')[0])}</span><div><b>${esc(x.author)}</b><small class="muted">${fmtDate(x.date)}</small></div>${Stars(x.rating)}</div><p>${esc(x.text)}</p></div>`).join('') : `<p class="muted">${t('noReviews')}</p>`}</div></div>`;
}
function bindReviewForm(it) {
  const f = $('#revForm'); if (!f) return;
  f.onsubmit = e => {
    e.preventDefault(); const text = $('#revText').value.trim(); const rating = +($('input[name="rating"]:checked', f)?.value || 5);
    if (text.length < 3) return toast(t('required'), 'error');
    const all = DB.reviews(); all.push({ id: uid(), itemId: it.id, userId: state.user.id, author: state.user.name, rating, text, date: Date.now() }); DB.saveReviews(all);
    emit('review', { item: loc(it.name), rating }); toast(t('reviewAdded'), 'success');
    $('#reviews').innerHTML = ReviewsBlock(it); bindReviewForm(it);
  };
}

/* [33] CART — себет */
function CartPage(view) {
  const lines = Cart.lines();
  if (!lines.length) { view.innerHTML = `<section class="container page">${Breadcrumbs([[t('cart')]])}${EmptyState('🛒', t('emptyCart'), '', `<a href="#/catalog" class="btn btn-primary">${t('goShopping')}</a>`)}</section>`; return; }
  const tt = Cart.totals();
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('cart')]])}<h1>🛒 ${t('cart')} <small class="muted">(${Cart.count()})</small></h1>
  <div class="cart-layout"><div class="cart-list">${lines.map(l => `
    <div class="cart-item" data-id="${l.id}">${Img(l.item.img, '', l.id)}
      <div class="ci-info"><a href="#/item/${l.id}"><b>${esc(loc(l.item.name))}</b></a><small class="muted">${esc(catName(l.item.category))}</small><span>${money(l.item.price)}</span></div>
      <div class="qty sm"><button data-q="-1">−</button><input value="${l.qty}" type="number" min="1" max="${l.item.stock}"><button data-q="1">+</button></div>
      <b class="ci-sum">${money(l.item.price * l.qty)}</b><button class="icon-btn danger" data-rm title="${t('delete')}">🗑</button></div>`).join('')}
    <div class="row"><a href="#/catalog" class="btn btn-ghost">← ${t('continueShopping')}</a><button class="btn btn-ghost danger" id="clearCart">🗑 ${t('clearCart')}</button></div></div>
  <aside class="summary card-flat"><h3>${t('total')}</h3>
    <form id="promoForm" class="promo-form"><input id="promoIn" placeholder="${t('promo')}" value="${esc(state.promo || '')}"><button class="btn btn-ghost btn-sm">${t('applyPromo')}</button></form>
    <p class="muted small">💡 ${Object.keys(CONFIG.promoCodes).join(', ')}</p>
    ${Summary(tt)}<a href="#/checkout" class="btn btn-primary btn-lg w100">${t('checkout')} →</a></aside></div></section>`;
  $$('.cart-item').forEach(row => {
    const id = row.dataset.id; const inp = $('input', row);
    $$('[data-q]', row).forEach(b => b.onclick = () => { Cart.set(id, +inp.value + +b.dataset.q); CartPage(view); });
    inp.onchange = () => { Cart.set(id, +inp.value || 1); CartPage(view); };
    $('[data-rm]', row).onclick = () => { Cart.remove(id); CartPage(view); };
  });
  $('#clearCart').onclick = async () => { if (await confirmBox(t('clearCart'))) { Cart.clear(); CartPage(view); } };
  $('#promoForm').onsubmit = e => { e.preventDefault(); const c = $('#promoIn').value.trim().toUpperCase(); if (CONFIG.promoCodes[c]) { state.promo = c; store.set('promo', c); toast(t('promoOk'), 'success'); } else { state.promo = null; store.del('promo'); toast(t('promoBad'), 'error'); } CartPage(view); };
}
/* [34] Summary — эсеп */
function Summary(tt) { return `<div class="sum-rows"><p><span>${t('subtotal')}</span><b>${money(tt.subtotal)}</b></p>${tt.discount ? `<p class="ok"><span>${t('discount')} (${state.promo})</span><b>−${money(tt.discount)}</b></p>` : ''}<p><span>${t('delivery')}</span><b>${tt.delivery ? money(tt.delivery) : t('free')}</b></p><p class="sum-total"><span>${t('total')}</span><b>${money(tt.total)}</b></p></div>`; }

/* [35] Form helpers — валидация */
function fieldErr(input, msg) { const box = input.closest('.field'); box?.classList.toggle('invalid', !!msg); let s = box?.querySelector('.err'); if (box && !s) { s = document.createElement('small'); s.className = 'err'; box.appendChild(s); } if (s) s.textContent = msg || ''; return !msg; }
function validate(form, rules) { let ok = true; for (const [name, fn] of Object.entries(rules)) { const el = form.elements[name]; if (!el) continue; const msg = fn(el.value.trim(), el); if (!fieldErr(el, msg)) ok = false; } return ok; }
const req = v => v ? '' : t('required');

/* [36] CHECKOUT — заказ берүү (Private route) */
function CheckoutPage(view) {
  const lines = Cart.lines(); if (!lines.length) { location.hash = '#/cart'; return; }
  const u = state.user; const tt = Cart.totals();
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('cart'), '#/cart'], [t('checkout')]])}<h1>📝 ${t('checkout')}</h1>
  <div class="steps"><span class="done">1. ${t('cart')}</span><span class="active">2. ${t('checkout')}</span><span>3. ${t('payment')}</span></div>
  <div class="cart-layout"><form id="coForm" class="card-flat form-grid" novalidate>
    <label class="field"><span>${t('name')} *</span><input name="name" value="${esc(u.name)}"></label>
    <label class="field"><span>${t('phone')} *</span><input name="phone" value="${esc(u.phone || '+996')}"></label>
    <label class="field"><span>${t('email')}</span><input name="email" value="${esc(u.email)}"></label>
    <label class="field"><span>${t('city')} *</span><select name="city">${['Бишкек', 'Ош', 'Каракол', 'Жалал-Абад', 'Нарын', 'Талас', 'Баткен', 'Токмок'].map(c => `<option>${c}</option>`).join('')}</select></label>
    <div class="field full"><span>${t('deliveryMethod')}</span><div class="opts"><label class="opt"><input type="radio" name="dm" value="courier" checked> 🚚 ${t('courier')}</label><label class="opt"><input type="radio" name="dm" value="pickup"> 🏬 ${t('pickup')}</label></div></div>
    <label class="field full"><span>${t('address')} *</span><input name="address" placeholder="ул. ..."></label>
    <div class="field full"><span>${t('payment')}</span><div class="opts">
      <label class="opt"><input type="radio" name="pm" value="card" checked> 💳 ${t('payCard')}</label>
      <label class="opt"><input type="radio" name="pm" value="postkg"> 📮 ${t('payPostkg')}</label>
      <label class="opt"><input type="radio" name="pm" value="cash"> 💵 ${t('payCash')}</label></div></div>
    <label class="field full"><span>${t('comment')}</span><textarea name="comment" rows="2"></textarea></label>
    <button class="btn btn-primary btn-lg full">✔ ${t('placeOrder')} — ${money(tt.total)}</button>
  </form>
  <aside class="summary card-flat"><h3>${t('orderDetails')}</h3>${lines.map(l => `<div class="mini-line">${Img(l.item.img, '', l.id)}<span>${esc(loc(l.item.name))} × ${l.qty}</span><b>${money(l.item.price * l.qty)}</b></div>`).join('')}${Summary(tt)}</aside></div></section>`;
  const form = $('#coForm');
  $$('input[name="dm"]', form).forEach(r => r.onchange = () => { form.elements.address.closest('.field').style.display = r.value === 'pickup' && r.checked ? 'none' : ''; });
  form.onsubmit = async e => {
    e.preventDefault();
    const pickup = form.elements.dm.value === 'pickup';
    const ok = validate(form, { name: req, phone: v => !v ? t('required') : isPhone(v) ? '' : t('invalidPhone'), email: v => !v || isEmail(v) ? '' : t('invalidEmail'), address: v => pickup || v ? '' : t('required') });
    if (!ok) return toast(t('required'), 'error');
    const pm = form.elements.pm.value;
    const data = Object.fromEntries(new FormData(form));
    let paid = false;
    if (pm === 'card') { paid = await PaymentModal(tt.total); if (!paid) return; }
    if (pm === 'postkg') { paid = await PostkgModal(tt.total); if (!paid) return; }
    await createOrder(data, pm, paid, pickup);
  };
}
/* [37] PaymentModal — Stripe демо */
function PaymentModal(amount) {
  return new Promise(res => {
    let done = false;
    const close = Modal({ title: '💳 Stripe · ' + money(amount), body: `<div class="stripe">
      <div class="card-visual"><span>VISA</span><b id="cvNum">•••• •••• •••• ••••</b><small id="cvName">CARD HOLDER</small></div>
      <label class="field"><span>${t('cardNumber')}</span><input id="cNum" inputmode="numeric" maxlength="19" placeholder="4242 4242 4242 4242"></label>
      <div class="row2"><label class="field"><span>${t('cardExp')}</span><input id="cExp" maxlength="5" placeholder="12/28"></label><label class="field"><span>${t('cardCvc')}</span><input id="cCvc" maxlength="4" inputmode="numeric" placeholder="123"></label></div>
      <label class="field"><span>${t('cardHolder')}</span><input id="cName" placeholder="AIBEK ASANOV"></label>
      <p class="muted small">🧪 ${t('testCard')}</p></div>`,
      actions: [{ label: t('cancel'), onClick: c => { c(); } }, { label: '🔒 ' + t('pay') + ' ' + money(amount), cls: 'btn-primary', onClick: async (c, btn) => {
        const num = $('#cNum').value.replace(/\s/g, ''), exp = $('#cExp').value, cvc = $('#cCvc').value;
        const luhn = n => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
        const [mm, yy] = exp.split('/').map(Number);
        if (num.length < 13 || !luhn(num) || !(mm >= 1 && mm <= 12) || !(yy >= 0) || cvc.length < 3) return toast(t('cardInvalid'), 'error');
        btn.disabled = true; btn.innerHTML = `<span class="spin"></span> ${t('processing')}`; await sleep(1600);
        if (num === '4000000000000002') { btn.disabled = false; btn.textContent = t('pay'); return toast(t('paymentFail'), 'error'); }
        done = true; toast(t('paymentOk'), 'success'); c(); res(true);
      } }],
      onOpen: (w) => {
        $('#cNum', w).oninput = e => { const v = e.target.value.replace(/\D/g, '').slice(0, 16); e.target.value = v.replace(/(.{4})/g, '$1 ').trim(); $('#cvNum', w).textContent = (e.target.value || '•••• •••• •••• ••••'); };
        $('#cExp', w).oninput = e => { let v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v; };
        $('#cName', w).oninput = e => $('#cvName', w).textContent = e.target.value.toUpperCase() || 'CARD HOLDER';
        const obs = new MutationObserver(() => { if (!document.body.contains(w)) { obs.disconnect(); if (!done) res(false); } }); obs.observe(document.body, { childList: true });
      } });
  });
}
/* [38] PostkgModal — Post.kg демо */
function PostkgModal(amount) {
  return new Promise(res => {
    let done = false;
    Modal({ title: '📮 Post.kg · ' + money(amount), body: `<div class="center"><img class="qr" alt="QR" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent('POSTKG-DEMO|' + CONFIG.siteName + '|' + amount)}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'qr-fallback',textContent:'QR'}))"><p>${t('postkgText')}</p><b class="price-big">${money(amount)}</b></div>`,
      actions: [{ label: t('cancel'), onClick: c => c() }, { label: '✔ ' + t('paid'), cls: 'btn-primary', onClick: async (c, b) => { b.disabled = true; b.innerHTML = `<span class="spin"></span> ${t('processing')}`; await sleep(1200); done = true; c(); toast(t('paymentOk'), 'success'); res(true); } }],
      onOpen: w => { const obs = new MutationObserver(() => { if (!document.body.contains(w)) { obs.disconnect(); if (!done) res(false); } }); obs.observe(document.body, { childList: true }); } });
  });
}
async function createOrder(data, pm, paid, pickup) {
  const lines = Cart.lines(); const tt = Cart.totals();
  const order = { id: 'A' + Date.now().toString().slice(-6), userId: state.user.id, customer: data.name, phone: data.phone, email: data.email, city: data.city, address: pickup ? t('pickup') : data.address, comment: data.comment, items: lines.map(l => ({ id: l.id, name: l.item.name, price: l.item.price, qty: l.qty, img: l.item.img })), ...tt, promo: state.promo, payment: pm, paid, status: 'new', createdAt: Date.now() };
  const orders = DB.orders(); orders.unshift(order); DB.saveOrders(orders);
  const items = DB.items(); lines.forEach(l => { const it = items.find(i => i.id === l.id); if (it) it.stock = Math.max(0, it.stock - l.qty); }); DB.saveItems(items);
  Cart.clear(); state.promo = null; store.del('promo');
  emit('order', { id: order.id, total: order.total, customer: order.customer });
  const text = `🛒 ${t('orderNo')}${order.id}\n👤 ${order.customer}\n📞 ${order.phone}\n📍 ${order.city}, ${order.address}\n${order.items.map(l => `• ${loc(l.name)} × ${l.qty} = ${l.price * l.qty} сом`).join('\n')}\n💰 ${t('total')}: ${order.total} сом (${pm}${paid ? ', paid' : ''})`;
  notify(t('orderPlaced'), text).then(sent => sent && toast(t('notifSent'), 'info'));
  Modal({ title: '🎉 ' + t('orderPlaced'), body: `<div class="center"><div class="big-ok">✔</div><h3>${t('orderNo')}${order.id}</h3><p>${t('total')}: <b>${money(order.total)}</b></p><p class="muted">${order.paid ? '✅ ' + t('st_paid') : '⏳ ' + t('unpaid')}</p></div>`, actions: [{ label: t('myOrders'), cls: 'btn-primary', onClick: c => { c(); location.hash = '#/profile?tab=orders'; } }] });
  confetti();
  location.hash = '#/profile?tab=orders';
}
/* [39] Confetti */
function confetti() { const c = document.createElement('div'); c.className = 'confetti'; c.innerHTML = Array.from({ length: 60 }, (_, i) => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * .6}s;background:hsl(${i * 37 % 360} 90% 55%)"></i>`).join(''); document.body.appendChild(c); setTimeout(() => c.remove(), 3200); }

/* [40] BOOKING — брондоо (Private route) */
function BookingPage(view, { id }) {
  const it = DB.item(id); if (!it) return NotFound(view);
  const u = state.user; const today = new Date().toISOString().slice(0, 10);
  const B = CONFIG.bookingFields || {};
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('catalog'), '#/catalog'], [loc(it.name), '#/item/' + id], [loc(CONFIG.bookingLabel)]])}
  <h1>📅 ${esc(loc(CONFIG.bookingLabel))}</h1>
  <div class="cart-layout"><form id="bkForm" class="card-flat form-grid" novalidate>
    <label class="field"><span>${t('name')} *</span><input name="name" value="${esc(u.name)}"></label>
    <label class="field"><span>${t('phone')} *</span><input name="phone" value="${esc(u.phone || '+996')}"></label>
    <label class="field"><span>${esc(loc(B.dateLabel) || t('date'))} *</span><input type="date" name="date" min="${today}" value="${today}"></label>
    <label class="field"><span>${t('time')}</span><select name="time">${(B.times || ['10:00', '12:00', '14:00', '16:00', '18:00']).map(x => `<option>${x}</option>`).join('')}</select></label>
    <label class="field"><span>${esc(loc(B.peopleLabel) || t('people'))}</span><input type="number" name="people" min="1" max="${B.maxPeople || 10}" value="1"></label>
    ${B.nights ? `<label class="field"><span>${esc(loc(B.nights))}</span><input type="number" name="nights" min="1" max="30" value="1"></label>` : ''}
    <label class="field full"><span>${t('comment')}</span><textarea name="comment" rows="3"></textarea></label>
    <div class="full bk-total" id="bkTotal"></div>
    <button class="btn btn-primary btn-lg full">✔ ${esc(loc(CONFIG.bookingLabel))}</button></form>
  <aside class="summary card-flat"><h3>${t('bookingFor')}</h3>${Img(it.img, '', it.id, 'bk-img')}<b>${esc(loc(it.name))}</b><p class="muted">${esc(loc(it.desc)).slice(0, 140)}…</p>${Stars(itemRating(it))}<div class="price-big">${money(it.price)}</div></aside></div></section>`;
  const form = $('#bkForm');
  const calc = () => { const n = +(form.elements.nights?.value || 1), p = B.perPerson ? +form.elements.people.value || 1 : 1; $('#bkTotal').innerHTML = `${t('total')}: <b>${money(it.price * n * p)}</b>`; return it.price * n * p; };
  form.oninput = calc; calc();
  form.onsubmit = async e => {
    e.preventDefault();
    if (!validate(form, { name: req, phone: v => isPhone(v) ? '' : t('invalidPhone'), date: v => v && v >= today ? '' : t('required') })) return;
    const d = Object.fromEntries(new FormData(form));
    const bk = { id: 'B' + Date.now().toString().slice(-6), itemId: id, itemName: it.name, userId: u.id, ...d, total: calc(), status: 'pending', createdAt: Date.now() };
    const all = DB.bookings(); all.unshift(bk); DB.saveBookings(all);
    emit('booking', { id: bk.id, name: d.name });
    notify(t('bookingDone'), `📅 ${bk.id}\n${loc(it.name)}\n👤 ${d.name} ${d.phone}\n🗓 ${d.date} ${d.time}\n👥 ${d.people}`);
    toast(t('bookingDone'), 'success'); confetti(); location.hash = '#/profile?tab=bookings';
  };
}

/* [41] FAVORITES — тандалмалар */
function FavoritesPage(view) {
  const list = DB.favs().map(DB.item).filter(Boolean);
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('favorites')]])}<h1>♥ ${t('favorites')} <small class="muted">(${list.length})</small></h1>
  ${list.length ? `<div class="grid">${list.map(ProductCard).join('')}</div>` : EmptyState('💔', t('noFavs'), '', `<a href="#/catalog" class="btn btn-primary">${t('goShopping')}</a>`)}</section>`;
}

/* [42] LOGIN */
function AuthShell(inner) { return `<section class="container page auth-page"><div class="auth-card"><div class="auth-side"><span class="logo-ico xl">${CONFIG.logo}</span><h2>${esc(CONFIG.siteName)}</h2><p>${esc(loc(CONFIG.tagline))}</p></div><div class="auth-form">${inner}</div></div></section>`; }
const OAuthButtons = () => `<div class="divider"><span>${t('orWith')}</span></div><div class="oauth"><button type="button" class="btn btn-ghost" id="gBtn"><b class="g">G</b> Google</button><button type="button" class="btn btn-ghost" id="ghBtn"><b>🐙</b> GitHub</button></div><div id="gsiBox"></div>`;
function bindOAuth() { $('#gBtn').onclick = () => googleLogin($('#gsiBox')); $('#ghBtn').onclick = githubLogin; }
function LoginPage(view, p, q) {
  if (state.user) { location.hash = '#/profile'; return; }
  view.innerHTML = AuthShell(`<h1>${t('login')}</h1><form id="lgForm" novalidate>
    <label class="field"><span>${t('email')}</span><input name="email" type="email" autocomplete="email"></label>
    <label class="field"><span>${t('password')}</span><div class="pass"><input name="pass" type="password" autocomplete="current-password"><button type="button" class="eye">👁</button></div></label>
    <button class="btn btn-primary btn-lg w100">${t('login')}</button></form>${OAuthButtons()}
    <p class="center">${t('noAccount')} <a href="#/register">${t('register')}</a></p>
    <div class="demo-box"><b>🧪 ${t('demoAccounts')}</b><button type="button" data-e="admin@site.kg" data-p="admin123">👑 admin@site.kg / admin123</button><button type="button" data-e="user@site.kg" data-p="user123">👤 user@site.kg / user123</button></div>`);
  const f = $('#lgForm'); bindOAuth(); bindEye();
  $$('.demo-box button').forEach(b => b.onclick = () => { f.elements.email.value = b.dataset.e; f.elements.pass.value = b.dataset.p; });
  f.onsubmit = async e => {
    e.preventDefault();
    if (!validate(f, { email: v => isEmail(v) ? '' : t('invalidEmail'), pass: v => v.length >= 6 ? '' : t('passMin') })) return;
    try { const u = await Auth.login(f.elements.email.value, f.elements.pass.value); toast(`${t('welcomeBack')}, ${u.name}!`, 'success'); location.hash = q.next ? decodeURIComponent(q.next) : (u.role === 'admin' ? '#/admin' : '#/profile'); }
    catch (err) { toast(err.message, 'error'); fieldErr(f.elements.pass, err.message); }
  };
}
function bindEye() { $$('.eye').forEach(b => b.onclick = () => { const i = b.previousElementSibling; i.type = i.type === 'password' ? 'text' : 'password'; }); }
/* [43] REGISTER */
function RegisterPage(view) {
  if (state.user) { location.hash = '#/profile'; return; }
  view.innerHTML = AuthShell(`<h1>${t('register')}</h1><form id="rgForm" novalidate>
    <label class="field"><span>${t('name')}</span><input name="name" autocomplete="name"></label>
    <label class="field"><span>${t('email')}</span><input name="email" type="email" autocomplete="email"></label>
    <label class="field"><span>${t('phone')}</span><input name="phone" value="+996"></label>
    <label class="field"><span>${t('password')}</span><div class="pass"><input name="pass" type="password" autocomplete="new-password"><button type="button" class="eye">👁</button></div><div class="strength"><i id="strBar"></i></div><small id="strTxt" class="muted"></small></label>
    <label class="field"><span>${t('confirmPassword')}</span><input name="pass2" type="password"></label>
    <label class="check field"><input type="checkbox" name="agree"> ${t('agree')}</label>
    <button class="btn btn-primary btn-lg w100">${t('register')}</button></form>${OAuthButtons()}
    <p class="center">${t('haveAccount')} <a href="#/login">${t('login')}</a></p>`);
  const f = $('#rgForm'); bindOAuth(); bindEye();
  f.elements.pass.oninput = e => { const v = e.target.value; let s = 0; if (v.length >= 6) s++; if (/[A-ZА-Я]/.test(v) && /[a-zа-я]/.test(v)) s++; if (/\d/.test(v)) s++; if (/[^\w]/.test(v) || v.length > 10) s++; const lv = s <= 1 ? 'weak' : s <= 2 ? 'medium' : 'strong'; $('#strBar').style.width = (s / 4 * 100) + '%'; $('#strBar').className = lv; $('#strTxt').textContent = v ? t(lv) : ''; };
  f.onsubmit = async e => {
    e.preventDefault();
    const ok = validate(f, { name: v => v.length >= 2 ? '' : t('required'), email: v => isEmail(v) ? '' : t('invalidEmail'), phone: v => isPhone(v) ? '' : t('invalidPhone'), pass: v => v.length >= 6 ? '' : t('passMin'), pass2: v => v === f.elements.pass.value ? '' : t('passMismatch') });
    if (!f.elements.agree.checked) { toast(t('agree'), 'error'); return; }
    if (!ok) return;
    try { await Auth.register({ name: f.elements.name.value.trim(), email: f.elements.email.value.trim(), phone: f.elements.phone.value.trim(), pass: f.elements.pass.value }); toast(t('registered'), 'success'); location.hash = '#/profile'; }
    catch (err) { toast(err.message, 'error'); fieldErr(f.elements.email, err.message); }
  };
}

/* [44] PROFILE (Private route) */
function ProfilePage(view, p, q) {
  const u = state.user; const tab = q.tab || 'info';
  const orders = DB.orders().filter(o => o.userId === u.id); const bks = DB.bookings().filter(b => b.userId === u.id);
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('profile')]])}
  <div class="profile"><aside class="card-flat p-side"><div class="p-ava">${u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : esc(u.name[0])}</div><h3>${esc(u.name)}</h3><small class="muted">${esc(u.email)}</small><span class="role role-${u.role}">${u.role}</span>
    <nav class="p-nav">${[['info', '👤', 'myInfo'], ['orders', '📦', 'myOrders'], ['bookings', '📅', 'myBookings']].map(([k, i, l]) => `<a href="#/profile?tab=${k}" class="${tab === k ? 'active' : ''}">${i} ${t(l)}</a>`).join('')}<a href="#/favorites">♥ ${t('favorites')}</a>${u.role === 'admin' ? `<a href="#/admin">🛠 ${t('admin')}</a>` : ''}<button data-action="logout">🚪 ${t('logout')}</button></nav></aside>
  <div class="p-main card-flat">${tab === 'orders' ? `<h2>📦 ${t('myOrders')}</h2>${orders.length ? orders.map(OrderCard).join('') : EmptyState('📦', t('noOrders'), '', `<a href="#/catalog" class="btn btn-primary">${t('goShopping')}</a>`)}`
    : tab === 'bookings' ? `<h2>📅 ${t('myBookings')}</h2>${bks.length ? bks.map(b => `<div class="order"><div class="o-head"><b>${b.id}</b>${Badge(b.status)}<small>${fmtDate(b.createdAt, true)}</small></div><p>${esc(loc(b.itemName))} · 🗓 ${esc(b.date)} ${esc(b.time)} · 👥 ${esc(b.people)}</p><b>${money(b.total)}</b>${b.status === 'pending' ? ` <button class="btn btn-ghost btn-sm danger" data-cancel="${b.id}">${t('cancel')}</button>` : ''}</div>`).join('') : EmptyState('📅', t('noBookings'))}`
    : `<h2>👤 ${t('myInfo')}</h2><form id="pfForm" class="form-grid">
      <label class="field"><span>${t('name')}</span><input name="name" value="${esc(u.name)}"></label>
      <label class="field"><span>${t('phone')}</span><input name="phone" value="${esc(u.phone || '')}"></label>
      <label class="field"><span>${t('email')}</span><input value="${esc(u.email)}" disabled></label>
      <label class="field"><span>${t('joined')}</span><input value="${fmtDate(u.createdAt)}" disabled></label>
      <label class="field full"><span>${t('avatar')}</span><input type="file" name="ava" accept="image/*"></label>
      <button class="btn btn-primary">${t('save')}</button></form>
      <div class="mini-stats"><div><b>${orders.length}</b><span>${t('orders')}</span></div><div><b>${bks.length}</b><span>${t('bookings')}</span></div><div><b>${DB.favs().length}</b><span>${t('favorites')}</span></div><div><b>${money(orders.reduce((s, o) => s + o.total, 0))}</b><span>${t('sum')}</span></div></div>
      <p class="muted small">🔐 JWT: <code class="jwt">${esc((store.get('token') || '').slice(0, 60))}…</code></p>`}
  </div></div></section>`;
  const f = $('#pfForm');
  if (f) f.onsubmit = async e => {
    e.preventDefault(); const users = DB.users(); const me = users.find(x => x.id === u.id);
    me.name = f.elements.name.value.trim() || me.name; me.phone = f.elements.phone.value.trim();
    const file = f.elements.ava.files[0]; if (file) { try { toast(t('uploading'), 'info'); me.avatar = await uploadImage(file); } catch (err) { toast(err.message, 'error'); } }
    DB.saveUsers(users); state.user = me; await Auth.issue(me); toast(t('saved'), 'success'); ProfilePage(view, p, q);
  };
  $$('[data-cancel]').forEach(b => b.onclick = () => { const all = DB.bookings(); const bk = all.find(x => x.id === b.dataset.cancel); bk.status = 'cancelled'; DB.saveBookings(all); emit('bookingStatus', { id: bk.id }); ProfilePage(view, p, q); });
}
/* [45] OrderCard */
function OrderCard(o) {
  const steps = ['new', 'processing', 'shipped', 'delivered']; const idx = steps.indexOf(o.status);
  return `<div class="order"><div class="o-head"><b>${t('orderNo')}${o.id}</b>${Badge(o.status)}<small>${fmtDate(o.createdAt, true)}</small></div>
  ${o.status !== 'cancelled' ? `<div class="track">${steps.map((s, i) => `<span class="${i <= idx ? 'on' : ''}">${t('st_' + s)}</span>`).join('')}</div>` : ''}
  <div class="o-items">${o.items.map(l => `<span>${Img(l.img, '', l.id)} ${esc(loc(l.name))} × ${l.qty}</span>`).join('')}</div>
  <div class="o-foot"><span>${o.paid ? '✅ ' + t('st_paid') : '⏳ ' + t('unpaid')} · ${o.payment}</span><b>${money(o.total)}</b></div></div>`;
}

/* [46] ABOUT */
function About(view) {
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('about')]])}
  <div class="about-hero"><div><h1>${CONFIG.logo} ${esc(CONFIG.siteName)}</h1><p class="lead">${esc(loc(CONFIG.about.text))}</p>
  <div class="stats small">${[[DB.items().length, 'statItems'], [CONFIG.stats[0], 'statClients'], [CONFIG.stats[2], 'statYears']].map(([v, k]) => `<div class="stat"><b data-to="${v}">0</b><span>${t(k)}</span></div>`).join('')}</div></div>${Img(CONFIG.about.img, '', 'about')}</div>
  <h2>${t('whyUs')}</h2><div class="features">${[['🚀', 1], ['🏅', 2], ['🔒', 3], ['💬', 4]].map(([i, n]) => `<div class="feature"><span>${i}</span><h3>${t('feat' + n + 't')}</h3><p>${t('feat' + n + 'd')}</p></div>`).join('')}</div>
  <h2>👥 ${t('about')}</h2><div class="team">${CONFIG.team.map((m, i) => `<div class="member"><img src="https://i.pravatar.cc/200?img=${m.img}" alt="" loading="lazy" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.name)}'"><b>${esc(m.name)}</b><small>${esc(loc(m.role))}</small></div>`).join('')}</div></section>`;
  animateCounters(view);
}
/* [47] CONTACTS + Map + форма */
function Contacts(view) {
  const c = CONFIG.contacts;
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('contacts')]])}<h1>📍 ${t('contacts')}</h1>
  <div class="contacts"><div class="c-cards">
    <a class="c-card" href="tel:${c.phone.replace(/\s/g, '')}"><span>📞</span><b>${t('phone')}</b><small>${c.phone}</small></a>
    <a class="c-card" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener"><span>🟢</span><b>WhatsApp</b><small>+${c.whatsapp}</small></a>
    <a class="c-card" href="https://instagram.com/${c.instagram}" target="_blank" rel="noopener"><span>📸</span><b>Instagram</b><small>@${c.instagram}</small></a>
    <a class="c-card" href="mailto:${c.email}"><span>✉️</span><b>Email</b><small>${c.email}</small></a>
    <div class="c-card"><span>📍</span><b>${t('address')}</b><small>${esc(loc(c.address))}</small></div>
    <div class="c-card"><span>🕘</span><b>${t('workHours')}</b><small>${t('workHoursVal')}</small></div></div>
  <form id="ctForm" class="card-flat" novalidate><h3>✉️ ${t('sendMessage')}</h3>
    <label class="field"><span>${t('name')}</span><input name="name" value="${esc(state.user?.name || '')}"></label>
    <label class="field"><span>${t('phone')}</span><input name="phone" value="${esc(state.user?.phone || '+996')}"></label>
    <label class="field"><span>${t('message')}</span><textarea name="msg" rows="4"></textarea></label>
    <button class="btn btn-primary w100">${t('send')}</button></form></div>
  <h2>🗺 ${t('ourMap')}</h2><div class="map"><iframe title="map" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&z=14&output=embed"></iframe></div></section>`;
  const f = $('#ctForm'); f.onsubmit = e => { e.preventDefault(); if (!validate(f, { name: req, phone: v => isPhone(v) ? '' : t('invalidPhone'), msg: req })) return; const d = Object.fromEntries(new FormData(f)); notify(t('message'), `👤 ${d.name}\n📞 ${d.phone}\n💬 ${d.msg}`); emit('message', { name: d.name }); f.reset(); toast(t('messageSent'), 'success'); };
}
/* [48] FAQ — аккордеон */
function FAQPage(view) {
  const list = [1, 2, 3, 4, 5, 6].map(n => [t('faq' + n + 'q'), t('faq' + n + 'a')]).concat((CONFIG.faq || []).map(x => [loc(x.q), loc(x.a)]));
  view.innerHTML = `<section class="container page narrow">${Breadcrumbs([[t('faq')]])}<h1>❓ ${t('faqTitle')}</h1>
  <div class="search-inline"><span>🔍</span><input id="faqQ" placeholder="${t('search')}..."></div>
  <div class="accordion" id="acc">${list.map(([q, a], i) => `<details class="acc-item" ${i === 0 ? 'open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  <div class="card-flat center">💬 ${t('chatHello')} <button class="btn btn-primary btn-sm" data-action="chat">${t('chatTitle')}</button></div></section>`;
  $('#faqQ').oninput = e => { const v = e.target.value.toLowerCase(); $$('.acc-item').forEach(d => d.style.display = d.textContent.toLowerCase().includes(v) ? '' : 'none'); };
}
/* [49] TRANSLATOR — kg-ru-en котормочу (API) */
function TranslatorPage(view) {
  const opts = s => LANGS.map(l => `<option value="${l}" ${l === s ? 'selected' : ''}>${{ kg: '🇰🇬 Кыргызча', ru: '🇷🇺 Русский', en: '🇬🇧 English' }[l]}</option>`).join('');
  view.innerHTML = `<section class="container page">${Breadcrumbs([[t('translator')]])}<h1>🌐 ${t('translator')}</h1><p class="muted">${t('translatorText')}</p>
  <div class="tr-box card-flat"><div class="tr-col"><select id="trFrom" class="sel">${opts('kg')}</select><textarea id="trIn" rows="7" maxlength="500" placeholder="${t('sourceText')}...">${esc(loc(CONFIG.tagline))}</textarea><small class="muted" id="trCount"></small></div>
  <button class="btn btn-ghost tr-swap" id="trSwap" title="${t('swap')}">⇄</button>
  <div class="tr-col"><select id="trTo" class="sel">${opts('en')}</select><div id="trOut" class="tr-out">—</div><button class="btn btn-ghost btn-sm" id="trCopy">📋</button></div></div>
  <div class="row-c"><button class="btn btn-primary btn-lg" id="trGo">🌐 ${t('translate')}</button></div>
  <h3>${t('language')}: UI</h3><div class="row">${LANGS.map(l => `<button class="btn ${l === state.lang ? 'btn-primary' : 'btn-ghost'}" data-l="${l}">${l.toUpperCase()}</button>`).join('')}</div></section>`;
  const cnt = () => $('#trCount').textContent = $('#trIn').value.length + '/500'; cnt(); $('#trIn').oninput = cnt;
  $('#trSwap').onclick = () => { const a = $('#trFrom').value; $('#trFrom').value = $('#trTo').value; $('#trTo').value = a; const out = $('#trOut').textContent; if (out && out !== '—') $('#trIn').value = out; };
  $('#trGo').onclick = async () => {
    const txt = $('#trIn').value.trim(); if (!txt) return; const from = $('#trFrom').value, to = $('#trTo').value;
    if (from === to) { $('#trOut').textContent = txt; return; }
    $('#trOut').innerHTML = `<span class="spin"></span> ${t('translating')}`;
    try { $('#trOut').textContent = await API.translate(txt, from, to); } catch (e) { $('#trOut').textContent = '⚠️ ' + e.message; }
  };
  $('#trCopy').onclick = () => navigator.clipboard?.writeText($('#trOut').textContent).then(() => toast(t('linkCopied'), 'success'));
  $$('[data-l]').forEach(b => b.onclick = () => setLang(b.dataset.l));
}
/* [50] NOT FOUND */
function NotFound(view) { view.innerHTML = `<section class="container page">${EmptyState('🧭', '404 · ' + t('notFound'), t('notFoundText'), `<a href="#/" class="btn btn-primary">${t('backHome')}</a>`)}</section>`; }

/* =========================================================
   11. ADMIN PANEL — Role-based access, CRUD, Charts
   ========================================================= */
/* [51] AdminLayout */
function AdminLayout(active, content) {
  const links = [['', '📊', 'dashboard'], ['/items', '📦', 'items'], ['/orders', '🧾', 'orders'], ['/bookings', '📅', 'bookings'], ['/users', '👥', 'users'], ['/reviews', '⭐', 'reviews']];
  const newOrders = DB.orders().filter(o => o.status === 'new').length, pend = DB.bookings().filter(b => b.status === 'pending').length;
  return `<section class="admin"><aside class="a-side"><div class="a-brand">🛠 ${t('admin')}</div>
    ${links.map(([h, i, k]) => `<a href="#/admin${h}" class="${active === k ? 'active' : ''}">${i} <span>${t(k)}</span>${k === 'orders' && newOrders ? `<b class="cnt">${newOrders}</b>` : ''}${k === 'bookings' && pend ? `<b class="cnt">${pend}</b>` : ''}</a>`).join('')}
    <a href="#/" class="a-back">← <span>${t('viewSite')}</span></a></aside><div class="a-main">${content}</div></section>`;
}
/* [52] StatCard */
const StatCard = (icon, label, value, sub = '') => `<div class="a-stat"><span>${icon}</span><div><small>${label}</small><b>${value}</b>${sub ? `<em>${sub}</em>` : ''}</div></div>`;

/* [53] Dashboard + Charts (Chart.js) */
async function AdminDashboard(view) {
  view.innerHTML = AdminLayout('dashboard', `<h1>📊 ${t('dashboard')}</h1><div class="a-stats">${'<div class="sk sk-stat"></div>'.repeat(4)}</div>`);
  await sleep(250);
  const orders = DB.orders(), valid = orders.filter(o => o.status !== 'cancelled'), items = DB.items(), users = DB.users();
  const revenue = valid.reduce((s, o) => s + o.total, 0);
  const avg = items.length ? (items.reduce((s, i) => s + itemRating(i), 0) / items.length).toFixed(2) : 0;
  view.innerHTML = AdminLayout('dashboard', `<div class="a-head"><h1>📊 ${t('dashboard')}</h1><span class="live-dot">● LIVE</span></div>
  <div class="a-stats">${StatCard('💰', t('revenue'), money(revenue), `${valid.length} ${t('orders').toLowerCase()}`)}${StatCard('🧾', t('orders'), orders.length, `${orders.filter(o => o.status === 'new').length} ${t('st_new').toLowerCase()}`)}${StatCard('👥', t('users'), users.length, `${users.filter(u => u.role === 'admin').length} admin`)}${StatCard('📦', t('total_items'), items.length, `★ ${avg}`)}${StatCard('📅', t('bookings'), DB.bookings().length)}${StatCard('⭐', t('reviews'), DB.reviews().length)}</div>
  <div class="charts"><div class="chart-card wide"><h3>${t('salesWeek')}</h3><canvas id="chSales"></canvas></div>
    <div class="chart-card"><h3>${t('byCategory')}</h3><canvas id="chCat"></canvas></div>
    <div class="chart-card"><h3>${t('topItems')}</h3><canvas id="chTop"></canvas></div>
    <div class="chart-card"><h3>${t('orderStatus')}</h3><canvas id="chStatus"></canvas></div>
    <div class="chart-card"><h3>📡 ${t('liveFeed')}</h3><div class="feed">${liveFeed.length ? liveFeed.slice(0, 12).map(e => `<p><span class="ev ev-${e.type}">${e.type}</span> ${esc(e.data?.id || e.data?.name || e.data?.item || '')} ${e.data?.total ? '· ' + money(e.data.total) : ''}<small>${fmtDate(e.at, true)}</small></p>`).join('') : `<p class="muted">${t('liveEmpty')}</p>`}</div></div></div>
  <h3>🧾 ${t('orders')}</h3>${OrdersTable(orders.slice(0, 5), true)}`);
  try { await loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'); } catch (e) { $$('.chart-card canvas').forEach(c => c.replaceWith(Object.assign(document.createElement('p'), { className: 'muted', textContent: 'Chart.js CDN жеткиликсиз' }))); return; }
  drawCharts(valid, orders);
}
function drawCharts(valid, orders) {
  (window.__charts || []).forEach(c => c.destroy()); window.__charts = [];
  const cs = getComputedStyle(document.documentElement);
  const primary = cs.getPropertyValue('--primary').trim(), accent = cs.getPropertyValue('--accent').trim(), text = cs.getPropertyValue('--text-2').trim(), grid = cs.getPropertyValue('--line').trim();
  Chart.defaults.color = text; Chart.defaults.borderColor = grid; Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  const palette = [primary, accent, '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - 6 + i); return d; });
  const perDay = days.map(d => valid.filter(o => o.createdAt >= +d && o.createdAt < +d + 864e5).reduce((s, o) => s + o.total, 0));
  const cntDay = days.map(d => valid.filter(o => o.createdAt >= +d && o.createdAt < +d + 864e5).length);
  const mk = (id, cfg) => { const el = $('#' + id); if (el) window.__charts.push(new Chart(el, cfg)); };
  mk('chSales', { type: 'line', data: { labels: days.map(d => fmtDate(d).slice(0, 6)), datasets: [{ label: t('revenue') + ' (сом)', data: perDay, borderColor: primary, backgroundColor: primary + '33', fill: true, tension: .35, pointRadius: 4 }, { label: t('orders'), data: cntDay, borderColor: accent, yAxisID: 'y1', tension: .35 }] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: true }, y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } } } } });
  const byCat = CONFIG.categories.map(c => valid.reduce((s, o) => s + o.items.filter(l => DB.item(l.id)?.category === c.key).reduce((a, l) => a + l.price * l.qty, 0), 0));
  mk('chCat', { type: 'doughnut', data: { labels: CONFIG.categories.map(c => loc(c.name)), datasets: [{ data: byCat, backgroundColor: palette, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } } });
  const top = DB.items().map(i => [loc(i.name), soldCount(i.id)]).sort((a, b) => b[1] - a[1]).slice(0, 6);
  mk('chTop', { type: 'bar', data: { labels: top.map(x => x[0].length > 16 ? x[0].slice(0, 15) + '…' : x[0]), datasets: [{ label: t('pcs'), data: top.map(x => x[1]), backgroundColor: palette, borderRadius: 8 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
  const sts = ['new', 'processing', 'shipped', 'delivered', 'cancelled'];
  mk('chStatus', { type: 'pie', data: { labels: sts.map(s => t('st_' + s)), datasets: [{ data: sts.map(s => orders.filter(o => o.status === s).length), backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } } });
}

/* [54] AdminItems — толук CRUD */
function AdminItems(view, p, q) {
  const PER = 10; let page = 1, query = '', cat = 'all';
  view.innerHTML = AdminLayout('items', `<div class="a-head"><h1>📦 ${t('items')}</h1><button class="btn btn-primary" id="addItem">＋ ${t('addItem')}</button></div>
  <div class="toolbar"><div class="search-inline"><span>🔍</span><input id="aiQ" placeholder="${t('searchTable')}"></div><select id="aiCat" class="sel"><option value="all">${t('all')}</option>${CONFIG.categories.map(c => `<option value="${c.key}">${esc(loc(c.name))}</option>`).join('')}</select></div>
  <div class="table-wrap"><table class="table"><thead><tr><th>${t('image')}</th><th>${t('name')}</th><th>${t('category')}</th><th>${t('price')}</th><th>${t('stock')}</th><th>${t('rating')}</th><th>${t('actions')}</th></tr></thead><tbody id="aiBody"></tbody></table></div><div id="aiPager"></div>`);
  const draw = () => {
    let list = searchItems(DB.items(), query); if (cat !== 'all') list = list.filter(i => i.category === cat);
    const pages = Math.max(1, Math.ceil(list.length / PER)); page = clamp(page, 1, pages);
    $('#aiBody').innerHTML = list.slice((page - 1) * PER, page * PER).map(i => `<tr><td>${Img(i.img, '', i.id, 'thumb')}</td><td><a href="#/item/${i.id}"><b>${esc(loc(i.name))}</b></a>${i.isNew ? ` <span class="badge new sm">${t('new')}</span>` : ''}<br><small class="muted">ID: ${i.id}</small></td><td>${catIcon(i.category)} ${esc(catName(i.category))}</td><td>${money(i.price)}${i.oldPrice ? `<br><s class="muted">${money(i.oldPrice)}</s>` : ''}</td><td><span class="${i.stock > 0 ? 'ok' : 'bad'}">${i.stock}</span></td><td>★ ${itemRating(i)}</td><td class="nowrap"><button class="icon-btn" data-edit="${i.id}" title="${t('edit')}">✏️</button><button class="icon-btn danger" data-del="${i.id}" title="${t('delete')}">🗑</button></td></tr>`).join('') || `<tr><td colspan="7" class="center muted">${t('nothingFound')}</td></tr>`;
    $('#aiPager').innerHTML = Pagination(page, pages);
  };
  draw();
  $('#aiQ').oninput = debounce(e => { query = e.target.value; page = 1; draw(); }, 250);
  $('#aiCat').onchange = e => { cat = e.target.value; page = 1; draw(); };
  $('#aiPager').onclick = e => { const b = e.target.closest('[data-page]'); if (b && !b.disabled) { page = +b.dataset.page; draw(); } };
  $('#addItem').onclick = () => ItemForm(null, draw);
  $('#aiBody').onclick = async e => {
    const ed = e.target.closest('[data-edit]'), dl = e.target.closest('[data-del]');
    if (ed) ItemForm(DB.item(ed.dataset.edit), draw);
    if (dl) { const it = DB.item(dl.dataset.del); if (await confirmBox(loc(it.name))) { DB.saveItems(DB.items().filter(i => i.id !== it.id)); DB.saveCart(DB.cart().filter(l => l.id !== it.id)); emit('items', { id: it.id, action: 'delete' }); toast(t('deleted'), 'success'); draw(); } }
  };
}
/* [55] ItemForm — товар кошуу/өзгөртүү (Cloudinary upload) */
function ItemForm(it, onSave) {
  const isNew = !it; it = it || { id: 'n' + uid(), name: {}, desc: {}, category: CONFIG.categories[0].key, price: 1000, stock: 10, rating: 5, img: '', specs: {}, tags: [] };
  const specsTxt = Object.entries(it.specs || {}).map(([k, v]) => `${loc(CONFIG.specLabels[k]) || k}: ${loc(v)}`).join('\n');
  Modal({ title: (isNew ? '＋ ' + t('addItem') : '✏️ ' + t('editItem')), wide: true, body: `<form id="itForm" class="form-grid" novalidate>
    ${['kg', 'ru', 'en'].map(l => `<label class="field"><span>${t('name' + l[0].toUpperCase() + l[1])}${l === 'kg' ? ' *' : ''}</span><input name="name_${l}" value="${esc(it.name?.[l] || '')}"></label>`).join('')}
    <label class="field"><span>${t('category')}</span><select name="category">${CONFIG.categories.map(c => `<option value="${c.key}" ${c.key === it.category ? 'selected' : ''}>${esc(loc(c.name))}</option>`).join('')}</select></label>
    <label class="field"><span>${t('price')} (сом) *</span><input type="number" name="price" min="0" value="${it.price}"></label>
    <label class="field"><span>${t('oldPrice')}</span><input type="number" name="oldPrice" min="0" value="${it.oldPrice || ''}"></label>
    <label class="field"><span>${t('stock')}</span><input type="number" name="stock" min="0" value="${it.stock}"></label>
    <label class="check field"><input type="checkbox" name="isNew" ${it.isNew ? 'checked' : ''}> ${t('markNew')}</label>
    ${['kg', 'ru', 'en'].map(l => `<label class="field full"><span>${t('desc' + l[0].toUpperCase() + l[1])}</span><textarea name="desc_${l}" rows="2">${esc(it.desc?.[l] || '')}</textarea></label>`).join('')}
    <div class="field full"><span>${t('image')}</span><div class="upload"><div class="up-prev" id="upPrev">${it.img ? `<img src="${esc(it.img)}" alt="">` : '🖼'}</div><div class="up-ctrl"><label class="btn btn-ghost btn-sm">📤 ${t('uploadImage')}<input type="file" id="upFile" accept="image/*" hidden></label><small class="muted">${CONFIG.CLOUDINARY_CLOUD ? 'Cloudinary ✔' : 'Cloudinary: demo (base64)'}</small><input name="img" placeholder="${t('orUrl')}" value="${esc(it.img && !it.img.startsWith('data:') ? it.img : '')}"></div></div></div>
    <label class="field full"><span>${t('specs')} <small class="muted">(${t('specsHint')})</small></span><textarea name="specs" rows="4">${esc(specsTxt)}</textarea></label>
    <label class="field full"><span>Tags</span><input name="tags" value="${esc((it.tags || []).join(', '))}"></label></form>`,
    actions: [{ label: t('cancel'), onClick: c => c() }, { label: '💾 ' + t('save'), cls: 'btn-primary', onClick: (close) => {
      const f = $('#itForm');
      if (!validate(f, { name_kg: req, price: v => v !== '' && +v >= 0 ? '' : t('required') })) return;
      const g = n => f.elements[n].value.trim();
      const specs = {}; g('specs').split('\n').map(s => s.split(':')).filter(a => a.length > 1).forEach(([k, ...v]) => { const key = Object.keys(CONFIG.specLabels).find(x => loc(CONFIG.specLabels[x]) === k.trim()) || k.trim(); specs[key] = v.join(':').trim(); });
      const data = { ...it, name: { kg: g('name_kg'), ru: g('name_ru') || g('name_kg'), en: g('name_en') || g('name_kg') }, desc: { kg: g('desc_kg'), ru: g('desc_ru') || g('desc_kg'), en: g('desc_en') || g('desc_kg') }, category: g('category'), price: +g('price'), oldPrice: +g('oldPrice') || null, stock: +g('stock') || 0, isNew: f.elements.isNew.checked, img: f.dataset.upload || g('img') || it.img || `https://picsum.photos/seed/${it.id}/640/480`, specs, tags: g('tags').split(',').map(s => s.trim()).filter(Boolean) };
      data.gallery = [data.img, ...((it.gallery || []).filter(x => x !== it.img))].slice(0, 4);
      const items = DB.items(); const i = items.findIndex(x => x.id === it.id); if (i >= 0) items[i] = data; else items.unshift(data);
      DB.saveItems(items); emit('items', { id: data.id, action: isNew ? 'create' : 'update', name: data.name.kg });
      toast(isNew ? t('addedItem') : t('updatedItem'), 'success'); close(); onSave && onSave();
    } }],
    onOpen: (w) => {
      $('#upFile', w).onchange = async e => { const file = e.target.files[0]; if (!file) return; $('#upPrev', w).innerHTML = '<span class="spin"></span>'; try { const url = await uploadImage(file); $('#itForm', w).dataset.upload = url; $('#upPrev', w).innerHTML = `<img src="${url}" alt="">`; toast('✔ ' + t('uploadImage'), 'success'); } catch (err) { $('#upPrev', w).textContent = '⚠️'; toast(err.message, 'error'); } };
      $('[name="img"]', w).oninput = e => { if (e.target.value) $('#upPrev', w).innerHTML = `<img src="${esc(e.target.value)}" alt="">`; };
    } });
}

/* [56] OrdersTable */
function OrdersTable(orders, compact) {
  const sts = ['new', 'processing', 'shipped', 'delivered', 'cancelled'];
  return `<div class="table-wrap"><table class="table"><thead><tr><th>№</th><th>${t('customer')}</th><th>${t('date')}</th><th>${t('sum')}</th><th>${t('payStatus')}</th><th>${t('status')}</th>${compact ? '' : `<th>${t('actions')}</th>`}</tr></thead><tbody>
  ${orders.map(o => `<tr><td><b>${o.id}</b></td><td>${esc(o.customer)}<br><small class="muted">${esc(o.phone)}</small></td><td>${fmtDate(o.createdAt, true)}</td><td><b>${money(o.total)}</b><br><small class="muted">${o.items.length} ${t('items_count')}</small></td><td>${o.paid ? '✅' : '⏳'} ${o.payment}</td>
  <td>${compact ? Badge(o.status) : `<select class="sel sm st-sel" data-ost="${o.id}">${sts.map(s => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${t('st_' + s)}</option>`).join('')}</select>`}</td>
  ${compact ? '' : `<td class="nowrap"><button class="icon-btn" data-oview="${o.id}">👁</button><button class="icon-btn danger" data-odel="${o.id}">🗑</button></td>`}</tr>`).join('') || `<tr><td colspan="7" class="center muted">${t('noOrders')}</td></tr>`}</tbody></table></div>`;
}
/* [57] AdminOrders */
function AdminOrders(view) {
  let filter = 'all', q = '';
  view.innerHTML = AdminLayout('orders', `<div class="a-head"><h1>🧾 ${t('orders')}</h1></div><div class="toolbar"><div class="search-inline"><span>🔍</span><input id="aoQ" placeholder="${t('searchTable')}"></div><div class="seg" id="aoSeg">${['all', 'new', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => `<button data-s="${s}" class="${s === 'all' ? 'active' : ''}">${s === 'all' ? t('all') : t('st_' + s)}</button>`).join('')}</div></div><div id="aoBody"></div>`);
  const draw = () => { let list = DB.orders(); if (filter !== 'all') list = list.filter(o => o.status === filter); if (q) list = list.filter(o => (o.id + o.customer + o.phone).toLowerCase().includes(q)); $('#aoBody').innerHTML = OrdersTable(list); };
  draw();
  $('#aoQ').oninput = debounce(e => { q = e.target.value.toLowerCase(); draw(); }, 250);
  $('#aoSeg').onclick = e => { const b = e.target.closest('button'); if (!b) return; filter = b.dataset.s; $$('#aoSeg button').forEach(x => x.classList.toggle('active', x === b)); draw(); };
  $('#aoBody').onchange = e => { const s = e.target.closest('[data-ost]'); if (!s) return; const all = DB.orders(); const o = all.find(x => x.id === s.dataset.ost); o.status = s.value; DB.saveOrders(all); emit('orderStatus', { id: o.id, status: o.status }); toast(`${o.id}: ${t('st_' + o.status)}`, 'success'); };
  $('#aoBody').onclick = async e => {
    const v = e.target.closest('[data-oview]'), d = e.target.closest('[data-odel]');
    if (v) { const o = DB.orders().find(x => x.id === v.dataset.oview); Modal({ title: t('orderNo') + o.id, wide: true, body: `${OrderCard(o)}<p>👤 ${esc(o.customer)} · 📞 ${esc(o.phone)} · ✉️ ${esc(o.email || '—')}</p><p>📍 ${esc(o.city)}, ${esc(o.address)}</p>${o.comment ? `<p>💬 ${esc(o.comment)}</p>` : ''}` }); }
    if (d && await confirmBox(d.dataset.odel)) { DB.saveOrders(DB.orders().filter(x => x.id !== d.dataset.odel)); toast(t('deleted'), 'success'); draw(); }
  };
}
/* [58] AdminBookings */
function AdminBookings(view) {
  const draw = () => { const list = DB.bookings(); view.innerHTML = AdminLayout('bookings', `<div class="a-head"><h1>📅 ${t('bookings')}</h1></div><div class="table-wrap"><table class="table"><thead><tr><th>№</th><th>${t('customer')}</th><th>${t('items')}</th><th>${t('date')}</th><th>${t('people')}</th><th>${t('sum')}</th><th>${t('status')}</th><th>${t('actions')}</th></tr></thead><tbody>${list.map(b => `<tr><td><b>${b.id}</b></td><td>${esc(b.name)}<br><small class="muted">${esc(b.phone)}</small></td><td>${esc(loc(b.itemName))}</td><td>${esc(b.date)} ${esc(b.time)}</td><td>${esc(b.people)}</td><td>${money(b.total)}</td><td>${Badge(b.status)}</td><td class="nowrap"><button class="icon-btn" data-bst="confirmed" data-id="${b.id}" title="OK">✔</button><button class="icon-btn" data-bst="cancelled" data-id="${b.id}" title="${t('cancel')}">✖</button><button class="icon-btn danger" data-bdel="${b.id}">🗑</button></td></tr>`).join('') || `<tr><td colspan="8" class="center muted">${t('noBookings')}</td></tr>`}</tbody></table></div>`);
    $$('[data-bst]').forEach(btn => btn.onclick = () => { const all = DB.bookings(); const b = all.find(x => x.id === btn.dataset.id); b.status = btn.dataset.bst; DB.saveBookings(all); emit('bookingStatus', { id: b.id }); toast(`${b.id}: ${t('st_' + b.status)}`, 'success'); draw(); });
    $$('[data-bdel]').forEach(btn => btn.onclick = async () => { if (await confirmBox(btn.dataset.bdel)) { DB.saveBookings(DB.bookings().filter(x => x.id !== btn.dataset.bdel)); draw(); } });
  };
  draw();
}
/* [59] AdminUsers — ролдорду башкаруу */
function AdminUsers(view) {
  const draw = () => { const list = DB.users(); view.innerHTML = AdminLayout('users', `<div class="a-head"><h1>👥 ${t('users')}</h1></div><div class="table-wrap"><table class="table"><thead><tr><th></th><th>${t('name')}</th><th>${t('email')}</th><th>${t('phone')}</th><th>${t('joined')}</th><th>${t('role')}</th><th>${t('orders')}</th><th>${t('actions')}</th></tr></thead><tbody>${list.map(u => `<tr><td><span class="ava">${u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : esc(u.name[0])}</span></td><td><b>${esc(u.name)}</b>${u.id === state.user.id ? ` <small>(${t('you')})</small>` : ''}<br><small class="muted">${u.provider || 'email'}</small></td><td>${esc(u.email)}</td><td>${esc(u.phone || '—')}</td><td>${fmtDate(u.createdAt)}</td><td><select class="sel sm" data-role="${u.id}" ${u.id === state.user.id ? 'disabled' : ''}><option value="user" ${u.role === 'user' ? 'selected' : ''}>user</option><option value="admin" ${u.role === 'admin' ? 'selected' : ''}>admin</option></select></td><td>${DB.orders().filter(o => o.userId === u.id).length}</td><td>${u.id === state.user.id ? '' : `<button class="icon-btn danger" data-udel="${u.id}">🗑</button>`}</td></tr>`).join('')}</tbody></table></div>`);
    $$('[data-role]').forEach(s => s.onchange = () => { const all = DB.users(); all.find(u => u.id === s.dataset.role).role = s.value; DB.saveUsers(all); toast(t('saved'), 'success'); });
    $$('[data-udel]').forEach(b => b.onclick = async () => { if (await confirmBox(b.dataset.udel)) { DB.saveUsers(DB.users().filter(u => u.id !== b.dataset.udel)); draw(); } });
  };
  draw();
}
/* [60] AdminReviews — пикирлерди модерациялоо */
function AdminReviews(view) {
  const draw = () => { const list = DB.reviews().sort((a, b) => b.date - a.date); view.innerHTML = AdminLayout('reviews', `<div class="a-head"><h1>⭐ ${t('reviews')} (${list.length})</h1></div><div class="rev-admin">${list.map(r => { const it = DB.item(r.itemId); return `<div class="review card-flat"><div class="rev-head"><span class="ava">${esc(r.author[0])}</span><div><b>${esc(r.author)}</b><small class="muted">${fmtDate(r.date)} · ${it ? `<a href="#/item/${it.id}">${esc(loc(it.name))}</a>` : '—'}</small></div>${Stars(r.rating)}<button class="icon-btn danger" data-rdel="${r.id}">🗑</button></div><p>${esc(r.text)}</p></div>`; }).join('') || EmptyState('⭐', t('noReviews'))}</div>`);
    $$('[data-rdel]').forEach(b => b.onclick = async () => { if (await confirmBox(t('reviews'))) { DB.saveReviews(DB.reviews().filter(r => r.id !== b.dataset.rdel)); draw(); } });
  };
  draw();
}

/* =========================================================
   12. ROUTER — Private routes + Role-based access
   ========================================================= */
const routes = [
  ['/', Home], ['/catalog', Catalog], ['/item/:id', ItemPage], ['/cart', CartPage],
  ['/checkout', CheckoutPage, 'auth'], ['/booking/:id', BookingPage, 'auth'], ['/profile', ProfilePage, 'auth'],
  ['/favorites', FavoritesPage], ['/login', LoginPage], ['/register', RegisterPage],
  ['/about', About], ['/contacts', Contacts], ['/faq', FAQPage], ['/translate', TranslatorPage],
  ['/admin', AdminDashboard, 'admin'], ['/admin/items', AdminItems, 'admin'], ['/admin/orders', AdminOrders, 'admin'],
  ['/admin/bookings', AdminBookings, 'admin'], ['/admin/users', AdminUsers, 'admin'], ['/admin/reviews', AdminReviews, 'admin'],
].map(([pat, comp, guard]) => { const keys = []; const re = new RegExp('^' + pat.replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '/?$'); return { re, keys, comp, guard }; });

let lastPath = null;
async function router() {
  const hash = location.hash.slice(1) || '/';
  const [path, qs] = hash.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs || ''));
  let r = routes.find(r => r.re.test(path)); const params = {};
  if (r) { const m = path.match(r.re); r.keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1])); }
  if (r && r.guard) {
    await Auth.restore();
    if (!state.user) { toast(t('needLogin'), 'info'); location.replace('#/login?next=' + encodeURIComponent('#' + hash)); return; }
    if (r.guard === 'admin' && state.user.role !== 'admin') { toast('⛔ ' + t('noAccess') + ' (admin)', 'error'); location.replace('#/'); return; }
  }
  const view = $('#app'); closeBurger();
  document.body.classList.toggle('is-admin', path.startsWith('/admin'));
  try { await (r ? r.comp : NotFound)(view, params, query); }
  catch (err) { ErrorBoundary(view, err); }
  if (lastPath !== path) { window.scrollTo(0, 0); lastPath = path; }
  updateActiveNav();
  document.title = `${CONFIG.siteName} — ${loc(CONFIG.tagline)}`;
}

/* =========================================================
   13. BOOT — колдонмону ишке киргизүү
   ========================================================= */
async function boot() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.lang === 'kg' ? 'ky' : state.lang;
  renderHeader(); renderFooter(); renderChatbot(); BackToTop(); CookieBanner();
  $('#app').innerHTML = `<section class="container sec"><div class="sk sk-hero"></div><div class="grid">${SkeletonGrid(4)}</div></section>`;
  try {
    await seedUsers();
    await loadData();
    await Auth.restore();
    renderHeader();
  } catch (err) { ErrorBoundary($('#app'), err); return; }
  window.addEventListener('hashchange', router);
  await router();
  initFirebaseRealtime();
  API.rates().then(ok => { if (ok) { const c = $('#rateChip'); if (c) c.textContent = `💱 1$ = ${(1 / state.rates.USD).toFixed(2)} сом · live`; } });
  document.getElementById('preloader')?.remove();
}
document.addEventListener('DOMContentLoaded', boot);

