import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Coach Nikki",
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
          <p className="text-muted-foreground mb-8">Hubbard Wellness LLC · Effective Date: [EFFECTIVE DATE]</p>

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Agreement to Terms</h2>
              <p>By booking or participating in services provided by Hubbard Wellness LLC ("Company"), you agree to these Terms of Service. Please read them carefully before proceeding.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Services</h2>
              <p>Hubbard Wellness LLC provides private swim instruction, group coaching, video analysis, and related wellness services in the Chicago area.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. Assumption of Risk</h2>
              <p>Participation in aquatic activities involves inherent risks including, but not limited to, drowning and physical injury. By participating, you acknowledge and accept these risks on behalf of yourself and any minor you enroll.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. Health Representations</h2>
              <p>By participating, you represent that you (and any minor participant) are in good physical health with no medical condition that would make participation inadvisable. <strong>The Company is not a medical provider and the Services do not constitute medical advice.</strong></p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Booking, Payment & Cancellation</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">5.1 Payment</h3>
              <p>Payment is due at the time of booking unless otherwise agreed in writing.</p>
              <h3 className="text-lg font-bold text-foreground mb-2 mt-4">5.2 Cancellation</h3>
              <p>Cancellations made at least 24 hours prior may be eligible for rescheduling at the Company's discretion. Late cancellations and no-shows are non-refundable. Packages are non-refundable unless otherwise stated.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Limitation of Liability</h2>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. IN NO EVENT SHALL TOTAL AGGREGATE LIABILITY EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of Illinois, without regard to conflict of law principles.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Contact</h2>
              <div className="p-4 bg-secondary rounded-xl">
                <p className="font-bold text-foreground">Hubbard Wellness LLC</p>
                <p>Email: [CONTACT EMAIL]</p>
                <p>Chicago, IL</p>
              </div>
            </section>

            <p className="text-muted-foreground text-sm">
              See also: <Link href="/privacy-policy" className="text-primary hover:text-accent transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
