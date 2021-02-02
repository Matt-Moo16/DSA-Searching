/* 
Linear search: you look through an array 1 by 1 until you find what you are looking for.
The clasic example is the index Of function, which searches for a particular value within an array. 
You loop through an array, checking each value until you find a value that matches.
At that point, you return i, the index that you are currently on.
If you reach the end of the loop without finding the item then you return -1, indicating that the item wasn't found.
*/
function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

/* 
Binary search: faster search method, which only works on sorted arrays.
Imagine that you had to guess a number between 1 and 100, \
and someone would tell you whether you guesses were above or below the correct answer.
The fastest guaranteed way to get there would be to narrow it down by always guessing in the middle of the range.
So you would start at 50 (halfway between 0 and 100), then if you were to high go to 25 (halfway between 0 and 50), 
then if you were too low go to 37 (halfway between 25 and 50), and so on.
Binary search works on the same principle of dividing the range in half each time. 
This technique is common in algorithms; it is known as a divide and conquer approach.
The function below takes 4 arguments - the array, the value to search for, and optional start and end indices.
If these are omitted then the function uses the start and end of the array. 
If the start index is greater than the end index then clearly the value hasn't been found so you return -1.
*/

function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;
    if (start > end) {
        return -1;
    }
    const index = Math.floor((start + end) / 2);
    const item = array[index];
    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1)
    }
}

/* 
Depth-First Search (DFS): in this you start from a given node (usually the root) and traverse as far as you can down.
When you reach a node, which has no child to visit or all nodes on its path have been visited, you start backtracking.
*/ 

/* 
Breadth-first search: so the top row will be handled 1st, then the 2nd row, and so on.
The tree is visited level by level. In order to carry out a BFS, you need a "first-in, first-out" (FIFO)
queue so you can store all the siblings in the queue and process them in the correct order. 
When you visit a node you add it to the queue. The nodes are then removed from the queue, and their children are visited,
adding more values onto the queue. The runtime for this is O(n) becuase each node needs to be visited once. 
*/

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    dfs(values=[]) {
        // if there is a left-hand branch then you recursively search the nodes there
        if (this.left) {
            values = this.left.dfs(values);
        }
        // then add the value at the current node to the array
        values.push(this.value);
        // then you recursively search the right-hand branch
        if (this.right) {
            values = this.right.dfs(values);
        }
        return values;
    }

    bfs(tree, values = []) {
        // Assuming a Queue is implemented (refer to previous lesson on Queue)
        const queue = new Queue(); 
        const node = tree.root;
        queue.enqueue(node);
        while (queue.length) {
            // remove from the queue
            const node = queue.dequeue();
            // add that value from the queue to an array
            values.push(node.value);
        }
        if (node.left) {
            // add left child to the queue
            queue.enqueue(node.left);
        }
        if (node.right) {
            // add right child to the queue
            queue.enqueue(node.right);
        }
    }
}
