import React from "react";

interface Props {
    text: string;
}
export const Logs = (props: Props) => {
    return (<pre className="logs">{props.text}</pre>);
}