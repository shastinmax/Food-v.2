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
				if (target === tab) {
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
	const showModalBtn = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal')

	function showModal(){
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden'
		clearInterval(timerModal)
	}

	showModalBtn.forEach((btn) => btn.addEventListener('click', showModal))

	function closeModal(){
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = ''
	}




	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === "") {
			closeModal()
		}
	})
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.style.display === 'block') {
			closeModal()
		}
	})

	const timerModal = setTimeout(showModal, 50000)

	const showModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal()
			window.removeEventListener('scroll', showModalByScroll)
		}
	}

	window.addEventListener('scroll', showModalByScroll)

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src
			this.alt = alt
			this.title = title
			this.price = price
			this.parent = document.querySelector(parentSelector)
			this.descr = descr
			this.classes = classes
			this.transfer = 60
			this.changeToRub()
		}

		changeToRub() {
			this.price = this.price * this.transfer
		}

		render() {
			const element = document.createElement('div')
			if (!this.classes.length) {
				this.element = 'menu__item'
				element.classList.add(this.element)
			} else {
				this.classes.forEach(className => element.classList.add(className))
			}
			element.innerHTML = `
						<img src=${this.src} alt=${this.alt}>
						<h3 class="menu__item-subtitle">${this.title}</h3>
						<div class="menu__item-descr">${this.descr}</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
						</div>
			`;
			this.parent.append(element)
		}
	}

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню 'Фитнес'",
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		6,
		".menu .container",
		"menu__item"
	).render()
	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню 'Премиум'",
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		7,
		".menu .container",
		"menu__item"
	).render()
	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		"Меню 'Постное'",
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		9,
		".menu .container",
		"menu__item"
	).render()

	const forms = document.querySelectorAll('form')
	const message = {
		loading: 'Загрузка',
		success: 'Спасибо,мы с Вами скоро свяжемся',
		failure: 'Что-то пошло не так...'

	}

	forms.forEach(item => {
		postData(item)
	})

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault()

			const statusMessage = document.createElement('img')
			statusMessage.classList.add('status')
			statusMessage.textContent = message.loading
			form.append(statusMessage)

			const request = new XMLHttpRequest()
			request.open("POST", 'server.php')
			// request.setRequestHeader('Content-type', 'multipart-data')
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

			const formData = new FormData(form)
			const object = {}
			formData.forEach((value, key) => {
				object[key] = value
			})

			const json = JSON.stringify(object)

			request.send(json)

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response)
					showThanksModal(message.success)
					form.reset()
						statusMessage.remove()
				} else {
				showThanksModal(message.failure)
				}
			})
		})
	}

	function showThanksModal(message) {
		const prevModalDialogs = document.querySelector('.modal__dialog')
		prevModalDialogs.classList.add('hide')
		showModal()

		const thanksModal = document.createElement('div')
		thanksModal.classList.add('modal__dialog')
		thanksModal.innerHTML = `
		<div class = "modal__content">
			<div class = "modal__close" data-close>&times;</div>
			<div class = "modal__title">${message}</div>
		</div>`
		document.querySelector('.modal').append(thanksModal)
		setTimeout(() => {
			thanksModal.remove()
			prevModalDialogs.classList.add('show')
			prevModalDialogs.classList.remove('hide')
			closeModal()
		}, 4000)
	}
})

