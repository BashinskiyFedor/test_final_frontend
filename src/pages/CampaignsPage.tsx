import { useMemo } from 'react'
import CampaignForm from '../components/CampaignForm'
import CampaignList from '../components/CampaignList'
import { useCampaigns } from '../hooks/useCampaigns'
import { useOffers } from '../hooks/useOffers'

export default function CampaignsPage() {
  const { offers, loading: offersLoading, error: offersError } = useOffers()
  const { campaigns, error: campaignsError, reload } = useCampaigns()
  const offerNames = useMemo(() => new Map(offers.map((o) => [o.id, o.name])), [offers])

  return (
    <main className="container wide">
      <h1>Создание кампании</h1>
      <CampaignForm offers={offers} offersLoading={offersLoading} onCreated={reload} />
      {(offersError || campaignsError) && (
        <p className="error" role="alert">
          {offersError ?? campaignsError}
        </p>
      )}
      <CampaignList campaigns={campaigns} offerNames={offerNames} />
    </main>
  )
}
