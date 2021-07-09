import { ImSpinner2 } from "react-icons/im";

type PropsType = {
    icon?: JSX.Element;
    className?: string;
}

export default function Spinner({ icon = <ImSpinner2/>, className}: PropsType) {
    return (
        <>
            <div className={`${className ? className : "w-full flex items-center text-green-500"}`}>
                <i className="animate-spin text-3xl">{icon}</i>
            </div>
        </>
    )
}