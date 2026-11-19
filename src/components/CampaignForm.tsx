import { useState, type FormEvent } from 'react'
import { createCampaign, type CampaignCreated, type Offer } from '../api'
import { errorText } from '../hooks/errorText'

interface Props {
  offers: Offer[]
  offersLoading: boolean
  onCreated: (result: CampaignCreated) => void
}

export default function CampaignForm({ offers, offersLoading, onCreated }: Props) {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [offerId, setOfferId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setLoading(true)
    try {
      const result = await createCampaign({
        name: name.trim(),
        country: country.trim().toUpperCase(),
        offer_id: Number(offerId),
      })
      setNotice(
        result.already_exists
          ? `Кампания «${result.name}» уже существует`
          : `Кампания «${result.name}» создана`,
      )
      setName('')
      setCountry('')
      setOfferId('')
      onCreated(result)
    } catch (err) {
      setError(errorText(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <label>
        Название кампании
        <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={255} />
      </label>
      <label>
        Гео (код страны)
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="US"
          required
          minLength={2}
          maxLength={2}
          pattern="[A-Za-z]{2}"
          title="Две латинские буквы, например US"
        />
      </label>
      <label>
        Оффер Keitaro
        <select
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          required
          disabled={offersLoading}
        >
          <option value="" disabled>
            {offersLoading ? 'Загрузка…' : 'Выберите оффер'}
          </option>
          {offers.map((o) => (
            <option key={o.id} value={o.id}>
              #{o.id} — {o.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Создаём…' : 'Создать кампанию'}
      </button>
      {error && <p className="error" role="alert">{error}</p>}
      {notice && <p className="notice">{notice}</p>}
    </form>
  )
}
