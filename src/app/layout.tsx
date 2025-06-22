import Nav from "@/components/Nav";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "discover and share AI promptopia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <Nav />
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
