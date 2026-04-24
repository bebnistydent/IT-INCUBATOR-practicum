type ButtonProps = {
    title: string
    onClickHandler: () => void
    disabled?: boolean
}

export const Button = ({title, onClickHandler, disabled}: ButtonProps) => {
    return <button
        disabled={disabled}
        onClick={onClickHandler}>{title}</button>

}