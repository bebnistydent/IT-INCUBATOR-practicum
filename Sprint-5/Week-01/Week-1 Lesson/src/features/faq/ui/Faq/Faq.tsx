import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import Container from "@mui/material/Container"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const faqItems = [
  {
    question: "Как поддерживать порядок в одежде?",
    answer: "Складывайте вещи по категориям и сразу возвращайте их на своё место после носки.",
  },
  {
    question: "Что делать с вещами, которые давно не носили?",
    answer: "Отложите их в отдельный список дел: постирать, отдать, продать или убрать на сезон.",
  },
  {
    question: "Как не откладывать небольшие задачи?",
    answer: "Начните с одного простого действия — например, разобрать одну полку или подготовить одежду на завтра.",
  },
  {
    question: "Почему полезно быть трудолюбивым?",
    answer: "Регулярные маленькие шаги помогают быстрее видеть результат и освобождают время для приятных дел.",
  },
]

export const Faq = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          FAQ
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Несколько полезных ответов об одежде, порядке и привычке доводить дела до конца.
        </Typography>
        <List aria-label="Часто задаваемые вопросы">
          {faqItems.map(({ question, answer }) => (
            <ListItem key={question} alignItems="flex-start" divider>
              <ListItemIcon sx={{ minWidth: 40, mt: 0.4 }}>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={question} secondary={answer} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}
