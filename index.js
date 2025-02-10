// Begin the animation after a brief delay.
setTimeout(() => {
    document.querySelector('.container').classList.add('cracked');
    document.querySelector('.chick').classList.add('visible');
    // Trigger the wink on the right eye after 1.5 seconds.
    setTimeout(() => {
        document.querySelector('.window').style.opacity = '1';
    }, 4000); // Delay to match the fade-out timing
}, 1000);

class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control")
        };

        this.duration = 11 * 60 * 1000; // 11 minutes in milliseconds
        this.endTime = null;
        this.animationFrame = null;

        this.el.control.addEventListener("click", () => {
            if (this.endTime === null) {
                this.start();
            } else {
                this.reset();
            }
        });

        this.updateInterfaceTime(this.duration);
    }

    updateInterfaceTime(remainingTime) {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    start() {
        this.endTime = Date.now() + this.duration;
        const startSound = document.getElementById("startSound");
        startSound.play();
        this.el.control.textContent = "Reset";
        this.update();
    }

    update() {
        const remainingTime = this.endTime - Date.now();

        if (remainingTime <= 0) {
            this.updateInterfaceTime(0);
            this.reset();
            const alarmSound = document.getElementById("alarmSound");
            if (alarmSound) {
                alarmSound.play().catch(error => console.error("Alarm sound failed to play:", error));
            }
        } else {
            this.updateInterfaceTime(remainingTime);
            this.animationFrame = requestAnimationFrame(() => this.update());
        }
    }

    reset() {
        cancelAnimationFrame(this.animationFrame);
        this.endTime = null;
        this.el.control.textContent = "Start";
        this.updateInterfaceTime(this.duration);
    }

    static getHTML() {
        return `
          <button type="button" class="timer__btn timer__btn--control">Start</button>
          <br>
          <span class="timer__part timer__part--minutes">11</span>
          <span class="timer__part">:</span>
          <span class="timer__part timer__part--seconds">00</span>
          
          
        `;
    }
}

new Timer(document.querySelector(".timer"));