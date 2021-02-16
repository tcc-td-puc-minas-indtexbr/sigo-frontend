import StandardDto from "models/StandardDto";
import namor from "namor";

const range = (len: any) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? "relationship" : statusChance > 0.33 ? "complicated" : "single",
  };
};

export default function makeData(...lens: any) {
  const makeDataLevel = (depth = 0): any => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const standardTestData: StandardDto[] = [
  {
    id: 1,
    uuid: "067d914c-cb19-4f3f-8755-584e0eafe344",
    identification: "ISO 9001:2015 A",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Sistemas - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
  {
    id: 2,
    uuid: "7409006b-6145-44e6-819d-ab66a7a9be69",
    identification: "ISO 9001:2015 B",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Sistemas de gestão - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
  {
    id: 3,
    uuid: "c3451531-eecf-414b-b1e1-d2a456eb71fd",
    identification: "ISO 9001:2015 C",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Sistemas de gestão da qualidade - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
  {
    id: 4,
    uuid: "0c03a571-0c08-40d1-aef4-a3ecab89bf2e",
    identification: "ISO 9001:2015 D",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Gestão da qualidade - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
  {
    id: 5,
    uuid: "2fb65405-e698-44cd-9391-a69826093f78",
    identification: "ISO 9001:2015 E",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Sistemas de qualidade - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
  {
    id: 6,
    uuid: "deacb030-d0f4-463b-9b8b-0c929fc44a64",
    identification: "ISO 9001:2015 F",
    publication_date: "2015-09-30",
    validity_start: "2015-10-30",
    title: "Sistemas de gestão da qualidade - Requisitos",
    title_global_language: "",
    comite: "",
    pages: 30,
    status: "Arquivado",
    language: "English",
    organization: "ABNT - Associação Brasileira de Normas Técnicas",
    price: 170.0,
    currency: "BRL",
    objective: null,
    url: "http://paginapessoal.utfpr.edu.br/canabarro/iso%209000-2015.pdf/at_download/file",
    file: "NORMA%20ISO%2090002015.pdf",
  },
];
