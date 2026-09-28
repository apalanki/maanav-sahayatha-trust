/**
 * Contact form configuration.
 *
 * Submissions go to Web3Forms (https://web3forms.com), which emails them to the address the access
 * key was created for (manavsahayata@gmail.com). The key is public by design: it can only send to
 * that inbox. Free plan: 250 submissions/month.
 *
 * VITE_WEB3FORMS_ACCESS_KEY overrides the key (the e2e tests use a fake one). If no key is set,
 * the Contact page hides the form and shows the other ways to get in touch.
 */
export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const INQUIRY_TYPES = [
  { value: "donate", label: "Donating to the trust" },
  { value: "volunteer", label: "Volunteering" },
  { value: "program", label: "A program or activity" },
  { value: "partner", label: "Partnering with the trust" },
  { value: "other", label: "Something else" },
] as const;

export const PHONE_DISPLAY = "+91 95338 43636";
export const WHATSAPP_LINK =
  "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Manav%20Sahayata%20Trust";
