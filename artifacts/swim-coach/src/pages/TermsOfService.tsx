import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Hubbard Wellness LLC · Effective Date: [EFFECTIVE DATE]</p>

          <div className="space-y-8 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction and Acceptance of Terms</h2>
              <p>These Terms of Service ("Terms") govern your access to and use of the services, website, applications, and any related content provided by Hubbard Wellness LLC ("Company," "we," "us," or "our"), including but not limited to swimming instruction, swim coaching, athletic training, yoga instruction, wellness coaching, and any other services offered by the Company (collectively, the "Services").</p>
              <p className="mt-3">By accessing our website at [WEBSITE URL] (the "Website"), booking or purchasing any Services, participating in any session, class, lesson, or program, or otherwise engaging with the Company in any capacity, you ("Client," "you," or "your") acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
              <p className="mt-3 font-semibold text-foreground">IF YOU DO NOT AGREE TO THESE TERMS IN THEIR ENTIRETY, YOU MAY NOT ACCESS OR USE THE SERVICES.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Description of Services</h2>
              <p>Hubbard Wellness provides in-person and, where offered, virtual coaching and instruction in the following areas:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Swimming lessons and swim coaching (pool, open water, and related aquatic instruction)</li>
                <li>Athletic training, strength and conditioning, and sport-specific coaching</li>
                <li>Yoga instruction (group classes, private sessions, and workshops)</li>
                <li>General wellness coaching, movement instruction, and related programming</li>
                <li>Online content, digital resources, and virtual sessions where offered</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. Eligibility and Minor Participants</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">3.1 Age and Legal Capacity</h3>
              <p>You must be at least eighteen (18) years of age and legally competent to enter into a binding contract to use or purchase the Services.</p>

              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">3.2 Minor Participants – Parental/Guardian Warranty</h3>
              <p className="font-semibold text-foreground">THIS SECTION CONTAINS CRITICAL WARRANTIES. PLEASE READ CAREFULLY.</p>
              <p className="mt-2">If you are booking or enrolling any person under the age of eighteen (18) as a "Minor Participant," you represent, warrant, and unconditionally guarantee that:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You are the biological parent, legally adoptive parent, or court-appointed legal guardian of the Minor Participant, or have been expressly and lawfully authorized in writing to act on their behalf</li>
                <li>You have full legal authority to bind the Minor Participant to these Terms</li>
                <li>You accept full and sole responsibility for the Minor Participant's conduct, safety, health, and well-being during and in connection with participation in the Services</li>
                <li>You have disclosed all medical conditions, disabilities, allergies, behavioral considerations, swimming ability, and relevant health or safety information pertaining to the Minor Participant</li>
                <li>You will ensure that the Minor Participant follows all rules, instructions, and safety guidelines communicated by the Company</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. Assumption of Risk</h2>
              <p className="font-semibold text-foreground">YOU EXPRESSLY ACKNOWLEDGE, UNDERSTAND, AND AGREE THAT PARTICIPATION IN THE SERVICES INVOLVES INHERENT AND SIGNIFICANT RISKS OF SERIOUS BODILY INJURY, PERMANENT DISABILITY, PARALYSIS, DROWNING, AND DEATH.</p>
              <p className="mt-3">These risks include, but are not limited to: drowning and near-drowning; slipping or falling on wet surfaces; musculoskeletal injuries; cardiac events; exposure to communicable diseases in aquatic environments; injuries from equipment; and injuries caused by actions of other participants.</p>
              <p className="mt-3 font-semibold text-foreground">BY USING THE SERVICES, YOU VOLUNTARILY ASSUME ALL RISKS, BOTH KNOWN AND UNKNOWN, ASSOCIATED WITH YOUR PARTICIPATION (OR THE PARTICIPATION OF ANY MINOR FOR WHOM YOU ARE RESPONSIBLE).</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Waiver and Release of Liability</h2>
              <p className="font-semibold text-foreground">PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</p>
              <p className="mt-3">To the fullest extent permitted by applicable law, you (on behalf of yourself and, if applicable, any Minor Participant) hereby irrevocably and unconditionally:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>WAIVE</strong> all claims, demands, causes of action, suits, rights, and entitlements of any kind whatsoever arising out of or in connection with your participation in the Services</li>
                <li><strong>RELEASE AND FOREVER DISCHARGE</strong> Hubbard Wellness LLC and its owners, members, managers, employees, agents, coaches, instructors, independent contractors, volunteers, and affiliates (collectively, the "Released Parties") from any and all liability, loss, damage, cost, or expense arising out of or in connection with any injury, illness, disability, death, or loss or damage to person or property</li>
                <li><strong>COVENANT NOT TO SUE</strong> the Released Parties for any claim, demand, or cause of action arising out of or related to your participation in the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Indemnification</h2>
              <p>YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS THE RELEASED PARTIES FROM AND AGAINST ANY AND ALL CLAIMS, DAMAGES, LOSSES, LIABILITIES, COSTS, AND EXPENSES (INCLUDING REASONABLE ATTORNEYS' FEES) ARISING OUT OF OR RELATED TO your use of or participation in the Services, your breach of these Terms, any misrepresentation regarding your status as parent or legal guardian of a Minor Participant, or your violation of any applicable law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Health and Medical Representations</h2>
              <p>By participating in the Services, you represent and warrant that you (and any Minor Participant) are in good physical health and have no medical condition that would make participation inadvisable, or that if any such condition exists, you have disclosed it in writing and received medical clearance from a licensed physician. <strong>THE COMPANY IS NOT A MEDICAL PROVIDER. THE SERVICES DO NOT CONSTITUTE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.</strong></p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Booking, Payment, and Cancellation</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">8.1 Booking and Payment</h3>
              <p>Payment is due in full at the time of booking unless otherwise agreed in writing. The Company reserves the right to modify pricing at any time; however, confirmed bookings will be honored at the price in effect at the time of booking.</p>

              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">8.2 Cancellation and Refund Policy</h3>
              <p>Cancellations made at least [24/48] hours prior to a scheduled session may be eligible for rescheduling or credit at the Company's sole discretion. Cancellations made less than [24/48] hours prior to a session, or no-shows, are non-refundable. Packages, bundles, and multi-session purchases are non-refundable and non-transferable unless otherwise stated in writing. The Company reserves the right to cancel or reschedule any session due to weather, facility availability, or other safety concerns.</p>

              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">8.3 Company's Right to Refuse Service</h3>
              <p>The Company reserves the right, in its sole and absolute discretion, to refuse, suspend, or terminate Services to any Client or participant at any time and for any lawful reason, including but not limited to safety concerns, failure to comply with rules or instructions, disruptive behavior, or breach of these Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">9. Limitation of Liability</h2>
              <p className="font-semibold text-foreground">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE RELEASED PARTIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES OF ANY KIND. IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF THE RELEASED PARTIES EXCEED THE TOTAL AMOUNT PAID BY YOU TO THE COMPANY FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">10–[Additional Sections]</h2>
              <p className="text-muted-foreground italic">[Additional terms including photo/media consent, governing law, dispute resolution, and other provisions will be added prior to the effective date of these Terms.]</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Contact Information</h2>
              <div className="p-4 bg-secondary rounded-xl">
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
