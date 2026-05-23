import { pool } from "../../config/db";

const createIssue = async (payload: {
  title: string;
  description: string;
  type: string;
  reporter_id: number;
}) => {
  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [payload.title, payload.description, payload.type, payload.reporter_id]
  );
  return result.rows[0];
};

const getAllIssues = async (queryParams: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  let query = `SELECT * FROM issues WHERE 1=1`;
  const values: string[] = [];

  if (queryParams.type) {
    values.push(queryParams.type);
    query += ` AND type=$${values.length}`;
  }
  if (queryParams.status) {
    values.push(queryParams.status);
    query += ` AND status=$${values.length}`;
  }
  if (queryParams.sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }

  const issuesResult = await pool.query(query, values);

  // ✅ Fix: return empty array if no issues
  if (issuesResult.rows.length === 0) {
    return [];
  }

  const reporterIds = issuesResult.rows.map((issue) => issue.reporter_id);
  const usersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds]
  );
  const users = usersResult.rows;

  const issues = issuesResult.rows.map((issue) => {
    const reporter = users.find((user) => user.id === issue.reporter_id);
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });
  return issues;
};

const getSingleIssue = async (id: number) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
  const issue = issueResult.rows[0];
  if (!issue) return null;
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id]
  );
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: userResult.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssue = async (
  id: number,
  payload: {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
  }
) => {
  const result = await pool.query(
    `UPDATE issues
     SET title=COALESCE($1, title),
         description=COALESCE($2, description),
         type=COALESCE($3, type),
         status=COALESCE($4, status),
         updated_at=CURRENT_TIMESTAMP
     WHERE id=$5
     RETURNING *`,
    [payload.title, payload.description, payload.type, payload.status, id]
  );
  return result.rows[0];
};

const deleteIssue = async (id: number) => {
  await pool.query(`DELETE FROM issues WHERE id=$1`, [id]);
};

export const IssueServices = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};