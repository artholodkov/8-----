document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const nameSelect = document.getElementById('nameSelect');
    const playButton = document.getElementById('playButton');
    const musicPlayer = document.getElementById('musicPlayer');
    const trackName = document.getElementById('trackName');
    const trackArtist = document.getElementById('trackArtist');
    const togglePlayButton = document.getElementById('togglePlayButton');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const audioPlayer = document.getElementById('audioPlayer');
    const disk = document.getElementById('disk');
    
    // Data for each name with paths to their individual folders
    const nameData = {
        'Общее поздравление': {
            description: 'Ооо-о, дизайн-студия, вперёд! Весна зовёт, и мир цветёт! Вы — краски мира, мысли полёт, Пусть счастье дарит каждый поворот!',
            folder: 'assets/сommon_song'
        },
        'Александра': {
            description: 'Александра — лидер, проектам опора, Ты движешь команды, не зная затора! Пусть в жизни успех будет ярким, как свет, А каждый проект принесёт лишь побед!',
            folder: 'assets/Alexandra'
        },
        'Анжелика': {
            description: 'Анжелика, ты звезда, Тестишь чётко, на ура! Жизнь пусть будет в радость, в смех, Пусть в карьере ждет успех!',
            folder: 'assets/Angelika'
        },
        'Аня М': {
            description: 'Сквозь сумрак лжи горит зарница, И голос властный режет мглу. Её скандал — как меч Жар-птицы, Несёт он правду и войну',
            folder: 'assets/Anya_m'
        },
        'Аня Морозова': {
            description: 'Аня, пусть твои глаза Светятся от счастья вновь. 8 марта принесёт Нежность, ласку и любовь.',
            folder: 'assets/Anya_mor'
        },
        'Арина': {
            description: 'Лик Арины солнца лучи, Пусть развеет в сердце все тучи. С праздником весны, добра, Счастья с ночи до утра.',
            folder: 'assets/Arina'
        },
        'Эля': {
            description: 'Элеонора, в этот день — 8 Марта, Пусть улыбка расцветёт, Счастье будет светлым, ярким, И весна в душе поёт!',
            folder: 'assets/Elya'
        },
        'Катя E': {
            description: 'Катя, яркий лучик света, Будь всегда теплом согрета. С праздником весны, цветов, Счастья, радости, стихов!',
            folder: 'assets/Kate_e'
        },
        'Катя П': {
            description: 'Катя всем необходима – И в креативе, и в труде. Грядки вспашет с оптимизмом, Мастер слова и идей!',
            folder: 'assets/Kate_p'
        },
        'Катя C': {
            description: 'Наша Катя – смыслов гуру, Брендинг – верный ей союз. SJ Prom ведёт к триумфу, Мамам дарит верный курс!',
            folder: 'assets/Kate_s'
        },
        'Катя В': {
            description: 'Катя — менеджер от бога, Всем поможет, всех спасёт. Чуткость, стиль и сила духа — С ней команда не падёт!',
            folder: 'assets/Kate_v'
        },
        'Катя Ю': {
            description: 'Катя Юшкова проверенный ас, Разберётся с задачей в момент, в один час. Разрулит все быстро, все схватит в лету, С ней в каждый проект — словно в мечту!',
            folder: 'assets/Kate_y'
        },
        'Лена': {
            description: 'Елена, словно луч весны, Ты светишь радостью и светом. Пусть будут счастливыми дни, А сердце — полным тёплым светом!',
            folder: 'assets/Lena'
        },
        'Маша Ф': {
            description: 'В праздник светлый у Марии Будет много теплых слов. Пусть сбываются скорее Все мечты без лишних слов.',
            folder: 'assets/Masha_f'
        },
        'Полина': {
            description: 'Для Полины в этот день Расцветёт пускай сирень. Счастье будет пусть с тобой В этот праздник светлый твой.',
            folder: 'assets/Polina'
        },
        'Вера': {
            description: 'Пусть тепло тебя согреет, А улыбка дарит свет, Вера, знай, что в этом мире Лучше тебя просто нет!',
            folder: 'assets/Vera'
        },
        'Виктория': {
            description: 'Виктория — имя, что дарит победы, Пусть сбудутся лучшие в жизни сюжеты! Документы в порядке, финансы — в ладу, Успех и удача пусть будут в ходу!',
            folder: 'assets/Vika'
        }
    };
    
    // Enable play button when name is selected
    nameSelect.addEventListener('change', function() {
        playButton.disabled = false;
    });
    
    // Function to find the correct image file by trying different extensions
    function findImageFile(basePath, callback) {
        // Try these extensions in order
        const extensions = ['png', 'jpg', 'jpeg'];
        let extensionIndex = 0;
        
        function tryLoadImage() {
            if (extensionIndex >= extensions.length) {
                console.error("Could not find valid image file");
                callback(null); // No valid image found
                return;
            }
            
            const ext = extensions[extensionIndex];
            const imgPath = `${basePath}.${ext}`;
            const img = new Image();
            
            img.onload = function() {
                // Image loaded successfully
                callback(imgPath);
            };
            
            img.onerror = function() {
                // Try next extension
                extensionIndex++;
                tryLoadImage();
            };
            
            img.src = imgPath;
        }
        
        tryLoadImage();
    }
    
    // Play record when button is clicked
    playButton.addEventListener('click', function() {
        const selectedName = nameSelect.value;
        if (!selectedName) return;
        
        const data = nameData[selectedName];
        
        // Set the correct audio source
        const audioPath = `${data.folder}/audio.mp3`;
        audioPlayer.src = audioPath;
        
        // Setup audio player
        audioPlayer.load();
        
        // Setup track info
        trackName.innerHTML = ''; // Clear previous content
        const descriptionEl = document.createElement('div');
        descriptionEl.className = 'track-description';
        descriptionEl.textContent = data.description;
        trackName.appendChild(descriptionEl);
        trackArtist.textContent = '';  // Clear the artist text
        
        // Set person disk image - try different image formats
        const diskPersona = document.getElementById('diskPersona');
        findImageFile(`${data.folder}/disk_persona`, function(imagePath) {
            if (imagePath) {
                diskPersona.src = imagePath;
                diskPersona.style.opacity = '1';
            } else {
                // If no image found, hide the disk persona
                diskPersona.src = '';
                diskPersona.style.opacity = '0';
                console.warn(`No disk persona image found for ${selectedName}`);
            }
        });
        
        // Show music player
        musicPlayer.classList.add('active');
        
        // Start playing after a short delay
        setTimeout(() => {
            audioPlayer.play()
                .catch(error => {
                    console.error("Error playing audio:", error);
                });
            
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            disk.classList.add('rotating');
            diskPersona.classList.add('rotating');
        }, 1000);
    });
    
    // Toggle play/pause
    togglePlayButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            disk.classList.add('rotating');
            document.getElementById('diskPersona').classList.add('rotating');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            disk.classList.remove('rotating');
            document.getElementById('diskPersona').classList.remove('rotating');
        }
    });
    
    // Update progress bar
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration || 0;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        if (!isNaN(duration)) {
            durationEl.textContent = formatTime(duration);
        }
    });
    
    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // Reset everything when audio ends
    audioPlayer.addEventListener('ended', function() {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        disk.classList.remove('rotating');
        document.getElementById('diskPersona').classList.remove('rotating');
    });
    
    // Handle audio errors
    audioPlayer.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        alert('Не удалось загрузить аудиофайл. Пожалуйста, попробуйте еще раз.');
    });
});