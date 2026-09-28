// ================================
// AVL TREE
// ================================

class Node {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }

}


// ================================
// VARIABLES
// ================================

let root = null;
let lastRotation = "None";


// ================================
// HEIGHT
// ================================

function height(node) {

    if (node === null) {
        return 0;
    }

    return node.height;
}


// ================================
// MAXIMUM
// ================================

function max(a, b) {

    return a > b ? a : b;
}


// ================================
// BALANCE FACTOR
// ================================

function balance(node) {

    if (node === null) {
        return 0;
    }

    return height(node.left) - height(node.right);
}


// ================================
// RIGHT ROTATION
// ================================

function rightRotate(y) {

    let x = y.left;

    let temp = x.right;

    x.right = y;

    y.left = temp;

    y.height =
        1 + max(height(y.left), height(y.right));

    x.height =
        1 + max(height(x.left), height(x.right));

    lastRotation = "Right Rotation (LL)";

    return x;
}


// ================================
// LEFT ROTATION
// ================================

function leftRotate(x) {

    let y = x.right;

    let temp = y.left;

    y.left = x;

    x.right = temp;

    x.height =
        1 + max(height(x.left), height(x.right));

    y.height =
        1 + max(height(y.left), height(y.right));

    lastRotation = "Left Rotation (RR)";

    return y;
}


// ================================
// INSERT
// ================================

function insert(root, value) {

    // Normal BST insertion

    if (root === null) {
        return new Node(value);
    }

    if (value < root.value) {

        root.left =
            insert(root.left, value);

    }

    else if (value > root.value) {

        root.right =
            insert(root.right, value);

    }

    else {

        return root;
    }


    // Update height

    root.height =
        1 + max(
            height(root.left),
            height(root.right)
        );


    // Balance factor

    let b = balance(root);


    // ==========================
    // LL
    // ==========================

    if (b > 1 && value < root.left.value) {

        return rightRotate(root);
    }


    // ==========================
    // RR
    // ==========================

    if (b < -1 && value > root.right.value) {

        return leftRotate(root);
    }


    // ==========================
    // LR
    // ==========================

    if (b > 1 && value > root.left.value) {

        lastRotation = "LR Rotation";

        root.left =
            leftRotate(root.left);

        return rightRotate(root);
    }


    // ==========================
    // RL
    // ==========================

    if (b < -1 && value < root.right.value) {

        lastRotation = "RL Rotation";

        root.right =
            rightRotate(root.right);

        return leftRotate(root);
    }


    return root;
}


// ================================
// DELETE
// ================================

function deleteValue(root, value) {

    if (root === null) {
        return null;
    }


    if (value < root.value) {

        root.left =
            deleteValue(root.left, value);

    }

    else if (value > root.value) {

        root.right =
            deleteValue(root.right, value);

    }

    else {

        // No child

        if (root.left === null &&
            root.right === null) {

            return null;
        }


        // Only right child

        if (root.left === null) {

            return root.right;
        }


        // Only left child

        if (root.right === null) {

            return root.left;
        }


        // Two children

        let successor =
            findMin(root.right);

        root.value =
            successor.value;

        root.right =
            deleteValue(
                root.right,
                successor.value
            );
    }


    // Update height

    root.height =
        1 + max(
            height(root.left),
            height(root.right)
        );


    let b = balance(root);


    // LL

    if (b > 1 &&
        balance(root.left) >= 0) {

        return rightRotate(root);
    }


    // LR

    if (b > 1 &&
        balance(root.left) < 0) {

        lastRotation = "LR Rotation";

        root.left =
            leftRotate(root.left);

        return rightRotate(root);
    }


    // RR

    if (b < -1 &&
        balance(root.right) <= 0) {

        return leftRotate(root);
    }


    // RL

    if (b < -1 &&
        balance(root.right) > 0) {

        lastRotation = "RL Rotation";

        root.right =
            rightRotate(root.right);

        return leftRotate(root);
    }


    return root;
}


// ================================
// FIND MINIMUM
// ================================

function findMin(node) {

    let current = node;

    while (current.left !== null) {

        current = current.left;
    }

    return current;
}


// ================================
// INSERT BUTTON
// ================================

function insertNode() {

    let input =
        document.getElementById("value");

    let value =
        Number(input.value);


    if (input.value === "") {

        document.getElementById("message")
            .innerText =
            "Please enter a number.";

        return;
    }


    lastRotation = "None";

    root = insert(root, value);


    document.getElementById("message")
        .innerText =
        "Inserted " + value;


    document.getElementById("rotation")
        .innerText =
        lastRotation;


    input.value = "";

    drawTree();

    showTraversals();
}


