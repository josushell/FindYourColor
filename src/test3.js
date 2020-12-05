import React, { useState } from 'react'; //리액트 불러오기
import console from 'react-console'; //리액트 콘솔_크롬으로 실행
import './test.css';//test.css 불러오기

const Test3 = ( { history } ) =>
 {
	const questions_warm = [
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
	]; //봄웜톤, 가을웜톤 파악


	const [currentQuestion_w, setCurrentQuestion] = useState(0); //현재 문제 번호 [변수, 함수]
	const [showScore_w, setShowScore] = useState(false); //결과 보여줄까?
	const [score_w_s, setScore_warm_spring] = useState(0);
	const [score_w_a, setScore_warm_autumn] = useState(0);
	const [score, setPersonal] = useState(""); //퍼스널컬러 결과
	

	const handleAnswerOptionClick = (isCorrect) => {  //main 함수 1_웜쿨 검사
		if (isCorrect) {
			setScore_warm_spring(score_w_s+1);
		}
		else{
			setScore_warm_autumn(score_w_a+1);
		} ///웜,쿨 if문으로 점수 올리기

		const nextQuestion = currentQuestion_w + 1;
		if (nextQuestion < questions_warm.length) {
			setCurrentQuestion(nextQuestion);
		}
		else{
			setShowScore(true); //questions 끝나면 점수 보여줄까? true -> className='score-section'
		}
       
 }; //함수1 끝.

const handlePersonalScore_warm = (score_w_s,score_w_a) =>{ //함수3_여쿨, 겨쿨 점수로 결과 구하기
	if(score_w_s>score_w_a){
		setPersonal('spring warm');
	}
	else if(score_w_s<score_w_a){
		setPersonal('autumn warm');
	}
	else{
		setPersonal('restart');
	}
}; //함수3 끝.

	return (
		<div className='app'>
			{showScore_w ? ( 
				<span className='score-section'>
					You scored {score} out of {questions_warm.length}
					<button onClick={() => handlePersonalScore_warm(score_w_s,score_w_a)}>result</button>
					{score === "spring warm" ? <ImageBackground source={require("./season/spring.jpg")} style={{width:"100%",height:"100%"}}>
					</ImageBackground>
					: <button onClick={ () => {history.push("/test3")}}>next</button>}
				</span>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion_w + 1}</span>/{questions_warm.length}
						</div>
						<div className='question-text'>{questions_warm[currentQuestion_w].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions_warm[currentQuestion_w].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}


export default Test3;