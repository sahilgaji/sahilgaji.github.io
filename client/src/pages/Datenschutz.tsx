export default function Datenschutz() {
  return (
    <div className="legal-page">
      <a href="/" className="legal-back">← Zurück</a>
      <h1>Datenschutzerklärung</h1>
      <p className="legal-draft">Entwurf — wird vor dem Launch finalisiert. Stand: Juli 2026.</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Sahil Gaji, Hamburg, Deutschland (vollständige Anschrift folgt vor Launch).
        <br />
        E-Mail: sahil.gaji@outlook.com
      </p>

      <h2>2. Hosting (GitHub Pages)</h2>
      <p>
        Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88
        Colin P Kelly Jr St, San Francisco, CA 94107, USA. Beim Aufruf der Seiten
        verarbeitet GitHub technisch notwendige Server-Logdaten (insbesondere IP-Adresse,
        Datum und Uhrzeit des Zugriffs, User-Agent), um die Website sicher und zuverlässig
        auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        am sicheren Betrieb). GitHub ist unter dem EU-US Data Privacy Framework zertifiziert.
        Weitere Informationen:{" "}
        <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">
          GitHub Privacy Statement
        </a>
        .
      </p>

      <h2>3. Keine Cookies, kein Tracking</h2>
      <p>
        Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Tools und
        bindet keine Inhalte von Drittservern ein. Schriftarten werden lokal von dieser
        Website ausgeliefert (kein Google Fonts CDN).
      </p>

      <h2>4. Kontaktaufnahme</h2>
      <p>
        Bei Kontaktaufnahme per E-Mail werden die übermittelten Angaben ausschließlich zur
        Beantwortung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung,
        Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die
        Verarbeitung Ihrer personenbezogenen Daten. Außerdem besteht ein Beschwerderecht bei
        einer Datenschutz-Aufsichtsbehörde.
      </p>

      <style>{`
        .legal-page { max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem; font-family: var(--font-sans, sans-serif); color: var(--ink); background: var(--paper); }
        .legal-back { font-family: var(--font-mono); font-size: 0.8rem; color: var(--blue); text-decoration: none; }
        .legal-page h1 { font-size: 2rem; font-weight: 500; margin: 1.5rem 0 0.4rem; }
        .legal-page h2 { font-size: 1.05rem; font-weight: 500; margin: 2rem 0 0.4rem; }
        .legal-page p { line-height: 1.6; margin: 0 0 0.6rem; }
        .legal-draft { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
