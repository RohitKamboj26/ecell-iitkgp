(function () {
  const CSV_CANDIDATES = [
    "Untitled sheet.csv",
    "data/Untitled sheet.csv",
    "data/ges-participants.csv"
  ];

  // If certificate_file is not in CSV, file will be picked as:
  // images/certificates/<email-id>.png
  const CERT_BASE = "images/certificates/";

  const state = { rows: [] };

  function val(row, keys) {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== "") {
        return String(row[k]).trim();
      }
    }
    return "";
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slug(s) {
    return String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function emailToFile(email) {
    // keep alnum + dot + dash + underscore for filename safety
    return String(email || "").toLowerCase().trim().replace(/[^a-z0-9._-]/g, "_");
  }

  function normalizeRow(r, i) {
    // MAPPED TO YOUR SHEET
    const name = val(r, ["Name", "name"]);
    const college = val(r, ["College Name", "college name", "College", "college"]);
    const email = val(r, ["Email ID", "email id", "Email", "email", "email if", "Email If"]);

    // Optional direct path column if you add later
    const certFromCsv = val(r, ["certificate_file", "Certificate File", "certificate", "Certificate"]);

    const id = email ? slug(email) : `${slug(name)}-${slug(college)}-${i + 1}`;
    const cert = certFromCsv || (email ? `${CERT_BASE}${emailToFile(email)}.png` : "");

    return { id, name, college, email, cert };
  }

  async function getCsvText() {
    for (const p of CSV_CANDIDATES) {
      try {
        const res = await fetch(p);
        if (res.ok) return await res.text();
      } catch (_) {}
    }
    throw new Error("CSV file not found");
  }

  function personalLink(id) {
    const u = new URL(window.location.href);
    u.searchParams.set("pid", id);
    u.hash = "ges-archive-section";
    return u.toString();
  }

  function render(rows) {
    const tbody = document.getElementById("gesTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.dataset.id = row.id;

      tr.innerHTML = `
        <td>${esc(row.name) || "-"}</td>
        <td>${esc(row.college) || "-"}</td>
        <td>${esc(row.email) || "-"}</td>
        <td>${
          row.cert
            ? `<a class="btn btn-sm btn-outline-light" href="${esc(row.cert)}" download>Download</a>`
            : `<span class="text-muted">Not available</span>`
        }</td>
        <td><button class="btn btn-sm btn-outline-info js-copy">Copy Link</button></td>
      `;

      tr.querySelector(".js-copy").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(personalLink(row.id));
          alert("Personal link copied.");
        } catch {
          alert("Copy failed.");
        }
      });

      tbody.appendChild(tr);
    });

    const pid = new URLSearchParams(window.location.search).get("pid");
    if (pid) {
      const target = tbody.querySelector(`tr[data-id="${CSS.escape(pid)}"]`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function filterRows(q) {
    const s = String(q || "").toLowerCase().trim();
    if (!s) return render(state.rows);
    render(
      state.rows.filter((r) =>
        (r.name || "").toLowerCase().includes(s) ||
        (r.college || "").toLowerCase().includes(s) ||
        (r.email || "").toLowerCase().includes(s)
      )
    );
  }

  async function init() {
    const search = document.getElementById("gesSearch");
    const tbody = document.getElementById("gesTableBody");
    if (!search || !tbody || !window.Papa) return;

    try {
      const text = await getCsvText();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      state.rows = (parsed.data || []).map(normalizeRow).filter(r => r.name || r.college || r.email);
      render(state.rows);
      search.addEventListener("input", (e) => filterRows(e.target.value));
    } catch {
      tbody.innerHTML = `<tr><td colspan="5">CSV not found. Put file as <b>data/Untitled sheet.csv</b>.</td></tr>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();