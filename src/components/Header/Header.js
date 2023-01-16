import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="header-section">
        <img src="/images/logo.svg" alt="Daily logo" />
        <span className="title">TensorFlowJS in a Daily React app</span>
      </div>
      <div className="header-section">
        <a
          className="new-tab-link"
          href="https://docs.daily.co/reference/daily-js"
          target="_blank"
          rel="noreferrer">
          <span>API docs</span>
          <img src="/images/newtab.svg" alt="New tab" />
        </a>
        <a
          className="github-link"
          href="https://github.com/daily-demos/daily-react-tfjs"
          target="_blank"
          rel="noreferrer">
          <img src="/images/github.svg" alt="Github" />
        </a>
      </div>
    </header>
  );
}
