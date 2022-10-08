//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive(); // ДИНАМИЧЕСКИЙ АДАПТИВ

function scrollHeader() {
	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
scrollHeader(); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ

; // АНИМИРОВАННЫЙ

function weBuySlider() {
	if (document.querySelector(".we-buy__slider")) {
		const arrows = document.querySelector(".we-buy__slider").querySelector(".we-buy-slider__arrows");

		function weBuyValid() {
			const slides = document.querySelectorAll(".we-buy-slider__slide");

			if (window.innerWidth > 1024.2 && slides.length > 7) {
				swiperStart()
			} else {
				arrows.style.display = "none";
			}
			if (window.innerWidth > 768.2 && slides.length > 5) {
				swiperStart()
			} else {
				arrows.style.display = "none";
			}
			if (window.innerWidth < 768.2 && slides.length > 3) {
				swiperStart()
			} else {
				arrows.style.display = "none";
			}
		}

		function swiperStart() {
			arrows.style.display = "flex";

			new Swiper(".we-buy__slider", {
				slidesPerView: 3,
				spaceBetween: 30,
				speed: 800,

				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},

				breakpoints: {
					1024.2: {
						slidesPerView: 7,
					},
					768.2: {
						slidesPerView: 5,
					},
				}
			});
		}

		document.addEventListener("DOMContentLoaded", weBuyValid);
		window.addEventListener("resize", weBuyValid);
	}
}
weBuySlider()

if (document.querySelector(".customers-said__slider")) {
	new Swiper(".customers-said__slider", {
		slidesPerView: 1,
		spaceBetween: 20,
		grabCursor: true,
		speed: 800,
		loop: true,

		navigation: {
			nextEl: ".customers-said-slider__arrow.swiper-button-next",
			prevEl: ".customers-said-slider__arrow.swiper-button-prev",
		},

		breakpoints: {
			992.2: {
				slidesPerView: 3,
			},
			480.2: {
				slidesPerView: 2,
			},
		}
	});
}; // НАСТРОЙКИ СЛАЙДЕРА

/* function quantity() {
	if (document.querySelectorAll('[data-quantity]')) {
		let minValue = 1; // Минимальное значение
		let maxValue = 20; // Максимальное значение

		const counters = document.querySelectorAll('[data-quantity]');

		counters.forEach(counter => {
			counter.addEventListener("click", function (e) {
				const elementTarget = e.target;
				let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

				if (elementTarget.closest('.counter__btn')) {
					if (elementTarget.classList.contains("counter__btn_plus")) {
						value++;
					} else {
						--value;
					}

					if (value <= minValue) {
						value = minValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("counter__btn_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("counter__btn_disabled");
					}

					if (value >= maxValue) {
						value = maxValue;
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("counter__btn_disabled");
					} else {
						elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("counter__btn_disabled");
					}
				}

				elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				elementTarget.closest(".counter").querySelector(".counter__input").setAttribute("value", value)
			});

			counter.addEventListener("input", function (e) {
				const elementTarget = e.target;
				let value = parseInt(elementTarget.closest(".counter").querySelector('.counter__input').value);

				if (value >= maxValue) {
					value = maxValue;
					elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.add("counter__btn_disabled");
				} else {
					elementTarget.closest(".counter").querySelector(".counter__btn_plus").classList.remove("counter__btn_disabled");
				}

				if (value <= minValue) {
					value = minValue;
					elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.add("counter__btn_disabled");
				} else {
					elementTarget.closest(".counter").querySelector(".counter__btn_minus").classList.remove("counter__btn_disabled");
				}

				elementTarget.closest(".counter").querySelector(".counter__input").value = value;
				elementTarget.closest(".counter").querySelector(".counter__input").setAttribute("value", value)
			});
		});
	}
};
quantity(); // СЧЁТЧИКИ */

function mySpollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');

	if (spollersArray.length > 0) {
		// Получение обычных спойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных спойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение спойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});

		// Инициализация спойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_active');
					_slideToggle(spollerTitle.nextElementSibling, 400);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_active');
				_slideUp(spollerActiveTitle.nextElementSibling, 400);
			}
		}
	}

	let _slideUp = (target, duration = 400) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideDown = (target, duration = 400) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 400) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
mySpollers(); // СПОЙЛЕРЫ

function myPopups() {
	const links = document.querySelectorAll("[data-popup-open]");
	const lockPadding = document.querySelectorAll(".lock-padding");
	const body = document.body;

	let unlock = true;

	const time = 500;

	if (links) {
		links.forEach(link => {
			link.addEventListener("click", function (e) {
				e.preventDefault();
				const popupName = this.getAttribute("data-popup");
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
			});
		});

		const close = document.querySelectorAll("[data-popup-close]");

		close.forEach(item => {
			item.addEventListener("click", function (e) {
				popupClose(item.closest(".popup"));
			});
		});

		function popupOpen(currentPopup) {
			if (currentPopup && unlock) {
				const popupActive = document.querySelector(".popup._active");

				if (popupActive) {
					popupClose(popupActive, false);
				} else {
					bodyLock();
				}

				currentPopup.classList.add("_active");

				currentPopup.addEventListener("click", function (e) {
					if (!e.target.closest(".popup__body")) {
						popupClose(e.target.closest(".popup"));
					}
				});
			}
		}

		function popupClose(popupActive, doUnlock = true) {
			if (unlock) {
				popupActive.classList.remove("_active");
				if (doUnlock) {
					bodyUnLock();
				}
			}
		}

		function bodyLock() {
			const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

			if (lockPadding) {
				lockPadding.forEach(elem => {
					elem.style.paddingRight = lockPaddingValue;
				});
			}
			body.style.paddingRight = lockPaddingValue;
			body.classList.add("_lock-scroll");

			unlock = false;
			setTimeout(() => {
				unlock = true;
			}, time);
		}

		function bodyUnLock() {
			setTimeout(() => {
				if (lockPadding) {
					lockPadding.forEach(elem => {
						elem.style.paddingRight = "0px";
					});
				}
				body.style.paddingRight = "0px";
				body.classList.remove("_lock-scroll");
			}, time);

			unlock = false;
			setTimeout(() => {
				unlock = true;
			}, time);
		}

		document.addEventListener("keydown", function (e) {
			if (e.code === "Escape") {
				const popupActive = document.querySelector(".popup._active");
				popupClose(popupActive);
			}
		});

		(function () {
			if (!Element.prototype.closest) {
				Element.prototype.closest = function (css) {
					var node = this;
					while (node) {
						if (node.matches(css)) return node;
						else node = node.parentElement;
					}
					return null;
				};
			}
		})();
		(function () {
			if (!Element.prototype.matches) {
				Element.prototype.mathes = Element.prototype.matchesSelector ||
					Element.prototype.webkitMatchesSelector ||
					Element.prototype.mozMatchesSelector ||
					Element.prototype.msMatchesSelector;
			}
		})();
	}
}
myPopups(); // ПОПАПЫ 

