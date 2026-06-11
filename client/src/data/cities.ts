/*
 * City landing page data — Lower Mainland service area.
 * Each city gets genuinely unique copy (not find-and-replace) to stay on the
 * right side of Google's doorway-page guidelines. Only cities Freshtrax
 * actually services belong in this list.
 *
 * Used by: pages/CityLanding.tsx (route /gyms/:city), scripts/prerender.ts
 * (static HTML + sitemap entries), components/Footer.tsx (locations row).
 */

export interface City {
  slug: string;
  name: string;
  province: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;       // unique opening paragraph
  venueScene: string;  // unique local-market paragraph
  // Venue types with the strongest local fit, surfaced as link chips
  venueHighlights: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
}

const PILOT_FAQ = {
  q: "Can I see a Freshtrax machine in person before buying?",
  a: "Yes. Our pilot kiosk has been live at West Coast Badminton Academy in Richmond since April 22, 2026, with 160+ sanitization cycles run. Book a 30-minute call and we'll arrange a visit so you can watch a full cycle and inspect the machine yourself.",
};

const COST_FAQ = {
  q: "What does a Freshtrax kiosk cost to run?",
  a: "Owners pay a monthly platform fee ($79/month Founder's Club rate, locked for life, or $99/month standard) plus roughly $0.55 per cycle in electricity and consumables. At 20–30 cycles a day a kiosk projects $2,019–$3,067 in monthly net revenue. Machine acquisition cost is in the free ROI Blueprint.",
};

