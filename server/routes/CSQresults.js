import { db } from '../db.js';

const CSQ_RESULTS_VIEW = 'CSQresults';

function splitStrAndGetValue(str) {
  return str.split('=')[1];
}

export function CSQresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const patientUrl = url.split('&')[0];
    const formUrl = url.split('&')[1];
    const patientId = splitStrAndGetValue(patientUrl);
    const formId = splitStrAndGetValue(formUrl);
    const data = { id: patientId };
    let answer3result;
    let answer4result;
    let answer20result;
    let answer21result;
    let result1;
    let result2;
    let result3;
    let result4;
    let result5;
    let result6;
    let result;

    db.collection('patients').findOne(data, (err, doc) => {
      if (Number(doc.CsqForm[formId][3]) > 60) answer3result = 5;
      else if (Number(doc.CsqForm[formId][3]) <= 60 && Number(doc.CsqForm[formId][3]) > 45) answer3result = 4;
      else if (Number(doc.CsqForm[formId][3]) <= 45 && Number(doc.CsqForm[formId][3]) > 30) answer3result = 3;
      else if (Number(doc.CsqForm[formId][3]) <= 30 && Number(doc.CsqForm[formId][3]) > 15) answer3result = 2;
      else answer3result = 1;

      if (Number(doc.CsqForm[formId][4]) > 60) answer4result = 5;
      else if (Number(doc.CsqForm[formId][4]) <= 60 && Number(doc.CsqForm[formId][4]) > 45) answer4result = 4;
      else if (Number(doc.CsqForm[formId][4]) <= 45 && Number(doc.CsqForm[formId][4]) > 30) answer4result = 3;
      else if (Number(doc.CsqForm[formId][4]) <= 30 && Number(doc.CsqForm[formId][4]) > 15) answer4result = 2;
      else answer4result = 1;

      if (Number(doc.CsqForm[formId][20]) < 5) answer20result = 5;
      else if (Number(doc.CsqForm[formId][20]) >= 5 && Number(doc.CsqForm[formId][20]) < 6.5) answer20result = 4;
      else if (Number(doc.CsqForm[formId][20]) >= 6.5 && Number(doc.CsqForm[formId][20]) < 8) answer20result = 3;
      else if (Number(doc.CsqForm[formId][20]) >= 8 && Number(doc.CsqForm[formId][20]) < 9) answer20result = 2;
      else answer20result = 1;

      if (Number(doc.CsqForm[formId][21]) < 5) answer21result = 5;
      else if (Number(doc.CsqForm[formId][21]) >= 5 && Number(doc.CsqForm[formId][21]) < 6.5) answer21result = 4;
      else if (Number(doc.CsqForm[formId][21]) >= 6.5 && Number(doc.CsqForm[formId][21]) < 8) answer21result = 3;
      else if (Number(doc.CsqForm[formId][21]) >= 8 && Number(doc.CsqForm[formId][21]) < 9) answer21result = 2;
      else answer21result = 1;

      result1 = ((answer3result + answer4result) / 2) + ((answer20result + answer21result) / 2) + Number(doc.CsqForm[formId][6]) + Number(doc.CsqForm[formId][7]) + (Number(doc.CsqForm[formId][16]) + (Number(doc.CsqForm[formId][17])) / 2) + Number(doc.CsqForm[formId][40]) + Number(doc.CsqForm[formId][41]);
      result2 = Number(doc.CsqForm[formId][32]) + Number(doc.CsqForm[formId][33]) + Number(doc.CsqForm[formId][34]);
      result3 = Number(doc.CsqForm[formId][29]) + Number(doc.CsqForm[formId][37]) + Number(doc.CsqForm[formId][38]);
      result4 = Number(doc.CsqForm[formId][12]) + Number(doc.CsqForm[formId][13]) + Number(doc.CsqForm[formId][14]) + Number(doc.CsqForm[formId][27]) + Number(doc.CsqForm[formId][28]) + Number(doc.CsqForm[formId][31]);
      result5 = Number(doc.CsqForm[formId][49]) + Number(doc.CsqForm[formId][52]) + Number(doc.CsqForm[formId][53]) + Number(doc.CsqForm[formId][54]) + Number(doc.CsqForm[formId][55]);
      result6 = Number(doc.CsqForm[formId][15]) + Number(doc.CsqForm[formId][35]);
      result = result1 + result2 + result3 + result4 + result5 + result6;

      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.CsqForm[formId][58],
        creator: doc.CsqForm[formId][0],
        answer1: doc.CsqForm[formId][1],
        answer2: doc.CsqForm[formId][2],
        answer3: doc.CsqForm[formId][3],
        answer4: doc.CsqForm[formId][4],
        answer5: doc.CsqForm[formId][5],
        answer6: doc.CsqForm[formId][6],
        answer7: doc.CsqForm[formId][7],
        answer8: doc.CsqForm[formId][8],
        answer9: doc.CsqForm[formId][9],
        answer10: doc.CsqForm[formId][10],
        answer11: doc.CsqForm[formId][11],
        answer12: doc.CsqForm[formId][12],
        answer13: doc.CsqForm[formId][13],
        answer14: doc.CsqForm[formId][14],
        answer15: doc.CsqForm[formId][15],
        answer16: doc.CsqForm[formId][16],
        answer17: doc.CsqForm[formId][17],
        answer18: doc.CsqForm[formId][18],
        answer19: doc.CsqForm[formId][19],
        answer20: doc.CsqForm[formId][20],
        answer21: doc.CsqForm[formId][21],
        answer22: doc.CsqForm[formId][22],
        answer23: doc.CsqForm[formId][23],
        answer24: doc.CsqForm[formId][24],
        answer25: doc.CsqForm[formId][25],
        answer26: doc.CsqForm[formId][26],
        answer27: doc.CsqForm[formId][27],
        answer28: doc.CsqForm[formId][28],
        answer29: doc.CsqForm[formId][29],
        answer30: doc.CsqForm[formId][30],
        answer31: doc.CsqForm[formId][31],
        answer32: doc.CsqForm[formId][32],
        answer33: doc.CsqForm[formId][33],
        answer34: doc.CsqForm[formId][34],
        answer35: doc.CsqForm[formId][35],
        answer36: doc.CsqForm[formId][36],
        answer37: doc.CsqForm[formId][37],
        answer38: doc.CsqForm[formId][38],
        answer39: doc.CsqForm[formId][39],
        answer40: doc.CsqForm[formId][40],
        answer41: doc.CsqForm[formId][41],
        answer42: doc.CsqForm[formId][42],
        answer43: doc.CsqForm[formId][43],
        answer44: doc.CsqForm[formId][44],
        answer45: doc.CsqForm[formId][45],
        answer46: doc.CsqForm[formId][46],
        answer47: doc.CsqForm[formId][47],
        answer48: doc.CsqForm[formId][48],
        answer49: doc.CsqForm[formId][49],
        answer50: doc.CsqForm[formId][50],
        answer51: doc.CsqForm[formId][51],
        answer52: doc.CsqForm[formId][52],
        answer53: doc.CsqForm[formId][53],
        answer54: doc.CsqForm[formId][54],
        answer55: doc.CsqForm[formId][55],
        answer56: doc.CsqForm[formId][56],
        answer57: doc.CsqForm[formId][57],
        patientResult1: result1,
        patientResult2: result2,
        patientResult3: result3,
        patientResult4: result4,
        patientResult5: result5,
        patientResult6: result6,
        patientResult: result,
        pageTitle: 'Detský spánkový dotazník',
        noLogout: false
      };
      res.render(CSQ_RESULTS_VIEW, context);
    });
  }
}
