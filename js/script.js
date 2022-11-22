// Массив с вопросами
const questions = [
	{
		question: "Что необходимо компьютеру для нормальной работы?",
		answers: ["Различные прикладные программы", "Операционная система", "Дискета в дисководе"],
		correct: 2,
	},

	{
		question: "Программы, предназначенные для обслуживания конкретных периферийных устройств:",
		answers: ["Утилиты", "Драйверы", "Библиотеки", "Оболочки"],
		correct: 2,
	},

	{
		question: "Папка, которая выступает в качестве вершины файловой структуры и олицетворяет собой носитель, на котором сохраняются файлы носит название:",
		answers: ["Начальной", "Папки верхнего уровня", "Стартовой", "Корневой"],
		correct: 4,
	},

	{
		question: "Первая ЭВМ в нашей стране называлась:",
		answers: ["Стрела", "БЭСМ", "МЭСМ", "IBM PC"],
		correct: 3,
	},

	{
		question: "Основные принципы цифровых вычислительных машин были разработаны:",
		answers: ["Джоном фон Нейманом", "Блезом Паскалем", "Чарльзом Беббиджем"],
		correct: 1,
	},
]; 

// Находим элементы

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры

let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос



clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// Функция отчистки страницы
function clearPage(){
	headerContainer.innerHTML = "";
	listContainer.innerHTML = "";
}


function showQuestion(){

	// Рендер вопроса
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;


	// Рендер вариантов ответов
	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']) {

		const questionTemplate = 
			`<li>
				<label>
					<input value = "%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

			const answerHTML = questionTemplate
											.replace('%answer%', answerText)
											.replace('%number%', answerNumber)
		listContainer.innerHTML += answerHTML;
		answerNumber++;

	}	
}


// Находим выбранную радио-кнопку
function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkedRadio);


// Если при нажатии на кнопку ответ не выбран - перезапускаем функцию
	if (!checkAnswer) {
		submitBtn.blur();
		return
	}
	
	const userAnswer = parseInt(checkedRadio.value)


	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	console.log('score ', score);


	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;

	} else {
		clearPage();
		showResults();
	}

}


function showResults() {
	const resultsTemplate = 
	`<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`


	//Варианты финальных заголовков
	let title, message;
	
	if(score === questions.length) {
		title = 'Поздравляем!';
		message = 'Вы ответили верно на все вопросы!';
	} else if ((score * 100) / questionIndex >= 50) {
		title = 'Не плохой результат!';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постараться..';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	// Результат

	let result = `${score} из ${questions.length}`;

	// Финальный ответ, подставляем данные в шаблон

	const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result)
	
	headerContainer.innerHTML = finalMessage;

	// Меняем кнопку на - начать снова

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = function() {
		history.go()
	};
}

