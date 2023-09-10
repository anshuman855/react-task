import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import App from "@/components/App";
import 'bootstrap/dist/css/bootstrap.min.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <App />
    </>
  );
}
