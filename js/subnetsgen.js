function gjeneroSubnets() {
  var oct1Dec = parseInt(document.getElementById("oct1").value);
  var oct2Dec = parseInt(document.getElementById("oct2").value);
  var oct3Dec = parseInt(document.getElementById("oct3").value);
  var oct4Dec = parseInt(document.getElementById("oct4").value);
  var noOfSubnets = document.getElementById("subnetsNo").value;
  var ip2 = parseInt(document.getElementById("ip2").value);

  var bitsForSubnetting = requiredBits(noOfSubnets);
  var ip =
    convertToBinary(oct1Dec, 8) +
    "" +
    convertToBinary(oct2Dec, 8) +
    "" +
    convertToBinary(oct3Dec, 8) +
    "" +
    convertToBinary(oct4Dec, 8);
  var networkId = ip.substr(0, ip2); //rename this

  if (ip2 + bitsForSubnetting <= 32) {
    var combArr = generateCombinations(noOfSubnets, bitsForSubnetting);

    var networkIds = [];
    var broadcastIds = [];
    for (var i = 0; i < noOfSubnets; i++) {
      var res1 = networkId + "" + combArr[i];
      res1 = fillWith(res1, "0", 32);
      res1 = explodeAndDecimal(res1, ".", 8);
      res1 += "/" + (ip2 + bitsForSubnetting);
      networkIds.push(res1);

      var res2 = networkId + "" + combArr[i];
      res2 = fillWith(res2, "1", 32);
      res2 = explodeAndDecimal(res2, ".", 8);
      res2 += "/" + (ip2 + bitsForSubnetting);
      broadcastIds.push(res2);
    }

    for (var indx = 0; indx < networkIds.length; indx++) {
      createTable(networkIds[indx], broadcastIds[indx], indx);
    }
  } else {
    alert("error");
  }
}

function convertToBinary(number, size) {
  var result = "";
  while (number != 0) {
    var rem = number % 2;
    result = result + rem;
    number = parseInt(number / 2);
  }

  var noChars = result.length;
  result = fillWith(result, "0", size);
  result = reverseString(result);
  return result;
}

function reverseString(str) {
  if (str === "") return "";
  else return reverseString(str.substr(1)) + str.charAt(0);
}

function convertToDecimal(number) {
  var maxPower = number.length - 1;
  var sum = 0;
  for (var i = 0; i < number.length; i++) {
    if (number.charAt(i) == "1") {
      sum += Math.pow(2, maxPower - i);
    }
  }
  return sum;
}

function requiredBits(noGroups) {
  var done = false;
  var i = -1;
  while (!done) {
    i++;
    if (noGroups <= Math.pow(2, i)) done = true;
  }
  return i;
}

function fillWith(word, c, length) {
  var size = word.length;
  for (var i = 1; i <= length - size; i++) {
    word = word + c;
  }
  return word;
}

function generateCombinations(reps, size) {
  var arr = [];
  for (var i = 0; i < reps; i++) {
    var str = convertToBinary(i, size);
    arr.push(str);
  }
  return arr;
}

function explodeAndDecimal(str, c, no) {
  var newStr = "";
  for (var index = 0; index < str.length; index = index + no) {
    var sbstr = str.substr(index, no);
    var dec = convertToDecimal(sbstr);
    newStr += dec + c;
  }
  newStr = newStr.substr(0, newStr.length - 1);
  return newStr;
}

function createTable(netId, broadId, number) {
  var body = document.querySelector("body");
  var headerText = document.createTextNode("Subnet " + (number + 1));
  var networkColText = document.createTextNode("Network Id: ");
  var networkIdText = document.createTextNode(netId);
  var broadColText = document.createTextNode("Broadcast Id:");
  var broadIdText = document.createTextNode(broadId);

  var th = document.createElement("th");
  th.setAttribute("colspan", "2");
  th.appendChild(headerText);
  var td0 = document.createElement("td");
  td0.appendChild(networkColText);
  var td1 = document.createElement("td");
  td1.appendChild(networkIdText);
  var td2 = document.createElement("td");
  td2.appendChild(broadColText);
  var td3 = document.createElement("td");
  td3.appendChild(broadIdText);

  var row0 = document.createElement("tr");
  row0.appendChild(th);
  var row1 = document.createElement("tr");
  row1.appendChild(td0);
  row1.appendChild(td1);
  var row2 = document.createElement("tr");
  row2.appendChild(td2);
  row2.appendChild(td3);

  var tabela = document.createElement("table");
  tabela.setAttribute("style", "margin-top:20px;");
  tabela.appendChild(row0);
  tabela.appendChild(row1);
  tabela.appendChild(row2);

  body.appendChild(tabela);
}
