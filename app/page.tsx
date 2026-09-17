export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main>
      <section className="hero">
        <h1>Ran Watari</h1>
        <p>an exchange student at UH Manoa studying linguistics.</p>
      </section>

      <section className="section">
        <h2>About</h2>
        <p>
          Ran Watari is an exchange student at the University of Hawai&apos;i
          at Manoa, where she studies linguistics. Her coursework focuses on
          how language is structured and how it shapes communication across
          cultures. Through this exchange, she hopes to broaden her
          perspective on language learning both inside and outside the
          classroom.
        </p>
      </section>

      <section className="section">
        <h2>This semester</h2>
        <p className="placeholder-note">(placeholder &mdash; I&apos;ll update this)</p>
        <ul>
          <li>Taking courses in phonetics and syntax</li>
          <li>Joining the campus language exchange club</li>
          <li>Improving conversational English through daily practice</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Ran Watari &copy; {year}</p>
      </footer>
    </main>
  );
}
