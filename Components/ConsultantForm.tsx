import React, { useEffect, useState } from "react";
import Styles from "../styles/components/ConsultantForm.module.scss";
import Button from "./Forms/Button";
import Input from "./Forms/Input";
import TextArea from "./Forms/TextArea";
import ThankYou from "./Forms/ThankYou";
import * as Yup from "yup";
import Image from "next/image";
import { Heading_type, image_type } from "../interfaces/interfaces";
import CreateHeading from "./CreateHeading";
import { Form, Formik } from "formik";
import axios from "axios";
import { useScreenDimensions } from "use-screen-dimensions";


type Props = {
  openForm: boolean;
  setOpenForm: any;
  hideCategory?: boolean;
  hideButton?: boolean;
  formData: {
    form_heading: string;
    highlighted_heading: Heading_type;
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    course_placeholder: string;
    message_placeholder: string;
    btn_text: string;
    course_options: {
      option: string;
    }[]
    ResponseEmail: string;
    ThankYouMessage: {
      Image: image_type;
      Heading: string;
      Description: string;
      ButtonText: string;
    }
  }
};
const ConsultantForm = (props: Props) => {
  // const { openForm, setOpenForm }: any = useContext(MyContext);
  const { width } = useScreenDimensions();
  const [height, setHeight] = useState<number | null>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const h = document.getElementById("consultant")?.offsetHeight;
    setHeight(h);
  }, [props?.openForm])


  const handleOpenForm = () => {
    !props?.openForm ? props.setOpenForm(true) : props.setOpenForm(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("Please enter a valid email").required("Email is required!"),
    phone: Yup.string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Phone number is not valid').required("Phone no. is required!"),
    // interested_course: Yup.string().required("Please select a course!"),
    message: Yup.string()
  })

  const handleClickOutside = (event: MouseEvent) => {
    if ((event?.target as HTMLInputElement)?.id === 'consultant') {
      props.setOpenForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {openModal &&
        <ThankYou setModal={setOpenModal} openModal={openModal} data={props?.formData?.ThankYouMessage} />
      }
      <div
        id="consultant"
        className={Styles.ConsultantForm}
        style={props?.openForm ? { display: "flex", top: width > 550 ? `-${height}px` : "" } : { display: "none" }}
      >
        <div className={Styles.windowBar}>
          <p className={`${Styles.text} p`}>{props?.formData?.form_heading}</p>

          <Image
            onClick={() => {
              handleOpenForm();
            }}
            className={Styles.mini}
            src={"/minimizeBtn.svg"}
            width={20}
            height={4}
            alt="minimize"
          />
        </div>
        <div className={Styles.contact_form}>
          {props?.formData?.highlighted_heading?.tag ? (
            <CreateHeading tag={props?.formData?.highlighted_heading?.tag} children={{ className: `${Styles.line1} p`, dangerouslySetInnerHTML: { __html: props?.formData?.highlighted_heading?.text } }} />
          ) : (
            <p className={`${Styles.line1} p`} dangerouslySetInnerHTML={{ __html: props?.formData?.highlighted_heading?.text || "" }}></p>
          )}
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{ name: "", email: "", phone: "", interested_course: "", message: "" }}
            onSubmit={async (values) => {
              const res = await axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
                responseEmail: props?.formData?.ResponseEmail,
                type: window.location.href,
                name: values.name,
                email: values.email,
                phoneNo: values.phone,
                course: values.interested_course,
                message: values.message
              })
              setOpenModal(true);
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form>
                <Input placeholder={props?.formData?.name_placeholder || "Enter your Name"} type="text" name="name" onChange={handleChange} />
                {/* {errors.name && */}
                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.name}</p>
                {/* } */}
                <Input placeholder={props?.formData?.email_placeholder || "Enter your email"} type="email" name="email" onChange={handleChange} />
                {/* {errors.email && */}
                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.email}</p>
                {/* } */}
                <Input
                  placeholder={props?.formData?.phone_placeholder || "Enter your phone no"}
                  type="text"
                  name="phone"
                  onChange={handleChange}
                />
                {/* {errors.phone && */}
                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.phone}</p>
                {/* } */}
                {!props?.hideCategory &&
                  <>
                    <div className={Styles.CoursesDivDropdown}>
                      <select name="interested_course" id="" className={Styles.selectBox} onChange={handleChange}>
                        <option value="" selected disabled>{props?.formData?.course_placeholder || "Course Interested"}</option>
                        {props?.formData?.course_options?.map((item, index) => {
                          return (
                            <option value={item.option} key={index}>{item.option}</option>
                          )
                        })}
                      </select>
                    </div>
                    {/* {errors.interested_course && */}
                    <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.interested_course}</p>
                    {/* } */}
                  </>
                }
                <TextArea row={3} data={props?.formData?.message_placeholder} onChange={handleChange} />
                {/* {errors.message && */}
                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.message}</p>
                {/* } */}
                <Button text={props?.formData?.btn_text} onClick={handleSubmit} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {!props?.hideButton &&
        <div className={Styles.col_5}>
          <button onClick={() => handleOpenForm()} style={props?.openForm ? { display: "none" } : { display: "block" }}>
            {props?.formData?.btn_text}
          </button>
        </div>
      }
    </>
  );
};

export default ConsultantForm;
