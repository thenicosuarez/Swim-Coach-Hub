import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Coach Nikki — Hubbard Wellness LLC",
};

export default function TermsOfService() {
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
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">Hubbard Wellness LLC · Effective Date: January 1, 2026</p>

          <div className="space-y-10 text-foreground/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction and Acceptance of Terms</h2>
              <p>These Terms of Service ("Terms") govern your access to and use of the services, website, applications, and any related content provided by Hubbard Wellness LLC ("Company," "we," "us," or "our"), including but not limited to swimming instruction, swim coaching, athletic training, yoga instruction, wellness coaching, and any other services offered by the Company (collectively, the "Services").</p>
              <p className="mt-3">By accessing our website (the "Website"), booking or purchasing any Services, participating in any session, class, lesson, or program, or otherwise engaging with the Company in any capacity, you ("Client," "you," or "your") acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any additional waivers, releases, or agreements presented to you in connection with specific Services.</p>
              <p className="mt-3 font-semibold">IF YOU DO NOT AGREE TO THESE TERMS IN THEIR ENTIRETY, YOU MAY NOT ACCESS OR USE THE SERVICES. YOUR CONTINUED USE OF ANY SERVICES CONSTITUTES YOUR UNCONDITIONAL ACCEPTANCE OF THESE TERMS AS THEY MAY BE AMENDED FROM TIME TO TIME.</p>
              <p className="mt-3">All references to "you" or "your" in these Terms mean the person who accesses or uses the Services in any manner, and each of your heirs, assigns, personal representatives, and successors. If you are booking or enrolling a minor in any Services, all references to "you" also include the minor participant and you accept these Terms on their behalf.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Description of Services</h2>
              <p>Hubbard Wellness provides in-person and, where offered, virtual coaching and instruction in the following areas (which may be expanded or modified at our sole discretion):</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Swimming lessons and swim coaching (pool, open water, and related aquatic instruction)</li>
                <li>Athletic training, strength and conditioning, and sport-specific coaching</li>
                <li>Yoga instruction (group classes, private sessions, and workshops)</li>
                <li>General wellness coaching, movement instruction, and related programming</li>
                <li>Online content, digital resources, and virtual sessions where offered</li>
              </ul>
              <p className="mt-3">The specific scope, schedule, pricing, and location of Services will be communicated to you at the time of booking or enrollment.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. Eligibility and Minor Participants</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">3.1 Age and Legal Capacity</h3>
              <p>You must be at least eighteen (18) years of age and legally competent to enter into a binding contract to use or purchase the Services. By using the Services, you represent and warrant that you meet these requirements.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">3.2 Minor Participants – Parental/Guardian Warranty</h3>
              <p className="font-semibold">THIS SECTION CONTAINS CRITICAL WARRANTIES. PLEASE READ CAREFULLY.</p>
              <p className="mt-3">If you are booking, enrolling, registering, or otherwise arranging for any person under the age of eighteen (18) to participate in any Services (a "Minor Participant"), you represent, warrant, and unconditionally guarantee the following:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>You are the biological parent, legally adoptive parent, or court-appointed legal guardian of the Minor Participant, or you have been expressly and lawfully authorized in writing by such parent or legal guardian to act on their behalf for purposes of enrolling the Minor Participant in the Services.</li>
                <li>You have full legal authority to bind the Minor Participant to these Terms, including all assumption of risk, waiver, release, and indemnification provisions contained herein.</li>
                <li>You accept full and sole responsibility for the Minor Participant's conduct, safety, health, and well-being during and in connection with participation in the Services.</li>
                <li>You have disclosed to the Company in writing, prior to the Minor Participant's first session, any and all medical conditions, disabilities, allergies, behavioral considerations, swimming ability level, physical limitations, or other relevant health or safety information pertaining to the Minor Participant.</li>
                <li>You will ensure that the Minor Participant follows all rules, instructions, and safety guidelines communicated by the Company, its coaches, instructors, or staff.</li>
              </ul>
              <p className="mt-3">Failure to comply with any of the foregoing warranties shall constitute a material breach of these Terms and shall entitle the Company to immediately terminate Services without refund and to pursue all available legal remedies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. Assumption of Risk</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">4.1 Inherent Risks of Physical Activity and Aquatic Environments</h3>
              <p className="font-semibold">YOU EXPRESSLY ACKNOWLEDGE, UNDERSTAND, AND AGREE THAT PARTICIPATION IN THE SERVICES INVOLVES INHERENT AND SIGNIFICANT RISKS OF SERIOUS BODILY INJURY, PERMANENT DISABILITY, PARALYSIS, DROWNING, AND DEATH.</p>
              <p className="mt-3">These risks include, but are not limited to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Drowning, near-drowning, submersion injuries, and water aspiration, including in shallow water</li>
                <li>Slipping, falling, or impact injuries on wet or dry surfaces in or around pools, decks, locker rooms, and training areas</li>
                <li>Musculoskeletal injuries including sprains, strains, fractures, dislocations, torn ligaments, tendon injuries, and spinal injuries</li>
                <li>Cardiac events, respiratory distress, heat stroke, heat exhaustion, hypothermia, and dehydration</li>
                <li>Exposure to communicable diseases, bacteria, parasites, or chemical irritants in aquatic environments</li>
                <li>Injuries resulting from the use or misuse of equipment, facilities, or training apparatus</li>
                <li>Injuries caused by the actions, inactions, or negligence of other participants, bystanders, or third parties</li>
                <li>Injuries arising from pre-existing medical conditions, undisclosed health issues, or adverse reactions to physical exertion</li>
              </ul>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">4.2 Voluntary Assumption</h3>
              <p className="font-semibold">BY USING THE SERVICES, YOU VOLUNTARILY ASSUME ALL RISKS, BOTH KNOWN AND UNKNOWN, ASSOCIATED WITH YOUR PARTICIPATION (OR THE PARTICIPATION OF ANY MINOR FOR WHOM YOU ARE RESPONSIBLE), EVEN IF SUCH RISKS ARISE FROM THE NEGLIGENCE, GROSS NEGLIGENCE, OR FAULT OF THE COMPANY, ITS OWNERS, MEMBERS, MANAGERS, EMPLOYEES, AGENTS, COACHES, INSTRUCTORS, INDEPENDENT CONTRACTORS, VOLUNTEERS, OR AFFILIATES (COLLECTIVELY, THE "RELEASED PARTIES").</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Waiver and Release of Liability</h2>
              <p className="font-semibold">PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</p>
              <p className="mt-3">To the fullest extent permitted by applicable law, you (on behalf of yourself and, if applicable, any Minor Participant) hereby irrevocably and unconditionally:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>WAIVE</strong> all claims, demands, causes of action, suits, rights, and entitlements of any kind whatsoever, whether known or unknown, suspected or unsuspected, that you now have or may hereafter have against the Released Parties, arising out of or in connection with your participation in the Services.</li>
                <li><strong>RELEASE AND FOREVER DISCHARGE</strong> the Released Parties from any and all liability, loss, damage, cost, or expense (including attorneys' fees and court costs) arising out of or in connection with any injury, illness, disability, death, or loss or damage to person or property, whether arising from the negligence of the Released Parties or otherwise, to the fullest extent permitted by law.</li>
                <li><strong>COVENANT NOT TO SUE</strong> the Released Parties for any claim, demand, or cause of action arising out of or related to your participation in the Services, and agree that if you do bring such a claim, you will be liable for all costs and attorneys' fees incurred by the Released Parties in defending against it.</li>
              </ul>
              <p className="mt-3">This waiver and release is intended to be as broad and inclusive as permitted by the laws of the State of Illinois, and if any portion is held invalid, the remainder shall continue in full force and effect.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Indemnification</h2>
              <p className="font-semibold">YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS THE RELEASED PARTIES FROM AND AGAINST ANY AND ALL CLAIMS, DAMAGES, LOSSES, LIABILITIES, COSTS, AND EXPENSES (INCLUDING REASONABLE ATTORNEYS' FEES) ARISING OUT OF OR RELATED TO:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Your (or any Minor Participant's) use of or participation in the Services</li>
                <li>Your breach of any representation, warranty, or obligation under these Terms</li>
                <li>Any misrepresentation regarding your status as parent, legal guardian, or authorized representative of a Minor Participant</li>
                <li>Your (or any Minor Participant's) failure to follow safety rules, instructions, or guidelines</li>
                <li>Any injury, loss, or damage to third parties caused by you or any Minor Participant during or in connection with the Services</li>
                <li>Your failure to disclose relevant medical, health, or safety information</li>
                <li>Your violation of any applicable law, regulation, or third-party right</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Health and Medical Representations and Warranties</h2>
              <p>By participating in the Services, you represent and warrant that:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>You (and any Minor Participant) are in good physical health and have no medical condition, disability, or impairment that would make participation inadvisable, or if any such condition exists, you have disclosed it in writing prior to participation and received medical clearance from a licensed physician.</li>
                <li>You have consulted with a physician regarding your (or any Minor Participant's) ability to participate in physical activity, aquatic environments, and the specific Services booked.</li>
                <li>You will immediately notify the Company of any change in health status, injury, pregnancy, or new medical condition that may affect safe participation.</li>
                <li>You are not under the influence of alcohol, drugs, or any substance that could impair safe participation.</li>
                <li>For swimming and aquatic Services specifically: you have accurately represented your (or any Minor Participant's) swimming ability level and comfort in water.</li>
              </ul>
              <p className="mt-3 font-semibold">THE COMPANY IS NOT A MEDICAL PROVIDER. THE SERVICES DO NOT CONSTITUTE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. YOU SHOULD ALWAYS CONSULT A QUALIFIED HEALTHCARE PROVIDER BEFORE BEGINNING ANY EXERCISE, TRAINING, OR AQUATIC PROGRAM.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">8. Booking, Payment, and Cancellation</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">8.1 Booking and Payment</h3>
              <p>All bookings, scheduling, and payment for Services will be conducted through the methods specified by the Company. Payment is due in full at the time of booking unless otherwise agreed in writing. The Company reserves the right to modify pricing at any time; however, confirmed bookings will be honored at the price in effect at the time of booking.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">8.2 Cancellation and Refund Policy</h3>
              <p>Cancellations made at least 24 hours prior to a scheduled session may be eligible for rescheduling or credit at the Company's sole discretion. Cancellations made less than 24 hours prior to a session, or no-shows, are non-refundable. Packages, bundles, and multi-session purchases are non-refundable and non-transferable unless otherwise stated in writing. The Company reserves the right to cancel or reschedule any session due to weather, facility availability, safety concerns, or other circumstances beyond its control, and will make reasonable efforts to offer an alternative session.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">8.3 Company's Right to Refuse Service</h3>
              <p>The Company reserves the right, in its sole and absolute discretion, to refuse, suspend, or terminate Services to any Client or participant at any time and for any lawful reason, including but not limited to safety concerns, failure to comply with rules or instructions, disruptive behavior, or breach of these Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">9. Limitation of Liability</h2>
              <p className="font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
              <p className="mt-3 font-semibold">THE RELEASED PARTIES SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF THE RELEASED PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              <p className="mt-3 font-semibold">IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF THE RELEASED PARTIES FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THE SERVICES EXCEED THE TOTAL AMOUNT PAID BY YOU TO THE COMPANY FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.</p>
              <p className="mt-3">SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE EXCLUSIONS OR LIMITATIONS MAY NOT APPLY, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">10. Rules of Conduct and Safety</h2>
              <p>All Clients and participants must comply with the following at all times while participating in or present at any location where Services are provided:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Follow all verbal and written instructions from coaches, instructors, and staff without exception</li>
                <li>Wear appropriate attire and footwear for the activity as specified by the Company</li>
                <li>For aquatic Services: no running on pool decks; no diving unless expressly permitted and supervised; no entry into water without instructor authorization; no breath-holding games or contests</li>
                <li>Report any unsafe conditions, equipment concerns, injuries, or incidents to staff immediately</li>
                <li>Refrain from using personal electronic devices during active sessions unless authorized</li>
                <li>Treat all staff, coaches, instructors, other clients, and facility property with respect</li>
                <li>No alcohol, tobacco, vaping, or illegal substances on premises or during any session</li>
                <li>Comply with all posted rules at any facility where Services are conducted</li>
              </ul>
              <p className="mt-3">Violation of any rule of conduct may result in immediate removal from the session or facility, suspension or termination of Services, and forfeiture of fees paid, without refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">11. Intellectual Property</h2>
              <p>All content on the Website and in connection with the Services — including but not limited to text, graphics, logos, images, video, audio, software, training programs, curricula, methodologies, and other materials — is the property of Hubbard Wellness LLC or its licensors and is protected by United States and international copyright, trademark, and intellectual property laws. You may not copy, reproduce, distribute, transmit, display, modify, or create derivative works from any Company content without prior written consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">12. Photo, Video, and Media Consent</h2>
              <p>By participating in the Services, you grant the Company the right to photograph, film, and record you (and any Minor Participant) during sessions, events, or related activities, and to use such images, video, or recordings for promotional, marketing, educational, and social media purposes without additional compensation or prior notice. If you do not consent to such use, you must notify the Company in writing prior to the commencement of Services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">13. Dispute Resolution and Governing Law</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">13.1 Governing Law</h3>
              <p>These Terms and any dispute arising out of or related to the Services shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict of law principles.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">13.2 Mandatory Arbitration</h3>
              <p className="font-semibold">ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THESE TERMS, THE SERVICES, OR YOUR RELATIONSHIP WITH THE COMPANY (INCLUDING CLAIMS OF NEGLIGENCE, GROSS NEGLIGENCE, OR PERSONAL INJURY) SHALL BE RESOLVED EXCLUSIVELY BY BINDING ARBITRATION ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION ("AAA") IN ACCORDANCE WITH ITS COMMERCIAL ARBITRATION RULES.</p>
              <p className="mt-3">The arbitration shall take place in Cook County, Illinois. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction. Each party shall bear its own costs and attorneys' fees unless the arbitrator determines otherwise.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">13.3 Class Action Waiver</h3>
              <p className="font-semibold">YOU AGREE THAT ANY ARBITRATION OR LEGAL PROCEEDING SHALL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST THE RELEASED PARTIES.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">13.4 Limitation on Time to File Claims</h3>
              <p>Any claim or cause of action arising out of or related to the Services or these Terms must be commenced within one (1) year after the cause of action accrues. Any claim not brought within this period is permanently barred.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">14. Third-Party Facilities and Venues</h2>
              <p>Services may be conducted at facilities, pools, gyms, studios, parks, or other locations not owned or operated by the Company ("Third-Party Facilities"). The Company is not responsible for the condition, maintenance, safety, or operations of any Third-Party Facility. Your use of any Third-Party Facility is subject to that facility's own rules, waivers, and terms. You agree that the Released Parties shall not be liable for any injury, loss, or damage arising from the condition of or your presence at any Third-Party Facility.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">15. Privacy</h2>
              <p>Your use of the Services is also governed by our <Link href="/privacy-policy" className="text-primary hover:text-accent transition-colors">Privacy Policy</Link>. By using the Services, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">16. Modifications to Terms</h2>
              <p>The Company reserves the right to modify, amend, or update these Terms at any time and in its sole discretion. Changes will be effective upon posting to the Website or upon notice to you. Your continued use of the Services following any changes constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">17. Severability</h2>
              <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction or arbitrator, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">18. Entire Agreement</h2>
              <p>These Terms, together with the Privacy Policy, any executed waivers, and any supplemental agreements presented in connection with specific Services, constitute the entire agreement between you and the Company regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">19. Contact Information</h2>
              <div className="p-5 bg-secondary rounded-xl">
                <p className="font-bold text-foreground">Hubbard Wellness LLC</p>
                <p>Email: swimhubbard@gmail.com</p>
                <p>Chicago, IL</p>
              </div>
            </section>

            <p className="text-muted-foreground text-sm border-t border-border pt-6">
              © 2026 Hubbard Wellness LLC. All rights reserved. · <Link href="/privacy-policy" className="text-primary hover:text-accent transition-colors">Privacy Policy</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
