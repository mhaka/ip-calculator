function calc1() {
  var networkIdElement = document.getElementById("networkid");
  var subnetMaskElement = document.getElementById("subnetmask");
  var broadcastIdElement = document.getElementById("broadcastid");

  var oct1 = parseInt(document.getElementById("oct1").value);
  var oct2 = parseInt(document.getElementById("oct2").value);
  var oct3 = parseInt(document.getElementById("oct3").value);
  var oct4 = parseInt(document.getElementById("oct4").value);
  var ip1 = parseInt(document.getElementById("sb1").value);

  var ip =
    convertToBinary(oct1, 8) +
    "" +
    convertToBinary(oct2, 8) +
    "" +
    convertToBinary(oct3, 8) +
    "" +
    convertToBinary(oct4, 8);
  var networkId = ip.substr(0, ip1);
  var result1;
  result1 = fillWith(networkId, "0", 32);
  var toReturn = result1;
  var result2 = "";
  for (var i = 1; i <= ip1; i++) {
    result2 += "1";
  }
  result2 = fillWith(result2, "0", 32);
  var result3 = fillWith(networkId, "1", 32);
  result1 = explodeAndDecimal(result1, ".", 8);
  result2 = explodeAndDecimal(result2, ".", 8);
  result3 = explodeAndDecimal(result3, ".", 8);

  networkIdElement.value = result1;
  subnetMaskElement.value = result2;
  broadcastIdElement.value = result3;
  return toReturn;
}

function calc2() {
  var networkIdElement = document.getElementById("networkid");
  var subnetMaskElement = document.getElementById("subnetmask");
  var broadcastIdElement = document.getElementById("broadcastid");

  var oct1 = parseInt(document.getElementById("oct11").value);
  var oct2 = parseInt(document.getElementById("oct22").value);
  var oct3 = parseInt(document.getElementById("oct33").value);
  var oct4 = parseInt(document.getElementById("oct44").value);
  var ip2 = parseInt(document.getElementById("sb2").value);

  var ip =
    convertToBinary(oct1, 8) +
    "" +
    convertToBinary(oct2, 8) +
    "" +
    convertToBinary(oct3, 8) +
    "" +
    convertToBinary(oct4, 8);
  var networkId = ip.substr(0, ip2);
  var result1 = fillWith(networkId, "0", 32);
  var toReturn = result1;
  var result2 = "";
  for (var i = 1; i <= ip2; i++) {
    result2 += "1";
  }
  result2 = fillWith(result2, "0", 32);
  var result3 = fillWith(networkId, "1", 32);
  result1 = explodeAndDecimal(result1, ".", 8);
  result2 = explodeAndDecimal(result2, ".", 8);
  result3 = explodeAndDecimal(result3, ".", 8);

  networkIdElement.value = result1;
  subnetMaskElement.value = result2;
  broadcastIdElement.value = result3;
  return toReturn;
}

function legible() {
  var sameNetworkElement = document.getElementById("samenetwork");

  if (calc1() == calc2()) {
    sameNetworkElement.setAttribute("style", "color:green;");
    sameNetworkElement.value = true;
  } else {
    sameNetworkElement.setAttribute("style", "color:red;");
    sameNetworkElement.value = false;
  }
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

function reverseString(str) {
  if (str === "") return "";
  else return reverseString(str.substr(1)) + str.charAt(0);
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

function fillWith(word, c, length) {
  var str = word;
  var size = word.length;
  for (var i = 1; i <= length - size; i++) {
    str = str + c;
  }
  return str;
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
