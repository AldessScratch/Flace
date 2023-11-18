idsubject = "MAT" # changer selon le fichier
idchapter = "ARI" # changer selon le fichier
idnumberINT = 1000
idsymbol = "null"
convertioncompleted = False
# symbol = "null"
caracterSelected = "null"
seekNumber = -1
seekWrite = 0
convertionStep = "null"
idWithoutSymbol = "null"
startStringPosition = 0
endStringPosition = 0
currentString = "null"
id = idWithoutSymbol+idsymbol
specialCaracterSelected = "null"
verySpecialCaracterSelected = "null"
deleteComma = False

def endSequence() :
    print("Convertion Terminée !")
    exit()


def writeLine() :
    import time
    global convertionStep
    global idWithoutSymbol
    global seekWrite
    global id
    global currentString
    global idnumberINT
    global deleteComma
    fileName = idsubject+"-"+idchapter+".json"
    with open(fileName, "a", encoding="latin1") as output :
        if convertionStep == "Start" :
            output.seek(0)
            output.write("{\n") # "\n" signifie saut de ligne
            seekWrite = output.tell()
            print("Création du fichier...")
            setup()
        if convertionStep == "ObjectOpen" :
            output.seek(seekWrite)
            output.write("    \"") # écrit "    "idWithoutSymbol_": {""
            output.write(str(idWithoutSymbol))
            output.write("_\": {\n")
            seekWrite = output.tell()
            print("Nouveau groupe crée :", idWithoutSymbol,"_.")
            setup()
        if convertionStep == "ObjectWrite" :
            output.seek(seekWrite)
            output.write("        \"") # écrit "id": "currentString",
            output.write(str(id))
            output.write("\": \"")
            output.write(str(currentString))
            if deleteComma == True :
                output.write("\"\n")
                deleteComma = False
            else :
                output.write("\",\n")
            seekWrite = output.tell()
            print("Nouvel identifiant assigné (",id,") à la string", currentString,"." )
            setup()
        if convertionStep == "specialObjectWrite" :
            output.seek(seekWrite)
            output.write("        \"") # écrit "id": "currentString",
            output.write(str(id))
            output.write("\": [")
            output.write(str(currentString))
            if deleteComma == True :
                output.write("]\n")
                deleteComma == False
            else :
                output.write("],\n")
            seekWrite = output.tell()
            print("Nouvel identifiant assigné (",id,") à la string", currentString,"." )
            setup()
        if convertionStep == "ObjectClose" :
            output.seek(seekWrite)
            output.write("    },\n")
            seekWrite = output.tell()
            setup()
        if convertionStep == "End" :
            output.seek(seekWrite)
            output.write("    }")
            output.write("\n}")
            endSequence()
        if convertionStep == "null" :
            print("Waiting for caracter...")
            setup()


def setup() :
    import time
    global currentString
    global caracterSelected
    global startStringPosition
    global endStringPosition
    global seekNumber
    global idWithoutSymbol
    global convertionStep
    global idsymbol
    global idsubject
    global idchapter
    global idnumberINT
    global id
    global specialCaracterSelected
    global verySpecialCaracterSelected
    global deleteComma
    with open("questions.txt", "r", encoding="latin1") as input : # utilisation de l'encodage latin1, qui supporte les "é" (ne pas utiliser utf-8)
        done = False
        while done == False : # loop jusqu'à trouver les symbole "}"
            seekNumber = seekNumber + 1
            input.seek(seekNumber)
            caracterSelected = (input.read(1))
            if caracterSelected == "[" :
                idWithoutSymbol = idsubject+"-"+idchapter+"-"+str(idnumberINT)
                convertionStep = "ObjectOpen"
                done = True
            if caracterSelected == "]" :
                input.seek(seekNumber + 1)
                specialCaracterSelected = input.read(1)
                if  specialCaracterSelected == "-" :
                    convertionStep = "End"
                else :
                    convertionStep = "ObjectClose"
                idnumberINT = idnumberINT + 1
                done = True
            if caracterSelected == "}" :
                endStringPosition = input.tell() - 1
                idsymbol = input.read(1) # Définit idsymbol selon le caractère qui suit "}"
                input.seek(startStringPosition)
                if endStringPosition - startStringPosition < 1 :
                    currentString = ""
                else : 
                    currentString = input.read(endStringPosition - startStringPosition)
                id = idWithoutSymbol+idsymbol
                input.seek(seekNumber + 1)
                specialCaracterSelected = input.read(1)
                input.seek(seekNumber + 2)
                verySpecialCaracterSelected = input.read(1)
                if  specialCaracterSelected == "=" :
                    convertionStep = "specialObjectWrite"
                else :
                    convertionStep = "ObjectWrite"
                if verySpecialCaracterSelected == "]" :
                    deleteComma = True
                done = True
            if caracterSelected == "{" :
                startStringPosition = input.tell()
                convertionStep = "null"
                done = True
        writeLine()


def startSequence() :
    global convertioncompleted # Dit a Python d'utiliser la variable "convertioncompleted" globale (car définie hors d'une fonction), sinon il va créer une variable qui a le même nom
    global idnumberINT
    global idsubject
    global idchapter
    global idsymbol
    global convertionStep
    convertionStep = "Start"
    writeLine()

    
def main() :
    startSequence()


def tests() :
    with open("questions.txt", "r", encoding="latin1") as input :
        testSeekNumber = 0
        for i in range(32) :
            input.seek(testSeekNumber)
            testCaracter = input.read(1)
            if testCaracter == "}" :
                print("Success!", testCaracter)
            testSeekNumber = testSeekNumber + 1


def testnumber() :
    test1 = "str"
    test2 = "0"
    test3 = test1+test2
    print(test3)
    test4 = 2
    test5 = str(test4)
    print(test5)
    test5 = test5+"ok?"
    print(test5)

main()

# Code par Arthur Dixneuf
