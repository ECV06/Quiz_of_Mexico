const data = [
    {
        question: '¿Cuál fue el Tlatoani que lideró a los Aztecas durante “La noche triste”?',
        choices:[ 'Tenoch', 'Moctezuma', 'Cuitlahuac', 'Cuauhtemoc'],
        answer: 'Cuitlahuac'
    },

    {
        question: '¿Cuál fue el alimento más primordial para los pueblos mesoamericanos?',
        choices:['Maíz', 'Frijol', 'Chile', 'Calabaza'],
        answer: 'Maíz'
    },

    {
        question: '¿Quién fue “La Maliche”?',
        choices:[
        'Fue una muejer Náhuatl la cual era amente de muchos españoles, sirvio como espia para su puebo y asi obtener informacion', 
        'Fue una mujer Nahuas que se convirtió en amante, traductora e intérprete de Hernán Cortés', 
        'Fue una mujer Náhuatl que se convirtió en amante, traductora e intérprete de Hernán Cortés', 
        'Fue una mujer Maya que se convirtió en amante, traductora e intérprete de Hernán Cortés'
        ],
        answer: 'Fue una mujer Náhuatl que se convirtió en amante, traductora e intérprete de Hernán Cortés'
    },

    {
        question: '¿Cuál es el nombre de    la poeta más importante de la época Novohispánica?',
        choices:['Miguel de Guevara', 'Sor Juana Inés de la Cruz', 'Juan Ruiz de Alarcón', 'Catalina la Eslava'],
        answer: 'Sor Juana Inés de la Cruz'
    },

    {
        question: '¿Cuál es la tradición mexicana más reconocida a nivel mundial?',
        choices:['Navidad', 'Voladores de Papantla', 'Dia de muertros', 'Semana Santa'],
        answer: 'Dia de muertros'
    },
    
    {
        question: '¿Cuál es la montaña más alta de México?',
        choices:['Popocatépetl', 'Nevado de Toluca', 'Iztaccíhuatl', 'El pico de Orizaba'],
        answer: 'El pico de Orizaba'
    },

    {
        question: '¿En qué año fue la conquista de México?',
        choices:['1521', '1810', '1519', '1492'],
        answer: '1521'
    },

    {
        question: '¿Quién fue el primer presidente de México?',
        choices:['Vicente Guerrero Saldaña', 'Benito Juaréz', 'Valentín Gómez Farías', 'Guadalupe Victoria'],
        answer: 'Guadalupe Victoria'
    },

    {
        question: 'Los Olmecas son consierados como la "madre de las civilizaciones mesoamericanas"?',
        choices:['Verdadero', 'Falso'],
        answer: 'Verdadero'
    },

    {
        question: 'El nombre del primer virrey de Nueva España fue:',
        choices:['Don Antonio de Mendoza y Pacheco', 'Blasco Núñez de Vela', 'Antonio Ignacio de la Pedrosa', 'Luis de Velasco'],
        answer: 'Don Antonio de Mendoza y Pacheco'
    }

]

class Question{

    constructor(text, choices, answer, time){
        this.text = text,
        this.choices = choices,
        this.answer = answer,
        this.time = time
    }

    correctAnswer(choice) {
        return  choice === this.answer
    }
}

class UI {
    constructor() {}

    /**
     * 
     * @param {string} text pregunta renderizada
     */
    showQuestion(text) {
        const questionTitle = document.getElementById('pregunta')
        questionTitle.innerText = text;
    }

    /**
     * 
     * @param {string[]} choices opciones de la pregunta 
     */
    showChoices(choices, callback) {
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = ''
    
        
           for(let i = 0; i < choices.length; i++) {
                const button = document.createElement("button");
        
                button.innerText = choices[i];
                button.className = 'button';
                button.addEventListener('click', () => callback (choices[i]));

                choicesContainer.append(button);
           }
    }


    /**
     * 
     * @param {number} score el total del puntaje
     */
    showScores(score) {
        const quizEndHTML = `
        <h1>Resultados</h1>
        <h2>Tu puntaje es de: ${score}</h2>
        `;

        const element = document.getElementById("quiz");
        element.innerHTML = quizEndHTML;
    }

    /**
     * 
     * @param {number} currentIndex pregunta en la que se encuentra 
     * @param {number} total total de preguntas
     */
    showprogress(currentIndex, total) {
        const element = document.getElementById("progreso");
        element.innerHTML = `Pregunta ${currentIndex} de ${total}`;
    }

}

const questions =  data.map(question => new Question(question.question, question.choices, question.answer));


class Quiz {

    questionIndex = 0;
    score = 0;

    /**
     * 
     * @param {Question[]} questions 
     */
    constructor(questions){
        this.questions = questions; 
    }


    /**
     * 
     * @returns {Question} preguta encontrada
     */
    getQuestionIndex(){
        return this.questions[this.questionIndex]
    }

    isEnded() {
        return this.questions.length === this.questionIndex
    }

    /**
     * 
     * @param {string} answer some text
     */
    guess(answer) {
        console.log(answer)
        if(this.getQuestionIndex().correctAnswer(answer)) {
            this.score++
    
        }

        this.questionIndex++
    }


}


const renderPage = (quiz, ui) => {

    if(quiz.isEnded()){
      ui.showScores(quiz.score);
      
    } else {

        const quizScore =  `<h2>Score: ${quiz.score}</h2> `;

        const scoreHtml = document.getElementById("score");
        scoreHtml.innerHTML = quizScore;

       
      ui.showQuestion(quiz.getQuestionIndex().text);
      ui.showChoices(quiz.getQuestionIndex().choices, (currentChoices) => {
        quiz.guess(currentChoices);
        renderPage(quiz, ui); 
    }); 
      ui.showprogress(quiz.questionIndex + 1, quiz.questions.length);
    }
  };
  
  const time = 10;
  
  function timefalse(){

  }


  function main() {
      const quiz = new Quiz (questions);
      const ui = new UI()
  
      renderPage(quiz, ui);
  }
  main();