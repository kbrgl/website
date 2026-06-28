import { extendTailwindMerge } from "tailwind-merge";

export const cn = extendTailwindMerge({
  extend: {
    classGroups: {
      "border-w": ["border-hairline"],
    },
  },
});
