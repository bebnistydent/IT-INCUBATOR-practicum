
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({ background, theme }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 1px ${theme.palette.secondary.dark}, 1px 1px 0 0 ${theme.palette.secondary.dark}`,
    borderRadius: '3px',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.primary.dark,
}))