import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import UserJourneySection from './components/UserJourneySection';
import FeaturesSection from './components/FeaturesSection';
import SocialProofSection from './components/SocialProofSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <UserJourneySection />
        <FeaturesSection />
        <SocialProofSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Homepage;