import Nav from "@/components/Nav";
import { Provider } from "@/components/provider";
import { auth } from "@/lib/auth";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "discover and share AI promptopia",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning={true} data-qb-installed="true">
      <body className="max-w-screen max-h-screen">
        <Provider session={session}>
          <Nav />

          <div className="main">
            <div className="gradient" />
          </div>
          <div className="pt-40">
            {" "}
            <main className="app">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
