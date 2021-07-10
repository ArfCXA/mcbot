const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right', 'jump']
var lastaction;
var pi = 3.14159;
var moveinterval = 0; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]
var bot = mineflayer.createBot({
  host: host,
  username: username
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){
	console.log("Logged In")
	bot.chat("hello");
});






bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});



let target = null

bot.on('chat', (username, message) => {
	if (message !== bot.username) return
	bot.chat('dalem mas');
	bot.chat('ada apa?')
});

bot.on('chat', (username, message) => {
	if (message !== 'halo') return
	bot.chat('halo juga');
});


bot.on('chat', (username, message) => {
	
	
  if (entity !== null) {
      if (entity.type === 'player') {
				
  target = bot.players[username].entity
  let entity
  switch (message) {
    case 'forward':
      bot.setControlState('forward', true)
      break
    case 'back':
      bot.setControlState('back', true)
      break
    case 'left':
      bot.setControlState('left', true)
      break
    case 'right':
      bot.setControlState('right', true)
      break
    case 'sprint':
      bot.setControlState('sprint', true)
      break
    case 'stop':
      bot.clearControlStates()
      break
    case 'jump':
      bot.setControlState('jump', true)
      bot.setControlState('jump', false)
      break
    case 'jump a lot':
      bot.setControlState('jump', true)
      break
    case 'stop jumping':
      bot.setControlState('jump', false)
      break
    case 'attack':
      entity = bot.nearestEntity()
      if (entity) {
        bot.attack(entity, true)
      } else {
        bot.chat('no nearby entities')
      }
      break
    case 'mount':
      entity = bot.nearestEntity((entity) => { return entity.type === 'object' })
      if (entity) {
        bot.mount(entity)
      } else {
        bot.chat('no nearby objects')
      }
      break
    case 'dismount':
      bot.dismount()
      break
    case 'move vehicle forward':
      bot.moveVehicle(0.0, 1.0)
      break
    case 'move vehicle backward':
      bot.moveVehicle(0.0, -1.0)
      break
    case 'move vehicle left':
      bot.moveVehicle(1.0, 0.0)
      break
    case 'move vehicle right':
      bot.moveVehicle(-1.0, 0.0)
      break
    case 'tp':
      bot.entity.position.y += 10
      break
    case 'pos':
      bot.chat(bot.entity.position.toString())
      break
    case 'yp':
      bot.chat(`Yaw ${bot.entity.yaw}, pitch: ${bot.entity.pitch}`)
      break
  }
			}
	}
})

bot.once('spawn', () => {
  // keep your eyes on the target, so creepy!
  setInterval(watchTarget, 50)

  function watchTarget () {
    if (!target) return
    bot.lookAt(target.position.offset(0, target.height, 0))
  }
})

bot.on('mount', () => {
  bot.chat(`mounted ${bot.vehicle.objectType}`)
})

bot.on('dismount', (vehicle) => {
  bot.chat(`dismounted ${vehicle.objectType}`)
})