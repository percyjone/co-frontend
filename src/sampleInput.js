
 const sampleInput= [
  {
    "pi": null,
    "co": "1",
    "bi": "2",
    "marks": "  2",
    "question": "Outline the properties of heap",
    "option": null,
    "subDivision": null,
    "no": "1"
  },
  {
    "pi": null,
    "co": "1",
    "bi": "2",
    "marks": "2",
    "question": "Write a routine to find a min and max element in a BST",
    "option": null,
    "subDivision": null,
    "no": "2"
  },
  {
    "pi": null,
    "co": "1",
    "bi": "1",
    "marks": "2",
    "question": "Describe the different methods of graph representation",
    "option": null,
    "subDivision": null,
    "no": "3"
  },
  {
    "pi": null,
    "co": "1",
    "bi": "1",
    "marks": "2",
    "question": "When you say the graph is strongly connected?",
    "option": null,
    "subDivision": null,
    "no": "4"
  },
  {
    "pi": null,
    "co": "2",
    "bi": "2",
    "marks": "2",
    "question": "State the uses of topological sort",
    "option": null,
    "subDivision": null,
    "no": "5"
  },
  {
    "pi": null,
    "co": "2",
    "bi": "2",
    "marks": "2",
    "question": "How a graph differs from spanning tree?Give an example",
    "option": null,
    "subDivision": null,
    "no": "6"
  },
  {
    "pi": null,
    "co": "2",
    "bi": "1",
    "marks": "2",
    "question": "Distinguish internal and external sorting",
    "option": null,
    "subDivision": null,
    "no": "7"
  },
  {
    "pi": null,
    "co": "2",
    "bi": "1",
    "marks": "2",
    "question": "Write a pseudocode for insertion sort ",
    "option": null,
    "subDivision": null,
    "no": "8"
  },
  {
    "pi": null,
    "co": "3",
    "bi": "2",
    "marks": "2",
    "question": "What characteristics should an ideal hash function possess, and how can a poorly  designed hash function affect the performance of the hash table?",       
    "option": null,
    "subDivision": null,
    "no": "9"
  },
  {
    "pi": null,
    "co": "3",
    "bi": "2",
    "marks": "2",
    "question": "What is a collision in the context of hashing?",
    "option": null,
    "subDivision": null,
    "no": "  10"
  },
  {
    "pi": null,
    "co": "1",
    "bi": "3",
    "marks": "8",
    "question": "You are tasked with managing a collection of student records in a binary search tree (BST). Each student is represented by a unique student ID. Your goal is to insert a series of student IDs (50,30,70,20,40,60 and 80) into the BST with suitable routine.",
    "option": "A",
    "subDivision": null,
    "no": "  11"
  },
  {
    "pi": null,
    "co": "1",
    "bi": "3",
    "marks": "8",
    "question": " In what scenarios would an AVL tree be preferred over other self-balancing tree. Construct AVL tree for the following data 21,26,30,9,4,14,28,18,15,10,2,3,7",
    "option": "B",
    "subDivision": null,
    "no": "  11"
  },
  {
    "pi": null,
    "co": "2",
    "bi": "3",
    "marks": "16",
    "question": "Imagine you are developing a social networking application where users can connect with each other. In a social network represented as a graph, users are depicted as nodes and friendships as edges. Consider the following six users: A, B, C, D, E, and F, with the connections as follows:- A - B- A - C- B - D- B - E- C - F- E - FHow can you implement the Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms to explore connections starting from a specified user? Provide the code for both algorithms and explain their functionality in the context of traversing a social network.",
    "option": "A",
    "subDivision": null,
    "no": "12"
  },
  {
    "pi": null,
    "co": "4",
    "bi": "3",
    "marks": "8",
    "question": "A traveling salesman needs to visit five cities: A, B, C, D, and E. He starts from city A and must visit each city exactly once before returning to A. The distances between the cities are as follows:A to B: 10A to C: 15A to D: 20A to E: 25B to C: 35B to D: 30B to E: 40C to D: 15C to E: 30D to E: 10How can Kruskal's algorithm be applied to solve the Traveling Salesman Problem (TSP) in the given scenario of five cities (A, B, C, D, and E) with specified distances? Discuss the steps involved in Kruskal's algorithm, including the formation of a minimum spanning tree (MST), and explain how the MST can aid in finding an approximate solution to the TSP. What are the advantages and limitations of using Kruskal's algorithm in this context?",
    "option": "A",
    "subDivision": null,
    "no": "12"
  },
  {
    "pi": null,
    "co": "4",
    "bi": "3",
    "marks": "8",
    "question": "Imagine you're using a GPS navigation system to find the shortest route from your current location to a destination in a city. The city is represented as a graph where intersections are nodes (e.g., A, B, C, D, E, F) and roads are edges with weights indicating the distance or estimated travel time. For example, you have the following connections: A - B (Weight:5 minutes), A - C (Weight:10 minutes), B - D (Weight:3 minutes), B - E (Weight:2 minutes), C - F (Weight:1 minute), F - D (Weight:4 minutes), and E - D (Weight:7 minutes). How would you find the shortest path from A to D using Dijkstra's Algorithm?",
    "option": "A",
    "subDivision": "ii)",
    "no": "12"
  },
  {
    "pi": null,
    "co": "3",
    "bi": "3",
    "marks": "16",
    "question": "Imagine you're developing an e-commerce platform where users can browse and purchase products. To enhance user experience, the website needs to display items in a user-friendly and efficient manner. Customers often want to view products sorted by price, making it easier to find items within their budget. Below is a sample price list for various products available on the platform:| Product ID | Product Name                  | Category            | Price (USD) ||---------------|----------------------------------- -|-------------------|-------------|| 101             | Wireless Headphones         | Electronics      | 79.99       || 102             | Smartwatch                          | Electronics      | 149.99      || 103             | Bluetooth Speaker              | Electronics       | 39.99       || 104             | Running Shoes                     | Apparel            | 89.99       || 105             | Casual T-Shirt                       | Apparel            | 19.99       |How would you implement a  selection sorting  and insertion sort to allow users to easily view products by price?",
    "option": "A",
    "subDivision": null,
    "no": "13"
  },
  {
    "pi": null,
    "co": "3",
    "bi": "3",
    "marks": "16",
    "question": "In an inventory management system, products are stored in a hash table for efficient access and management of stock levels. Each product is assigned a unique ID, which is hashed to determine its storage location. If two products hash to the same index, linear probing is employed to find the next available slot. This structure allows for quick retrieval and updates of product information, such as stock levels and item descriptions. The system is designed to handle high volumes of transactions, ensuring minimal downtime and fast operations.i)How does open hashing (separate chaining) enhance the ability to manage product collisions in an inventory management system, and what are the potential drawbacks of this approach in terms of memory usage?ii) What challenges might arise when implementing closed hashing (open addressing) in an inventory management system, particularly concerning performance during peak transaction periods?",
    "option": "B",
    "subDivision": null,
    "no": "13"
  }
]

const sampleInputOrdered = sampleInput.map((obj) => ({
  no: obj.no,
  option: obj.option,
  subDivision: obj.subDivision,
  question: obj.question,
  marks: obj.marks,
  co: obj.co,
  pi: obj.pi,
  bi: obj.bi,
}));



export default sampleInputOrdered;