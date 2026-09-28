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
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
  "7ddcc658-6885-41bd-8e4c-1cc68d86c954";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const INQUIRY_TYPES = [
  { value: "donate", label: "Donating to the trust" },
  { value: "volunteer", label: "Volunteering" },
  { value: "program", label: "A program or activity" },
  { value: "partner", label: "Partnering with the trust" },
  { value: "other", label: "Something else" },
] as const;

/**
 * UPI donations. Verified against the trust's QR code (client/public/images/donate/upi-qr.png),
 * which decodes to upi://pay?pa=maanavsahayata@okhdfcbank&pn=Maanav%20Sahayata.
 * Changing the UPI ID means replacing that QR image too; e2e/donate.spec.ts checks they match.
 */
export const UPI_ID = "maanavsahayata@okhdfcbank";
export const UPI_PAYEE_NAME = "Maanav Sahayata";
const UPI_PARAMS =
  `pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&cu=INR` +
  `&tn=${encodeURIComponent("Donation to Maanav Sahayata Trust")}`;

/** Generic UPI link: the phone asks which UPI app to use (BHIM, bank apps, …) */
export const UPI_PAY_LINK = `upi://pay?${UPI_PARAMS}`;

/**
 * Links that open a specific UPI app straight to the payment screen (phones only).
 * Google Pay uses a different scheme on iPhone (gpay://) and Android (tez://).
 * Apps may decline link-started payments to non-merchant accounts, so the page keeps the
 * QR code and UPI ID as a fallback.
 */
export function upiAppLinks(isIOS: boolean) {
  return [
    {
      app: "Google Pay",
      href: `${isIOS ? "gpay" : "tez"}://upi/pay?${UPI_PARAMS}`,
    },
    { app: "PhonePe", href: `phonepe://pay?${UPI_PARAMS}` },
    { app: "Paytm", href: `paytmmp://pay?${UPI_PARAMS}` },
  ];
}

/**
 * Bank account for NEFT / RTGS / IMPS transfers (from the trust, 2026-09-27).
 * IFSC verified: HDFC Bank, Yendada branch, Visakhapatnam 530045. The account name must be
 * shown exactly as the bank has it.
 */
export const BANK_ACCOUNT = {
  name: "Maanav Sahayata Trust",
  number: "50200081701516",
  ifsc: "HDFC0009397",
  bank: "HDFC Bank",
  branch: "Yendada, Visakhapatnam 530045",
};

/** WhatsApp message for donors sharing their transaction details after giving */
export const WHATSAPP_DONATED_LINK =
  "https://wa.me/919533843636?text=" +
  encodeURIComponent(
    "Hello, I just donated to Maanav Sahayata Trust.\nName: \nAmount: \nPaid by (UPI / bank transfer): \nUPI transaction ID or bank UTR: "
  );

export const PHONE_DISPLAY = "+91 95338 43636";
export const WHATSAPP_LINK =
  "https://wa.me/919533843636?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Maanav%20Sahayata%20Trust";
