export default function formatTabName(name: string) {
  if (name === "index") return "Home";
  return name.charAt(0).toUpperCase() + name.slice(1);
}
