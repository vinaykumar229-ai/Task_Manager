import '../styles/globals.css'; // ✅ make sure this line exists

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
