class Card {
    constructor(suit, rank, score) {
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}

class Deck {
    constructor() {
        this.fullDeck = []
        this.deck1 = []
        this.deck2 = []
        this.warArray = []
        this.createDeck()
        this.shuffleDeck()
        this.roundCount = 0
    }
    createDeck() {
        let suits = ["Hearts", "Spades", "Diamonds", "Clubs"]
        let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        for (let i=0; i < suits.length; i++) {
            for(let j=0; j < ranks.length; j++) {
                this.fullDeck.push(new Card(suits[i], ranks[j], j + 2))
            }
        }
        return this.fullDeck
    }
    shuffleDeck() {
        for (let i = this.fullDeck.length -1; i > 0; i--) {
            let j = Math.floor(Math.random() * i)
            let k = this.fullDeck[i]
            this.fullDeck[i] = this.fullDeck[j]
            this.fullDeck[j] = k
        }
    }
    score() {
        return `Player 1: ${this.deck1[0].rank}    |    Player 2: ${this.deck2[0].rank}` 
    }
    deckSize() {
        return `Player 1 now has ${this.deck1.length} cards. Player 2 now has ${this.deck2.length} cards.`
    }
    compare() {
        this.roundCount += 1
        console.log(`************ Round ${this.roundCount} ************`)
        if (this.deck1[0].score > this.deck2[0].score) {
            return "P1"
        } else if (this.deck1[0].score < this.deck2[0].score) {
            return "P2"
        } else if (this.deck1[0].score === this.deck2[0].score) {
            return "Tie"
        }
    }
    playWar() {
        this.deck1 = this.fullDeck.splice(0, this.fullDeck.length / 2);
        this.deck2 = this.fullDeck
        while (this.deck1.length > 0 && this.deck2.length > 0) {						
            switch (this.compare())	{
                case "P1":
                    console.log(this.score())
                    console.log(`Player 1 wins the round!`)
                    this.deck1.push(...this.warArray)
                    this.warArray.length = 0
                    this.deck1.push(this.deck1[0], this.deck2[0])
                    this.deck1.shift()
                    this.deck2.shift()
                    console.log(this.deckSize())
                    console.log(" ")
                    break;
                case "P2":
                    console.log(this.score())
                    console.log(`Player 2 wins the round!`)
                    this.deck2.push(...this.warArray)
                    this.warArray.length = 0
                    this.deck2.push(this.deck2[0], this.deck1[0])
                    this.deck1.shift()
                    this.deck2.shift()
                    console.log(this.deckSize());
                    console.log(" ")
                    break;
                case "Tie":
                    console.log(this.score())
                    if (this.deck1.length <= 4) {
                        this.deck2.push(...this.deck1)
                        this.deck1.length = 0;
                        console.log("It's a WAR! But player 1 does not have enough cards.")
                        break;
                    } else if (this.deck2.length <= 4) {
                        this.deck1.push(...this.deck2)
                        this.deck2.length = 0;
                        console.log("It's a WAR! But player 2 does not have enough cards.")
                        break;
                    } else {
                        console.log(`IT'S A WAR!`)
                        this.warArray.push(this.deck1[0], this.deck1[1], this.deck1[2], this.deck1[3])
                        this.warArray.push(this.deck2[0], this.deck2[1], this.deck2[2], this.deck2[3])
                        this.deck1.splice(0, 4)
                        this.deck2.splice(0, 4)
                        console.log(`${this.deckSize()} There are ${this.warArray.length} cards at stake.`);
                        console.log(" ")
                        break;
                    }
            }
        }
        if (this.deck1.length > this.deck2.length) {
            this.deck1.push(...this.warArray)
            this.warArray.length = 0
            console.log(`${this.deckSize()} Game is over, Player 1 wins!`)
        } else if (this.deck2.length > this.deck1.length) {
            this.deck2.push(...this.warArray)
            this.warArray.length = 0
            console.log(`${this.deckSize()} Game is over, Player 2 wins!`)
        }
    }
}

const banana = new Deck()
banana.playWar()
