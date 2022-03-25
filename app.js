// definir la zone de dessin
const canvas = document.querySelector('canvas')
// definir me contexte
const ctx = canvas.getContext('2d')
// gerer le scrore
const affichagescore =  document.querySelector('.score')
//
let x = canvas.width/2  , y = canvas.height - 30  , rayon = 10 

let barreheight= 10 , barrewith = 75     , xbarre = ( canvas.width - barrewith) / 2  , ybarre = canvas.height - barreheight -10 

// pour le tableau de brique 
let briqueHauteur = 20
let briqueLargeur = 70 
let nblignes = 5
let nbcolonne = 8
fin = false
// declaration tableau et replissage
const briques  = []
for ( i=0 ; i < nblignes ; i++)
{
    briques[i] = []
    for ( j=0 ; j<nbcolonne ; j++)
    {
        // definir x et y 
        let bx = j * ( briqueLargeur+ 10) +35
        let by = i * ( briqueHauteur + 10 ) +30
        briques[i][j]  = { x :bx , y : by , statut : 1 }
    }
}

// desiner les briques
function dessinebriques()

{
    for ( i=0 ; i < nblignes ; i++)
{
    
    for ( j=0 ; j<nbcolonne ; j++)
    {
       // dessiner la brique
       if(briques[i][j].statut)
       {
                ctx.beginPath() 
                ctx.rect(briques[i][j].x , briques[i][j].y , briqueLargeur , briqueHauteur )
                ctx.fillStyle = '#333'
                ctx.fill()
                ctx.closePath()
       }

    }
}
}


// définir vitesse de la balle
vitesseX = 5, vitesseY = -5
score = 0

// dessiner la balle 
function dessineBalle()
{
    ctx.beginPath() 
    ctx.arc( x , y , rayon, 0 , Math.PI*2);
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

function dessinePalet(){
    ctx.beginPath() 
    ctx.rect(xbarre , ybarre , barrewith , barreheight )
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
    
}



function dessine(){
    //
    if( fin === false){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        dessinePalet()
        dessinebriques()
        dessineBalle()
        collision()
        //Collission droite
        if(x + vitesseX > canvas.width - rayon ){
            if(vitesseX < 0){
                vitesseX-= 0.05
            }else{
                vitesseX+= 0.05
            }
            vitesseX = -vitesseX
            console.log(vitesseX + 'x')
        }
        // Gauche
        if(x + vitesseX < 0){
            if(vitesseX < 0){
                vitesseX-= 0.05
            }else{
                vitesseX+= 0.05
            }
            vitesseX = -vitesseX
            console.log(vitesseX + 'x')
        }

        // Haut
        if(y + vitesseY < 0){
            if(vitesseY < 0){
                vitesseY-= 0.05
            }else{
                vitesseY+= 0.05
            }
            vitesseY = -vitesseY
            console.log(vitesseY + 'y')
        }
        // Bas, Perdu
        if(y + vitesseY > canvas.height - rayon){
            if(x > xbarre && x < xbarre + barrewith){
                if(vitesseY < 0){
                    vitesseY-= 0.05
                }else{
                    vitesseY+= 0.05
                }
                vitesseY = -vitesseY
                console.log(vitesseY + 'y')
            }else{
                fin = true
                affichagescore.innerHTML = "perdu"
            }
        }
    
        x = x + vitesseX
        y = y + vitesseY
        requestAnimationFrame(dessine)
    }
}

function collision(){
    for(let i = 0; i < nblignes; i++){
        for(let j = 0; j < nbcolonne; j++){
            let b = briques[i][j]
            if(b.statut===1){
                //test collision
                if( x > b.x && x < b.x + briqueLargeur && y > b.y && y < b.y + briqueHauteur){
                    b.statut = 0
                    if(vitesseY < 0){
                        vitesseY-= 0.1
                    }else{
                        vitesseY+= 0.1
                    }
                    vitesseY = -vitesseY
                    score++ 
                    affichagescore.innerHTML = score
                }
            }
        }
    }
}

function collisionPallet(){
    if(x > xbarre && x < xbarre + barreheight){
        vitesseY = -vitesseY
    }

}

document.addEventListener('mousemove', mouvementSouris)
function mouvementSouris(e){
    xbarre = e.clientX - canvas.offsetLeft

}

dessine()