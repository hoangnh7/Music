const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('.progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const btnPause = $('.icon-pause');
const btnPlaying = $('.icon-play')
const app={
    currentSong: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Em Dong Y',
            singer : 'Duc Phuc - 911',
            path: './assets/music/EmDongYIDo-DucPhucx911-8679310.mp3',
            image: './assets/img/maxresdefault.jpg'
        },
        {
            name: 'Mong Mot Ngay Anh Nho Den Em',
            singer : 'Huỳnh Jámes Pinboiz',
            path: './assets/music/MongMotNgayAnhNhoDenEm-HuynhJamesPjnboys-8653756.mp3',
            image:'./assets/img/pinbou.jpg'

        },
        {
            name: 'Waiting for you',
            singer : 'MONO',
            path: './assets/music/WaitingForYou-MONOOnionn-7733882.mp3',
            image: './assets/img/mono.jpg'
        }
        ,
        {
            name: 'Anh sẽ mạnh mẽ yêu em',
            singer : 'Mr.Siro',
            path: './assets/music/mrsiro.mp3',
            image: './assets/img/siro.jpg'
        },
      
    ],
    renderSong(){
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song ${index == this.currentSong ? 'active' :'' }">
            <div class="thumb" style="background-image: url(${song.image})">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>

            ` 
        })
        // console.log(htmls)
        $('.playlist').innerHTML = htmls.join('');
       
    },
    handleEvent(){
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // Xử lý CD quay 
        const cdThumAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration :10000,
            interations: Infinity
        })
        cdThumAnimate.pause();
        // Xử lý phóng to thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY ||document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ?  newCdWidth + 'px' : 0 ;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        
        //xử lý play audio
        playBtn.onclick = function(){
            // audio.src = _this.songs.path[0];
            // audio.src = _this.songs[_this.currentSong].path;
            // console.log(_this.songs[0].path)
            if (_this.isPlaying === false){
                audio.play();
                cdThumAnimate.play();
                _this.isPlaying = true;
                btnPause.style.display = 'block';
                btnPlaying.style.display = 'none';
            }
            else {
                audio.pause();
                cdThumAnimate.pause();
                _this.isPlaying = false;
                btnPause.style.display = 'none';
                btnPlaying.style.display = 'block';
            }
        }

        // xử lý khi nhấn random

        randomBtn.onclick = function(){
            if (_this.isRandom === false){
                _this.isRandom = true;
                randomBtn.classList.add('active') ;
                
            } else {
                _this.isRandom = false;
                randomBtn.classList.remove('active') ;

            }
       
            
        }
        //xử lý khi nhấn next 
        nextBtn.onclick = function(){
            if (_this.isRandom){
                _this.playRandomSong();
            }
            else {

                _this.currentSong++;
                if(_this.currentSong >= _this.songs.length){
                    _this.currentSong = 0;
                    
                }
            }
            _this.playcurrentSong();
            _this.renderSong();
            audio.play();
            console.log(_this.currentSong)
            // if (currentSong++)
        }
        // xử lý khi nhấn prev
        prevBtn.onclick = function(){
            if (_this.isRandom){
                _this.playRandomSong();
            } else {
                _this.currentSong--;

                if(_this.currentSong < 0 ){
                    _this.currentSong = _this.songs.length;

                }
                // _this.currentSong--;


            }
            _this.playcurrentSong();
            _this.renderSong();

            audio.play();
            console.log(_this.currentSong)
         
            // if (currentSong++)
        }
    },
    playRandomSong(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentSong)
        this.currentSong = newIndex;
        

    },
    playcurrentSong(){
        
       
        if (this.isPlaying === true){
            // console.log(this.isPlaying);
            btnPause.style.display = 'none';
            btnPlaying.style.display = 'block';
    
        } else {
            btnPause.style.display = 'block';
            btnPlaying.style.display = 'none';
    
        }
        audio.src = this.songs[this.currentSong].path;
        heading.innerText = this.songs[this.currentSong].name;
        cdThumb.style.backgroundImage = `url(${this.songs[this.currentSong].image})`;
    },
    start(){
       
        
        console.log(this.isPlaying)
        this.renderSong();
        this.playcurrentSong();

        this.handleEvent();
        this.playRandomSong();
        // this.playcurrentSong();
    }
}
app.start();