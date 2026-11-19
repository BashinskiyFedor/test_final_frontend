import { useCallback, useEffect, useState } from 'react'
import { fetchCampaigns, type StoredCampaign } from '../api'
import { errorText } from './errorText'

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<StoredCampaign[]>([])
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetchCampaigns()
      .then((result) => {
        if (cancelled) return
        setCampaigns(result)
        setError(null)
      })
      .catch((err) => !cancelled && setError(errorText(err, 'Не удалось загрузить кампании')))
    return () => {
      cancelled = true
    }
  }, [version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { campaigns, error, reload }
}
