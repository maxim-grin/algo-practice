import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {

    /*
     * Complete the runningMedian function below.
     */
    static double[] runningMedian(int[] a) {
        double[] medians = new double[a.length];
        Heap heap = new Heap();

        for (int i = 0; i < a.length; i++) {
            heap.add(a[i]);
            medians[i] = heap.median();
        }

        return medians;
    }

    static class Heap {
        private Queue<Integer> low = new PriorityQueue<>(Comparator.reverseOrder());
        private Queue<Integer> high = new PriorityQueue<>();

        public void add(int number) {
            Queue<Integer> target = low.size() <= high.size() ? low : high;
            target.add(number);
            balance();
        }

        private void balance() {
            while(!low.isEmpty() && !high.isEmpty() && low.peek() > high.peek()) {
                Integer lowHead= low.poll();
                Integer highHead = high.poll();
                low.add(highHead);
                high.add(lowHead);
            }
        }

        public double median() {
            if(low.isEmpty() && high.isEmpty()) {
                throw new IllegalStateException("Heap is empty");
            } else {
                return low.size() == high.size() ? (low.peek() + high.peek()) / 2.0 : low.peek();
            }
        }
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int aCount = Integer.parseInt(scanner.nextLine().trim());

        int[] a = new int[aCount];

        for (int aItr = 0; aItr < aCount; aItr++) {
            int aItem = Integer.parseInt(scanner.nextLine().trim());
            a[aItr] = aItem;
        }

        double[] result = runningMedian(a);

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
