import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';

export default function PrivacyPolicy() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-xs sm:text-sm text-slate-500">Last updated: February 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
            <p>
              At <strong>Jit Maiti Portfolio &amp; Engineering Blog</strong> (accessible from our website), the privacy of our visitors is one of our main priorities. This Privacy Policy document outlines the types of information that is collected and recorded by our website and how we use it.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">1. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">2. Information We Collect</h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p>
              If you contact us directly via our Contact form or email, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">3. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, operate, and maintain our website and engineering publications</li>
              <li>Improve, personalize, and expand our website content</li>
              <li>Understand and analyze how visitors utilize our technical articles and resources</li>
              <li>Communicate with you directly in response to inquiries submitted via the contact form</li>
              <li>Detect, prevent, and address technical issues or security threats</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">4. Log Files and Web Analytics</h2>
            <p>
              Our website follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">5. Cookies and Web Beacons</h2>
            <p>
              Like any other website, our website uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">6. Google DoubleClick DART Cookie &amp; Google AdSense</h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
            </p>
            <p>
              Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline hover:text-indigo-800"
              >
                https://policies.google.com/technologies/ads
              </a>.
            </p>
            <p>
              Some of the advertising partners on our site may use cookies and web beacons. Our advertising partners include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Google AdSense</strong>:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  Google Advertising Policies
                </a>
              </li>
            </ul>
            <p>
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on our website, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that our website has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">7. Third Party Privacy Policies</h2>
            <p>
              Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">8. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">9. GDPR Data Protection Rights</h2>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">10. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Our website does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">11. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us:
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
