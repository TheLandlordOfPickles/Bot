const textFeld = document.getElementById('text')

const servers = ['myServer', 'otherServer', 'anotherServer']

const u = undefined
const n = null

var text = ''

function write(newText) {
    text += newText
    textFeld.innerHTML = `${text}`
}

function random(min, max, howMuch) {
    var limit
    var decimal

    if (min === undefined) {
        min = 0
    }
    if (max === undefined) {
        max = 1
    }

    limit = max-min

    if (howMuch === undefined) {
        howMuch = 0
    }

    decimal = Math.pow(10, howMuch)

    return min + ((Math.floor((Math.random()*limit)*decimal))/decimal)
}


function showPoem() {
    var number = random(0, poam.name.length)
    var fullName = poam.name[number] + '<br>' + poam.text[number]
    
    write(fullName)
}

function showServers() {
    var serverList = '<br><br>'
    for (i=0; i<servers.length;i++) {
        serverList += `${servers[i]}<br>`
    }

    write(serverList)
}



function print() {
    showPoem()
    showServers()
}

print()