function myPagination() {
	const mains = document.querySelectorAll("[data-main]");
	mains.forEach((main) => {
		// document

		//показ стартовых блоков
		let CONFIG = Number(
			main.querySelector("[data-pagination]").getAttribute("data-pagination")
		);

		const contents = main.querySelectorAll("[data-content]");
		const contentsLength = main.querySelectorAll("[data-content]").length;

		//считывание сколько контента и создает столько же кнопок
		contents.forEach(() => {
			const lengthBtn = main.querySelectorAll("[data-btn]").length;

			const order = lengthBtn + 1;

			const billet = main.querySelector("[data-billet]");
			const copy = billet.cloneNode();
			copy.removeAttribute("data-billet");
			copy.setAttribute("data-btn", `${order}`);
			copy.innerHTML = order;

			const zone = main.querySelector("[data-btns]");
			zone.appendChild(copy);
		});

		//при обновлении страницы, первый блок активный
		const firstBtn = main.querySelector("[data-btn]");
		firstBtn.classList.add("_active");
		//стрелки
		firstBtn.setAttribute("data-arrows", "");

		//клик по кнопке
		main.addEventListener("click", (event) => {
			if (event.target.closest("[data-btn]")) {
				// =================================================================================================

				const att = event.target.getAttribute("data-btn");
				const modAtt = `[data-content="${att}"]`;

				main.querySelector(modAtt).classList.add("_active");
				event.target.classList.add("_active");
				//стрелки
				event.target.setAttribute("data-arrows", "");

				// контент
				const contents = main.querySelectorAll("[data-content]");
				contents.forEach((content) => {
					if (content.getAttribute("data-content") === att) {
					} else {
						content.classList.remove("_active");
					}
				});
				// кнопки
				const checkBtns = main.querySelectorAll("[data-btn]");
				checkBtns.forEach((checkBtn) => {
					if (checkBtn.getAttribute("data-btn") === att) {
					} else {
						checkBtn.classList.remove("_active");
						//стрелки
						checkBtn.removeAttribute("data-arrows");
					}
				});

				const contentsLength = main.querySelectorAll("[data-content]").length;
				const min = Number(att) - 1;
				const max = Number(att) + (CONFIG - 2);

				//danger
				const add = CONFIG - 2;
				const dangerZone = contentsLength - add;

				//основной механизм
				//проверка на опасную зону
				if (Number(event.target.getAttribute("data-btn")) > dangerZone) {
					//если попало в опасную зону
					const btns = main.querySelectorAll("[data-btn]");
					btns.forEach((btn) => {
						const minLength =
							Number(main.querySelectorAll("[data-content]").length) - CONFIG;

						if (Number(btn.getAttribute("data-btn")) > minLength) {
							btn.classList.add("_visible");
						} else {
							btn.classList.remove("_visible");
						}
					});
				} else {
					//игнор первой цифры
					if (Number(event.target.getAttribute("data-btn")) === 1) {
					} else {
						//нормальная зона, показать основные цифры на основе клика
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							if (
								Number(btn.getAttribute("data-btn")) >= min &&
								btn.getAttribute("data-btn") <= max
							) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					}
				}

				const top = main.getBoundingClientRect().top;

				window.scrollBy({
					top: top,
					behavior: "smooth"
				});
			}

			//нажали на правую кнопку
			if (event.target.closest("[data-right]")) {
				const checkArrows = main.querySelector("[data-arrows]");

				// ===================================================================================================

				//игнор если последняя цифра
				if (Number(checkArrows.getAttribute("data-btn")) === contentsLength) {
				} else {
					const arrows = main.querySelector("[data-arrows]");
					arrows.classList.remove("_active");
					arrows.removeAttribute("data-arrows");
					arrows.nextElementSibling.classList.add("_active");
					arrows.nextElementSibling.setAttribute("data-arrows", "");

					//следующий елемент
					const targetElement = arrows.nextElementSibling;

					const att = targetElement.getAttribute("data-btn");
					const modAtt = `[data-content="${att}"]`;

					main.querySelector(modAtt).classList.add("_active");

					// контент
					const contents = main.querySelectorAll("[data-content]");
					contents.forEach((content) => {
						if (content.getAttribute("data-content") === att) {
						} else {
							content.classList.remove("_active");
						}
					});

					const contentsLength = main.querySelectorAll("[data-content]").length;
					const min = Number(att) - 1;
					const max = Number(att) + (CONFIG - 2);

					//danger
					const add = CONFIG - 2;
					const dangerZone = contentsLength - add;

					//основной механизм
					//проверка на опасную зону
					if (Number(targetElement.getAttribute("data-btn")) > dangerZone) {
						//если попало в опасную зону
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							const minLength =
								Number(main.querySelectorAll("[data-content]").length) - CONFIG;

							if (Number(btn.getAttribute("data-btn")) > minLength) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					} else {
						//нормальная зона, показать основные цифры на основе клика
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							if (
								Number(btn.getAttribute("data-btn")) >= min &&
								btn.getAttribute("data-btn") <= max
							) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					}
				}

				const top = main.getBoundingClientRect().top;
				window.scrollBy({
					top: top,
					behavior: "smooth"
				});
			}
			//@нажали на левую кнопку
			if (event.target.closest("[data-left]")) {
				const checkArrows = main.querySelector("[data-arrows]");

				// ===================================================================================================

				//игнор если первая или вторая цифра
				if (
					Number(checkArrows.getAttribute("data-btn")) === 1 ||
					Number(checkArrows.getAttribute("data-btn")) === 2
				) {
					if (Number(checkArrows.getAttribute("data-btn")) === 2) {
						const arrows = main.querySelector("[data-arrows]");
						arrows.classList.remove("_active");
						arrows.removeAttribute("data-arrows");
						arrows.previousElementSibling.classList.add("_active");
						arrows.previousElementSibling.setAttribute("data-arrows", "");

						// контент
						const contents = main.querySelectorAll("[data-content]");
						contents.forEach((content) => {
							if (content.getAttribute("data-content") === 1) {
								content.classList.add("_active");
							}
						});
					}
				} else {
					const arrows = main.querySelector("[data-arrows]");
					arrows.classList.remove("_active");
					arrows.removeAttribute("data-arrows");
					arrows.previousElementSibling.classList.add("_active");
					arrows.previousElementSibling.setAttribute("data-arrows", "");

					//предыдущий елемент
					const targetElement = arrows.previousElementSibling;

					const att = targetElement.getAttribute("data-btn");
					const modAtt = `[data-content="${att}"]`;

					main.querySelector(modAtt).classList.add("_active");

					// контент
					const contents = main.querySelectorAll("[data-content]");
					contents.forEach((content) => {
						if (content.getAttribute("data-content") === att) {
						} else {
							content.classList.remove("_active");
						}
					});

					const contentsLength = main.querySelectorAll("[data-content]").length;
					const min = Number(att) - 1;
					const max = Number(att) + (CONFIG - 2);

					//danger
					const add = CONFIG - 2;
					const dangerZone = contentsLength - add;

					//основной механизм
					//проверка на опасную зону
					if (Number(targetElement.getAttribute("data-btn")) > dangerZone) {
					} else {
						//нормальная зона, показать основные цифры на основе клика
						const btns = main.querySelectorAll("[data-btn]");
						btns.forEach((btn) => {
							if (
								Number(btn.getAttribute("data-btn")) >= min &&
								btn.getAttribute("data-btn") <= max
							) {
								btn.classList.add("_visible");
							} else {
								btn.classList.remove("_visible");
							}
						});
					}
				}

				const top = main.getBoundingClientRect().top;
				window.scrollBy({
					top: top,
					behavior: "smooth"
				});
			}
		});

		// при обновлении добавляет к-во стартовых блоков
		const btns = main.querySelectorAll("[data-btn]");
		btns.forEach((btn) => {
			if (Number(btn.getAttribute("data-btn")) <= CONFIG) {
				btn.classList.add("_visible");
			}
		});
	});
}
myPagination(); // ПАГИНАЦИЯ

