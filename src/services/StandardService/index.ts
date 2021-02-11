type Response = {
  isSuccess: boolean,
  data: any
};

interface IStandardService {
  GetAll: () => Promise<Response>;
};

class StandardService implements IStandardService {
  GetAll() {
    return new Promise<Response>(resolve => {
      setTimeout(() => {
        resolve({
          isSuccess: true,
          data: [
            {
              "id": 1,
              "uuid": "067d914c-cb19-4f3f-8755-584e0eafe344",
              "identification": "ISO 9001:2015",
              "publication_date": "2015-09-30",
              "validity_start": "2015-10-30",
              "title": "Sistemas de gestão da qualidade - Requisitos",
              "title_global_language": "",
              "comite": "",
              "pages": 30,
              "status": "Arquivado",
              "language": "English",
              "organization": "ABNT - Associação Brasileira de Normas Técnicas",
              "price": "170.00",
              "currency": "BRL",
              "objective": null,
              "url": "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
              "file": "NORMA%20ISO%2090002015.pdf"
            },
            {
              "id": 2,
              "uuid": "067d914c-cb19-4f3f-8755-584e0eafe344",
              "identification": "ISO 9001:2015",
              "publication_date": "2015-09-30",
              "validity_start": "2015-10-30",
              "title": "Sistemas de gestão da qualidade - Requisitos",
              "title_global_language": "",
              "comite": "",
              "pages": 30,
              "status": "Arquivado",
              "language": "English",
              "organization": "ABNT - Associação Brasileira de Normas Técnicas",
              "price": "170.00",
              "currency": "BRL",
              "objective": null,
              "url": "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
              "file": "NORMA%20ISO%2090002015.pdf"
            }
          ]
        })
      }, 1000);
    });
  };
};

export default StandardService;
