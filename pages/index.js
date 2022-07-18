import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main>
        <h1 className="blue">ECNMY DASHBOARD</h1>
      </main>
    </div>
  );
}
