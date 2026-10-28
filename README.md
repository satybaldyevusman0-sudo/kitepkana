# KitepKana

Чоң SPA сайт: **HTML + CSS + Vanilla JavaScript**. Маалыматтар **API** аркылуу алынат (`api/items.json`, 12 товар).

## 📁 Файлдар
```
02-kitepkana/
├── index.html        ← негизги HTML
├── style.css         ← бардык стилдер (күн/түн темасы, адаптив)
├── app.js            ← бардык логика (60+ компонент)
├── api/items.json    ← API маалыматтары (товарлар, пикирлер)
└── vercel.json       ← Vercel жөндөөсү
```

## ▶️ Кантип ачуу керек
1. VS Code'до папканы ачыңыз.
2. **Live Server** кеңейтүүсү менен `index.html` → *Open with Live Server*.
   (Файлды түз эки жолу басып ачсаңыз, `fetch` API иштебейт. Ошондуктан Live Server же Vercel керек.)

## 🚀 Vercel'ге жүктөө (deploy)
**1-жол (эң оңой):** https://vercel.com → *Add New → Project* → папканы GitHub'га жүктөп, репозиторийди тандаңыз → *Deploy*.
**2-жол (терминал):**
```bash
npm i -g vercel
cd 02-kitepkana
vercel          # биринчи жолу логин сурайт
vercel --prod   # акыркы версия
```

## 🔑 Демо аккаунттар
| Ролу | Email | Сырсөз |
|---|---|---|
| 👑 Admin | admin@site.kg | admin123 |
| 👤 User | user@site.kg | user123 |

Промокод себетте көрсөтүлгөн. Тест карта (Stripe demo): `4242 4242 4242 4242`, каалаган мөөнөт/CVC. `4000 0000 0000 0002` — четке кагылат.

## ✅ Негизги функциялар
Корзина · Бронь · Регистрация/Логин · Заказ/купить · Админ панель · Товардын толук сүрөттөмөсү · Аты боюнча издөө + фильтрлер · Товар кошуу/өчүрүү · Котормочу kg-ru-en (UI + MyMemory API) · Адаптивдүү дизайн · Заказ берүү · Бургер меню · Күн/түн темасы · Тандалмалар · Пикирлер жана рейтинг

## ⭐ Кошумча функциялар
- **JWT Auth + Private Routes** — HS256 токен (`crypto.subtle`), `/checkout`, `/profile`, `/booking` корголгон
- **Role-based access** — `/admin/*` админге гана
- **Пагинация** — каталог жана админ таблицасы
- **Google / GitHub OAuth** — GitHub чыныгы API'ден профиль алат; Google `GOOGLE_CLIENT_ID` жазсаңыз чыныгы иштейт
- **Admin CRUD** — товар, заказ, брон, колдонуучу, пикир
- **Loading skeleton UI** · **Error boundary**
- **Chart / статистика** — Chart.js (React'тагы recharts'тын аналогу)
- **Payment** — Stripe demo + Post.kg demo
- **Multilanguage (i18n)** — KG / RU / EN
- **Image upload (Cloudinary)**
- **Telegram-бот, Email, Realtime (BroadcastChannel + Firebase), ChatBot, Валюта API**

## ⚙️ Ачкычтарды кошуу (app.js башындагы CONFIG)
```js
TELEGRAM_BOT_TOKEN: '123:ABC...',   // @BotFather'ден
TELEGRAM_CHAT_ID: '123456789',      // @userinfobot'тон
ORDER_EMAIL: 'сиздин@gmail.com',    // formsubmit.co (биринчи катты тастыктаңыз)
GOOGLE_CLIENT_ID: '...apps.googleusercontent.com',
CLOUDINARY_CLOUD: 'cloud_name', CLOUDINARY_PRESET: 'unsigned_preset',
FIREBASE_DB_URL: 'https://xxx-default-rtdb.firebaseio.com',
API_URL: ''  // бош болсо api/items.json; MockAPI шилтемесин да койсоңуз болот
```
Ачкычтар жок болсо, функциялар демо режимде иштейт.

> ⚠️ Бул сабак/экзамен үчүн жасалган фронтенд долбоор. Маалыматтар браузердин localStorage'ында сакталат. Telegram токенин чыныгы долбоордо backend'ке жашыруу керек.
# kitepkana
