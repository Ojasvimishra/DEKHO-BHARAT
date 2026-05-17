import java.util.*;

/**
 * ============================================================
 * DEKHO BHARAT: FULL BACKEND DSA ENGINE (JAVA VERSION)
 * ============================================================
 * 
 * This file is a complete 1:1 translation of the 'dekhoindia.js'
 * data and logic. It implements the N-ary Tree hierarchy,
 * DFS Traversal, and Circular Recommendation Logic.
 */

// 1. DATA MODELS
class Guide {
    String name, phone, email;

    public Guide(String n, String p, String e) {
        name = n;
        phone = p;
        email = e;
    }
}

class NodeDetails {
    String bestSeason, mustTry, activities, localFood, hiddenGem, climate, coords, rating, complexityIdx;
    Guide guide;

    public NodeDetails(String bs, String mt, String act, String food, String gem, String clim, String crd, String rat,
            String comp, Guide g) {
        bestSeason = bs;
        mustTry = mt;
        activities = act;
        localFood = food;
        hiddenGem = gem;
        climate = clim;
        coords = crd;
        rating = rat;
        complexityIdx = comp;
        guide = g;
    }
}

class TravelNode {
    String id, label, city, state, description;
    List<TravelNode> children = new ArrayList<>();
    List<String> tags = new ArrayList<>();
    NodeDetails details;

    public TravelNode(String id, String label, String desc) {
        this.id = id;
        this.label = label;
        this.description = desc;
    }

    public TravelNode(String id, String city, String state, String desc, NodeDetails details, String... tagsArr) {
        this.id = id;
        this.city = city;
        this.state = state;
        this.description = desc;
        this.details = details;
        this.tags.addAll(Arrays.asList(tagsArr));
    }

    public void addChild(TravelNode child) {
        this.children.add(child);
    }
}

public class DekhoIndia {
    private static TravelNode treeData;

    static {
        // --- DATA INITIALIZATION ---
        treeData = new TravelNode("dekho-india", "DEKHO BHARAT", "The definitive journey through the soul of India.");

        // ADVENTURES
        TravelNode adventures = new TravelNode("adventures", "The Wild Adventures",
                "High-altitude deserts and glacial lakes.");
        adventures.addChild(new TravelNode("rishikesh", "Rishikesh", "Uttarakhand",
                "The world's capital for Rafting and Yoga.",
                new NodeDetails("March-May", "Rafting", "Cliff Jumping", "Lassi", "Beatles Ashram", "Subtropical",
                        "30.08°N", "4.8", "0.45", new Guide("Amit", "9876543210", "amit@dekhoindia.in")),
                "Rafting", "Yoga"));
        adventures.addChild(new TravelNode("leh", "Leh", "Ladakh", "A lunar landscape on Earth.",
                new NodeDetails("June-Sept", "Biking", "Monastery visits", "Thukpa", "Magnetic Hill", "Cold Desert",
                        "34.15°N", "4.9", "0.88", new Guide("Tenzin", "8765432109", "tenzin@dekhoindia.in")),
                "Biking", "Himalayas"));
        adventures.addChild(new TravelNode("andaman", "Andaman", "Island", "Emerald archipelago in the Bay of Bengal.",
                new NodeDetails("Oct-May", "Scuba", "Island Hopping", "Seafood", "Barren Island", "Tropical", "11.74°N",
                        "4.7", "0.62", new Guide("Rajesh", "7654321098", "rajesh@dekhoindia.in")),
                "Scuba", "Island"));
        adventures
                .addChild(new TravelNode("gulmarg", "Gulmarg", "J&K", "Meadow of Flowers transformed into snowflakes.",
                        new NodeDetails("Dec-March", "Gondola", "Skiing", "Kahwa", "Alpathar Lake", "Alpine", "34.04°N",
                                "4.9", "0.74", new Guide("Sajad", "6543210987", "sajad@dekhoindia.in")),
                        "Skiing", "Snow"));
        adventures.addChild(new TravelNode("bir-billing", "Bir Billing", "Himachal", "The paragliding capital of Asia.",
                new NodeDetails("Sept-Nov", "Paragliding", "Trekking", "Momos", "Bangoru Waterfall", "Mild", "32.05°N",
                        "4.8", "0.66", new Guide("Vikas", "5432109876", "vikas@dekhoindia.in")),
                "Paragliding", "Sky"));

        // BEACHES
        TravelNode beaches = new TravelNode("beaches", "Coastal Horizons", "Surrender to the rhythm of the waves.");
        beaches.addChild(new TravelNode("goa", "Goa", "Goa", "Kaleidoscope of cultures.",
                new NodeDetails("Nov-Feb", "Beach Shacks", "Water Sports", "Bebinca", "Chorao Island", "Humid",
                        "15.29°N", "4.6", "0.22", new Guide("Joao", "4321098765", "joao@dekhoindia.in")),
                "Beach", "Nightlife"));
        beaches.addChild(new TravelNode("varkala", "Varkala", "Kerala", "Red cliffs meeting the Arabian Sea.",
                new NodeDetails("Oct-March", "Cliff Dining", "Surfing", "Kerala Sadhya", "Edava Beach", "Tropical",
                        "8.73°N", "4.8", "0.35", new Guide("Rahul", "3210987654", "rahul@dekhoindia.in")),
                "Cliff", "Temple"));
        beaches.addChild(new TravelNode("gokarna", "Gokarna", "Karnataka", "Sacred temple town with half-moon beaches.",
                new NodeDetails("Oct-March", "Beach Trek", "Meditation", "Seafood", "Paradise Beach", "Humid",
                        "14.54°N", "4.7", "0.55", new Guide("Manjunath", "2109876543", "manju@dekhoindia.in")),
                "Trekking", "Beaches"));
        beaches.addChild(new TravelNode("havelock", "Havelock", "Andamans", "Asia's crowning coastal jewel.",
                new NodeDetails("Nov-May", "Snorkeling", "Scuba", "Grilled Fish", "Neil Island", "Tropical", "12.03°N",
                        "4.9", "0.68", new Guide("Priya", "1098765432", "priya@dekhoindia.in")),
                "Pristine", "Blue Water"));

        // WILDLIFE
        TravelNode wildlife = new TravelNode("wildlife", "The Living Jungle", "Realm of the Royal Bengal Tiger.");
        wildlife.addChild(new TravelNode("jim-corbett", "Jim Corbett", "Uttarakhand", "Tiger conservation birthplace.",
                new NodeDetails("Nov-June", "Jeep Safari", "Photography", "Kumaoni Raita", "Corbett Falls", "Monsoon",
                        "29.53°N", "4.5", "0.65", new Guide("Ravi", "3344221100", "ravi@dekhoindia.in")),
                "Tiger", "Safari"));

        treeData.addChild(adventures);
        treeData.addChild(beaches);
        treeData.addChild(wildlife);
    }

