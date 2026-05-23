export const validateIssue = (body: {
  title: string;
  description: string;
  type: string;
}) => {
  if (!body.title) return "Title is required";
  if (body.title.length > 150) return "Title maximum 150 characters";
  if (!body.description) return "Description is required";
  if (body.description.length < 20) return "Description minimum 20 characters";
  if (body.type !== "bug" && body.type !== "feature_request")
    return "Type must be bug or feature_request";
  return null;
};

export const validateUpdateIssue = (body: {
  title?: string;
  description?: string;
  type?: string;
  status?: string;
}) => {
  if (body.title && body.title.length > 150)
    return "Title maximum 150 characters";
  if (body.description && body.description.length < 20)
    return "Description minimum 20 characters";
  if (body.type && body.type !== "bug" && body.type !== "feature_request")
    return "Invalid issue type";
  if (
    body.status &&
    body.status !== "open" &&
    body.status !== "in_progress" &&
    body.status !== "resolved"
  )
    return "Invalid status";
  return null;
};