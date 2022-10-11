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
}

if (document.querySelector(".video-reviews__slider")) {
	new Swiper(".video-reviews__slider", {
		spaceBetween: 20,
		grabCursor: true,
		speed: 800,
		loop: true,


		navigation: {
			nextEl: ".video-reviews-slider__arrow_next.swiper-button-next",
			prevEl: ".video-reviews-slider__arrow_prev.swiper-button-prev",
		},

		pagination: {
			el: ".video-reviews-slider__pagination.swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},

		breakpoints: {
			768.2: {

			},
		}
	});
}

if (document.querySelector(".blog-section-slider")) {
	new Swiper(".blog-section-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
		speed: 800,
		loop: true,

		navigation: {
			nextEl: ".blog-section-slider__arrow.swiper-button-next",
			prevEl: ".blog-section-slider__arrow.swiper-button-prev",
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

//уникализация (замена document на main)
const mains = document.querySelectorAll("[data-select-main]");
mains.forEach((main) => {
	main.addEventListener("click", (event) => {
		// туда куда нажали открывать и добавлять стрелку, остальные закрывать и убирать стрелки
		if (event.target.closest("[data-select-btn]")) {
			const eTarget = event.target.closest("[data-select-main]");

			const checkMains = document.querySelectorAll("[data-select-main]");
			checkMains.forEach((checkMain) => {
				if (checkMain === eTarget) {
				} else {
					checkMain
						.querySelector("[data-select-body]")
						.classList.remove("_active");
					checkMain
						.querySelector("[data-select-arrow]")
						.classList.remove("_active");
					checkMain
						.querySelector("[data-select-btn]")
						.classList.remove("_active");
				}
			});
		}

		//если нажали на кнопку, показать или спрятать: боди и стрелку
		if (event.target.closest("[data-select-btn]")) {
			main.querySelector("[data-select-body]").classList.toggle("_active");
			main.querySelector("[data-select-btn]").classList.toggle("_active");
			main.querySelector("[data-select-arrow]").classList.toggle("_active");
		}

		//если нажали на сам селект, взять его текст всунуть в кнопку, спрятать боди, убрать стрелку
		if (event.target.closest("[data-selected]")) {
			const innerText = event.target.closest("[data-selected]").innerHTML;

			main.querySelector("[data-select-btn-name]").innerHTML = innerText;
			main.querySelector("[data-select-body]").classList.remove("_active");
			main.querySelector("[data-select-arrow]").classList.remove("_active");
			main.querySelector("[data-select-btn]").classList.remove("_active");
		}
	});
});

//если нажали куда то кроме кнопки и селекта, то просто скрыть все боди и убрать все стрелки
document.addEventListener("click", (event) => {
	if (
		!event.target.closest("[data-select-btn]") &&
		!event.target.closest("[data-select-body]")
	) {
		const mains = document.querySelectorAll("[data-select-main]");

		mains.forEach((main) => {
			main.querySelector("[data-select-body]").classList.remove("_active");
			main.querySelector("[data-select-arrow]").classList.remove("_active");
			main.querySelector("[data-select-btn]").classList.remove("_active");
		});
	}
});
; // КАСТОМНЫЙ СЕЛЕКТ

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

function textareaValue() {
	const textareaItems = document.querySelectorAll(".field__item-textarea");

	textareaItems.forEach(item => {
		item.addEventListener("input", function (e) {
			const elementTarget = e.target;

			const textarea = item.querySelector(".field__textarea");

			if (elementTarget.closest(".field__textarea")) {
				let textareaValue = textarea.value.length;
				let text = item.querySelector(".field__textarea-value").innerText;
				text = textareaValue;
				item.querySelector(".field__textarea-value").innerText = textareaValue;
			}
		});
	});
}
textareaValue()

const furniture = document.querySelector('.gallery-block__body');
if (furniture && !isMobile.any()) {
	const furnitureItems = document.querySelector('.gallery-block__column');
	const furnitureColumn = document.querySelectorAll('.gallery-block__row_parallax');

	const speed = furniture.dataset.speed;

	let positionX = 0;
	let coordXprocent = 0;

	function setMauseGalleryStyle() {
		let furnitureItemsWidth = 0;
		furnitureColumn.forEach(elemen => {
			furnitureItemsWidth += elemen.offsetWidth;
		});

		const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
		const distX = Math.floor(coordXprocent - positionX);

		positionX = positionX + (distX * speed);
		let position = furnitureDifferent / 200 * positionX;

		furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setMauseGalleryStyle);
		} else {
			furniture.classList.remove('_init');
		}
	}
	furniture.addEventListener("mousemove", function (e) {
		if (window.innerWidth > 1024.2) {
			const furnitureWidth = furniture.offsetWidth;
			const coordX = e.pageX - furnitureWidth / 2;

			coordXprocent = coordX / furnitureWidth * 200;

			if (!furniture.classList.contains('_init')) {
				requestAnimationFrame(setMauseGalleryStyle);
				furniture.classList.add('_init');
			}
		}
	});
}

function inputFile() {
	const mains = document.querySelectorAll("[data-input-file-main]");
	mains.forEach((main) => {
		const input = main.querySelector("[data-input-file]");
		const inputText = main.querySelector("[data-input-file-text]");

		const cfgMaxSymbols = Number(
			main
				.querySelector("[data-input-file-text]")
				.getAttribute("data-input-file-max-symbols")
		);
		const cfgMaxSize = Number(
			main
				.querySelector("[data-input-file-maxsize]")
				.getAttribute("data-input-file-maxsize")
		);

		// проверка к-во букв у изначального текста, если больше указаного максимума добавить три точки
		if (inputText.innerText.split("").length > cfgMaxSymbols) {
			inputText.innerText =
				inputText.innerText.split("").slice(0, cfgMaxSymbols).join("") + "...";
		}

		// обработчик
		input.addEventListener("change", (event) => {
			//проверка на тип файла
			for (const file of input.files) {
				if (
					file.type === "image/png" ||
					file.type === "image/jpeg" ||
					file.type === "image/svg+xml"
				) {
					// это графический файл
					inputText.classList.remove("_active");
				} else {
					// это не графический файл
					inputText.innerText = "only png, jpeg, svg";
					return;
				}
			}

			// проверка на вес файла
			let bytes = 0;
			for (const file of input.files) {
				bytes = +file.size;
			}
			const MB = cfgMaxSize;
			const root = Math.pow(1024, 2);
			const convertInBite = MB * root;

			if (bytes > convertInBite) {
				// файл > cfgMaxSize
				main
					.querySelector("[data-input-file-maxsize]")
					.classList.add("_active");
				return;
			} else {
				// файл < cfgMaxSize
				main
					.querySelector("[data-input-file-maxsize]")
					.classList.remove("_active");
			}

			// проеврка на к-во файлов
			if (input.files.length > 1) {
				// больше одного файла

				inputText.innerText = "files selected";
			} else {
				// один файл

				for (const file of input.files) {
					// проверка на к-во символов
					if (file.name.split("").length > cfgMaxSymbols) {
						// символов в имени файла > cfgMaxSymbols

						inputText.innerText =
							file.name.split("").slice(0, cfgMaxSymbols).join("") + "...";
					} else {
						// символов в имени файла < cfgMaxSymbols

						inputText.innerText = file.name;
					}
				}
			}
		});
	});
}
inputFile();

function addFile() {
	const buttons = document.querySelectorAll("[data-file-add]")

	buttons.forEach(button => {
		fileAction(button)
	});

	function fileAction(button) {
		button.addEventListener("click", function () {
			if (!button.classList.contains("_active")) {
				button.classList.add("_active");
				addBlock()
				inputFile()

				if (button.classList.contains("_active")) {
					setTimeout(() => {
						button.classList.remove("_active");
					}, 300);
				}

				const items = document.querySelectorAll(".remote__file");

				if (items.length >= 5) {
					button.remove();
				}
			}
		});
	}

	function addBlock() {
		const files = document.querySelector('.remote-field__row');

		let template = `
		<div class="remote__file remote-file wow animate__animated animate__fadeIn" data-wow-duration="0.8s" data-input-file-main>
			<div class="remote-file__label">
				Upload Photos Or Send Photos
			</div>
			<div class="remote-file__item">
				<div class="remote-file__input">
					<div class="remote-file__input-text">
						<span data-input-file-text data-input-file-max-symbols="25">
							File is not selected
						</span>
					</div>
					<button class="remote-file__input-btn">
						<form class="remote-file__input-form" method="post"
							enctype="multipart/form-data">
							<label class="input-file">
								<input data-input-file type="file" name="file" multiple>
								<span>Select</span>
							</label>
						</form>
					</button>
				</div>
				<div class="remote-file__max-size" data-input-file-maxsize="10">
					Max. file size 10 MB
				</div>
			</div>
		</div>
		`

		files.insertAdjacentHTML("beforeEnd", template);
	}
}
addFile()

function remoteCatalog() {
	const buttons = document.querySelectorAll(".remote-catalog__button");

	buttons.forEach(button => {
		button.addEventListener("click", function () {
			if (!button.classList.contains("_active")) {
				buttons.forEach(button => {
					button.classList.remove("_active");
				});

				button.classList.add("_active");
			} else {
				button.classList.remove("_active");
			}
		});
	});
}
remoteCatalog()

function addComment() {
	const inputName = document.querySelector("#comment-name");
	const textareaText = document.querySelector("#comment-textarea");
	const button = document.querySelector("[data-button-comment]");

	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let date = new Date();

	const dataItem = innerHTML = date.toJSON().slice(8, 10).replace(/-/g, ' ') + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

	if (button) {
		button.addEventListener("click", function () {
			if (inputName.value.length > 1 && textareaText.value.length > 5) {
				if (!button.classList.contains("_active")) {
					button.classList.add("_active");
					addCommentItem()

					inputName.value = "";
					textareaText.value = "";
					document.querySelector("#comment-email").value = "";
					document.querySelector(".field__textarea-value").innerText = "0"

					if (button.classList.contains("_active")) {
						setTimeout(() => {
							button.classList.remove("_active");
						}, 300);
					}
				}
			}
		});
	}

	function addCommentItem() {
		const commentList = document.querySelector('.blog-comments__items');

		let template;

		if (window.innerWidth > 480) {
			template = `
				<article class="blog-comments-items__comment">
					<i class="blog-comments-items__icon blog-comments-items__icon_pc">
						<img src="img/page/blog/icon-comment.svg" alt="icon-comment">
					</i>
					<div class="blog-comments-items__text-block">
						<div class="blog-comments-items__item">
							<i class="blog-comments-items__icon blog-comments-items__icon_mobile">
								<img src="img/page/blog/icon-comment.svg" alt="icon-comment">
							</i>
							<h5 class="blog-comments-items__name">
								${inputName.value}
							</h5>
							<span class="blog-comments-items__data">
								${dataItem}
							</span>
						</div>
						<p class="blog-comments-items__text">
							${textareaText.value}
						</p>
					</div>
				</article>
				`
		} else {
			template = `
			<article class="blog-comments-items__comment">
				<i class="blog-comments-items__icon blog-comments-items__icon_pc">
					<img src="img/page/blog/icon-comment.svg" alt="icon-comment">
				</i>
				<div class="blog-comments-items__text-block">
					<div class="blog-comments-items__item">
						<i class="blog-comments-items__icon blog-comments-items__icon_mobile">
							<img src="img/page/blog/icon-comment.svg" alt="icon-comment">
						</i>
						<h5 class="blog-comments-items__name">
							${inputName.value}
						</h5>
					</div>
				</div>
				<p class="blog-comments-items__text">
					${textareaText.value}
				</p>
				<span class="blog-comments-items__data">
					${dataItem}
				</span>
			</article>
			`
		}

		commentList.insertAdjacentHTML("beforeEnd", template);
	}
}
addComment()

function adaptiveComment() {
	const items = document.querySelectorAll(".blog-comments-items__comment");

	window.addEventListener("resize", commentAction);
	document.addEventListener("DOMContentLoaded", commentAction);

	function commentAction() {
		items.forEach(item => {
			const itemData = item.querySelector(".blog-comments-items__data");
			const itemText = item.querySelector(".blog-comments-items__text");

			if (window.innerWidth < 480.2) {
				item.appendChild(itemText);
				item.appendChild(itemData);
			} else {
				item.querySelector(".blog-comments-items__text-block").appendChild(itemText);
				item.querySelector(".blog-comments-items__item").appendChild(itemData);
			}
		});
	}
}
adaptiveComment()