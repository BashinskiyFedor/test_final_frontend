import { request, withJson } from './http'
import type { CampaignCreated, CampaignInput, Offer, StoredCampaign } from './types'

export const createCampaign = (input: CampaignInput) =>
  request<CampaignCreated>('/api/campaigns', withJson('POST', input))

export const fetchCampaigns = () => request<StoredCampaign[]>('/api/campaigns?limit=1000')

export const fetchCampaign = (id: number) => request<StoredCampaign>(`/api/campaigns/${id}`)

// refresh: форма читает актуальный список из Keitaro, а создание кампании проверяет оффер по кэшу.
export const fetchOffers = () => request<Offer[]>('/api/offers?refresh=true')

export const searchOffers = (query: string) =>
  request<Offer[]>(`/api/offers?q=${encodeURIComponent(query)}&limit=20`)
