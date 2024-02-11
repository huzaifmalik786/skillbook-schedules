import React from 'react'
import Dropdown from './Dropdown'
import Input from './Input'
import Styles from '../../styles/components/forms/signup.module.scss'
import Button from './Button'
type Props = {
    openModal: boolean;
    setOpenModal: (open:boolean)=> void;
  }

const SignupForm = (props:Props) => {
    const handleSubmit = (data: any) => {
        // send form data to server or perform other actions
        props.setOpenModal(false)
        // console.log("submite",data.name, data.target.name.value)
    
      };

  return (
    <div className={Styles.form_container}>
            <form onSubmit={handleSubmit}>
                <div className={Styles.inputs}>
                    <Input left_section="Name" placeholder="" type="text" name="name" />
                    <Input left_section="" placeholder="Email" type="email" name="email" />
                    <div className={Styles.two_input}>
                        <Input placeholder="9987115132" type="text" name="mobile" />
                        <div className={Styles.dropdown}>
                            <Dropdown arrow_width='0.7vw' arrow_height='0.35vw' heading='location' />
                        </div>

                    </div>

                    <div className={Styles.checbox_container}>
                        <input type="checkbox" name="" id="checkbox" /> I agree to Chefkart’s terms of service & Privacy Policy
                    </div>
                </div>

                <Button bgcolor="#E5871C" text="Submit" />
            </form>
        </div>
  )
}

export default SignupForm