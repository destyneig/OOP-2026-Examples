function testTruthy(val) {
  return val ? console.log('truthy') : console.log('falsy');
}

testTruthy(true);     // truthy
testTruthy(false);    // falsy
testTruthy(new Boolean(false)); // truthy (it's an object)
testTruthy('');       // falsy
testTruthy('Packt');  // truthy
testTruthy(1);        // truthy
testTruthy(-1);       // truthy
testTruthy(NaN);      // falsy
testTruthy(undefined);// falsy
testTruthy(null);     // falsy