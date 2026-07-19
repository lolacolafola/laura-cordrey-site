import './LogoBanner.css'

// Typographic credentials strip. The names ARE the proof — bitmap logos
// at faded opacity read as SaaS-template-coded; display type at full ink
// holds the site's editorial voice.
const clients = ['Ubisoft', 'Amazon Games', 'BlaBlaCar', 'Azarus / Animoca']

export default function LogoBanner() {
  return (
    <section className="logo-banner" aria-label="Past clients">
      <div className="container">
        <div className="logo-banner__head">
          <span className="marker">Thirteen years building this across consumer, tech, gaming</span>
        </div>

        <ul className="logo-banner__row">
          {clients.map((name, i) => (
            <li className="logo-banner__cell" key={name}>
              <span className="logo-banner__name">{name}</span>
              {i < clients.length - 1 && (
                <span className="logo-banner__sep" aria-hidden="true">·</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
