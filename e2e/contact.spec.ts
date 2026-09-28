/**
 * Contact form. The Web3Forms API is intercepted, so no real email is ever sent.
 * The test build uses a fake access key (see webServer.env in playwright.config.ts).
 */
import { expect, test, type Page } from "@playwright/test";
import { url } from "./helpers";

const WEB3FORMS = "https://api.web3forms.com/submit";

async function fillForm(page: Page) {
  await page.getByLabel("Your name").fill("Asha Rao");
  await page.getByLabel("Email").fill("asha@example.com");
  await page.getByLabel("Phone / WhatsApp").fill("+91 90000 00000");
  await page.getByLabel("I'm interested in").selectOption("volunteer");
  await page.getByLabel("Related program").selectOption("Bala Vikas Schools");
  await page
    .getByLabel("Message")
    .fill("I'd like to help at a Bala Vikas center on weekends.");
}

test("sends the inquiry to Web3Forms and thanks the visitor", async ({
  page,
}) => {
  let payload: Record<string, unknown> | undefined;
  await page.route(WEB3FORMS, async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      json: { success: true, message: "Email sent successfully!" },
    });
  });

  await page.goto(url("/contact"));
  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByRole("status")).toContainText("Thank you, Asha Rao!");
  expect(payload).toMatchObject({
    access_key: "e2e-test-key",
    name: "Asha Rao",
    email: "asha@example.com",
    phone: "+91 90000 00000",
    "Interested in": "Volunteering",
    "Related program": "Bala Vikas Schools",
    message: "I'd like to help at a Bala Vikas center on weekends.",
    subject: "Website inquiry: Volunteering (from Asha Rao)",
  });
  expect(payload).not.toHaveProperty("botcheck");
});

test("shows a helpful error with a WhatsApp fallback when sending fails", async ({
  page,
}) => {
  await page.route(WEB3FORMS, route =>
    route.fulfill({
      status: 500,
      json: { success: false, message: "Server error" },
    })
  );

  await page.goto(url("/contact"));
  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();

  const alert = page.getByRole("alert");
  await expect(alert).toContainText("couldn't be sent");
  await expect(alert.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    /wa\.me\/919533843636/
  );
  // The visitor's text is kept so they can retry
  await expect(page.getByLabel("Message")).not.toBeEmpty();
});

test("requires name, email, interest, and message before sending", async ({
  page,
}) => {
  let requests = 0;
  await page.route(WEB3FORMS, route => {
    requests++;
    return route.fulfill({ json: { success: true } });
  });

  await page.goto(url("/contact"));
  await page.getByRole("button", { name: "Send Message" }).click();

  for (const label of ["Your name", "Email", "I'm interested in", "Message"]) {
    expect(
      await page
        .getByLabel(label)
        .evaluate(el => (el as HTMLInputElement).validity.valid),
      label
    ).toBe(false);
  }
  expect(requests).toBe(0);
});

test("the home page donate link opens the form with donating preselected", async ({
  page,
}) => {
  await page.goto(url("/"));
  await page.getByRole("link", { name: "Send us a message" }).first().click();
  await expect(page).toHaveURL(url("/contact?interest=donate"));
  await expect(page.getByLabel("I'm interested in")).toHaveValue("donate");
});
