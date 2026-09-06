#!/usr/bin/env bash
# Diagnose "this site is a security risk" warnings reported on some networks.
#
# RUN THIS WHILE ON THE NETWORK THAT SHOWS THE WARNING. That is the whole
# point — it is measuring what that network does to the connection. Run it on
# the affected broadband, or tether to the phone on the affected carrier.
#
#   bash scripts/net-diagnose.sh
#
# It is read-only: it resolves names and opens TLS connections. It changes
# nothing, sends nothing, and needs no credentials.
#
# The decisive check is CHECK 3. If the certificate presented for
# lauracordrey.com was not issued by Let's Encrypt, something on the network is
# intercepting the connection, and that is the whole answer.

set -u

TRUE_IP="75.2.60.5"          # Netlify's shared anycast apex address
EXPECT_ISSUER="Let's Encrypt"

green() { printf '\033[32m%s\033[0m\n' "$1"; }
red()   { printf '\033[31m%s\033[0m\n' "$1"; }
warn()  { printf '\033[33m%s\033[0m\n' "$1"; }
hr()    { printf '%s\n' "------------------------------------------------------------"; }

echo
echo "Network diagnostic for lauracordrey.com"
echo "Run at: $(date)"
hr

# ── CHECK 1 ── Which resolver, and what does it return? ─────────────────
echo "CHECK 1 — DNS"
resolver=$(scutil --dns 2>/dev/null | awk '/nameserver\[0\]/ {print $3; exit}')
[ -z "$resolver" ] && resolver=$(awk '/^nameserver/ {print $2; exit}' /etc/resolv.conf 2>/dev/null)
echo "  Resolver in use : ${resolver:-unknown}"

got_ip=$(dig +short lauracordrey.com A 2>/dev/null | head -1)
echo "  lauracordrey.com resolves to : ${got_ip:-<nothing>}"
echo "  It should resolve to         : $TRUE_IP"

if [ -z "$got_ip" ]; then
  red   "  ✗ DNS returned nothing. The network is blocking this at the DNS level."
elif [ "$got_ip" = "$TRUE_IP" ]; then
  green "  ✓ DNS is clean — not a DNS-level block."
else
  red   "  ✗ WRONG ADDRESS. The network is redirecting the domain to its own"
  red   "    server. This is a DNS-level filter, and it is the cause."
fi
hr

# ── CHECK 2 ── Does the site respond at all? ────────────────────────────
echo "CHECK 2 — Can each URL be reached?"
echo "  Same website, three different domains and three different servers."
echo
for u in "https://lauracordrey.com" "https://lauracordrey.netlify.app" "https://lolacolafola.github.io/laura-cordrey-site/"; do
  code=$(curl -s -o /dev/null -m 15 -w "%{http_code}" "$u" 2>/dev/null)
  err=$?
  if [ "$code" = "200" ]; then
    printf '  '; green "✓ $u"
  else
    printf '  '; red "✗ $u  (http=$code curl_exit=$err)"
  fi
done
echo
echo "  How to read this:"
echo "    lauracordrey.com fails, the other two work"
echo "        -> the network is filtering THE DOMAIN NAME. Nothing is wrong"
echo "           with the site. Fix is to get the domain categorised."
echo "    all three fail   -> the network itself, not this site."
echo "    all three work   -> not blocked from here. Test on the network that"
echo "                        actually shows the warning."
hr

# ── CHECK 3 ── THE DECISIVE ONE: who issued the certificate? ────────────
echo "CHECK 3 — Certificate actually presented  (the decisive check)"
cert=$(echo | openssl s_client -connect lauracordrey.com:443 -servername lauracordrey.com 2>/dev/null | openssl x509 -noout -subject -issuer 2>/dev/null)

if [ -z "$cert" ]; then
  red "  ✗ Could not complete a TLS handshake at all."
  red "    Something is refusing the encrypted connection outright."
else
  echo "$cert" | sed 's/^/  /'
  echo
  if echo "$cert" | grep -q "$EXPECT_ISSUER"; then
    green "  ✓ Genuine certificate. Let's Encrypt issued this — it is really"
    green "    the site, end to end. NOTHING is intercepting the connection."
  else
    red   "  ✗✗ INTERCEPTION CONFIRMED."
    red   "     Expected an issuer containing: $EXPECT_ISSUER"
    red   "     Something on this network is substituting its own certificate."
    red   "     THAT is what produces the browser's security warning. The site"
    red   "     itself is fine. Send this block to whoever runs the network."
  fi
fi
hr

echo "Done."
echo
echo "Send the whole output above to Laura. The single most useful line is"
echo "the certificate issuer in CHECK 3."
echo
