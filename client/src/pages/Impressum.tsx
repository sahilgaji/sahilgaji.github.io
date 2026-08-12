export default function Impressum() {
  return (
    <div className="legal-page">
      <a href="/" className="legal-back">← Zurück</a>
      <h1>Impressum</h1>
      <p className="legal-draft">Entwurf — wird vor dem Launch finalisiert.</p>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Sahil Gaji
        <br />
        Hamburg
        <br />
        Deutschland
      </p>
      <p className="legal-draft">Vollständige, ladungsfähige Anschrift folgt vor Launch.</p>
      <p>E-Mail: sahil.gaji@outlook.com</p>

      <h2>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
      <p>Sahil Gaji, Anschrift wie oben.</p>

      <style>{`
        .legal-page { max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem; font-family: var(--font-sans, sans-serif); color: var(--ink); background: var(--paper); }
        .legal-back { font-family: var(--font-mono); font-size: 0.8rem; color: var(--blue); text-decoration: none; }
        .legal-page h1 { font-size: 2rem; font-weight: 500; margin: 1.5rem 0 0.4rem; }
        .legal-page h2 { font-size: 1.05rem; font-weight: 500; margin: 2rem 0 0.4rem; }
        .legal-page p { line-height: 1.6; margin: 0 0 0.6rem; }
        .legal-draft { font-family: var(--font-mono); font-size: 0.8rem; color: #68645d; }
      `}</style>
    </div>
  );
}
