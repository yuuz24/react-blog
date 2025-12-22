import "./Footer.css";

type FooterProps = {
  showLinks?: boolean;
};

export default function Footer({ showLinks = true }: FooterProps) {
  return (
    <>
      <footer className="page__footer">
        {showLinks && (
          <ul className="page__footer-list">
            <li className="page__footer-item">
              <a href="#" className="page__footer-link">
                About
              </a>
            </li>
            <li className="page__footer-item">
              <a href="#" className="page__footer-link">
                Privacy Policy
              </a>
            </li>
            <li className="page__footer-item">
              <a href="#" className="page__footer-link">
                Contact
              </a>
            </li>
          </ul>
        )}
        <p className="page__footer-copy">
          &copy; 2025, JBNU Web Service Design Final Project
        </p>
      </footer>
    </>
  );
}
