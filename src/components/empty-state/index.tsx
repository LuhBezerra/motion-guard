import { InboxIcon } from "@heroicons/react/20/solid";

interface EmptyStateProps {
  title: string;
}
export const EmptyState = ({ title }: EmptyStateProps) => (
  <div className="w-full mt-auto mb-auto self-center flex flex-col items-center justify-center text-slate-400">
    <InboxIcon className="w-32 " />
    <p>{title}</p>
  </div>
)