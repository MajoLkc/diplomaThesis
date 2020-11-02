import { db } from '../db.js';

const PATIENT_LIST_VIEW = 'patientList';
const ExcelJS = require('excel4node');

let info = [];
let index;

function date(dateObject) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = `${day}.${month}.${year}`;
  return date;
}

function calculateAge(birthday) {
  const splitToday = date(Date.now()).split('.');
  const splitBirthday = date(birthday).split('.');
  const age = splitToday[2] - splitBirthday[2];
  if (Number(splitToday[1]) < Number(splitBirthday[1])) {
    return age - 1;
  } else if (Number(splitToday[0]) < Number(splitBirthday[0])) {
    return age - 1;
  }
  return age;
}

function calculateBMI(weight, height) {
  const BMI = (weight / (height * height)) * 10000;
  const roundedBMI = BMI.toFixed(2);
  return roundedBMI;
}

export function patientList(req, res) {
  const filters = req.query.surname ? {
    surname: req.query.surname
  } : undefined

  if (req.user) {
    db.collection('patients').find(filters).sort({ _id: -1 }).toArray((err, result) => {
      if (err) throw err;
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
        informations: info,
        surname: req.query.surname || ''
      };
      res.render(PATIENT_LIST_VIEW, context);
    });
    const number = db.collection('patients').count();
    console.log(number);
  }
}

