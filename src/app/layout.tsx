import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "discover and share AI promptopia",
};

export default function RootLayout(children: React.ReactNode) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
