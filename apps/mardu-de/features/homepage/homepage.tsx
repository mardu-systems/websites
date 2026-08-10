import { AccessPointsSection } from './components/access-points-section';
import { BenefitsUseCasesSection } from './components/benefits-use-cases-section';
import { CustomerProofSection } from './components/customer-proof-section';
import { FundingSection } from './components/funding-section';
import { HomepageHero } from './components/homepage-hero';
import { HomepageIndex } from './components/homepage-index';
import { PermissionsSection } from './components/permissions-section';
import { RolloutFaqSection } from './components/rollout-faq-section';
import { SystemOverviewSection } from './components/system-overview-section';

export function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <HomepageHero />
      <CustomerProofSection />
      <SystemOverviewSection />
      <AccessPointsSection />
      <PermissionsSection />
      <BenefitsUseCasesSection />
      <RolloutFaqSection />
      <FundingSection />
      <HomepageIndex />
    </main>
  );
}
