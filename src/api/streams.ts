import { request, withJson } from './http'
import type { Stream } from './types'

const streamUrl = (streamId: number, suffix = '') => `/api/streams/${streamId}${suffix}`
const offerUrl = (streamId: number, offerPk: number, suffix = '') =>
  streamUrl(streamId, `/offers/${offerPk}${suffix}`)

export const fetchStreams = (campaignId: number) =>
  request<Stream[]>(`/api/campaigns/${campaignId}/streams`)

export const syncStreams = (campaignId: number) =>
  request<Stream[]>(`/api/campaigns/${campaignId}/streams/sync`, withJson('POST'))

export const addStreamOffer = (streamId: number, offerId: number) =>
  request<Stream>(streamUrl(streamId, '/offers'), withJson('POST', { offer_id: offerId }))

export const removeStreamOffer = (streamId: number, offerPk: number) =>
  request<Stream>(offerUrl(streamId, offerPk), withJson('DELETE'))

export const restoreStreamOffer = (streamId: number, offerPk: number) =>
  request<Stream>(offerUrl(streamId, offerPk, '/restore'), withJson('POST'))

export const pinStreamOffer = (streamId: number, offerPk: number, pinned: boolean) =>
  request<Stream>(offerUrl(streamId, offerPk), withJson('PATCH', { pinned }))

export const cancelStream = (streamId: number) =>
  request<Stream>(streamUrl(streamId, '/cancel'), withJson('POST'))

export const pushStream = (streamId: number) =>
  request<Stream>(streamUrl(streamId, '/push'), withJson('POST'))
