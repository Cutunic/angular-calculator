export function calculatorMachine(equation){
    let solution = [...equation];

    for (let i = 1;i<solution.length;i=i+2){
        if (solution[i]==='*'){
            i = handleOperator('*',i);
        } else if (solution[i]==='/'){
            i = handleOperator('/',i);
        }
    };

    for (let i = 1;i<solution.length;i=i+2){
        if (solution[i]==='+'){
            i = handleOperator('+',i);
        } else if (solution[i]==='-'){
            i = handleOperator('-',i);
        }
    };

    function handleOperator(operator, i) {
        console.log('operator : ',operator, ' index : ', i);
        let newNum = 0;
        switch (operator){
            case '+':
                newNum = Number(solution[i-1]) +  Number(solution[i+1]);
            break;
            case '-':
                newNum = Number(solution[i-1]) -  Number(solution[i+1]);
            break;
            case '*':
                newNum = Number(solution[i-1]) *  Number(solution[i+1]);
            break;
            case '/':
                newNum = Number(solution[i-1]) /  Number(solution[i+1]);
            break;
        }

        solution[i-1] = newNum;
        solution.splice(i,2);

        return i - 2;
    }

    return solution;
}
