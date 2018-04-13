// const storageCtrl =(function(){

// })();

const itemCtrl =(()=>{
    const item = function(id,question,answer){
        this.id=id;
        this.question=question;
        this.answer=answer;
    }
    const data ={
        categories:[
            {
                Football: [
                   {
                      id: 1,
                      question: "Who is the best footballer",
                      answer: "RONALDO"
                   },
                   {
                      id: 2,
                      question: "who is epl highest goal scorer",
                      answer: "SALAH"
                   },
                   {
                      id: 3,
                      question: "what is my name",
                      answer: "JOHN"
                   }
                ],
                Nigeria: [
                   {
                      id: 1,
                      question: "Who is the president of nigeria",
                      answer: "BUHARI"
                   },
                   {
                      id: 2,
                      question: "how many states are in nigeria",
                      answer: "36"
                   },
                   {
                      id: 3,
                      question: "what is the capital of nigeria",
                      answer: "ABUJA"
                   }
                ],
                Javascript: [
                   {
                      id: 1,
                      question: "Inside which HTML element do we put the JavaScript?",
                      answer: "<script>"
                   },
                   {
                      id: 2,
                      question: "The external JavaScript file must contain the <script> tag.",
                      answer: "TRUE"
                   },
                   {
                      id: 3,
                      question: "How do you write \"Hello World\" in an alert box?",
                      answer: "alert(\"Hello World\");"
                   }
                ]
             }
        ],
    }
    return{
        getCategories:()=> data.categories[0]
    }
})();


const uiCtrl =(()=>{
    var seconds_left = 30;
    const uiSelectors={
        timer:'#timer',
        body:'.card-body',
        input:'#input',
        question:'.question',
        nextBtn:'#next',
        submitBtn:'#submit',
        start:'#start',
        football:'.football',
        nigeria:'.nigeria',
        javascript:'.javascript',
        random:'.random',
        cardOne:'.one',
        cardTwo:'.two',
        correct:'.correct',
        resultsList:'.results-list'

    }
        let x = 0,
            score = 0,
            catAns,
            whatCat,
            icons;
        const results=[];
        const category = itemCtrl.getCategories();
        const sel = document.querySelector(uiSelectors.body);
        const question = document.querySelector(uiSelectors.question);
        var keys = Object.keys( category );         
        var name = keys[ Math.floor(Math.random()*keys.length) ];
        var item = category[ name ].sort(function(a,b){return 0.5 - Math.random()});
    return{ 
        populateCategories:() => results
        ,
        getSelectors:() => uiSelectors
        ,
        initDisplay:(disp) =>{ 
            sel.classList.contains('football')    ? (category.Football.sort(function(a,b){return 0.5 - Math.random()}),question.append                                                  (category.Football[x].question))
            :sel.classList.contains('javascript') ? (category.Javascript.sort(function(a,b){return 0.5 - Math.random()}),
                                                    question.append(category.Javascript[x].question))
            :sel.classList.contains('nigeria')    ? (category.Nigeria.sort(function(a,b){return 0.5 - Math.random()}),  question.append                                                 (category.Nigeria[x].question))
            :                                       question.append(item[x].question)      
        },
        start:() =>{
            alert("You have 30 seconds to take the quiz")
            document.querySelector(uiSelectors.body).style.display = 'block'
            const interval = setInterval(function() {
                const timer = document.querySelector(uiSelectors.timer);
                timer.innerHTML = --seconds_left;
            if (seconds_left <= 0 )
            {
                setTimeout(()=>{
                document.getElementById('reload').addEventListener('click', ()=> location.reload());
            },0000);
                timer.innerHTML =  `<button id="reload" class="btn btn-outline-secondary" type="button"><div>Times up</div><div>Reload</div</button>`
                clearInterval(interval);
                document.querySelector(uiSelectors.input).disabled=true;
                setTimeout(() => {
                    document.querySelector(uiSelectors.nextBtn).style.display = 'none';
                    document.querySelector(uiSelectors.body).innerHTML=`<h3 class="card-text">you got <span style= color:green>${score}</span> out of 3</h3>`
                    uiCtrl.dispResults(results)
                    document.querySelector(uiSelectors.resultsList).style.display = 'block';
                    seconds_left=0;
                   },2000) 
            }
        }, 1000);
        },
        firstState:() =>{
            document.querySelector(uiSelectors.cardOne).style.display ='none'
            document.querySelector(uiSelectors.cardTwo).style.display ='block'
        },
        run: () =>{
            x++; 
            question.innerHTML='';

                sel.classList.contains('football') ?    whatCat = x < category.Football.length
                :sel.classList.contains('javascript') ? whatCat = x < category.Javascript.length
                :sel.classList.contains('nigeria') ?    whatCat = x < category.Nigeria.length
                :                                       whatCat = x < category[ name ].length;

            if(whatCat){
                sel.classList.contains('football') ? question.append(category.Football[x].question)
                :sel.classList.contains('javascript') ? question.append(category.Javascript[x].question)
                :sel.classList.contains('nigeria') ? question.append(category.Nigeria[x].question)
                :                                    question.append(item[x].question);
            
            document.querySelector(uiSelectors.nextBtn).style.display = 'block';
            }else{
                setTimeout(() => {
                 document.querySelector(uiSelectors.nextBtn).style.display = 'none';
                 document.querySelector(uiSelectors.body).innerHTML=`<h3 class="card-text">you got <span style= color:green>${score}</span>out of 3</h3>
              `
              uiCtrl.dispResults(results)
              document.querySelector(uiSelectors.resultsList).style.display = 'block';
             
                 seconds_left=0;
                },1000) 
            }; 
        },
        submit:() =>{

                 sel.classList.contains('football') ?   catAns = category.Football[x].answer
                :sel.classList.contains('javascript') ? catAns = category.Javascript[x].answer
                :sel.classList.contains('nigeria') ?    catAns = category.Nigeria[x].answer
                :                                       catAns = item[x].answer
                
                function createPost(result){
                    results.push(result);
                }
                
            const input = document.querySelector(uiSelectors.input);
            const correct = document.querySelector(uiSelectors.correct);

            input.value.toUpperCase() === catAns ?  (correct.style.display = 'block',
                                                    correct.innerHTML= 'yippee',
                                                    correct.style.color = 'green',
                                                    icons = `<i class="fa fa-check"></i>`,
                                                    score++)
            :                                       (correct.style.display = 'block',
                                                    correct.style.color = 'red',
                                                    correct.innerHTML= 'wrooongg',
                                                    icons = `<i class="fa fa-times style="color:red"></i>`)         
                   
                setTimeout(()=> correct.style.display ='none', 1000);
                createPost({Question:question.innerHTML,Answer:catAns,mark:icons})
            uiCtrl.run(); 
            const img = document.createElement("IMG");
            img.setAttribute("src", "Ripple.gif");
            document.getElementById('img1').appendChild(img);
            input.value='';
        },
        dispResults:(results) =>{
            let output=''
            let r =''
            results.forEach((result)=>{
                r++;
              output+=`<tr class="results"><th scope="row">${r}</th><td><strong>${result.Question}</strong></td><td>${result.Answer}</td><td>${result.mark}</td></tr>`
              document.querySelector('tbody').innerHTML=output;  
          });
          }
    }
})();


