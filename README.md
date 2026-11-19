# Фронтенд обёртки над Keitaro

React + TypeScript + Vite. Бэкенд и общее описание проекта: `../README.md`.

```bash
npm install
npm run dev      # http://localhost:5173, запросы /api проксируются на http://localhost:8000
npm run build    # production-сборка в dist/
npm run lint
```

Если фронт и API на разных адресах без прокси, задайте `VITE_API_URL` (см. `.env.example`) и добавьте адрес
фронта в `CORS_ORIGINS` бэкенда.

## Структура `src/`

| Путь | Назначение |
|---|---|
| `api/` | HTTP-клиент и вызовы API (`http.ts`, `campaigns.ts`, `streams.ts`, типы) |
| `hooks/` | `useOffers`, `useCampaigns`, `useStreamEditor` (состояние редактора, занятость и ошибки по потокам) |
| `pages/` | `CampaignsPage` (создание и список), `EditorPage` (редактор кампании) |
| `components/` | `CampaignForm`, `CampaignList`, `StreamCard`, `OfferRow`, `OfferPicker` |

Роутинг: `/` — кампании, `/campaigns/:id` — редактор.