export function generateExcel(req, res) {
  const data = req.body;
  const count = Number(data.numberOfPacients);

  const filters = data.surname ? {
    surname: data.surname
  } : undefined

  db.collection('patients').find(filters).sort({ _id: -1 }).limit(count)
    .toArray((err, result) => {
      const workbook = new ExcelJS.Workbook();

      const bgStyle = workbook.createStyle({
        fill: {
          type: 'pattern',
          patternType: 'solid',
          bgColor: '#ACCEE5',
          fgColor: '#ACCEE5'
        }
      });

      // Add Worksheets to the workbook
      const csq = workbook.addWorksheet('Detský spánkový dotazník');
      const ess = workbook.addWorksheet('Epworthská škála spavosti');
      const mq = workbook.addWorksheet('Ranný dotazník');
      const osas = workbook.addWorksheet('Syndróm OSA');

      let patientSurname;
      let patientGender;
      let age;
      let bmi;

      for (index = 0; index < count; index++) {
        patientSurname = result[index].surname;
        patientGender = result[index].gender;
        age = calculateAge(result[index].birthDate);
        bmi = calculateBMI(result[index].weight, result[index].height);
        csq.cell(index + 2, 1).string(patientSurname);
        csq.cell(index + 2, 2).string(patientGender);
        csq.cell(index + 2, 3).number(age);
        csq.cell(index + 2, 4).string(bmi);
        csq.cell(index + 2, 5).string(result[index].CSQ_answer_1);
        csq.cell(index + 2, 6).string(result[index].CSQ_answer_2);
        csq.cell(index + 2, 7).string(result[index].CSQ_answer_3);
        csq.cell(index + 2, 8).string(result[index].CSQ_answer_4);
        csq.cell(index + 2, 9).string(result[index].CSQ_answer_5);
        csq.cell(index + 2, 10).string(result[index].CSQ_answer_6);
        csq.cell(index + 2, 11).string(result[index].CSQ_answer_7);
        csq.cell(index + 2, 12).string(result[index].CSQ_answer_8);
        csq.cell(index + 2, 13).string(result[index].CSQ_answer_9);
        csq.cell(index + 2, 14).string(result[index].CSQ_answer_10);
        csq.cell(index + 2, 15).string(result[index].CSQ_answer_11);
        csq.cell(index + 2, 16).string(result[index].CSQ_answer_12);
        csq.cell(index + 2, 17).string(result[index].CSQ_answer_13);
        csq.cell(index + 2, 18).string(result[index].CSQ_answer_14);
        csq.cell(index + 2, 19).string(result[index].CSQ_answer_15);
        csq.cell(index + 2, 20).string(result[index].CSQ_answer_16);
        csq.cell(index + 2, 21).string(result[index].CSQ_answer_17);
        csq.cell(index + 2, 22).string(result[index].CSQ_answer_18);
        csq.cell(index + 2, 23).string(result[index].CSQ_answer_19);
        csq.cell(index + 2, 24).string(result[index].CSQ_answer_20);
        csq.cell(index + 2, 25).string(result[index].CSQ_answer_21);
        csq.cell(index + 2, 26).string(result[index].CSQ_answer_22);
        csq.cell(index + 2, 27).string(result[index].CSQ_answer_23);
        csq.cell(index + 2, 28).string(result[index].CSQ_answer_24);
        csq.cell(index + 2, 29).string(result[index].CSQ_answer_25);
        csq.cell(index + 2, 30).string(result[index].CSQ_answer_26);
        csq.cell(index + 2, 31).string(result[index].CSQ_answer_27);
        csq.cell(index + 2, 32).string(result[index].CSQ_answer_28);
        csq.cell(index + 2, 33).string(result[index].CSQ_answer_29);
        csq.cell(index + 2, 34).string(result[index].CSQ_answer_30);
        csq.cell(index + 2, 35).string(result[index].CSQ_answer_31);
        csq.cell(index + 2, 36).string(result[index].CSQ_answer_32);
        csq.cell(index + 2, 37).string(result[index].CSQ_answer_33);
        csq.cell(index + 2, 38).string(result[index].CSQ_answer_34);
        csq.cell(index + 2, 39).string(result[index].CSQ_answer_35);
        csq.cell(index + 2, 40).string(result[index].CSQ_answer_36);
        csq.cell(index + 2, 41).string(result[index].CSQ_answer_37);
        csq.cell(index + 2, 42).string(result[index].CSQ_answer_38);
        csq.cell(index + 2, 43).string(result[index].CSQ_answer_39);
        csq.cell(index + 2, 44).string(result[index].CSQ_answer_40);
        csq.cell(index + 2, 45).string(result[index].CSQ_answer_41);
        csq.cell(index + 2, 46).string(result[index].CSQ_answer_42);
        csq.cell(index + 2, 47).string(result[index].CSQ_answer_43);
        csq.cell(index + 2, 48).string(result[index].CSQ_answer_44);
        csq.cell(index + 2, 49).string(result[index].CSQ_answer_45);
        csq.cell(index + 2, 50).string(result[index].CSQ_answer_46);
        csq.cell(index + 2, 51).string(result[index].CSQ_answer_47);
        csq.cell(index + 2, 52).string(result[index].CSQ_answer_48);
        csq.cell(index + 2, 53).string(result[index].CSQ_answer_49);
        csq.cell(index + 2, 54).string(result[index].CSQ_answer_50);
        csq.cell(index + 2, 55).string(result[index].CSQ_answer_51);
        csq.cell(index + 2, 56).string(result[index].CSQ_answer_52);
        csq.cell(index + 2, 57).string(result[index].CSQ_answer_53);
        csq.cell(index + 2, 58).string(result[index].CSQ_answer_54);
        csq.cell(index + 2, 59).string(result[index].CSQ_answer_55);
        csq.cell(index + 2, 60).string(result[index].CSQ_answer_56);
        csq.cell(index + 2, 61).string(result[index].CSQ_answer_57);

        ess.cell(index + 2, 1).string(patientSurname);
        ess.cell(index + 2, 2).string(patientGender);
        ess.cell(index + 2, 3).number(age);
        ess.cell(index + 2, 4).string(bmi);
        ess.cell(index + 2, 1).string(patientSurname);
        ess.cell(index + 2, 2).string(patientGender);
        ess.cell(index + 2, 3).number(age);
        ess.cell(index + 2, 4).string(bmi);
        ess.cell(index + 2, 5).string(result[index].ESS_answer_1);
        ess.cell(index + 2, 6).string(result[index].ESS_answer_2);
        ess.cell(index + 2, 7).string(result[index].ESS_answer_3);
        ess.cell(index + 2, 8).string(result[index].ESS_answer_4);
        ess.cell(index + 2, 9).string(result[index].ESS_answer_5);
        ess.cell(index + 2, 10).string(result[index].ESS_answer_6);
        ess.cell(index + 2, 11).string(result[index].ESS_answer_7);
        ess.cell(index + 2, 12).string(result[index].ESS_answer_8);

        mq.cell(index + 2, 1).string(patientSurname);
        mq.cell(index + 2, 2).string(patientGender);
        mq.cell(index + 2, 3).number(age);
        mq.cell(index + 2, 4).string(bmi);
        mq.cell(index + 2, 5).string(result[index].MQ_answer_1);
        mq.cell(index + 2, 6).string(result[index].MQ_answer_2);
        mq.cell(index + 2, 7).string(result[index].MQ_answer_3);
        mq.cell(index + 2, 8).string(result[index].MQ_answer_4);
        mq.cell(index + 2, 9).string(result[index].MQ_answer_5);
        mq.cell(index + 2, 10).string(result[index].MQ_answer_6);

        osas.cell(index + 2, 1).string(patientSurname);
        osas.cell(index + 2, 2).string(patientGender);
        osas.cell(index + 2, 3).number(age);
        osas.cell(index + 2, 4).string(bmi);
        osas.cell(index + 2, 5).string(result[index].OSAS_answer_1);
        osas.cell(index + 2, 6).string(result[index].OSAS_answer_2);
        osas.cell(index + 2, 7).string(result[index].OSAS_answer_3);
        osas.cell(index + 2, 8).string(result[index].OSAS_answer_4);
        osas.cell(index + 2, 9).string(result[index].OSAS_answer_5);
        osas.cell(index + 2, 10).string(result[index].OSAS_answer_6);
        osas.cell(index + 2, 11).string(result[index].OSAS_answer_7);
        osas.cell(index + 2, 12).string(result[index].OSAS_answer_8);
        osas.cell(index + 2, 13).string(result[index].OSAS_answer_9);
        osas.cell(index + 2, 14).string(result[index].OSAS_answer_10);
        osas.cell(index + 2, 15).string(result[index].OSAS_answer_11);
        osas.cell(index + 2, 16).string(result[index].OSAS_answer_12);
        osas.cell(index + 2, 17).string(result[index].OSAS_answer_13);
        osas.cell(index + 2, 18).string(result[index].OSAS_answer_14);
        osas.cell(index + 2, 19).string(result[index].OSAS_answer_15);
        osas.cell(index + 2, 20).string(result[index].OSAS_answer_16);
      }

      csq.cell(1, 1).string('MENO').style(bgStyle);
      csq.cell(1, 2).string('POHLAVIE').style(bgStyle);
      csq.cell(1, 3).string('VEK').style(bgStyle);
      csq.cell(1, 4).string('BMI').style(bgStyle);
      csq.cell(1, 5).string('1. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 6).string('2. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 7).string('3. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 8).string('4. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 9).string('5. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 10).string('6. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 11).string('7. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 12).string('8. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 13).string('9. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 14).string('10. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 15).string('11. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 16).string('12. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 17).string('13. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 18).string('14. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 19).string('15. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 20).string('16. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 21).string('17. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 22).string('18. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 23).string('19. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 24).string('20. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 25).string('21. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 26).string('22. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 27).string('23. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 28).string('24. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 29).string('25. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 30).string('26. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 31).string('27. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 32).string('28. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 33).string('29. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 34).string('30. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 35).string('31. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 36).string('32. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 37).string('33. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 38).string('34. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 39).string('35. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 40).string('36. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 41).string('37. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 42).string('38. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 43).string('39. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 44).string('40. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 45).string('41. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 46).string('42. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 47).string('43. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 48).string('44. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 49).string('45. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 50).string('46. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 51).string('47. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 52).string('48. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 53).string('49. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 54).string('50. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 55).string('51. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 56).string('52. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 57).string('53. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 58).string('54. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 59).string('55. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 60).string('56. ODPOVEĎ').style(bgStyle);
      csq.cell(1, 61).string('57. ODPOVEĎ').style(bgStyle);

      ess.cell(1, 1).string('MENO').style(bgStyle);
      ess.cell(1, 2).string('POHLAVIE').style(bgStyle);
      ess.cell(1, 3).string('VEK').style(bgStyle);
      ess.cell(1, 4).string('BMI').style(bgStyle);
      ess.cell(1, 5).string('1. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 6).string('2. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 7).string('3. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 8).string('4. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 9).string('5. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 10).string('6. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 11).string('7. ODPOVEĎ').style(bgStyle);
      ess.cell(1, 12).string('8. ODPOVEĎ').style(bgStyle);

      mq.cell(1, 1).string('MENO').style(bgStyle);
      mq.cell(1, 2).string('POHLAVIE').style(bgStyle);
      mq.cell(1, 3).string('VEK').style(bgStyle);
      mq.cell(1, 4).string('BMI').style(bgStyle);
      mq.cell(1, 5).string('1. ODPOVEĎ').style(bgStyle);
      mq.cell(1, 6).string('2. ODPOVEĎ').style(bgStyle);
      mq.cell(1, 7).string('3. ODPOVEĎ').style(bgStyle);
      mq.cell(1, 8).string('4. ODPOVEĎ').style(bgStyle);
      mq.cell(1, 9).string('5. ODPOVEĎ').style(bgStyle);
      mq.cell(1, 10).string('6. ODPOVEĎ').style(bgStyle);

      osas.cell(1, 1).string('MENO').style(bgStyle);
      osas.cell(1, 2).string('POHLAVIE').style(bgStyle);
      osas.cell(1, 3).string('VEK').style(bgStyle);
      osas.cell(1, 4).string('BMI').style(bgStyle);
      osas.cell(1, 5).string('1. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 6).string('2. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 7).string('3. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 8).string('4. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 9).string('5. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 10).string('6. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 11).string('7. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 12).string('8. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 13).string('9. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 14).string('10. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 15).string('11. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 16).string('12. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 17).string('13. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 18).string('14. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 19).string('15. ODPOVEĎ').style(bgStyle);
      osas.cell(1, 20).string('16. ODPOVEĎ').style(bgStyle);

      workbook.write('Excel.xlsx');
      res.json({})
    })
}
