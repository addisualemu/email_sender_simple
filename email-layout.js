const font = "Segoe UI, Helvetica, Arial, sans-serif";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(fullName) {
  const trimmed = String(fullName).trim();
  return trimmed.split(/\s+/)[0] || trimmed;
}

function renderEmail({ title = "Kingdom Tech Army", preheader = "", sections }) {
  const safeTitle = escapeHtml(title);
  const safePreheader = escapeHtml(preheader);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#e7eef1;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${safePreheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e7eef1;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;">
          ${sections.join("\n")}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function header({ eyebrow = "Connected in purpose", title, lede = "" }) {
  const ledeHtml = lede
    ? `<p style="margin:16px 0 0;font-family:${font};font-size:16px;line-height:1.7;color:#c3d3d9;">${escapeHtml(lede)}</p>`
    : "";

  return `<tr>
            <td bgcolor="#09151e" style="background-color:#09151e;padding:32px 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="34" height="34" align="center" valign="middle" bgcolor="#09151e" style="width:34px;height:34px;border:1px solid #dbb452;color:#e5c46b;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:34px;">&#43;</td>
                  <td style="padding-left:12px;font-family:${font};font-size:13px;font-weight:700;letter-spacing:0.08em;color:#ffffff;">KINGDOM TECH ARMY</td>
                </tr>
              </table>
              <p style="margin:28px 0 0;font-family:${font};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#e5c46b;">&#9679;&nbsp; ${escapeHtml(eyebrow)}</p>
              <h1 style="margin:14px 0 0;font-family:${font};font-size:34px;line-height:1.15;font-weight:700;color:#ffffff;">${escapeHtml(title)}</h1>
              ${ledeHtml}
            </td>
          </tr>`;
}

function rule() {
  return `<tr>
            <td bgcolor="#dbb452" style="background-color:#dbb452;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>`;
}

function content(blocks) {
  return `<tr>
            <td style="padding:32px 40px 8px;font-family:${font};color:#141d32;">
              ${blocks.join("\n")}
            </td>
          </tr>`;
}

function note(text, { spaceAfter = 28 } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${spaceAfter}px;">
                <tr>
                  <td bgcolor="#faf7ef" style="background-color:#faf7ef;border-left:3px solid #dbb452;padding:18px 20px;font-family:${font};font-size:16px;line-height:1.7;color:#172239;">${escapeHtml(text)}</td>
                </tr>
              </table>`;
}

function paragraph(text, { spaceAfter = 18 } = {}) {
  return `<p style="margin:0 0 ${spaceAfter}px;font-family:${font};font-size:16px;line-height:1.75;color:#141d32;">${escapeHtml(text)}</p>`;
}

function label(text, { spaceAfter = 8 } = {}) {
  return `<p style="margin:0 0 ${spaceAfter}px;font-family:${font};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#926a19;">${escapeHtml(text)}</p>`;
}

function panel({ label: panelLabel, title, text, spaceAfter = 28 }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${spaceAfter}px;">
                <tr>
                  <td bgcolor="#09151e" style="background-color:#09151e;padding:24px 24px 22px;">
                    <p style="margin:0;font-family:${font};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#e5c46b;">${escapeHtml(panelLabel)}</p>
                    <p style="margin:10px 0 0;font-family:${font};font-size:20px;line-height:1.35;font-weight:700;color:#ffffff;">${escapeHtml(title)}</p>
                    <p style="margin:10px 0 0;font-family:${font};font-size:15px;line-height:1.65;color:#c3d3d9;">${escapeHtml(text)}</p>
                  </td>
                </tr>
              </table>`;
}

function signoff({ closing = "In Christ,", name, role, spaceAfter = 28 }) {
  return `<p style="margin:0;font-family:${font};font-size:16px;line-height:1.6;color:#141d32;">${escapeHtml(closing)}</p>
              <p style="margin:4px 0 0;font-family:${font};font-size:18px;font-weight:700;color:#141d32;">${escapeHtml(name)}</p>
              <p style="margin:2px 0 ${spaceAfter}px;font-family:${font};font-size:13px;color:#926a19;">${escapeHtml(role)}</p>`;
}

function footer({
  line = "Volunteer technologists. \u00a0\u00b7\u00a0 Across churches and traditions. \u00a0\u00b7\u00a0 Support freely given.",
  href = "https://kingdomtecharmy.com",
  linkLabel = "kingdomtecharmy.com"
} = {}) {
  return `<tr>
            <td bgcolor="#f7f9fa" style="background-color:#f7f9fa;border-top:1px solid #e5e9ed;padding:22px 40px 26px;">
              <p style="margin:0 0 8px;font-family:${font};font-size:12px;line-height:1.6;color:#586273;">${escapeHtml(line)}</p>
              <p style="margin:0;font-family:${font};font-size:12px;line-height:1.6;color:#586273;"><a href="${escapeHtml(href)}" style="color:#926a19;text-decoration:none;">${escapeHtml(linkLabel)}</a></p>
            </td>
          </tr>`;
}

module.exports = {
  escapeHtml,
  firstName,
  renderEmail,
  header,
  rule,
  content,
  note,
  paragraph,
  label,
  panel,
  signoff,
  footer
};
