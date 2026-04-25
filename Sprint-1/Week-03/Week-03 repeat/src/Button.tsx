type Props = {
  title: string
  onClickHandler?: () => void
  disabled?: boolean
}

export const Button = ({ title, onClickHandler }: Props) => {
  return <button onClick={onClickHandler}>{title}</button>
}
