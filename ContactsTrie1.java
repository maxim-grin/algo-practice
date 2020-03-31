import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {
    // Alphabet size (# of symbols) 
    static final int ALPHABET_SIZE = 21;

    // Trie node 
    static class TrieNode 
    { 
        TrieNode[] children =  new TrieNode[ALPHABET_SIZE]; 
        // isLeaf is true if the node represents 
        // end of a word 
        boolean isLeaf; 
          
        TrieNode(){ 
            isLeaf = false; 
            for (int i = 0; i < ALPHABET_SIZE; i++) 
                 children[i] = null;  
        } 
    }; 
    static TrieNode root;

    // If not present, inserts key into trie 
    // If the key is prefix of trie node, just 
    // marks leaf node 
    static void insert(String key) 
    { 
        int length = key.length(); 
       
        TrieNode pCrawl = root; 
        
        for (int level = 0; level < length; level++) 
        { 
            int index = key.charAt(level) - 'a'; 
            if (pCrawl.children[index] == null) 
                pCrawl.children[index] = new TrieNode(); 
        
            pCrawl = pCrawl.children[index]; 
        } 
        
        // mark last node as leaf 
        pCrawl.isLeaf = true; 
    }

    // Returns true if key presents in trie, else false 
    static TrieNode search(String key) 
    { 
        int level; 
        int length = key.length(); 
        int index; 
        TrieNode pCrawl = root; 
       
        for (level = 0; level < length; level++) 
        { 
            index = key.charAt(level) - 'a'; 
       
            if (pCrawl.children[index] == null) 
                return null; 
       
            pCrawl = pCrawl.children[index]; 
        } 
       
        return pCrawl; 
    }
       
    // Function to count number of words 
    static int wordCount(TrieNode root) 
    { 
        int result = 0; 
       
        if (root != null) {
            // Leaf denotes end of a word 
            if (root.isLeaf) 
                result++; 
            
            for (int i = 0; i < ALPHABET_SIZE; i++)     
            if (root.children[i] != null ) 
                result += wordCount(root.children[i]); 
        }
        return result;    
    }

    /*
     * Complete the contacts function below.
     */
    static int[] contacts(String[][] queries) {
        // contacts storage
        root = new TrieNode();
        // count of found contacts
        int[] foundContactsCount = new int[queries.length];
        int fidx = 0;

        for (String[] query : queries) {
            if (query[0].equals("add")) { // check if it's add query
                // store the contact into storage
                insert(query[1]);
            } else if (query[0].equals("find")) { // check if it's find query
                int findResult = wordCount(search(query[1]));
                foundContactsCount[fidx] = findResult;
                fidx++;
            }
        }

        return Arrays.copyOfRange(foundContactsCount, 0, fidx);
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int queriesRows = Integer.parseInt(scanner.nextLine().trim());

        String[][] queries = new String[queriesRows][2];

        for (int queriesRowItr = 0; queriesRowItr < queriesRows; queriesRowItr++) {
            String[] queriesRowItems = scanner.nextLine().split(" ");

            for (int queriesColumnItr = 0; queriesColumnItr < 2; queriesColumnItr++) {
                String queriesItem = queriesRowItems[queriesColumnItr];
                queries[queriesRowItr][queriesColumnItr] = queriesItem;
            }
        }

        int[] result = contacts(queries);

        for (int resultItr = 0; resultItr < result.length; resultItr++) {
            bufferedWriter.write(String.valueOf(result[resultItr]));

            if (resultItr != result.length - 1) {
                bufferedWriter.write("\n");
            }
        }

        bufferedWriter.newLine();

        bufferedWriter.close();
    }
}
