import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Superrepos</title>
        <meta
          name="description"
          content="My submission for the superchat-frontend-challenge"
        />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <header className="m-5">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/logo-white.svg"
            width="200"
            height="38"
            alt="Logo"
          ></Image>
        </Link>
      </header>
      <main className="mx-5 mt-10 flex justify-center">
        <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
