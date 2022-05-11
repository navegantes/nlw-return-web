import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
    )
  
  try {

    const { type, comment, screenshot } = req.body;
    
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    })
    
    return res.status(201).send();
  }catch (err) {
    return res.status(400).json({ message: 'Error submiting feedback.' })
  }
});
