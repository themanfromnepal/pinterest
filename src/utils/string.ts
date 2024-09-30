function formatEmailFromParam(value: string) {
  if (value.includes("%40")) {
    return value.replace("%40", "@");
  }
  return value;
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function trimWhitespace(value: string) {
  return value.trim();
}

function camelToTitle(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function removeSpecialCharacters(value: string) {
  return value.replace(/[^\w\s]/gi, "");
}

function abbreviateString(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
}

export {
  formatEmailFromParam,
  capitalizeFirstLetter,
  slugify,
  trimWhitespace,
  camelToTitle,
  removeSpecialCharacters,
  abbreviateString,
};
