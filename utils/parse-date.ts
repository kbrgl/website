import parse from "date-fns/parse";

export default function parseDate(date) {
  return parse(date, "MMM d, yyyy", new Date());
}
