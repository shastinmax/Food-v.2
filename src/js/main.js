window.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items')

	function hideTabContent() {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		})
		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade')
		tabsContent[i].classList.remove('hide')
		tabs[i].classList.add('tabheader__item_active')
	}


	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, i) => {
				if (target == tab) {
					hideTabContent();
					showTabContent(i)
				}
			})
		}
	})
//	Timer
	const deadline = '2022-09-17'

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - new Date(),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / (1000 * 60) % 60)),
			seconds = Math.floor((t / 1000 % 60))

		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds
		}
	}

	function getZero(time) {
		return time >= 0 && time < 10 ? `0${time}` : time
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timerInterval = setInterval(updateClock, 1000)
		updateClock()


		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timerInterval)
			}
		}
	}

	setClock('.timer', deadline)
})