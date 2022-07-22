
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? ' sx={(theme) => ({backgroundColor: theme.colors.red[9]})} ' : ' sx={(theme) => ({backgroundColor: theme.colors.blue[7]})} '}`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta 