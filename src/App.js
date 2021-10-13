import React, { useState } from 'react';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';


const btnValues=[
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "X"], 
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];



const  App = () => {
  let [ calc, setCalc] = useState({
    sign:'',
    num: '0',
    res: '0',
  });
  const restClickHandler = (e) =>{
    e.preventDefault();

    setCalc({
      ...calc, 
      num: '0',
      res: '0',
      sign: '',
    });
  };
  const invertClickHandler = (e) =>{
    e.preventDefault();

    setCalc({
      ...calc,
      num : calc.num !== '0' ? String(Number(calc.num)* -1) : '0',
      res : calc.res !== '0' ? String(Number(calc.res)* -1) : '0',

    });
  };
  const percentClickHandler = (e) =>{
    e.preventDefault();
    let num = calc.num ? parseFloat(calc.num) : '0';
    let res = calc.res ? parseFloat(calc.res) : '0';

    setCalc({
      ...calc,
      num : String(num /= Math.pow(100, 1)),
      res: String(res /= Math.pow(100, 1)),
      sign: '',
    });

  };
  const equalsClickHandler = (e) =>{
    e.preventDefault();
    const calcul = (num1, num2, operation) =>
      operation ==='+'
        ? num1 + num2 
        : operation === '-'
        ? num1 - num2
        : operation === 'X'
        ? num1 * num2
        : num1 / num2 ;

    if (calc.sign && calc.num){
      setCalc({
        ...calc,
        res: 
          calc.num === '0' && calc.sign ==='/'
          ? 'impossible'
          : calcul(Number(calc.res), Number(calc.num), calc.sign),
          sign: '',
          num:'0',
      });
    }  
  };


  const signClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setCalc({
      ...calc,
      sign : value,
      res : calc.num !== '0'? calc.num : calc.res,
      num: '0',
    })
    
  };
  const commaClickHandler = (e) =>{
    e.preventDefault();
    const value = '.';
    setCalc({
      ...calc,
          num: !calc.num.includes('.') ? calc.num + value : calc.num,
    });
  };


  const numClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num.length < 16 ){
      setCalc({
        ...calc,
        num : 
              calc.num === '0' && value ==='0'
              ? '0'
              : calc.num ==='0'
              ? value
              : calc.num + value
      });
    }
    
  };

  return (
      <Wrapper>
        <Screen value= {calc.num !== '0'? calc.num : calc.res} />
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button 
                  key={i}
                  className={btn==="="? "equals"
                                      : btn === 'C' || btn ==='+/-' || btn ==='%' || btn ==='/' || btn ==='X' || btn === '-'  || btn ==='+'
                                      ? 'operator'
                                      :''   
                }
                  value={btn}
                  onClick = {
                    btn==='C'
                      ? restClickHandler
                      : btn ==='+/-'
                      ? invertClickHandler
                      : btn === '%'
                      ? percentClickHandler
                      : btn === '='
                      ? equalsClickHandler
                      : btn === '/' || btn === 'X' || btn === '-' || btn === '+'
                      ? signClickHandler
                      : btn ==='.'
                      ? commaClickHandler
                      : numClickHandler
                    }
                />
              );
            })
          }
          
        </ButtonBox>
      </Wrapper>
  );
};

export default App;
