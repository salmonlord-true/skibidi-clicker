const LAYER_1_LIST = ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
const LAYER_2_LIST = ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"];
const LAYER_3_LIST = ["", "Ce", "DCe", "TCe", "qCe", "QCe", "sCe", "SCe", "OCe", "NCe"];

function rounding(input, precision) {
  return Math.round(input * (10 ** precision)) / (10 ** precision);
}

function getBaseLog(base, number) {
  return Math.log(number) / Math.log(base);
}

function getIllion(number) {
  return Math.floor(getBaseLog(10, number)/3)-1;
}

function getPostfix(number) {
  illion = getIllion(number);
  return LAYER_1_LIST[illion%10] + LAYER_2_LIST[Math.floor(illion%100/10)] + LAYER_3_LIST[Math.floor(illion%1000/100)];;
}

function normFormat(input, precision, notation) {
  //notation 1 = standard; 2 = scientific
  let output = "";
  rounded = rounding(input, precision);

  switch (notation) {
    case 1:
      if (Math.abs(rounded) < 1000) {
        output = rounded;
      }
      if (1000 <= Math.abs(rounded) && Math.abs(rounded) < 10**6) {
        output = rounding(rounded/(10**3), precision).toString() + " K";
      }
      if (10**6 <= Math.abs(rounded) && Math.abs(rounded) < 10**9) {
        output = rounding(rounded/(10**6), precision).toString() + " M";
      }
      if (10**9 <= Math.abs(rounded) && Math.abs(rounded) < 10**12) {
        output = rounding(rounded/(10**9), precision).toString() + " B";
      }
      if (10**12 <= Math.abs(rounded) && Math.abs(rounded) < 10**15) {
        output = rounding(rounded/(10**12), precision).toString() + " T";
      }
      if (Math.abs(rounded) >= 10**15) {
        output = rounding(rounded / (10 ** (getIllion(rounded) * 3 + 3)), precision).toString() + " " + getPostfix(rounded);
      }
      break;
    case 2:
      if (Math.abs(rounded) < 1000) {
        output = rounded;
      } else {
        output = (Math.round((rounded/10**Math.floor(getBaseLog(10, rounded)))*10**precision)/10**precision).toString() + "e" + Math.floor(getBaseLog(10, rounded)) 
      }
      
    default: break;

  }
  return output;
}

function formatTest(notation) {
	alert(normFormat(0.4545, 3, notation));
	alert(normFormat(1.4356, 3, notation));
	alert(normFormat(435.343, 3, notation));
	alert(normFormat(623000, 3, notation));
	alert(normFormat(19483845, 3, notation));
	alert(normFormat(3235647856, 3, notation));
	alert(normFormat(432432423434.234324, 3, notation));
	alert(normFormat(95491238845853892.432942394, 3, notation));
	alert(normFormat(69329584938594768349327569328423, 3, notation));
	alert(normFormat(76518394759843672865784637857689137454613869813724897135, 3, notation));
	alert(normFormat(1000, 3, notation));
	alert(normFormat(1000000, 3, notation));
	alert(normFormat(1000000000, 3, notation));
	alert(normFormat(999999999.99999999, 3, notation));
	alert(normFormat(1.4324324e296, 3, notation));
}