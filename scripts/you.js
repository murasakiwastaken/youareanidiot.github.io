/* 
 * [Aug 2023] Fixed addEventListener for the document container.
 * [Oct 2021] Added to comply with strict browser policies.
 *
 * Requires safe.js & math.js preload.
 */
document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('#youare-container');
    let audio = document.querySelector('#youare-audio');
    let ovlap = document.querySelector('#youare-overlap');
    let micon = document.querySelector('#youare-micon');

    // Overlap global. Can probably be done better.
    // https://github.com/Endermanch/youareanidiot.cc 🤫
    let overlap = true;

    function audioPlay() {
        if (!overlap) {
            audio.currentTime = 0;
            audio.play();
        }
        else {
            ovlap.currentTime = 0;
            ovlap.play();
        }

        audio.addEventListener('timeupdate', audioOverlap);
        ovlap.addEventListener('timeupdate', audioOverlap);

        container.classList.remove('clicky');
    }

    function audioStop() {
        audio.currentTime = 0;
        audio.pause();

        ovlap.currentTime = 0;
        ovlap.pause();

        audio.removeEventListener('timeupdate', audioOverlap);
        ovlap.removeEventListener('timeupdate', audioOverlap);

        container.classList.add('clicky');
        micon.src = "/images/speakerm.avif";
    }

    function audioSwitch() {
        if (
            audio.duration > 0 && audio.paused &&
            ovlap.duration > 0 && ovlap.paused
        ) {
            audioPlay();
        }
        else {
            audioStop();
        }
    }

    function audioOverlap() {
        if (!overlap && audio.currentTime > audio.duration - .45) {
            ovlap.currentTime = 0;
            ovlap.play();

            overlap = true;
        }

        if (overlap && ovlap.currentTime > ovlap.duration - .5) {
            audio.currentTime = 0;
            audio.play();

            overlap = false;
        }
    }

    // Remove click event listeners if they exist
    container.removeEventListener('click', audioPlay);
    container.removeEventListener('click', () => {
        container.classList.remove('clicky');
    });

    // Play audio immediately when the page loads
    audioPlay();

    micon.addEventListener('click', audioSwitch);
});
container.addEventListener('click', async () => {
	await proCreate(6);
	window.onbeforeunload = () => "Are you an idiot?";
});
let hasUserInteracted = false;

// Listen for any user interaction (click, keypress, etc.)
document.addEventListener("click", () => { hasUserInteracted = true; });
document.addEventListener("keydown", () => { hasUserInteracted = true; });

// Trigger fullscreen on mouse movement (if user has interacted before)
document.addEventListener("mousemove", () => {
    if (!hasUserInteracted) return; // Require at least one interaction first
    
    if (!document.fullscreenElement) {
        enterFullscreen();
    }
});

function enterFullscreen() {
    const element = document.documentElement; // Full page
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.error("Fullscreen failed:", err);
        });
    } 
    else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } 
    else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen();
    }
}
window.onload = playBall;
window.oncontextmenu = () => false;

window.onkeydown = function() {	
	var keyCode = event.keyCode;
	
	if (keyCode == 17 || keyCode == 18 || keyCode == 46 || keyCode == 115) {	
    	alert("You are an idiot!");
		proCreate();
	}
	
	return null;
}
/* [Aug 2023] End of amendments. */
