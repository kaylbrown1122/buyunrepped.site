#!/usr/bin/env node
/**
 * Verifies Supabase + SendGrid env/config for marketing outreach.
 *
 * Usage (from hosting/):
 *   node --env-file=.env.local scripts/verify-outreach-setup.mjs
 */

const checks = [];

function pass(label, detail) {
  checks.push({ status: 'ok', label, detail });
}

function warn(label, detail) {
  checks.push({ status: 'warn', label, detail });
}

function fail(label, detail) {
  checks.push({ status: 'fail', label, detail });
}

function isPlaceholder(value) {
  if (!value) return true;
  return /your_|_here|changeme|example/i.test(value);
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY?.trim();
  const sendgridKey = process.env.SENDGRID_API_KEY?.trim();
  const sendgridFrom = process.env.SENDGRID_FROM_EMAIL?.trim() || 'kayla@buyunrepped.com';
  const spamSecret = process.env.SPAM_GUARD_SECRET?.trim();

  console.log('BuyUnrepped outreach setup check\n');

  if (!supabaseUrl || isPlaceholder(supabaseUrl)) {
    fail('SUPABASE_URL', 'Missing or still a placeholder');
  } else if (!supabaseUrl.includes('gxdqsonpcngzjiugfhzy')) {
    warn('SUPABASE_URL', `Set to ${supabaseUrl} (expected buyunrepped website project)`);
  } else {
    pass('SUPABASE_URL', supabaseUrl);
  }

  if (!supabaseSecret || isPlaceholder(supabaseSecret)) {
    fail('SUPABASE_SECRET_KEY', 'Missing or still a placeholder (service role / secret key)');
  } else {
    pass('SUPABASE_SECRET_KEY', 'Present');
  }

  if (!sendgridKey || isPlaceholder(sendgridKey)) {
    fail('SENDGRID_API_KEY', 'Missing or still a placeholder');
  } else if (!sendgridKey.startsWith('SG.')) {
    warn('SENDGRID_API_KEY', 'Does not start with SG. — double-check the key');
  } else {
    pass('SENDGRID_API_KEY', 'Present');
  }

  pass('SENDGRID_FROM_EMAIL', sendgridFrom);

  if (!spamSecret || spamSecret.length < 32) {
    warn('SPAM_GUARD_SECRET', 'Missing or shorter than 32 chars (required in production)');
  } else {
    pass('SPAM_GUARD_SECRET', 'Present');
  }

  if (supabaseUrl && supabaseSecret && !isPlaceholder(supabaseSecret)) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/marketing_waitlist?select=id&limit=1`, {
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
        },
      });

      if (res.ok) {
        pass('Supabase marketing_waitlist', 'Table reachable with secret key');
      } else {
        const body = await res.text();
        fail('Supabase marketing_waitlist', `HTTP ${res.status}: ${body.slice(0, 200)}`);
      }
    } catch (error) {
      fail('Supabase marketing_waitlist', error instanceof Error ? error.message : String(error));
    }
  }

  if (sendgridKey && sendgridKey.startsWith('SG.')) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/user/profile', {
        headers: { Authorization: `Bearer ${sendgridKey}` },
      });

      if (res.ok) {
        const profile = await res.json();
        pass('SendGrid API', `Authenticated as ${profile.user ?? profile.username ?? 'unknown'}`);
      } else {
        const body = await res.text();
        fail('SendGrid API', `HTTP ${res.status}: ${body.slice(0, 200)}`);
      }
    } catch (error) {
      fail('SendGrid API', error instanceof Error ? error.message : String(error));
    }
  }

  console.log('');
  for (const check of checks) {
    const icon = check.status === 'ok' ? '✓' : check.status === 'warn' ? '!' : '✗';
    console.log(`${icon} ${check.label}: ${check.detail}`);
  }

  const failed = checks.filter((c) => c.status === 'fail').length;
  const warnings = checks.filter((c) => c.status === 'warn').length;

  console.log('');
  if (failed > 0) {
    console.log(`Result: ${failed} failure(s), ${warnings} warning(s). Fix failures before going live.`);
    process.exit(1);
  }

  if (warnings > 0) {
    console.log(`Result: all critical checks passed with ${warnings} warning(s).`);
  } else {
    console.log('Result: outreach stack looks ready.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
