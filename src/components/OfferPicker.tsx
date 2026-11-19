import { useEffect, useState } from 'react'
import { searchOffers, type Offer } from '../api'
import { errorText } from '../hooks/errorText'

interface Props {
  disabled?: boolean
  onAdd: (offerId: number) => Promise<void>
}

/** Поиск оффера в Keitaro (через наш API) по названию или ID и добавление в поток. */
export default function OfferPicker({ disabled, onAdd }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Offer[]>([])
  const [selected, setSelected] = useState<Offer | null>(null)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    const t = setTimeout(() => {
      searchOffers(query)
        .then((r) => {
          if (cancelled) return
          setResults(r)
          setSearchError(null)
        })
        .catch((err) => {
          if (cancelled) return
          setResults([])
          setSearchError(errorText(err, 'Не удалось найти офферы'))
        })
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [query, open])

  async function add() {
    if (!selected) return
    setBusy(true)
    try {
      await onAdd(selected.id)
      setSelected(null)
      setQuery('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="picker">
      <div className="picker-input">
        <input
          placeholder="Найти оффер по названию или ID"
          value={selected ? `#${selected.id} — ${selected.name}` : query}
          disabled={disabled || busy}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => {
            setSelected(null)
            setQuery(e.target.value)
          }}
        />
        {open && !selected && results.length > 0 && (
          <ul className="picker-list">
            {results.map((o) => (
              <li
                key={o.id}
                onMouseDown={() => {
                  setSelected(o)
                  setOpen(false)
                }}
              >
                #{o.id} — {o.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {searchError && <span className="error" role="alert">{searchError}</span>}
      <button type="button" onClick={add} disabled={!selected || disabled || busy}>
        Добавить
      </button>
    </div>
  )
}
