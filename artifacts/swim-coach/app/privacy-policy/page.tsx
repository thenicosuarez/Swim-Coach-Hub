import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Coach Nikki — Hubbard Wellness LLC",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Hubbard Wellness LLC · Effective Date: January 1, 2026</p>

          <div className="space-y-10 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction</h2>
              <p>This Privacy Policy explains how Hubbard Wellness LLC ("Company," "we," "us," or "our") collects, uses, discloses, and protects your personal information when you use our website (the "Website"), book or participate in our services (including swimming instruction, athletic training, yoga instruction, and wellness coaching) (the "Services"), or otherwise interact with us.</p>
              <p className="mt-3">By accessing our Website, using our Services, or providing us with your personal information, you agree to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not access the Website or use the Services.</p>
              <p className="mt-3">This Privacy Policy should be read in conjunction with our <Link href="/terms-of-service" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">2.1 Information You Provide Directly</h3>
              <p>We may collect the following categories of personal information that you voluntarily provide to us:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Identity Information:</strong> full name, date of birth, age, gender</li>
                <li><strong>Contact Information:</strong> mailing address, email address, phone number</li>
                <li><strong>Minor Participant Information:</strong> name, age, date of birth, and emergency contact information for any minor you enroll in Services</li>
                <li><strong>Health and Medical Information:</strong> medical conditions, allergies, medications, physical limitations, injuries, pregnancy status, swimming ability level, fitness level, and physician clearance documentation, as voluntarily disclosed by you for safety purposes</li>
                <li><strong>Emergency Contact Information:</strong> name, phone number, and relationship of your designated emergency contact</li>
                <li><strong>Payment Information:</strong> credit/debit card number, billing address, and transaction details (note: payment processing is handled by third-party processors; we do not store full payment card numbers)</li>
                <li><strong>Communications:</strong> content of emails, messages, forms, or other communications you send to us</li>
                <li><strong>Waivers and Consent Forms:</strong> signatures, dates, and information provided on liability waivers and consent forms</li>
                <li><strong>Feedback and Reviews:</strong> testimonials, reviews, survey responses, or other feedback you provide</li>
              </ul>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">2.2 Information Collected Automatically</h3>
              <p>When you visit our Website, we may automatically collect certain technical information, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version, operating system, and device type</li>
                <li>Pages visited, time spent on pages, and referring URLs</li>
                <li>Cookies, pixel tags, and similar tracking technologies (see Section 7 below)</li>
              </ul>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">2.3 Information from Third Parties</h3>
              <p>We may receive information about you from third-party sources, including booking platforms, payment processors, social media platforms, and facility operators where Services are conducted.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Providing Services:</strong> to schedule, administer, and deliver the Services you have booked</li>
                <li><strong>Safety and Emergency Response:</strong> to ensure the safety of all participants and respond to medical emergencies</li>
                <li><strong>Health and Medical Screening:</strong> to assess your fitness to participate in specific Services and accommodate disclosed medical conditions</li>
                <li><strong>Payment Processing:</strong> to process payments, issue invoices, manage refunds or credits, and maintain financial records</li>
                <li><strong>Communication:</strong> to respond to inquiries, send booking confirmations, schedule changes, and service-related notifications</li>
                <li><strong>Marketing:</strong> to send promotional materials, newsletters, special offers, and updates about our Services (you may opt out at any time)</li>
                <li><strong>Website Improvement:</strong> to analyze usage patterns, improve our Website and Services, and enhance user experience</li>
                <li><strong>Legal Compliance:</strong> to comply with applicable laws, regulations, and legal processes, and to establish, exercise, or defend legal claims</li>
                <li><strong>Business Operations:</strong> to manage our business, including accounting, auditing, insurance, and administrative functions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. How We Share Your Information</h2>
              <p>We may share your personal information in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Service Providers and Vendors:</strong> with third-party service providers who assist us in operating our business, including payment processors, booking platforms, email service providers, website hosting providers, and marketing tools. These providers are contractually obligated to use your information only for the purposes of providing services to us.</li>
                <li><strong>Facility Operators:</strong> with owners or operators of third-party facilities where Services are conducted, to the extent necessary for scheduling, access, and safety compliance</li>
                <li><strong>Emergency Services:</strong> with medical, emergency, or law enforcement personnel in the event of an emergency involving you or a Minor Participant</li>
                <li><strong>Legal Requirements:</strong> when required by law, regulation, court order, subpoena, or legal process, or when we believe disclosure is necessary to protect our rights, safety, or property</li>
                <li><strong>Business Transfers:</strong> in connection with a merger, acquisition, reorganization, sale of assets, or bankruptcy</li>
                <li><strong>With Your Consent:</strong> when you have given us explicit consent to share your information for a specified purpose</li>
              </ul>
              <p className="mt-3 font-semibold">We do not sell your personal information to third parties for monetary consideration.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Information About Minor Participants</h2>
              <p>We collect personal information about Minor Participants (under 18) only as provided by their parent or legal guardian in connection with enrollment in Services. This information is limited to what is necessary for safe participation.</p>
              <p className="mt-3">We do not knowingly collect personal information directly from children under the age of 13 without verified parental consent, in accordance with the Children's Online Privacy Protection Act (COPPA). If we become aware that we have inadvertently collected information from a child under 13 without proper consent, we will take steps to delete it promptly. If you believe we have collected information from a child under 13 without consent, please contact us immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Health and Medical Information</h2>
              <p>We collect health and medical information solely for the purpose of ensuring your safety during participation in the Services. This information is treated with heightened confidentiality and is:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Used only for safety screening, session planning, emergency preparedness, and accommodation of disclosed conditions</li>
                <li>Shared only with Company coaches, instructors, and staff on a need-to-know basis, and with emergency medical personnel if necessary</li>
                <li>Not used for marketing, advertising, or any purpose unrelated to your safety and participation in the Services</li>
                <li>Retained only as long as necessary for the purposes described herein and in accordance with our retention policy</li>
              </ul>
              <p className="mt-3">Please note that the Company is not a healthcare provider and is not subject to HIPAA. However, we treat your health information with the same level of care and confidentiality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Cookies and Tracking Technologies</h2>
              <p>Our Website may use cookies, pixel tags, web beacons, and similar technologies to collect information about your browsing activity. We may use the following types of cookies:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Essential Cookies:</strong> necessary for the Website to function properly (e.g., session management, security)</li>
                <li><strong>Analytics Cookies:</strong> used to understand how visitors interact with the Website, enabling us to improve functionality and content</li>
                <li><strong>Marketing Cookies:</strong> used to deliver targeted advertisements and track the effectiveness of marketing campaigns</li>
              </ul>
              <p className="mt-3">You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of the Website. We do not currently respond to "Do Not Track" signals.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security. If you believe your personal information has been compromised, please contact us immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">9. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Specifically:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Active client records are retained for the duration of our service relationship and for a minimum of 5 years following the last session</li>
                <li>Records relating to Minor Participants are retained until the minor reaches the age of majority (18) plus the applicable statute of limitations period, or 7 years after the last session, whichever is longer</li>
                <li>Waiver and release forms are retained indefinitely or for the maximum period permitted under applicable law</li>
                <li>Financial and payment records are retained in accordance with applicable tax and accounting requirements</li>
              </ul>
              <p className="mt-3">When personal information is no longer required, we will securely delete or anonymize it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">10. Your Rights and Choices</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">10.1 Access and Correction</h3>
              <p>You may request access to the personal information we hold about you and request corrections to any inaccurate or incomplete information. We will respond to such requests within a reasonable time and in accordance with applicable law.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">10.2 Deletion</h3>
              <p>You may request that we delete your personal information, subject to certain exceptions (e.g., where retention is required for legal compliance, safety records, or defense of claims). Deletion of certain information may affect our ability to provide Services to you.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">10.3 Marketing Opt-Out</h3>
              <p>You may opt out of receiving promotional emails or marketing communications at any time by clicking the "unsubscribe" link in any marketing email, or by contacting us directly. Even if you opt out of marketing communications, we may still send you transactional or service-related communications.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">10.4 Cookie Preferences</h3>
              <p>You may manage your cookie preferences through your browser settings as described in Section 7 above.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">11. Illinois Residents – Additional Rights</h2>
              <p>If you are a resident of Illinois, you may have additional rights under state law, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>The right to know what personal information we collect, use, and disclose</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt out of the sale of your personal information (note: we do not sell personal information)</li>
                <li>The right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="mt-3">If you are an Illinois resident and wish to exercise any of these rights, please contact us using the information provided in Section 15 below. We will verify your identity before processing your request.</p>
              <p className="mt-3"><strong>Biometric Information:</strong> The Company does not collect biometric identifiers or biometric information (as defined under the Illinois Biometric Information Privacy Act, 740 ILCS 14) through the Website or in connection with the Services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">12. Third-Party Links and Services</h2>
              <p>Our Website may contain links to third-party websites, platforms, or services. We are not responsible for the privacy practices, content, or security of any third-party sites. We encourage you to review the privacy policies of any third-party site you visit. Our Privacy Policy applies solely to information collected by us through our Website and Services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">13. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will post the updated Privacy Policy on our Website with a revised effective date. Your continued use of the Website or Services after any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Privacy Policy periodically.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">14. Governing Law</h2>
              <p>This Privacy Policy is governed by and construed in accordance with the laws of the State of Illinois, without regard to conflict of law principles. Any disputes arising under this Privacy Policy shall be resolved in accordance with the dispute resolution provisions in our <Link href="/terms-of-service" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">15. Contact Information</h2>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:</p>
              <div className="p-5 bg-secondary rounded-xl mt-3">
                <p className="font-bold text-foreground">Hubbard Wellness LLC</p>
                <p>Email: swimhubbard@gmail.com</p>
                <p>Chicago, IL</p>
              </div>
            </section>

            <p className="text-muted-foreground text-sm border-t border-border pt-6">
              © 2026 Hubbard Wellness LLC. All rights reserved. · <Link href="/terms-of-service" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
