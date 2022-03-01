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
            if (this.position.y+this.height+this.velocity.y<= canvas.height)
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
function init(){
        player= new Player()
  platforms= [ new Platform(100, 530),new Platform(300, 530),new Platform(600, 530),new Platform(750, 530),new Platform(1200, 530)]
    
  scroll_offset=0
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
        }else if (keys.left.pressed){
            scroll_offset-=5
            console.log(scroll_offset)
            platforms.forEach(platform => {
                platform.position.x+=5
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
    //collision
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
            break
        case 83 :
            console.log('down')
            break
        case 68 :
            keys.rigth.pressed=true
         
            break
        case 87 :
            if (player.velocity.y===0 ){
                player.velocity.y -= 20    
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