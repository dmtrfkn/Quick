import { Provider } from "react-redux";
import "../styles/globals.scss";
import Links from "../components/Link";
import Head from "next/head";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Links />
        <title>Quick</title>
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}

export default MyApp;
