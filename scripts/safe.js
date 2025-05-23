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
