import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IssueServices } from "./issue.service";
import { validateIssue, validateUpdateIssue } from "./issue.validation";

const createIssue = catchAsync(async (req: Request, res: Response) => {
  const validationError = validateIssue(req.body);
  if (validationError) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: validationError,
    });
  }
  const payload = { ...req.body, reporter_id: req.user.id };
  const result = await IssueServices.createIssue(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Issue created successfully",
    data: result,
  });
});

const getAllIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssueServices.getAllIssues(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});

const getSingleIssue = catchAsync(async (req: Request, res: Response) => {
  const result = await IssueServices.getSingleIssue(Number(req.params.id));
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Issue not found",
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});

const updateIssue = catchAsync(async (req: Request, res: Response) => {
  // ✅ Added validation for update
  const validationError = validateUpdateIssue(req.body);
  if (validationError) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: validationError,
    });
  }

  const issue = await IssueServices.getSingleIssue(Number(req.params.id));
  if (!issue) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Issue not found",
    });
  }

  const user = req.user;
  if (user.role === "contributor") {
    if (issue.reporter.id !== user.id) {
      return sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "You can update only your own issue",
      });
    }
    if (issue.status !== "open") {
      return sendResponse(res, {
        success: false,
        statusCode: 409,
        message: "Cannot edit issue after workflow started",
      });
    }
    if (req.body.type) {
      return sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "Contributor cannot change issue type",
      });
    }
    if (req.body.status) {
      return sendResponse(res, {
        success: false,
        statusCode: 403,
        message: "Contributor cannot change status",
      });
    }
  }

  const result = await IssueServices.updateIssue(Number(req.params.id), req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Issue updated successfully",
    data: result,
  });
});

const deleteIssue = catchAsync(async (req: Request, res: Response) => {
  await IssueServices.deleteIssue(Number(req.params.id));
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Issue deleted successfully",
  });
});

export const IssueControllers = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};