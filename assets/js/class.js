class Character {

    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name){
        this.name = name
    }

    get life(){
        return this._life
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }

}

class Knight extends Character{
    constructor(){
        super('Knight')
        this._life = 100
        this.maxLife = this._life
        this.attack = 15
        this.defense = 8
    }
}

class Wizard extends Character{
    constructor(){
        super('Wizard')
        this._life = 90
        this.maxLife = this._life
        this.attack = 10
        this.defense = 10
    }
}

class Fire extends Character{
    constructor(){
        super('Fire')
        this._life = 80
        this.maxLife = this._life
        this.attack = 12
        this.defense = 8
    }
}

class Orc extends Character{
    constructor(){
        super('Orc')
        this._life = 120
        this.maxLife = this._life
        this.attack = 16
        this.defense = 10
    }
}

class Stage{
    constructor(warrior, enemy, warriorEl, enemyEl, log){
        this.warrior = warrior
        this.enemy = enemy
        this.warriorEl = warriorEl
        this.enemyEl = enemyEl
        this.log = log
    }

    update(){
        // WARRIOR
        this.warriorEl.querySelector('.character-name').innerHTML = `${this.warrior.name}`
        this.warriorEl.querySelector('.attack-value').innerHTML = `${this.warrior.attack}`
        this.warriorEl.querySelector('.defense-value').innerHTML = `${this.warrior.defense}`
        this.warriorEl.querySelector('.character-img')
            .setAttribute('src', `assets/imgs/characters/${this.warrior.name}/${this.warrior.name}-idle.gif`)
        this.warriorEl.querySelector('.character-icon')
            .setAttribute('src', `assets/imgs/characters/${this.warrior.name}/${this.warrior.name}-icon.png`)
        
        // ENEMY
        this.enemyEl.querySelector('.character-name').innerHTML = `${this.enemy.name}`
        this.enemyEl.querySelector('.attack-value').innerHTML = `${this.enemy.attack}`
        this.enemyEl.querySelector('.defense-value').innerHTML = `${this.enemy.defense}`
        this.enemyEl.querySelector('.character-img')
            .setAttribute('src', `assets/imgs/characters/${this.enemy.name}/${this.enemy.name}-idle.gif`)
        this.enemyEl.querySelector('.character-icon')
            .setAttribute('src', `assets/imgs/characters/${this.enemy.name}/${this.enemy.name}-icon.png`)
    }

    start(){

        const imgWarrior = this.warriorEl.querySelector('.character-img')
        const imgEnemy = this.enemyEl.querySelector('.character-img')

        this.warriorEl.querySelector('.attack-button').addEventListener('click', ()=> {
            this.doAttack(this.enemy, this.warrior, imgEnemy, imgWarrior)
            this.warriorEl.querySelector('.character-img')
                .setAttribute('src', `assets/imgs/characters/${this.warrior.name}/${this.warrior.name}-attack.gif`)
        })

        this.enemyEl.querySelector('.attack-button').addEventListener('click', ()=>{
            this.doAttack(this.warrior, this.enemy, imgWarrior, imgEnemy)
            this.enemyEl.querySelector('.character-img')
                .setAttribute('src', `assets/imgs/characters/${this.enemy.name}/${this.enemy.name}-attack.gif`)
        })

        this.update()
    }

    changeLife(){
        //WARRIOR
        let warriorLife = (this.warrior.life / this.warrior.maxLife) * 100
        this.warriorEl.querySelector('.bar').style.width = `${warriorLife}%`
        //ENEMY
        let enemyLife = (this.enemy.life / this.enemy.maxLife)*100
        this.enemyEl.querySelector('.bar').style.width = `${enemyLife}%`
    }

    doAttack(attacked, attacking, imgAttacked, imgAttacking){
        // FIGHT END
        if(attacking.life <= 0){
            this.log.addMessage(`${attacking.name} MORREU`)
            imgAttacking.setAttribute('src', `assets/imgs/characters/${attacking.name}/${attacking.name}-death.gif`)
            return
        } else if(attacked.life <= 0){
            this.log.addMessage(`${attacked.name} MORREU`)
            imgAttacked.setAttribute('src', `assets/imgs/characters/${attacked.name}/${attacked.name}-death.gif`)
            return
        }

        // ATTACK & DEFENSE FACTOR
        let attackFactor = (Math.random()*2).toFixed(2)
        let actualAttack = attacking.attack * attackFactor

        let defenseFactor = (Math.random()*2).toFixed(2)
        let actualDefense = attacked.defense * defenseFactor

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu se defender`)
        }

        imgAttacked.setAttribute('src', `assets/imgs/characters/${attacked.name}/${attacked.name}-idle.gif`)

        this.changeLife()
    }
    
}

class Log{
    list = []
    constructor(listEl){
        this.listEl = listEl
    }
    addMessage(message){
        this.list.push(message)
        this.render()
    }
    render(){
        this.listEl.innerHTML = ''
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}