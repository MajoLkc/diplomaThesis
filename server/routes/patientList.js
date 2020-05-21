import { db } from '../db.js';

const PATIENT_LIST_VIEW = 'patientList';
const ExcelJS = require('excel4node');

let info = [];
let index;

export function patientList(req, res) {
  if (req.user) {
    db.collection('patients').find().toArray((err, result) => {
      info = [];
      for (index = 0; index < result.length; index++) {
        info.push({
          name: result[index].name,
          surname: result[index].surname,
          birthDate: result[index].birthDate,
          ID: result[index].id
        });
      }
      const context = {
        pageTitle: 'Zoznam pacientov',
        noLogout: false,
        informations: info
      };
      res.render(PATIENT_LIST_VIEW, context);
    });
  }
}

export function generateExcel(req, res) {
  db.collection('patients').find().toArray((err, result) => {
    info = [];
    console.log(result[1].registrationDate);
    // for (index = 0; index < result.length; index++) {
    //   info.push({
    //     name: result[index].name,
    //     surname: result[index].surname,
    //     birthDate: result[index].birthDate,
    //     ID: result[index].id
    //   });
    // }
  });

  const workbook = new ExcelJS.Workbook();

  // Add Worksheets to the workbook
  const worksheet = workbook.addWorksheet('Sheet 1');

  worksheet.cell(1, 1).number(100);

  worksheet.cell(1, 2).number(200);

  worksheet.cell(1, 3).formula('A1 + B1');

  worksheet.cell(2, 1).string('string');

  worksheet.cell(3, 1).bool(true);

  workbook.write('Excel.xlsx');
}
