export interface Person {
  sname: string;
  sdesig: string;
  sdate: string;
  dcode: string;
  dplace: string;

  pname: string;
  pge: string;
  padhr: string;
  phname: string;
  pward: string;
  ppnchyth: string;
  pthlk: string;
  pdstrct: string;

  pmail: string;
  pmob: string;

  casualities: [
      {
          casStatus: string,
          casRln: string,
          casName: string,
          casAge: string
      }
  ];

  assets: [
      {
          astTyp: string,
          astStatus: string,
          astArea: string,
          astBldno: string
      }
  ];

  vehicles: [
      {
          vhlTyp: string,
          vhlStatus: string,
          vhlMake: string,
          vhlMdl: string,
          vhlNo: string,
          vhlIns: string
      }
  ];

  cmnts: string;
  }
