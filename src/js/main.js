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
	const deadline = '2022-09-18'

	function getTimeRemaining(endTime) {

		let days, hours, minutes, seconds;
		const t = Date.parse(endTime) - new Date();

		if (t <= 0) {
			return {
				'total': t,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			}
		}

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

	//Modal
	const showModal = document.querySelectorAll('[data-modal]'),
		closeModalBtn = document.querySelector('[data-close]'),
		modal = document.querySelector('.modal')

	const closeModal = () => {
		modal.style.display = 'none'
		document.body.style.overflow = ''
	}
	showModal.forEach((btn) => btn.addEventListener('click', () => {
		modal.style.display = 'block'
		document.body.style.overflow = 'hidden'
	}))

	closeModalBtn.addEventListener('click', closeModal)
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal()
		}
	})
	document.addEventListener('keydown',(e)=>{
		if(e.code === 'Escape' && modal.style.display === 'block'){
			closeModal()
		}
	})
})