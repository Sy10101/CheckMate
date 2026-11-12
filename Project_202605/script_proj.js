"use strict;"

// reaction when adjusting the window
window.addEventListener('resize', pageResize);
window.addEventListener('load', pageResize);

function pageResize(){
    const container=document.querySelector('.game_container');
    const port=document.querySelector('.viewport');
    const designWidth=1200;
    const designHeight=600;
    const viewportWidth=port.clientWidth;
    const viewportHeight=port.clientHeight;

    const scaleX=viewportWidth/designWidth;
    const scaleY=viewportHeight/designHeight;
    const actualScale=Math.min(scaleX, scaleY);

    container.style.transform=`scale(${actualScale})`;
    if (actualScale<0.5){
        container.style.transform=`scale(0.5)`;
    }
    if (gameStarted && !gamePage.classList.contains('hidden')){
        updatePosition();
    }
}

// switch from the welcome page to the selection page
const welcomePage=document.querySelector('#welcome');
const choosePage=document.querySelector('#choose');
const startButtun=document.querySelector('#welcome_start');

startButtun.addEventListener('click', switchPage);

function switchPage(){
    welcomePage.classList.add('hidden');
    choosePage.classList.remove('hidden');
    if (!musicPlaying) {
        bgm.play();
        musicPlaying=true;
        musicToggle.textContent='🔊';
    }
}

// choose different characters
const personList=[{name: "MOMO", icon: "images/infj.webp", intro: "Every person is unique. Be anyone you want! (Just in case if you don't know your MBTI yet, you can use MOMO)"}, 
    {name: "ENTP", icon: "images/entp.webp", intro: "Smart and curious thinkers who cannot resist an intellectual challenge."},
    {name: "INTJ", icon: "images/intj.webp", intro: "Imaginative and strategic thinkers, with a plan for everything."}, 
    {name: "ENTJ", icon: "images/entj.webp", intro: "Bold, imaginative and strong-willed leaders, always finding a way — or making one."}, 
    {name: "INTP", icon: "images/intp.webp", intro: "Innovative inventors with an unquenchable thirst for knowledge."}, 
    {name: "INFJ", icon: "images/infj.webp", intro: "Quiet and mystical, yet very inspiring and tireless idealists."}, 
    {name: "ENFJ", icon: "images/enfj.webp", intro: "Charismatic and inspiring leaders, able to mesmerize their listeners."}, 
    {name: "INFP", icon: "images/infp.webp", intro: "Poetic, kind and altruistic people, always eager to help a good cause."}, 
    {name: "ENFP", icon: "images/enfp.webp", intro: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile."}, 
    {name: "ESTP", icon: "images/estp.webp", intro: "Smart, energetic and very perceptive people, who truly enjoy living on the edge."}, 
    {name: "ISTP", icon: "images/istp.webp", intro: "Bold and practical experimenters, masters of all kinds of tools."}, 
    {name: "ESFP", icon: "images/esfp.webp", intro: "Spontaneous, energetic and enthusiastic people — life is never boring around them."}, 
    {name: "ISFP", icon: "images/isfp.webp", intro: "Flexible and charming artists, always ready to explore and experience something new."}, 
    {name: "ESFJ", icon: "images/esfj.webp", intro: "Extraordinarily caring, social and popular people, always eager to help."}, 
    {name: "ISFJ", icon: "images/isfj.webp", intro: "Very dedicated and warm protectors, always ready to defend their loved ones."}, 
    {name: "ESTJ", icon: "images/estj.webp", intro: "Excellent administrators, unsurpassed at managing things — or people."}, 
    {name: "ISTJ", icon: "images/istj.webp", intro: "Practical and fact-minded individuals, whose reliability cannot be doubted."}]

const imgElement=document.querySelector('#choose_img');
const nameElement=document.querySelector('#selected_name');
const introElement=document.querySelector('#selected_intro');
const leftBtn=document.querySelector('.choose_left');
const rightBtn=document.querySelector('.choose_right');

let chooseIndex=0;

leftBtn.addEventListener('click', switchLeft);
rightBtn.addEventListener('click', switchRight);

function updateChoose(){
    const thisChar=personList[chooseIndex];
    imgElement.src=thisChar.icon;
    imgElement.alt=thisChar.name+' icon';
    nameElement.textContent=thisChar.name;
    introElement.textContent=thisChar.intro;
}

function switchLeft(){
    if (chooseIndex>0){
        chooseIndex-=1;
    }
    else{
        chooseIndex=personList.length-1;
    }
    updateChoose();
}

function switchRight(){
    if (chooseIndex<personList.length-1){
        chooseIndex+=1;
    }
    else{
        chooseIndex=0;
    }
    updateChoose();
}

updateChoose();

// enter the game
const gamePage=document.querySelector('#game')
const confirmBtn=document.querySelector('#choose_confirm');
const chessboard=document.querySelector('.chessboard');
const startPerson=document.querySelector('.start_person');
const inboardPerson=document.querySelector('#inboard_person');
const startPersonImg=document.querySelector('#start_pers_img');
const inboardPersonImg=document.querySelector('#inboard_pers_img');
const searchBtn=document.querySelector('#search_btn');
const searchInputBox=document.querySelector('#search_input');

confirmBtn.addEventListener('click', enterGame);
searchBtn.addEventListener('click', searchAndSelect);
searchInputBox.addEventListener('keypress', searchEnter);

function enterGame(){
    choosePage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    selectedChar=personList[chooseIndex];
    startPersonImg.src=selectedChar.icon;
    inboardPersonImg.src=selectedChar.icon;
    gameStarted=false;
    isInBoard=false;
    currentRow=7;
    currentCol=0;
    inboardPerson.classList.add('hidden');
    inboardPerson.style.position='absolute';
}

function drawChessboard(){
    chessboard.innerHTML='';
    for (let chessR=0; chessR<8; chessR++){
        for (let chessC=0; chessC<8; chessC++){
            const chessCell=document.createElement('div');
            chessCell.classList.add('cell');
            chessCell.setAttribute('data-row', chessR);
            chessCell.setAttribute('data-col', chessC);
            chessboard.appendChild(chessCell);
        }
    }
}

drawChessboard();

function searchAndSelect(){
    const searchInput=document.querySelector('#search_input').value;
    if (searchInput===''){
        alert('Please type your MBTI');
        return;
    }
    const searchUpper=searchInput.toUpperCase();
    let foundIndex=-1;
    for (let i=0; i<personList.length; i++){
        if (personList[i].name===searchUpper){
            foundIndex=i;
            break;
        }
    }
    if (foundIndex===-1){
        alert('MBTI not found :(');
        return;
    }
    chooseIndex=foundIndex;
    updateChoose();
    enterGame();
}

function searchEnter(event){
    if (event.key==='Enter'){
        event.preventDefault();
        searchAndSelect();
    }
}

// menu list
const homeBtn=document.querySelector('#home_btn');
const homeMenu=document.querySelector('#home_menu');
const menuExit=document.querySelector('#menu_exit');
const menuRechoose=document.querySelector('#menu_rechoose');
const menuContinue=document.querySelector('#menu_continue');

homeBtn.addEventListener('click', showMenu);
menuExit.addEventListener('click', turnToOne);
menuRechoose.addEventListener('click', newChoice);
menuContinue.addEventListener('click', continueGame);

function showMenu(){
    homeMenu.classList.toggle('hidden');
}

function turnToOne(){
    welcomePage.classList.remove('hidden');
    choosePage.classList.add('hidden');
    gamePage.classList.add('hidden');
    homeMenu.classList.add('hidden');
    gameStarted=false;
    isInBoard=false;
    diceEnabled=false;
    currentDirection=null;
    currentSteps=0;
    isMoving=false;
    currentRow=7;
    currentCol=0;
    chooseIndex=0;
    totalSteps=0;
    updateChoose();
    if (modal) {
        modal.classList.add('hidden');
    }
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor='';
        cell.style.opacity='';
    });
    startPerson.classList.remove('hidden');
    inboardPerson.classList.add('hidden');
    inboardPerson.style.position='';
    inboardPerson.style.left='';
    inboardPerson.style.top='';
    if (rollBtn) {
        rollBtn.disabled=true;
        rollBtn.style.opacity='0.5';
    }
    if (diceResult) {
        diceResult.textContent='Result: ?';
    }
    if (musicPlaying) {
        bgm.pause();
        musicPlaying=false;
        musicToggle.textContent='🔇';
    }
}

