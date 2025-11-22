import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";

/* Hero illustration chosen (your uploaded file #5) */
const HERO_IMG = "store.jpg";

/* sample data (replace with API when ready) */
const STORES = [
  { id:1, name:"Urban Coffee House", category:"Cafe", location:"Banjara Hills", rating:4.9 },
  { id:2, name:"ElectroMart", category:"Electronics", location:"Kukatpally", rating:4.4 },
  { id:3, name:"Green Grocers", category:"Grocery", location:"Secunderabad", rating:4.7 },
  { id:4, name:"Paper & Co", category:"Stationery", location:"Ameerpet", rating:4.1 },
  { id:5, name:"Cafe Central", category:"Cafe", location:"MG Road", rating:4.6 },
  { id:6, name:"Style Studio", category:"Fashion", location:"Banjara Hills", rating:4.3 },
];

const TRUSTED = ["Puma", "Adobe", "Google", "PayPal", "Spotify", "Nike"];
const INTEGRATIONS = ["Google","Facebook","Shopify","WordPress","Zapier","G2","Trustpilot","Yelp"];

const FEATURES = [
  { title: "Fast review collection", desc: "Request reviews via SMS, email or shareable links — customers leave feedback in seconds." },
  { title: "Video & text testimonials", desc: "Accept short video testimonials or quick text reviews — both show social proof." },
  { title: "One review inbox", desc: "Centralize reviews from multiple sources and moderate from one dashboard." },
];

const TESTIMONIALS = [
  { text: "StorePulse helped us increase footfall by 28% — beautiful widgets and easy setup.", name: "Anita R.", role: "Owner, Cafe Bloom" },
  { text: "The video testimonial flow is brilliant. Customers record in one click.", name: "Ravi K.", role: "Manager, TechStop" },
];

