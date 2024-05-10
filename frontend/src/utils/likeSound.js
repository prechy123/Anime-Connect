var context = new AudioContext();
var audio = new Audio("../../sounds/like.mp3");
var source = context.createMediaElementSource(audio);

export default function likeSound() {
    source.connect(context.destination);
    audio.play();
}