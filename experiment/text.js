lexeis = {
    nucleus: [],
    sequi: [],  //nested array  [nucleus number][nucleus line]
    totalQ: [], //nested array  [nucleus number][nucleus line]
    totalP: []  //nested array  [nucleus number][nucleus line]
}

poam = {
    name: ['Dievozolu trijotna', 'Jūra', 'Ibikusa dzērves', 'Meža jaukums', 'Laivenieks'],
    text: ['kur kaibaliņa glaužas pie vecās daugavas, tur laimas laikos zēla trīs dievu ozoli.',
        'stipri kaltas jūru bļodas krūģa čakliem Budreļiem; klintīs cirstas viņu grodas izrotātiem mudeļiem.',
        'dēļ braucienu un dziesmu kaŗa reiz grieķi klīda baru bariem uz zemes sleju Korintu, kur arī devās Ibikus. tam Apols deva dziesmu garu un dziesmu skaņu dailību. tā staigā tas ar ceļa zizli iz Reģijas, pilns dievības.',
        'svētā, jaukā, klusā meža ēnā labprāt sapņoju, kad ziedons smej, tad, kad zvaigznes harmonijā lēnā līdz ar mēnesnīci mierā dej. tad, kad putni čirkst, tad, kad strauti švirkst, un kad puķu smarša visur dveš, teicu tevi, jaukais mežs!',
        'laivā lēni līgodamies, šurpu turpu sviežu irkļi, elpdams vēsā mēnestiņā, tinos jaukos, skaistos sapņos; peldēt ļaudams laiviņai, skatos sudrabiņa plūdos, tur, kur zvaigznes mirdz un laistās, atkal rotāju ar irkli.'
    ]
}



function isNewNucleus(word) {
    for (i=0; i<lexeis.nucleus.length; i++) {
        if (word == lexeis.nucleus[i]) {
            return false
        }
    }
    return true
}

function gainIndex(word, which, index) {
    if (which == 'nucleus') {
        for (i=0; i<lexeis.nucleus.length; i++) {
            if (word == lexeis.nucleus[i]) {
                return i
            }
        }
        console.log('gainIndex: failed')
        return undefined
    } else if (which == 'sequi') {
        for (i=0; i<lexeis.sequi[index].length; i++) {
            if (word == lexeis.sequi[index][i]) {
                return i
            }
        }
        console.log('gainIndex: failed')
        return undefined
    } else {
        console.log('gainIndex: forgot specification')
        return undefined
    }
}

function isNewSequi(index, sequi) {
    if (sequi == undefined) {
        return 'textEnded'
    }
    for (i=0; i<lexeis.sequi[index].length; i++) {
        if (sequi == lexeis.sequi[index][i]) {
            return false
        }
    }
    return true
}

function recalculatePercentage(index) {
    var count = 0
    for (i=0; i<lexeis.totalQ[index].length; i++) {
        count += lexeis.totalQ[index][i]
    }
    for (i=0; i<lexeis.totalQ[index].length; i++) {
        lexeis.totalP[index][i] = lexeis.totalQ[index][i]/count
    }
}



function analyseText() {
    var tempText = []
    var tempArray = []

    for (line=0; line<poam.text.length; line++) {
        tempText[line] = poam.text[line]
        tempArray[line] = tempText[line].split(' ') //turns the words and punctuation into seperate array strings

        //the word & it's environment gets checked and processed
        for (nucl=0; nucl<tempArray[line].length; nucl++) {
            var index
            var nextInd
            var tempNestedArray = []

            //checks if the word is already in the list
            if (isNewNucleus(tempArray[line][nucl])) {
                lexeis.nucleus[(lexeis.nucleus.length)] = tempArray[line][nucl]

                index = gainIndex(tempArray[line][nucl], 'nucleus')

                //adds the nested arrays
                lexeis.sequi[index] = tempNestedArray
                lexeis.totalQ[index] = tempNestedArray
                lexeis.totalP[index] = tempNestedArray
            }

            //gains the index of the nucleus
            index = gainIndex(tempArray[line][nucl], 'nucleus')
            
            // \/ BROKEN \/

            //checks if the following word is already in it's list 
            //and wether or not the it is the end of the sentence
            if (isNewSequi(index, tempArray[line][(nucl+1)])) {
                lexeis.sequi[index][(lexeis.sequi[index].length)] = tempArray[line][nucl+1]

                nextInd = gainIndex(tempArray[line][nucl+1], 'sequi', index)

                lexeis.totalQ[index][nextInd] = 1
                recalculatePercentage(index)

            } else if (isNewSequi(index, tempArray[line][nucl+1]) == 'textEnded') {
                lexeis.sequi[index][(lexeis.sequi[index].length)] = 'theSentenceHasEnded'

                nextInd = gainIndex(tempArray[line][nucl+1], 'sequi', index)

                lexeis.totalQ[index][nextInd] = 1
                recalculatePercentage(index)

            } else {
                nextInd = gainIndex(tempArray[line][nucl+1], 'sequi', index)

                lexeis.totalQ[index][nextInd] += 1
                recalculatePercentage(index)
            }
        }
    }
    var num = 0
    console.log('Nucleus: '+lexeis.nucleus[num]+' Sequi: '+lexeis.sequi[num]+' TotalQ: '+lexeis.totalQ[num]+' TotalP: '+lexeis.totalP[num])
}

//temporary
analyseText()