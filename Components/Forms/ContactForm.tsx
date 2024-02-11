import React, { useState } from "react";
import Styles from "../../styles/components/forms/contactForm.module.scss";
// import Modal from "../careers/Modal";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import ThankYou from "./ThankYou";
import { Heading_type, image_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import axios from "axios";

type Props = {
  heading?: string;
  openModal_two?: boolean;
  setOpenModal_two?: (open: boolean) => void;
  data: {
    heading: Heading_type;
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    courses_placeholder: string;
    textarea_placeholder: string;
    submit_btn: string;
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
const ContactForm = (props: Props) => {

  const [openModal, setOpenModal] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("Please enter a valid email").required("Email is required!"),
    phone: Yup.string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Phone number is not valid').required("Phone no. is required!"),
    // interested_course: Yup.string().required("Please select a course"),
    message: Yup.string()
  })

  return (
    <>
      {openModal &&
        <ThankYou setModal={setOpenModal} openModal={openModal} data={props?.data?.ThankYouMessage} />
      }
      <div className={Styles.contact_form}>
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props?.data?.heading?.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
        )}
        <Formik
          validationSchema={validationSchema}
          initialValues={{ name: "", email: "", phone: "", interested_course: "", message: "" }}
          onSubmit={async (values) => {
            const res = await axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
              responseEmail: props?.data?.ResponseEmail,
              name: values.name,
              email: values.email,
              phoneNo: values.phone,
              course: values.interested_course,
              message: values.message,
              type: window.location.href,
            })
            setOpenModal(true);
            if (props.setOpenModal_two) {
              props.setOpenModal_two(false);
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form>
              <Input placeholder={props.data?.name_placeholder} type="text" name="name" onChange={handleChange} />
              {errors.name &&
                <p style={{ color: "red", marginTop: "-10px", marginLeft: "2px", fontSize: "14px" }}>{errors.name}</p>
              }
              <Input placeholder={props.data?.email_placeholder} type="email" name="email" onChange={handleChange} />
              {errors.email &&
                <p style={{ color: "red", marginTop: "-10px", marginLeft: "2px", fontSize: "14px" }}>{errors.email}</p>
              }
              <Input placeholder={props.data?.phone_placeholder} type="text" name="phone" onChange={handleChange} />
              {errors.phone &&
                <p style={{ color: "red", marginTop: "-10px", marginLeft: "2px", fontSize: "14px" }}>{errors.phone}</p>
              }
              <div className={Styles.CoursesDivDropdown}>
                <select name="interested_course" id="" className={Styles.selectBox} onChange={handleChange}>
                  <option value="" selected disabled>{props.data?.courses_placeholder}</option>
                  {props?.data?.course_options?.map((item, index) => {
                    return (
                      <option value={item.option} key={index}>{item.option}</option>
                    )
                  })}
                </select>
              </div>
              {errors.interested_course &&
                <p style={{ color: "red", marginTop: "-10px", marginLeft: "2px", fontSize: "14px" }}>{errors.interested_course}</p>
              }

              {/* <Dropdown heading={"Course Interested"} /> */}
              <TextArea row={3} data={props?.data?.textarea_placeholder} onChange={handleChange} />
              {errors.message &&
                <p style={{ color: "red", marginTop: "-10px", marginLeft: "2px", fontSize: "14px" }}>{errors.message}</p>
              }
              <Button text={props?.data?.submit_btn} onClick={handleSubmit} />
            </Form>
          )}

        </Formik>
      </div>
    </>
  );
};

export default ContactForm;
