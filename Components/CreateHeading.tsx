import React from "react";

type Props={
    text?: string;
    tag: string;
    children?: any
}

function CreateHeading(props:Props) {
    return React.createElement(
        props.tag,
        props.children,
        props.text
    )
}

export default CreateHeading