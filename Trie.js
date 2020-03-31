//Trie data structure
class TrieNode {
    constructor(word) {
        this.word = word
        this.children = {}
        this.isWord = false
    }
}

/**
 * Initialize your data structure here.
 */
class Trie {
    constructor() {
        this.root = new TrieNode('')
    }

    /**
     * Inserts a word into the trie. 
     * @param {string} word
     */
    insert(word) {
        let currNode = this.root
        let letter = word.slice(0,1) //first letter of word
        let child = null
        word = word.slice(1) // remaining word

        while (letter.length > 0) {
            if (currNode.children[letter] === undefined) {
                child = new TrieNode(letter)
                currNode.children[letter] = child
            } else {
                child = currNode.children[letter]
            } 
            currNode = child
            letter = word.slice(0,1)
            word = word.slice(1)    
        }
        child.isWord = true   //Make isWord true at last letter of word to indicate word gets complete here
    }

    /**
     * Returns if the word is in the trie. 
     * @param {string} word
     */
    search(word) {
        var currNode = this.root
        var letter = word.slice(0,1)
        word = word.slice(1)

        while (letter.length > 0) {
            if (currNode.children[letter]) {
                currNode = currNode.children[letter]
                if (word.length == 0){  //when you reach last letter check isWord
                    return currNode.isWord;
                }
                letter = word.slice(0,1);
                word = word.slice(1);		           
            } else {
                return false;
            }
        }
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix. 
     * @param {string} prefix
     */
    startsWith(prefix) {
        let currNode = this.root
        let letter = prefix.slice(0,1)
        prefix = prefix.slice(1)

        while (letter.length > 0) {
            if (currNode.children[letter]) {
                currNode = currNode.children[letter]
                letter = prefix.slice(0,1)
                prefix = prefix.slice(1)			           
            } else {
                return false
            }
        }
        return true
    }

    wordCount(node) { 
        let result = 0; 
        // Leaf denotes end of a word 
        if (node.isWord) {
            result++; 
        }
        let keys = Object.keys(node.children);
        if (keys.length > 0) {
            for (let key of keys) {
                result += this.wordCount(node.children[key]); 
            }
        }

        return result;    
    }

    countPrefixWords(prefix) {
        let currNode = this.root
        let letter = prefix.slice(0,1)
        prefix = prefix.slice(1)

        while (letter.length > 0) {
            if (currNode.children[letter]) {
                currNode = currNode.children[letter]
                letter = prefix.slice(0,1)
                prefix = prefix.slice(1)			           
            } else {
                return 0
            }
        }
        return this.wordCount(currNode)
    }
}

/** 
 * Your Trie object will be instantiated and called as such:*/

 word = 'the';
 prefix = 'th';
 var trie = new Trie()
 trie.insert('the')
 trie.insert('that')
 trie.insert('their')
 var param_2 = trie.search(word)
 var param_3 = trie.startsWith(prefix)
 var param_3 = trie.startsWith('test')

 console.log(param_2);
 console.log(param_3);
 console.log(trie.wordCount(trie.root));
 console.log(trie.countPrefixWords(prefix));
 