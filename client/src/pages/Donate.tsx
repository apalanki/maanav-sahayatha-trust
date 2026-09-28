import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Copy, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import UpiAppLogo, {
  UPI_APP_COLORS,
  type UpiApp,
} from "@/components/UpiAppLogo";
import { getAssetPath } from "@/lib/utils";
import { PROGRAMS } from "@/lib/programs";
import {
  BANK_ACCOUNT,
  UPI_ID,
  UPI_PAYEE_NAME,
  UPI_PAY_LINK,
  upiAppLinks,
  WHATSAPP_DONATED_LINK,
  WHATSAPP_LINK,
} from "@/lib/contact";

/** What a gift supports in each program (no amounts until the trust confirms figures) */
const GIFT_USES: Record<string, string> = {
  "/programs/education":
    "Scholarships and exam preparation for deserving students",
  "/programs/bala-vikas":
    "Values education and a nutritious daily meal for children",
  "/programs/medical": "Medical camps, medicines, and help with hospital costs",
  "/programs/tribal":
    "Blankets, sweaters, and essential supplies for remote villages",
  "/programs/religious-cultural":
    "Temple renovation and tribal cultural traditions",
};

/** Copies a value; falls back to selecting the on-screen text if the clipboard is unavailable */
function CopyButton({
  value,
  targetId,
  label,
  size = "default",
}: {
  value: string;
  targetId: string;
  label: string;
  size?: "default" | "sm";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.getElementById(targetId);
      if (el) window.getSelection()?.selectAllChildren(el);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={copy}
      className="h-auto flex-shrink-0 flex items-center gap-1.5"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" /> Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" /> Copy
        </>
      )}
    </Button>
  );
}

