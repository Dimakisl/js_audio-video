export const radioPlayerInit = () => {
	const radio = document.querySelector('.radio');
	const radioNavigation = document.querySelector('.radio-navigation');
	const radioHeaderBig = document.querySelector('.radio-header__big');
	const radioCoverImg = document.querySelector('.radio-cover__img');
	const radioItem = document.querySelectorAll('.radio-item');
	const radioStop = document.querySelector('.radio-stop');
	const radioVolume = document.querySelector('.radio-volume');
	const radioMute = document.querySelector('.radio-mute');

	let prevVolume = 1;

	const audio = new Audio();
	audio.type = 'audio/aac';

	radioStop.disabled = true;

	const changeIconPlay = () => {
		if(audio.paused){
			radio.classList.remove('play');
			radioStop.classList.add('fa-play');
			radioStop.classList.remove('fa-stop');
		}else{
			radio.classList.add('play');
			radioStop.classList.add('fa-stop');
			radioStop.classList.remove('fa-play');
		}
	}

	const selectItem = (elem) => {
		radioItem.forEach((item) => item.classList.remove('select'));
		elem.classList.add('select');
	}

	radioNavigation.addEventListener('change', (e) => {
		const target = e.target;
		const parent = target.closest('.radio-item');
		selectItem(parent);

		const title = parent.querySelector('.radio-name').textContent;
		radioHeaderBig.textContent = title;

		const UrlImg = parent.querySelector('.radio-img').src;
		radioCoverImg.src = UrlImg;


		audio.src = target.dataset.radioStantion;
		radioStop.disabled = false;

		audio.play();
		changeIconPlay();
	})

	radioStop.addEventListener('click', () => {
		if(audio.paused){
			audio.play();
		} else{
			audio.pause();
		}
		changeIconPlay();
	})

	radioVolume.addEventListener('input', () => {
		audio.volume = radioVolume.value / 100;
		prevVolume = audio.volume;
	});

	radioMute.addEventListener('click', () => {
		
		if(audio.volume){
			prevVolume = audio.volume;
			audio.volume = 0;
		} else{
			audio.volume = prevVolume
		}
	})

	radioPlayerInit.stop = () => {
		audio.pause();
		changeIconPlay();
	}



}  