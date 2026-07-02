const song = document.getElementById("mySong");
const btnEffect = document.getElementById("clickSound");
const achievementEffect = document.getElementById("achivement");
const backgroundmMusic1 = document.getElementById("backgroundmMusic1");
const backgroundmMusic2 = document.getElementById("backgroundmMusic2");
const backgroundmMusic3 = document.getElementById("backgroundmMusic3");
const backgroundmMusic4 = document.getElementById("backgroundmMusic4");
const backgroundmMusic5 = document.getElementById("backgroundmMusic5");
const backgroundmMusic6 = document.getElementById("backgroundmMusic6");
const backgroundmMusic7 = document.getElementById("backgroundmMusic7");
const backgroundmMusic8 = document.getElementById("backgroundmMusic8");
const backgroundmMusic9 = document.getElementById("backgroundmMusic9");
const backgroundmMusic10 = document.getElementById("backgroundmMusic10");
let lovePoints = 0;
let friendshipPoints = 0;
let selfHatepoints = 0;
let isGameStarted = false;
let isAnime = false;
let isAnime2 = false;
let isSmoker = false;
let isHelp = false;
let isGaming = false;
let isCareer = false;
let isFriend = false;
const musicSlider = document.getElementById("volumeSlider");
const sfxSlider = document.getElementById("volumeSlider2");
function playNewMusic(musicElement) {
    musicElement.volume = musicSlider.value;
    musicElement.play();
}
const allBackgroundMusics = [
    song, backgroundmMusic1, backgroundmMusic2, backgroundmMusic3,
    backgroundmMusic4, backgroundmMusic5, backgroundmMusic6,
    backgroundmMusic7, backgroundmMusic8, backgroundmMusic9 ,
    backgroundmMusic10
];
function updateSliderColor(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #ba6529 ${value}%, #f0cfbc ${value}%)`;
}
musicSlider.addEventListener("input", function() {
    const newVolume = this.value;
    allBackgroundMusics.forEach(music => {
        if(music) music.volume = newVolume;
    });
    updateSliderColor(this);
});
sfxSlider.addEventListener("input", function() {
    const newVolume = this.value;
    if(btnEffect) btnEffect.volume = newVolume;
    if(achievementEffect) achievementEffect.volume = newVolume;
    updateSliderColor(this);
});
updateSliderColor(musicSlider);
updateSliderColor(sfxSlider);
window.onload = function() {
    alert("Welcome to the game! please click the start button to begin , I hope you enjoy the game :)");
  song.volume = musicSlider.value;
    song.play();
};
function btnclick(){
    btnEffect.volume = sfxSlider.value; 
    btnEffect.play();
}
function triggerAchievement(title) {
    localStorage.setItem(title, "unlocked");
    const box = document.getElementById("achievement-box");
    const text = document.getElementById("achievement-text");
    text.innerText = title; 
    box.classList.add("show");
    if (achievementEffect) {
        achievementEffect.volume = sfxSlider.value;
        achievementEffect.currentTime = 0;
        achievementEffect.play();
    }
    setTimeout(() => {
        box.classList.remove("show");
    }, 5000);
}
const allAchievements = [
    { title: "The last chance ?!", desc: "This is your last year at school" },
    { title: "6 May", desc: "Heart breaking moment of losing Barcellona despite of great performance" },
    { title: "Anime lovers", desc: "You talked with Heba about anime" },
    { title: "Just a weird nerd", desc: "You talked to Heba about studying which is so weird" },
    { title: "Just friends ?!", desc: "Good but still not good enough" },
    { title: "Smoker", desc: "You started smoking to try to move on but it doesn't work that way" },
    { title: "The love gamble", desc: "The old man advised you take a gamble that love exist and move on" },
    { title: "Money doesn't buy happiness", desc: "You have a lot of money , but it does't matter without people that you truley love you and love them back" },
    { title: "A final act of love", desc: "You have realised that the most important part is just Heba is happy even if it's not with you" },
    { title: "Redemption ?!!!", desc: "You took a calm peaceful life in the countryside searching for redemption and peace" },
    { title: "The first date", desc: "Heba loves you back and you got your first date with her" },
    { title: "Cienma date", desc: "You took a cienma date with Heba watching an anime movie" },
    { title: "Marrige", desc: "You married Heba after a long love story" },
    { title: "A kind act of sharing", desc: "You believe that sharing is an act of love and help Heba with washing dishes" },
    { title: "Gamers", desc: "You asked Heba to play video games with you" },
    { title: "The boundless assist", desc: "Mahmoud helps you to get Heba's sign on his t-shirt" },
    { title: "The end ?", desc: "You got lung cancer and it's untreatable" },
    { title: "The iconic death", desc: "You get this when Ehab gets an iconic death due to lung cancer" },
    { title: "Sad ending", desc: "You ended the game by the sad ending" },
    { title: "Love ending", desc: "You ended the game by the love ending" },
    { title: "Friendship ending", desc: "You ended the game by the friendship ending" },
    { title: "Things aren't that well!", desc: "You had a small talk with the old man after you lost everything" }
];
function showAchievements() {
    if (!isGameStarted) {
        document.getElementById("home").style.display = "none";
    }
    let achMenu = document.getElementById("achievementsScreen");
    achMenu.style.display = "flex";
    achMenu.style.position = "absolute"; 
    achMenu.style.zIndex = "2000";
    document.getElementById("globalSettingsBtn").style.display = "none";
    document.getElementById("globalAchievementsBtn").style.display = "none";

    const container = document.getElementById("achievementsContainer");
    container.innerHTML = "";
    allAchievements.forEach(ach => {
        const isUnlocked = localStorage.getItem(ach.title) === "unlocked";
        const card = document.createElement("div");
        if (isUnlocked) {
            card.className = "ach-card unlocked";
            card.innerHTML = `
                <div class="ach-icon">🏆</div>
                <div class="ach-info">
                    <h3>${ach.title}</h3>
                    <p>${ach.desc}</p>
                </div>
            `;
        } else {
            card.className = "ach-card locked";
            card.innerHTML = `
                <div class="ach-icon">🔒</div>
                <div class="ach-info">
                    <h3>Locked Achievement</h3>
                    <p>Keep playing to unlock</p>
                </div>
            `;
        }
        container.appendChild(card);
    });
}
function hideAchievements() {
    document.getElementById("achievementsScreen").style.display = "none";
    if (!isGameStarted) {
        document.getElementById("home").style.display = "flex";
    } else {
        document.getElementById("globalSettingsBtn").style.display = "block";
        document.getElementById("globalAchievementsBtn").style.display = "block";
    }
}
function showSettings() {
    if (!isGameStarted) {
        document.getElementById("home").style.display = "none";
    }
    let settingsMenu = document.getElementById("settings");
    settingsMenu.style.display = "block";
    settingsMenu.style.position = "absolute"; 
    settingsMenu.style.zIndex = "2000";
    document.getElementById("globalSettingsBtn").style.display = "none";
    document.getElementById("globalAchievementsBtn").style.display = "none"; 
}
function hideSettings() {
    document.getElementById("settings").style.display = "none";
    if (!isGameStarted) {
        document.getElementById("home").style.display = "flex";
    } else {
        document.getElementById("globalSettingsBtn").style.display = "block";
        document.getElementById("globalAchievementsBtn").style.display = "block"; 
    }
}
function scene1(){
 isGameStarted = true;
document.getElementById("globalSettingsBtn").style.display = "block";
document.getElementById("home").style.display = "none";
document.getElementById("scene-1").style.display = "block";
document.getElementById("globalAchievementsBtn").style.display = "block";
song.pause();
song.currentTime = 0;
backgroundmMusic1.play();
triggerAchievement("The last chance ?!");
}
function scene2(){
    document.getElementById("scene-1").style.display = "none";
    document.getElementById("scene-2").style.display = "block";
}
function scene3A(){
    document.getElementById("scene-2").style.display = "none";
    document.getElementById("scene-3A").style.display = "block";
    lovePoints = lovePoints + 1;
    friendshipPoints = friendshipPoints + 1;
}
function scene3B(){
    document.getElementById("scene-2").style.display = "none";
    document.getElementById("scene-3B").style.display = "block";
    selfHatepoints = selfHatepoints + 1;
}
function scene4(){
    document.getElementById("scene-3A").style.display = "none";
    document.getElementById("scene-3B").style.display = "none";
    document.getElementById("scene-4").style.display = "block";
}
function scene5(){
    backgroundmMusic1.pause();
    backgroundmMusic1.currentTime = 0;
    if(lovePoints === 1){
    document.getElementById("scene-4").style.display = "none";
    document.getElementById("scene-5A").style.display = "block";
    backgroundmMusic2.play();
}
else if(lovePoints === 0){
    document.getElementById("scene-4").style.display = "none";
    document.getElementById("scene-5B").style.display = "block";
    backgroundmMusic3.play();
}
}
function scene6(){
    document.getElementById("scene-5A").style.display = "none";
    document.getElementById("scene-6").style.display = "block";
    friendshipPoints = friendshipPoints + 1
}
function scene7A(){
    document.getElementById("scene-6").style.display = "none";
    document.getElementById("scene-7A").style.display = "block"
}
function scene6_2(){
         document.getElementById("scene-5B").style.display = "none";
         document.getElementById("scene-6_2").style.display = "block";
}
function scene7_2(){
    document.getElementById("scene-6_2").style.display = "none";
    document.getElementById("scene-7_2").style.display = "block";
}
function scene8_2(){
   document.getElementById("scene-7_2").style.display = "none";
   document.getElementById("scene-8_2").style.display = "block"
   triggerAchievement("6 May");
}
function scene7B(){
    document.getElementById("scene-6").style.display = "none";
    document.getElementById("scene-7B").style.display = "block";
    selfHatepoints = selfHatepoints + 1 ;
}
function branch1(){
    document.getElementById("scene-7B").style.display = "none";
    document.getElementById("scene-8A").style.display = "none";
    document.getElementById("scene-8B").style.display = "none";
    document.getElementById("scene-5B").style.display = "block";
    backgroundmMusic2.pause();
    backgroundmMusic2.currentTime = 0;
    backgroundmMusic3.play();
}
function scene8A(){
    document.getElementById("scene-7A").style.display = "none";
    document.getElementById("scene-8A").style.display = "block";
    lovePoints = lovePoints + 2;
    isAnime = true;
    triggerAchievement("Anime lovers");
}
function scene8B(){
    document.getElementById("scene-7A").style.display = "none";
    document.getElementById("scene-8B").style.display = "block";
    lovePoints = lovePoints - 1;
    triggerAchievement("Just a weird nerd");
}
function scene9(){
    document.getElementById("scene-8_2").style.display = "none";
    document.getElementById("scene-9").style.display = "block";
    backgroundmMusic3.pause();
    backgroundmMusic3.currentTime = 0;
    backgroundmMusic1.play();
}
function scene10A(){
    if(isAnime === true){
    document.getElementById("scene-9").style.display = "none";
    document.getElementById("scene-10A").style.display = "block";
    friendshipPoints = friendshipPoints + 1;
    }else{
    document.getElementById("scene-9").style.display = "none";
    document.getElementById("scene-10C").style.display = "block";
    friendshipPoints = friendshipPoints + 1;
    }
}
function scene11C(){
    document.getElementById("scene-10A").style.display = "none";
    document.getElementById("scene-11C").style.display = "block";
    lovePoints = lovePoints + 1;
    isAnime2 = true;
}
function scene12CA(){
    document.getElementById("scene-11C").style.display = "none";
    document.getElementById("scene-10A").style.display = "none";
    document.getElementById("scene-10C").style.display = "none";
    document.getElementById("scene-12CA").style.display = "block";
    lovePoints = lovePoints + 1;
    isGaming = true;
    triggerAchievement("Gamers")
}
function scene12CB(){
    document.getElementById("scene-11C").style.display = "none";
    document.getElementById("scene-9").style.display = "none";
    document.getElementById("scene-12CB").style.display = "block";
    selfHatepoints = selfHatepoints + 1;
}
function scene13CB(){
    document.getElementById("scene-12CB").style.display = "none";
    document.getElementById("scene-12CA").style.display = "none";
    document.getElementById("scene-11A").style.display = "none";
    document.getElementById("scene-12A").style.display = "none";
    document.getElementById("scene-13CB").style.display = "block";
}
function scene14CBA(){
    document.getElementById("scene-13CB").style.display = "none";
    document.getElementById("scene-14CBA").style.display = "block";
    backgroundmMusic1.pause();
    backgroundmMusic1.currentTime = 0;
    backgroundmMusic4.play();
        setTimeout(function(){
        document.getElementById("scene14CBA-btn").style.display = "block";
    }, 90000);
}
function scene14CBB(){
    document.getElementById("scene-13CB").style.display = "none";
    document.getElementById("scene-14CBB").style.display = "block";
    backgroundmMusic1.pause();
    backgroundmMusic1.currentTime = 0;
    backgroundmMusic5.play();
        setTimeout(function(){
        document.getElementById("scene14CBB-btn").style.display = "block";
    }, 90000);
}
function scene11A(){
   document.getElementById("scene-10A").style.display = "none"
   document.getElementById("scene-10C").style.display = "none"
   document.getElementById("scene-11A").style.display = "block";
  lovePoints = lovePoints + 1;
}
function scene12A(){
    document.getElementById("scene-11A").style.display = "none";
    document.getElementById("scene-12A").style.display = "block";
    lovePoints = lovePoints + 1;
    isCareer = true;
}
function scene15(){
   backgroundmMusic4.currentTime = 0;
    backgroundmMusic4.pause();
    backgroundmMusic5.currentTime = 0;
    backgroundmMusic5.pause();
    if(selfHatepoints >= 2 && isAnime == false){
        document.getElementById("scene-14CBA").style.display = "none";
        document.getElementById("scene-14CBB").style.display = "none";
        document.getElementById("scene-15A").style.display = "block";
        backgroundmMusic6.play();
        isSmoker = true
    }else if(isGaming == true){
        document.getElementById("scene-14CBA").style.display = "none";
        document.getElementById("scene-14CBB").style.display = "none";
        document.getElementById("scene-15B").style.display = "block";
        backgroundmMusic2.play();
    }else if(isCareer == true){
        document.getElementById("scene-14CBA").style.display = "none";
        document.getElementById("scene-14CBB").style.display = "none";
        document.getElementById("scene-15C").style.display = "block";
        backgroundmMusic2.play();
    }else{
        document.getElementById("scene-14CBA").style.display = "none";
        document.getElementById("scene-14CBB").style.display = "none";
        document.getElementById("scene-15D").style.display = "block";
        backgroundmMusic2.play();
    }
}
function scene16_1(){
document.getElementById("scene-15A").style.display = "none";
document.getElementById("scene-16_1").style.display = "block";
}
function scene17_1(){
    document.getElementById("scene-16_1").style.display = "none";
    document.getElementById("scene-17_1").style.display = "block";
    triggerAchievement("Smoker");
}
function scene18_1(){
    document.getElementById("scene-17_1").style.display = "none";
    document.getElementById("scene-18_1").style.display = "block";
}
function scene19_1A(){
    document.getElementById("scene-18_1").style.display = "none";
    document.getElementById("scene-19_1A").style.display = "block";
    isHelp = true;
}
function scene20_1(){
    document.getElementById("scene-19_1A").style.display = "none";
    document.getElementById("scene-18_1").style.display = "none";
    document.getElementById("scene-20_1").style.display = "block";
}
function scene21_1(){
    document.getElementById("scene-20_1").style.display = "none";
    document.getElementById("scene-21_1").style.display = "block";
}
function scene16_4(){
        document.getElementById("scene-15D").style.display = "none";
        document.getElementById("scene-16_4").style.display = "block";
}
function scene17_4A(){
document.getElementById("scene-16_4").style.display = "none";
document.getElementById("scene-17_4A").style.display = "block";
selfHatepoints = selfHatepoints + 1;
}
function scene18_4(){
    document.getElementById("scene-17_4A").style.display = "none";
    document.getElementById("scene-15D").style.display = "none";
    document.getElementById("scene-16_4").style.display = "none";
    document.getElementById("scene-15A").style.display = "block";
    isSmoker = true;
    backgroundmMusic2.pause();
    backgroundmMusic2.currentTime = 0;
    backgroundmMusic6.play();
}
function scene17_4B(){
document.getElementById("scene-16_4").style.display = "none";
document.getElementById("scene-17_4B").style.display = "block";
friendshipPoints = friendshipPoints + 1;
}
function scene17_4C(){
document.getElementById("scene-16_4").style.display = "none";
document.getElementById("scene-17_4C").style.display = "block";
lovePoints = lovePoints + 1;
}
function scene16_3(){
document.getElementById("scene-15C").style.display = "none";
document.getElementById("scene-17_4C").style.display = "none";
document.getElementById("scene-16_3").style.display = "block";
}
function scene16_2(){
    document.getElementById("scene-15B").style.display = "none";
    document.getElementById("scene-17_4B").style.display = "none";
    document.getElementById("scene-16_2").style.display = "block";
}
function confess(){
if(lovePoints >= 5){
    document.getElementById("scene-16_2").style.display = "none";
    document.getElementById("scene-16_3").style.display = "none";
    document.getElementById("L1").style.display = "block";
}else{
    document.getElementById("scene-16_2").style.display = "none";
    document.getElementById("scene-16_3").style.display = "none";
    document.getElementById("F1").style.display = "block";
    backgroundmMusic2.pause();
    backgroundmMusic2.currentTime = 0;
    backgroundmMusic6.play();
}
}
function F2(){
    if(friendshipPoints < 3){
        document.getElementById("F1").style.display = "none";
        document.getElementById("F2A").style.display = "block";
    }else if(friendshipPoints >= 3 && (isAnime == true || isGaming == true)){
        document.getElementById("F1").style.display = "none";
        document.getElementById("F2B").style.display = "block";
        triggerAchievement("Just friends ?!");
    }else{
        document.getElementById("F1").style.display = "none";
        document.getElementById("F2A").style.display = "block";
    }
}
function sad(){
    document.getElementById("F2A").style.display = "none";
    document.getElementById("scene-15A").style.display = "block";
    isFriend = true;
}
function F3(){
    document.getElementById("F2B").style.display = "none";
    document.getElementById("F3").style.display = "block";
}
function F4(){
    document.getElementById("F3").style.display = "none";
    document.getElementById("F4").style.display = "block";
}
function F5(){
    document.getElementById("F4").style.display = "none";
    document.getElementById("F5").style.display = "block";
}
function F6(){
    document.getElementById("F5").style.display = "none";
    document.getElementById("F6").style.display = "block";
}
function F7(){
    document.getElementById("F6").style.display = "none";
    document.getElementById("F7").style.display = "block";
    backgroundmMusic6.pause();
    backgroundmMusic6.currentTime = 0;
    backgroundmMusic7.play();
}
function F8(){
    document.getElementById("F7").style.display = "none";
    document.getElementById("F8").style.display = "block";
}
function F9(){
    document.getElementById("F8").style.display = "none";
    document.getElementById("F9").style.display = "block";
}
function F10(){
    document.getElementById("F9").style.display = "none";
    document.getElementById("F10").style.display = "block";
    triggerAchievement("The love gamble")
}
function F11(){
    document.getElementById("F10").style.display = "none";
    document.getElementById("F11").style.display = "block";
}
function F12(){
    document.getElementById("F11").style.display = "none";
    document.getElementById("F12").style.display = "block";
}
function F13(){
    document.getElementById("F12").style.display = "none";
    document.getElementById("F13").style.display = "block";
}
function F14(){
    document.getElementById("F13").style.display = "none";
    document.getElementById("F14").style.display = "block";
}
function F15(){
    document.getElementById("F14").style.display = "none";
    document.getElementById("F15").style.display = "block";
}
function F16(){
    document.getElementById("F15").style.display = "none";
    document.getElementById("F16").style.display = "block";
}
function F17(){
    document.getElementById("F16").style.display = "none";
    document.getElementById("F17").style.display = "block";
}
function F18(){
    document.getElementById("F17").style.display = "none";
    document.getElementById("F18").style.display = "block";
}
function F19(){
    document.getElementById("F18").style.display = "none";
    document.getElementById("F19").style.display = "block";
    backgroundmMusic7.pause();
    backgroundmMusic7.currentTime = 0;
    backgroundmMusic8.play();
}
function F20(){
    document.getElementById("F19").style.display = "none";
    document.getElementById("F20").style.display = "block";
}
function F21(){
    document.getElementById("F20").style.display = "none";
    document.getElementById("F21").style.display = "block";
}
function F22(){
    document.getElementById("F21").style.display = "none";
    document.getElementById("F22").style.display = "block";
}
function F23(){
    document.getElementById("F22").style.display = "none";
    document.getElementById("F23").style.display = "block";
    triggerAchievement("Money doesn't buy happiness")
}
function F24(){
    document.getElementById("F23").style.display = "none";
    document.getElementById("F24").style.display = "block";
}
function F25(){
    document.getElementById("F24").style.display = "none";
    document.getElementById("F25").style.display = "block";
}
function F26(){
    document.getElementById("F25").style.display = "none";
    document.getElementById("F26").style.display = "block";
}
function F27(){
    document.getElementById("F26").style.display = "none";
    document.getElementById("F27").style.display = "block";
}
function F28(){
    document.getElementById("F27").style.display = "none";
    document.getElementById("F28").style.display = "block";
    triggerAchievement("A final act of love")
}
function F29(){
    document.getElementById("F28").style.display = "none";
    document.getElementById("F29").style.display = "block";
}
function F30(){
    document.getElementById("F29").style.display = "none";
    document.getElementById("F30").style.display = "block";
}
function F31(){
    document.getElementById("F30").style.display = "none";
    document.getElementById("F31").style.display = "block";
}
function F32(){
    document.getElementById("F31").style.display = "none";
    document.getElementById("F32").style.display = "block";
}
function F33(){
    document.getElementById("F32").style.display = "none";
    document.getElementById("F33").style.display = "block";
}
function F34(){
    document.getElementById("F33").style.display = "none";
    document.getElementById("F34").style.display = "block";
}
function F35(){
    document.getElementById("F34").style.display = "none";
    document.getElementById("F35").style.display = "block";
    triggerAchievement("Redemption ?!!!")
}
function F36(){
    document.getElementById("F35").style.display = "none";
    document.getElementById("F36").style.display = "block";
}
function F37(){
document.getElementById("F36").style.display = "none";
document.getElementById("L32").style.display = "none";
document.getElementById("S34").style.display = "none";
document.getElementById("F37").style.display = "block";
if(isSmoker == true){
    triggerAchievement("Sad ending")
}
else if(lovePoints >= 5){
    triggerAchievement("Love ending")
}
else if(friendshipPoints >= 3 && (isAnime == true || isGaming == true)){
    triggerAchievement("Friendship ending")
}
}
function returnhome(){
    backgroundmMusic8.pause();
    backgroundmMusic8.currentTime = 0;
    backgroundmMusic9.pause();
    backgroundmMusic9.currentTime = 0;
    backgroundmMusic10.pause();
    backgroundmMusic10.currentTime = 0;
    song.play();
    document.getElementById("F37").style.display = "none";
    document.getElementById("home").style.display = "block";
    lovePoints = 0;
    friendshipPoints = 0;
    selfHatepoints = 0;
    isAnime = false;
    isAnime2 = false;
    isSmoker = false;
    isHelp = false;
    isGaming = false;
    isCareer = false;
    isFriend = false;
    isGameStarted = false;
    document.getElementById("globalSettingsBtn").style.display = "none";
    document.getElementById("globalAchievementsBtn").style.display = "none";
}
function L2(){
    document.getElementById("L1").style.display = "none";
    document.getElementById("L2").style.display = "block";
}
function L3(){
    document.getElementById("L2").style.display = "none";
    document.getElementById("L3").style.display = "block";
}
function L4(){
    document.getElementById("L3").style.display = "none";
    document.getElementById("L4").style.display = "block";
    triggerAchievement("The first date")
}
function L5(){
    document.getElementById("L4").style.display = "none";
    document.getElementById("L5").style.display = "block";
}
function L6(){
    document.getElementById("L5").style.display = "none";
    document.getElementById("L6").style.display = "block";
}
function L7(){
    document.getElementById("L6").style.display = "none";
    document.getElementById("L7").style.display = "block";
}
function L8(){
    document.getElementById("L7").style.display = "none";
    document.getElementById("L8").style.display = "block";
}
function L9(){
    document.getElementById("L8").style.display = "none";
    document.getElementById("L9").style.display = "block";
}
function L10(){
    document.getElementById("L9").style.display = "none";
    document.getElementById("L10").style.display = "block";
}
function L11(){
    if(isAnime2 == true){
        document.getElementById("L10").style.display = "none";
        document.getElementById("L11+").style.display = "block";
    }
    else{
    document.getElementById("L10").style.display = "none";
    document.getElementById("L11").style.display = "block";
    backgroundmMusic2.pause();
    backgroundmMusic2.currentTime = 0;
    backgroundmMusic9.play();
    }
}
function L12_2(){
    document.getElementById("L11+").style.display = "none";
    document.getElementById("L12+").style.display = "block";
    triggerAchievement("Cienma date")
}
function L12(){
    document.getElementById("L11").style.display = "none";
    document.getElementById("L12").style.display = "block";
}
function L11_0(){
document.getElementById("L12+").style.display = "none";
document.getElementById("L11").style.display = "block";
backgroundmMusic2.pause();
    backgroundmMusic2.currentTime = 0;
    backgroundmMusic9.play();
}
function L13(){
    document.getElementById("L12").style.display = "none";
    document.getElementById("L13").style.display = "block";
}
function L14(){
    document.getElementById("L13").style.display = "none";
    document.getElementById("L14").style.display = "block";
}
function L15(){
    document.getElementById("L14").style.display = "none";
    document.getElementById("L15").style.display = "block";
}
function L16(){
    document.getElementById("L15").style.display = "none";
    document.getElementById("L16").style.display = "block";
}
function L17(){
    document.getElementById("L16").style.display = "none";
    document.getElementById("L17").style.display = "block";
}
function L18(){
    document.getElementById("L17").style.display = "none";
    document.getElementById("L18").style.display = "block";
}
function L19(){
    document.getElementById("L18").style.display = "none";
    document.getElementById("L19").style.display = "block";
}
function L20(){
    document.getElementById("L19").style.display = "none";
    document.getElementById("L20").style.display = "block";
}
function L21(){
    document.getElementById("L20").style.display = "none";
    document.getElementById("L21").style.display = "block";
}
function L22(){
    document.getElementById("L21").style.display = "none";
    document.getElementById("L22").style.display = "block";
    triggerAchievement("Marrige")
}
function L23(){
    document.getElementById("L22").style.display = "none";
    document.getElementById("L23").style.display = "block";
}
function L24(){
    document.getElementById("L23").style.display = "none";
    document.getElementById("L24").style.display = "block";
}
function L25(){
    document.getElementById("L24").style.display = "none";
    document.getElementById("L25").style.display = "block";
}
function L26(){
    document.getElementById("L25").style.display = "none";
    document.getElementById("L26").style.display = "block";
}
function L27(){
    document.getElementById("L26").style.display = "none";
    document.getElementById("L27").style.display = "block";
    triggerAchievement("A kind act of sharing")
}
function L28(){
    document.getElementById("L27").style.display = "none";
    document.getElementById("L28").style.display = "block";
}
function L29(){
    document.getElementById("L28").style.display = "none";
    document.getElementById("L29").style.display = "block";
}
function L30(){
    document.getElementById("L29").style.display = "none";
    document.getElementById("L30").style.display = "block";
}
function L31(){
    document.getElementById("L30").style.display = "none";
    document.getElementById("L31").style.display = "block";
}
function L32(){
    document.getElementById("L31").style.display = "none";
    document.getElementById("L32").style.display = "block";
}
function S1(){
    document.getElementById("scene-21_1").style.display = "none";
    document.getElementById("S1").style.display = "block";
}
function S2(){
    document.getElementById("S1").style.display = "none";
    document.getElementById("S2").style.display = "block";
}
function S3(){
    document.getElementById("S2").style.display = "none";
    document.getElementById("S3").style.display = "block";
}
function S4(){
    document.getElementById("S3").style.display = "none";
    document.getElementById("S4").style.display = "block";
}
function S5(){
    document.getElementById("S4").style.display = "none";
    document.getElementById("S5").style.display = "block";
}
function S6(){
    document.getElementById("S5").style.display = "none";
    document.getElementById("S6").style.display = "block";
}
function S7(){
    document.getElementById("S6").style.display = "none";
    document.getElementById("S7").style.display = "block";
}
function S8(){
    document.getElementById("S7").style.display = "none";
    document.getElementById("S8").style.display = "block";
}
function S9(){
    document.getElementById("S8").style.display = "none";
    document.getElementById("S9").style.display = "block";
    triggerAchievement("The boundless assist")
}
function S10(){
    document.getElementById("S9").style.display = "none";
    document.getElementById("S10").style.display = "block";
}
function S11(){
    document.getElementById("S10").style.display = "none";
    document.getElementById("S11").style.display = "block";
    backgroundmMusic6.pause();
    backgroundmMusic6.currentTime = 0;
    backgroundmMusic10.play();
}
function S12(){
    document.getElementById("S11").style.display = "none";
    document.getElementById("S12").style.display = "block";
}
function S13(){
    document.getElementById("S12").style.display = "none";
    document.getElementById("S13").style.display = "block";
} 
function S14(){
    document.getElementById("S13").style.display = "none";
    document.getElementById("S14").style.display = "block";
} 
function S15(){
    document.getElementById("S14").style.display = "none";
    document.getElementById("S15").style.display = "block";
} 
function S16(){
    document.getElementById("S15").style.display = "none";
    document.getElementById("S16").style.display = "block";
} 
function S17(){
    document.getElementById("S16").style.display = "none";
    document.getElementById("S17").style.display = "block";
} 
function S18(){
    document.getElementById("S17").style.display = "none";
    document.getElementById("S18").style.display = "block";
} 
function S19(){
    document.getElementById("S18").style.display = "none";
    document.getElementById("S19").style.display = "block";
} 
function S20(){
    document.getElementById("S19").style.display = "none";
    document.getElementById("S20").style.display = "block";
} 
function S21(){
    document.getElementById("S20").style.display = "none";
    document.getElementById("S21").style.display = "block";
} 
function S22(){
    document.getElementById("S21").style.display = "none";
    document.getElementById("S22").style.display = "block";
} 
function S23(){
    document.getElementById("S22").style.display = "none";
    document.getElementById("S23").style.display = "block";
} 
function S24(){
    document.getElementById("S23").style.display = "none";
    document.getElementById("S24").style.display = "block";
} 
function S25(){
    document.getElementById("S24").style.display = "none";
    document.getElementById("S25").style.display = "block";
    
} 
function S26(){
    document.getElementById("S25").style.display = "none";
    document.getElementById("S26").style.display = "block";
    triggerAchievement("The end ?")
} 
function S27(){
    document.getElementById("S26").style.display = "none";
    document.getElementById("S27").style.display = "block";
} 
function S28(){
    document.getElementById("S27").style.display = "none";
    document.getElementById("S28").style.display = "block";
} 
function S29(){
    if(isHelp == true){
        document.getElementById("S28").style.display = "none";
        document.getElementById("S29+").style.display = "block";
        triggerAchievement("Things aren't that well!")
    }
    else{
        document.getElementById("S28").style.display = "none";
        document.getElementById("S29").style.display = "block";
    }
}
function S30_2(){
    document.getElementById("S29+").style.display = "none";
    document.getElementById("S30+").style.display = "block";
}
function S31_2(){
    document.getElementById("S30+").style.display = "none";
    document.getElementById("S31+").style.display = "block";
}
function S32_0(){
    document.getElementById("S31+").style.display = "none";
    document.getElementById("S29").style.display = "block";
}
function S30(){
        document.getElementById("S29").style.display = "none";
        document.getElementById("S30").style.display = "block";
}
function S31(){
        document.getElementById("S30").style.display = "none";
        document.getElementById("S31").style.display = "block";
}
function S32(){
        document.getElementById("S31").style.display = "none";
        document.getElementById("S32").style.display = "block";
}
function S33(){
        document.getElementById("S32").style.display = "none";
        document.getElementById("S33").style.display = "block";
}
function S34(){
        document.getElementById("S33").style.display = "none";
        document.getElementById("S34").style.display = "block";
        triggerAchievement("The iconic death")
}
