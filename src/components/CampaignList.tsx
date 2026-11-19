import { Link } from 'react-router-dom'
import type { StoredCampaign } from '../api'

interface Props {
  campaigns: StoredCampaign[]
  offerNames: ReadonlyMap<number, string>
}

export default function CampaignList({ campaigns, offerNames }: Props) {
  return (
    <section className="card">
      <h2>Созданные кампании ({campaigns.length})</h2>
      {campaigns.length === 0 ? (
        <p className="muted">Пока нет ни одной кампании</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Гео</th>
              <th>Оффер</th>
              <th>Keitaro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td>
                  {c.name}
                  <div className="muted">
                    <code>{c.alias}</code>
                  </div>
                </td>
                <td>{c.country}</td>
                <td>{offerNames.get(c.offer_id) ?? `#${c.offer_id}`}</td>
                <td>
                  #{c.keitaro_campaign_id} / flow #{c.keitaro_stream_id}
                </td>
                <td>
                  <Link to={`/campaigns/${c.id}`}>Редактировать</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