function myBurger() {
	if (document.getElementById("header-menu")) {
		const burgerOpen = document.getElementById("menu-open");
		const burgerContent = document.getElementById("menu-content");
		const lockPadding = document.querySelectorAll(".lock-padding");
		const body = document.querySelector("body");

		if (burgerOpen && burgerContent) {
			burgerOpen.addEventListener("click", function () {
				if (!burgerOpen.classList.contains("_active")) {
					burgerContent.classList.add("_active");
					burgerOpen.classList.add("_active");
					bodyLock()
				} else {
					burgerContent.classList.remove("_active");
					burgerOpen.classList.remove("_active");
					bodyUnLock()
				}
			});

			function bodyLock() {
				const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
				if (lockPadding) {
					lockPadding.forEach(elem => {
						elem.style.paddingRight = lockPaddingValue;
					});
				}
				body.style.paddingRight = lockPaddingValue;
				body.classList.add("_lock-scroll");
			}

			function bodyUnLock() {
				if (lockPadding) {
					lockPadding.forEach(elem => {
						elem.style.paddingRight = "0px";
					});
				}
				body.style.paddingRight = "0px";
				body.classList.remove("_lock-scroll");
			}

			if (document.querySelector("[data-popup-open]")) {
				function popupTarget() {
					const buttons = document.querySelectorAll("[data-popup-open]")

					buttons.forEach(button => {
						button.addEventListener("click", function () {
							burgerContent.classList.remove("_active");
							burgerOpen.classList.remove("_active");
						});
					});
				}
				popupTarget()
			}
		}
	}
}
myBurger(); // МЕНЮ БУРГЕР

