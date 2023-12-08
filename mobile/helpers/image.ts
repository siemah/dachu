const hashs = [
  "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
  "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.",
  "L6Pj0^jE.AyE_3t7t7R**0o#DgR4",
  "LKO2:N%2Tw=w]~RBVZRi};RPxuwH",
  "LGEByw9vM|OY~BWYR,xZkpso-o$%",
  "LdQcr4WB?bxaWBWBfks:~qoL9ZWB"
];

export function generateRandomBlurhash() {
  const randomIndex = Math.floor(Math.random() * hashs.length);
  return hashs[randomIndex];
}