import { AccessPointsSection } from './components/access-points-section';
import { BenefitsUseCasesSection } from './components/benefits-use-cases-section';
import { ComplianceSection } from './components/compliance-section';
import { ConnectAppSection } from './components/connect-app-section';
import { CustomerProofSection } from './components/customer-proof-section';
import { FundingSection } from './components/funding-section';
import { HomepageHero } from './components/homepage-hero';
import { HomepageIndex } from './components/homepage-index';
import { RolloutFaqSection } from './components/rollout-faq-section';
import { SystemOverviewSection } from './components/system-overview-section';
import type { SiteFeatureFlags } from '@mardu/site-config';

export function Homepage({ features }: { features: SiteFeatureFlags }) {
  return (
    <main className="min-h-screen bg-background">
      <HomepageHero />
      <CustomerProofSection features={features} />
      <SystemOverviewSection />
      <AccessPointsSection />
      <ConnectAppSection />
      <BenefitsUseCasesSection />
      <ComplianceSection />
      <RolloutFaqSection />
      <FundingSection />
      <HomepageIndex />
    </main>
  );
}