/* // function myTabs() {
// 	document.addEventListener("click", (e) => {
// 		const elementTarget = e.target;

// 		if (elementTarget.closest("[data-tab-btn]")) {
// 			const att = elementTarget.getAttribute("data-tab-btn");
// 			const modernAtt = `[data-tab="${att}"]`;

// 			elementTarget.closest("[data-tabs]").querySelector(`${modernAtt}`).classList.add("_active");
// 			const buttons = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab-btn]");

// 			buttons.forEach(button => {
// 				button.classList.remove("_active");
// 			});
// 			elementTarget.classList.add("_active");

// 			const tabs = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab]");

// 			tabs.forEach((tab) => {
// 				if (tab.getAttribute("data-tab") === att) {
// 				} else {
// 					tab.classList.remove("_active");
// 				}
// 			});
// 		}
// 	});
// }
// myTabs();

function myTabs() {
	document.addEventListener("click", (e) => {
		const elementTarget = e.target;

		if (elementTarget.closest("[data-tab-btn]")) {
			const att = elementTarget.getAttribute("data-tab-btn");
			const modernAtt = `[data-tab="${att}"]`;

			const itemTab = elementTarget.closest("[data-tabs]").querySelector(`${modernAtt}`);

			itemTab.style.display = "block";
			const buttons = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab-btn]");

			console.log(elementTarget.closest("[data-tabs]").querySelector(`${modernAtt}`).getBoundingClientRect())

			buttons.forEach(button => {
				button.classList.remove("_active");
			});
			elementTarget.classList.add("_active");

			const tabs = elementTarget.closest("[data-tabs]").querySelectorAll("[data-tab]");

			tabs.forEach((tab) => {
				if (tab.getAttribute("data-tab") === att) {
				} else {
					tab.style.display = "none";
				}
			});
		}
	});
}
myTabs();; // ТАБЫ */

/* function myRatingStars() {
	const ratings = document.querySelectorAll(".rating-stars");

	if (ratings.length > 0) {
		let ratingActive, ratingValue;

		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];

			function initRating() {
				ratingVars(rating)
				setRating()

				if (rating.classList.contains("rating-stars_set")) {
					const items = rating.querySelectorAll(".rating-stars__item");
					for (let index = 0; index < items.length; index++) {
						const item = items[index];

						item.style.cursor = "pointer";

						item.addEventListener("mouseenter", function () {
							ratingVars(rating)
							setRating(item.value)
						});
						item.addEventListener("mouseleave", function () {
							setRating()
						});
						item.addEventListener("click", function () {
							ratingVars(rating)

							if (this.getAttribute("data-rating-text")) {
								ratingValue.innerHTML = this.getAttribute("data-rating-text");
							} else {
								ratingValue.innerHTML = index + 1;
							}

							setRating()
						});
					}
				}
			}
			initRating();

			function ratingVars() {
				ratingActive = rating.querySelector(".rating-stars__active");
				ratingValue = rating.querySelector(".rating-stars__value");
			}

			function setRating(index = ratingValue.innerHTML) {
				const ratingActiveWidth = index / 0.05;
				ratingActive.style.width = `${ratingActiveWidth}%`;
			}
		}
	}
}
myRatingStars(); // ЗВЕЗДНЫЙ РЕЙТИНГ */

