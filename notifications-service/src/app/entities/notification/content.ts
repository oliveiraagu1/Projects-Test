export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLengh(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLegthValid = this.validateContentLengh(content);

    if (!isContentLegthValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }
}
