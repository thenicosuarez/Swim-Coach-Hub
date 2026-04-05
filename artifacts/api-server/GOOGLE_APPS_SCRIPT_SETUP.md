# Google Apps Script Setup Guide

When you have a Google account ready, follow these steps to enable automatic Google Sheets logging and email notifications for every new intake submission.

## Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet called **Swim Coach Leads**.
2. In row 1, add these headers in columns A–K:
   `ID | Name | Email | Phone | Service | Preferred Date | Preferred Time | Notes | Status | Submitted At | Neighborhood`

## Step 2 — Create a Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**.
2. Replace all code in the editor with the script below.
3. Click **Save**.

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse neighborhood from notes JSON if present
    let neighborhood = "";
    try {
      const notes = JSON.parse(data.notes || "{}");
      neighborhood = notes.neighborhood || "";
    } catch (_) {}

    sheet.appendRow([
      data.id,
      data.name,
      data.email,
      data.phone || "",
      data.service,
      data.preferredDate || "",
      data.preferredTime || "",
      data.notes || "",
      data.status,
      data.createdAt,
      neighborhood,
    ]);

    // Send email notification to yourself
    const coachEmail = "YOUR_EMAIL@gmail.com"; // <-- Replace with your email
    GmailApp.sendEmail(
      coachEmail,
      `New intake: ${data.name} — ${data.service}`,
      `You have a new booking request!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nService: ${data.service}\nNeighborhood: ${neighborhood}\n\nCheck your coach dashboard for full details.`
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3 — Deploy the script

1. Click **Deploy → New deployment**.
2. Choose type: **Web app**.
3. Set **Execute as**: Me.
4. Set **Who has access**: Anyone (this is necessary for the webhook to work).
5. Click **Deploy** and copy the **Web app URL**.

## Step 4 — Set the environment variable

In your Replit project secrets (or `.env` on Vercel), add:

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

That's it! Every new intake form submission will now automatically appear in your Google Sheet and send you an email.

## Optional: Email-only (no Google Sheets)

If you prefer direct email without Google Sheets, set these env vars instead:

```
NOTIFICATION_EMAIL=your@email.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your@gmail.com
```

To generate a Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords.
