/**
 * Donate page. Money goes wherever the QR code and UPI ID point, so these tests pin both
 * to the trust's verified UPI ID.
 */
import { createRequire } from "node:module";
import { expect, test } from "@playwright/test";
import { headerLink, url } from "./helpers";

const require = createRequire(import.meta.url);
const UPI_ID = "maanavsahayata@okhdfcbank";

test("the QR code on the page pays the trust's UPI ID", async ({ page }) => {
  await page.goto(url("/donate"));
  await page.addScriptTag({ path: require.resolve("jsqr/dist/jsQR.js") });
  const decoded = await page.getByAltText(/UPI QR code/).evaluate(async el => {
    const img = el as HTMLImageElement;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // @ts-expect-error jsQR is injected as a global script
    return jsQR(data.data, data.width, data.height)?.data ?? null;
  });
  expect(decoded).toContain(`upi://pay?pa=${UPI_ID}&`);
  expect(decoded).toContain("pn=Maanav%20Sahayata");
});

test("shows the UPI ID and copies it", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "clipboard permissions are Chromium-only"
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(url("/donate"));
  await expect(page.locator("#upi-id")).toHaveText(UPI_ID);
  await page.getByRole("button", { name: "Copy UPI ID" }).click();
  await expect(
    page.getByRole("button", { name: "UPI ID copied" })
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    UPI_ID
  );
});

const PARAMS =
  `pa=${UPI_ID}&pn=Maanav%20Sahayata&cu=INR` +
  "&tn=Donation%20to%20Manav%20Sahayata%20Trust";

test("shows the trust's bank details and copies account number and IFSC", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(url("/donate"));
  const bank = page.locator("dl");
  for (const text of [
    "Maanav Sahayata Trust",
    "50200081701516",
    "HDFC0009397",
    "HDFC Bank",
    "Yendada, Visakhapatnam 530045",
  ]) {
    await expect(bank).toContainText(text);
  }
  await page.getByRole("button", { name: "Copy Account number" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "50200081701516"
  );
  await page.getByRole("button", { name: "Copy IFSC" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "HDFC0009397"
  );
});

test("phones get Google Pay, PhonePe, and Paytm buttons for the trust's UPI ID", async ({
  page,
  isMobile,
}) => {
  await page.goto(url("/donate"));
  const buttons = {
    "Pay with Google Pay": `tez://upi/pay?${PARAMS}`,
    "Pay with PhonePe": `phonepe://pay?${PARAMS}`,
    "Pay with Paytm": `paytmmp://pay?${PARAMS}`,
    "Other UPI App": `upi://pay?${PARAMS}`,
  };
  for (const [name, href] of Object.entries(buttons)) {
    const link = page.getByRole("link", { name });
    if (isMobile) {
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    } else {
      await expect(link).toBeHidden();
    }
  }
});

test.describe("on iPhone", () => {
  test.use({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  test("Google Pay uses the iPhone link format", async ({ page }) => {
    await page.goto(url("/donate"));
    await expect(
      page.getByRole("link", { name: "Pay with Google Pay" })
    ).toHaveAttribute("href", `gpay://upi/pay?${PARAMS}`);
  });
});

test("donors can share their transaction details afterwards", async ({
  page,
}) => {
  await page.goto(url("/donate"));
  const share = page.getByRole("link", { name: "Share Details on WhatsApp" });
  await expect(share).toHaveAttribute(
    "href",
    /wa\.me\/919533843636\?text=.*transaction%20ID/
  );
  await expect(
    page.getByRole("link", { name: "Or send us a message" })
  ).toHaveAttribute("href", /\/contact\?interest=donate$/);
});

test("Donate buttons across the site lead to the donate page", async ({
  page,
  isMobile,
}) => {
  await page.goto(url("/programs/medical"));
  await page.getByRole("link", { name: "Donate Now" }).click();
  await expect(page).toHaveURL(url("/donate"));

  await page.goto(url("/"));
  await page.getByRole("link", { name: "Donate Today" }).click();
  await expect(page).toHaveURL(url("/donate"));

  await page.goto(url("/programs/tribal"));
  await (await headerLink(page, isMobile, "Donate")).click();
  await expect(page).toHaveURL(url("/donate"));
  await expect(page.locator("h1")).toHaveText("Your Gift Changes Lives");
});
