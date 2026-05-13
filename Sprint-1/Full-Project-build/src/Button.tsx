type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    className?: string

}

export const Button = ({title, onClickHandler, className}: ButtonPropsType) => {
    return <button onClick={onClickHandler} className={className}>{title}</button>
}