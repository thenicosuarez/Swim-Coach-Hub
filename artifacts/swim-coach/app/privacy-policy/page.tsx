import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Coach Nikki",
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
          <p className="text-muted-foreground mb-8">Hubbard Wellness LLC · Effective Date: [EFFECTIVE DATE]</p>

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">1. Introduction</h2>
              <p>This Privacy Policy explains how Hubbard Wellness LLC ("Company," "we," "us," or "our") collects, uses, discloses, and protects your personal information when you use our website and services.</p>
              <p className="mt-3">By accessing our Website or using our Services, you agree to the practices described in this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-bold text-foreground mb-2">2.1 Information You Provide Directly</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Identity Information:</strong> full name, date of birth, age, gender</li>
                <li><strong>Contact Information:</strong> email address, phone number</li>
                <li><strong>Health Information:</strong> medical conditions, physical limitations, swimming ability level (voluntarily disclosed for safety)</li>
                <li><strong>Emergency Contact Information:</strong> name, phone number, and relationship</li>
                <li><strong>Payment Information:</strong> handled by third-party processors — we do not store full card numbers</li>
                <li><strong>Communications:</strong> content of emails, messages, and forms you send us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use your information to provide swim coaching services, communicate with you, process payments, and improve our offerings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with service providers (payment processors, scheduling platforms) as necessary to operate our business.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">5. Data Security</h2>
              <p>We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">6. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal information by contacting us at the email below.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">7. Contact Information</h2>
              <div className="p-4 bg-secondary rounded-xl">
                <p className="font-bold text-foreground">Hubbard Wellness LLC</p>
                <p>Email: [CONTACT EMAIL]</p>
                <p>Chicago, IL</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
