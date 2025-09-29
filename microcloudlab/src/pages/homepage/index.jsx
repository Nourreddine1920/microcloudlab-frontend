import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import UserJourneySection from './components/UserJourneySection';
import FeaturesSection from './components/FeaturesSection';
import SocialProofSection from './components/SocialProofSection';
import CTASection from './components/CTASection';

/**
 * @module Homepage
 */

/**
 * The main homepage component for the MicroCloudLab application.
 * It serves as the entry point for visitors, assembling various sections
 * like Hero, Stats, Features, and Call to Action to provide a comprehensive
 * overview of the platform.
 *
 * @returns {JSX.Element} The rendered homepage.
 */
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