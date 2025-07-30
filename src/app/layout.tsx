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
      <body className="max-w-screen ">
        <Provider session={session}>
          <div className="sticky top-0 z-50">
            {" "}
            <Nav />
          </div>

          <div className="main">
            <div className="gradient" />
          </div>
          <div className="pt-40 pb-40">
            {" "}
            <main className="app max-h-screen overflow-y-auto">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
