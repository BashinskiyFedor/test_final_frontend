import { useEffect, useState } from 'react'
import { fetchOffers, type Offer } from '../api'
import { errorText } from './errorText'

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOffers()
      .then(setOffers)
      .catch((err) => setError(errorText(err, 'Не удалось загрузить офферы')))
      .finally(() => setLoading(false))
  }, [])

  return { offers, loading, error }
}
