import { fetchRolloutTiers } from '../../lib/rolloutTier';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage() {
  const tiersData = await fetchRolloutTiers();
  return <AboutPageClient tiersData={tiersData} />;
}
