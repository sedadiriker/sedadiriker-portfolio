import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Work from "../components/Work";
import Contact from "../components/Contact";
import SocialIcons from "../components/SocialIcons"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7F7] relative">
      <Head>
        <title>Seda Diriker | Portfolio</title>
      </Head>

      <SocialIcons />

      <Header />

      <main className="flex-grow w-full scroll-smooth">
        <section
          id="home"
          className="md:min-h-screen flex items-center justify-center pt-20"
        >
          <Hero />
        </section>
        <section
          id="about"
          className="md:h-screen flex items-center justify-center"
        >
          <About />
        </section>
        <section
          id="skills"
          className="md:h-screen flex items-center justify-center"
        >
          <Skills />
        </section>
        <section
          id="work"
          className="md:h-screen flex items-center justify-center"
        >
          <Work />
        </section>

        <section
          id="contact"
            style={{ height: "calc(100vh - 64px)" }} 
          className=" flex items-center justify-center"
        >
          <Contact />
        </section>
      </main>

      <footer className="w-full py-4 bg-[#47586F] text-center text-white  text-xs select-none shadow-md ">
        © 2025 Seda Diriker | All Rights Reserved
      </footer>
    </div>
  );
}
