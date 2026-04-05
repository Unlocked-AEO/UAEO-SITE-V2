import { activeTasks } from "@/data/mock-improvement-plan";
import type { ActiveTask } from "@/data/mock-improvement-plan";

function TaskRow({ task }: { task: ActiveTask }) {
  return (
    <button
      className="flex items-center gap-2.5 w-full bg-transparent border-none cursor-pointer p-0 text-left hover:opacity-80 transition-opacity"
      onClick={() => console.log("ACTION: view_task", { id: task.id })}
    >
      <div className="shrink-0 rounded-full bg-[#FF9F43] size-1.5" />
      <div className="grow shrink basis-0 text-[#0A2540] font-sans text-[13px]/4">
        {task.title}
      </div>
      <div className="rounded-sm py-0.5 px-2 bg-[#FFF8EE]">
        <div className="text-[#FF9F43] font-sans text-[11px]/3.5">
          In Progress
        </div>
      </div>
    </button>
  );
}

export function TasksInProgressCard() {
  return (
    <div className="w-[440px] shrink-0 flex flex-col rounded-xl py-5 px-6 gap-3.5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between">
        <div className="uppercase tracking-[0.6px] text-slate-muted font-sans text-[11px]/3.5">
          Tasks In Progress
        </div>
        <div className="text-teal font-sans text-xs/4">
          {activeTasks.length} active
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {activeTasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
