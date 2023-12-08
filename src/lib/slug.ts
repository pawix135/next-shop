import slugify from "slugify";

export const createSlug = (text: string): string => {
  return slugify(text, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    trim: true,
  });
};
