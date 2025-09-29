import React from 'react';

/**
 * @module TestPage
 */

/**
 * A simple test page to verify that routing is working correctly.
 *
 * @returns {JSX.Element} The rendered test page.
 */
const TestPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Test Page</h1>
        <p className="text-text-secondary">If you can see this, routing is working!</p>
      </div>
    </div>
  );
};

export default TestPage; 