import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"

function App() {

  return (
    <div className="bg-bg-primary min-h-dvh grid place-items-center">
    <Button  variant="secondary">Button</Button>
    <Button  variant="primary">Button</Button>
    <Button  variant="destructive">Button</Button>
    <Button  variant="ghost">Button</Button>
    <Card size="lg">Hello My name us</Card>
    </div>
  )
}

export default App
