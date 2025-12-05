import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>掲示板アプリ(SPA版)
        </title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
