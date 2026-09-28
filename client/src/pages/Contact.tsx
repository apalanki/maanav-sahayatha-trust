import { useEffect, useState, type FormEvent } from "react";
import { useSearch } from "wouter";
import { CheckCircle2, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PROGRAMS } from "@/lib/programs";
import {
  INQUIRY_TYPES,
  PHONE_DISPLAY,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WHATSAPP_LINK,
} from "@/lib/contact";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-md border border-border bg-white px-3 py-2.5 text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

export default function ContactPage() {
  const search = useSearch();
  const requested = new URLSearchParams(search).get("interest");
  const initialInterest = INQUIRY_TYPES.some(t => t.value === requested)
    ? requested!
    : "";

  const [status, setStatus] = useState<Status>("idle");
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    // Honeypot: real visitors never see or tick this box
    if (data.botcheck) return;

    const interest =
      INQUIRY_TYPES.find(t => t.value === data.interest)?.label ??
      "General inquiry";
    setStatus("sending");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Website inquiry: ${interest} (from ${data.name})`,
          from_name: "Manav Sahayata Trust website",
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          "Interested in": interest,
          "Related program": data.program || "Not specified",
          message: data.message,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message);

      setSenderName(data.name);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container py-8">
        {/* Intro */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="w-1 h-6 sm:h-8 bg-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary">
            We'd Love to Hear From You
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether you'd like to support a student's education, sponsor a
            medical camp, volunteer, or simply learn more about our work, send
            us a message and we'll get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <Card className="lg:col-span-2 p-6 sm:p-8 bg-white">
            {!WEB3FORMS_ACCESS_KEY ? (
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
                  Message Us on WhatsApp
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  The quickest way to reach us is on WhatsApp. Tell us how you'd
                  like to help or what you'd like to know, and we'll reply
                  personally.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Chat With Us on WhatsApp
                  </Button>
                </a>
              </div>
            ) : status === "sent" ? (
              <div role="status" className="text-center py-8">
                <CheckCircle2
                  className="w-12 h-12 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
                  Thank you, {senderName}!
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
                  Your message has been sent. We'll get back to you soon. We're
                  grateful you took the time to reach out.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-label="Contact form"
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone / WhatsApp{" "}
                      <span className="font-normal text-foreground/60">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className={labelClass}>
                      I'm interested in{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      defaultValue={initialInterest}
                      className={fieldClass}
                    >
                      <option value="" disabled>
                        Choose one…
                      </option>
                      {INQUIRY_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="program" className={labelClass}>
                    Related program{" "}
                    <span className="font-normal text-foreground/60">
                      (optional)
                    </span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="">Not specific</option>
                    {PROGRAMS.map(program => (
                      <option key={program.path} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how you'd like to help, or what you'd like to know."
                    className={fieldClass}
                  />
                </div>

                {/* Honeypot for spam bots (hidden from people and screen readers) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p
                    role="alert"
                    className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-md p-3"
                  >
                    Sorry, your message couldn't be sent. Please try again, or
                    reach us on{" "}
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold"
                    >
                      WhatsApp
                    </a>{" "}
                    at {PHONE_DISPLAY}.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    We'll only use your details to reply to you.
                  </p>
                </div>
              </form>
            )}
          </Card>

          {/* Other ways to reach us */}
          <aside className="space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-4">
                Other Ways to Reach Us
              </h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="block font-semibold text-foreground">
                      WhatsApp
                    </span>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Chat with us
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">
                      Phone
                    </span>
                    <a
                      href="tel:+919533843636"
                      className="text-primary hover:underline"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-semibold text-foreground">
                      Address
                    </span>
                    <span className="text-muted-foreground">
                      1416, MK Gold Coast, Yendada-530045
                      <br />
                      Visakhapatnam, Andhra Pradesh, India
                    </span>
                  </span>
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
