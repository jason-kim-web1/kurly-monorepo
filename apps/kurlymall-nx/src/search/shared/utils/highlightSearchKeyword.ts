const highlightSearchKeyword = (suggestion: string, targetKeyword: string) => {
  return suggestion.replace(targetKeyword, (match) => `<span class="target">${match}</span>`);
};

export { highlightSearchKeyword };