function newChoice(){
    choosePage.classList.remove('hidden');
    gamePage.classList.add('hidden');
    homeMenu.classList.add('hidden');
    gameStarted=false;
    isInBoard=false;
    diceEnabled=false;
    currentDirection=null;
    currentSteps=0;
    isMoving=false;
    currentRow=7;
    currentCol=0;
    chooseIndex=0;
    totalSteps=0;
    updateChoose();
    if (modal) {
        modal.classList.add('hidden');
    }
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor='';
        cell.style.opacity='';
    });
    startPerson.classList.remove('hidden');
    inboardPerson.classList.add('hidden');
    inboardPerson.style.position='';
    inboardPerson.style.left='';
    inboardPerson.style.top='';
    if (rollBtn) {
        rollBtn.disabled=true;
        rollBtn.style.opacity='0.5';
    }
    if (diceResult) {
        diceResult.textContent='Result: ?';
    }
}

function continueGame(){
    homeMenu.classList.add('hidden');
}

// Core elements of the game
let currentRow=7;
let currentCol=0;
let isInBoard=false;
let gameStarted=false;
let diceEnabled=false;
let currentDirection=null;
let currentSteps=0;
let isMoving=false;
let isRolling=false;
let rollInterval=null;
let selectedChar=null;
let totalSteps=0;