export const CITIES: City[] = [
  {
    slug: "vancouver",
    name: "Vancouver",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Vancouver | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization kiosks to Vancouver gyms, racket clubs, and climbing gyms. UVC + ozone, 90-second cycles, zero staff. Local pilot running in Richmond.",
    headline: "Shoe Sanitization Kiosks for Vancouver Venues",
    intro:
      "Vancouver runs one of the densest boutique-fitness markets in North America — and eight months of rain a year pushes every athlete indoors. Shared courts, shared mats, shared bouldering walls: the city's training culture is intense, and so is what it does to footwear. Freshtrax gives Vancouver venues a 90-second, self-service answer.",
    venueScene:
      "From climbing gyms where rental-shoe odor is a running joke, to badminton and pickleball clubs with strict indoor-shoe policies, to HIIT studios stacked along Main Street and into Mount Pleasant — Vancouver venues compete hard on member experience. A hygiene amenity members can see (and smell) working is a differentiator no mirror wall delivers. Our pilot kiosk operates twenty minutes away in Richmond, so you can see a live machine before committing to anything.",
    venueHighlights: [
      { label: "Climbing & bouldering gyms", href: "/bouldering-gyms" },
      { label: "Badminton centers", href: "/badminton-centers" },
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in Vancouver?",
        a: "Yes. Vancouver is in our core service area — our pilot venue operates in neighbouring Richmond, and delivery, installation, and remote monitoring are included for Vancouver venues. Machines are built to order with a 6–7 month lead time, which is exactly the window we use to finalize your placement and launch plan.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Richmond, BC | Freshtrax",
    seoDescription:
      "Freshtrax's first pilot kiosk runs live in Richmond at West Coast Badminton Academy. Self-service shoe sanitization for racket clubs, gyms, and indoor sports venues.",
    headline: "Richmond Is Where Freshtrax Went Live First",
    intro:
      "Richmond isn't on our expansion list — it's our home court. Freshtrax's first kiosk has been running at West Coast Badminton Academy since April 22, 2026, with 160+ sanitization cycles logged. If you operate a venue in Richmond, you can watch the machine work before you ever take a meeting.",
    venueScene:
      "Richmond has one of the strongest racket-sport scenes in North America — badminton in particular runs deep here, with dedicated court shoes and regulars who play multiple sessions a week. That's precisely the usage pattern Freshtrax is built for: athletes who sweat in their shoes, venues with shoe-change policies, and communities that take their gear seriously. Add the city's table tennis halls, fitness centers, and indoor courts, and Richmond is the densest cluster of natural-fit venues in the Lower Mainland.",
    venueHighlights: [
      { label: "Badminton centers", href: "/badminton-centers" },
      { label: "Tennis clubs", href: "/tennis-clubs" },
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Where can I see the Freshtrax pilot in Richmond?",
        a: "Our pilot kiosk is live at West Coast Badminton Academy. Book a 30-minute call and we'll arrange a visit — you can run a cycle, inspect the machine, and talk to us about how it's performed since launch.",
      },
      {
        q: "Is Freshtrax available for other Richmond venues?",
        a: "Yes — Richmond venues get the shortest support lines in our network since our pilot operates here. Delivery, installation, and remote monitoring are included. Machines are built to order with a 6–7 month lead time.",
      },
      COST_FAQ,
    ],
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Burnaby | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization to Burnaby's volleyball centers, badminton clubs, and gyms. 90-second UVC + ozone cycles, zero staff required.",
    headline: "Shoe Sanitization Kiosks for Burnaby Venues",
    intro:
      "Burnaby sits at the geographic heart of Metro Vancouver's indoor-sports scene — big recreation complexes, dedicated volleyball and badminton facilities, and a university population that trains year-round. High session volume in shared indoor spaces is exactly the environment Freshtrax was built for.",
    venueScene:
      "Between the club volleyball programs running nightly courts, badminton centers with dedicated-shoe rules, and the strength gyms serving SFU and BCIT students, Burnaby venues see some of the highest per-court traffic in the region. Every one of those sessions ends with sweat-soaked footwear going back into a bag. A self-service sanitization kiosk by the exit turns that daily reality into venue revenue — with zero staff time.",
    venueHighlights: [
      { label: "Badminton centers", href: "/badminton-centers" },
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in Burnaby?",
        a: "Yes. Burnaby is in our core Lower Mainland service area. Delivery, installation, and remote monitoring are included, and our Richmond pilot venue is a short drive away if you want to see a live machine first.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
  {
    slug: "surrey",
    name: "Surrey",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Surrey | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization kiosks to Surrey's pickleball courts, rec centers, and gyms. 90-second cycles, zero staff, passive venue revenue.",
    headline: "Shoe Sanitization Kiosks for Surrey Venues",
    intro:
      "Surrey is one of the fastest-growing cities in Canada, and its indoor-sports infrastructure is racing to keep up — new pickleball courts, expanding rec centers, and gym openings across every town centre. Growth means traffic, and traffic means footwear hygiene becomes a daily operational question.",
    venueScene:
      "Pickleball is the story in Surrey: courts are being added faster than anywhere else in the region, and the sport's demographics — frequent players, dedicated court shoes, long sessions — are the strongest usage fit in the Freshtrax network. Add indoor soccer facilities and family rec centres with high weekend throughput, and Surrey venues have the cycle volume that makes a kiosk's math work at the optimistic end of the range.",
    venueHighlights: [
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Tennis clubs", href: "/tennis-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in Surrey?",
        a: "Yes. Surrey is in our core Lower Mainland service area. Delivery, installation, and remote monitoring are included, and you can visit our live pilot machine in Richmond before making any decision.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Coquitlam | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization to Coquitlam and Tri-Cities gyms, indoor soccer facilities, and racket clubs. 90-second cycles, zero staff.",
    headline: "Shoe Sanitization Kiosks for Coquitlam & the Tri-Cities",
    intro:
      "The Tri-Cities train indoors. Coquitlam's sports landscape is built around indoor soccer, court sports, and year-round training facilities serving one of Metro Vancouver's most active family demographics — thousands of weekly sessions, every one ending in a pair of sweat-soaked shoes.",
    venueScene:
      "Indoor soccer is the standout fit here: turf shoes worn hard for 60–90 minutes, league nights that pack facilities from after-school to late evening, and players who keep the same pair in their bag all season. Racket clubs and strength gyms across Coquitlam, Port Coquitlam, and Port Moody round out a venue map where a self-service hygiene kiosk earns its floor space quickly.",
    venueHighlights: [
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Badminton centers", href: "/badminton-centers" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in Coquitlam and the Tri-Cities?",
        a: "Yes. Coquitlam, Port Coquitlam, and Port Moody are all in our core service area. Delivery, installation, and remote monitoring are included, and our Richmond pilot is about half an hour away if you want to see a live machine.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
  {
    slug: "langley",
    name: "Langley",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in Langley | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization kiosks to Langley's sports complexes, pickleball courts, and gyms. 90-second UVC + ozone cycles, zero staff.",
    headline: "Shoe Sanitization Kiosks for Langley Venues",
    intro:
      "Langley punches above its weight in indoor sport — major multi-court complexes, tournament hosting, and a pickleball scene growing as fast as the township itself. Tournament weekends alone push hundreds of athletes through the same facilities in 48 hours.",
    venueScene:
      "Langley's venue profile skews toward exactly what Freshtrax serves best: multi-court facilities where players arrive with dedicated shoes and stay for hours, and tournament hosts whose locker areas take a beating every event weekend. A kiosk near the court exit catches players at the moment they're most aware of what their shoes have been through — and turns it into recurring venue revenue.",
    venueHighlights: [
      { label: "Pickleball clubs", href: "/pickleball-clubs" },
      { label: "Tennis clubs", href: "/tennis-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in Langley?",
        a: "Yes. Langley City and the Township are both in our core Lower Mainland service area. Delivery, installation, and remote monitoring are included, and you can see our live pilot machine in Richmond before deciding.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    province: "BC",
    seoTitle: "Shoe Sanitization Kiosks in North Vancouver | Freshtrax",
    seoDescription:
      "Freshtrax brings self-service shoe sanitization to North Vancouver's climbing gyms, training facilities, and racket clubs. 90-second cycles, zero staff required.",
    headline: "Shoe Sanitization Kiosks for North Vancouver Venues",
    intro:
      "North Vancouver athletes are outdoor people who train indoors half the year — trail runners, climbers, and mountain athletes who move their volume inside when the North Shore goes wet. That seasonal surge concentrates serious, high-sweat training into shared indoor spaces.",
    venueScene:
      "Climbing and bouldering gyms anchor the North Shore's indoor scene, and rental-shoe odor is the most universally acknowledged problem in the sport. Add the strength and conditioning facilities where mountain athletes log their winter blocks, and North Vancouver venues serve a community that is gear-obsessed, hygiene-aware, and willing to pay for both. A 90-second self-service cycle fits the way this community already thinks about its equipment.",
    venueHighlights: [
      { label: "Climbing & bouldering gyms", href: "/bouldering-gyms" },
      { label: "Tennis clubs", href: "/tennis-clubs" },
      { label: "Gyms & training boxes", href: "/crossfit-gyms" },
    ],
    faqs: [
      {
        q: "Is Freshtrax available in North Vancouver?",
        a: "Yes. The North Shore — North Vancouver and West Vancouver — is in our core service area. Delivery, installation, and remote monitoring are included, and our Richmond pilot machine is available to visit before you decide.",
      },
      PILOT_FAQ,
      COST_FAQ,
    ],
  },
];

export const getCityBySlug = (slug: string): City | undefined =>
  CITIES.find((c) => c.slug === slug);
