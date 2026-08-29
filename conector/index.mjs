// EL CONECTOR de la seccion bench-superficie — la "sexta cosa" del repo.
// Forma copiada del tutorial oficial de dsh (docs/user/develop/basic/tool.md).
// CERO logica de la app: solo autentica, manda el pedido y muestra la respuesta.
// La obra REAL sigue naciendo en la seccion, detras del porton y de la firma.
import { defineTool } from "@deepseek-ai/dsh-tools";

export const name = "ansgis-bench-superficie-conector";
export const inject = ["tools"];

const BASE = process.env.ANS_BRIDGE_URL || "http://127.0.0.1:18091";
const AGENTE = "bench-a";

async function puente(ruta, opciones = {}) {
  const r = await fetch(BASE + ruta, {
    ...opciones,
    headers: {
      "Authorization": "Bearer " + (process.env.ANS_HERDR_SECRET || ""),
      "Content-Type": "application/json",
      ...(opciones.headers || {}),
    },
  });
  if (!r.ok) throw new Error("puente " + ruta + " -> HTTP " + r.status);
  return r.json();
}

export function apply(ctx) {
  ctx.tools.register(defineTool({
    name: "bench_superficie_estado",
    description: "SOLO LECTURA: estado vivo de la seccion bench-superficie (el agente en su panel de herdr).",
    parameters: {},
    output: { schema: { type: "string" }, render: (_a, v) => [{ type: "text", text: v }] },
    async execute() {
      const d = await puente("/agents");
      // el puente envuelve la salida de herdr como texto JSON en `salida`
      const cuerpo = typeof d.salida === "string" ? JSON.parse(d.salida) : d;
      const a = (cuerpo.result?.agents || cuerpo.agents || []).find(x => x.name === AGENTE);
      return a ? `seccion ${AGENTE}: ${a.agent_status || a.state || "?"} en ${a.cwd || "?"}` : `no encuentro al agente ${AGENTE}`;
    },
  }));

  ctx.tools.register(defineTool({
    name: "bench_superficie_pedido",
    description: "Entrega UN pedido a la seccion bench-superficie. La seccion trabaja en SU repo; la obra vuelve como pull request que FIRMA una persona — esta tool no espera el resultado ni puede fusionarlo.",
    parameters: {
      pedido: { type: "string", required: true, description: "El pedido, en criollo, autocontenido" },
    },
    output: { schema: { type: "string" }, render: (_a, v) => [{ type: "text", text: v }] },
    async execute(args) {
      await puente("/prompt", { method: "POST", body: JSON.stringify({ agent: AGENTE, text: args.pedido }) });
      return "pedido entregado a la seccion " + AGENTE + ". La obra llegara como pull request con recibo; la fusion (la firma) es de una persona.";
    },
  }));

  console.log("[conector bench-superficie] 2 tools registradas: estado + pedido");
}
