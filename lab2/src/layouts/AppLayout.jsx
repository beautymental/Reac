import Container from "../ui/Container.jsx";
import Header from "../ui/Header.jsx";
import Footer from "../ui/Footer.jsx";

export default function AppLayout({ title, subtitle, children, onGoHome }) {
  return (
    <div className="app">
      <Header title={title} subtitle={subtitle} onGoHome={onGoHome} />
      <main className="main">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
