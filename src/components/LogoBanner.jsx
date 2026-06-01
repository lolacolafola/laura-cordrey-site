import './LogoBanner.css'

// One source of truth for the past-clients strip.
// If `src` is null, the brand renders as typographic name only — useful
// when no clean logo asset exists yet (e.g. Ubisoft).
const primary = [
  { name: 'Ubisoft',      src: null },
  { name: 'Amazon Games', src: 'logos/amazon-games-2.png' },
  { name: 'BlaBlaCar',    src: 'logos/blablacar.png' },
  { name: 'US Mobile',    src: 'logos/us-mobile.png' },
  { name: 'Azarus',       src: 'logos/azarus.png' },
  { name: 'AllSaints',    src: 'logos/allsaints.png' },
]

const secondary = ['Selfridges', 'IKEA', 'Dazzly', 'Basso & Brooke', 'Fabric Pour', 'Apprt']

const BASE = import.meta.env.BASE_URL

export default function LogoBanner() {
  return (
    <section className="logo-banner" aria-label="Past clients">
      <div className="container">
        <div className="logo-banner__head">
          <span className="marker">Selected clients · Across consumer, tech, gaming</span>
        </div>

        <ul className="logo-banner__row">
          {primary.map((b) => (
            <li className="logo-banner__cell" key={b.name}>
              {b.src ? (
                <img
                  src={BASE + b.src}
                  alt={b.name}
                  className="logo-banner__img"
                  loading="lazy"
                />
              ) : (
                <span className="logo-banner__text" aria-label={b.name}>
                  {b.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        {secondary.length > 0 && (
          <p className="logo-banner__also marker">
            Also · {secondary.join(' · ')}
          </p>
        )}
      </div>
    </section>
  )
}
