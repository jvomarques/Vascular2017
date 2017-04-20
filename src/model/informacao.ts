export class Informacao {
  idReferencia:string;
  titulo:string;
  descricao:string;
  conteudo: string;
  imagem?:string;

  constructor(titulo?:string, descricao?:string, conteudo?: string){
    this.titulo = titulo;
    this.descricao = descricao;
    this.conteudo = conteudo;
  }

}
