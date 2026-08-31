
type ProgressBarProps = {
    progress: number;
    color: string;
}

function ProgressBar({progress, color}:ProgressBarProps) {
  return (
    <div className="h-1.5 rounded-[3px] w-full bg-surface-active">
        <div className={`h-full rounded-[3px]`} style={{backgroundColor: color, width: `${Math.min(Math.round(progress), 100)}%`}}></div>
    </div>
  )
}

export default ProgressBar;
