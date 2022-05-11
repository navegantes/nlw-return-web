import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required.')
    }

    if (!comment) {
      throw new Error('Comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }
    
    await this.feedbacksRepository.create({
      // type: type,
      // qnd o campo é igual ao valor da variavel
      // pode usar short syntax
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: `[${type}] Novo feedback`,
      body: [
        `<p>Tipo de feedback: <strong>${type}</strong></p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : false,
      ].filter(Boolean).join('')
    })
  }
}