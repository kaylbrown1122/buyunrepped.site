import { fetchRolloutTiers } from '../../lib/rolloutTier';
import StartPageClient from './StartPageClient';

export default async function StartPage() {
  const tiersData = await fetchRolloutTiers();
  return <StartPageClient tiersData={tiersData} />;
}
