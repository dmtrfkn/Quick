import { Provider } from "react-redux";
import "../styles/globals.scss";
import Links from "../components/Link";
import Head from "next/head";
import { store } from "../store";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
