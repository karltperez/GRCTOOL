import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { pool } from '../index';

const router = Router();

// Get all assets for a project
router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res) => {
  const { projectId } = req.params;

  try {
    // Verify user owns the project
    const projectCheck = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, req.userId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const result = await pool.query(
      'SELECT * FROM assets WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create asset
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const { projectId, name, type, description } = req.body;

  try {
    // Verify user owns the project
    const projectCheck = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [projectId, req.userId]
    );

    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const result = await pool.query(
      'INSERT INTO assets (project_id, name, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [projectId, name, type, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
