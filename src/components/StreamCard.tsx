import {
  addStreamOffer,
  cancelStream,
  pinStreamOffer,
  pushStream,
  removeStreamOffer,
  restoreStreamOffer,
  type Stream,
} from '../api'
import OfferPicker from './OfferPicker'
import OfferRow from './OfferRow'

interface Props {
  stream: Stream
  busy: boolean
  error?: string
  onAction: (streamId: number, action: () => Promise<Stream>) => Promise<void>
}

export default function StreamCard({ stream, busy, error, onAction }: Props) {
  const run = (action: () => Promise<Stream>) => onAction(stream.id, action)

  return (
    <section className={`card stream${stream.dirty ? ' dirty' : ''}`}>
      <div className="row">
        <h2>
          {stream.name} <span className="badge">{stream.type}</span>
        </h2>
        {stream.has_offers && (
          <div className="actions">
            <button disabled={busy || !stream.dirty} onClick={() => run(() => pushStream(stream.id))}>
              Push
            </button>
            <button
              className="secondary"
              disabled={busy || !stream.dirty}
              onClick={() => run(() => cancelStream(stream.id))}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      {!stream.has_offers ? (
        <p className="muted">Поток без офферов — содержимое не показываем</p>
      ) : (
        <>
          {stream.dirty && <p className="muted">Есть неопубликованные изменения</p>}
          <table>
            <thead>
              <tr>
                <th>Оффер</th>
                <th>Вес</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stream.offers.map((offer) => (
                <OfferRow
                  key={offer.id}
                  offer={offer}
                  disabled={busy}
                  onPin={() => run(() => pinStreamOffer(stream.id, offer.id, !offer.pinned))}
                  onRemove={() => run(() => removeStreamOffer(stream.id, offer.id))}
                  onRestore={() => run(() => restoreStreamOffer(stream.id, offer.id))}
                />
              ))}
            </tbody>
          </table>
          <OfferPicker
            disabled={busy}
            onAdd={(offerId) => run(() => addStreamOffer(stream.id, offerId))}
          />
        </>
      )}
    </section>
  )
}
