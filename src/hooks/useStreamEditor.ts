import { useCallback, useEffect, useState } from 'react'
import { fetchCampaign, fetchStreams, syncStreams, type Stream, type StoredCampaign } from '../api'
import { errorText } from './errorText'

/** Состояние редактора кампании: потоки, загрузка, занятость и ошибки по каждому потоку отдельно. */
export function useStreamEditor(campaignId: number) {
  const [campaign, setCampaign] = useState<StoredCampaign | null>(null)
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busyStreams, setBusyStreams] = useState<ReadonlySet<number>>(new Set())
  const [streamErrors, setStreamErrors] = useState<Readonly<Record<number, string>>>({})

  const sync = useCallback(async () => {
    setSyncing(true)
    setError(null)
    try {
      setStreams(await syncStreams(campaignId))
    } catch (err) {
      setError(errorText(err))
    } finally {
      setSyncing(false)
    }
  }, [campaignId])

  useEffect(() => {
    ;(async () => {
      try {
        setCampaign(await fetchCampaign(campaignId))
        const stored = await fetchStreams(campaignId)
        if (stored.length > 0) setStreams(stored)
        else await sync() // первый вход: потоков у нас ещё нет — подтягиваем из Keitaro
      } catch (err) {
        setError(errorText(err))
      } finally {
        setLoading(false)
      }
    })()
  }, [campaignId, sync])

  /** Выполняет действие над потоком: блокирует его на время запроса и показывает ошибку именно у него. */
  const act = useCallback(async (streamId: number, action: () => Promise<Stream>) => {
    setBusyStreams((prev) => new Set(prev).add(streamId))
    setStreamErrors(({ [streamId]: _cleared, ...rest }) => rest)
    try {
      const updated = await action()
      setStreams((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    } catch (err) {
      setStreamErrors((prev) => ({ ...prev, [streamId]: errorText(err) }))
    } finally {
      setBusyStreams((prev) => {
        const next = new Set(prev)
        next.delete(streamId)
        return next
      })
    }
  }, [])

  return { campaign, streams, loading, syncing, error, busyStreams, streamErrors, sync, act }
}
