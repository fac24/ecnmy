import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

// _document.js needed so we can add the datawrapper script allowing us to use their event listeners
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://static.dwcdn.net/js/events.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
