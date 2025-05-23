const knight = new Knight()
const orc = new Orc()
let log = new Log(document.querySelector('#log'))

const stage = new Stage(
    knight,
    orc,
    document.querySelector('#warrior'),
    document.querySelector('#enemy'),
    log
)

stage.start()