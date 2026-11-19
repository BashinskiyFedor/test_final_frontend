import { Link, useParams } from 'react-router-dom'
import StreamCard from '../components/StreamCard'
import { useStreamEditor } from '../hooks/useStreamEditor'

export default function EditorPage() {
  const campaignId = Number(useParams().id)
  const { campaign, streams, loading, syncing, error, busyStreams, streamErrors, sync, act } =
    useStreamEditor(campaignId)

  return (
    <main className="container wide">
      <Link to="/">← Все кампании</Link>
      <div className="row">
        <h1>{campaign ? campaign.name : 'Кампания'}</h1>
        <button onClick={sync} disabled={syncing || !campaign}>
          {syncing ? 'Загрузка…' : 'Fetch streams'}
        </button>
      </div>
      {campaign && (
        <p className="muted">
          Keitaro #{campaign.keitaro_campaign_id} · alias <code>{campaign.alias}</code> · гео{' '}
          {campaign.country}
        </p>
      )}
      {error && <p className="error" role="alert">{error}</p>}
      {loading && <p className="muted">Загрузка…</p>}
      {!loading && streams.length === 0 && !error && <p className="muted">В кампании нет потоков</p>}

      {streams.map((stream) => (
        <StreamCard
          key={stream.id}
          stream={stream}
          busy={busyStreams.has(stream.id)}
          error={streamErrors[stream.id]}
          onAction={act}
        />
      ))}
    </main>
  )
}
