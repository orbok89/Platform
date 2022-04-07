 const canvas=document.querySelector('canvas')
 const c = canvas.getContext('2d')
 console.log(c)
 canvas.width=1024
 canvas.height=576
 const gravity= 1

class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.width= 50
        this.height=50
        this.velocity={
            x:0,
            y:1
        }
    
    }
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
            this.draw()
            this.position.y+=this.velocity.y 
            this.position.x+=this.velocity.x 
            this.velocity.y+= gravity
              
    }
}
//oggetto piattaforma
class Platform{
    constructor(x,y ){
        this.position={
            x ,
            y 
        }
        this.width= 200
        this.height=50
        
    }
    draw(){
        c.fillStyle='blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

class Enemy {
    constructor(x,y){
        this.position={
            x,
            y
        }
        this.width= 40
        this.height=40
        this.velocity={
            x:10,
            y:0
        }
    }
    draw(){
        c.fillStyle='green'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    reverse(prova){
        prova=prova+1
        if(prova> 60){
            prova=0
            this.velocity.x = -this.velocity.x
        }
       
        return prova
    }
    update(prova){
        this.draw()
        prova=this.reverse(prova)  
        this.position.x+=this.velocity.x 
         
        return prova
          
}
}
function init(){
    player= new Player()
    platforms= [ new Platform(100, 530),new Platform(300, 530),new Platform(600, 530),new Platform(750, 530),new Platform(1195, 530),new Platform(1400, 430),new Platform(1850, 530),new Platform(2150, 530),new Platform(2300, 530),new Platform(2500, 530),new Platform(2700, 530)]
    enemies=[new Enemy(650,490)]
    scroll_offset=0
    movimento_nemici=0
    contatore=0
}
 const keys={
    rigth:{
        pressed:false
    },
    left:{
        pressed:false
    }
}
 

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    });
    enemies.forEach(enemy=>{
        movimento_nemici= enemy.update(movimento_nemici)
    } );
    //movimento del giocatore
    if (keys.rigth.pressed &&player.position.x<400){
        player.velocity.x=5
    } 
    else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x=-5
    }else{
        player.velocity.x=0
        if(keys.rigth.pressed){
            scroll_offset+=5
            platforms.forEach(platform => {
                platform.position.x-=5
            });
            enemies.forEach(enemy => {
                enemy.position.x-=5
            });
        }else if (keys.left.pressed){
            scroll_offset-=5
            console.log(scroll_offset)
            platforms.forEach(platform => {
                platform.position.x+=5
            });
            enemies.forEach(enemy => {
                enemy.position.x+=5
            });
        }
    }
    //condizioni di vittoria
    if (scroll_offset>500){
        console.log('youwin')
    }
    //condizioni perdita
    if(player.position.y>canvas.height){
        init()
    }
    //collsioni con i nemici
    enemies.forEach(enemy=>{
        if (player.position.x +player.width  >= enemy.position.x &&
            player.position.x   <= enemy.position.x + enemy.width&&
            player.position.y +player.height  >= enemy.position.y &&
            player.position.y   <= enemy.position.y + enemy.height){
            init()
        }
    })
    //collision
    platforms.forEach(platform => {
    if (player.position.y + player.height<=platform.position.y && 
        player.position.y+player.height+player.velocity.y>=platform.position.y &&
        player.position.x + player.width>=platform.position.x &&
        player.position.x <= platform.position.x+ platform.width){
        player.velocity.y=0
    }
});
platforms.forEach(platform => {
    if (player.position.y + player.height<=platform.position.y && 
        player.position.y+player.height+player.velocity.y>=platform.position.y &&
        player.position.x + player.width>=platform.position.x &&
        player.position.x <= platform.position.x+ platform.width){
        player.velocity.y=0
    }
});
}
init()
animate()
function move(keyCode){
   
    switch (keyCode){
        case 65 :
            keys.left.pressed=true
            console.log(player.velocity.y)
            break
        case 83 :
             
            break
        case 68 :
            keys.rigth.pressed=true
         
            break
        case 87 :
            if(player.velocity.y==0){
                contatore=0
            }
            if (contatore<=1 ){
                
                player.velocity.y -= 20
                contatore=contatore+1 
                console.log(player.velocity.y)
                
                
            }
            
            break
    }
}  

function stop(keyCode){
    switch (keyCode){
        case 65 :
            keys.left.pressed=false
            break
        case 83 :
            
            break
        case 68 :
            keys.rigth.pressed=false
           
            break
        case 87 :
           
            break
    }
}

window.addEventListener('keydown',({keyCode})=>{move(keyCode)})
window.addEventListener('keyup',({keyCode})=>{stop(keyCode)})