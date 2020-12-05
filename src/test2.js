import React, { useState } from 'react'; //리액트 불러오기
import console from 'react-console'; //리액트 콘솔_크롬으로 실행
import './test.css';//test.css 불러오기

const Test2 = ( { history } ) =>
 {
	const questions_cool = [
		{
			questionText: '머리카락 색이 검정에 가깝다',
			answerOptions: [
				{ answerText: '예', isCorrect: true },
				{ answerText: '아니오', isCorrect: false }
			],
		},
		{
			questionText: '피부에 붉은 기가 많다',
			answerOptions: [
				{ answerText: '예', isCorrect: true },
				{ answerText: '아니오', isCorrect: false }
			],
		},
		{
			questionText: '손목 혈관 색이 초록색이다',
			answerOptions: [
				{ answerText: '예', isCorrect: false },
				{ answerText: '아니오', isCorrect: true }
			],
		},
		{
			questionText: '햇볕에 장시간 있으면 피부가 붉어진다',
			answerOptions: [
				{ answerText: '예', isCorrect: true },
				{ answerText: '아니오', isCorrect: false }
			],
		},
	]; //여름쿨톤, 겨울쿨톤 파악

	const [currentQuestion_c, setCurrentQuestion] = useState(0); //현재 문제 번호 [변수, 함수]
	const [showScore_c, setShowScore] = useState(false); //결과 보여줄까?
	const [score_c_s, setScore_cool_summer] = useState(0);
	const [score_c_w, setScore_cool_winter] = useState(0);
	const [score, setPersonal] = useState(""); //퍼스널컬러 결과
	

	const handleAnswerOptionClick = (isCorrect) => {  
		if (isCorrect) {
			setScore_cool_summer(score_c_s + 1);
		}
		else{
			setScore_cool_winter(score_c_w + 1);
		} 

		const nextQuestion = currentQuestion_c + 1;
		if (nextQuestion < questions_cool.length) {
			setCurrentQuestion(nextQuestion);
		}
		else{
			setShowScore(true); //questions 끝나면 점수 보여줄까? true -> className='score-section'
		}
       
 }; //함수1 끝.

const handlePersonalScore_cool = (score_c_s,score_c_w) =>{ //함수3_여쿨, 겨쿨 점수로 결과 구하기
	if(score_c_s>score_c_w){
		setPersonal('summer cool');
	}
	else if(score_c_s<score_c_w){
		setPersonal('winter cool');
	}
	else{
		setPersonal('restart');
	}
}; //함수3 끝.

	return (
		<div className='app'>
			{showScore_c ? ( 
				<span className='score-section'>
					You scored {score} out of {questions_cool.length}
					<button onClick={() => handlePersonalScore_cool(score_c_s,score_c_w)}>result</button>
					{score === "cool" ? <button onClick={ () => {history.push("/test2")}}>next</button>
					: <button onClick={ () => {history.push("/test3")}}>next</button>}
				</span>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion_c + 1}</span>/{questions_cool.length}
						</div>
						<div className='question-text'>{questions_cool[currentQuestion_c].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions_cool[currentQuestion_c].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}


export default Test2;