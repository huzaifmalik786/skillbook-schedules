import React, { useEffect } from "react";
import Styles from "../styles/components/popupform.module.scss";
import Button from "./Forms/Button";
import Input from "./Forms/Input";
import TextArea from "./Forms/TextArea";
import * as Yup from "yup";
import Image from "next/image";
import { Form, Formik } from "formik";
import axios from "axios";
import { useScreenDimensions } from "use-screen-dimensions";
import { removeBodyScrollingWhenModalOpen } from "./RemoveScroll";
import { Formdata } from "../interfaces/interfaces";


type Props = {
    openForm: number;
    email?: string;
    setOpenForm: any;
    setOpenModal: any;
    hideCategory?: boolean;
    formData?: Formdata
    heading: string;
};
const PopUpForm = (props: Props) => {
    const { width } = useScreenDimensions();
    const isMobile = width < 950;

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required!"),
        last_name: Yup.string().required("Last Name is required!"),
        company: Yup.string().required("Company is required!"),
        email: Yup.string().email("Please enter a valid email").required("Email is required!"),
        phone: Yup.string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Phone number is not valid').required("Phone no. is required!"),
        // interested_course: Yup.string().required("Please select a course!"),
        message: Yup.string()
    })

    const handleClickOutside = (event: MouseEvent) => {

        if ((event?.target as HTMLInputElement)?.id === 'modal') {
            props.setOpenForm(0);
        }
    };

    useEffect(() => {
        // Disable body scroll when modal is opened
        if (!isMobile) {
            removeBodyScrollingWhenModalOpen(true, isMobile)
            // Re-enable body scroll when modal is closed
            return () => {
                removeBodyScrollingWhenModalOpen(false, isMobile)
            };
        }
    }, [isMobile]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                props.setOpenForm(0);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        // 👇️ clean up event listener
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <>
            <div
                id="modal"
                className={Styles.ConsultantForm}
                style={props?.openForm ? { display: "flex" } : { display: "none" }}
            >
                <div className={Styles.windowBar}>
                    <p className={`${Styles.text} p`}>{props?.heading}</p>

                    <Image
                        onClick={() => {
                            props.setOpenForm(0);
                        }}
                        className={Styles.mini}
                        src={"/minimizeBtn.svg"}
                        width={20}
                        height={4}
                        alt="minimize"
                    />
                </div>
                <div className={Styles.contact_form}>
                    <Formik
                        enableReinitialize
                        validationSchema={validationSchema}
                        initialValues={{ first_name: "", last_name: "", company: "", email: "", phone: "", interested_course: "", message: "" }}
                        onSubmit={async (values) => {
                            const res = await axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
                                responseEmail: props?.email,
                                type: window.location.href,
                                name: `${values.first_name} ${values.last_name}`,
                                company: values.company,
                                email: values.email,
                                phoneNo: values.phone,
                                course: values.interested_course,
                                message: values.message
                            })
                            props.setOpenForm(0);
                            props.setOpenModal(true);
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors }) => (
                            <Form>
                                <Input placeholder={props?.formData?.first_name_placeholder} type="text" name="first_name" onChange={handleChange} />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.first_name}</p>

                                <Input placeholder={props?.formData?.last_name_placeholder} type="text" name="last_name" onChange={handleChange} />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.last_name}</p>

                                <Input placeholder={props?.formData?.company_placeholder} type="text" name="company" onChange={handleChange} />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.company}</p>

                                <Input placeholder={props?.formData?.email_placeholder} type="email" name="email" onChange={handleChange} />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.email}</p>
                                <Input
                                    placeholder={props?.formData?.phone_placeholder}
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.phone}</p>
                                {!props?.hideCategory &&
                                    <div className={Styles.CoursesDivDropdown}>
                                        <select name="interested_course" id="" className={Styles.selectBox} onChange={handleChange}>
                                            <option value="" selected disabled>{props?.formData?.course_placeholder}</option>
                                            {props?.formData?.course_options?.map((item, index) => {
                                                return (
                                                    <option value={item.option} key={index}>{item.option}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                }

                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.interested_course}</p>
                                <TextArea row={3} data={props?.formData?.message_placeholder} onChange={handleChange} />
                                <p style={{ color: "red", marginTop: "-12px", height: "9px", marginLeft: "2px", fontSize: "12px" }}>{errors.message}</p>
                                <Button text={props?.formData?.Button_Text} onClick={handleSubmit} />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default PopUpForm;
