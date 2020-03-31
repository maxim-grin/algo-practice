// use Node class
const Node = require('./Node.js')

//Binary Search Tree class
class BinarySearchTree
{
    constructor()
    {
        //root of a binary search tree
        this.root = null;
    }

    // helper method which creates a new node
    // to be inserted and calls insertNode
    insert(data)
    {
        // creating a node and initialising with data
        var newNode = new Node(data);

        // if root is null, then node will be added
        // to the tree and made root
        if (this.root === null) {
            this.root = newNode;
        } else {
            // find the correct position in the
            // tree and add the node
            this.insertNode(this.root, newNode);
        }
    }

    // Method to insert a node in a tree 
    // it moves over the tree to find the location 
    // to insert a node with a given data 
    insertNode (node, newNode)
    {
        // if the data is less than the node
        // data move left of the tree
        if (newNode.data < node.data) {
            // if left is null insert node here
            if (node.left === null) {
                node.left = newNode;
            } else {
                // if left is not null recurr until  
                // null is found 
                this.insertNode(node.left, newNode);
            }
        // if the data is more than the node 
        // data move right of the tree  
        } else {
            // if right is null insert node here
            if (node.right === null) {
                node.right = newNode;
            // if right is not null recurr until  
            // null is found 
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // helper method that calls the  
    // removeNode with a given data 
    remove(data)
    {
        // root is re-initialized with 
        // root of a modified tree.
        this.root = this.removeNode(this.root, data);
    }

    // Method to remove node with a
    // given data
    // it recurrs over the tree to find the
    // data and removes it
    removeNode(node, key)
    {
        // if the root is null then tree is  
        // empty 
        if (node === null) {
            return null;
        // if data to be deleted is less than  
        // root's data then move to left subtree 
        } else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        // if data to be deleted is greater than  
        // root's data then move to right subtree 
        } else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        // if data is equal to the root's data  
        // then delete this node 
        } else {
            // deleting node with no children 
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            // deleting node with right children only
            } else if (node.left === null) {
                node = node.right;
                return node;
            // deleting node with left children only
            } else if (node.right === null) {
                node = node.left;
                return node;
            } else {
                // Deleting node with two children 
                // minumum node of the rigt subtree 
                // is stored in aux 
                var aux = this.findMinNode(node.right);
                node.data = aux.data;
                node.right = this.removeNode(node.right, aux.data);
                return node;
            }
        }
    }

    // finds the minimum node in tree 
    // searching starts from given node 
    findMinNode(node)
    {
        // if left of a node is null 
        // then it must be minimum node 
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    // returns root of the tree 
    getRootNode()
    {
        return this.root;
    }

    // Performs inorder traversal of a tree 
    inorder(node)
    {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    // Performs preorder traversal of a tree
    preorder(node)
    {
        if (node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    // performs preorder traversal of a tree
    postorder(node)
    {
        if (node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

    // search for a node with given data
    search(node, data)
    {
        // if tree is empty return null
        if (node === null) {
            return null;
        } else if (data < node.data) {
            // if data is less than node's data 
            // move left
            return this.search(node.left, data);
        } else if (data > node.data) {
            // if data is less than node's data 
            // move right 
            return this.search(node.right, data);
        } else {
            // if data is equal to the node data  
            // return node 
            return node;
        }
    }

    // create a mirror of the tree
    mirror(node) {
        // if tree is empty return null
        if (node === null) {
            return null;
        } else {
            // mirror subtrees
            var left = this.mirror(node.left);
            var right = this.mirror(node.right);

            // swap the subtrees
            node.left = right;
            node.right = left;
        }

        return node;
    }

    // The height of a binary tree is the number of edges
    // between the tree's root and its furthest leaf
    getHeight(node) {
        //if (node === null || (node.left === null && node.right === null)) {
        if (node === null) {
            return 0;
        } else {
            var leftHeight = this.getHeight(node.left);
            var rightHeight = this.getHeight(node.right);
            if (leftHeight > rightHeight) {
                return leftHeight + 1;
            } else {
                return rightHeight + 1;
            }
        }
    }

    levelOrder(node) {
        var height = this.getHeight(node);
        for (var i = 0; i <= height; i++) {
            this.printLevel(node, i);
        }
    }

    printLevel(node, level) {
        if (node === null) {
            return;
        } else if (level === 1) {
            console.log(node.data + ' ');
        } else if (level > 1) {
            this.printLevel(node.left, level - 1);
            this.printLevel(node.right, level - 1);
        }
    }
}

module.exports = BinarySearchTree