/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Styles from "../styles/components/errorPage/error.module.scss";

import Image from "next/image";

export default function Custom404() {
  return (
    <div className={Styles.errorPage}>
      <header>
        <div className="navbar">
          <Link href="/" className="logo">
            <Image
              alt="logo"
              src="/Logo.svg"
              width="240"
              height="41"
              decoding="async"
              data-nimg="1"
              loading="lazy"
            />
          </Link>
        </div>
      </header>

      <main>
        <figure>
          <Image
            src="https://i.ibb.co/tX6mf6h/cat.png"
            alt="cat-illustration"
            width="240"
            height="41"
          />
        </figure>

        <article>
          <h1>
            Sorry! <span>The page is not found.</span>
          </h1>
          <p>
            The link you followed may be broken, or the page may have been
            removed. You have encountered an error with code 404
          </p>
          <p>
            But dont worry, in life unexpected challenges may come up, and this
            is just one of those moments. Take this as an opportunity to
            reflect, learn, and grow. Remember, sometimes getting lost is just
            the beginning of a new adventure.
          </p>
          <p>
            Thanks for visiting our website, and we hope you find what you're
            looking for.
          </p>
          <Link href="/">
            <button>BACK TO HOMEPAGE</button>
          </Link>
        </article>
      </main>
    </div>
  );
}