const PLANS = [
  { id:'free', title:'Free', price:'0', bullets:['Up to 10 testimonials','Basic widgets','Community support'] },
  { id:'pro', title:'Pro', price:'29', bullets:['Unlimited testimonials','Advanced widgets','Remove branding','Email campaigns'], popular:true },
  { id:'enterprise', title:'Enterprise', price:'Custom', bullets:['SSO','Account manager','Custom integrations'] },
];

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let res = STORES.filter(s => {
      const matchesQ = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
      const matchesCat = filter === "all" || s.category.toLowerCase() === filter;
      return matchesQ && matchesCat;
    });
    if (sort === "rating") res = res.sort((a,b) => b.rating - a.rating);
    return res;
  }, [query, filter, sort]);

  return (
    <main className="font-body text-neutral-900 bg-white">
      {/* NAV */}
      <header className="border-b border-neutral-100">
  <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
    
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-semibold">SR</div>
      <div className="font-semibold text-lg">StorePulse</div>
    </div>

    <nav className="hidden md:flex items-center gap-6 text-neutral-700 font-medium">
      <Link to="/" className="hover:text-neutral-900">Home</Link>
      <Link to="/about" className="hover:text-neutral-900">About</Link>
      <Link to="/contact" className="hover:text-neutral-900">Contact</Link>
      <Link to="/login" className="hover:text-neutral-900">Login</Link>
      <Link to="/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
        Sign Up
      </Link>
    </nav>

    <div className="md:hidden">
      <button className="btn-ghost text-xl">☰</button>
    </div>
  </div>
</header>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium w-max">
            Trusted reviews — real shoppers
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">
            Collect customer testimonials & increase local sales
          </h1>

          <p className="text-neutral-600 max-w-xl">
            Capture authentic customer reviews — text or video — manage them centrally and embed trust across your site and checkout flows. Easy setup, instant results.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/signup" className="btn-primary">Get started — it’s free</Link>
            <Link to="/features" className="btn-ghost">Learn more</Link>
          </div>

          <div className="text-sm text-neutral-500 mt-2">
            <strong>1966+</strong> shops use StorePulse • No credit card required 🎉
          </div>

          {/* Search */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <div className="flex gap-3 items-center">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search shops, category, or location (e.g., 'coffee', 'electronics')"
                className="search-input"
              />
              <select className="rounded-lg border border-neutral-200 px-3 py-2" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All categories</option>
                <option value="cafe">Cafe</option>
                <option value="electronics">Electronics</option>
                <option value="grocery">Grocery</option>
                <option value="stationery">Stationery</option>
              </select>
              <select className="rounded-lg border border-neutral-200 px-3 py-2" value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="rating">Highest rating</option>
              </select>

              <button className="px-4 py-2 bg-primary-500 rounded-lg text-white font-medium">Search</button>
            </div>

            {query && (
              <div className="mt-4 space-y-3">
                {filtered.length === 0 ? (
                  <div className="text-sm text-neutral-500">No shops found — try another keyword.</div>
                ) : (
                  filtered.slice(0,6).map(s => (
                    <div key={s.id} className="p-3 bg-white border rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm text-neutral-500">{s.category} • {s.location}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">{s.rating.toFixed(1)}</div>
                        <RatingStars value={Math.round(s.rating)} />
                        <Link to={`/stores/${s.id}`} className="text-primary-600 hover:underline text-sm">Open</Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* right */}
        <div className="relative">
          <div className="card overflow-hidden card-hover-lift">
            <img src={HERO_IMG} alt="dashboard" className="w-full h-72 object-cover block" />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">Downtown Market</div>
                  <div className="text-sm text-neutral-500">Charminar, Hyderabad</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <RatingStars value={5} />
                    <div className="text-sm font-semibold">4.9</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-neutral-600">Collect customer reviews and surface the best ones on your site with a single embed code.</div>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 opacity-50 blur-3xl pointer-events-none animate-floaty"></div>
        </div>
      </section>

      {/* TRUSTED */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 text-center">
          <div className="text-neutral-600 mb-6">Trusted by hundreds of businesses worldwide</div>
          <div className="flex items-center justify-center gap-10 flex-wrap opacity-80">
            {TRUSTED.map((t, i) => (
              <div key={i} className="bg-white/0 px-4 py-2 rounded-md text-neutral-600">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="card p-6 card-hover-lift">
              <div className="text-primary-600 text-sm font-semibold mb-2">{f.title}</div>
              <div className="font-semibold text-lg mb-2">{f.title}</div>
              <p className="text-neutral-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMISE + METRICS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 section-bg rounded-xl my-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3">The fastest way to add reviews to your website</h3>
            <p className="text-neutral-600 mb-4">Copy & paste a tiny embed to add review widgets anywhere — Shopify, Webflow, WordPress and more. Set up once, keep the social proof rolling.</p>
            <Link to="/signup" className="btn-primary">Start collecting reviews</Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded-lg text-sm">
              <div className="font-semibold">3X</div>
              <div className="text-neutral-500">Conversion Rates</div>
            </div>
            <div className="p-4 bg-white border rounded-lg text-sm">
              <div className="font-semibold">2X</div>
              <div className="text-neutral-500">More testimonials</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE: Auto-scrolling review tape */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <h4 className="text-xl font-semibold mb-6">Recent reviews</h4>

        <div className="marquee">
          {/* duplicate track content for seamless infinite scroll */}
          <div className="marquee-track">
            {STORES.map(s => (
              <div key={`a-${s.id}`} className="review-card mr-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-muted">{s.category} • {s.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <RatingStars value={Math.round(s.rating)} />
                      <div className="text-sm font-semibold">{s.rating.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-neutral-600">“Loved the quick support and easy widget embed — helped boost our online orders.”</div>
              </div>
            ))}

            {/* clone */}
            {STORES.map(s => (
              <div key={`b-${s.id}`} className="review-card mr-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-muted">{s.category} • {s.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <RatingStars value={Math.round(s.rating)} />
                      <div className="text-sm font-semibold">{s.rating.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-neutral-600">“Excellent experience — our widget increased trust instantly.”</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITY & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card p-6">
            <h3 className="text-xl font-semibold mb-4">Customer stories</h3>
            <div className="space-y-4">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="text-neutral-700 mb-1">“{t.text}”</div>
                  <div className="text-sm text-neutral-500 mt-2">{t.name} — {t.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h4 className="font-semibold mb-3">Activity</h4>
            <div className="text-sm text-neutral-600">
              <div className="mb-3">Chris left a new testimonial 🎉</div>
              <div className="mb-3">Imported 2 new reviews from Google</div>
              <div className="mb-3">Embed code copied 12 times this week</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 bg-neutral-50 border-t">
        <h4 className="text-xl font-semibold mb-6">Integrations & import sources</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {INTEGRATIONS.map(i => <div key={i} className="p-3 bg-white rounded-lg text-sm text-neutral-600 text-center">{i}</div>)}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 bg-white border-t">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-semibold">Start collecting testimonials for free</h3>
          <p className="text-neutral-600 mt-2">Choose a plan that fits your needs — scale as you grow.</p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {PLANS.map(p => (
            <div key={p.id} className={`p-6 border rounded-2xl ${p.popular ? 'border-primary-500 shadow-purple-glow' : 'bg-white'}`}>
              {p.popular && <div className="text-sm text-primary-600 font-semibold mb-2">Most popular</div>}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">{p.title}</div>
                  <div className="text-sm text-neutral-500">Monthly / Yearly</div>
                </div>
                <div className="text-3xl font-bold">{p.price === '0' ? '$0' : `$${p.price}`}</div>
              </div>

              <ul className="mt-4 text-sm text-neutral-600 space-y-1">
                {p.bullets.map((b, i) => <li key={i}>• {b}</li>)}
              </ul>

              <div className="mt-6">
                <Link to="/signup" className="btn-primary w-full text-center">Get started</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR WIDGETS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 bg-neutral-50 border-t">
        <h4 className="text-xl font-semibold mb-4">Popular review widgets</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold">Google Review Widget</div>
            <div className="text-sm text-neutral-600 mt-2">Show your Google reviews on any website.</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold">Etsy Review Widget</div>
            <div className="text-sm text-neutral-600 mt-2">Show your Etsy reviews on any website.</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold">G2 Review Widget</div>
            <div className="text-sm text-neutral-600 mt-2">Show your G2 reviews on any website.</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-semibold">Ready to boost sales with testimonials?</h4>
            <p className="text-neutral-600">Get your testimonials and customer reviews in front of visitors.</p>
          </div>

          <div className="flex gap-3">
            <Link to="/signup" className="btn-primary">Get started free</Link>
            <Link to="/pricing" className="btn-ghost">See pricing</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
<footer className="bg-neutral-900 text-neutral-300 mt-10 pt-14">
  <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-4 gap-10">

    {/* ABOUT */}
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl">
          ⭐
        </div>
        <h3 className="text-lg font-semibold text-white">StorePulse</h3>
      </div>

      <p className="text-sm leading-relaxed">
        ⭐ StorePulse helps shoppers discover trusted stores and share real ratings.  
        🏬 Businesses grow faster with authentic social proof.  
        ⭐ Transparent • Reliable • Customer-powered ratings platform.
      </p>

      <div className="flex gap-3 pt-2">
        <span className="text-2xl hover:scale-110 transition cursor-pointer">🏬</span>
        <span className="text-2xl hover:scale-110 transition cursor-pointer">⭐</span>
        <span className="text-2xl hover:scale-110 transition cursor-pointer">📍</span>
        <span className="text-2xl hover:scale-110 transition cursor-pointer">💬</span>
      </div>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h4 className="text-white font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/features" className="hover:text-white">Features</Link></li>
        <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
        <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
        <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
      </ul>
    </div>

    {/* SUPPORT */}
    <div>
      <h4 className="text-white font-semibold mb-4">Support</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
        <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
        <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
        <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
        <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
      </ul>
    </div>

    {/* SOCIALS */}
    <div>
      <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
      <div className="flex gap-4 text-2xl">
        <span className="cursor-pointer hover:scale-110 transition">📘</span>
        <span className="cursor-pointer hover:scale-110 transition">🐦</span>
        <span className="cursor-pointer hover:scale-110 transition">📸</span>
        <span className="cursor-pointer hover:scale-110 transition">💼</span>
      </div>

      <p className="text-sm text-neutral-400 mt-4">
        Follow for updates, store insights, and rating trends.
      </p>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-neutral-800 mt-10 py-5 text-center text-sm text-neutral-500">
    © {new Date().getFullYear()} StorePulse. Made with ⭐ love for local shops.
  </div>
</footer>

    </main>
  );
}
