import { db } from '../db.js';

const CSQ_RESULTS_VIEW = 'CSQresults';

function splitStr(str) {
  // Function to split string
  return str.split('=');
}

export function CSQresults(req, res) {
  if (req.user) {
    const url = req.originalUrl;
    const id = splitStr(url);
    const data = { id: id[1] };
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
      if (Number(doc.CSQ_answer_3) > 60) answer3result = 5;
      else if (Number(doc.CSQ_answer_3) <= 60 && Number(doc.CSQ_answer_3) > 45) answer3result = 4;
      else if (Number(doc.CSQ_answer_3) <= 45 && Number(doc.CSQ_answer_3) > 30) answer3result = 3;
      else if (Number(doc.CSQ_answer_3) <= 30 && Number(doc.CSQ_answer_3) > 15) answer3result = 2;
      else answer3result = 1;

      if (Number(doc.CSQ_answer_4) > 60) answer4result = 5;
      else if (Number(doc.CSQ_answer_4) <= 60 && Number(doc.CSQ_answer_4) > 45) answer4result = 4;
      else if (Number(doc.CSQ_answer_4) <= 45 && Number(doc.CSQ_answer_4) > 30) answer4result = 3;
      else if (Number(doc.CSQ_answer_4) <= 30 && Number(doc.CSQ_answer_4) > 15) answer4result = 2;
      else answer4result = 1;

      if (Number(doc.CSQ_answer_20) < 5) answer20result = 5;
      else if (Number(doc.CSQ_answer_20) >= 5 && Number(doc.CSQ_answer_20) < 6.5) answer20result = 4;
      else if (Number(doc.CSQ_answer_20) >= 6.5 && Number(doc.CSQ_answer_20) < 8) answer20result = 3;
      else if (Number(doc.CSQ_answer_20) >= 8 && Number(doc.CSQ_answer_20) < 9) answer20result = 2;
      else answer20result = 1;

      if (Number(doc.CSQ_answer_21) < 5) answer21result = 5;
      else if (Number(doc.CSQ_answer_21) >= 5 && Number(doc.CSQ_answer_21) < 6.5) answer21result = 4;
      else if (Number(doc.CSQ_answer_21) >= 6.5 && Number(doc.CSQ_answer_21) < 8) answer21result = 3;
      else if (Number(doc.CSQ_answer_21) >= 8 && Number(doc.CSQ_answer_21) < 9) answer21result = 2;
      else answer21result = 1;

      result1 = ((answer3result + answer4result) / 2) + ((answer20result + answer21result) / 2) + Number(doc.CSQ_answer_6) + Number(doc.CSQ_answer_7) + (Number(doc.CSQ_answer_16) + Number(doc.CSQ_answer_17))/2 + Number(doc.CSQ_answer_40) + Number(doc.CSQ_answer_41);
      result2 = Number(doc.CSQ_answer_32) + Number(doc.CSQ_answer_33) + Number(doc.CSQ_answer_34);
      result3 = Number(doc.CSQ_answer_29) + Number(doc.CSQ_answer_37) + Number(doc.CSQ_answer_38);
      result4 = Number(doc.CSQ_answer_12) + Number(doc.CSQ_answer_13) + Number(doc.CSQ_answer_14) + Number(doc.CSQ_answer_27) + Number(doc.CSQ_answer_28) + Number(doc.CSQ_answer_31);
      result5 = Number(doc.CSQ_answer_49) + Number(doc.CSQ_answer_52) + Number(doc.CSQ_answer_53) + Number(doc.CSQ_answer_54) + Number(doc.CSQ_answer_55);
      result6 = Number(doc.CSQ_answer_15) + Number(doc.CSQ_answer_35);
      result = result1 + result2 + result3 + result4 + result5 + result6;

      const context = {
        patientName: doc.name,
        patientSurname: doc.surname,
        creationDate: doc.CSQ_creationDate,
        creator: doc.CSQ_creator,
        answer1: doc.CSQ_answer_1,
        answer2: doc.CSQ_answer_2,
        answer3: doc.CSQ_answer_3,
        answer4: doc.CSQ_answer_4,
        answer5: doc.CSQ_answer_5,
        answer6: doc.CSQ_answer_6,
        answer7: doc.CSQ_answer_7,
        answer8: doc.CSQ_answer_8,
        answer9: doc.CSQ_answer_9,
        answer10: doc.CSQ_answer_10,
        answer11: doc.CSQ_answer_11,
        answer12: doc.CSQ_answer_12,
        answer13: doc.CSQ_answer_13,
        answer14: doc.CSQ_answer_14,
        answer15: doc.CSQ_answer_15,
        answer16: doc.CSQ_answer_16,
        answer17: doc.CSQ_answer_17,
        answer18: doc.CSQ_answer_18,
        answer19: doc.CSQ_answer_19,
        answer20: doc.CSQ_answer_20,
        answer21: doc.CSQ_answer_21,
        answer22: doc.CSQ_answer_22,
        answer23: doc.CSQ_answer_23,
        answer24: doc.CSQ_answer_24,
        answer25: doc.CSQ_answer_25,
        answer26: doc.CSQ_answer_26,
        answer27: doc.CSQ_answer_27,
        answer28: doc.CSQ_answer_28,
        answer29: doc.CSQ_answer_29,
        answer30: doc.CSQ_answer_30,
        answer31: doc.CSQ_answer_31,
        answer32: doc.CSQ_answer_32,
        answer33: doc.CSQ_answer_33,
        answer34: doc.CSQ_answer_34,
        answer35: doc.CSQ_answer_35,
        answer36: doc.CSQ_answer_36,
        answer37: doc.CSQ_answer_37,
        answer38: doc.CSQ_answer_38,
        answer39: doc.CSQ_answer_39,
        answer40: doc.CSQ_answer_40,
        answer41: doc.CSQ_answer_41,
        answer42: doc.CSQ_answer_42,
        answer43: doc.CSQ_answer_43,
        answer44: doc.CSQ_answer_44,
        answer45: doc.CSQ_answer_45,
        answer46: doc.CSQ_answer_46,
        answer47: doc.CSQ_answer_47,
        answer48: doc.CSQ_answer_48,
        answer49: doc.CSQ_answer_49,
        answer50: doc.CSQ_answer_50,
        answer51: doc.CSQ_answer_51,
        answer52: doc.CSQ_answer_52,
        answer53: doc.CSQ_answer_53,
        answer54: doc.CSQ_answer_54,
        answer55: doc.CSQ_answer_55,
        answer56: doc.CSQ_answer_56,
        answer57: doc.CSQ_answer_57,
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
