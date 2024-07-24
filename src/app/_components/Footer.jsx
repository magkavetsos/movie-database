import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="copyright">
        <p>
          Copyright © 2024. All Rights Reserved By{" "}
          <Link href="/">MovieFlix</Link>
        </p>
      </div>
    </footer>
  );
}
