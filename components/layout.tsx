import Head from "next/head";
import Link from "next/link";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="m-5">
        <Link href="/">
          <a className="text-2xl text-white">Superrepos</a>
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
