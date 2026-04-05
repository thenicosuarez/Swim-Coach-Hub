# Tally Intake Form Setup Guide

This guide covers creating the intake form in Tally and connecting it to the swim coach site and API.

## Step 1 — Create Your Tally Form

1. Go to [tally.so](https://tally.so) and sign up / log in.
2. Create a new form titled **"Swim Coaching Intake"**.
3. Add the fields below with the **exact field keys** shown (set them in Field Settings → Identifier):

### Required Fields

| Label | Field Key | Type | Required |
|---|---|---|---|
| Your Name | `name` | Short text | Yes |
| Email Address | `email` | Email | Yes |
| Phone Number | `phone` | Phone | Yes |
| Neighborhood / Area | `neighborhood` | Short text | Yes |

### About the Swimmer

| Label | Field Key | Type | Required |
|---|---|---|---|
| Swimmer's Age | `swimmer_age` | Short text | No |
| Service Interest | `service` | Dropdown | Yes |
| Current Experience Level | `experience` | Dropdown | No |

**Service Interest dropdown options (use these exact values):**
- `private_lesson` — Private Lesson
- `group_session` — Group / Family Session
- `stroke_clinic` — Stroke Clinic
- `video_analysis` — Video Review
- `package_5` — 5-Session Package
- `package_10` — 10-Session Package

**Experience Level dropdown options:**
- `none` — No swimming experience
- `beginner` — Beginner (can float / kick a little)
- `intermediate` — Intermediate (can swim but wants to improve)
- `advanced` — Advanced / competitive swimmer

### Goals & Preferences

| Label | Field Key | Type | Required |
|---|---|---|---|
| Main Goal | `goal` | Multiple choice | Yes |
| Want to learn all 4 strokes? | `all_four_strokes` | Multiple choice | Yes |
| Pool access? | `pool_access` | Multiple choice | Yes |
| Anything else I should know? | `notes` | Long text | No |

**Main Goal options (use these exact values):**
- `water_safety` — Survival / Water Safety
- `recreational` — Recreational / Vacation Ready
- `competitive` — Stroke Precision / Competitive

**Pool Access options:**
- `own_pool` — Yes, I have a pool
- `building_pool` — Building / HOA pool
- `need_location` — I need a location

## Step 2 — Get the Form URL

1. After creating the form, click **Share**.
2. Copy the form URL — it will look like `https://tally.so/r/XXXXXX`.
3. Set this as the `VITE_TALLY_FORM_URL` environment variable in your Replit Secrets.

## Step 3 — Set Up the Webhook

1. In Tally, go to your form → **Integrations → Webhooks**.
2. Add a new webhook with:
   - **URL:** `https://your-domain.replit.app/api/webhooks/tally`
   - **Events:** Form Response
3. Copy the **Signing Secret** that Tally generates.
4. Add it as `TALLY_WEBHOOK_SECRET` in your Replit Secrets.

## Step 4 — Verify the Connection

Submit a test response on your Tally form. Within seconds you should see it appear in the Coach Dashboard → Leads tab.

---

## Google Sheets Integration (Optional)

If you also want responses logged to a Google Sheet, see `GOOGLE_APPS_SCRIPT_SETUP.md` for instructions on setting up the `GOOGLE_SHEETS_WEBHOOK_URL` environment variable.
