export interface CampaignInput {
  name: string
  country: string
  offer_id: number
}

export interface CampaignCreated {
  campaign_id: number
  stream_id: number
  name: string
  alias: string
  country: string
  offer_id: number
  already_exists: boolean
}

export interface StoredCampaign {
  id: number
  keitaro_campaign_id: number
  keitaro_stream_id: number
  name: string
  alias: string
  country: string
  offer_id: number
  created_at: string
}

export interface Offer {
  id: number
  name: string
}

export interface StreamOffer {
  id: number
  offer_id: number
  name: string
  share: number
  pinned: boolean
  active: boolean
  in_keitaro: boolean
  is_new: boolean
}

export interface Stream {
  id: number
  keitaro_stream_id: number
  name: string
  type: string
  has_offers: boolean
  dirty: boolean
  offers: StreamOffer[]
}
