import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Styles from "../styles/components/breadcrumbs.module.scss";
import Image from "next/image";

type Props = {
  color?: string;
  text?: string;
  page?: string
};

const BreadCrumbs = (props: Props) => {
  const router = useRouter();
  const path = router.asPath.split("/").filter((x) => x !== "");

  return (
    <nav
      aria-label="breadcrumb"
      style={{ backgroundColor: props.color || "#000" }}
    >
      <ul className={Styles.breadcrumb}>
        {/* Link to homepage */}
        <li className={Styles.item}>
          <Link href="/">
            <p>Home</p>
          </Link>
        </li>
        <Image src={"/Back.svg"} height={12} width={12} alt="back-icon" />

        {/* Render breadcrumb trail */}
        {path.map((segment, i) => {
          const isLastSegment = i === path.length - 1;
          const href = `/${path.slice(0, i + 1).join("/")}`;

          return (
            <div key={href} style={{ display: "contents" }}>
              <li className={isLastSegment ? Styles.active : Styles.item}>
                {isLastSegment ? (
                  props.page=="courses"? props.text : props.page=="schedule"? "Schedule":segment
                ) : (
                  <Link href={href === "/courses" ? "/" : href}>
                    <p>{i===path.length-2 && props.page==="schedule"? props.text : segment}</p>
                  </Link>
                )}
              </li>
              {!isLastSegment && (
                <Image
                  src={"/Back.svg"}
                  height={12}
                  width={12}
                  alt="back-icon"
                />
              )}
            </div>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
