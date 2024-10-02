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

function extractDomain(url: string): string {
  try {
    // Create a new URL object to easily extract the hostname
    const domain = new URL(url).hostname;

    // If the hostname contains 'www.', remove it for a cleaner domain
    return domain.startsWith("www.") ? domain.slice(4) : domain;
  } catch (error) {
    console.error("Invalid URL:", error);
    return ""; // Return empty string for invalid URLs
  }
}

export {
  formatEmailFromParam,
  capitalizeFirstLetter,
  slugify,
  trimWhitespace,
  camelToTitle,
  removeSpecialCharacters,
  abbreviateString,
  extractDomain,
};
