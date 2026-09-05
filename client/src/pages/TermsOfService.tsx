import { ArrowLeft, Scale, Mail } from 'lucide-react';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        <GlassmorphicCard hover={false} glowColor="none" className="p-6 sm:p-10 md:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-xs sm:text-sm text-slate-500">Last updated: February 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
            <p>
              Welcome to the personal portfolio and engineering publications of <strong>Jit Maiti</strong>. By accessing or using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">1. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, this website and its entire contents, features, code samples, graphics, and articles are the intellectual property of Jit Maiti and are protected by applicable copyright, trademark, and other proprietary rights.
            </p>
            <p>
              Open source repositories referenced on this website are distributed under their respective open-source licenses (e.g., MIT License, Apache 2.0) as documented in their GitHub repositories.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">2. Permitted Use</h2>
            <p>You may:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>View, download, and print pages or articles from the website for your own personal, educational, or non-commercial reference.</li>
              <li>Reference code snippets in accordance with open-source licenses, providing appropriate attribution.</li>
              <li>Share links to our articles and case studies across social networks and technical communities.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">3. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Republish entire technical articles or proprietary designs without express written permission.</li>
              <li>Use the website in any way that causes or may cause damage to the website or impairment of its performance.</li>
              <li>Engage in any automated data scraping, harvesting, or extraction without explicit authorization.</li>
              <li>Transmit any malicious code, viruses, or disruptive scripts through contact forms or server endpoints.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">4. Disclaimers and Limitations of Liability</h2>
            <p>
              The information, technical guides, code architecture examples, and articles provided on this website are for educational and informational purposes only. While every effort is made to ensure accuracy, the content is provided on an "as is" and "as available" basis without warranties of any kind.
            </p>
            <p>
              In no event shall Jit Maiti be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of, or inability to access or use, the website or any content provided herein.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">5. Third-Party Links &amp; Advertisements</h2>
            <p>
              Our website may contain links to third-party websites or services (e.g., GitHub, LinkedIn, Vercel, external documentation, and advertiser links) that are not owned or controlled by Jit Maiti. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">6. Modifications to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. Changes will be posted on this page with an updated revision date.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="flex items-center gap-2 text-indigo-600 font-medium">
              <Mail className="w-4 h-4" />
              <a href="mailto:maitidebjit2@gmail.com">maitidebjit2@gmail.com</a>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  );
}
