import Styles from "../../styles/components/coaches/discount.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ButtonType, Formdata, HeadingType, HeadingType2, Heading_type, image_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import ThankYou from "../Forms/ThankYou";
import PopUpForm from "../PopUpForm";

type Props = {
  data: {
    heading: Heading_type;
    highlighted_heading: Heading_type;
    button: ButtonType;
    discount_card: HeadingType2
  }
  formdata: Formdata
}

const Discount = (props: Props) => {
  const [openForm, setOpenForm] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal &&
        <ThankYou setModal={setOpenModal} openModal={openModal} data={props?.formdata?.ThankYouMessage} />
      }
      {openForm !== 0 &&
        <PopUpForm openForm={openForm} setOpenForm={setOpenForm} formData={props.formdata} heading={props?.data?.button?.DisplayName} setOpenModal={setOpenModal} email={props?.formdata?.ResponseEmail} hideCategory/>
      }
      <div className={Styles.Discount}>
        {props?.data?.discount_card &&
          <div className={Styles.discountCard}>
            {props?.data?.discount_card?.heading_tag ? (
              <CreateHeading tag={props.data.discount_card.heading_tag} children={{ className: `${Styles.discountHeading} p` }} text={props?.data?.discount_card?.Heading} />
            ) : (
              <p className={`${Styles.discountHeading} p`}>{props?.data?.discount_card?.Heading}</p>
            )}
            <ReactMarkdown className={`${Styles.discountText} p`} rehypePlugins={[rehypeRaw]}>{props?.data?.discount_card?.Desc}</ReactMarkdown>
            <Image
              className={Styles.star2_img}
              src="/discount_images/Star 2.svg"
              width={48}
              height={48}
              alt="star"
            />
            <Image
              className={Styles.star1_img}
              src="/discount_images/Star 1.svg"
              width={91}
              height={91}
              alt="star"
            />
          </div>
        }
        {props?.data &&
          <div className={Styles.info}>
            {props?.data?.heading?.tag ? (
              <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.line1} p` }} text={props?.data?.heading?.text} />
            ) : (
              <p className={`${Styles.line1} p`}>{props?.data?.heading?.text}</p>
            )}

            {props?.data?.highlighted_heading?.tag ? (
              <CreateHeading tag={props.data.highlighted_heading.tag} children={{ className: `${Styles.line2} p`, dangerouslySetInnerHTML: { __html: props?.data?.highlighted_heading?.text } }} />
            ) : (
              <p className={`${Styles.line2} p`} dangerouslySetInnerHTML={{ __html: props?.data?.highlighted_heading?.text }}></p>
            )}
            {props?.data?.button &&
              <>
                {props?.data?.button?.href ? (
                  <Link href={props?.data?.button?.href || "#"}>
                    <button className={Styles.corporate_btn}>{props?.data?.button?.DisplayName}</button>
                  </Link>
                ) : (
                  <button className={Styles.corporate_btn} onClick={() => setOpenForm(1)}>{props?.data?.button?.DisplayName}</button>
                )}
              </>

            }
          </div>
        }

      </div>
    </>

  );
};

export default Discount;
