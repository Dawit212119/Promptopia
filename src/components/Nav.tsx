import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full flex justify-between items-between">
      <Link href="/" className="flex justify-center items-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Prompropia Logo"
          width={30}
          height={30}
          priority
        />
        <p className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Promptopia
        </p>
      </Link>
    </nav>
  );
}
