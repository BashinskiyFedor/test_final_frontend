import type { StreamOffer } from '../api'

interface Props {
  offer: StreamOffer
  disabled: boolean
  onPin: () => void
  onRemove: () => void
  onRestore: () => void
}

export default function OfferRow({ offer, disabled, onPin, onRemove, onRestore }: Props) {
  return (
    <tr className={offer.active ? '' : 'removed'}>
      <td>
        #{offer.offer_id} — {offer.name}
        {offer.is_new && <span className="badge new">новый</span>}
        {!offer.active && <span className="badge">removed</span>}
      </td>
      <td>
        {offer.share}%{offer.pinned && ' 📌'}
      </td>
      <td className="actions">
        {offer.active ? (
          <>
            <button className="link" disabled={disabled} onClick={onPin}>
              {offer.pinned ? 'Unpin' : 'Pin'}
            </button>
            <button className="link danger" disabled={disabled} onClick={onRemove}>
              Remove
            </button>
          </>
        ) : (
          <button className="link" disabled={disabled} onClick={onRestore}>
            Bring back
          </button>
        )}
      </td>
    </tr>
  )
}
