

type BadgeProps = {
    name: string;
    color: string;
}
function Badge({name, color}:BadgeProps) {
  return (
    <span style={{backgroundColor: `${color}26` , color: color}} className="px-2.5 py-1 w-max rounded-sm flex items-center justify-center text-label-sm">
      {name}
    </span>
  )
}

export default Badge;
