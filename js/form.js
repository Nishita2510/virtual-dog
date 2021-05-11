class Form{
    constructor(){

    }

    display(){
        var title = createElement('h2')
        title.html("FEED THE DOG")
        title.position(250,70)

        var input = createInput("DOG'S NAME")
        var button = createButton("Add Name")

        var greeting = createElement('h3')
        input.position(250,120)
        button.position(300,150)

        button.mousePressed(function(){
            input.hide()
            button.hide()
            var name = input.value()
            playerCount+= 1
            player.update(name)
            player.updateCount(playerCount)

            greeting.html("Hello! "+name)
            greeting.position(250,100)
        })
    }
}