// ================================
// DELETE BUTTON
// ================================

function deleteNode() {

    let input =
        document.getElementById("value");

    let value =
        Number(input.value);


    if (input.value === "") {

        document.getElementById("message")
            .innerText =
            "Please enter a number.";

        return;
    }


    lastRotation = "None";

    root =
        deleteValue(root, value);


    document.getElementById("message")
        .innerText =
        "Deleted " + value;


    document.getElementById("rotation")
        .innerText =
        lastRotation;


    input.value = "";

    drawTree();

    showTraversals();
}


// ================================
// CLEAR
// ================================

function clearTree() {

    root = null;

    lastRotation = "None";

    document.getElementById("message")
        .innerText =
        "Tree cleared.";

    document.getElementById("rotation")
        .innerText =
        "None";

    drawTree();

    showTraversals();
}


// ================================
// DRAW TREE
// ================================

function drawTree() {

    let tree =
        document.getElementById("tree");

    let svg =
        document.getElementById("lines");


    tree.innerHTML = "";

    svg.innerHTML = "";


    if (root === null) {

        return;
    }


    let positions = [];

    calculatePositions(
        root,
        0,
        400,
        100,
        220,
        positions
    );


    // Draw lines first

    positions.forEach(item => {

        if (item.node.left !== null) {

            let child =
                positions.find(
                    x => x.node === item.node.left
                );

            drawLine(
                item.x,
                item.y,
                child.x,
                child.y
            );
        }


        if (item.node.right !== null) {

            let child =
                positions.find(
                    x => x.node === item.node.right
                );

            drawLine(
                item.x,
                item.y,
                child.x,
                child.y
            );
        }

    });


    // Draw nodes

    positions.forEach(item => {

        let div =
            document.createElement("div");

        div.className = "node";

        div.innerText =
            item.node.value;

        div.style.left =
            (item.x - 27) + "px";

        div.style.top =
            (item.y - 27) + "px";


        let info =
            document.createElement("div");

        info.className = "node-info";

        info.innerText =
            "H:" +
            item.node.height +
            " BF:" +
            balance(item.node);


        div.appendChild(info);

        tree.appendChild(div);

    });

}


// ================================
// CALCULATE NODE POSITIONS
// ================================

function calculatePositions(
    node,
    level,
    x,
    y,
    gap,
    positions
) {

    if (node === null) {
        return;
    }


    positions.push({
        node: node,
        x: x,
        y: y
    });


    calculatePositions(
        node.left,
        level + 1,
        x - gap / (level + 1),
        y + 100,
        gap,
        positions
    );


    calculatePositions(
        node.right,
        level + 1,
        x + gap / (level + 1),
        y + 100,
        gap,
        positions
    );
}


// ================================
// DRAW LINE
// ================================

function drawLine(x1, y1, x2, y2) {

    let svg =
        document.getElementById("lines");


    let line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );


    line.setAttribute("x1", x1);

    line.setAttribute("y1", y1);

    line.setAttribute("x2", x2);

    line.setAttribute("y2", y2);

    line.setAttribute(
        "stroke",
        "#333"
    );

    line.setAttribute(
        "stroke-width",
        "2"
    );


    svg.appendChild(line);
}


// ================================
// INORDER
// ================================

function inorder(node, result = []) {

    if (node !== null) {

        inorder(node.left, result);

        result.push(node.value);

        inorder(node.right, result);
    }

    return result;
}


// ================================
// PREORDER
// ================================

function preorder(node, result = []) {

    if (node !== null) {

        result.push(node.value);

        preorder(node.left, result);

        preorder(node.right, result);
    }

    return result;
}


// ================================
// POSTORDER
// ================================

function postorder(node, result = []) {

    if (node !== null) {

        postorder(node.left, result);

        postorder(node.right, result);

        result.push(node.value);
    }

    return result;
}


// ================================
// SHOW TRAVERSALS
// ================================

function showTraversals() {

    document.getElementById("inorder")
        .innerText =
        inorder(root).join(" → ") || "-";


    document.getElementById("preorder")
        .innerText =
        preorder(root).join(" → ") || "-";


    document.getElementById("postorder")
        .innerText =
        postorder(root).join(" → ") || "-";
}


// ================================
// INITIAL
// ================================

drawTree();

showTraversals();