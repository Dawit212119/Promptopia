"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

type providerType = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};
type providerTypes = Record<string, providerType>;

export default function Nav() {
  const [toggleDropDown, settoggleDropDown] = useState(true);
  const [provider, setProvider] = useState<providerTypes | null>(null);
  useEffect(() => {
    const providers = async () => {
      const providers = await getProviders();
      setProvider(providers);
    };

    providers();
  }, []);
  console.log(provider);
  const { data: session } = useSession();
  const isUserLoggedIn = session?.user;
  return (
    <nav className="w-full lg:w-[950px] px-10   flex justify-between items-between m-auto mt-6">
      <Link href="/" className="flex justify-center items-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Prompropia Logo"
          width={30}
          height={30}
          priority
        />
        <p className="bg-gradient-to-r font-bold from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Promptopia
        </p>
      </Link>

      <div className="sm:flex hidden gap-6 font-bold">
        {isUserLoggedIn ? (
          <>
            <Link href="/create-prompt">
              <button className="rounded-xl p-2 text-center  text-black hover:text-xl">
                Create Prompt
              </button>
            </Link>

            <button
              className="rounded-xl p-2 text-center  text-black hover:text-xl "
              onClick={() => signOut()}
            >
              signOut
            </button>

            <Link href="/profile">
              <button className="rounded-xl p-2 text-center  text-black hover:text-xl">
                My Profile
              </button>
            </Link>
          </>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provide) => (
                <button key={provide.id} onClick={() => signIn(provide.id)}>
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile version  */}
      <div className="sm:hidden flex relative font-bold">
        {isUserLoggedIn ? (
          <div>
            <button onClick={() => settoggleDropDown((prev) => !prev)}>
              <Image
                src="/assets/images/logo.svg"
                alt="Prompropia Logo"
                width={30}
                height={30}
                priority
              />{" "}
            </button>

            {toggleDropDown ? (
              <div className="absolute top-full right-0 mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link href="/profile">
                  <button
                    onClick={() => {
                      settoggleDropDown(false);
                    }}
                    className="rounded-xl p-2 text-center  text-black "
                  >
                    My Profile
                  </button>
                </Link>
                <button
                  className="rounded-xl p-2 text-center cursor-pointer  text-black  "
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                >
                  signOut
                </button>
                <Link href="/create-prompt">
                  <button
                    onClick={() => settoggleDropDown(false)}
                    className="rounded-xl p-2 text-center  text-black "
                  >
                    Create Prompt
                  </button>
                </Link>
              </div>
            ) : (
              <> </>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provide) => (
                <button key={provide.id} onClick={() => signIn("google")}>
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
