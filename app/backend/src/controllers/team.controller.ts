import { Request, Response } from 'express';
import teamService from '../services/team.service';

async function getAll(_req: Request, res: Response) {
  const data = await teamService.getAll();
  res.status(200).json(data);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const numberId = Number(id);
  const data = await teamService.getById(numberId);

  if (!data) res.status(400).json({ error: 'Invalid ID' });

  res.status(200).json(data);
}

export default {
  getAll,
  getById,
};
