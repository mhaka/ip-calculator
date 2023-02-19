var measure1 = null;
var measure2 = null;

function findClass(oct) {
  if (oct >= 0 && oct <= 127) {
    document.getElementById("radioA").checked = true;
    document.getElementById("radioB").checked = false;
    document.getElementById("radioC").checked = false;
    return "A";
  } else if (oct >= 128 && oct <= 191) {
    document.getElementById("radioB").checked = true;
    document.getElementById("radioA").checked = false;
    document.getElementById("radioC").checked = false;
    return "B";
  } else if (oct >= 192 && oct <= 223) {
    document.getElementById("radioC").checked = true;
    document.getElementById("radioA").checked = false;
    document.getElementById("radioB").checked = false;
    return "C";
  } else {
    return null;
  }
}

function findMeasures(nClass, oct1, oct2, oct3) {
  if (nClass === "A") {
    document.getElementById("networkid").value = oct1 + ".0.0.0";
    document.getElementById("subnetmask").value = "255.0.0.0";
    return oct1 + ".0.0.0";
  } else if (nClass === "B") {
    document.getElementById("networkid").value = oct1 + "." + oct2 + ".0.0";
    document.getElementById("subnetmask").value = "255.255.0.0";
    return oct1 + "." + oct2 + ".0.0";
  } else if (nClass === "C") {
    document.getElementById("networkid").value =
      oct1 + "." + oct2 + "." + oct3 + ".0";
    document.getElementById("subnetmask").value = "255.255.255.0";
    return oct1 + "." + oct2 + "." + oct3 + ".0";
  } else {
    return null;
  }
}

function calc1() {
  var oct1 = parseInt(document.getElementById("oct1").value);
  var oct2 = parseInt(document.getElementById("oct2").value);
  var oct3 = parseInt(document.getElementById("oct3").value);
  var oct4 = parseInt(document.getElementById("oct4").value);

  measure1 = findMeasures(findClass(oct1), oct1, oct2, oct3);
}

function calc2() {
  var oct1 = parseInt(document.getElementById("oct11").value);
  var oct2 = parseInt(document.getElementById("oct22").value);
  var oct3 = parseInt(document.getElementById("oct33").value);
  var oct4 = parseInt(document.getElementById("oct44").value);

  measure2 = findMeasures(findClass(oct1), oct1, oct2, oct3);
}

function legible() {
  calc1();
  calc2();
  if (measure1 == null || measure2 == null) {
    alert("Give valid IPs");
  } else {
    if (measure1 == measure2) {
      document.getElementById("samenetwork").value = true;
    } else {
      document.getElementById("samenetwork").value = false;
    }
  }
}