/* function myForms() {
	const forms = document.querySelectorAll(".form");

	if (forms) {
		forms.forEach(form => {
			form.addEventListener("submit", formSend);

			function formSend(e) {
				let error = 0;

				const items = form.querySelectorAll("._req");

				items.forEach(item => {
					function validEmail() {
						if (item.classList.contains("_email")) {
							const emailValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

							function validateEmail(value) {
								return emailValid.test(value);
							}

							if (!validateEmail(item.value)) {
								form.querySelectorAll("._req._email").forEach(item => {
									item.classList.add("_invalid");
								});
								error++;
							} else {
								form.querySelectorAll("._req._email").forEach(item => {
									item.classList.remove("_invalid");
								});
							}
						}
					}
					validEmail()

					function validPassword() {
						if (item.classList.contains("_password")) {
							const passwords = form.querySelectorAll("._req._password");

							if (passwords) {
								passwords.forEach(password => {
									if (password.value.length < 8) {
										password.classList.add("_invalid")
									} else {
										password.classList.remove("_invalid")
									}
								});
							}
						}
					}
					validPassword()
				});

				if (error > 0) {
					e.preventDefault()
				}
			}
		});
	}
}
myForms(); // ВАЛИДАЦИЯ ФОРМЫ */

//< " СКРИПТЫ " >=============================================================================================================>//

new WOW({
	mobile: false,
	offset: 100,
}).init();

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
}

//< " СКРИПТЫ " >=============================================================================================================>//

function footerNav() {
	const lists = document.querySelectorAll(".footer-menu__sub-list");

	document.addEventListener("DOMContentLoaded", function () {

		lists.forEach(list => {
			const items = list.querySelectorAll(".footer-menu__sub-item");

			if (items.length > 4) {
				items.forEach(item => {
					item.parentElement.style.gridTemplateColumns = "repeat(2, auto)";
				});
			}
		});
	});
}
footerNav()

function showHeaderItems() {
	const actionItems = document.querySelectorAll(".header-actions__item");

	const sizeWindow = 992.2;

	actionItems.forEach(item => {
		item.addEventListener("mouseover", function () {
			if (window.innerWidth > sizeWindow) {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "170px";
				});
			}
		});

		item.addEventListener("mouseout", function () {
			if (window.innerWidth > sizeWindow) {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "0px";
				});
			}
		});

		window.addEventListener("resize", function () {
			if (window.innerWidth > sizeWindow) {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "0px";
				});
			} else {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "100%";
				});
			}
		});

		document.addEventListener("DOMContentLoaded", function () {
			if (window.innerWidth > sizeWindow) {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "0px";
				});
			} else {
				const textItems = item.querySelectorAll(".header-actions__text");

				textItems.forEach(element => {
					element.style.width = "100%";
				});
			}
		});
	});
}
showHeaderItems()

function showText() {
	const items = document.querySelectorAll(".page__text-column");

	items.forEach(item => {
		item.addEventListener("click", function (e) {
			const elementTarget = e.target;

			const texts = item.querySelectorAll(".text-column__item");

			if (elementTarget.closest(".text-column__button")) {
				texts.forEach(text => {
					if (text.style.display = "none") {
						text.style.display = "flex";

						const buttons = document.querySelectorAll(".text-column__button");

						buttons.forEach(button => {
							button.style.display = "none";
						});
					}
				});
			}
		});
	});
}
showText()