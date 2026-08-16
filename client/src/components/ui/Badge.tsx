

type BadgeProps = {
    name: string;
    color: string;
}
function Badge({name, color}:BadgeProps) {
  return (
    <span style={{backgroundColor: `${color}26` , color: color}} className="px-2.5 py-1 rounded-[6px]">
      {name}
    </span>
  )
}

export default Badge;
