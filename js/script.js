// ===== GLOBAL ARRAY (REQUIRED) =====
const lootArray = [];

// ===== EVENT LISTENERS (REQUIRED) =====
document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);

// ===== ADD LOOT FUNCTION =====
function addLoot() {

    const nameInput = document.getElementById("lootName");
    const valueInput = document.getElementById("lootValue");
    const error = document.getElementById("lootError");

    const name = nameInput.value.trim();
    const value = parseFloat(valueInput.value);

    error.textContent = "";

    // VALIDATION
    if (name === "") {
        error.textContent = "Loot name required";
        return;
    }

    if (isNaN(value) || value < 0) {
        error.textContent = "Invalid loot value";
        return;
    }

    // STORE OBJECT IN ARRAY
    const lootObject = {
        name: name,
        value: value
    };

    lootArray.push(lootObject);

    // UPDATE UI
    renderLoot();
    splitLoot();
    // CLEAR INPUTS
    nameInput.value = "";
    valueInput.value = "";
}

// ===== RENDER FUNCTION =====
function renderLoot() {

    const list = document.getElementById("lootList");
    const totalDisplay = document.getElementById("totalLoot");

    list.innerHTML = "";

    let total = 0;

    for (let i = 0; i < lootArray.length; i++) {

        const item = lootArray[i];

        const li = document.createElement("li");

        // TEXT
        const text = document.createElement("span");
        text.textContent = `${item.name} - $${item.value.toFixed(2)}`;

        // DELETE BUTTON (EXTRA CREDIT)
        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.style.marginLeft = "10px";

        btn.addEventListener("click", function () {
            removeLoot(i);
        });

        li.appendChild(text);
        li.appendChild(btn);

        list.appendChild(li);

        total += item.value;
    }

    totalDisplay.textContent = total.toFixed(2);
}
// ===== SPLIT FUNCTION =====
function splitLoot() {

    const partySize = parseInt(document.getElementById("partySize").value);
    const error = document.getElementById("splitError");

    error.textContent = "";

    // EDGE CASES
    if (lootArray.length === 0) {

    document.getElementById("finalTotal").textContent = "0.00";
    document.getElementById("perMember").textContent = "0.00";

    error.textContent = "No loot entered";
    return;
}

    if (isNaN(partySize) || partySize < 1) {
        error.textContent = "Invalid party size";
        return;
    }

    let total = 0;

    // LOOP REQUIRED
    for (let i = 0; i < lootArray.length; i++) {
        total += lootArray[i].value;
    }

    const perMember = total / partySize;

    document.getElementById("finalTotal").textContent = total.toFixed(2);
    document.getElementById("perMember").textContent = perMember.toFixed(2);
}
function removeLoot(index) {
    lootArray.splice(index, 1);
    renderLoot();
    splitLoot();   // ⭐ 
}


