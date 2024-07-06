exports.validationErrorMessage = (error, checkField = "") => {
  // console.log(error)
  if (!error.issues || error.issues.length === 0) {
    return "An unknown validation error occurred.";
  }

  return error.issues.map(issue => {
    const path = issue.path.length > 0 ? issue.path.join(" -> ") : checkField || "Field";
    const message = issue.message || "Validation error";
    return `${path} :: ${message}`;
  }).join("\n");
}