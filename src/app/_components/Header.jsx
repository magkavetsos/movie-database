import Image from "next/image";
import Link from "next/link";
import StyledLink from "../../components/StyledLink";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image src="/logo.png" width={96} height={29} alt="logo" />
      </Link>
      <Link href="/movie/add">
        <button>ADD MOVIE</button>
      </Link>
      {/* <StyledLink href="/movie/add">ADD MOVIE</StyledLink> TODO: add if there is time */}
    </header>
  );
}