    /**
     * DSA: DEPTH FIRST SEARCH (Find Discovery Path)
     */
    public static List<TravelNode> getPathToNode(TravelNode root, String targetId) {
        return search(root, targetId, new ArrayList<>());
    }

    private static List<TravelNode> search(TravelNode current, String targetId, List<TravelNode> path) {
        path.add(current);
        if (current.id.equals(targetId))
            return new ArrayList<>(path);
        for (TravelNode child : current.children) {
            List<TravelNode> result = search(child, targetId, path);
            if (result != null)
                return result;
        }
        path.remove(path.size() - 1);
        return null;
    }

    /**
     * DSA: CIRCULAR LINKED LIST LOGIC (Recommendations)
     */
    public static List<TravelNode> getRecommendations(String currentNodeId) {
        List<TravelNode> all = new ArrayList<>();
        flatten(treeData, all);
        int idx = -1;
        for (int i = 0; i < all.size(); i++)
            if (all.get(i).id.equals(currentNodeId))
                idx = i;
        if (idx == -1)
            return new ArrayList<>();
        List<TravelNode> recs = new ArrayList<>();
        for (int i = 1; i <= 2; i++)
            recs.add(all.get((idx + i) % all.size()));
        return recs;
    }

    private static void flatten(TravelNode node, List<TravelNode> list) {
        if (node.children.isEmpty())
            list.add(node);
        else
            for (TravelNode c : node.children)
                flatten(c, list);
    }

    public static void main(String[] args) {
        System.out.println("=== DEKHO BHARAT DSA ENGINE BOOTED (JAVA) ===");

        // 1. DFS TEST
        String target = "leh";
        List<TravelNode> path = getPathToNode(treeData, target);
        System.out.print("\nSEARCH LOG [" + target + "]: ");
        for (TravelNode n : path)
            System.out.print(n.id + " -> ");

        // 2. REC TEST
        List<TravelNode> recs = getRecommendations(target);
        System.out.print("\nRECS FOR [" + target + "]: ");
        for (TravelNode r : recs)
            System.out.print(r.city + " ");
        System.out.println();
    }
}
