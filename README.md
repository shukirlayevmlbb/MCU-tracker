# Marvel Xronologiya Tracker

MCU ni xronologik tartibda kuzatib boruvchi tracker. Progress brauzerda (localStorage) saqlanadi.

## Xususiyatlar
- 53 ta film, serial va maxsus epizod — xronologik tartibda
- Har bir qism alohida: ✓ Ko'rdim / ✗ O'tkazdim
- Dark / Light mavzu
- Umumiy va "keyingi navbat" progressi
- Qidiruv va filtr
- Mobile-first
- Posterlar TMDB orqali (lazy + skeleton)

## Mahalliy ishga tushirish

### 1. TMDB API kalit
1. https://www.themoviedb.org/signup — ro'yxatdan o'ting
2. Settings → API → "Create" → API key oling
3. `.env.local` fayl yarating:
