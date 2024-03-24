import { Task } from "@/types/index";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({task} : TaskCardProps) {
  return (
    <div>
      <h1>Task Card</h1>
    </div>
  )
}
