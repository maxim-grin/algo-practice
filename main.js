// use BinarySearchTree class
const BinarySearchTree = require('./BinarySearchTree.js')
// create an object for the BinarySearchTree 
var BST = new BinarySearchTree();

// Inserting nodes to the BinarySearchTree 
BST.insert(15); 
BST.insert(25); 
BST.insert(10); 
BST.insert(7); 
BST.insert(22); 
BST.insert(17); 
BST.insert(13); 
BST.insert(5); 
BST.insert(9); 
BST.insert(27); 

//          15 
//         /  \ 
//        10   25 
//       / \   / \ 
//      7  13 22  27 
//     / \    / 
//    5   9  17

var root = BST.getRootNode(); 
              
// prints 5 7 9 10 13 15 17 22 25 27 
console.log("inorder traversal full");
BST.inorder(root);

// Removing node with no children  
BST.remove(5);

//          15 
//         /  \ 
//        10   25 
//       / \   / \ 
//      7  13 22  27 
//       \    / 
//        9  17 
root = BST.getRootNode(); 
              
// prints 7 9 10 13 15 17 22 25 27 
console.log("inorder traversal no 5");
BST.inorder(root); 
              
// Removing node with one children  
BST.remove(7); 
              
//          15 
//         /  \ 
//        10   25 
//       / \   / \ 
//      9  13 22  27 
//            / 
//           17  
              
              
var root = BST.getRootNode(); 
  
// prints 9 10 13 15 17 22 25 2
console.log("inorder traversal no 7");
BST.inorder(root); 
              
// Removing node with two children  
BST.remove(15); 
      
//          17 
//         /  \ 
//        10   25 
//       / \   / \ 
//      9  13 22  27 
  
var root = BST.getRootNode(); 
console.log("inorder traversal no 15");
  
// prints 9 10 13 17 22 25 27 
BST.inorder(root); 
              
console.log("postorder traversal"); 
BST.postorder(root); 
console.log("preorder traversal"); 
BST.preorder(root); 

// Removing node with two children  
BST.remove(17);
BST.remove(9); 
BST.remove(13);
var root = BST.getRootNode();      
//          22 
//         /  \ 
//        10   25 
//               \ 
//                27 
console.log("inorder traversal");
BST.inorder(root);

console.log("mirror"); 
BST.inorder(BST.mirror(root));

console.log("tree height");
console.log(BST.getHeight(root))

console.log("tree level order traversal");
BST.levelOrder(root);