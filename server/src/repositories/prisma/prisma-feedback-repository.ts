import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type, comment, screenshot}: FeedbackCreateData){
    await prisma.feedback.create({
    data: {
      // type: type,
      // qnd o campo é igual ao valor da variavel
      // pode usar short syntax
      type,
      comment,
      screenshot,
    }
  })
  }
}