export default function DonatePage() {
  // iPhones/iPads use a different Google Pay link than Android
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container py-8">
        {/* Intro */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
              Donate
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
            Your Gift Changes Lives
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every contribution, large or small, helps a student stay in school,
            brings a medical camp to a remote village, or keeps a family warm
            through winter. Give in seconds with any UPI app, or by bank
            transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-start">
          {/* UPI */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 sm:p-8 bg-white">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6">
                Give Instantly with UPI
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <img
                  fetchPriority="high"
                  src={getAssetPath("/images/donate/upi-qr.png")}
                  alt={`UPI QR code for ${UPI_PAYEE_NAME}, UPI ID ${UPI_ID}`}
                  className="order-last md:order-none w-72 max-w-full h-auto rounded-lg border border-border flex-shrink-0"
                />
                <div className="w-full flex flex-col gap-5">
                  <ol className="space-y-2 text-base text-muted-foreground list-decimal pl-5">
                    <li>
                      Open any UPI app: Google Pay, PhonePe, Paytm, or BHIM.
                    </li>
                    <li>Scan the QR code, or pay to the UPI ID below.</li>
                    <li>Enter the amount you'd like to give and confirm.</li>
                  </ol>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1.5">
                      UPI ID
                    </p>
                    <div className="flex items-stretch gap-2">
                      <span
                        id="upi-id"
                        className="flex-1 min-w-0 break-words rounded-md border border-border bg-background px-3 py-2.5 text-sm font-semibold text-foreground"
                      >
                        {/* Allow a line break only after the "@" */}
                        {UPI_ID.split("@")[0]}@<wbr />
                        {UPI_ID.split("@")[1]}
                      </span>
                      <CopyButton
                        value={UPI_ID}
                        targetId="upi-id"
                        label="UPI ID"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      The payee name will show as{" "}
                      <strong className="text-foreground">
                        {UPI_PAYEE_NAME}
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Touchscreens (phones and tablets): open a UPI app straight to the payment */}
                  <div className="hidden pointer-coarse:block order-first space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                      Pay with your UPI app
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {upiAppLinks(isIOS).map(({ app, href }) => (
                        <a
                          key={app}
                          href={href}
                          className="flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-border bg-white text-base font-semibold text-foreground hover:border-primary transition-colors"
                        >
                          <span>Pay with</span>{" "}
                          {app === "PhonePe" ? (
                            <>
                              <UpiAppLogo app="PhonePe" className="w-6 h-6" />
                              <span style={{ color: UPI_APP_COLORS.PhonePe }}>
                                PhonePe
                              </span>
                            </>
                          ) : (
                            <>
                              <UpiAppLogo
                                app={app as UpiApp}
                                className="w-14 h-14"
                              />
                              {/* The logo is a wordmark; give screen readers the name */}
                              <span className="sr-only">{app}</span>
                            </>
                          )}
                        </a>
                      ))}
                      <a href={UPI_PAY_LINK}>
                        <Button size="lg" variant="outline" className="w-full">
                          Other UPI App
                        </Button>
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If your app doesn't open or declines the payment, copy the
                      UPI ID below and pay to it from your UPI app.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bank transfer */}
            <Card className="p-6 sm:p-8 bg-white">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                Bank Transfer
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Prefer to transfer from your bank? Use NEFT, RTGS, or IMPS from
                net banking or your bank's app.
              </p>
              <dl>
                {[
                  { label: "Account name", value: BANK_ACCOUNT.name },
                  {
                    label: "Account number",
                    value: BANK_ACCOUNT.number,
                    id: "bank-account-number",
                  },
                  { label: "IFSC", value: BANK_ACCOUNT.ifsc, id: "bank-ifsc" },
                  { label: "Bank", value: BANK_ACCOUNT.bank },
                  { label: "Branch", value: BANK_ACCOUNT.branch },
                ].map(({ label, value, id }) => (
                  <div
                    key={label}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-border last:border-0"
                  >
                    <dt className="sm:w-40 flex-shrink-0 text-sm font-semibold text-foreground">
                      {label}
                    </dt>
                    <dd className="flex items-center justify-between sm:justify-start gap-3 flex-1 min-w-0">
                      <span
                        id={id}
                        className="text-base font-semibold text-foreground break-all"
                      >
                        {value}
                      </span>
                      {id && (
                        <CopyButton
                          value={value}
                          targetId={id}
                          label={label}
                          size="sm"
                        />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          {/* After giving + registration */}
          <aside className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-3">
                After You Give
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-5">
                Please send us your name and the UPI transaction ID or bank UTR
                number so we can thank you personally and send an
                acknowledgement.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={WHATSAPP_DONATED_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
                    <WhatsAppIcon className="w-4 h-4" />
                    Share Details on WhatsApp
                  </Button>
                </a>
                <Link
                  href="/contact?interest=donate"
                  className="text-sm font-semibold text-primary underline underline-offset-4 text-center"
                >
                  Or send us a message
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-start gap-3">
                <Landmark
                  className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-base font-sans font-bold text-foreground mb-1">
                    A Registered Trust
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Maanav Sahayata Trust,{" "}
                    <span className="whitespace-nowrap">
                      Regd. No. 4-32/2023
                    </span>{" "}
                    (Book IV),{" "}
                    <span className="whitespace-nowrap">
                      Sub-Registrar Office
                    </span>
                    , Madhurawada, Visakhapatnam. Serving tribal and rural
                    communities since 2004.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h2 className="text-base font-sans font-bold text-foreground mb-1">
                Prefer to Talk First?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                We're happy to answer questions about our work or how your gift
                will be used.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Chat with us on WhatsApp
              </a>
            </Card>
          </aside>
        </div>

        {/* Where your gift goes */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-primary">
            Where Your Gift Goes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROGRAMS.map(program => (
              <Link
                key={program.path}
                href={program.path}
                className="group flex flex-col rounded-lg border border-border bg-white p-5 hover:border-primary transition-colors"
              >
                <span className="flex items-start justify-between gap-2 text-lg font-bold text-foreground group-hover:text-primary mb-2">
                  {program.name}
                  <ArrowRight
                    className="w-4 h-4 mt-1.5 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-base text-muted-foreground leading-relaxed flex-grow">
                  {GIFT_USES[program.path]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
