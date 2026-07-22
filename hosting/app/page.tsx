import { fetchRolloutTiers } from '../lib/rolloutTier';
import LandingPageClient from './LandingPageClient';

export default async function LandingPage() {
  const tiersData = await fetchRolloutTiers();
  return <LandingPageClient tiersData={tiersData} />;
}
