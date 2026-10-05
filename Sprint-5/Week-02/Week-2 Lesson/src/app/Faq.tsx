import Container from "@mui/material/Container"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

const faqItems = ["Как создать новый список задач?", "Как изменить название задачи?", "Как удалить список задач?"]

export const Faq = () => {
  const { data } = useGetTodolistsQuery()

  return (
    <Container maxWidth="lg">
      <h1>FAQ</h1>
      <div>
        {data?.map((tl) => {
          return <p>{tl.title}</p>
        })}
      </div>
      <hr />
      <ul>
        {faqItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Container>
  )
}
