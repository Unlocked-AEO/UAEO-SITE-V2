import { activeTasks } from "@/data/mock-improvement-plan";
import type { ActiveTask } from "@/data/mock-improvement-plan";

function TaskRow({ task }: { task: ActiveTask }) {
  return (
    <button
      className="flex items-center gap-2.5 w-full bg-transparent border-none cursor-pointer p-0 text-left group"
      onClick={() => console.log("ACTION: view_task", { id: task.id })}
    >
      <div className="shrink-0 rounded-full bg-warning size-1.5" />
      <div className="grow shrink basis-0 text-navy group-hover:text-teal transition-colors duration-150 text-[13px]/4">
        {task.title}
      </div>
      <div className="rounded py-0.5 px-2 bg-[#FFF8EE]">
        <span className="text-warning font-medium text-[11px]/3.5">
          In Progress
        </span>
      </div>
    </button>
  );
}

export function TasksInProgressCard() {
  return (
    <div className="w-[440px] shrink-0 flex flex-col rounded-xl py-5 px-6 gap-3.5 bg-white border border-border-light shadow-sm">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-wider text-slate-muted font-medium text-[11px]/3.5">
          Tasks In Progress
        </span>
        <span className="text-teal font-semibold text-xs/4">
          {activeTasks.length} active
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {activeTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
