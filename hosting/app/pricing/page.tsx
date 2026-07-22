import { fetchRolloutTiers } from '../../lib/rolloutTier';
import PricingPageClient from './PricingPageClient';

export default async function PricingPage() {
  const tiersData = await fetchRolloutTiers();
  return <PricingPageClient tiersData={tiersData} />;
}
