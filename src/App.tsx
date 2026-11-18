import { useRoutes } from "react-router"
import { routes } from "./routes"
import { Suspense } from "react";

const App = () => {
  const router = useRoutes(routes);
  return (
    <Suspense>
      {router}
    </Suspense>
  )
}

export default App