const appCtrl =(function(itemCtrl,uiCtrl){
    const loadEvents = (e) =>{
        const UISelectors = uiCtrl.getSelectors();
        document.querySelector(UISelectors.football).addEventListener('click', football);
        document.querySelector(UISelectors.nigeria).addEventListener('click', nigeria);
        document.querySelector(UISelectors.javascript).addEventListener('click', javascript);
        document.querySelector(UISelectors.random).addEventListener('click', random);
        document.querySelector(UISelectors.start).addEventListener('click', start);
        document.querySelector(UISelectors.submitBtn).addEventListener('click', submit);        
    }   
    const football = (e) =>{
        const UISelectors = uiCtrl.getSelectors();
        const sel = document.querySelector(UISelectors.body)
        sel.className += " football"
        uiCtrl.firstState();
        e.preventDefault();
    }
    const nigeria = (e) =>{
        const UISelectors = uiCtrl.getSelectors();
        const sel = document.querySelector(UISelectors.body)
        sel.className += " nigeria"
        uiCtrl.firstState();
        e.preventDefault();
    }
    const javascript = (e) =>{
        const UISelectors = uiCtrl.getSelectors();
        const sel = document.querySelector(UISelectors.body)
        sel.className += " javascript"
        uiCtrl.firstState();
        e.preventDefault();
    }
    const random = (e) =>{
        const UISelectors = uiCtrl.getSelectors();
        const sel = document.querySelector(UISelectors.body)
        sel.className += " random"
        uiCtrl.firstState();
        e.preventDefault();
    }
    const start= (e) =>{
        uiCtrl.start();
        uiCtrl.initDisplay();
        e.preventDefault();
    }
    const submit= (e) => {
        uiCtrl.submit();
        e.preventDefault();
    }
    return{
        init:() =>{
            const categories = itemCtrl.getCategories();
            loadEvents();
        }
    }
})(itemCtrl,uiCtrl);
appCtrl.init();
