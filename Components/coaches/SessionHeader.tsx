/* eslint-disable react/no-unescaped-entities */
import { Heading_type } from "../../interfaces/interfaces";
import Styles from "../../styles/components/coaches/SessionSection.module.scss";
import CreateHeading from "../CreateHeading";

type Props = {
  instructor: Heading_type;
}

export default function SessionHeader(props: Props) {
  var names = props?.instructor?.text?.split(' ');
  const firstname = names[0];
  return (
    <div className={Styles.heading}>
      {props?.instructor?.tag ? (
        <CreateHeading tag={props.instructor.tag} children={{ className: `${Styles.session_h4} h4` }} text={props?.instructor?.text} />
      ) : (
        <h4 className={`${Styles.session_h4} h4`} >{props?.instructor?.text}</h4>
      )}
    </div>
  )
}
