function validate1() {
	valCheck = true;
	var image1 = getImage(firstNameCheck(document.forms["basic info"]["fname"].value), "fname");
    document.getElementById("fName").appendChild(image1);

	var image2 = getImage(lastNameCheck(document.forms["basic info"]["lname"].value), "lname");
    document.getElementById("lName").appendChild(image2);

	var image3 = getImage(genderCheck(document.forms["basic info"]["gender"].value), "gender");
    document.getElementById("Gender").appendChild(image3);
	
	var image4 = getImage(stateCheck(document.forms["basic info"]["state"].value), "state");
    document.getElementById("State").appendChild(image4);
	
	if(firstNameCheck(document.forms["basic info"]["fname"].value)&& lastNameCheck(document.forms["basic info"]["lname"].value)
		&& genderCheck(document.forms["basic info"]["gender"].value) && stateCheck(document.forms["basic info"]["state"].value)){
		document.getElementById("continue").type = "submit"
		document.getElementById("contact information").action = "validation2.html";
	}	
}

function getImage(bool, ID) {
    var image = document.getElementById("image" + ID);
    if (image == null) {
        image = new Image(15, 15);
        image.id = "image" + ID;
    }
    image.src = bool ? './correct.png' : './wrong.png';
    return image;
}

function firstNameCheck(name) {
 var x = document.forms["basic info"]["fname"].value;
  if (x == "") {
    return false;
	}
	else {
		if(!alphaNumCheck(x)){
			return false;
		}
	}
	return true;			
}

function lastNameCheck(name) {
 var x = document.forms["basic info"]["lname"].value;
	
	if (x == "") {
		return false;
	}
	else {
		if(!alphaNumCheck(x)){
			return false;
		}
	}
	return true;			
}

function genderCheck(name) {
 var x = document.forms["basic info"]["gender"].value;

	if (x == "") {
		return false;
	}
	return true;		
}

function stateCheck(name) {
 var x = document.forms["basic info"]["state"].value;

	if (x == "") {
		return false;
	}
	return true;			
}

function alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
        return true;
	}
    return false;
}

