import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Hubbard Wellness LLC · Effective Date: [EFFECTIVE DATE]</p>

          <div className="space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction</h2>
              <p>This Privacy Policy explains how Hubbard Wellness LLC ("Company," "we," "us," or "our") collects, uses, discloses, and protects your personal information when you use our website at [WEBSITE URL] (the "Website"), book or participate in our services (including swimming instruction, athletic training, yoga instruction, and wellness coaching) (the "Services"), or otherwise interact with us.</p>
              <p className="mt-3">By accessing our Website, using our Services, or providing us with your personal information, you agree to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not access the Website or use the Services.</p>
              <p className="mt-3">This Privacy Policy should be read in conjunction with our <Link href="/terms-of-service" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">2.1 Information You Provide Directly</h3>
              <p>We may collect the following categories of personal information that you voluntarily provide to us:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
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
              <p>When you visit our Website, we may automatically collect certain technical information, including IP address, browser type and version, operating system, device type, pages visited, time spent on pages, referring URLs, and cookies and similar tracking technologies.</p>

              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">2.3 Information from Third Parties</h3>
              <p>We may receive information about you from third-party sources, including booking platforms, payment processors, social media platforms, and facility operators where Services are conducted.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Providing Services:</strong> to schedule, administer, and deliver the Services you have booked</li>
                <li><strong>Safety and Emergency Response:</strong> to ensure the safety of all participants and respond to medical emergencies</li>
                <li><strong>Health and Medical Screening:</strong> to assess your fitness to participate in specific Services</li>
                <li><strong>Payment Processing:</strong> to process payments, issue invoices, manage refunds or credits</li>
                <li><strong>Communication:</strong> to respond to inquiries, send booking confirmations and service-related notifications</li>
                <li><strong>Marketing:</strong> to send promotional materials and updates about our Services (you may opt out at any time)</li>
                <li><strong>Website Improvement:</strong> to analyze usage patterns and improve our Website and Services</li>
                <li><strong>Legal Compliance:</strong> to comply with applicable laws, regulations, and legal processes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. How We Share Your Information</h2>
              <p>We may share your personal information with service providers and vendors, facility operators, emergency services, and as required by law. We do not sell your personal information to third parties for monetary consideration.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Information About Minor Participants</h2>
              <p>We collect personal information about Minor Participants (under 18) only as provided by their parent or legal guardian in connection with enrollment in Services. We do not knowingly collect personal information directly from children under the age of 13 without verified parental consent, in accordance with COPPA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Health and Medical Information</h2>
              <p>We collect health and medical information solely for the purpose of ensuring your safety during participation in the Services. This information is treated with heightened confidentiality and is used only for safety screening, session planning, emergency preparedness, and accommodation of disclosed conditions. Please note that the Company is not a healthcare provider and is not subject to HIPAA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Cookies and Tracking Technologies</h2>
              <p>Our Website may use cookies, pixel tags, web beacons, and similar technologies to collect information about your browsing activity. You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of the Website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is completely secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">9. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy and comply with legal obligations. Active client records are retained for the duration of our service relationship and for a minimum of [3/5/7] years following the last session. Records relating to Minor Participants are retained until the minor reaches the age of majority plus the applicable statute of limitations period, or [5/7] years after the last session, whichever is longer.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">10. Your Rights and Choices</h2>
              <p>You may request access to, correction of, or deletion of your personal information. You may also opt out of marketing communications at any time. To exercise any of these rights, please contact us using the information below.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">11. Illinois Residents – Additional Rights</h2>
              <p>If you are a resident of Illinois, you may have additional rights under state law, including the right to know what personal information we collect, the right to request deletion, and the right to opt out of the sale of your personal information (note: we do not sell personal information). The Company does not collect biometric identifiers or biometric information as defined under the Illinois Biometric Information Privacy Act (740 ILCS 14).</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">12. Third-Party Links and Services</h2>
              <p>Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices of any third-party sites. We encourage you to review the privacy policies of any third-party site you visit.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">13. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on our Website with a revised effective date. Your continued use of the Website or Services after any changes constitutes your acceptance of the updated Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">14. Governing Law</h2>
              <p>This Privacy Policy is governed by and construed in accordance with the laws of the State of Illinois, without regard to conflict of law principles.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">15. Contact Information</h2>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:</p>
              <div className="mt-3 p-4 bg-secondary rounded-xl">
                <p className="font-bold text-foreground">Hubbard Wellness LLC</p>
                <p>Email: [CONTACT EMAIL]</p>
                <p>[MAILING ADDRESS]</p>
                <p>[PHONE NUMBER]</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
