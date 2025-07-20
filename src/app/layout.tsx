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
        <Nav />

        <div className="main">
          <div className="gradient" />
        </div>
        <div>
          {" "}
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
}