const gameBtn=document.querySelector('#startGameBtn');
const questionMap={
    '#00': {text: 'When you are feeling down, who would you want around?', options: ['A. Quietly takes care of you, does not pry.', 'B. Listens to your feelings or helps you see things differently.', 'C. Accompanies you out, distracts you.'], dirMap: ['u', 'r', 'd']}, 
    '#01': {text: 'On a long trip, who would you rather travel with?', options: ['A. Plans everything ahead, follows the schedule.', 'B. Changes plans on a whim, chases new experiences.', 'C. Chats with strangers along the way, makes friends.', 'D. Checks if you are tired or hungry.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#02': {text: 'Picking a movie to watch together, who would you rather listen to?', options: ['A. Likes sci-fi brain teasers, tight logic.', 'B. Likes deep artistic films that touch the heart.', 'C. Likes lively comedies, gets everyone to watch.', 'D. Likes old classics, familiar movies they have seen many times.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#03': {text: 'When ordering takeout together, who would you rather listen to?', options: ['A. Simple and direct, picks something they have had, no hesitation.', 'B. Wants to try weird combos they have never had.', 'C. Calls friends for recs, wants to bundle orders for more dishes.', 'D. Chooses flavors they have loved since childhood.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#04': {text: 'When you want to share what is on your mind, who would you rather talk to?', options: ['A. Listens to your feelings, does not judge right or wrong.', 'B. Helps you see future possibilities, steps out of current emotions.', 'C. Makes you laugh with jokes or weird ideas.', 'D. Analyzes if it makes sense, then gives practical advice.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#05': {text: 'When picking out a book together, who would you rather listen to?', options: ['A. Recommends deep books that make you think.', 'B. Likes structure, but also beauty and freedom.', 'C. Recommends fun, lively books that everyone has read.', 'D. Picks books they personally relate to, or have read before.'], dirMap: ['u', 'r', 'd', 'l']},
    '#06': {text: 'When cleaning up a room together, who would you rather do it with?', options: ['A. Has a system, throws things away quickly, does not keep useless stuff.', 'B. Organizes by mood, keeps unique items, does not follow rules for placement.', 'C.Talks while tidying up, stops when tired, does not push hard.', 'D.Cannot bear to throw things away, arranges by habit, cares about your feelings.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#07': {text: 'In the morning, who would you rather have breakfast with?', options: ['A. Takes it slow, no words but not awkward.', 'B. Talks while eating, shares weird ideas from last night.', 'C. Smiles, asks if you slept well, pours you a drink.', 'D. Quiet, gets you, does not need to explain themselves.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#10': {text: 'You are in the hospital for three days. They only text "get well soon." What would you think?', options: ['A. A bit disappointed, they did not ask if I needed anything.', 'B. Maybe they are too busy, it is fine.', 'C. That is already good enough.'], dirMap: ['u', 'r', 'd']}, 
    '#11': {text: 'When grocery shopping together, who would you rather walk with?', options: ['A. Has a shopping list, does not waste time.', 'B. Tries free samples as they go, drags you to see new products.', 'C. Shops on their own, does not ask for your opinion.', 'D. Shops slowly, remembers what you like to eat.'], dirMap: ['u', 'r', 'd', 'l']},  
    '#12': {text: 'Before bed at night, who would you rather have a few words with?', options: ['A. Talks about interesting things they learned today or problems they figured out.', 'B. Talks about people they met today, funny things that happened, cannot stop.', 'C. Says "good night" and goes quiet.', 'D. Asks if you are tired today, tells you to sleep early.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#13': {text: 'If you had to pick a roommate, who would you lean toward?', options: ['A. Not social, but good with hands.', 'B. Likes making friends, often brings people over.', 'C. Outgoing and lively, does not mind noise.', 'D. Lives by routine, does not like being disturbed and will not disturb you.'], dirMap: ['u', 'r', 'd', 'l']},   
    '#14': {text: 'When teaming up for a game, who would you rather play with?', options: ['A. Plays seriously, but does not blame you if you lose.', 'B. Jokes around while playing, happy even when losing.', 'C. Talks a lot and likes leading, keeps the energy high.', 'D. Plays by the rules honestly, does not like talking much.'], dirMap: ['u', 'r', 'd', 'l']},  
    '#15': {text: 'You shared a weird idea that matters to you but others find strange. Who makes you feel understood?', options: ['A. Listens carefully, then asks one or two sharp questions.', 'B. Eyes light up, says "interesting, tell me more."', 'C. Nods and says "I have thought something similar before."', 'D. Does not say much, but you can tell from their face they are on your side.'], dirMap: ['u', 'r', 'd', 'l']},
    '#16': {text: 'You expressed a feeling you can not even name. Who listens patiently?', options: ['A. Breaks it into clear questions, talks through each.', 'B. Says "I feel like that too sometimes," then shares their own story to ease you.', 'C. Listens, then says "so what do you want to do now," no beating around.', 'D. Does not say much, but their face already calms you down.'], dirMap: ['u', 'r', 'd', 'l']},  
    '#17': {text: 'You win something they really wanted. How do they react?', options: ['A. Congratulates you, but clearly not happy.', 'B. Smiles and says "I will win next time."', 'C. Says "it is fine" right away, then changes the subject.', 'D. Does not say much, but acts a bit cold after.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#20': {text: 'You share an abstract idea. How do you want them to respond?', options: ['A. Says "interesting," then asks what you plan to do with it.', 'B. Builds on what you said, finishes the logic you left unsaid.', 'C. Says "wow, you think so deep," then changes the subject.'], dirMap: ['u', 'r', 'd']}, 
    '#21': {text: 'You get shot down in front of everyone. Who helps you out?', options: ['A. Says "what he said makes sense too," plays it safe.', 'B. Makes a joke to change the subject, gets people laughing."', 'C. Says straight up "let him finish."', 'D. Finds you privately after, says "do not take it to heart."'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#22': {text: 'You say "I am fine" but clearly you are not. What do you want your friend do?', options: ['A. Does not ask, but puts a glass of water next to you.', 'B. Sits with you, waits for you to talk.', 'C. Asks "really?" then watches your face.', 'D. Says "okay, call me if you get hungry."'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#23': {text: 'You say "I feel so useless." What do you want them to say back?', options: ['A. "You are not useless, you are just tired."', 'B. "I think you are the best."', 'C. "Come on, let us go eat something good."', 'D. "Did you not do a great job last time?"'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#24': {text: 'You post a mood visible only to them. What do they do?', options: ['A. Message you "what is wrong?"', 'B. Reply with a warm voice message or call you.', 'C. Pretend not to see, never bring it up.', 'D. Send you a song or article that fits.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#25': {text: 'You send a 60-second voice message. How do you want your friend to reply?', options: ['A. Listens to it, then replies to each point carefully.', 'B. Sends you an even longer voice message back.', 'C. Says "can not listen right now, type it."', 'D. Listens to the first 10 seconds, then guesses the rest.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#26': {text: 'He/She is 40 minutes late. What is the first thing you hope he/she says to you?', options: ['A. "Sorry, my fault."', 'B. "Traffic was a nightmare. Have you been waiting long?"', 'C. "Ah, I went out the wrong subway exit."', 'D. Hugs you first, then explains why.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#27': {text: 'You made an important decision, but it did not turn out well. What do you want them to say?', options: ['A. "It is fine, you will get it next time."', 'B. "It is okay. No matter what happens, I will face it with you."', 'C. "How much did you lose this time? Calculate it clearly and do not do it again."', 'D. "I think you were not careful enough."'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#30': {text: 'You are stuck on a complex problem you have thought about for a while. Who do you trust more to help?', options: ['A. Breaks the problem into small steps and works through them with you.', 'B. Listens, then says "the real core is actually something else," and it clicks.', 'C. Says "do not overthink it, go do something else to relax."'], dirMap: ['u', 'r', 'd']}, 
    '#31': {text: 'A friend complains about the same thing many times but never changes. What would you do?', options: ['A. Keep listening, say nothing.', 'B. Say straight up "then stop complaining."', 'C. Ask them "do you want to change?"', 'D. Gradually stop talking about it with them.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#32': {text: 'You teach them a method, but they do it their own way. What would you think?', options: ['A. As long as the result is fine.', 'B. A bit uncomfortable, but say nothing.', 'C. Think they have their own ideas, which is fine.', 'D. Explain again why your method is better.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#33': {text: 'You post something, and two hours later no one likes it. What would you think?', options: ['A. Do not care, was not for others anyway.', 'B. A bit disappointed, but forget it quickly.', 'C. Delete it, do not want to keep it up.', 'D. Scroll through what others posted, see if they get interactions.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#34': {text: 'You are in a room full of strangers. What would you do?', options: ['A. Find a corner to sit quietly.', 'B. Approach someone to chat, anything is fine.', 'C. Feel bored staying still, go talk to whoever is nearby.', 'D. Observe who looks approachable, then go over.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#35': {text: 'Which kind of leader do you prefer?', options: ['A. Talks little, but can tell when you are not okay.', 'B. Takes good care of everyone, remembers your preferences.', 'C. Strong doer, acts on ideas without overthinking.', 'D. Does not interfere, lets you manage yourself.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#36': {text: 'They are in a bad mood, but you do not know why. What would you do?', options: ['A. Ask directly “what is wrong?”', 'B. Do something they usually like, like buying them a drink.', 'C. Pretend not to notice, wait for them to tell you.', 'D. Stay with them, but do not ask why.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#37': {text: 'Which way of saying “I miss you” do you prefer?', options: ['A. Suddenly text “just saw something and thought of you.”', 'B. Say “I miss you” directly.', 'C. Ask to meet up, but do not say why.', 'D. Send you a song or a photo.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#40': {text: 'Which kind of "life restart" do you prefer?', options: ['A. Keep your memories, but go somewhere no one knows you.', 'B. Restart with everyone you know now, all together.', 'C. Become a completely different person, do things you have never done.'], dirMap: ['u', 'r', 'd']}, 
    '#41': {text: 'You have a whole year free, but must do one thing. Which do you pick?', options: ['A. Live alone in the mountains, grow vegetables, read, write.', 'B. Travel the world, make new friends in every place.', 'C. Learn a very hard skill, practice late every day.', 'D. Volunteer, help others but do not socialize too much.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#42': {text: 'You are in the elevator. A neighbor suddenly says something to you. What would you do?', options: ['A. Nod, say nothing.', 'B. Keep the conversation going, stand at the door even after the elevator arrives.', 'C. Say "oh yeah," then look away.', 'D. Say one line and leave, do not continue.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#43': {text: 'You have a time machine but can only go to one place. Where do you go?', options: ['A. An era with no people, like the empty land after dinosaurs went extinct.', 'B. The most lively party in history.', 'C. A peaceful utopia where everyone lives in harmony.', 'D. Go back to yesterday, finish what you did not get to say.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#44': {text: 'You turn into a book. What kind of book do you hope to be?', options: ['A. A diary no one has ever opened, hidden in the back of a drawer.', 'B. A bestseller novel that gets borrowed again and again.', 'C. An adventure manual, teaching you how to do crazy things.', 'D. A poetry book that only one person has read many times.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#45': {text: 'Which superpower would you rather have?', options: ['A. See what will happen in the future.', 'B. Make everyone like you and trust you.', 'C. Become physically stronger, never get hurt.', 'D. Turn invisible, no one can see you.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#46': {text: 'You are racing against a deadline, and they are still taking their time. What would you do?', options: ['A. Urge them, but do not say anything harsh.', 'B. Jump in and help them finish part of it.', 'C. Say “hurry up, we are running out of time.”', 'D. Finish your own part first, ignore them.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#47': {text: 'Which way of talking do you prefer?', options: ['A. Say a few words then pause, leave space to think.', 'B. Straight and clear, no beating around the bush.', 'C. Talk and laugh, light and fun.', 'D. Say as little as possible, save the trouble.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#50': {text: 'You are speaking on stage. The crowd barely reacts. What would you think?', options: ['A. It is fine, just finish talking.', 'B. A bit awkward, try to liven things up.', 'C. Do not care, I do not care about them anyway.'], dirMap: ['u', 'r', 'd']}, 
    '#51': {text: 'You can only take one thing from an old house. Which do you choose?', options: ['A. An old book full of handwritten notes.', 'B. A group photo where everyone is smiling.', 'C. A beautiful instrument that was never played.', 'D. A wooden chair used every day.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#52': {text: 'Which kind of room do you prefer?', options: ['A. Everything has its place, you could find it with your eyes closed.', 'B. Walls covered in photos and notes, messy but full of memories.', 'C. Almost empty, only the essentials.', 'D. Can change the layout anytime, does not like being too fixed.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#53': {text: 'Who would you rather move houses with?', options: ['A. Follows your checklist, no small talk.', 'B. Takes charge of everything, you just follow and carry.', 'C. Works a bit, plays a bit, orders food when tired.', 'D. Each moves their own stuff, no need to coordinate.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#54': {text: 'There is a small misunderstanding between you and your friend. What would you rather do?', options: ['A. Process it yourself, it will be fine in a few days.', 'B. Talk to them directly and clear it up, no delay.', 'C. Act like it did not happen, let something else take over.', 'D. Send them a message, do not talk face to face.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#55': {text: 'Which seat do you prefer?', options: ['A. Corner, back facing most people.', 'B. Right in the middle, can see everyone.', 'C. By the window, easy to look outside anytime.', 'D. Near the door, come and go without saying hi.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#56': {text: 'Which kind of weather do you prefer?', options: ['A. Cloudy, no need for sunscreen or umbrella.', 'B. Sunny, do not mind the heat.', 'C. Heavy rain, stay inside and listen.', 'D. Windy, feels refreshing.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#57': {text: 'You just finished something very difficult. How would you rather celebrate?', options: ['A. Be alone, let the sense of achievement sink in.', 'B. Gather the team, go eat somewhere nice.', 'C. Do something thrilling, like bungee jumping.', 'D. Go home and lie down, do nothing at all.'], dirMap: ['u', 'r', 'd', 'l']},     
    '#60': {text: 'How would you rather start a relationship (friend or partner)?', options: ['A. Take it slow, start with occasional chats.', 'B. Talk every day, get close fast.', 'C. Do something exciting together, like a trip.'], dirMap: ['u', 'r', 'd']}, 
    '#61': {text: 'How would you rather learn a new skill?', options: ['A. Follow tutorials on your own, try slowly.', 'B. Have someone guide you, learn while having fun.', 'C. Sign up for a class, learn with a group.', 'D. Understand the theory first, then practice.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#62': {text: 'You feel terrible but cannot explain why. What would you rather do?', options: ['A. Stay alone with it, wait for it to pass.', 'B. Find someone to go wild with, forget about it.', 'C. Be around many people, no need to talk.', 'D. Write it down, but show no one.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#63': {text: 'You need to pick a gift for someone you do not know well. What would you rather do?', options: ['A. Pick something practical, the safe choice.', 'B. Pick something fun, even if they do not like it.', 'C. Ask a mutual friend, get their opinion.', 'D. Pick something you would like yourself.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#64': {text: 'How would you rather be remembered?', options: ['A. Someone reliable who does not bother others.', 'B. Someone fun, great to be around.', 'C. Someone who knows everyone and gets along with all.', 'D. Someone who does not need to be remembered.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#65': {text: 'You are halfway through a book and cannot keep going. What would you rather do with it?', options: ['A. Force yourself to finish it.', 'B. Put it away, stop reading.', 'C. Skip to the end, just want to know how it ends.', 'D. Set it aside, might want to read it later.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#66': {text: 'You are waiting for a bus, a stranger starts talking to you. What would you rather do?', options: ['A. Reply briefly, then look at your phone.', 'B. Chat with them, might be interesting.', 'C. Quickly find an excuse to leave.', 'D. Listen politely, do not initiate.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#67': {text: 'You did something you yourself do not feel good about. What kind of person do you want around?', options: ['A. Does not blame you, but that disappointment makes you want to change.', 'B. Says “so what,” takes you to eat. Like nothing happened.', 'C. Asks a few questions, helps you untangle it. No judgment.', 'D. Says nothing, but is more patient with you for the next few days.'], dirMap: ['u', 'r', 'd', 'l']}, 
    '#70': {text: 'At a party, who would you rather sit next to for a long time?', options: ['A. Quiet, says little, just observes.', 'B. Talkative, keeps the energy up.'], dirMap: ['u', 'r']}, 
    '#71': {text: 'Which one are you more like?', options: ['A. A quiet lighthouse, watching the sea alone.', 'B. A festival, music and lights everywhere.', 'C. A library, quiet but full of stories.'], dirMap: ['u', 'r', 'l']}, 
    '#72': {text: 'What do you want the other person to be?', options: ['A. A tree. Grows quietly, gives shade, asks for nothing.', 'B. A bonfire. Warm, loud, and everyone gathers around it.', 'C. A thick wall. Blocks everything out, but also blocks you in.'], dirMap: ['u', 'r', 'l']}, 
    '#73': {text: 'Which sea are you like?', options: ['A. Quiet but deep, cannot tell from the surface.', 'B. Big waves, the sound drowns out everything.', 'C. A fenced-off swimming area with railings and opening hours.'], dirMap: ['u', 'r', 'l']}, 
    '#74': {text: 'You made a small mistake but are already fixing it. What do you want him/her to do?', options: ['A. Stop talking about it, the more you say the more annoyed I get.', 'B. Make a joke and let it pass.', 'C. Just remind me to be careful next time.'], dirMap: ['u', 'r', 'l']}, 
    '#75': {text: 'Which kind of teacher do you prefer?', options: ['A. Lectures and leaves, does not call attendance or ask questions.', 'B. Class feels like a chat, often talks about things outside the textbook.', 'C. Has rules but saves your face, does not scold you in public.'], dirMap: ['u', 'r', 'l']}, 
    '#76': {text: 'You are deeply focused on something, then suddenly get called to do something else. What would you do?', options: ['A. Finish what you are doing first.', 'B. Drop it right away and do the new thing.', 'C. Ask "is it urgent?" If not, wait a bit.'], dirMap: ['u', 'r', 'l']}, 
    '#77': {text: 'You are stuck in a very boring lecture. What would you do?', options: ['A. Zone out and wait for it to end.', 'B. Quietly play on your phone or whisper to the person next to you.', 'C. Tough it out, no distractions.'], dirMap: ['u', 'r', 'l']}
}
const modal=document.querySelector('#modal');
const modalQuestion=document.querySelector('#modal_question');
const modalOptions=document.querySelector('#modal_options');
const cells=document.querySelectorAll('.cell');
const dirNum={
    'u': [-1, 0],
    'r': [0, 1], 
    'd': [1, 0],
    'l': [0, -1]
}
const rollBtn=document.querySelector('#roll_btn');
const diceResult=document.querySelector('#dice_result');
const diceSimple=document.querySelector('#dice_simple');
const diceEmojis=['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

gameBtn.addEventListener('click', startGame);
rollBtn.addEventListener('click', rollDice);

function startGame(){
    if (gameStarted){
        return
    }
    gameStarted=true;
    isInBoard=true;
    startPerson.classList.add('hidden');
    inboardPerson.classList.remove('hidden');
    currentRow=7;
    currentCol=0;
    inboardPerson.style.position='absolute';
    inboardPerson.style.width='50px';
    inboardPerson.style.height='auto';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            updatePosition();
            const cells=document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style.backgroundColor='';
                cell.style.opacity='';
            });
            setTimeout(() => {
                triggerQuestion();
            }, 300);
        });
    });
}

function updatePosition() {
    const cellSize=61.25;
    const offset=5.625;
    const left=currentCol*cellSize+offset;
    const top=currentRow*cellSize+offset;
    inboardPerson.style.left=left+'px';
    inboardPerson.style.top=top+'px';
}


function triggerQuestion(){
    const key=`#${currentRow}${currentCol}`;
    const question=questionMap[key];
    if (!question){
        return;
    }
    modalQuestion.textContent=question.text;
    modalOptions.innerHTML='';
    const optionList=question.options;
    for (let i=0; i<optionList.length; i++){
        const optionBtn=document.createElement('button');
        optionBtn.textContent=optionList[i];
        let dir=question.dirMap[i];
        optionBtn.addEventListener('click', function() {setDirection(dir)});
        modalOptions.appendChild(optionBtn);
    }
    modal.classList.remove('hidden');
}

function setDirection(dir){
    currentDirection=dir;
    if (modal){
        modal.classList.add('hidden');
    }
    showBeamEffect(dir);
    enableDice();
}

function getThemeColor(){
    let beamColor=null;
    if (selectedChar.name==='MOMO' || 
        selectedChar.name==='INFJ' ||
        selectedChar.name==='ENFJ' ||
        selectedChar.name==='INFP' ||
        selectedChar.name==='ENFP'
    ){
        beamColor='rgb(71, 163, 116)';
    }
    else if (selectedChar.name==='INTJ' || 
        selectedChar.name==='ENTP' ||
        selectedChar.name==='ENTJ' ||
        selectedChar.name==='INTP'
    ){
        beamColor='rgb(133, 99, 155)';
    }   
    else if (selectedChar.name==='ISTJ' || 
        selectedChar.name==='ESTJ' ||
        selectedChar.name==='ISFJ' ||
        selectedChar.name==='ESFJ'
    ){
        beamColor='rgb(77, 152, 181)';
    }
    else if (selectedChar.name==='ESTP' || 
        selectedChar.name==='ISTP' ||
        selectedChar.name==='ESFP' ||
        selectedChar.name==='ISFP'
    ){
        beamColor='rgb(225, 173, 45)';
    }
    return beamColor;
}      

function showBeamEffect(dir){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {cell.style.backgroundColor='';});
    const [dr, dc]=dirNum[dir];
    if (!dr && !dc){
        return;
    }
    const beamColor=getThemeColor();
    let r=currentRow, c=currentCol;
    for (let i=1; i<=3; i++){
        r+=dr;
        c+=dc;
        if (r<0 || r>=8 || c<0 || c>=8){
            break;
        }
        let opacity=1-i*0.25;
        const cellIndex=r*8+c;
        if (cells[cellIndex]){
            cells[cellIndex].style.backgroundColor=beamColor;
            cells[cellIndex].style.opacity=opacity;
        }
    }
}

function enableDice(){
    diceEnabled=true;
    if (rollBtn){
        rollBtn.disabled=false;
        rollBtn.style.opacity='1';
        rollBtn.style.cursor='pointer';
    }
}

function startMove(){
    if (isMoving){
        return;
    }
    const [dr, dc]=dirNum[currentDirection];
    let reachedPeriphery=false;
    let reachedMBTI=null;
    const peripheryTopList=['ISFJ', 'ISTJ', 'INTP', 'ISTP', 'INFP', 'INFJ', 'INTJ', 'ISFP'];
    const peripheryRightList = ['ENTP', 'ENFP', 'ENFJ', 'ESFJ', 'ESTJ', 'ENTJ', 'ESTP', 'ESFP'];
    if (currentDirection==='u'){
        let stepsToEdge=currentRow+1;
        if (currentSteps>=stepsToEdge){
            reachedPeriphery=true;
            reachedMBTI=peripheryTopList[currentCol];
        }
    }
    else if (currentDirection==='r'){
        let stepsToEdge=7-currentCol+1;
        if (currentSteps>=stepsToEdge){
            reachedPeriphery=true;
            reachedMBTI=peripheryRightList[currentRow];
        }
    }
    if (reachedPeriphery){
        showEndingModal(reachedMBTI);
        return;
    }
    isMoving=true;
    void document.body.offsetHeight;
    updatePosition();
    let targetRow=currentRow+dr*currentSteps;
    let targetCol=currentCol+dc*currentSteps;
    targetRow=Math.max(0, Math.min(7, targetRow));
    targetCol=Math.max(0, Math.min(7, targetCol));
    const startRow=currentRow;
    const startCol=currentCol;
    const endRow=targetRow;
    const endCol=targetCol;
    let startTime=null;
    const duration=500;
    function animateMove(timestamp){
        if (!startTime){
            startTime=timestamp;
        }
        const timePassed=timestamp-startTime;
        const progress=Math.min(1, timePassed/duration);
        const nowRow=startRow+(endRow-startRow)*progress;
        const nowCol=startCol+(endCol-startCol)*progress;
        updatePositionFloat(nowRow, nowCol);
        if (progress<1){
            requestAnimationFrame(animateMove);
        }
        else{
            currentRow=endRow;
            currentCol=endCol;
            updatePosition();
            isMoving=false;
            const cells=document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style.backgroundColor='';
                cell.style.opacity='';
            });
            setTimeout(() => {
                triggerQuestion();
            }, 300);
        }
    }
    requestAnimationFrame(animateMove);
}

function updatePositionFloat(nowRow, nowCol) {
    const cellSize=61.25;
    const offset=5.625;
    const left=nowCol*cellSize+offset;
    const top=nowRow*cellSize+offset;
    inboardPerson.style.left=left+'px';
    inboardPerson.style.top=top+'px';
}

function rollDice(){
    if (!diceEnabled || isMoving || isRolling){
        return;
    }
    isRolling=true;
    diceEnabled=false;
    rollBtn.disabled=true;
    let count=0;
    rollInterval=setInterval(() => {
        const randomIndex=Math.floor(Math.random()*6);
        diceSimple.textContent=diceEmojis[randomIndex];
        count++;
        if (count>=15){
            clearInterval(rollInterval);
            const finalValue=Math.floor(Math.random()*6)+1;
            currentSteps=finalValue;
            totalSteps+=finalValue;
            diceSimple.textContent=diceEmojis[finalValue-1];
            if (diceResult){
                diceResult.textContent=`Result: ${finalValue}`;
            }
            setTimeout(() => {
                isRolling=false;
                startMove();
            }, 150);
        }
    }, 60);
}

function showEndingModal(friendMBTI){
    setTimeout(() => {
        gameStarted=false;
        diceEnabled=false;
        const endingModal=document.querySelector('#ending_modal');
        endingModal.classList.remove('hidden');
        const endingComb=document.querySelector('#ending_comb');
        const endingConfirm=document.querySelector('#ending_confirm');
        const friendNames={
            'INTJ': 'Architect',
            'INTP': 'Logician', 
            'ENTJ': 'Commander', 
            'ENTP': 'Debater', 
            'INFJ': 'Advocate', 
            'INFP': 'Mediator', 
            'ENFJ': 'Protagonist', 
            'ENFP': 'Campaigner', 
            'ISTJ': 'Logistician', 
            'ISFJ': 'Defender', 
            'ESTJ': 'Executive', 
            'ESFJ': 'Consul', 
            'ISTP': 'Virtuoso', 
            'ISFP': 'Adventurer', 
            'ESTP': 'Entrepreneur', 
            'ESFP': 'Entertainer'
        }
        const friendDescr={
            'ISTJ': 'reliable and punctual friend who always remembers your important dates.', 
            'ISFJ': 'quietly devoted and considerate friend who cares for you like family.', 
            'INFJ': 'soul-friend who deeply understands you and explores meaning of life with you.', 
            'INTJ': 'strategic friend who rationally plans and helps you achieve long-term goals.', 
            'ISTP': 'calm and practical hands-on friend who helps solve real problems anytime.', 
            'ISFP': 'gentle and easygoing friend who shows you the beauty and art of life.', 
            'INFP': 'sincere and idealistic friend who always believes in your inner goodness.', 
            'INTP': 'curious friend who loves wild ideas and discusses abstract concepts with you.', 
            'ESTP': 'energetic adventure buddy who pulls you into exciting new experiences.', 
            'ESFP': 'warm and humorous friend who makes every day feel like a party.', 
            'ENFP': 'endlessly inspired friend who encourages you to chase every possibility.', 
            'ENTP': 'sharp and witty friend who sparks new ideas through debate with you.', 
            'ESTJ': 'efficient and decisive friend who takes action and executes plans with you.', 
            'ESFJ': 'warm and organized friend who hosts gatherings and remembers all preferences.', 
            'ENFJ': 'inspiring friend who helps you discover your potential and guides your growth.', 
            'ENTJ': 'ambitious friend who pushes you beyond limits and charges toward goals with you.'
        }
        const friend=personList.find(p => p.name===friendMBTI);
        const friendIntro=friend.intro;
        endingComb.innerHTML=`You meet ${friendMBTI} (${friendNames[friendMBTI]})! They are: ${friendIntro} They will be your ${friendDescr[friendMBTI]}<br><br>Total steps: ${totalSteps}`;
        endingConfirm.addEventListener('click', function(){
            endingModal.classList.add('hidden');
            turnToOne();
    });
    }, 150);
}

// BGM
const bgm=document.querySelector('#bgm');
const musicToggle=document.querySelector('#musicToggle');
let musicPlaying=false;
bgm.volume=0.01;

musicToggle.addEventListener('click', playMusic);

function playMusic(){
    if (musicPlaying) {
        bgm.pause();
        musicToggle.textContent='🔇';
    }
    else {
        bgm.play();
        musicToggle.textContent='🔊';
    }
    musicPlaying=!musicPlaying;
}







