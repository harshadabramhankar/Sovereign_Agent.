interface BadgeProps {
  children: string;
  color?: "green" | "blue" | "orange" | "red";
}

export default function Badge({
  children,
  color = "blue",
}: BadgeProps) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}