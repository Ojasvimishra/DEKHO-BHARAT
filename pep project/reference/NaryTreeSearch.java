import java.util.*;

/**
 * ============================================================
 * ALGORITHM ANALYSIS: N-ARY SEARCH & RECURSION
 * ============================================================
 * 
 * This file analyzes the Search Engine behind Dekho Bharat.
 * It demonstrates how the system "thinks" when you click a city.
 */

public class NaryTreeSearch {

    /**
     * TIME COMPLEXITY: O(N)
     * SPACE COMPLEXITY: O(H) where H is Tree Height (Recursion Stack)
     */
    public static boolean searchAndLog(String currentNode, String target, int depth) {
        String indent = "  ".repeat(depth);
        System.out.println(indent + "↳ ENTERING NODE: [" + currentNode + "] (Depth: " + depth + ")");

        // BASE CASE: Found it
        if (currentNode.equals(target)) {
            System.out.println(indent + "  ★ TARGET REACHED! Terminating recursion.");
            return true;
        }

        // SIMULATED N-ARY BRANCHES
        // In the real app, we iterate over node.children
        if (depth < 2) {
            System.out.println(indent + "  ↪ Branching factor detected. Searching sub-trees...");
            // Simulate searching 2 children
            if (searchAndLog(currentNode + "_child_1", target, depth + 1))
                return true;
            if (searchAndLog(currentNode + "_child_2", target, depth + 1))
                return true;
        }

        // BACKTRACKING
        System.out.println(indent + "  ↩ No match. Backtracking to parent...");
        return false;
    }

    public static void main(String[] args) {
        System.out.println("=== DEKHO BHARAT: SEARCH KERNEL SIMULATION ===");
        System.out.println("Goal: Find 'root_child_2_child_1'\n");

        searchAndLog("root", "root_child_2_child_1", 0);

        System.out.println("\n=== ANALYSIS ===");
        System.out.println("1. The algorithm uses DEPTH FIRST SEARCH.");
        System.out.println("2. It visits parent nodes before children (Pre-order).");
        System.out.println("3. When a branch fails, it BACKTRACKS (pops from stack).");
    }
}
