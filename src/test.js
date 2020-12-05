import React, { useEffect,useState } from 'react'; //리액트 불러오기
import console from 'react-console'; //리액트 콘솔_크롬으로 실행
import './test.css';//test.css 불러오기

const Test = ( { history } ) =>
 {
	const questions = [
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
	]; //웜,쿨 파악

	const [currentQuestion, setCurrentQuestion] = useState(0); //현재 문제 번호 [변수, 함수]
	const [showScore, setShowScore] = useState(false); //결과 보여줄까?
    const [score_c, setScore_cool] = useState(0); //쿨톤 점수 -> 웜,쿨 리스트에서 사용
	const [score_w, setScore_warm] = useState(0); //웜톤 점수 -> 웜,쿨 리스트에서 사용
	const [score, setPersonal] = useState(""); //퍼스널컬러 결과
	

	const handleAnswerOptionClick = (isCorrect) => {  //main 함수 1_웜쿨 검사
		if (isCorrect) {
			setScore_cool(score_c + 1);
			console.log('c' + score_c);
		}
		else{
			setScore_warm(score_w + 1);
			console.log('w' + score_w);
		} ///웜,쿨 if문으로 점수 올리기

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
		else{
			setShowScore(true); //questions 끝나면 점수 보여줄까? true -> className='score-section'
		}
       
 }; //함수1 끝.

 const handlePersonalScore = (score_c,score_w) =>{ //함수2_웜,쿨 점수로 결과 구하기
	if(score_c>score_w){
		setPersonal('cool');
	}
	else if(score_c<score_w){
		setPersonal('warm');
	}
	else{
		setPersonal('restart');
	}
}; //함수2 끝.

	return (
		<div className='app'>
			{showScore ? ( 
				<span className='score-section'>
					You scored {score} out of {questions.length}
					<button onClick={() => handlePersonalScore(score_c,score_w)}>result</button>
					{score === "cool" ? <button onClick={ () => {history.push("/test2")}}>next</button>
					: <button onClick={ () => {history.push("/test3")}}>next</button>}
				</span>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}


export default Test;