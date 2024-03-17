import "@styles/globals.css";

export const metadata = {
  title: "WMS3D",
  description: "Un nuovo modo per gestire il magazzino tramite l'esperienza 3D",
};

const Layout = ({ children }) => {
  return (
    <html lang="it">
      <body className="text-textColor">
        <main>
          <header className="bg-darkest py-[0.5em]">
            <h1 className="webHeader indent-[-999em] h-[4em] bg-contain bg-no-repeat bg-center">WMS3D</h1>
          </header>
          {children}
        </main>        
      </body>
    </html>
  );
}

export default Layout