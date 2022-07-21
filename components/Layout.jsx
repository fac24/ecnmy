import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>London Cost of Living Data Dashboard</title>
        <meta
          name="description"
          content="a website to help journalists access economic data related to the cost of living crisis in London"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NavBar />
      <main className="bg-ecnmy-breeze">{children}</main>
    </>
  );
}
