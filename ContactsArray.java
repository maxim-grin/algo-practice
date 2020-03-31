import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {

    /*
     * Complete the contacts function below.
     */
    static int[] contacts(String[][] queries) {
        // contacts storage
        String[] contacts = new String[queries.length];
        // count of found contacts
        int[] foundContactsCount = new int[queries.length];
        int cidx = 0;
        int fidx = 0;

        for (String[] query : queries) {
            if (query[0].equals("add")) { // check if it's add query
                // store the contact into storage
                contacts[cidx] = query[1];
                cidx++;
            } else if (query[0].equals("find")) { // check if it's find query
                int findResult = findContacts(contacts, cidx, query[1]);
                foundContactsCount[fidx] = findResult;
                fidx++;
            }
        }

        return Arrays.copyOfRange(foundContactsCount, 0, fidx);
    }

    // helper method to find a partial match in the storage
    static int findContacts(String[] contacts, int cidx, String searchQuery) {
        int matches = 0;
        for (int i = 0; i < cidx; i++) {
            if (contacts[i].startsWith(searchQuery)) {
                matches += 1;
            }
        }

        return matches;
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
