import Container from "../ui/Container.jsx";
import Header from "../ui/Header.jsx";
import Footer from "../ui/Footer.jsx";
import styles from "./AppLayout.module.css";

export default function AppLayout({ title, subtitle, children, onGoHome, userId, onGoResults }) {
  return (
    <div className={styles.app}>
      <Header
        title={title}
        subtitle={subtitle}
        onGoHome={onGoHome}
        onGoResults={onGoResults}
        userId={userId}
      />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
