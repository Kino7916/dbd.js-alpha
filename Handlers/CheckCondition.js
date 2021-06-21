function checkCondition(str) {
  const operators = () => {
    for (const op of ["<=", ">=", "==", "!=", "<", ">"]) {
      if (str.includes(op)) return op;
    }
  };

  // Getting Operator
  const op = operators();

  // Define Conditions
  const c = str.split(op),
  c1 = c[0],
  c2 = c[1],
  c1N = new Number(c1),
  c2N = new Number(c2);

  // Handle Conditions with Operator
    // Condition must be the exact same
    if (op === "==" && c1 === c2) return true
    // Condition must not be same
    else if (op === "!=" && c1 !== c2) return true 
    // Condition is bigger than target
    else if (op === ">") {
      // Handle this operator in a new scope
        // if conditions are number
        if (!isNaN(c1N) && !isNaN(c2N) && c1N > c2N) return true
        // else count length of condition string 
        else if (c1.length > c2.length) return true
        // if those are incorrect / below, return false
        else return false
    }
    // Condition is smaller than target 
    else if (op === "<") {
      // Handle this operator in a new scope
        // if conditions are number
        if (!isNaN(c1N) && !isNaN(c2N) && c1N < c2N) return true
        // else count length of condition string 
        else if (c1.length < c2.length) return true
        // if those are incorrect / below, return false
        else return false
    }
    // Condition is bigger or same as target
    else if (op === ">=") {
       // Handle this operator in a new scope
        // if conditions are number
        if (!isNaN(c1N) && !isNaN(c2N) && c1N >= c2N) return true
        // else count length of condition string 
        else if (c1.length >= c2.length) return true
        // if those are incorrect / below, return false
        else return false
    }

    // Condition is smaller or same as target
    else if (op === "<=") {
       // Handle this operator in a new scope
        // if conditions are number
        if (!isNaN(c1N) && !isNaN(c2N) && c1N <= c2N) return true
        // else count length of condition string 
        else if (c1.length <= c2.length) return true
        // if those are incorrect / below, return false
        else return false
    }
    // If no operator were present but the whole condition are boolean
    else if (!op && str.toLowerCase() === "true") return true; 
    // If all of them are incorrect
    return false;

}

module.exports = checkCondition