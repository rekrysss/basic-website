
document.querySelector("#rok").textContent = new Date().getFullYear();

const prevod = document.querySelector("#prevod");

if (prevod) {
  const vstup = document.querySelector("#cislo");
  const chyba = document.querySelector("#chyba");
  const vysledek = document.querySelector("#vysledek");

  function ukazChybu(zprava) {
    chyba.textContent = zprava;
    vstup.setAttribute("aria-invalid", zprava ? "true" : "false");
  }

  prevod.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = vstup.value.trim();
    vysledek.replaceChildren();

    if (text === "") {
      ukazChybu("Napiš nějaké číslo.");
      return;
    }
    if (!/^\d+$/.test(text)) {
      ukazChybu("Použij jen číslice 0–9, bez mezer, mínusu a desetinné čárky.");
      return;
    }
    ukazChybu("");

    const cislice = [...text];
    const skupiny = cislice.map((c) => Number(c).toString(2).padStart(4, "0"));

    const radek = document.createElement("p");
    radek.textContent = `${text} v BCD: ${skupiny.join(" ")}`;

    const cifry = document.createElement("div");
    cifry.className = "cifry";
    cislice.forEach((c, i) => {
      const box = document.createElement("div");
      const velke = document.createElement("strong");
      const bity = document.createElement("span");
      velke.textContent = c;
      bity.textContent = skupiny[i];
      box.append(velke, bity);
      cifry.append(box);
    });

    vysledek.append(radek, cifry);
  });

  vstup.addEventListener("input", () => ukazChybu(""));
}
