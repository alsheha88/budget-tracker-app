import { Button } from "./Button";

type ModalProps = {
    title: string;
    content: string;
    condition?: string;
    type: "" | "delete"; 
}

function Modal({title, content, condition, type}:ModalProps) {
  return (
    <div className="fixed inset bg-black/50">
        <div className="grid gap-3 p-6 rounded-lg bg-table-row-hover border border-interactive-secondary-active">
            <h2 className="text-h3 text-text-primary">{title}</h2>
            <p className="text-text-secondary text-body-sm">{content}</p>
            <div className="place-self-end flex items-center gap-3">
                <Button variant="ghost" >Cancel</Button>

            </div>
        </div>
      
    </div>
  )
}

export default Modal
