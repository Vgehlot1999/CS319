var rs = require('readline-sync');

var fNum1 = rs.question('1st Number: ');
var fNum2 = rs.question('2nd Number: ');
var fNum3 = rs.question('3rd Number: ');
var fNum4 = rs.question('4th Number: ');

function factorial(num) {
	if (num > 0) {
		return (num * factorial(num - 1));
	}
	
	else if (num == 0) {
		return 1;
	}
	
	else {
		return -1;
	}
}

function allDigits(num) 
{
	var str = num.toString();
	var sum = 0;
	var i;
	for (i = 0; i < str.length; i++){
		sum += parseInt(str.charAt(i));
	}
	return sum;
}

function reverse(num) {
	num = num + "";
	num = num.split("").reverse().join("");
	return Number(num);
}

function isPalindrome(num) {
	num1 = reverse(num);
	if (num1 == num) {
		return true;
	}
	else {
		return false;
	}
}

console.log("Factorial of the 1st number is = " + factorial(fNum1));

console.log("The sum of all digits of the 2nd number is = " + allDigits(fNum2));

console.log("The reverse of the 3rd number is = " + reverse(fNum3));

console.log("Is the 4th number a palindrome (True/False)? = " + isPalindrome(fNum4));
	
	
